EHEALTHSCANNER BACKEND
===========================

### Prerequisite:
- NodeJS (v4.4.7).
- build-essential (on Ubuntu)

### Local Environment:

- Environment variables:
    - To run in debug mode: ```export DEBUG=true```
    - To run with test data (database must be empty first time): ```export TEST_DATA=true```

- Setting up:
```
$ npm install
```
   
- Compile:
```
$ npm run compile
```

- Run all tests (requires running compile when code changes):
```
$ npm test
```

- Run app (requires running compile when code changes):
```
$ npm start
```

### Docker Test

Use this for debugging when the CI environment build is broken but your local tests are passing.

```
$ make docker-test
```


### Functional Test

##### With docker:

```
$ make docker-image && make functional-test
```

##### With local JMeter

1. Add ehealthscanner.backend to your /etc/hosts in your localhost
2. Open [JMeter 2.9](https://github.com/apiumtech/docker-jmeter-2.9/blob/master/src/apache-jmeter-2.9.tar.gz?raw=true), run 'npm start' and 'npm run backdoor' in parallel
3. Run plan at /ehealthscanner/backend/test/functional/functional.jmx

(TODO: for the db test, we need to add com.mysql.jdbc.driver to apache-jmeter-2.9.tar.gz)

# USING JETBRAINS IDE

### Prerequisites

1. Install Node && TypeScript plugins
2. Go to Settings > Lenguages & Frameworks > Node.js and NPM and select your local Node v4.4.7 as Node interpeter.
3. Install nodemon in your system: ```$ npm install -g nodemon```

### Auto-Compiling when code changes

Go to Settings > Lenguages & Frameworks > TypeScript

1. Mark Enable Typescript Compiler.
2. Use your local Node v4.4.7 as Node interpeter.
3. Use /ehealthscanner/backend/node_modules/typescript/lib as your Compiler version

You should see a new "TypeScript Compiler" tab in your bottom panel with errors and further feedback from the typescript compiler.

### Running server with autorestart when code changes

- Go to Run > Edit Configurations
- Add New Configuration "Node.js"
- Add TEST_DATA Environment Variable (recommended)
- Add DEBUG Environment Variable (optional)
- Node Parameters: /path/to/nodemon (recommended, if this is not used autorestart will not happen)
- Javascript File: /ehealthscanner-backend/compiled-src/node_modules/express/main.js
- Click OK, and run the resulting configuratioon

### Running server with debugger support

- Copy previous configuration
- Let 'Node Parameters' field as blank (nodemon does not debug correctly from the IDE).
- Click OK, and debug the resulting configuration.

### Running unit tests

- Go to Run > Edit Configurations
- Add New Configuration "Mocha"
- Add DEBUG Environment Variable (optional)
- Test Directory: /ehealthscanner/backend/compiled-src/tests/unit
- Click OK, and run the resulting configuration