export async function saveUserData(userId, interests, userPosts, searchPosts, relatedPosts) {
    const response = await fetch('http://localhost:3001/save_user_data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, interests, userPosts, searchPosts, relatedPosts }),
    });
    return response.json();
  }
  
  export async function getFeed(userId) {
    const response = await fetch(`http://localhost:3001/get_feed?userId=${userId}`);
    return response.json();
  }
  
  export async function generateAIText(prompt) {
    const response = await fetch('http://localhost:3001/generate_ai_post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    return response.json();
  }
  
