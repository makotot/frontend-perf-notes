#!/bin/bash

cd _gh-pages/
git init
git config user.name "makotot"
git config user.email "makoto.ttn@gmail.com"
git add .
git commit -m "Deploy to gh-pages"
git push -fq "https://${GH_TOKEN}@github.com/${GH_REPO}.git" master:gh-pages > /dev/null 2>&1

