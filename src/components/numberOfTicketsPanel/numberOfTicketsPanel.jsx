import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function NumberOfTicketsPanel(props) {
  const { handleChange, numberOfDisplayed, numberOfTickets } = props;
  return (
    <WrapperDiv>
      <HeadingDiv>Всего получено и обработано билетов:</HeadingDiv>
      <TextDiv>{numberOfTickets}</TextDiv>

      <HeadingDiv>Количество билетов для показа: </HeadingDiv>

      <InputsBlockDiv>
        <RadioBoxContainer>
          <RadioButtonInput
            type="radio"
            name="numberOfTickets"
            id="5"
            onChange={handleChange}
            checked={numberOfDisplayed === 5}
          />
          <RadioButtonFirstChild htmlFor="5" checked={numberOfDisplayed === 5}>
            5
          </RadioButtonFirstChild>
        </RadioBoxContainer>

        <RadioBoxContainer>
          <RadioButtonInput
            type="radio"
            name="numberOfTickets"
            id="10"
            onChange={handleChange}
            checked={numberOfDisplayed === 10}
          />
          <RadioButtonLabel htmlFor="10" checked={numberOfDisplayed === 10}>
            10
          </RadioButtonLabel>
        </RadioBoxContainer>

        <RadioBoxContainer>
          <RadioButtonInput
            type="radio"
            name="numberOfTickets"
            id="15"
            onChange={handleChange}
            checked={numberOfDisplayed === 15}
          />
          <RadioButtonLabel htmlFor="15" checked={numberOfDisplayed === 15}>
            15
          </RadioButtonLabel>
        </RadioBoxContainer>

        <RadioBoxContainer>
          <RadioButtonInput
            type="radio"
            name="numberOfTickets"
            id="50"
            onChange={handleChange}
            checked={numberOfDisplayed === 50}
          />
          <RadioButtonLastChild htmlFor="50" checked={numberOfDisplayed === 50}>
            50
          </RadioButtonLastChild>
        </RadioBoxContainer>
      </InputsBlockDiv>
    </WrapperDiv>
  );
}

NumberOfTicketsPanel.propTypes = {
  handleChange: PropTypes.func,
  numberOfDisplayed: PropTypes.number,
  numberOfTickets: PropTypes.number,
};
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

const WrapperDiv = styled(Div)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 230px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  padding: 10px;
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const HeadingDiv = styled(Div)`
  font-weight: 600;
  line-height: 120%;
  margin: 0 0 5px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;
const TextDiv = styled(Div)`
  margin: 0 0 5px;
  margin-bottom: 5px;
  font-weight: 400;
`;

const InputsBlockDiv = styled(Div)`
  display: flex;
  margin-top: 15px;
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
