import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Option from "./option";

export default function (props) {
  const optionArray = props.options.map((option) => {
    return (
      <Option
        option={option}
        chooseOption={() => props.chooseOption(option.key, props.id)}
        key={option.key}
      />
    );
  });
  return (
    <>
      <TriviaQuestions>{decodeURIComponent(props.question)}</TriviaQuestions>
      <Options className="options">{optionArray}</Options>
      <hr></hr>
    </>
  );
}

const TriviaQuestions = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.2;
  color: #293264;
  margin-top: 30px;
  text-align: center;
  @media screen and (min-width: 750px) {
    text-align: left;
    margin-top: 5px;
  }
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
  @media screen and (min-width: 750px) {
    flex-direction: row;
  }
`;
