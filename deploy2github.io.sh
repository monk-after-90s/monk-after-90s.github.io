#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://monk-after-90s.github.io
git push -f git@github.com:monk-after-90s/monk-after-90s.github.io.git main:gh-pages

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
#git push -f git@github.com:monk-after-90s/StudentMgr.git main:gh-pages

cd -