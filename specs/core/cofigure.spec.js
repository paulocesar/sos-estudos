var assert = require('assert'),
    C = require('../../src/core/configure');

describe('Configure', function () {
    it('creates user', function () {
        console.log(C().session().done());
        console.log(C().validate().session().done());
        console.log(C().session().validate({field: "a"}).done());
    });
});