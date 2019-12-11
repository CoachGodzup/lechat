from node:latest
copy /dist /app
workdir /app
expose 8080:1616
run npm install
run npm run build
