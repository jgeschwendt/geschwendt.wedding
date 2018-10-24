# Load the environment variables
ifdef ENV
export ENV_FILE = .env.$(ENV)
else
export ENV_FILE = .env
endif

# Include the envionment variables in this Makefile
include $(ENV_FILE)

CONTAINER_NAME = node:latest
NODE_CONTAINER = \
	--env-file $(ENV_FILE) \
	--interactive \
	--rm \
	--tty \
	--volume $(shell pwd):/var/task \
	--workdir /var/task \
	$(CONTAINER_NAME)

dev:
	@docker run $(NODE_CONTAINER) /bin/bash

devbox:
	@docker build --no-cache --tag $(CONTAINER_NAME) .

install:
	@docker run $(NODE_CONTAINER) npm install

build:
	@docker run $(NODE_CONTAINER) npm run build

start:
	@docker run --publish 8080:8080 $(NODE_CONTAINER) npm start

startover:
	rm -rf node_modules
	rm -f package-lock.json
	make devbox
	make install

profile:
	@docker run $(NODE_CONTAINER) npm run profile
