import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateAIText(prompt) {
  const response = await openai.createChatCompletion({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: '당신은 친절한 SNS 콘텐츠 생성자입니다.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 300,
    temperature: 0.7,
  });
  return response.data.choices[0].message.content;
}
