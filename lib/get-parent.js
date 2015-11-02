/*
 * BDD-Extend | Mocha interfaces
 * lib/get-parent
 * Copyright(c) 2015 Aleksadner Szmigiel <kontakt@some-say.com>
 * MIT Licensed
 */

var getParent = function (_test) {
	if (_test.parent !== undefined) {
		return getParent(_test.parent);
	}
	return _test;
};

module.exports = getParent;