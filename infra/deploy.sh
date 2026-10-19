#!/bin/bash
set -euo pipefail

# Deploy static site to GCS bucket
BUCKET="yavarkhan.me"

# Always the personal account and project. The machine's active gcloud config may be a work one.
export CLOUDSDK_ACTIVE_CONFIG_NAME=default

# Old documents that are no longer in the build but may be linked from elsewhere. rsync -d would
# delete them; they stay on the server until they are removed on purpose.
KEEP='^(YavarKhan_TranscriptMS_Unoff\.pdf|certificates/(aws_cloud_practitioner|ml_specialization_stanford|algorithmic_toolbox)\.(pdf|png))$'
OUT_DIR="../out"

echo "==> Building static site..."
cd "$(dirname "$0")/.."
npm run build

echo "==> Syncing files to gs://${BUCKET}..."
gsutil -m rsync -r -d -c -x "$KEEP" out/ "gs://${BUCKET}/"

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
