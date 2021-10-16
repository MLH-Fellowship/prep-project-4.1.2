import React, { useReducer, useMemo, createContext, useContext } from 'react';

// Reducer, Initial State
import weatherReducer, { initialState } from '../reducers/weather.reducer';

const WeatherContext = createContext(initialState);

export function WeatherProvider(props) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <WeatherContext.Provider value={value} {...props} />;
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within a WeatherProvider');

  const [state, dispatch] = context;

  return [state, dispatch];
}

/**
 * ! CHECKOUT the blog below for implementation details of
 * ! context api state management
 * ! https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
