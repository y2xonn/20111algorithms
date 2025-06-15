import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { generateAIText } from './ai.js';
import { saveUserData, getFeed } from '../../backend/data.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 사용자 데이터 저장 (관심사, 글 등)
app.post('/save_user_data', (req, res) => {
  const { userId, interests, userPosts, searchPosts, relatedPosts } = req.body;
  saveUserData(userId, interests, userPosts, searchPosts, relatedPosts);
  res.json({ message: '데이터 저장 성공' });
});

// 맞춤 피드 가져오기
app.get('/get_feed', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId 필요' });

  const feed = getFeed(userId);
  res.json({ feed });
});

// AI 생성 글 요청 처리
app.post('/generate_ai_post', async (req, res) => {
  const { prompt } = req.body;
  try {
    const aiText = await generateAIText(prompt);
    res.json({ aiText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI 생성 중 오류' });
  }
});

app.listen(3001, () => {
  console.log('서버 실행 중 (포트 3001)');
});
