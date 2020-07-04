import React from 'react';
import img from './logo/Logo.png';
import styled from 'styled-components';

export default function Header() {
  return (
    <WrapperDiv>
      <Link href="https://github.com/alexey-oblomov/aviasales_test_task" alt="Ссылка на GutHub">
        GitHub: https://github.com/alexey-oblomov/aviasales_test_task
      </Link>
      <LogoDiv />
    </WrapperDiv>
  );
}

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 50px;
`;

const LogoDiv = styled.div`
  width: 70px;
  height: 70px;
  background-image: url('${img}');
  background-position: center;
  margin: 15px auto;
`;

const Link = styled.a`
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 5px;
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  font-size: 14px;
  :hover {
    text-decoration: underline #000000;
  }
`;
