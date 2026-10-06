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
cp -r client-services/agreement/. _infra/dist/agreement/
rm -rf _infra/dist/agreement/_archive
cp client-services/agreement/index.html _infra/dist/agreement/index.html

# Agreement — single meeting variant
mkdir -p _infra/dist/agreement-one-meeting
cp -r client-services/agreement-one-meeting/. _infra/dist/agreement-one-meeting/

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

# /course/ = call-booking page (course-call.html). /course-classic/ and /course-v9/ = previous sales page (v9)
mkdir -p _infra/dist/course && cp funnel/course-landing/course-call.html _infra/dist/course/index.html
mkdir -p _infra/dist/course-classic && cp funnel/course-landing/v9-copy-refine.html _infra/dist/course-classic/index.html
mkdir -p _infra/dist/course-v9 && cp funnel/course-landing/v9-copy-refine.html _infra/dist/course-v9/index.html
mkdir -p _infra/dist/course-landing && cp funnel/course-landing/video-cover.jpg funnel/course-landing/offer-mockup.jpg funnel/course-landing/video-cover.webp funnel/course-landing/offer-mockup.webp _infra/dist/course-landing/
cp -r funnel/course-landing/testimonial-videos _infra/dist/course-landing/

# Erosion calculator (checking-account inflation quiz)
mkdir -p _infra/dist/erosion-calculator && cp tools/erosion-calculator/index.html _infra/dist/erosion-calculator/index.html

# Guides (SEO content section)
mkdir -p _infra/dist/guides/flight-claude _infra/dist/guides/keren-kaspit _infra/dist/guides/bank-money _infra/dist/guides/us-bonds
cp content/guides/index.html _infra/dist/guides/index.html
cp content/guides/keren-kaspit/index.html _infra/dist/guides/keren-kaspit/index.html
cp content/guides/bank-money/index.html _infra/dist/guides/bank-money/index.html
cp content/guides/us-bonds/index.html _infra/dist/guides/us-bonds/index.html
cp content/guides/flight-claude/index.html content/guides/flight-claude/search-demo.mp4 content/guides/flight-claude/search-demo.jpg content/guides/flight-claude/install-demo.mp4 content/guides/flight-claude/install-demo.jpg _infra/dist/guides/flight-claude/

# Funnel health-check dashboard
mkdir -p _infra/dist/health-check && cp health-check/index.html health-check/data.json _infra/dist/health-check/

# Social assets (Flux-generated carousel images, public source for Canva import)
mkdir -p _infra/dist/social-assets && cp -r social-assets/. _infra/dist/social-assets/

echo "build-ok-$(date +%s)" > _infra/dist/buildinfo.txt
echo "=== BUILD COMPLETE ===" && ls _infra/dist/
