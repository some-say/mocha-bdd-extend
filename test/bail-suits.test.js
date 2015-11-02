var chai = require('chai');
var expect = chai.expect;
var bailSuits = require('../lib/bail-suits');
// mocks
var suitsEmpty = require('./fixtures/suits-obj-empty');
var suitsObj = require('./fixtures/suits-obj');

describe('bailSuits()', function () {
	it('empty suits', function () {
		expect(bailSuits(suitsEmpty)).to.be.false;
	});

	it('test 543', function () {
		bailSuits(suitsObj);

		expect(suitsObj.suites[0]._bail).to.be.true;
		expect(suitsObj.suites[0].suites[0]._bail).to.be.true;
		expect(suitsObj.suites[0].suites[0].suites[0]._bail).to.be.true;
		expect(suitsObj.suites[1]._bail).to.be.true;
	});

	it('change property for all suits', function () {
		bailSuits(suitsObj);

		expect(suitsObj.suites[0]._bail).to.be.true;
		expect(suitsObj.suites[0].suites[0]._bail).to.be.true;
		expect(suitsObj.suites[0].suites[0].suites[0]._bail).to.be.true;
		expect(suitsObj.suites[1]._bail).to.be.true;
	});
});
