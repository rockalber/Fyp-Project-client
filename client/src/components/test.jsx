import { Tabs } from 'antd';
import React from 'react'
import CardData from './CardData';

const AllProducts = () =>{
  
}

const test = () => {
    console.log(CardData)
  return (
    <Tabs
    defaultActiveKey="1"
    items={[
        {
            label: 'All',
            key: '1',
            children: 'Tab 3',
          },
      {
        
        label: 'Women',
        key: '2',
        children: 'Tab 1',
      },
      {
        label: 'Men',
        key: '3',
        children: 'Tab 2',
      },
     
    ]}
  />
);
}

export default test