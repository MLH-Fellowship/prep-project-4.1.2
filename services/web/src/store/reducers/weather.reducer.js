/**
 * ! CHECKOUT the blog below for implementation details of
 * ! context api state management
 * ! https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */

export const initialState = {
  city: 'New York',
  results: null,
  error: null,
  isLoaded: false,
  location: {
    // Location Details
    city: 'New York',
    coords: {
      lat: 40.7128,
      lng: -74.006,
    },
    isCityLatestUpdate: true,
    // Async Call Details
    results: null,
    error: null,
    isLoaded: false,
  },
};

export const WeatherActionTypes = {
  UpdateLocation: 'Update weather location',
  UpdateWeatherDetails: 'Update weather details',
  UpdateErrorStatus: 'Update fetch error details',
  // Location Update Details
  UpdateCity: 'Update city location',
  UpdateCoords: 'Update location coordinates',
};

export default function WeatherReducer(state, action) {
  switch (action.type) {
    case WeatherActionTypes.UpdateLocation:
      return {
        ...state,
        city: action.payload,
      };

    case WeatherActionTypes.UpdateWeatherDetails:
      return {
        ...state,
        results: action.payload.results,
        isLoaded: action.payload.isLoaded,
      };

    case WeatherActionTypes.UpdateErrorStatus:
      return {
        ...state,
        isLoaded: action.payload.isLoaded,
        error: action.payload.error,
      };

    case WeatherActionTypes.UpdateCity:
      return {
        ...state,
        location: {
          ...state.location,
          city: action.payload,
          isCityLatestUpdate: true,
        },
      };

    case WeatherActionTypes.UpdateCoords:
      return {
        ...state,
        location: {
          ...state.location,
          coords: action.payload,
          isCityLatestUpdate: false,
        },
      };

    default:
      return state;
  }
}
