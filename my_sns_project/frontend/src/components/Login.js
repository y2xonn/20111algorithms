import React, { useState } from 'react';

function Login({ onLogin }) {
  const [userId, setUserId] = useState('');

  const handleLogin = () => {
    if (userId.trim() === '') return alert('아이디를 입력하세요');
    onLogin(userId);
  };

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디 입력"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
