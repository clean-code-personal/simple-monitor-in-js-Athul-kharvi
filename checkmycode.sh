#!/bin/bash
set -e

[ ! -d "./node_modules" ] && echo "Please npm install first." && exit 1

npx eslint --fix .

npx jscpd --min-lines 3 --min-tokens 25 --threshold 0 --gitignore .

npm audit

npx nyc --all --reporter=html --reporter=text npm run test
npx nyc check-coverage --functions 100 --branches 100 --lines 100

echo "Check Complete :)"
