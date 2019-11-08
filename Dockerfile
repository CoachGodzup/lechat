# pedro... il dockerfile S'E' ROTT!

from node:latest
copy . /app
workdir /app
expose 8080:1616
run npm install
