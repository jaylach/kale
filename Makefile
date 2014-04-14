MOCHA_OPTS = --check-leaks --recursive
MOCHA_REPORTER = spec

test: 
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(MOCHA_REPORTER) \
		$(MOCHA_OPTS)

parser:
	./node_modules/.bin/jison src/grammar.jison src/lexer.jisonlex -o lib/parser.js -p lalr

.PHONY: test