// Vercel API route for fortune telling
// This file should be placed in /api/fortune.js for Vercel deployment

const axios = require('axios');

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const astrologyData = req.body;
        
        // Validate input
        if (!astrologyData || !astrologyData.zodiacAnimal) {
            return res.status(400).json({ error: 'Astrology data is required' });
        }

        // Generate fortune using Tencent Yuanbao DeepSeek model
        const fortune = await generateFortune(astrologyData);
        
        res.json({ fortune });
    } catch (error) {
        console.error('Error generating fortune:', error);
        res.status(500).json({ error: 'Failed to generate fortune reading' });
    }
}

// Function to call Tencent Yuanbao DeepSeek model
async function generateFortune(astrologyData) {
    const prompt = createFortunePrompt(astrologyData);
    
    try {
        // Replace with actual Tencent Yuanbao API endpoint and credentials
        const response = await axios.post('https://api.tencent-yuanbao.com/v1/chat/completions', {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional Chinese astrology master with deep knowledge of Ba Zi (Eight Characters) fortune telling. Provide detailed, insightful, and positive fortune readings based on the provided birth information. Your readings should be encouraging while being authentic to traditional Chinese astrology principles.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.TENCENT_YUANBAO_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const fortuneText = response.data.choices[0].message.content;
        return parseFortune(fortuneText, astrologyData);
        
    } catch (error) {
        console.error('Error calling Tencent Yuanbao API:', error);
        
        // Fallback to sample fortune if API fails
        return generateSampleFortune(astrologyData);
    }
}

function createFortunePrompt(astrologyData) {
    return `Please provide detailed BaZi (Four Pillars of Destiny) fortune analysis for ${astrologyData.name}:

Basic Information:
- Name: ${astrologyData.name}
- Chinese Zodiac: ${astrologyData.zodiacAnimal}
- Element: ${astrologyData.element}
- Birth Hour: ${astrologyData.birthHour}
- Birth Place: ${astrologyData.birthPlace}
- Gender: ${astrologyData.gender}
- Birth Date: ${astrologyData.birthDate}
- Birth Time: ${astrologyData.birthTime}

Please analyze from the following aspects:
1. Overall Fortune
2. Career and Wealth
3. Love and Marriage
4. Health Condition

Please use a warm and positive tone, combining traditional BaZi astrology knowledge to provide meaningful guidance and advice in English.`;
}

function parseFortune(fortuneText, astrologyData) {
    // Parse the AI response into structured format
    const sections = fortuneText.split(/\d+\.|[一二三四]、/);
    
    return {
        general: sections[1] || '您的整体运势呈现积极向上的趋势，把握机遇，勇敢前行。',
        career: sections[2] || '事业方面将有新的发展机会，保持专注和努力。',
        love: sections[3] || '感情生活和谐美满，珍惜身边的人。',
        health: sections[4] || '身体健康状况良好，注意劳逸结合。',
        advice: '根据您的八字特点，建议保持积极心态，顺应自然规律，必将收获美好人生。'
    };
}

function generateSampleFortune(astrologyData) {
    const fortunes = {
        general: [
            `${astrologyData.name}，作为${astrologyData.element}${astrologyData.zodiacAnimal}，您拥有独特的品质，这些品质塑造着您的命运。`,
            `${astrologyData.name}，出生于${astrologyData.birthPlace}，您与这个地方的联系影响着您的人生道路。`,
            `${astrologyData.name}，您在${astrologyData.birthHour}时辰出生，为您的性格增添了特殊的意义。`
        ],
        career: [
            `${astrologyData.name}，您的${astrologyData.element}本性为您的职业生涯带来稳定和成长。`,
            `${astrologyData.name}，${astrologyData.zodiacAnimal}的能量预示着前方的领导机会。`,
            `${astrologyData.name}，今年在您的事业领域将有令人期待的发展。`
        ],
        love: [
            `${astrologyData.name}，在感情方面，您的${astrologyData.zodiacAnimal}特质吸引着真诚的联系。`,
            `${astrologyData.name}，${astrologyData.element}元素增强了您的浪漫兼容性。`,
            `${astrologyData.name}，您的出生时间预示着未来几个月的和谐关系。`
        ],
        health: [
            `${astrologyData.name}，您的${astrologyData.element}体质支持整体健康。`,
            `${astrologyData.name}，${astrologyData.zodiacAnimal}的能量鼓励积极的生活方式选择。`,
            `${astrologyData.name}，在健康之旅的各个方面都要注意平衡。`
        ]
    };

    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

    return {
        general: getRandomItem(fortunes.general),
        career: getRandomItem(fortunes.career),
        love: getRandomItem(fortunes.love),
        health: getRandomItem(fortunes.health),
        advice: `${astrologyData.name}，根据您的生辰八字，建议您保持积极的心态，相信自己的能力，未来充满无限可能。`
    };
}