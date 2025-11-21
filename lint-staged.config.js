module.exports = {
  '{backend,frontend}/**/*.{js,vue}': [
    'eslint --cache --fix --color',
    'prettier --write',
  ],
  '{backend,frontend}/**/*.{json,css,scss,md}': [
    'prettier --write',
  ],
}