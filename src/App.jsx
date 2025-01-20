import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SetupQuiz from './components/SetupQuiz';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Quiz App</h1>
        <Routes>
          <Route path="/" element={<SetupQuiz />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
