import React from "react";
import styled from "styled-components";

export default function (props) {
  return (
    <OptionButton
      style={{
        backgroundColor: props.option.color,
        border:
          props.option.color !== "transparent" ? "none" : "1px solid #4d5b9e",
        opacity: props.option.opacity,
      }}
      onClick={props.chooseOption}
    >
      {decodeURIComponent(props.option.option)}
    </OptionButton>
  );
}

const OptionButton = styled.button`
  display: flex;
  flex-direction: row;
  white-space: no-wrap;
  width: fit-content;
  padding: 10px;
  border: solid 2px red;
  border-radius: 7.71045px;
  color: #293264;
  font-size: 14px;
  background-color: transparent;
`;
