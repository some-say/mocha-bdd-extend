/*
 * BDD-Extend | Mocha interfaces
 * lib/bail-suits
 * Copyright(c) 2015 Aleksadner Szmigiel <kontakt@some-say.com>
 * MIT Licensed
 */

var bailSuits = function (_suites) {
	if (_suites.suites && _suites.suites.length === 0) {
		return false;
	}

	for (var i = 0, j = _suites.suites.length; i < j; i++) {
		_suites.suites[i]._bail = true;

		if (_suites.suites[i].suites && _suites.suites[i].suites.length > 0) {
			bailSuits(_suites.suites[i]);
		}
	}
};

module.exports = bailSuits;