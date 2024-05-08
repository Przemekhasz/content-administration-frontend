#!/bin/bash

git pull origin main
npm install --legacy-peer-deps
npm run build

