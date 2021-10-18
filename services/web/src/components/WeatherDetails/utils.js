import React from 'react';
import {
  FaSun,
  FaMoon,
  FaCloudSun,
  FaCloud,
  FaCloudSunRain,
  FaCloudMoonRain,
} from 'react-icons/fa';
import { RiMoonCloudyFill, RiMistFill } from 'react-icons/ri';
import {
  BsFillCloudsFill,
  BsCloudRainHeavyFill,
  BsFillCloudLightningRainFill,
  BsSnow,
} from 'react-icons/bs';

function getIcon(code) {
  switch (code) {
    case '01d':
      return <FaSun size={30} />;
    case '01n':
      return <FaMoon size={30} />;
    case '02d':
      return <FaCloudSun size={30} />;
    case '02n':
      return <RiMoonCloudyFill size={30} />;
    case '03d':
      return <FaCloud size={30} />;
    case '03n':
      return <FaCloud size={30} />;
    case '04d':
      return <BsFillCloudsFill size={30} />;
    case '04n':
      return <BsFillCloudsFill size={30} />;
    case '09d':
      return <BsCloudRainHeavyFill size={30} />;
    case '09n':
      return <BsCloudRainHeavyFill size={30} />;
    case '10d':
      return <FaCloudSunRain size={30} />;
    case '10n':
      return <FaCloudMoonRain size={30} />;
    case '11d':
      return <BsFillCloudLightningRainFill size={30} />;
    case '11n':
      return <BsFillCloudLightningRainFill size={30} />;
    case '13d':
      return <BsSnow size={30} />;
    case '13n':
      return <BsSnow size={30} />;
    case '50d':
      return <RiMistFill size={30} />;
    case '50n':
      return <RiMistFill size={30} />;
    default:
      return null;
  }
}

export default getIcon;
