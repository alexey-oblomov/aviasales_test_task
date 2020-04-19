import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Div = styled.div`
  font-family: Open Sans;
  font-style: normal;
  color: #4a4a4a;
  background: #ffffff;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: 0.5px;
  text-align: center;
`;

const InputsBlockDiv = styled(Div)`
  display: flex;
  width: 500px;
  height: 50px;
`;

const RadioBoxContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  :hover {
    cursor: pointer;
  }
`;

const RadioButtonInput = styled.input`
  position: absolute;
  appearance: none;
`;

const RadioButtonLabel = styled.label`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border: 1px solid #dfe5ec;
  color: ${(props) => (props.checked ? '#ffffff' : '#4a4a4a')};
  background-color: ${(props) => (props.checked ? '#2196f3' : '#ffffff')};
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;

const RadioButtonFirstChild = styled(RadioButtonLabel)`
  border-radius: 5px 0 0 5px;
`;

const RadioButtonLastChild = styled(RadioButtonLabel)`
  border-radius: 0 5px 5px 0;
`;
export default function SortingPanel(props) {
  const { handleChange, sortBy } = props;

  return (
    <InputsBlockDiv>
      <RadioBoxContainer>
        <RadioButtonInput
          type="radio"
          name="sortByCost"
          id="cost"
          onChange={handleChange}
          checked={sortBy === 'cost'}
        />
        <RadioButtonFirstChild htmlFor="cost" checked={sortBy === 'cost'}>
          Самый дешевый
        </RadioButtonFirstChild>
      </RadioBoxContainer>

      <RadioBoxContainer>
        <RadioButtonInput
          type="radio"
          name="sortByDuration"
          id="duration"
          onChange={handleChange}
          checked={sortBy === 'duration'}
        />
        <RadioButtonLastChild htmlFor="duration" checked={sortBy === 'duration'}>
          Самый быстрый
        </RadioButtonLastChild>
      </RadioBoxContainer>
    </InputsBlockDiv>
  );
}

SortingPanel.propTypes = {
  handleChange: PropTypes.func,
  sortBy: PropTypes.string,
};
