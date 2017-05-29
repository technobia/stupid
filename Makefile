.PHONY: build delete staging qa demo

DOCKER_REGISTRY=localhost:5000
TAG=undefined

ENV_ARGS=DOCKER_REGISTRY=$(DOCKER_REGISTRY) TAG=$(TAG)

build:
	cd frontend/ && $(ENV_ARGS) ./ci/build.sh
	cd backend/ && $(ENV_ARGS) ./ci/build.sh

delete:
	cd frontend/ && $(ENV_ARGS) ./ci/delete.sh
	cd backend/ && $(ENV_ARGS) ./ci/delete.sh

staging:
	./run.sh staging

qa:
	./run.sh qa

demo:
	./run.sh demo
