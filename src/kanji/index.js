import React, { useState } from 'react';

import logo from '../../src/logo.svg';
import './styles.css';
import '../App.css';

import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRandom, FaTrash, FaFileUpload } from 'react-icons/fa';

// Imported components should be started with capital letters: KanjiBlock not kanjiBlock
import KanjiBlock from '../kanjiBlock';

const Kanji = (kanjiProps) => {

  const [kanjiList, setKanjiList] = useState('');

  var vocabDictionary = [];

  function mixKanjiWord() {
    // mix Kanji blocks
    var _blocks = $(".kanji_block");
    for (var i = 0; i < _blocks.length; i++) {
      var _target1 = Math.floor(Math.random() * _blocks.length - 1) + 1;
      var _target2 = Math.floor(Math.random() * _blocks.length - 1) + 1;
      _blocks.eq(_target1).before(_blocks.eq(_target2));
    }

    // reset value
    $('.kanji_block').each(function () {
      $(this).find(':input').val("");
      $(this).find('.result_kanji').html('');
    });
  }

  function clearAll() {
    $(':input').val("");
    $('.result_kanji').html('');
  }

  var updateResult = function (value) {
    // value = data passed from Children 's function: onKeyDown = {onEnterWords}

    var _correctInput = $(':input.text-success');
    var _failedInput = $(':input.text-danger');

    $('#correctCount').text(_correctInput.length);
    $('#failedCount').text(_failedInput.length);

  }

  const loadData = () => {
    // init data
    $('#correctCount').text("0");
    $('#failedCount').text("0");

    // clear input
    clearAll();

    var _inptNoOfWord = $("#total");
    // jquery
    //    _inptNoOfWord.val()
    // Or _inptNoOfWord[0].val
    var _intNumber = _inptNoOfWord.val();

    importData('file/kanji4-1.txt', _intNumber);
    //importData('file/test.txt', _intNumber);
  }

  // Import data from local file
  function importData(fileName, inputNumber) {
    $.get(fileName, function (data, res) {
      vocabDictionary = [];
      var ignoreList = [];
      if (res) {
        var lines = data.split("\r\n");
        for (var i = 0; i < lines.length; i++) {
          var words = lines[i].split("/");
          var wordsObj = {};

          // Create object words
          if (words.length === 2) {
            wordsObj = {
              "kanji": words[0],
              "romaji": "",
              "english": words[1],
              "ignore": ""
            }
          } else {
            // Handle '(' .. ')' --> to be ignored
            ignoreList = hanldeIgnoreList(words[2]);

            wordsObj = {
              "kanji": words[0],
              "romaji": words[1],
              "english": words[2],
              "ignore": ignoreList
            }
            ignoreList = [];
          }

          // Push to Dictionary
          vocabDictionary.push(wordsObj);
          wordsObj = {};
        }

        displayWord(inputNumber);
      }
    });
  }

  function hanldeIgnoreList(srcString) {
    var resArray = [];
    if (srcString.lastIndexOf('(') !== -1 && srcString.lastIndexOf(')') !== -1) {

      // get all Indexes of Open & Close charater
      var index = 0;
      var indicesOpen = [];
      for (index = 0; index < srcString.length; index++) {
        if (srcString[index] === "(") indicesOpen.push(index);
      }
      var indicesClose = [];
      for (index = 0; index < srcString.length; index++) {
        if (srcString[index] === ")") indicesClose.push(index);
      }

      // Get list of ignore phrase
      // Open and Close charater should have same total
      for (index = 0; index < indicesOpen.length; index++) {
        if (index + 1 < indicesOpen.length) {
          resArray.push((srcString.slice(indicesOpen[index], indicesClose[index] + 1)) + ", ");
        } else {
          resArray.push((srcString.slice(indicesOpen[index], indicesClose[index] + 1)));
        }
      }
    }
    return resArray;
  }

  function displayWord(inputNumber) {
    // Suffle imported dictionary
    var _suffledDict = suffleDictionary(vocabDictionary);

    // Slice into new Dictionary w specific number
    var _arrWordDictToDisplay = [];
    var _intNumber = inputNumber === "" ? 0 : parseInt(inputNumber);

    switch (true) {
      case _intNumber === 0: {
        _arrWordDictToDisplay = _suffledDict;
        break;
      }
      case _intNumber !== 0 && _intNumber <= vocabDictionary.length: {
        _arrWordDictToDisplay = _suffledDict.slice(0, _intNumber);
        break;
      }
      case _intNumber !== 0 && _intNumber > vocabDictionary.length: {
        _arrWordDictToDisplay = _suffledDict;
        break;
      }
      default: {
        _arrWordDictToDisplay = _suffledDict;
        break;
      }
    }

    // Create Kanji list
    setKanjiList(_arrWordDictToDisplay);
  }

  function suffleDictionary(inputDict) {
    var newDict = inputDict.slice();
    var currIndex = inputDict.length, tmpItems, randIndex;

    while (0 !== currIndex) {
      // Get random index
      randIndex = Math.floor(Math.random() * currIndex);
      currIndex -= 1;
      // swap items
      tmpItems = newDict[currIndex];
      newDict[currIndex] = newDict[randIndex];
      newDict[randIndex] = tmpItems;
    }
    return newDict;
  }

  //#region Rendering
  return (
    <div className="App">
      <header>
      </header>
      <div className="container-fluid" >
        <div className="container-fluid App-header" >
          <div className="container-fluid row">
            <div className="col-md-2 col-sm-2 col-2"></div>
            <div className="col-md-8 col-sm-8 col-8 row" >
              <div className="col-md-4 col-sm-4 col-4"><img src={logo} className="App-logo" alt="logo" /></div>
              <div className="col-md-4 col-sm-4 col-4" align-text="left"><h1>LEARNING</h1></div>
              <div className="col-md-4 col-sm-4 col-4"></div>
            </div>
            <div className="col-md-2 col-sm-2 col-2"></div>
          </div>
        </div>
      </div>

      <div className="container-fluid" id="kanji_div">
        <div className="container-fluid" id="kanji_header">
          <div className="container-fluid row">
            <div className="col-md-2 col-sm-2 col-2"></div>
            <div className="col-md-8 col-sm-8 col-8 row">
              <h3 className="text-center"> KANJI MODE </h3>
              <div className="text-center">
                <a href="/" title="Ctrl - gợi ý; Enter - Kiểm tra kết quả; Phím mũi tên - Chuyển ô; Tab - Chuyển ô và Kiếm tra kết quả">Hint.</a>
              </div>
            </div>
            <div className="col-md-2 col-sm-2 col-2"></div>
          </div>
          <div className="container-fluid row">
            <div className="container-fluid row button-fields">
              <div className="col-md-3 col-sm-3 col-3">
                <input className='form-control' id='total' placeholder='No of words' type="number" min="1" />
              </div>
              <div className="col-md-2 col-sm-2 col-2 ">
                <button type="button" className="btn btn-primary btn-sm btn-warning" onClick={() => loadData()}>
                  <FaFileUpload />
                  <span> Load data </span>
                </button>
              </div>
              <div className="col-md-2 col-sm-2 col-2 ">
                <button type="button" className="btn btn-primary btn-sm btn-success" onClick={() => mixKanjiWord()}>
                  <FaRandom />
                  <span> Mix Words </span>
                </button>
              </div>
              <div className="col-md-2 col-sm-2 col-2 ">
                <button type="button" className="btn btn-primary btn-sm btn-edit" onClick={() => clearAll()}>
                  <FaTrash />
                  <span> Clear All </span>
                </button>
              </div>
              <div className="col-md-3 col-sm-3 col-3 row">
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-6 test-result">
                    <span className="text-success">Correct</span>
                  </div>
                  <div className="col-md-6 col-sm-6 col-6 test-count">
                    <span id="correctCount"></span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-6 test-result">
                    <span className="text-danger">Failed</span>
                  </div>
                  <div className="col-md-6 col-sm-6 col-6 test-count">
                    <span id="failedCount"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="container-fluid">
        <div className="container-fluid row kanji" id="kanji_area">
          <div className="row">
            {/* <!-- Kanji list --> */}
            {kanjiList.length !== 0 &&
              kanjiList.map((item, index) =>
                <KanjiBlock key={index} block={item} onKeyDown={updateResult} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
  //#endregion
}

export default Kanji;
