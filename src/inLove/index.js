import React from "react";

import "./styles.css";
import "../App.css";

import $ from "jquery";

import "bootstrap/dist/css/bootstrap.min.css";


const Inlove = () => {

  $(function() {
    // Get random number between 2 ranges
    function randomNum(m, n) {
      m = parseInt(m);
      n = parseInt(n);
      return Math.floor(Math.random() * (n - m + 1)) + m;
    }
    
    function heartAnimation() {
      var effectTextDiv = $('.effect-text');
      var heartCount = (effectTextDiv.width()/200)*5;
      for (var i = 0; i< heartCount; i++) {
        var heartSize = (randomNum(60, 120) / 10);
        effectTextDiv.append('<span className="tiny-heart" style="top: '+ randomNum(40, 80) +'%; left: '+ randomNum(0, 100) +'%; width: '+ heartSize +'px; height: '+ heartSize +'px ; animation-delay: -'+ randomNum(0, 3) +'s; animation-duration: '+ randomNum(2, 5) +'s"></span>')
      }
    }
    
    heartAnimation();
  })

  //#region Rendering
  return (
    <div className="Inlove-div">
      <header></header>
      <div>
        <div class="effect-text">In love</div>
      </div>
    </div>
  );
  //#endregion
};

export default Inlove;
