git pull
npm install
NODE_ENV=production forever --uid "status-server" -a start app.js
