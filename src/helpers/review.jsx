import React, { Component } from "react";
import StarIcon from "../Assets/SVG/star_icon";
import liked_icon from "../Assets/like_icon.png";
import axios from "axios";
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      isLiked: false,
      user_id: "",
    };
  }

  componentDidMount() {
    let tem = [];
    for (let i = 0; i < this.props.item.rating; i++) {
      tem.push(0);
    }
    this.setState({ stars: tem, user_id: this.props.userData.user_id });
    this.isUserLikedThisReview();
  }
  isUserLikedThisReview = () => {
    const found = this.props.item.likes.find(
      (item) => item == this.props.userData.user_id
    );

    this.setState({
      isLiked: found ? true : false,
    });
  };
  onLikingTheReview = async () => {
    try {
      if (this.props.userData.email == "") {
        return alert("Please logged in first");
      }
      await axios.post(
        `${process.env.REACT_APP_HOST}/like-the-review/${this.props.item.review_id}`,
        {
          product_id: this.props.product_id,
          user_id: this.state.user_id,
        }
      );
      this.setState({
        isLiked: !this.state.isLiked,
      });
      this.props.reload();
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <div className="flex w-full flex-row items-center align-middle justify-center my-3 pr-5">
        <div className="w-full">
          <div className="review_header flex justify-between ">
            <div className="">
              <p className="text-sm">{this.props.item.user_name}</p>
            </div>

            <div className="stars d-flex-ac flex align-middle">
              {this.state.stars.map((item) => (
                <StarIcon fill={true} />
              ))}
            </div>
          </div>
          <br />
          <h3 className="text-xl font-semibold "> {this.props.item.title} </h3>
          <h5 className="text-lg font-thin">{this.props.item.review} </h5>
          <div className="flex align-middle items-center  helped-btn">
            <div className="" onClick={() => this.onLikingTheReview()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-thumb-up"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#14b8a6"
                fill={this.state.isLiked ? "#14b8a6" : "none"}
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
              </svg>
            </div>

            <p className="text-lg font-semibold">{this.props.item.likes.length}</p>
          </div>
          <br />
          <div className="hr_line_2 w-full h-[2px] bg-gray-400 mb-5" />
        </div>
      </div>
    );
  }
}

export default Review;
