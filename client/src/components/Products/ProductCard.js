import { Card, Row, Col, Button } from "antd";
import { Link, useHistory } from 'react-router-dom';

const ProductsCard = ({ ProductsCardData }) => {
    const history = useHistory();
    const handleClick =(e)=> {
        e.preventDefault();
        history.push('/product')
    }
  return (
    <Row>
      {ProductsCardData?.map((items) => {
        return (
          <Col sm={24} md={12} lg={12} xl={6} key={items?._id}>
            <Card
              onClick={handleClick}
              hoverable
              style={{
                position: "relative",
                margin: 10,
                cursor:"pointer"
              }}
              className="productCard"
              cover={<img alt="example" src={items?.image} />}
            >
              <span className="category">
                {items?.category}
              </span>
             <div>
             <div className='data'>
          <h4>{items?.name}</h4>
            <p>${items?.price}</p>
          </div>
             </div>
              <p className="text-base"><b>Brand:</b> {items?.brand}...</p>
              <Button type='ghost'>Add to Cart</Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
export default ProductsCard;