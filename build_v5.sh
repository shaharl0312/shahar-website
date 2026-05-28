#!/bin/sh
set -e
mkdir -p dist
echo "build-started-$(date +%s)" > dist/buildinfo.txt

# Landing page — exclude _archive, promote v4 as production index
cp -r landing-page-first/. dist/
rm -rf dist/_archive
cp landing-page-first/index_v4.html dist/index.html

# ETF app — exclude _archive
mkdir -p dist/etf-app
cp -r etf-app/. dist/etf-app/
rm -rf dist/etf-app/_archive

# Agreement — exclude _archive, promote v2 as production index
mkdir -p dist/agreement
cp -r agreement/. dist/agreement/
rm -rf dist/agreement/_archive
cp agreement/index_v2.html dist/agreement/index.html

# Side projects
mkdir -p dist/tzofim && cp -r side-projects/tzofim/. dist/tzofim/
mkdir -p dist/schoolslide && cp -r side-projects/schoolslide/. dist/schoolslide/

# Warriors hub
mkdir -p dist/warriors-hub/mifgash-1 dist/warriors-hub/mifgash-2 dist/warriors-hub/mifgash-3
cp warriors-hub/mifgash-1_v3.html dist/warriors-hub/mifgash-1/index.html
cp warriors-hub/mifgash-2_v3.html dist/warriors-hub/mifgash-2/index.html
cp warriors-hub/mifgash-3_v3.html dist/warriors-hub/mifgash-3/index.html

# Compound calculator
mkdir -p dist/my-app/ribit-derebit
cp my-app/ribit-derebit/index_v3.html dist/my-app/ribit-derebit/index.html

echo "build-ok-$(date +%s)" > dist/buildinfo.txt
echo "=== BUILD COMPLETE ===" && ls dist/
