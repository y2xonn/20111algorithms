import React, { useState } from 'react';
import Login from './components/Login';
import InterestSelect from './components/InterestSelect';
import PostWrite from './components/PostWrite';
import Feed from './components/Feed';
import { saveUserData } from './api';

function App() {
  const [userId, setUserId] = useState('');
  const [interests, setInterests] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [step, setStep] = useState(1);

  const handleLogin = (id) => {
    setUserId(id);
    setStep(2);
  };

  const handleInterestSubmit = (selectedInterests) => {
    setInterests(selectedInterests);
    setStep(3);
  };

  const handleNewPost = (userPost, aiPost) => {
    setUserPosts(prev => [...prev, userPost]);
    setRelatedPosts(prev => [...prev, aiPost]);
    // 사용자가 글 쓸 때 관련 AI 글도 저장
    saveUserData(userId, interests, [...userPosts, userPost], searchPosts, [...relatedPosts, aiPost]);
  };

  return (
    <div style={{ padding: '20px' }}>
      {step === 1 && <Login onLogin={handleLogin} />}
      {step === 2 && <InterestSelect onSubmit={handleInterestSubmit} />}
      {step === 3 && (
        <>
          <PostWrite userId={userId} interests={interests} onNewPost={handleNewPost} />
          <Feed userId={userId} />
        </>
      )}
    </div>
  );
}

export default App;
