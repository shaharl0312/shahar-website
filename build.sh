#!/bin/sh
set -e
mkdir -p dist
echo "build-started-$(date +%s)" > dist/buildinfo.txt
cp -r landing-page-first/. dist/
cp -r etf-app dist/etf-app
mkdir -p dist/tzofim && cp -r tzofim/. dist/tzofim/
mkdir -p dist/schoolslide && cp -r schoolslide/. dist/schoolslide/
mkdir -p dist/agreement && cp -r agreement/. dist/agreement/
cp agreement/index_v2.html dist/agreement/index.html
echo "build-ok-$(date +%s)" > dist/buildinfo.txt
echo "=== BUILD COMPLETE ===" && ls dist/agreement/
