all: up

cert:
	if [ ! -d "cert" ]; then mkdir -p cert; fi
	if [ ! -f "cert/key.pem" ]; then openssl genrsa -out ./cert/key.pem 2048; fi
	if [ ! -f "cert/cert.pem" ]; then openssl req -new -x509 -key ./cert/key.pem -out ./cert/cert.pem -days 365 \
		-subj "/C=BE/ST=Bruxelles/L=Bruxelles/O=s19/OU=Transcendence/CN=127.0.0.1/emailAddress=alondot@gmail.com"; fi

up: cert
	docker compose up -d

build: cert
	docker compose up -d --build

down:
	docker compose down

fclean: down
	docker system prune -a

re: down build

.PHONY: all cert up build down fclean re
