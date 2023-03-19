import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Rating from "../component/Rating";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { Card, Row, Col, Button } from "antd";
import Recomended from "./Recomended";
import Footer from "../components/Footer";

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));
    return () => {};
  }, [dispatch, category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      <>
        {category && <h2>{category}</h2>}

        <div className="filter">
          <div className="search">
            <form onSubmit={submitHandler}>
              <input
                type="search"
                name="search"
                placeholder="Search.."
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button type="submit" className="btns">
                Search
              </button>
            </form>
          </div>
          <div className="sort">
            <span> Sort By </span>
            <select name="sortOrder" onChange={sortHandler}>
              <option value="">Newest</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </select>
          </div>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="productDiv">
            <h1>Best Selling Products</h1>
            <Row className="products">
              {products.map((items) => {
                return (
                  <Col sm={24} md={12} lg={12} xl={6} key={items?._id}>
                    <Card
                      hoverable
                      style={{
                        position: "relative",
                        margin: 10,
                        cursor: "pointer",
                      }}
                      className="productCard"
                      cover={<img alt="example" src={items.image} />}
                    >
                      <span className="category">{items.category}</span>
                      <div className="cardBody">
                        <h4>{items.name}</h4>
                        <p>{items.price}</p>
                      </div>
                      <div>
                        <div className="description">
                          <p>{items.description}</p>
                        </div>
                        <div className="product-rating">
                          <Rating
                            value={items.rating}
                            text={items.numReviews + " reviews"}
                          />
                        </div>
                      </div>
                      <Link to={"/product/" + items._id}>
                        <Button type="ghost">Add to Cart</Button>
                      </Link>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <>
              <Recomended />
            </>
          </div>
        )}
      </>
      <>
        <Footer />
      </>
    </>
  );
}
export default HomeScreen;
