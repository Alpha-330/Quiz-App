import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SetupQuiz = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');

  const handleStartQuiz = () => {
    const quizConfig = { name, category, difficulty, numberOfQuestions };
    localStorage.setItem('quizConfig', JSON.stringify(quizConfig));
    navigate('/quiz');
  };

  return (
    <div className="setup-quiz">
      <h2>Setup Quiz</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="27">Animals</option>
        </select>
      </label>
      <label>
        Difficulty:
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <label>
        Number of Questions:
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(e.target.value)}
        />
      </label>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default SetupQuiz;
