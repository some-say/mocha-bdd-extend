var chai = require('chai');
var expect = chai.expect;
var getParent = require('../lib/get-parent');
// mocks
var mockObj = require('./fixtures/get-parent-obj');

describe('getParent()', function () {
	it('search value in #4 parent', function () {
		expect(getParent(mockObj)).to.eql({
			test: 'yupi!'
		});
	});
});
