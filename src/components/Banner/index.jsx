import React, { Component } from "react";
import Img from "../../Assets/add_section.png";
export default class AddvertiseSection extends Component {
  render() {
    return (
      <div id="ad_section_wrapper mb-4">
        <div id="ad_section">
            <div className="w-full my-2">

          <h1 className="text-xl text-center text-primary-dark font-semibold">New Arrivals</h1>
            </div>
          <img src={Img} alt="" />
          <div className="testing-header"></div>
        </div>
      </div>
    );
  }
}
