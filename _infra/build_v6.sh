#!/bin/sh
set -e
mkdir -p _infra/dist
echo "build-started-$(date +%s)" > _infra/dist/buildinfo.txt

# Landing page — exclude _archive, promote v11 as production index
cp -r landing-page-first/. _infra/dist/
rm -rf _infra/dist/_archive
cp landing-page-first/index_v11.html _infra/dist/index.html
mkdir -p _infra/dist/todah && cp landing-page-first/todah_v4.html _infra/dist/todah/index.html

# ETF app — exclude _archive
mkdir -p _infra/dist/etf-app
cp -r etf-app/. _infra/dist/etf-app/
rm -rf _infra/dist/etf-app/_archive

# Agreement — exclude _archive, promote v2 as production index
mkdir -p _infra/dist/agreement
cp -r agreement/. _infra/dist/agreement/
rm -rf _infra/dist/agreement/_archive
cp agreement/index_v2.html _infra/dist/agreement/index.html

# Side projects
mkdir -p _infra/dist/tzofim && cp -r side-projects/tzofim/. _infra/dist/tzofim/
mkdir -p _infra/dist/schoolslide && cp -r side-projects/schoolslide/. _infra/dist/schoolslide/

# Warriors hub
mkdir -p _infra/dist/warriors-hub/mifgash-1 _infra/dist/warriors-hub/mifgash-2 _infra/dist/warriors-hub/mifgash-3
cp warriors-hub/mifgash-1_v3.html _infra/dist/warriors-hub/mifgash-1/index.html
cp warriors-hub/mifgash-2_v3.html _infra/dist/warriors-hub/mifgash-2/index.html
cp warriors-hub/mifgash-3_v3.html _infra/dist/warriors-hub/mifgash-3/index.html

# Compound calculator
mkdir -p _infra/dist/my-app/ribit-derebit
cp my-app/ribit-derebit/index_v3.html _infra/dist/my-app/ribit-derebit/index.html

echo "build-ok-$(date +%s)" > _infra/dist/buildinfo.txt
echo "=== BUILD COMPLETE ===" && ls _infra/dist/
