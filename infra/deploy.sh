#!/bin/bash
set -euo pipefail

# Deploy static site to GCS bucket
BUCKET="yavarkhan.me"
OUT_DIR="../out"

echo "==> Building static site..."
cd "$(dirname "$0")/.."
npm run build

echo "==> Syncing files to gs://${BUCKET}..."
gsutil -m rsync -r -d -c out/ "gs://${BUCKET}/"

echo "==> Setting cache headers for static assets..."
gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, immutable" "gs://${BUCKET}/_next/**"

echo "==> Setting cache headers for HTML files..."
gsutil -m setmeta -h "Cache-Control:public, max-age=300, s-maxage=3600" "gs://${BUCKET}/*.html"
gsutil -m setmeta -h "Cache-Control:public, max-age=300, s-maxage=3600" "gs://${BUCKET}/**/*.html"

echo "==> Setting security headers metadata..."
# Note: Full security headers require Cloud CDN custom headers (set via LB)

echo ""
echo "Deploy complete! Site: https://${BUCKET}"
echo "CDN cache may take a few minutes to update."
