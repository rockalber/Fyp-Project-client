import React from "react";
import { Card, Col, Image, Row } from "antd";
const WhyChooseUs = () => {
  const data = [
    {
      icon: "/images/icon1.png",
      title: "Creative Design",
      descriptions:
        "Amadea Shop is a very slick and clean e-commerce template with endless possibilities.",
    },
    {
      icon: "/images/icon2.png",
      title: "Money Back Guarantee",
      descriptions:
        "Amadea Shop is a very slick and clean e-commerce template with endless possibilities.",
    },
    {
      icon: "/images/icon3.png",
      title: "Online Support 24/7",
      descriptions:
        "Amadea Shop is a very slick and clean e-commerce template with endless possibilities.",
    },
  ];
  return (
    <div className="WhyCards">
      <Row gutter={16}>
        {data.map((items) => {
          return (
            <Col key={items.title} sm={24} md={16} lg={8} xl={8}>
              <Card bordered={false} className="card">
                <Image src={items.icon} preview={false} alt="img" />
                <h3> {items.title}</h3>
                <p>{items.descriptions}</p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default WhyChooseUs;
