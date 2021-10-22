import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Libraries
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Loader from '../components/Loader';



  const NewsContainer = styled.div`
  width: 80vw;
  height: 100vh;
  overflow: scroll;
  padding-top: 50px;
  &::-webkit-scrollbar {
    display: none;
  }
  .news_card {
    overflow: hidden;
    margin: 10px 20px;
    width: 310px;
    height: 420px;
    color: #ffffff;
    text-align: left;
    line-height: 1.4em;
    background-color: #141414;
    display: inline-block;
    position: relative;

    .texts {
      width: 100%;
      background-color: #141414;
      padding: 0 25px 25px;
    }
    button {
      background-color: #141414;
      border: 1px solid #ffffff;
      color: white;
      padding: 5px 12px;
      font-size: 0.9em;
      font-weight: 500;
      opacity: 0.7;
      position: absolute;
      bottom: 10px;
      left: 25px;

      &:hover {
        opacity: 1;
      }
    }
    img {
      width: 310px;
      vertical-align: top;
      opacity: 0.85;
      height: 135px;
      opacity: 0.85;
      margin: 20px 0;
    }
    .text_over_flow {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }

    .title_over_flow {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .heading_over_flow {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    p {
      margin: 0 0 10px;
      font-size: 0.8em;
      letter-spacing: 1px;
      opacity: 0.8;
    }
    h2 {
      margin: 0 0 10px;
      font-weight: 300;
      font-size: 1.5em;
      line-height: 1.2em;
    }
    h4 {
      color: rgba(255, 255, 255, 0.5);
      font-weight: 600;
      margin: 5px 0 3px 10px;
    }
  }

  @media (max-width: 570px) {
    margin: 0 auto;
  }
`;

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchNewsArticles = async () => {
      setLoading(true);
      const subKey=process.env.REACT_APP_NEWS_API_KEY

      const API_URL = 
        `https://api.bing.microsoft.com/v7.0/news/search?q=weather`
      try {
        // eslint-disable-next-line max-len
        const { data } = await axios.get(API_URL,{"headers":{ 'Ocp-Apim-Subscription-Key': subKey }})
        console.log(data.value);
        setNews(data.value);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewsArticles();
  }, []);

  return (
    <NewsContainer>
      {loading && <Loader />}
      <Row>
      {news.map((item) => (
        <div className='news_card' key={item.url}>
          <h4 className='heading_over_flow'>
            {item.category}
          </h4>
            <img alt='Not available' src={item.image.thumbnail.contentUrl} />

          <div className='texts'>
            <h2 className='title_over_flow'>{item.name}</h2>
            <p className='text_over_flow'>{item.description}</p>
          </div>
          <a href={item.url}>
            <button type='button'>read more</button>
          </a>
        </div>
      ))}
      </Row>
    </NewsContainer>
  );
}

export default News;
