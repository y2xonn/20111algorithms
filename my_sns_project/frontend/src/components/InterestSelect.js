import React, { useState } from 'react';

const topics = ['기술', '음악', '운동', '책', '영화'];

function InterestSelect({ onSubmit }) {
  const [selected, setSelected] = useState([]);

  const toggleTopic = (topic) => {
    if (selected.includes(topic)) {
      setSelected(selected.filter(t => t !== topic));
    } else {
      setSelected([...selected, topic]);
    }
  };

  const handleSubmit = () => {
    if (selected.length === 0) return alert('관심사를 하나 이상 선택하세요');
    onSubmit(selected);
  };

  return (
    <div>
      <h2>관심사 선택</h2>
      {topics.map(topic => (
        <label key={topic} style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            checked={selected.includes(topic)}
            onChange={() => toggleTopic(topic)}
          />
          {topic}
        </label>
      ))}
      <br />
      <button onClick={handleSubmit}>확인</button>
    </div>
  );
}

export default InterestSelect;
