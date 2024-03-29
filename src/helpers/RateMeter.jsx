import React, { Component, useEffect, useRef } from "react";
import StarIcon from "../Assets/SVG/star_icon";

const RateMeter = props => {
  useEffect(() => {
    if (props.star === "1") {
      document.getElementById("rating_perc").style.width =
        props.rating.toString() + "%";
    } else if (props.star === "2") {
      document.getElementById("rating_perc_2").style.width =
        props.rating.toString() + "%";
    } else if (props.star === "3") {
      document.getElementById("rating_perc_3").style.width =
        props.rating.toString() + "%";
    } else if (props.star === "4") {
      document.getElementById("rating_perc_4").style.width =
        props.rating.toString() + "%";
    } else if (props.star === "5") {
      document.getElementById("rating_perc_5").style.width =
        props.rating.toString() + "%";
    }
  });

  return (
    <div className="RateMeter flex items-baseline gap-3">
      <div className="flex items-center gap-2">
      <h3 className="heading_6 h10_margin">{props.star} </h3>
        <StarIcon fill={true}/>
      </div>

      <div className="rating_bar h10_margin ">
        {props.star === "1" ? (
          <div id="rating_perc" />
        ) : props.star === "2" ? (
          <div id="rating_perc_2" />
        ) : props.star === "3" ? (
          <div id="rating_perc_3" />
        ) : props.star === "4" ? (
          <div id="rating_perc_4" />
        ) : (
          <div id="rating_perc_5" />
        )}
      </div>
      <h3 className="heading_6 h10_margin">
        {props.rate_count > 0 ? props.rate_count : 0}
      </h3>
    </div>
  );
};

export default RateMeter;
