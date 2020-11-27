const chai = require('chai');

const { expect } = chai;

describe('app test success', function () {
  it('checks true', function () {
    expect(true).to.be.true;
  });
});

describe('app test failed', () => {
  it('checks false', () => {
    expect(false).to.be.false;
  });
});
