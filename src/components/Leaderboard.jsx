import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(storedLeaderboard.sort((a, b) => b.score - a.score));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaderboard.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
                <td>{entry.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results available. Be the first to take the quiz!</p>
      )}
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Leaderboard;
