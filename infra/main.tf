terraform {
  required_version = ">= 1.5.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# ─── Variables ──────────────────────────────────────────────────────────────

variable "project_id" {
  description = "GCP project ID"
  type        = string
  default     = "weatherwise-486608"
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "domain" {
  description = "Primary domain name"
  type        = string
  default     = "yavarkhan.me"
}

# ─── Cloud Storage Bucket (static site hosting) ────────────────────────────

resource "google_storage_bucket" "website" {
  name          = var.domain
  location      = "US"
  force_destroy = true

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }

  cors {
    origin          = ["https://${var.domain}", "https://www.${var.domain}"]
    method          = ["GET", "HEAD"]
    response_header = ["Content-Type"]
    max_age_seconds = 3600
  }
}

# Make bucket publicly readable
resource "google_storage_bucket_iam_member" "public_read" {
  bucket = google_storage_bucket.website.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# ─── WWW redirect bucket ───────────────────────────────────────────────────

resource "google_storage_bucket" "www_redirect" {
  name          = "www.${var.domain}"
  location      = "US"
  force_destroy = true

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

# ─── Static IP address ─────────────────────────────────────────────────────

resource "google_compute_global_address" "website" {
  name = "website-ip"
}

# ─── Google-managed SSL certificate ────────────────────────────────────────

# v2 stuck in FAILED_NOT_VISIBLE after the 2026-08-05 billing outage: validation
# kept failing while the LB served nothing, and GCP does not reliably retry once
# a managed cert enters that state. v3 is a clean provisioning attempt.
resource "google_compute_managed_ssl_certificate" "website_v3" {
  name = "website-ssl-cert-v3"

  managed {
    domains = [var.domain, "www.${var.domain}"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

# ─── Backend bucket (connects LB to Cloud Storage) ─────────────────────────

resource "google_compute_backend_bucket" "website" {
  name        = "website-backend"
  bucket_name = google_storage_bucket.website.name
  enable_cdn  = true

  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    default_ttl       = 3600
    max_ttl           = 86400
    client_ttl        = 3600
    serve_while_stale = 86400
  }
}

# ─── URL map ────────────────────────────────────────────────────────────────

# HTTPS URL map — serve content
resource "google_compute_url_map" "website" {
  name            = "website-url-map"
  default_service = google_compute_backend_bucket.website.id
}

# HTTP URL map — redirect to HTTPS
resource "google_compute_url_map" "http_redirect" {
  name = "http-redirect"

  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

# ─── HTTPS target proxy ────────────────────────────────────────────────────

resource "google_compute_target_https_proxy" "website" {
  name    = "website-https-proxy"
  url_map = google_compute_url_map.website.id

  # If a managed cert ever gets stuck in FAILED_NOT_VISIBLE again, do not swap
  # this list straight to the replacement: add the new cert alongside the old,
  # wait for ACTIVE, then remove the old one. Pointing the proxy at a cert that
  # is still PROVISIONING drops HTTPS, and :80 is redirect-only so there is no
  # fallback.
  ssl_certificates = [google_compute_managed_ssl_certificate.website_v3.id]
}

# HTTP target proxy (for redirect)
resource "google_compute_target_http_proxy" "http_redirect" {
  name    = "http-redirect-proxy"
  url_map = google_compute_url_map.http_redirect.id
}

# ─── Forwarding rules (global LB) ──────────────────────────────────────────

resource "google_compute_global_forwarding_rule" "https" {
  name                  = "website-https-rule"
  ip_address            = google_compute_global_address.website.address
  ip_protocol           = "TCP"
  port_range            = "443"
  target                = google_compute_target_https_proxy.website.id
  load_balancing_scheme = "EXTERNAL"
}

resource "google_compute_global_forwarding_rule" "http" {
  name                  = "website-http-rule"
  ip_address            = google_compute_global_address.website.address
  ip_protocol           = "TCP"
  port_range            = "80"
  target                = google_compute_target_http_proxy.http_redirect.id
  load_balancing_scheme = "EXTERNAL"
}

# ─── Cloud Armor ────────────────────────────────────────────────────────────
#
# Removed 2026-08-05. `google_compute_security_policy.website` was declared here
# with XSS/SQLi rules but was never attached to anything -- setting
# `edge_security_policy` on google_compute_backend_bucket.website is what binds
# a policy, and that was never done. So it inspected zero requests while still
# billing ~$5-6/month. To reinstate it, re-add the resource AND attach it.

# ─── Outputs ────────────────────────────────────────────────────────────────

output "load_balancer_ip" {
  value       = google_compute_global_address.website.address
  description = "Point your DNS A records to this IP"
}

output "ssl_certificate_name" {
  value       = google_compute_managed_ssl_certificate.website_v3.name
  description = "SSL certificate resource name"
}

output "bucket_name" {
  value       = google_storage_bucket.website.name
  description = "GCS bucket name for uploading site files"
}

output "site_url" {
  value       = "https://${var.domain}"
  description = "Your live site URL"
}
