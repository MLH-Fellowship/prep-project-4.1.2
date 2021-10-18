import React from 'react';

// Libraries
import styled from 'styled-components';

// Components
import Input from './Input';
import Map from './Map';

// State handlers
import { useWeather } from '../../store/contexts/weather.context';
import { WeatherActionTypes } from '../../store/reducers/weather.reducer';

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.4);

  display: ${({ showModal }) => (showModal ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 60%;
  height: auto;
  min-height: 400px;
  max-width: 650px;

  background: var(--background-secondary);
  padding: 1.8rem;
  border-radius: 0.4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  width: auto;
  height: auto;
  min-height: 40px;
  min-width: 100px;

  background: var(--background-secondary);
  color: var(--color-primary);
  border-radius: 6px;
  border: 1px solid var(--color-primary);

  font-family: 'Poppins', sans-serif;
  font-weight: normal;
  font-size: 0.9rem;
  line-height: 1.2rem;
  text-align: center;

  &:hover {
    cursor: pointer;
    background: var(--background-primary);
  }
`;

const SearchModal = ({ showModal, onClick }) => {
  const [state, dispatch] = useWeather();

  return (
    <ModalBackground showModal={showModal}>
      <ModalContainer>
        <Input
          type='text'
          value={state.location.city}
          onChange={(event) => {
            dispatch({
              type: WeatherActionTypes.UpdateCity,
              payload: event.target.value,
            });
          }}
        />

        <Map />

        <ButtonsContainer>
          <Button onClick={onClick}>Cancel</Button>

          <Button onClick={onClick}>Proceed</Button>
        </ButtonsContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default SearchModal;
