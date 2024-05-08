#!/bin/bash

git pull
npm install --legacy-peer-deps
npm run build
