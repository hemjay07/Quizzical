import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import UnitTrivia from "./UnitTrivia";

export default function () {
  // Make Api Call And Set states
  // ---------------------------------------------------------------------------------------
  // -----------------------------
  // -----------------------------
  // React strict state automatically renders some components twice. I cant let happen to my api call as it would return 2 diffent set of questions. useRef can be used to keep track of if something has been rendered before, this is because useRef itself is never rerendered.
  const [trivia, setTrivia] = React.useState([]);
  const dataFetched = React.useRef(true);
  const [displayScore, setDisplayScore] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [replay, setReplay] = React.useState(1);
  React.useEffect(() => {
    if (dataFetched.current) {
      dataFetched.current = false;
      async function getData() {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=5&encode=url3986"
        );
        const data = await res.json();
        //   setTrivia(data.results);
        const triviaArray = [];
        data.results.forEach((item) => {
          // create an object for each option so we can keep track of the option and whether it has been clicked or not
          let options = [...item.incorrect_answers, item.correct_answer];
          options = options.sort(() => Math.random() - 0.5);

          const ArrayOfOptions = options.map((option) => {
            return {
              key: nanoid(),
              option: option,
              color: "transparent",
            };
          });
          const triviaObject = {
            key: nanoid(),
            question: item.question,
            answer: item.correct_answer,
            options: ArrayOfOptions,
          };
          triviaArray.push(triviaObject);
        });
        setTrivia(triviaArray);
      }
      getData();
    }
  }, [replay]);

  // Functions
  // ---------------------------------------------------------------------------------------
  // -----------------------------
  // -----------------------------

  function chooseOption(optionKey, UnitTriviaKey) {
    setTrivia((prev) => {
      return prev.map((triviaObject) =>
        triviaObject.key !== UnitTriviaKey
          ? triviaObject
          : renewObject(triviaObject, optionKey)
      );
    });
  }

  // Build a new object for the trivia unit being answered such that the clicked option is set to true while other options are set to false
  function renewObject(triviaObject, optionKey) {
    const options = [];
    triviaObject.options.forEach((option) => {
      // set clicked of picked option to true and other option to false
      if (option.key !== optionKey) {
        options.push({
          ...option,
          color: "transparent",
        });
      } else {
        options.push({
          ...option,
          color: option.color === "transparent" ? "#D6DBF5" : "transpatent",
        });
      }
    });

    // return the built object
    return {
      key: triviaObject.key,
      question: triviaObject.question,
      answer: triviaObject.answer,
      options: options,
    };
  }

  // To check answers
  function checkAnswers() {
    setTrivia((prev) => {
      return prev.map((triviaObject) => {
        return { ...triviaObject, options: compareAnswers(triviaObject) };
      });
    });
    setDisplayScore(true);
  }

  function compareAnswers(triviaObject) {
    const options = [];
    const correctAnswer = triviaObject.answer;

    triviaObject.options.forEach((option) => {
      let color;
      let opacity;
      if (option.option === correctAnswer) {
        color = "#94D7A2";
        opacity = 1;
      } else if (option.color === "transparent") {
        color = "transparent";
        opacity = 0.5;
      } else {
        color = "#F8BCBC";
        opacity = 0.5;
      }
      if (option.color === "#D6DBF5" && option.option === correctAnswer) {
        setScore((prev) => prev + 1);
      }

      options.push({
        ...option,
        color: color,
        opacity: opacity,
      });
    });

    return options;
  }

  // To play again
  function playAgain() {
    setDisplayScore(false);
    setScore(0);
    setReplay((prev) => prev + 1);
    dataFetched.current = true;
  }
  // Create Components Using the Trivia State
  // ---------------------------------------------------------------------------------------
  // -----------------------------
  // -----------------------------
  const displayTrivia = trivia.map((item) => {
    return (
      <UnitTrivia
        question={item.question}
        options={item.options}
        id={item.key}
        key={item.key}
        chooseOption={chooseOption}
      />
    );
  });

  displayTrivia.push();

  return (
    <TriviaContainer className="container">
      {!dataFetched.current && (
        <>
          {" "}
          <Header>Quizzicals</Header>
          {displayTrivia}
          <ShowScoreOrCheckAnswer>
            {displayScore && (
              <ShowScore>
                <Score>You scored {score / 2}/5 correct answers</Score>
                <PlayAgain onClick={playAgain}> Play Again</PlayAgain>
              </ShowScore>
            )}

            {!displayScore && (
              <CheckAnswers onClick={checkAnswers}> Check Answers</CheckAnswers>
            )}
          </ShowScoreOrCheckAnswer>
        </>
      )}
    </TriviaContainer>
  );
}

// STYLED COMPONENTS
// ---------------------------------------------------------------------------------------
// -----------------------------
// -----------------------------
const TriviaContainer = styled.div`
  width: 90%;
  @media screen and (min-width: 750px) {
    width: 50%;
  }
`;
const Header = styled.h1`
  font-size: 25px;
  margin-bottom: 40px;
  text-align: center;
  color: #293264;
  font-family: "Fugaz One", cursive;
`;
const CheckAnswers = styled.button`
  background: #4d5b9e;
  border-radius: 10px;
  margin-left: auto;
  padding: 15px;
  margin: 15px 0;
  border: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 12px;
  text-align: center;
  color: #f5f7fb;
  cursor: pointer;
`;
const PlayAgain = CheckAnswers;
const ShowScoreOrCheckAnswer = styled.div`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;
const ShowScore = styled.div`
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const Score = styled.h2`
  color: #293264;
  font-weight: 700;
  font-size: 20px;
`;
