import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  font-family: Open Sans;
  font-style: normal;
  color: #4a4a4a;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: center;
  width: 500px;
  margin-top: 20px;
  padding: 20px;
`;
export default function NoTickets() {
  return <Div>Билеты не найдены</Div>;
}
