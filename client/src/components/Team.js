import React from "react";
import "./style.css";
import { Card, Col, Row } from "antd";
const { Meta } = Card;
const TeamData = [
  {
    image: "/images/team1.webp",
    name: "Jonathan Scott",
    des: "Product Manager",
  },
  {
    image: "/images/team2.webp",
    name: "Oliver bastin",
    des: " Designer",
  },

  {
    image: "/images/team4.jpg",
    name: "Jon doet",
    des: "Marketing Officer",
  },
];
const Team = () => {
  return (
    <div className="team">
      <Row>
        {TeamData.map((items) => {
          return (
            <Col sm={24} md={12} lg={8} xl={8}>
              <Card
                hoverable
                style={{
                  width: 300,
                }}
                className="team-card"
                cover={<img alt="example" src={items.image} />}
              >
                <h4>{items.name}</h4>
                <p>{items.des}</p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Team;
