import React, { useState } from 'react';
import { generateAIText } from '../api';

function PostWrite({ userId, interests, onNewPost }) {
  const [text, setText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (text.trim() === '') return alert('글을 입력하세요');
    setLoading(true);
    try {
      // AI 생성용 프롬프트 예시: 관심사와 사용자가 쓴 글 조합
      const prompt = `관심사: ${interests.join(', ')}\n사용자 글: ${text}\n이 글과 관련된 SNS 게시글을 작성해 주세요.`;
      const result = await generateAIText(prompt);
      setAiResponse(result.aiText);
      onNewPost(text, result.aiText);
    } catch (error) {
      alert('AI 생성 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>글 작성 및 AI 생성</h2>
      <textarea
        rows="5"
        cols="50"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="글을 입력하세요"
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? '생성 중...' : 'AI 생성'}
      </button>
      {aiResponse && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
          <h3>AI가 생성한 글</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default PostWrite;
