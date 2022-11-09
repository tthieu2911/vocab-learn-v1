import React from "react";

import "./styles.css";
import "../App.css";

import $ from "jquery";

import "bootstrap/dist/css/bootstrap.min.css";

const AnimatedHeartBeat = () => {
  //#region Rendering
  return (
    <div className="Animated-Heart-Beat-div">
      <header></header>
      <div>
        <div className="flex-container">
          <div className="heart">
            <div className="heart-piece-0"></div>
            <div className="heart-piece-1"></div>
            <div className="heart-piece-2"></div>
            <div className="heart-piece-3"></div>
            <div className="heart-piece-4"></div>
            <div className="heart-piece-5"></div>
            <div className="heart-piece-6"></div>
            <div className="heart-piece-7"></div>
            <div className="heart-piece-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
  //#endregion
};

export default AnimatedHeartBeat;
