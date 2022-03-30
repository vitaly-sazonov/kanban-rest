const chai = require('chai');
const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);

global.jestExpect = global.expect;
global.expect = chai.expect;
