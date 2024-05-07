#!/bin/bash
# shellcheck disable=SC2164
cd /var/www/content-administration-frontend
git pull
npm install --legacy-peer-deps
npm run build
