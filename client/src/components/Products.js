import React from "react";
import CardData from "./CardData";
import ProductTabs from "./test";
import ProductsTabs from "./Products/ProductsTabs";

export default function ProductsCard() {
  return (
    <div className="cardTitle">
      <div className="productTabs">
        <h1>Our Products</h1>
        <p>Add our products to weekly lineup</p>
        <div className="tabs">
          <ProductsTabs />
        </div>
      </div>
    </div>
  );
}
