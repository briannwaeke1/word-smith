console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('public/main.js', 'utf8');

describe('', function () {
  it('', function() {
    let structureOne = function() {
      const queryParams = $queryParams
    };

    varCallbacks = [
      function($queryParams){
        if($queryParams.value !== 'rel_jjb='){
          return {failure: 'Did you assign `queryParams` to \'rel_jjb=\'?'}
        }
        return true
      }
    ]

    let isMatchOne = Structured.match(code, structureOne, { varCallbacks });

    assert.isOk(isMatchOne, varCallbacks.failure || 'Did you replace \'rel_rhy\' with \'rel_rhy=\'?');
  });
});
