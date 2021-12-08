console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('/Rhyme/main.js', 'utf8');

describe('', function () {
  it('', function() {
    let structureOne = function() {
      const getSuggestions = () => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            renderRawResponse(xhr.response)
          }
        }
      }
    };
    
    let finalStructure = function() {
      const getSuggestions = () => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            renderResponse(xhr.response)
          }
        }
      }
    };

    let isMatchOne = Structured.match(code, structureOne);
    let isMatchFinal = Structured.match(code, finalStructure);
    assert.isOk(isMatchOne || isMatchFinal, 'Did you include the code from the instructions inside the code block of `xhr.onreadystatechange()`')
  });
});