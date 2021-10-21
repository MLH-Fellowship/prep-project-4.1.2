import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Libraries
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';

import Loader from '../components/Loader';

const defaultImage =[
  // eslint-disable-next-line max-len
"https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&h=130",
"https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&h=130",
  "https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg",
  "https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg",
  "https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg",
  "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg",
  "https://images.pexels.com/photos/76969/cold-front-warm-front-hurricane-felix-76969.jpeg",
  "https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg",
  "https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg",
  "https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg",
  "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg",
  "https://images.pexels.com/photos/1028600/pexels-photo-1028600.jpeg",
  "https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg",
  "https://images.pexels.com/photos/2990610/pexels-photo-2990610.jpeg",
  "https://images.pexels.com/photos/4190513/pexels-photo-4190513.jpeg",
  "https://images.pexels.com/photos/5799946/pexels-photo-5799946.jpeg",
  "https://images.pexels.com/photos/4173862/pexels-photo-4173862.jpeg",
  "https://images.pexels.com/photos/4190564/pexels-photo-4190564.jpeg",
  "https://images.pexels.com/photos/5273091/pexels-photo-5273091.jpeg"
];


  

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
      const API_URL =
        // eslint-disable-next-line max-len
        `http://api.mediastack.com/v1/news?access_key=f2b68bac58db3ce160dd524427497db3&languages=en,-de&keywords=weather`;

      try {
        const { data } = await axios.get(API_URL);
        console.log(data.data);
        setNews(data.data);
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
            {item.author !== null ? item.author : item.source}
          </h4>
          {item.image !== null ? (
            <img alt='Not available' src={item.image} />
          ) : (
            <img alt='noImage' src={defaultImage[Math.floor((Math.random() * 19))]} />
          )}
          <div className='texts'>
            <h2 className='title_over_flow'>{item.title}</h2>
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
