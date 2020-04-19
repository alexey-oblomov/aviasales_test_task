import React from 'react';
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
const NoDataTextDiv = styled(Div)`
  color: #8c0000;
  text-transform: uppercase;
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
  color: #4a4a4a;
  background-color: ${(props) => (props.checked ? '#e1e1e1' : '#f3f2f5')};
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

export default function NoCurrencyPanel() {
  return (
    <WrapperDiv>
      <HeadingDiv>
        Текущий курс ЦБ :
        <br /> <NoDataTextDiv className="noData">НЕТ ДАННЫХ</NoDataTextDiv>
      </HeadingDiv>
      <HeadingDiv>Показать стоимость в другой валюте:</HeadingDiv>
      <InputsBlockDiv>
        <RadioButtonFirstChild>
          <RadioButtonInput type="radio" id="RUB" className="radiobox__input" checked disabled />
          <RadioButtonLabel htmlFor="RUB" checked>
            RUB
          </RadioButtonLabel>
        </RadioButtonFirstChild>

        <RadioBoxContainer>
          <RadioButtonInput
            type="radio"
            id="USD"
            className="radiobox__input"
            checked={false}
            disabled
          />
          <RadioButtonLabel htmlFor="USD">
            USD
          </RadioButtonLabel>
        </RadioBoxContainer>

        <RadioButtonLastChild>
          <RadioButtonInput
            type="radio"
            id="EUR"
            className="radiobox__input"
            checked={false}
            disabled
          />
          <RadioButtonLabel htmlFor="EUR">
            EUR
          </RadioButtonLabel>
        </RadioButtonLastChild>
      </InputsBlockDiv>
    </WrapperDiv>
  );
}
