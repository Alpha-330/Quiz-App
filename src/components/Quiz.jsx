import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const navigate = useNavigate();
  const quizConfig = JSON.parse(localStorage.getItem('quizConfig'));
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(
          `https://opentdb.com/api.php?amount=${quizConfig.numberOfQuestions}&category=${quizConfig.category}&difficulty=${quizConfig.difficulty}&type=multiple`
        );
        setQuestions(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
      leaderboard.push({
        name: quizConfig.name,
        score,
        totalQuestions: questions.length,
        percentage: ((score + 1) / questions.length) * 100,
      });
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
      navigate('/leaderboard');
    }
  };

  if (loading) return <p>Loading...</p>;

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div>
      <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
      <p>{currentQuestion.question}</p>
      {currentQuestion.incorrect_answers.map((answer, index) => (
        <button key={index} onClick={() => handleAnswer(false)}>
          {answer}
        </button>
      ))}
      <button onClick={() => handleAnswer(true)}>{currentQuestion.correct_answer}</button>
    </div>
  );
};

export default Quiz;
