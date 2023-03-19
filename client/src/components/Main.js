import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { Col, Image, Row } from 'antd';
const useStyles = makeStyles({
    root: {
        maxWidth: 1400,
        maxHeight: 1200,
        display: 'flex'
    },
});

export default function Main() {
    const classes = useStyles();
   const history= useHistory();
   const handleClick =(e)=>{
       e.preventDefault();
       history.push('/product')
   }
    return (
       <Row>
       <Col  sm={24} md={24} lg={12} xl={12}>
          <div className='banner' onClick={handleClick}>
            <Image src="/images/mensBanner.jpg" alt="mencollection" preview={false} />
          </div>
        </Col>
        <Col  sm={24} md={24} lg={12} xl={12}>
          <div className='banner' onClick={handleClick}>
            <Image src="/images/womenbanner.jpg" alt="mencollection" preview={false} />
          </div>
        </Col>
       </Row>
    );
}
