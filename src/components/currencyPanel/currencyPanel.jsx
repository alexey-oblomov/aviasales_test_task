import React from 'react';
import PropTypes from 'prop-types';
import { viewDate } from '../../utils/utils';
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
export default function CurrencyPanel(props) {
  const { currencyData, currencyDisplayed, handleChangeCurrency } = props;
  const { date, usd, eur } = currencyData;

  const displayDate = viewDate(new Date(date));
  const roundUsd = Number(usd).toFixed(2);
  const roundEur = Number(eur).toFixed(2);

  return (
    <WrapperDiv>
      <HeadingDiv>
        Курс ЦБ по состоянию на:
        <br /> {displayDate}
      </HeadingDiv>
      <TextDiv>USD: {roundUsd}</TextDiv>
      <TextDiv>EUR: {roundEur}</TextDiv>
      <HeadingDiv>Показать стоимость в другой валюте:</HeadingDiv>
      <InputsBlockDiv>
        <RadioBoxContainer>
          <RadioButtonInput
            type="radio"
            id="RUB"
            onChange={handleChangeCurrency}
            checked={currencyDisplayed === 'RUB'}
          />
          <RadioButtonFirstChild checked={currencyDisplayed === 'RUB'} htmlFor="RUB">
            RUB
          </RadioButtonFirstChild>
        </RadioBoxContainer>

        <RadioBoxContainer>
          <RadioButtonInput
            type="radio"
            id="USD"
            onChange={handleChangeCurrency}
            checked={currencyDisplayed === 'USD'}
          />
          <RadioButtonLabel checked={currencyDisplayed === 'USD'} htmlFor="USD">
            USD
          </RadioButtonLabel>
        </RadioBoxContainer>

        <RadioBoxContainer>
          <RadioButtonInput
            type="radio"
            id="EUR"
            onChange={handleChangeCurrency}
            checked={currencyDisplayed === 'EUR'}
          />
          <RadioButtonLastChild checked={currencyDisplayed === 'EUR'} htmlFor="EUR">
            EUR
          </RadioButtonLastChild>
        </RadioBoxContainer>
      </InputsBlockDiv>
    </WrapperDiv>
  );
}

CurrencyPanel.propTypes = {
  currencyData: PropTypes.object,
  currencyDisplayed: PropTypes.string,
  handleChangeCurrency: PropTypes.func,
};
