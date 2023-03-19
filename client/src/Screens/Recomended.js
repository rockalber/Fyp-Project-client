import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Footer from "../components/Footer";

function Recomended() {
  const [posts, setPosts] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };
  useEffect(() => {
    axios
      .post("http://localhost:3000/api/products/search-products")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
   
    <>
      <div className="recomeneded">
        <h1>Recommended Products</h1>

        <div className="products">
          <Slider {...settings}>
            {posts.map((data) => {
              return data?.products?.map((items) => {
                return (
                  <Card
                    hoverable
                    style={{
                      width: 300,
                      position: "relative",
                      margin: 10,
                      cursor: "pointer",
                    }}
                    className="productCard"
                    cover={<img alt="example" src={items?.image} />}
                  >
                    <span className="category">{items?.category}</span>
                    <div className="cardBody">
                      <h4>{items?.name}</h4>
                      <p>{items?.price}</p>
                    </div>
                    <div>
                      <div className="description">
                        <p>{items?.description}</p>
                      </div>
                    </div>
                    <Link to={"/product/" + items?._id}>
                      <Button type="ghost">Add to Cart</Button>
                    </Link>
                  </Card>
                );
              });
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Recomended;
