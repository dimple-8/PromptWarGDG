Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json, package.json, index.html, vite.config.js, eslint.config.js -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force src -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force public -ErrorAction SilentlyContinue
Move-Item -Path wanderlust-next\* -Destination . -Force
Move-Item -Path wanderlust-next\.eslintrc.json -Destination . -Force -ErrorAction SilentlyContinue
Move-Item -Path wanderlust-next\.gitignore -Destination . -Force -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force wanderlust-next
