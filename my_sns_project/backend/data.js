const users = {}; // { userId: { interests: [], userPosts: [], searchPosts: [], relatedPosts: [] } }

export function saveUserData(userId, interests, userPosts, searchPosts, relatedPosts) {
  users[userId] = {
    interests: interests || [],
    userPosts: userPosts || [],
    searchPosts: searchPosts || [],
    relatedPosts: relatedPosts || [],
  };
}

export function getFeed(userId) {
  if (!users[userId]) return [];

  // 단순히 관심사 글 + 유저 글 + 검색 글 + 관련 글을 합쳐서 리턴 (순서 및 중복 처리 등은 추가 가능)
  return [
    ...users[userId].interests.map(text => ({ type: 'interest_post', content: text })),
    ...users[userId].userPosts.map(text => ({ type: 'user_post', content: text })),
    ...users[userId].searchPosts.map(text => ({ type: 'search_post', content: text })),
    ...users[userId].relatedPosts.map(text => ({ type: 'related_post', content: text })),
  ];
}
