import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { CardData } from './CardData'
import TabsData from './TabsData'
import './style.css'

const ProductsTabs = () => {
    const [productData,setProductData] = useState(CardData)
    const List = [
        "All",
        ...new Set(
            CardData.map((items) => {
            return items.category;
          })
        ),
      ];

    const filterProductTabs = (category) => {
        if (category === "All") {
            setProductData(CardData);
          return;
        }
        const Updatelist = CardData.filter((value) => {
          return value.category === category;
        });
        setProductData(Updatelist);
      };
  return (
    <div>
        <TabsData filterProductTabs={filterProductTabs} List={List}/>
        <ProductCard ProductsCardData={productData}/>
    </div>
  )
}

export default ProductsTabs