// Vercel API route for BaZi fortune telling
// This file handles BaZi (Eight Characters) fortune analysis using Tencent Yuanbao DeepSeek model

const axios = require('axios');

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method \!== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const astrologyData = req.body;
        
        // Validate input
        if (\!astrologyData || \!astrologyData.name) {
            return res.status(400).json({ error: 'Birth data is required' });
        }

        // Generate BaZi fortune using Tencent Yuanbao DeepSeek model
        const fortune = await generateBaZiFortune(astrologyData);
        
        res.json({ fortune });
    } catch (error) {
        console.error('Error generating BaZi fortune:', error);
        res.status(500).json({ error: 'Failed to generate BaZi fortune reading' });
    }
}

// Function to call Tencent Yuanbao DeepSeek model
async function generateBaZiFortune(astrologyData) {
    const prompt = createBaZiPrompt(astrologyData);
    
    try {
        const response = await axios.post(
            process.env.TENCENT_YUANBAO_API_URL || 'https://api.hunyuan.cloud.tencent.com/v1/chat/completions',
            {
                model: process.env.DEEPSEEK_MODEL || 'hunyuan-lite',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional Chinese astrology master with deep knowledge of Ba Zi (Eight Characters) fortune telling. Provide detailed, insightful, and positive fortune readings in English based on the provided birth information. Your readings should be encouraging while being authentic to traditional Chinese astrology principles. Always respond in English.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1500,
                temperature: 0.7,
                tools: [
                    {
                        type: 'web_search',
                        web_search: {
                            enable: true
                        }
                    }
                ],
                stream: false
            },
            {
                headers: {
                    'Authorization': \Bearer \\,
                    'Content-Type': 'application/json'
                }
            }
        );

        const fortuneText = response.data.choices[0].message.content;
        return parseBaZiFortune(fortuneText, astrologyData);
        
    } catch (error) {
        console.error('Error calling Tencent Yuanbao API:', error);
        
        // Fallback to sample fortune if API fails
        return generateSampleBaZiFortune(astrologyData);
    }
}

function createBaZiPrompt(astrologyData) {
    return \Please provide a comprehensive BaZi (Four Pillars of Destiny) fortune analysis in English for \:

Birth Information:
- Name: \
- Birth Date: \
- Birth Time: \
- Birth Place: \
- Gender: \
- Chinese Zodiac: \
- Five Element: \
- Birth Hour: \

Please analyze the following aspects in English:
1. Overall Fortune - General life trends and destiny patterns
2. Career and Wealth - Professional development and financial prospects
3. Love and Marriage - Romantic relationships and family harmony
4. Health Condition - Physical wellbeing and vitality
5. Personal Advice - Guidance based on BaZi principles

Use traditional Chinese astrology knowledge combined with modern insights. Provide encouraging and constructive guidance. Please respond entirely in English with detailed explanations.\;
}

function parseBaZiFortune(fortuneText, astrologyData) {
    // Try to parse the AI response into structured format
    const sections = fortuneText.split(/\\d+\\.|[一二三四五]、|Overall Fortune|Career and Wealth|Love and Marriage|Health Condition|Personal Advice/i);
    
    // Extract meaningful sections
    const cleanSections = sections.filter(section => section.trim().length > 50);
    
    return {
        general: cleanSections[0] || 'Your overall fortune shows positive trends with opportunities for growth and success. Your BaZi indicates a balanced life path with potential for achievement.',
        career: cleanSections[1] || 'Career prospects are favorable with opportunities for advancement. Your natural talents align well with professional success. Focus on building relationships and developing skills.',
        love: cleanSections[2] || 'Romantic relationships show harmony and potential for deep connections. Your emotional intelligence and caring nature attract positive partnerships.',
        health: cleanSections[3] || 'Health indicators are generally positive. Maintain balance between work and rest. Pay attention to seasonal changes and adapt your lifestyle accordingly.',
        advice: cleanSections[4] || 'Based on your BaZi analysis, embrace your natural strengths while working on areas for improvement. Stay true to your values and maintain positive relationships for continued success.'
    };
}

function generateSampleBaZiFortune(astrologyData) {
    // Fallback fortune based on zodiac and element
    const { zodiacAnimal, element, gender } = astrologyData;
    
    return {
        general: \As a \ with \ element, your life path shows great potential for success and fulfillment. Your natural characteristics bring both strength and wisdom to your journey.\,
        career: \Your \ element provides stability and growth potential in your career. \ individuals are known for their determination and ability to overcome challenges in professional settings.\,
        love: \In matters of the heart, your \ nature brings loyalty and deep emotional connections. Your relationships benefit from your natural understanding and compassion.\,
        health: \Your \ constitution suggests good vitality and resilience. Focus on maintaining balance and harmony in your daily routines for optimal wellbeing.\,
        advice: \Embrace your \ strengths while cultivating the positive aspects of your \ element. Trust in your natural abilities and maintain a positive outlook for continued growth and happiness.\
    };
}
