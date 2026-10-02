#!/bin/sh
set -e
mkdir -p _infra/dist
echo "build-started-$(date +%s)" > _infra/dist/buildinfo.txt

# Landing page — exclude _archive
cp -r funnel/landing-page-first/. _infra/dist/
rm -rf _infra/dist/_archive
cp funnel/landing-page-first/index.html _infra/dist/index.html
mkdir -p _infra/dist/todah && cp funnel/landing-page-first/todah.html _infra/dist/todah/index.html
mkdir -p _infra/dist/liuy-confirmation && cp funnel/landing-page-first/liuy-confirmation.html _infra/dist/liuy-confirmation/index.html

# ETF app — exclude _archive
mkdir -p _infra/dist/etf-app
cp -r tools/etf-app/. _infra/dist/etf-app/
rm -rf _infra/dist/etf-app/_archive

# Agreement — exclude _archive
mkdir -p _infra/dist/agreement
cp -r funnel/agreement/. _infra/dist/agreement/
rm -rf _infra/dist/agreement/_archive
cp funnel/agreement/index.html _infra/dist/agreement/index.html

# Agreement — single meeting variant
mkdir -p _infra/dist/agreement-one-meeting
cp -r funnel/agreement-one-meeting/. _infra/dist/agreement-one-meeting/

# Side projects
mkdir -p _infra/dist/tzofim && cp -r misc/side-projects/tzofim/. _infra/dist/tzofim/
mkdir -p _infra/dist/schoolslide && cp -r misc/side-projects/schoolslide/. _infra/dist/schoolslide/
mkdir -p _infra/dist/trip-madeira && cp -r misc/side-projects/trip-madeira/. _infra/dist/trip-madeira/

# Warriors hub
mkdir -p _infra/dist/warriors-hub/mifgash-1 _infra/dist/warriors-hub/mifgash-2 _infra/dist/warriors-hub/mifgash-3
cp client-services/warriors-hub/mifgash-1.html _infra/dist/warriors-hub/mifgash-1/index.html
cp client-services/warriors-hub/mifgash-2.html _infra/dist/warriors-hub/mifgash-2/index.html
cp client-services/warriors-hub/mifgash-3.html _infra/dist/warriors-hub/mifgash-3/index.html

# Compound calculator
mkdir -p _infra/dist/my-app/ribit-derebit
cp tools/my-app/ribit-derebit/index.html _infra/dist/my-app/ribit-derebit/index.html

# Course funnel - free guide squeeze page
mkdir -p _infra/dist/guide && cp funnel/funnel-hadracha/optin-v2.html _infra/dist/guide/index.html
cp -r funnel/funnel-hadracha/assets _infra/dist/guide/assets

# Course funnel - free guide squeeze page, discharged-soldiers campaign variant
mkdir -p _infra/dist/guide-hayalim && cp funnel/funnel-hadracha/optin-hayalim.html _infra/dist/guide-hayalim/index.html
cp -r funnel/funnel-hadracha/assets _infra/dist/guide-hayalim/assets

# Course sales page (v9 is the only live variant - v7/v8 retired)
mkdir -p _infra/dist/course && cp funnel/course-landing/v9-copy-refine.html _infra/dist/course/index.html
mkdir -p _infra/dist/course-v9 && cp funnel/course-landing/v9-copy-refine.html _infra/dist/course-v9/index.html
mkdir -p _infra/dist/course-landing && cp funnel/course-landing/video-cover.jpg funnel/course-landing/offer-mockup.jpg funnel/course-landing/video-cover.webp funnel/course-landing/offer-mockup.webp _infra/dist/course-landing/

# Erosion calculator (checking-account inflation quiz)
mkdir -p _infra/dist/erosion-calculator && cp funnel/erosion-calculator/index.html _infra/dist/erosion-calculator/index.html

# Bank money guide (why banks want your cash to stay with them)
mkdir -p _infra/dist/bank-money && cp funnel/funnel-hadracha/bank-money-guide.html _infra/dist/bank-money/index.html

# Guides (SEO content section)
mkdir -p _infra/dist/guides/keren-kaspit
cp content/guides/index.html _infra/dist/guides/index.html
cp content/guides/keren-kaspit/index.html _infra/dist/guides/keren-kaspit/index.html

# Funnel health-check dashboard
mkdir -p _infra/dist/health-check && cp health-check/index.html health-check/data.json _infra/dist/health-check/

# Social assets (Flux-generated carousel images, public source for Canva import)
mkdir -p _infra/dist/social-assets && cp -r social-assets/. _infra/dist/social-assets/

echo "build-ok-$(date +%s)" > _infra/dist/buildinfo.txt
echo "=== BUILD COMPLETE ===" && ls _infra/dist/
