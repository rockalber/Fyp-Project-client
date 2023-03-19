import { Spin } from 'antd';
import React from 'react';

export default function LoadingBox() {
  return (
    <div className='spinLoader'>
      <Spin />
    </div>
  );
}