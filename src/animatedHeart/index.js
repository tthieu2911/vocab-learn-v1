import React from "react";

import "./styles.css";
import "../App.css";

import AnimatedHeartBeat from "../animatedHeartBeat";

import $ from "jquery";

import "bootstrap/dist/css/bootstrap.min.css";

const AnimatedHeart = () => {
  //#region Rendering
  return (
    <div className="Animated-Heart-div">
      <header></header>
      <div>
        <AnimatedHeartBeat />
        <svg
          id="animated-heart"
          enable-background="new 0 0 512 512"
          height="300"
          viewBox="0 0 512 512"
          width="300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="heart">
            <g id="stroke">
              <path
                class="stroke"
                d="m228.667 146.667h54.666v-54.667h54.667v-54.667h54.667 54.666v54.667h54.667v54.667 54.666 54.667h-54.667v54.667h-54.666v54.666h-54.667v54.667h-54.667v54.667h-54.666v-54.667h-54.667v-54.667h-54.667v-54.666h-54.666v-54.667h-54.667v-54.667-54.666-54.667h54.667v-54.667h54.666 54.667v54.667h54.667z"
                fill="#ff7b79"
                stroke="#4A4C5A"
                stroke-width="14"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
  //#endregion
};

export default AnimatedHeart;
