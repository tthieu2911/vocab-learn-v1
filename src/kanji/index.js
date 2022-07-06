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

  var _curDict = [];

  const loadData = () => {
    importData('file/kanji4-1.txt');
  }

  // Import data from local file
  function importData(fileName) {
    $.get(fileName, function (data, res) {
      _curDict = [];

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
              "english": splitWords(words[1])
            }
          }
          else {
            wordsObj = {
              "kanji": words[0],
              "romaji": words[1],
              "english": splitWords(words[2])
            }
          }

          // Push to Dictionary
          _curDict.push(wordsObj);
          wordsObj = {};
        }

        displayWord();
      }
    });
  }

  function splitWords(words) {
    var arr = words.split(",").map(function (item) {
      return item.trim();
    });
    console.log(arr);
    return arr;
  }

  function displayWord() {
    setKanjiList(_curDict);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container-fluid row" >
          <div className="col-md-2 col-sm-2 col-2"></div>
          <div className="col-md-8 col-sm-8 col-8 row" >
            <div className="col-md-1 col-sm-1 col-1"><img src={logo} className="App-logo" alt="logo" /></div>
            <div className="col-md-11 col-sm-11 col-11" align-text="left"><h1>LEARNING</h1></div>
          </div>
          <div className="col-md-2 col-sm-2 col-2"></div>
        </div>
      </header>

      <div>
        <hr />
        <div className="container-fluid" id="kanji_div">
          <h3 className="text-center"> KANJI MODE </h3>
          <div className="text-center">
              <a href="/" id="hdnDetail" title="Ctrl - gợi ý; Enter - Kiểm tra kết quả; Phím mũi tên - Chuyển ô; Tab - Chuyển ô và Kiếm tra kết quả">Hint.</a>
            </div>
          <br />
          <div className="container-fluid row text-center">
            <div className="col-md-2 col-sm-2 col-2"></div>
            <div className="col-md-8 col-sm-8 col-8 row">
              <div className="col-md-2 col-sm-2 col-2"></div>
              <div className="col-md-3 col-sm-3 col-3 ">
                <button type="button" className="btn btn-primary btn-sm btn-warning" onClick={() => loadData()}>
                  <FaFileUpload />
                  <span> Load data </span>
                </button>
              </div>
              <div className="col-md-3 col-sm-3 col-3 ">
                <button type="button" className="btn btn-primary btn-sm btn-success" onClick={() => mixKanjiWord()}>
                  <FaRandom />
                  <span> Mix Words </span>
                </button>
              </div>
              <div className="col-md-3 col-sm-3 col-3 ">
                <button type="button" className="btn btn-primary btn-sm btn-edit" onClick={() => clearAll()}>
                  <FaTrash />
                  <span> Clear All </span>
                </button>
              </div>
              <div className="col-md-1 col-sm-1 col-1"></div>
            </div>
            <div className="col-md-2 col-sm-2 col-2"></div>
          </div>
          <br />

          <div className="container-fluid row">
            <div className="container-fluid row kanji" id="kanji_area">
              <div className="row">
                {/* <!-- Kanji list --> */}
                {kanjiList.length !== 0 &&
                  kanjiList.map((item, index) =>
                    <KanjiBlock key={index} block={item} />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kanji;
