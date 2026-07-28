#!/bin/sh
set -e
mkdir -p _infra/dist
echo "build-started-$(date +%s)" > _infra/dist/buildinfo.txt

# Landing page — exclude _archive
cp -r landing-page-first/. _infra/dist/
rm -rf _infra/dist/_archive
cp landing-page-first/index.html _infra/dist/index.html
mkdir -p _infra/dist/todah && cp landing-page-first/todah.html _infra/dist/todah/index.html
mkdir -p _infra/dist/liuy-confirmation && cp landing-page-first/liuy-confirmation.html _infra/dist/liuy-confirmation/index.html

# ETF app — exclude _archive
mkdir -p _infra/dist/etf-app
cp -r etf-app/. _infra/dist/etf-app/
rm -rf _infra/dist/etf-app/_archive

# Agreement — exclude _archive
mkdir -p _infra/dist/agreement
cp -r agreement/. _infra/dist/agreement/
rm -rf _infra/dist/agreement/_archive
cp agreement/index.html _infra/dist/agreement/index.html

# Side projects
mkdir -p _infra/dist/tzofim && cp -r side-projects/tzofim/. _infra/dist/tzofim/
mkdir -p _infra/dist/schoolslide && cp -r side-projects/schoolslide/. _infra/dist/schoolslide/

# Warriors hub
mkdir -p _infra/dist/warriors-hub/mifgash-1 _infra/dist/warriors-hub/mifgash-2 _infra/dist/warriors-hub/mifgash-3
cp warriors-hub/mifgash-1.html _infra/dist/warriors-hub/mifgash-1/index.html
cp warriors-hub/mifgash-2.html _infra/dist/warriors-hub/mifgash-2/index.html
cp warriors-hub/mifgash-3.html _infra/dist/warriors-hub/mifgash-3/index.html

# Compound calculator
mkdir -p _infra/dist/my-app/ribit-derebit
cp my-app/ribit-derebit/index.html _infra/dist/my-app/ribit-derebit/index.html

# Course funnel - free guide squeeze page + video delivery page
mkdir -p _infra/dist/guide && cp funnel-hadracha/optin-v2.html _infra/dist/guide/index.html
cp -r funnel-hadracha/assets _infra/dist/guide/assets
mkdir -p _infra/dist/video && cp funnel-hadracha/video-v2.html _infra/dist/video/index.html

# Course sales page (course-landing variants) - v8 is primary
mkdir -p _infra/dist/course && cp course-landing/v8-yahav-design.html _infra/dist/course/index.html
mkdir -p _infra/dist/course-v8 && cp course-landing/v8-yahav-design.html _infra/dist/course-v8/index.html
mkdir -p _infra/dist/course-v7 && cp course-landing/v7-yahav-design.html _infra/dist/course-v7/index.html

# Erosion calculator (checking-account inflation quiz)
mkdir -p _infra/dist/erosion-calculator && cp erosion-calculator/index.html _infra/dist/erosion-calculator/index.html

# Bank money guide (why banks want your cash to stay with them)
mkdir -p _infra/dist/bank-money && cp funnel-hadracha/bank-money-guide.html _infra/dist/bank-money/index.html

# Funnel health-check dashboard
mkdir -p _infra/dist/health-check && cp health-check/index.html health-check/data.json _infra/dist/health-check/

echo "build-ok-$(date +%s)" > _infra/dist/buildinfo.txt
echo "=== BUILD COMPLETE ===" && ls _infra/dist/
