import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import Rating from "../component/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { Col, Row, Image, Card, Input, Divider } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
const { TextArea } = Input;
function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const productId = props.match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(productId, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const changeImage = (image) => {
    setSelectedImage(image);
  };
  const handleAddToCart = () => {
    props.history.push(`/cart/${productId}? qty= ${qty}`);
  };
  return (
    <div>
      <div className="back-to-result">
        <div className="fa fa-arrow-left" aria-hidden="true">
          <Link to="/product">Back to Product</Link>
        </div>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="product-detail">
          <Row>
            <Col sm={24} md={24} lg={12} xl={12}>
              <Image
                width={400}
                src={selectedImage || product.image}
                alt={product.name}
              />
              <div className="img-gallery">
                <Image
                  src={product.image}
                  width={120}
                  className="smalsize"
                  alt={product.image}
                  preview={false}
                />
              </div>
            </Col>
            <Col sm={12} md={12} lg={12} xl={12}>
              <div className="details">
                <div className="details-info">
                  <ul>
                    <li className="productName">
                      <h4>{product.name}</h4>
                      <ul>
                        <li>
                          <StarFilled />
                        </li>
                        <li>
                          <StarFilled />
                        </li>
                        <li>
                          <StarOutlined />
                        </li>
                        <li>
                          <StarOutlined />
                        </li>
                        <li>
                          <StarOutlined />
                        </li>
                      </ul>
                    </li>
                    <li>
                      Brand: <strong>{product.brand}</strong>
                    </li>
                    <li>
                      <a href="#reviews">
                        <Rating
                          value={product.rating}
                          text={product.numReviews + " reviews"}
                        />
                      </a>
                    </li>
                    <li>
                      Price: <b>${product.price}</b>
                    </li>
                    <li>
                      <b>Description:</b> {product.description}
                    </li>
                    <li>
                      Status:{" "}
                      {product.countInStock > 0 ? (
                        <strong className="Instock">In Stock</strong>
                      ) : (
                        <i className="unavailable">Unavailable</i>
                      )}
                    </li>{" "}
                    <li>
                      Qty:{" "}
                      <select
                        value={qty}
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                        className="qtyselect"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </li>
                    <li>
                      {product.countInStock > 0 && (
                        <button
                          onClick={handleAddToCart}
                          className="button  addCard"
                        >
                          Add to Cart
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
      <div className="content-margined">
        <Card title="Customer Reviews">
          {!product.reviews.length && (
            <MessageBox>There is no review</MessageBox>
          )}
          <ul>
            <li>
              {/* <h3>Write a customer review</h3> */}
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <ul className="card fcontainer">
                    <li>
                      <label htmlFor="Name">Name:</label>
                      <Input type="text" placeholder="Enter your name:" />
                      <label htmlFor="Name">Email</label>
                      <Input type="email" placeholder="Enter your name:" />
                      <label htmlFor="comment">Comment</label>
                      <TextArea
                        rows={10}
                        name="comment"
                        value={comment}
                        placeholder="Write Comment..."
                        required
                        onChange={(e) => setComment(e.target.value)}
                      ></TextArea>
                    </li>
                    <li>
                      <button type="submit" className="button primary">
                        Submit
                      </button>
                    </li>
                    <li>
                      <div className="reviewBox">
                        {product.reviews.map((review) => (
                          <li key={review._id}>
                            <strong>{review.name}</strong>
                            <Divider />
                            <Rating value={review.rating} />

                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                          </li>
                        ))}
                      </div>
                    </li>
                  </ul>
                </form>
              ) : (
                <div>
                  Please <Link to="/signin">Sign-in</Link> to write a review.
                </div>
              )}
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
export default ProductScreen;
