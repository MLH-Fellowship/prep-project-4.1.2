export const initialState = {
  city: 'New York',
  results: null,
  error: null,
  isLoaded: null,
};

export const WeatherActionTypes = {
  UpdateLocation: 'Update weather location',
  UpdateWeatherDetails: 'Update weather details',
  UpdateErrorStatus: 'Update fetch error details',
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
    default:
      return state;
  }
}
