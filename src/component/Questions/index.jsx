import axios from "axios";
import React, { useContext, useEffect } from "react";
import { contexts } from "../../contexts";
import ModalResults from "../Modal";
import { keyframes } from "@mui/system";
import "./questions.style.scss";

const Questions = () => {
  const {
    reqApi,
    results,
    setResults,
    countQ,
    setCountQ,
    correctAnswer,
    setCorrectAnswer,
    wrongAnswer,
    setWrongAnswer,
    setModal,
  } = useContext(contexts);

  let BaseURL = `https://opentdb.com/api.php?amount=${reqApi.counter}&category=${reqApi.category}&difficulty=${reqApi.difficulty}`;

  useEffect(() => {
    const ApiReq = () => {
    };
    ApiReq();
      axios.get(BaseURL).then((response) => setResults(response.data.results));
  }, []);

  const nextQHandler = () => {
    if (countQ < results.length) {
      setCountQ(countQ + 1);
    }
    if (countQ + 1 === results.length) {
      setModal(true);
    }
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const formatArea = (value) => {
    const parser = new DOMParser();
    const deCoded = parser.parseFromString(value, "text/html").body.textContent;
    return deCoded;
  };

  let optionsArray = [];

  if (results[countQ] !== undefined) {
    console.log(results[countQ].correct_answer);
    optionsArray = [
      ...results[countQ].incorrect_answers,
      results[countQ].correct_answer,
    ];
    shuffle(optionsArray);
  }

  const optionClicked = (item) => {
    if (countQ < results.length) {
      setCountQ(countQ + 1);
      if (results[countQ].correct_answer === item) {
        setCorrectAnswer(correctAnswer + 1);
      }
      if (results[countQ].correct_answer !== item) {
        setWrongAnswer(wrongAnswer + 1);
      }
    }
    if (countQ + 1 === results.length) {
      setModal(true);
    }
  };

//   var wrong = keyframes`
//   0% { transform: translateX(0); }
//   25% { transform: translateX(20px); }
//   50% { transform: translateX(0); }
//   75% { transform: translateX(-20px); }
//   100% { transform: translateX(0); }
// `;

  return (
    <>
      <div className="question">
        <header>
          Correct Answer : {correctAnswer} / {results.length}
        </header>
        <section className="questions-container">
          <p>
            {results[countQ] !== undefined
              ? formatArea(results[countQ].question)
              : "loading..."}
          </p>
          {optionsArray.length > 0
            ? optionsArray.map((item) => {
                return (
                  <div
                    key={item}
                    className="test"
                    onClick={() => {
                      optionClicked(item);
                    }}
                  >
                    <span>{formatArea(item)}</span>
                  </div>
                );
              })
            : null}
        </section>
        <footer>
          <button className="btn-next" onClick={nextQHandler}>
            Next Question
          </button>
        </footer>
      </div>
      <ModalResults />
    </>
  );
};

export default Questions;
