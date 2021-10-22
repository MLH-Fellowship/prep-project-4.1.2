import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Libraries
import styled from 'styled-components';
import Loader from '../components/Loader';

const NewsContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  overflow: scroll;
  padding-top: 50px;
  &::-webkit-scrollbar {
    display: none;
  }

  .news_card {
    overflow: hidden;
    margin: 10px 20px;
    width: 310px;
    height: 380px;
    color: #ffffff;
    text-align: left;
    line-height: 1.4em;
    background-color: #3f4447c3;
    backdrop-filter: blur(5px);
    border-radius: 8px;
    position: relative;

    .texts {
      width: 100%;
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
      bottom: 20px;
      left: 25px;

      &:hover {
        opacity: 1;
      }
    }
    .image-container {
      width: 100%;
      height: 150px;
      background: #a0a0a0;
    }
    img {
      vertical-align: top;
      opacity: 0.85;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      margin-bottom: 20px;
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

    p {
      margin: 0 0 10px;
      font-size: 0.9rem;
      line-height: 1.1rem;
      opacity: 0.8;
    }
    h2 {
      margin: 0 0 10px;
      font-weight: 300;
      font-size: 1.5rem;
      line-height: 1.7rem;
    }
  }

  @media (max-width: 570px) {
    margin: 0 auto;
  }
`;

const Row = styled.div`
  width: 100%;
  height: auto;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsArticles = async () => {
      setLoading(true);
      const subKey = process.env.REACT_APP_NEWS_API_KEY;

      const API_URL = `https://api.bing.microsoft.com/v7.0/news/search?q=weather`;
      try {
        // eslint-disable-next-line max-len
        const { data } = await axios.get(API_URL, {
          headers: { 'Ocp-Apim-Subscription-Key': subKey },
        });
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
          <div className='news_card' key={item?.url}>
            <div className='image-container'>
              <img alt={item?.name} src={item?.image?.thumbnail?.contentUrl} />
            </div>

            <div className='texts'>
              <h2 className='title_over_flow'>{item?.name}</h2>
              <p className='text_over_flow'>{item?.description}</p>
            </div>
            <a href={item?.url} target='_blank' rel='noreferrer'>
              <button type='button'>read more</button>
            </a>
          </div>
        ))}
      </Row>
    </NewsContainer>
  );
}

export default News;
