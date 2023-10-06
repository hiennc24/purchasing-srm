import { Skeleton } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './styles.css';
import PropTypes from 'prop-types';

const InfiniteScrollCustom = (props) => {
  const {
    children,
    dataLength,
    allDataLength,
    callbackRequest,
    maxHeight = '410px',
  } = props;
  const hasMore = allDataLength > dataLength;
  return (
    <div style={{ maxHeight }} className="scrollbar" id="style">
      <InfiniteScroll
        loadMore={callbackRequest}
        hasMore={hasMore}
        loader={<Skeleton key={0} avatar paragraph={{ rows: 1 }} active />}
        pageStart={0}
        useWindow={false}
        threshold={50}
      >
        {children}
      </InfiniteScroll>
    </div>
  );
}

InfiniteScrollCustom.propTypes = {
  children: PropTypes.any,
  dataLength:PropTypes.number,
  allDataLength: PropTypes.number,
  callbackRequest:PropTypes.func,
  maxHeight: PropTypes.string,
};

InfiniteScrollCustom.defaultProps = {
  children: null,
  dataLength: 10,
  allDataLength: 30,
  callbackRequest: ()=> {},
  maxHeight: '410px',
};


export default React.memo(InfiniteScrollCustom);
