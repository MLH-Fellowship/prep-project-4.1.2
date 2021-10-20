/**
 * ! CHECKOUT the blog below for implementation details of
 * ! context api state management
 * ! https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */

export const initialState = {
  loading: true,
  error: null,
  location: {
    // Location Details
    city: 'New York',
    country: 'USA',
    coords: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  weather: {
    main: null,
    id: 10000,
    description: null,
    temp: null,
    date: new Date(),
    day: new Date(),
    air_qi: null,
    sun: {
      rise: null,
      set: null,
    },
    rain: {
      chance: null,
      humidity: null,
      precipitation: null,
    },
    wind: {
      speed: null,
      pressure: null,
    },
  },
  /**
   * Object Structure of week array
   * {
   *    day: 'Tuesday',
   *    feels_like: 'Sunny',
   *    temp: {
   *      high: 33,
   *      low: 34,
   *    }
   * }
   */
  weekly: [],
};

export const WeatherActionTypes = {
  UpdateWeatherDetails: 'Update weather details',
  UpdateErrorStatus: 'Update fetch error details',
  UpdateCoords: 'Update location coordinates',
  UpdateDailyDetails: 'Update daily weather details',
};

export default function WeatherReducer(state, action) {
  switch (action.type) {
    case WeatherActionTypes.UpdateErrorStatus:
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
      };

    case WeatherActionTypes.UpdateCoords:
      return {
        ...state,
        location: {
          ...state.location,
          coords: {
            lat: action.payload.lat,
            lng: action.payload.lng,
          },
          city: action.payload.city,
          country: action.payload.country,
        },
      };

    case WeatherActionTypes.UpdateWeatherDetails:
      return {
        ...state,
        loading: false,
        error: null,
        weather: {
          ...state.weather,
          main: action.payload.current.weather[0].main,
          id: action.payload.current.weather[0].id,
          description: action.payload.current.weather[0].description,
          temp: action.payload.current.feels_like,
          date: new Date(),
          day: new Date(),
          air_qi: action.payload.current.visibility,
          sun: {
            rise: action.payload.current.sunrise * 1000,
            set: action.payload.current.sunset * 1000,
          },
          rain: {
            humidity: action.payload.current.humidity,
            chance: action.payload.current.clouds,
            precipitation: action.payload.current.rain,
          },
          wind: {
            speed: action.payload.current.wind_speed,
            pressure: action.payload.current.pressure,
          },
        },
        weekly: action.payload.daily.map(({ temp, sunrise, weather }) => ({
          min: temp.min,
          max: temp.max,
          date: sunrise * 1000,
          icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
          main: weather[0].main,
        })),
      };

    default:
      return state;
  }
}
