git pull origin main
pm2 stop index
# rm -rf node_modules
# rm -rf backend/node_modules
# rm -rf frontend/node_modules
yarn && yarn build
cd backend
pm2 start index.js
cd ..
