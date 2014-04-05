all: serve

compile:
	node_modules/browserify/bin/cmd.js app.js > bundle.js

serve: compile
	ruby -run -e httpd -- -p 5000 .

publish: compile
	git branch -D gh-pages
	git checkout -b gh-pages
	git push -f origin gh-pages
