.PHONY: build delete docker-image docker-test functional-test

DOCKER_REGISTRY=docker.apiumtech.io
PROJECT=ehealthscanner-backend
TAG=latest
IMAGE=$(DOCKER_REGISTRY)/$(PROJECT):$(TAG)
IMAGE_LATEST=$(DOCKER_REGISTRY)/$(PROJECT):latest

build: docker-test
	docker push $(IMAGE)
delete:
	docker rmi $(IMAGE)

docker-image:
	docker build -t $(IMAGE_LATEST) .

DC_IT=docker-compose -p ehealthscannerbackendit

docker-test: docker-image
	cd test/integration && \
	($(DC_IT) down -v || true) && \
	$(DC_IT) run web && \
	$(DC_IT) down -v
	docker tag $(IMAGE_LATEST) $(IMAGE)

DC_FT=TAG=$(TAG) docker-compose -p ehealthscannerbackendft

functional-test:
	cd test/functional && \
	($(DC_FT) down -v || true) && \
	$(DC_FT) run jmeter && \
	$(DC_FT) down -v
