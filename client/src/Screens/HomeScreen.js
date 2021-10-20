import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../component/Rating';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { url } from '../actions/BackendUrl';
function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [dispatch,category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
      };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  return (
    <>{category && <h2>{category}</h2>}

    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input type="search" 
            name="search"
            placeholder="Search.."
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit" className="btns">Search</button>
        </form>
      </li>
      <li>
        Sort By{' '}
        <select name="sortOrder" onChange={sortHandler}>
          <option value="">Newest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </li>
    </ul>
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox  variant="danger">{error}</MessageBox>
    ) : (
      <ul className="products">
        {products.map((product) => (
          <li key={product._id} >
            <div className="product">
              <Link to={'/product/' + product._id}>
                <img
                  className="product-image"
                  src={`${url}${product.image}`}
                  alt={product.image}
                 />
              </Link>
              <div className="product-name">
                <Link to={'/product/' + product._id} className="imgcolor">{product.name}</Link>
               Price: Rs {product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <div className="product-rating">
                <Rating
                  value={product.rating}
                  text={product.numReviews + ' reviews'}
                /> 
              </div>
            </div>
          </li>
        ))}
      </ul>
    )}
        </>
  );
}
export default HomeScreen;
