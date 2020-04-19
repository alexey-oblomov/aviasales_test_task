import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import img from './img/Shape.png';

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
  padding: 10px 0;
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

const InputsBlockDiv = styled(Div)`
  display: flex;
  flex-direction: column;
`;

const CheckboxContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  height: 40px;
  :hover {
    background: #f1fcff;
    cursor: pointer;
  }
`;

const CheckboxLabel = styled.label`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 120%;
  display: block;
  text-align: left;
  padding-left: 50px;
  width: 100%;
  display: flex;
  align-self: center;
  :hover {
    cursor: pointer;
  }
`;

const CheckboxInput = styled.input`
  position: absolute;
  appearance: none;
  :hover {
    cursor: pointer;
  }
`;

const CheckboxBox = styled.span`
  position: absolute;
  margin-left: -30px;
  width: 20px;
  height: 20px;
  border: ${(props) => (props.checked ? '1px solid #2196f3' : '1px solid #9abbce')};
  box-sizing: border-box;
  border-radius: 2px;
  background: ${(props) => (props.checked ? `no-repeat url('${img}') center` : '#ffffff')};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  align-self: center;
  background-size: 12 auto;
`;

export default function FilterStops(props) {
  const { handleChangeFilterStops, stopsData } = props;

  return (
    <WrapperDiv>
      <HeadingDiv>Количество пересадок</HeadingDiv>
      <InputsBlockDiv>
        <CheckboxContainer>
          <CheckboxLabel>
            <CheckboxInput
              type="checkbox"
              id="all"
              onChange={handleChangeFilterStops}
              checked={stopsData.all}
            />
            <CheckboxBox checked={stopsData.all} />
            Все
          </CheckboxLabel>
        </CheckboxContainer>

        <CheckboxContainer>
          <CheckboxLabel>
            <CheckboxInput
              type="checkbox"
              id="noStops"
              onChange={handleChangeFilterStops}
              checked={stopsData.noStops}
            />
            <CheckboxBox checked={stopsData.noStops} />
            Без пересадок
          </CheckboxLabel>
        </CheckboxContainer>

        <CheckboxContainer>
          <CheckboxLabel>
            <CheckboxInput
              type="checkbox"
              id="oneStop"
              onChange={handleChangeFilterStops}
              checked={stopsData.oneStop}
            />
            <CheckboxBox checked={stopsData.oneStop} />1 пересадка
          </CheckboxLabel>
        </CheckboxContainer>

        <CheckboxContainer>
          <CheckboxLabel>
            <CheckboxInput
              type="checkbox"
              id="twoStops"
              onChange={handleChangeFilterStops}
              checked={stopsData.twoStops}
            />
            <CheckboxBox checked={stopsData.twoStops} />2 пересадки
          </CheckboxLabel>
        </CheckboxContainer>

        <CheckboxContainer>
          <CheckboxLabel>
            <CheckboxInput
              type="checkbox"
              id="threeStops"
              onChange={handleChangeFilterStops}
              checked={stopsData.threeStops}
            />
            <CheckboxBox checked={stopsData.threeStops} />3 пересадки
          </CheckboxLabel>
        </CheckboxContainer>
      </InputsBlockDiv>
    </WrapperDiv>
  );
}

FilterStops.propTypes = {
  stopsData: PropTypes.object,
  handleChangeFilterStops: PropTypes.func,
};
