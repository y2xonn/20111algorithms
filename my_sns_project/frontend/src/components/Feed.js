import React, { useEffect, useState } from 'react';
import { getFeed } from '../api';

function Feed({ userId }) {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeed(userId)
      .then(data => {
        setFeed(data.feed || []);
        setLoading(false);
      })
      .catch(err => {
        setError('피드 불러오기 실패');
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>피드를 불러오는 중입니다...</p>;
  if (error) return <p>에러: {error}</p>;

  return (
    <div>
      <h2>맞춤 피드</h2>
      {feed.length === 0 && <p>아직 글이 없습니다.</p>}
      <ul>
        {feed.map((item, i) => (
          <li key={i} style={{ marginBottom: '15px' }}>
            <strong>
              {item.type === 'interest_post' && '[관심사 글] '}
              {item.type === 'user_post' && '[내 글] '}
              {item.type === 'related_post' && '[관련 글] '}
              {item.type === 'search_post' && '[검색 글] '}
            </strong>
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feed;
