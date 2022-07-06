import React from 'react';

import $ from 'jquery';

import '../App.css';
import './styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const KanjiBlock = (blockProps) => {

  const { kanji, romaji, english } = blockProps.block;

  const onEnterWords = function (event) {
    var key = event.keyCode;
    var input = event.target;
    var _iptElement = $(input);

    switch (key) {
      case 13: { //enter
        checkWord(input);
        _iptElement.parent().parent().next().children().find('input').focus();
        break;
      }
      case 17: {//Ctrl
        showWordResult(input);
        break;
      }
      case 9: { //tab
        checkWord(input);
        break;
      }
      case 39: { //forward
        _iptElement.parent().parent().next().children().find('input').focus();
        break;
      }
      case 37: { //backwward
        _iptElement.parent().parent().prev().children().find('input').focus();
        break;
      }
      default: {
        break;
      }
    }
  }

  const checkWord = function (input) {
    var _iptElement = $(input);
    var _value = input.value;
    var _expectedResult = [];
    var _arrExpectedResult = [];
    
    if (_value !== "") {
      // attr() return as String
      _expectedResult = _iptElement.parent().find('.result_kanji').attr('result').toLowerCase();
      _arrExpectedResult = _expectedResult.split(",");

      if (_arrExpectedResult.indexOf(_value.toLowerCase()) !== -1) {
        // input
        _iptElement.removeClass("text-danger").addClass("text-success");
        
        // result
        _iptElement.parent().find('.result_kanji').removeClass("text-danger").addClass("text-success").text(_expectedResult);
        
        // move to next word
        _iptElement.parent().parent().next().children().eq(1).find('input').focus();
      }
      else {
        _iptElement.removeClass("text-success").addClass("text-danger");
        _iptElement.parent().find('.result_kanji').removeClass("text-success").addClass("text-danger").text("Failed");
      }
    }
  }


  // Show word result
  const showWordResult = function (input) {
    var _iptElement = $(input);
    var _expectedResult = [];

    _expectedResult = _iptElement.parent().find('.result_kanji').attr('result');

    _iptElement.parent().find('.result_kanji').removeClass("text-success").addClass("text-danger").text(_expectedResult); 
    _iptElement.val("");
  }

  const onFocusChange = function (event) {
    // do nothing
  }

  return (
    <div className='col-6 col-md-2 kanji_block'>
      <div className='kanji_contain'>
        <span>{kanji}</span>
      </div>
      <div>
          <span>{romaji}</span>
      </div>
      <div className='kanji_result_contain'>
        <div className='kanji_result_contain dvKanjiResult'>
          <span>Result: </span>
          <span className='result_kanji' result={english}></span>
        </div>
        {/* If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `kanjikey` instead. */}
        <input className='form-control' onKeyDown={onEnterWords} onFocus={onFocusChange} />
      </div>
    </div>
  )
};

export default KanjiBlock;
