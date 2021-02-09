import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import HouseCard from './HouseCard';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import HouseListSort from './HouseListSort';
import Button from '@material-ui/core/Button';
import store from '_store/Store';


import Pagination from './Pagination';

const HouseListFeatured = () => {
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(false);
  const userNum = store.getState().userReducer.num;
  console.log(userNum);

  //페이징
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  let { area, checkin, checkout, guest } = useParams();

  useEffect(() => {
    const data = {
      keyword: area,
      maxPeople: guest,
      checkInDay: checkin,
      checkOutDay: checkout,
      userNum: userNum,
    };
    console.log(data);
    const fatchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://localhost:9003/homestays/price/'+currentPage,
          data
        );
        setContents(response.data.list);
        console.log(response.data.list);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fatchData();
  }, [area, checkin, checkout, guest]);

  if (loading) {
    return <p>대기중....</p>;
  }
  //articles 값이 설정되지 않았을때
  if (!contents) {
    return null;
  }

  const byCost = async () => {
    const data = {
      keyword: area,
      maxPeople: guest,
      checkInDay: checkin,
      checkOutDay: checkout,
      userNum: userNum,
    };
    try {
      const response = await axios.post(
        `http://localhost:9003/homestays/price/`+currentPage,
        data
      );
      setContents(response.data.list);
      console.log('금액별 성공');
    } catch (e) {
      console.log(e);
    }
  };

  const byStars = async () => {
    const data = {
      keyword: area,
      maxPeople: guest,
      checkInDay: checkin,
      checkOutDay: checkout,
      userNum: userNum,
    };
    try {
      const response = await axios.post(
        `http://localhost:9003/homestays/review/`+currentPage,
        data
      );
      setContents(response.data.list);
      console.log('평점별 성공');
    } catch (e) {
      console.log(e);
    }
  };

  /* 페이징 추가 부분2 */
const indexOfLast = currentPage * postsPerPage;
const indexOfFirst = indexOfLast - postsPerPage;
function currentPosts(tmp) {
  let currentPosts = 0;
  currentPosts = tmp.slice(indexOfFirst, indexOfLast);
  return currentPosts;
}

  return (
    <div>
      {
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HouseListSort />
            <Button variant="contained" size="small" onClick={byCost}>
              요금순
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="secondary"
              size="small"
              id="orderByStars"
              onClick={byStars}
            >
              평점순
            </Button>
          </Grid>

          {currentPosts(contents).map(content => (
            <Grid item xs={6} sm={4} md={4} key={content}>
              <HouseCard
                photoName={content.photoName}
                title={content.title}
                addr1={content.addr1}
                price={content.price}
                countOfReview={content.countOfReview}
                avgOfStar={content.avgOfStar}
                homeStayNum={content.homeStayNum}
              />
            </Grid>
          ))}
        </Grid>
      }
      {/*<Pagination/> */}
    <Pagination postsPerPage={postsPerPage} totalPosts={contents.length} paginate={setCurrentPage}  align="center"></Pagination>
    </div>
  );
};

export default HouseListFeatured;
