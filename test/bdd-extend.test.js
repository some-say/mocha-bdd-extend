var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Array', function (){
    describe('#indexOf()', function (){
        it('should return -1 when the value is not present', function (){
            [1,2,3].indexOf(5).should.equal(-1);
            [1,2,3].indexOf(0).should.equal(-1);
        });

        it('should return the correct index when the value is present', function (){
            [1,2,3].indexOf(1).should.equal(0);
            [1,2,3].indexOf(2).should.equal(1);
            [1,2,3].indexOf(3).should.equal(2);
        });
    });
});

describe('Array', function (){
    describe('#pop()', function (){
        it('should remove and return the last value', function(){
            var arr = [1,2,3];
            arr.pop().should.equal(3);
            arr.should.eql([1,2]);
        });
    });
});

context('Array', function (){
    beforeEach(function(){
        this.arr = [1,2,3];
    });

    specify('has a length property', function (){
        this.arr.length.should.equal(3);
    });
});

describe('changePending()', function () {
    step('test case forever disabled', function () {
        expect(true).to.be.true;
    });

    step('switch test case "test case switch disabled to enable"', function (done) {
        changePending.call(this, 'test case switch disabled to enable', false);
        setTimeout(function () {
            expect(true).to.be.true;
            done();
        }, 1000)
    });

    step('test case switch disabled to enable', function () {
        expect(true).to.be.true;
    });

    changePending('test case forever disabled', true);
    changePending('test case switch disabled to enable', true);
});

describe('step()', function () {
    it('check functions step and xstep', function () {
        expect(step).to.be.a('function');
        expect(xstep).to.be.a('function');
    });

    describe('synchronous', function () {
        step('check step function', function () {
            expect(true).to.be.true;
        });
    });

    describe('async (callback)', function() {
        step('check not override function it(done)', function (_done) {
            setTimeout(_done, 100);
        });
    });
});

describe('xstep()', function () {
    describe('synchronous', function () {
        xstep('xstep vaild', function () {
            expect(true).to.be.true;
        });
    });

    describe('async (callback)', function() {
        xstep('xstep(done) vaild', function (_done) {
            setTimeout(_done, 100);
        });
    });
});

describe('step() not vaild expect and switch bail', function () {
    step('very bad expect', function () {
        expect(false).to.be.true;
    });
});

describe('step() never call', function () {
    step('step never execute', function () {
        expect(true).to.be.true;
    });

    it('it never execute', function () {
        expect(true).to.be.true;
    });

    xstep('xstep never execute', function () {
        expect(true).to.be.true;
    });

    xit('xit never execute', function () {
        expect(true).to.be.true;
    });
});