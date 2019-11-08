# pedro... il dockerfile S'E' ROTT!
command := docker-compose run -u 1000 --rm

build:
	${command} socketio npm i 
#	docker build -t mgarza/socketiochat .

run:
#	docker run -d mgarza/socketiochat
	${command} socketio npm start 
