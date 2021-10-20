import clouds from '../assets/clouds.gif';
import clouds1 from '../assets/clouds1.gif';
import clouds2 from '../assets/clouds2.gif';
import drizzle from '../assets/drizzle.gif';
import rain from '../assets/rain.gif';
import snow from '../assets/snow.gif';
// import snow2 from '../assets/snow2.gif';
import thunderstorm from '../assets/thunderstorm.gif';
// import thunderstorm2 from '../assets/thunderstorm2.gif';

export const getWeatherImg = (id) => {
  switch (id) {
    case id >= 200 && id < 300:
      return thunderstorm;

    case id >= 300 && id < 400:
      return drizzle;

    case id >= 500 && id < 600:
      return rain;

    case id >= 600 && id < 700:
      return snow;

    case id >= 700 && id < 800:
      return clouds1;

    case id === 800:
      return clouds;

    case id >= 800 && id < 900:
      return clouds2;

    default:
      return clouds;
  }
};
