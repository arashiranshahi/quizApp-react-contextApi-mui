import { Box, Typography, Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { contexts } from "../../contexts";

const ModalResults = () => {
  const {
    modal,
    setModal,
    correctAnswer,
    setCorrectAnswer,
    wrongAnswer,
    setWrongAnswer,
    results,
    setCountQ,
  } = useContext(contexts);

  const navigate = useNavigate();

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
    borderRadius: "0.5rem",
  };

  const QuizResults = () => {
    return (
      ((correctAnswer * 3 - wrongAnswer) / (results.length * 3)) *
      100
    ).toFixed(1);
  };

  const playAgainHandler = () => {
    setModal(false);
    navigate("/");
    setWrongAnswer(0);
    setCorrectAnswer(0);
    setCountQ(0);
  };

  return (
    <Modal
      open={modal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h3" component="h3">
          Congrats
        </Typography>
        <Typography id="modal-modal-description" sx={{ my: 2 }}>
          You answered {QuizResults()}%
        </Typography>
        <Button variant="contained" onClick={playAgainHandler}>
          Play Again
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalResults;
