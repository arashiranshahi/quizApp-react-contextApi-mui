import { createContext, useState } from "react";

const iniCount = 0

// Store
export const contexts = createContext({
  allCategory: [],
  setAllCategory : () => {},
  counter : '',
  setCounter : () => {},
  category : '',
  setCategory : () => {},
  difficulty : '',
  setDifficulty : () => {},
  reqApi : {},
  setReqApi : () => {},
  results : [],
  setResults : () => {},
  countQ : iniCount,
  setCountQ : () => {},
  correctAnswer : iniCount ,
  setCorrectAnswer : () => {},
  wrongAnswer : iniCount ,
  setWrongAnswer : () => {},
  modal : false ,
  setModal : () => {}
});

// Provider
const ContextsProvider = ({ children }) => {
  const [counter , setCounter] = useState('10')
  const [reqApi , setReqApi] = useState({})
  const [category , setCategory] = useState('')
  const [difficulty , setDifficulty] = useState('')
  const [results , setResults] = useState([])
  const [countQ , setCountQ] = useState(iniCount)
  const [correctAnswer , setCorrectAnswer] = useState(iniCount)
  const [wrongAnswer , setWrongAnswer] = useState(iniCount)
  const [modal , setModal] = useState(iniCount)
  const [allCategory , setAllCategory] = useState()

  return (
    <contexts.Provider
      value={{
        counter,
        setCounter,
        category,
        setCategory,
        difficulty,
        setDifficulty,
        reqApi,
        setReqApi,
        results,
        setResults,
        countQ,
        setCountQ,
        correctAnswer,
        setCorrectAnswer,
        wrongAnswer,
        setWrongAnswer,
        modal,
        setModal,
        allCategory,
        setAllCategory
      }}
    >
      {children}
    </contexts.Provider>
  );
};

export default ContextsProvider;
