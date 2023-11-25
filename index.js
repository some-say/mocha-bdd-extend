/*
 * BDD-Extend | Mocha interfaces
 * Copyright(c) 2015 Aleksadner Szmigiel <kontakt@some-say.com>
 * MIT Licensed
 */

/**
 * This example is identical to the BDD interface, but with the addition of a
 * "comment" function:
 * https://github.com/mochajs/mocha/blob/master/lib/interfaces/bdd.js
 */

const Mocha = require('mocha');
const Suite = require('mocha/lib/suite');
const Test = require('mocha/lib/test');
const escapeRe = require('escape-string-regexp');
const getParent = require('./lib/get-parent');
const bailSuits = require('./lib/bail-suits');

/**
 * BDD-style interface:
 *
 *      describe('Array', function() {
 *        describe('#indexOf()', function() {
 *          it('should return -1 when not present', function() {
 *            // ...
 *          });
 *
 *          it('should return the index when present', function() {
 *            // ...
 *          });
 *        });
 *      });
 *
 * @param {Suite} suite Root suite.
 */
module.exports = Mocha.interfaces['bdd-extend'] = function(suite) {
    const suites = [suite];

    suite.on('pre-require', function(context, file, mocha) {
        const common = require('mocha/lib/interfaces/common')(suites, context);

        var self = this;

        context.before = common.before;
        context.after = common.after;
        context.beforeEach = common.beforeEach;
        context.afterEach = common.afterEach;
        context.run = mocha.options.delay && common.runWithSuite(suite);
        /**
         * Describe a "suite" with the given `title`
         * and callback `fn` containing nested suites
         * and/or tests.
         */

        context.describe = context.context = function(title, fn) {
            const suite = Suite.create(suites[0], title);
            suite.file = file;
            suites.unshift(suite);
            fn.call(suite);
            suites.shift();
            return suite;
        };

        /**
         * Pending describe.
         */

        context.xdescribe = context.xcontext = context.describe.skip = function(title, fn) {
            const suite = Suite.create(suites[0], title);
            suite.pending = true;
            suites.unshift(suite);
            fn.call(suite);
            suites.shift();
        };

        /**
         * Exclusive suite.
         */

        context.describe.only = function(title, fn) {
            const suite = context.describe(title, fn);
            mocha.grep(suite.fullTitle());
            return suite;
        };

        /**
         * Describe a specification or test-case
         * with the given `title` and callback `fn`
         * acting as a thunk.
         */

        context.it = context.specify = function(title, fn) {
            const suite = suites[0];
            if (suite.pending) {
                fn = null;
            }
            const test = new Test(title, fn);
            test.file = file;
            suite.addTest(test);
            return test;
        };

        /**
         * Exclusive test-case.
         */

        context.it.only = function(title, fn) {
            const test = context.it(title, fn);
            const reString = '^' + escapeRe(test.fullTitle()) + '$';
            mocha.grep(new RegExp(reString));
            return test;
        };

        /**
         * Pending test case.
         */

        context.xit = context.xspecify = context.it.skip = function(title) {
            context.it(title);
        };

        /**
         * Step test case
         */
        context.step = function(title, fn) {
            const syncStep = async function () {
                try {
                    await fn.call(this);
                } catch (error) {
                    bailSuits(getParent(this.test));
                    this.test.parent._bail = true;

                    throw error;
                }
            };

            const asyncStep = async function (done) {
                const onError = () => {
                    bailSuits(getParent(this.test));
                    this.test.parent._bail = true;
                    process.removeListener('uncaughtException', onError);
                }

                process.addListener('uncaughtException', onError);

                try {
                    fn.call(this, function(error) {
                        if (error) {
                            onError();
                            done(error);
                        } else {
                            process.removeListener('uncaughtException', onError);
                            done(null);
                        }
                    });
                } catch(_error) {
                    onError();

                    throw _error;
                }
            };

            if (fn.length === 0) {
                context.it(title, syncStep);
            } else {
                context.it(title, asyncStep);
            }
        };

        context.xstep = function (title) {
            context.xit(title);
        };

        context.changePending = function (title, isPending) {
            let suiteTests = suites[0].tests;

            if (suiteTests && suiteTests.length === 0) {
                suiteTests = this.test.parent.tests;
            }

            for (let i = 0, j = suiteTests.length; i < j; i++) {
                if (suiteTests[i].title === title) {
                    suiteTests[i].pending = isPending;
                }
            }
        };
    });
};
