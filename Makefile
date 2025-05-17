.PHONY: install test coverage lint run

install:
	npm install

test:
	npm test

coverage:
	npm run test:coverage

lint:
	npm run lint

run:
	npx gendiff
