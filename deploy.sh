#!/bin/bash

find * -maxdepth 0 -name '_gh-pages' -prune -o -exec rm -rf '{}' ';'
cd _gh-pages/
git init
git config user.name "${GIT_COMITTER_NAME}"
git config user.email "${GIT_COMITTER_EMAIL}"
ls -la
#git add .
#git commit -m "Deploy to gh-pages"
#git push -fq "https://${GH_TOKEN}@github.com/${GH_REPO}.git" master:gh-pages > /dev/null 2>&1

