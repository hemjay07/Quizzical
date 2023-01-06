import React from "react";
import styled from "styled-components";

export default function (props) {
  return (
    <Opening>
      <Heading> Quizzicals</Heading>
      <p style={{ fontSize: "20px" }}>Trivia like no other</p>
      <Button onClick={props.startGame}>Start quiz</Button>;
    </Opening>
  );
}

const Opening = styled.div`
  width: 60%;
  text-align: center;
  margin-top: 30vh;
  font-family: "Karla", sans-serif;
  color: #293264;
`;
const Heading = styled.h1`
  // font-family: "Fugaz One", cursive;
  font-size: 45px;
  margin-bottom: 0;
`;
const Button = styled.button`
  width: 193px;
  height: 52px;
  background: #4d5b9e;
  border-radius: 15px;
  border: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 19px;
  text-align: center;
  color: #f5f7fb;
  margin-top: 26px;
  cursor: pointer;
`;
