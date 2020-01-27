#!/usr/bin/env sh

# 启动服务
cd src/server
npx cross-env NODE_ENV=development nodemon app.js