all: serve

compile:
	node_modules/browserify/bin/cmd.js app.js > bundle.js

serve: compile
	ruby -run -e httpd -- -p 5000 .
