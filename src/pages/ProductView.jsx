import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../Services/Reducers/singleProductReducer";
import { useNavigate, useParams } from "react-router-dom";
import ProductViewSkeleton from "../components/Skeletons/ProductView";
import ItemCardScroller from "../components/Product/ItemCardScroller";
import axios from "axios";
import {
  addToCartlistProduct,
  addTowishlistProduct,
  removeFromCartlistProduct,
  removeFromWishlistProduct,
} from "../Services/api-calls";
import { getWishlistProducts } from "../Services/Reducers/productReducer";
import { ErrorNotify, SuccessNotify } from "../helpers/toasts";
import { REACT_APP_HOST } from "../lib/constants";
import { AverageRating } from "../Services/services";
import StarIcon from "../Assets/SVG/star_icon";
import Review from "../helpers/review";
import RateMeter from "../helpers/RateMeter";
import { getCartProducts } from "../lib/features/cartReducer";

const ProductView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [wishlisted, _setWishlisted] = React.useState(false);
  const [cartlisted, _setCartlisted] = React.useState(false);
  const [showReviewForm, _setShowReviewForm] = React.useState(false);
  const [userData, setUserData] = React.useState();
  const [ratings, _setRatings] = React.useState({
    one_star: "",
    two_star: "",
    three_star: "",
    four_star: "",
    five_star: "",
    max_count: "",
    final_rating: "",
  });
  const [reviews, _setReviews] = React.useState([]);
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useSelector((state) => state.singleProductReducer);

  const { wishlist, isLoading: wishLoading } = useSelector(
    (state) => state.wishlistReducer
  );

  const { cartlist, isLoading: cartLoading } = useSelector(
    (state) => state.cartlistReducer
  );

  React.useEffect(() => {
    userData && id && getData();
  }, [id, userData]);

  React.useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  React.useEffect(() => {
    document.title = product.product_Name || "loading...";
  }, [product]);

  useEffect(() => {
    id && wishlist && checkWishlisted();
    id && cartlist && checkCartlisted();
  }, [id, wishlist, cartlist]);

  const checkWishlisted = () => {
    if (wishlist.length > 0) {
      const found = wishlist.find((item) => item.product_id == id);
      _setWishlisted(found);
    }
  };

  const checkCartlisted = () => {
    if (cartlist.length > 0) {
      const found = cartlist.find((item) => item.product_id == id);
      found && _setCartlisted(true);
    }
  };

  const getData = async () => {
    dispatch(getSingleProduct(id));
    dispatch(getWishlistProducts(userData.user_id));
    dispatch(getCartProducts(userData.user_id));
    await getReviews();
  };

  const AddToWishlist = async () => {
    if (wishlisted) {
      const res = await removeFromWishlistProduct(userData.user_id, {
        product_id: id,
      });
      ErrorNotify("Removed from wishlist", "bottom-center");
    } else {
      const res = await addTowishlistProduct(userData.user_id, {
        product_id: id,
      });
      SuccessNotify("Added to your wishlist", "bottom-center");
    }
    getData();
  };

  const AddToCartlist = async () => {
    if (cartlisted) {
      navigate("/cart-list");
    } else {
      const res = await addToCartlistProduct(userData.user_id, {
        product_id: id,
      });
      SuccessNotify("Added to your cart", "bottom-center");
      getData();
    }
  };

  React.useEffect(() => {}, [wishlist, userData]);

  const getReviews = async (req, res) => {
    try {
      const res = await axios.get(`${REACT_APP_HOST}/get-product-review/${id}`);
      _setReviews(res.data);
      const readyRating = AverageRating(res.data);
      _setRatings({
        one_star: readyRating.one,
        two_star: readyRating.two,
        three_star: readyRating.three,
        four_star: readyRating.four,
        five_star: readyRating.five,
        max_count: readyRating.max,
        final_rating: readyRating.final_rating,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (Object.keys(product).length != 0) {
    return (
      <div className="w-screen h-screen overflow-x-hidden mt-12 px-5 py-14">
        <div className="product-section w-full h-[500px] flex">
          <div className="w-2/3 h-full flex justify-center">
            <img src={product.product_images[0].imgURL} alt="" />
          </div>
          <div className="relative w-full">
            <div className="flex justify-between items-baseline">
              <p className="ml-4 text-3xl text-teal-950">
                {product.product_Name}
              </p>
              <button
                className={
                  wishlisted
                    ? "transition-transform"
                    : "transition-transform hover:-translate-y-1 hover:scale-125"
                }
                onClick={() => AddToWishlist()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-heart"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#14b8a6"
                  fill={wishlisted ? "#14b8a6" : "none"}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
              </button>
            </div>
            <div className="w-full h-[2px] my-2 bg-primary"></div>

            <div className="features w-full flex gap-4 ml-4">
              <div className="features-list w-3/6">
                <h3 className="text-sm">RAM</h3>
                <h3 className="text-lg text-teal-900 font-bold mb-2">
                  {product.product_features.RAM}GB
                </h3>
                <h3 className="text-sm">ROM </h3>
                <h3 className="text-lg text-teal-900 font-bold mb-2">
                  {product.product_features.ROM}GB
                </h3>
                <h3 className="text-sm">Battery </h3>
                <h3 className="text-lg text-teal-900 font-bold mb-2">
                  {product.product_features.Battery}mHz
                </h3>
                <h3 className="text-sm">Camera </h3>
                <h3 className="text-lg text-teal-900 font-bold mb-2">
                  {product.product_features.Camera}mp
                </h3>
                <h3 className="text-sm">Display </h3>
                <h3 className="text-lg text-teal-900 font-bold mb-2">
                  {product.product_features.Display}"
                </h3>
              </div>

              <div className="features-list w-3/6">
                <h3 className="text-sm">Seller</h3>
                <h3 className="text-lg text-teal-900 font-bold mb-2">
                  {product.product_Seller}
                </h3>
                <h3 className="text-sm">Tag</h3>
                <h3 className="text-lg text-teal-900 font-bold mb-2">
                  {product.product_Tag}
                </h3>
              </div>
            </div>
            <div className="w-full h-20 mb-2 p-2">desc place</div>
            <div className="w-full h-fit p-2 flex justify-between">
              <div className="w-fit flex">
                <h1 className="text-2xl font-semibold">Price - </h1>
                <h1 className="text-2xl font-semibold mx-2 text-primary-dark">
                  {product.product_Price}/-
                </h1>
              </div>
              <div className="">
                <button
                  className=" bg-ternary-dark w-40 font-semibold py-2 text-primary rounded-md"
                  onClick={() => AddToCartlist()}
                >
                  {" "}
                  {cartlisted ? "Go to cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() => {
                    if (userData.user_id) {
                      navigate(`/buy-now/${product.product_id}`);
                    } else alert("You must be logged in first");
                  }}
                  className=" ml-5 bg-primary w-40 font-semibold py-2 text-ternary-dark rounded-md"
                >
                  {" "}
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="scroller-section mt-5 overflow-x-auto">
          <h1 className="text-primary my-5 text-3xl font-semibold">
            Check out this products too!
          </h1>
          <ItemCardScroller />
        </div>
        <div className="review-section flex justify-center flex-col  mt-5">
          <div className="rating-and-review-section flex mt-10 ">
            <div className="rating-section w-4/12 flex flex-col items-left ml-10">
              <div className="flex gap-2 align-middle items-center">

              <h3 className="heading_2">
                Average Rating 
              </h3>
                <h1 className="font-semibold text-primary-dark text-2xl">

                {ratings.final_rating.toString().length == 1
                  ? ratings.final_rating.toString() + ".0"
                  : ratings.final_rating.toString().substring(0, 3)}
                  </h1>
              </div>
              <div className="">
                <RateMeter
                  rating={(ratings.five_star / ratings.max_count) * 100}
                  rate_count={ratings.five_star}
                  star={"5"}
                />
                <RateMeter
                  rating={(ratings.four_star / ratings.max_count) * 100}
                  rate_count={ratings.four_star}
                  star={"4"}
                />
                <RateMeter
                  rating={(ratings.three_star / ratings.max_count) * 100}
                  rate_count={ratings.three_star}
                  star={"3"}
                />
                <RateMeter
                  rating={(ratings.two_star / ratings.max_count) * 100}
                  rate_count={ratings.two_star}
                  star={"2"}
                />
                <RateMeter
                  rating={(ratings.one_star / ratings.max_count) * 100}
                  rate_count={ratings.one_star}
                  star={"1"}
                />
              </div>
              <br />
              <div className="">
                <button
                  className="primary_button"
                  onClick={() => {
                    if (userData.user_id) {
                      _setShowReviewForm(true);
                    } else alert("You Must Login First to review");
                  }}
                >
                  Write a Review...
                </button>
              </div>
              {showReviewForm ? (
                <div className="dark-back">
                  <ReviewPopup
                    reload={async()=>await getReviews()}
                    data={{
                      user: userData,
                      product_id: id,
                    }}
                    review={reviews.find(
                      (item) => item.user_id == userData.user_id
                    )}
                    close={() => {
                      _setShowReviewForm(false);
                    }}
                  />
                </div>
              ) : null}
            </div>

            <div className="reviews w-4/5 h-[500px] overflow-y-auto ">
              {reviews.length > 0 ? (
                reviews.map((item) => (
                  <Review
                    reload={()=>getReviews()}
                    userData={userData}
                    product_id={id}
                    item={item}
                  />
                ))
              ) : (
                <div className="w-full">
                  <h1 className="lek-20-semi text-center ">No reviews</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isLoading) return <ProductViewSkeleton />;
  else return <ProductViewSkeleton />;
};

export default ProductView;

class ReviewPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      review: "",
      review_id: "",
      title: "",
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.one) {
      return alert("Please Give a Star");
    }
    const dataToSend = {
      rating: this.state.five
        ? 5
        : this.state.four
        ? 4
        : this.state.three
        ? 3
        : this.state.two
        ? 2
        : 1,
      title: this.state.title,
      review: this.state.review,
      user_id: this.props.data.user.user_id,
      user_name: this.props.data.user.email,
      product_id: this.props.data.product_id,
    };
    const res = await axios.post(
      `${REACT_APP_HOST}/submit-product-review`,
      dataToSend
    );
    this.props.close();
    this.props.reload();
  };
  componentDidMount() {
    if (this.props.review) {
      this.setState({
        review: this.props.review.review, //"really likes this product",
        review_id: this.props.review.review_id, //"VxzrfZKC1Dnt1OQ",
        title: this.props.review.title, //"Its best ",
      });
      const stars = this.props.review.rating;
      switch (stars) {
        case 5:
          this.setState({
            one: true,
            two: true,
            three: true,
            four: true,
            five: true,
          });
          break;
        case 4:
          this.setState({
            one: true,
            two: true,
            three: true,
            four: true,
          });
          break;
        case 3:
          this.setState({
            one: true,
            two: true,
            three: true,
          });
          break;
        case 2:
          this.setState({
            two: true,
            one: true,
          });
          break;
        case 1:
          this.setState({
            one: true,
          });
          break;

        default:
          break;
      }
    }
  }

  render() {
    console.log(this.props.data,'====');

    return (
      <div className="review-form">
        <div className="review-form-popup">
          <div className="input-div-2 m-yy-20">
            <label htmlFor="rating" className="text-lg">
              Rating
            </label>
            <div className="just-space">
              <div
                onClick={() => {
                  this.setState(
                    {
                      one: true,
                      two: false,
                      three: false,
                      four: false,
                      five: false,
                    },
                    () => {
                      console.log(this.state);
                    }
                  );
                }}
              >
                <StarIcon fill={this.state.one} />
              </div>

              <div
                id="str_2"
                onClick={() => {
                  this.setState({
                    one: true,
                    two: true,
                    three: false,
                    four: false,
                    five: false,
                  });
                }}
              >
                <StarIcon fill={this.state.two} />
              </div>

              <div
                id="str_3"
                onClick={() => {
                  this.setState({
                    one: true,
                    two: true,
                    three: true,
                    four: false,
                    five: false,
                  });
                }}
              >
                <StarIcon fill={this.state.three} />
              </div>

              <div
                id="str_4"
                onClick={() => {
                  this.setState({
                    one: true,
                    two: true,
                    three: true,
                    four: true,
                    five: false,
                  });
                }}
              >
                <StarIcon fill={this.state.four} />
              </div>

              <div
                id="str_5"
                onClick={() => {
                  this.setState({
                    one: true,
                    two: true,
                    three: true,
                    four: true,
                    five: true,
                  });
                }}
              >
                <StarIcon fill={this.state.five} />
              </div>
            </div>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="input-div-2 my-2">
              <p className="text-lg">Title</p>{" "}
              <div className="d-flex-ac ">
                <input
                  className="bg-red-300 px-3 py-1 rounded-sm"
                  type="text"
                  placeholder="review title"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </div>
            </div>
            <div className="input-div-2 m-yy-20">
              <p htmlFor="input-label-2" className="text-lg font-sans">
                Review
              </p>{" "}
              <div className="d-flex-ac">
                <textarea
                  className="border-primary border-b-2"
                  value={this.state.review}
                  onChange={(e) => {
                    this.setState({ review: e.target.value });
                  }}
                  placeholder="review"
                />{" "}
              </div>
            </div>
            <div className="h-10 flex justify-between items-center my-3">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") this.onSubmit();
                }}
                className="primary_button font-semibold"
                type="submit"
                value={"Save"}
              />
              <button
                className="border-2 text-primary font-semibold border-primary px-7 h-full rounded-md"
                onClick={() => {
                  this.props.close();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
