git pull origin main
pm2 stop index
# rm -rf node_modules
# rm -rf backend/node_modules
# rm -rf frontend/node_modules
# node_v=$(node -v) # save current node version
# nvm use 14
yarn && yarn build
cd backend
pm2 start index.js
cd ..
# nvm use $node_v # return node version used before