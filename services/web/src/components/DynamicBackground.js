import React, { useState, useEffect } from 'react';

// Libraries
import styled from 'styled-components';
import { createClient } from 'pexels';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.primary});
  background-repeat: repeat;
  background-attachment: fixed;
  padding: 0;
  margin: 0;
  @media(max-width:625px) {
    width: 150%
  }@media(max-width:415px) {
  width: 185%
}
`;

const client = createClient('563492ad6f91700001000001563c3ddfa43143b3882bb052a2b7abbc');

const DynamicBackground = ({ 
    children,
    query,
}) => {
  const [image, setImage] = useState('cloudy');
  useEffect(() => {
    client.photos
      .search({
        query,
        orientation: 'landscape',
        per_page: 1,
        page: Math.floor(Math.random() * 80),
      })
      .then((photos) => {
        setImage(photos.photos[0].src.large2x);
        console.log(photos.photos[0].src.medium);
      });
  }, [query]);

  return <Background primary={image}>{children}</Background>;
};

export { DynamicBackground };
