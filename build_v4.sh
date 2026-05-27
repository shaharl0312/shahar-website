#!/bin/sh
set -e
mkdir -p dist
echo "build-started-$(date +%s)" > dist/buildinfo.txt

# Landing page — exclude _archive, promote v4 as production index
rsync -a --exclude='_archive' landing-page-first/. dist/
cp landing-page-first/index_v4.html dist/index.html

# ETF app — exclude _archive
mkdir -p dist/etf-app
rsync -a --exclude='_archive' etf-app/. dist/etf-app/

# Agreement — exclude _archive, promote v2 as production index
mkdir -p dist/agreement
rsync -a --exclude='_archive' agreement/. dist/agreement/
cp agreement/index_v2.html dist/agreement/index.html

# Side projects
mkdir -p dist/tzofim && cp -r side-projects/tzofim/. dist/tzofim/
mkdir -p dist/schoolslide && cp -r side-projects/schoolslide/. dist/schoolslide/

# Warriors hub
mkdir -p dist/warriors-hub/mifgash-1 dist/warriors-hub/mifgash-2 dist/warriors-hub/mifgash-3
cp warriors-hub/mifgash-1_v2.html dist/warriors-hub/mifgash-1/index.html
cp warriors-hub/mifgash-2_v2.html dist/warriors-hub/mifgash-2/index.html
cp warriors-hub/mifgash-3_v2.html dist/warriors-hub/mifgash-3/index.html

# Compound calculator
mkdir -p dist/my-app/ribit-derebit
cp my-app/ribit-derebit/index_v3.html dist/my-app/ribit-derebit/index.html

echo "build-ok-$(date +%s)" > dist/buildinfo.txt
echo "=== BUILD COMPLETE ===" && ls dist/
