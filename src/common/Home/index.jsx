import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { contexts } from "../../contexts/index";
import "./app.style.scss";

const Home = () => {
  const {
    allCategory,
    setAllCategory,
    counter,
    setCounter,
    category,
    setCategory,
    difficulty,
    setDifficulty,
    setReqApi,
  } = useContext(contexts);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => setAllCategory(res.data.trivia_categories));
  }, []);

  const inputNumberHandler = (value) => {
    if (value > 0) {
      setCounter(value);
    }
  };

  const startHandler = () => {
    setReqApi({ counter, category, difficulty });
    navigate("/questions");
  };


  return (
    <section className="home-container">
      <div className="setup-quiz">
        <h1
          onClick={() => {
            console.log(allCategory);
          }}
        >
          Setup Quiz
        </h1>

        <div className="text-field">
          <label htmlFor="numQ">Number Of Questions</label>
          <input
            id="numQ"
            type="number"
            value={counter}
            onChange={(e) => inputNumberHandler(e.target.value)}
          />
        </div>

        <div className="text-field">
          <label htmlFor="categoryQ">Category</label>
          <select
            name="category"
            id="categoryQ"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">Any Category</option>
            {allCategory
              ? allCategory.map((item) => {
                  return <option key={item.id} value={item.id}>{item.name}</option>;
                })
              : null}
          </select>
        </div>

        <div className="text-field">
          <label htmlFor="difficultyQ">Difficulty</label>
          <select
            name="difficulty"
            id="difficultyQ"
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
            }}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button className="btn-start" onClick={startHandler}>
          Start
        </button>
      </div>
    </section>
  );
};

export default Home;
