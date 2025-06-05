// Backend API for Fortune Teller - Node.js Express Server
// This file handles API requests and integrates with Tencent Yuanbao DeepSeek model

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fortune telling API endpoint
app.post('/api/fortune', async (req, res) => {
    try {
        const astrologyData = req.body;
        
        // Validate input
        if (!astrologyData || !astrologyData.zodiacAnimal) {
            return res.status(400).json({ error: 'Astrology data is required' });
        }

        // Generate fortune using Tencent Yuanbao DeepSeek model
        const fortune = await generateFortune(astrologyData);
        
        res.json({ success: true, fortune });
    } catch (error) {
        console.error('Error generating fortune:', error);
        res.status(500).json({ error: 'Failed to generate fortune reading' });
    }
});

// BaZi Fortune telling API endpoint (English output)
app.post('/api/bazi-fortune', async (req, res) => {
    try {
        const astrologyData = req.body;
        
        // Validate input
        if (!astrologyData || !astrologyData.name) {
            return res.status(400).json({ error: 'Birth data is required' });
        }

        console.log('Received BaZi request:', astrologyData);
        
        // Check if API key is configured
        if (!process.env.TENCENT_YUANBAO_API_KEY || process.env.TENCENT_YUANBAO_API_KEY === 'your_api_key_here') {
            console.log('API key not configured, using fallback fortune');
            const fallbackFortune = generateBaZiFallbackFortune(astrologyData);
            return res.json({ success: true, fortune: fallbackFortune });
        }

        // Generate BaZi fortune using Tencent Yuanbao DeepSeek model
        const fortune = await generateBaZiFortune(astrologyData);
        
        res.json({ success: true, fortune });
    } catch (error) {
        console.error('Error generating BaZi fortune:', error);
        
        // Return fallback fortune on error
        const fallbackFortune = generateBaZiFallbackFortune(req.body);
        res.json({ success: true, fortune: fallbackFortune });
    }
});

// Function to call Tencent Yuanbao DeepSeek model for BaZi fortune (English output)
async function generateBaZiFortune(astrologyData) {
    const prompt = createBaZiFortunePrompt(astrologyData);
    
    try {
        // Call Tencent Yuanbao DeepSeek API with web search enabled
        const response = await axios.post(process.env.TENCENT_YUANBAO_API_URL || 'https://api.deepseek.com/v1/chat/completions', {
            model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional Chinese BaZi (Eight Characters) fortune teller with deep knowledge of traditional Chinese astrology. Provide detailed, insightful fortune readings in English based on birth information. Enable web search to provide accurate and up-to-date astrological insights. Your readings should be encouraging, authentic, and well-structured.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 1500,
            temperature: 0.7,
            stream: false,
            web_search: true
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.TENCENT_YUANBAO_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const fortuneText = response.data.choices[0].message.content;
        return parseBaZiFortune(fortuneText, astrologyData);
        
    } catch (error) {
        console.error('Error calling Tencent Yuanbao API for BaZi:', error);
        
        // Fallback to sample fortune if API fails
        return generateBaZiFallbackFortune(astrologyData);
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

// Create a detailed prompt for the AI model
function createFortunePrompt(data) {
    return `
Please provide a comprehensive Chinese astrology fortune reading for someone with the following birth information:

**Birth Details:**
- Date: ${data.birthDate}
- Time: ${data.birthTime}
- Location: ${data.birthPlace}
- Gender: ${data.gender}
- Chinese Zodiac: ${data.zodiacAnimal}
- Element: ${data.element}
- Birth Hour: ${data.birthHour}

Please provide insights on:
1. **General Fortune & Personality**: Based on their zodiac animal and element combination
2. **Career & Finance**: Professional prospects and financial outlook
3. **Love & Relationships**: Romantic compatibility and relationship advice
4. **Health & Wellness**: Physical and mental well-being guidance
5. **Lucky Elements**: Colors, numbers, directions that bring good fortune

Please write in English and make the reading positive, encouraging, and authentic to traditional Chinese astrology principles. The tone should be wise, supportive, and insightful.
`;
}

// Parse the AI response into structured format
function parseFortune(fortuneText, astrologyData) {
    // Simple parsing - in production, you might want more sophisticated parsing
    const sections = fortuneText.split(/\d+\.|\*\*|##/);
    
    return {
        general: extractSection(fortuneText, ['general', 'personality', 'character']),
        career: extractSection(fortuneText, ['career', 'finance', 'professional', 'work']),
        love: extractSection(fortuneText, ['love', 'relationship', 'romance', 'marriage']),
        health: extractSection(fortuneText, ['health', 'wellness', 'physical', 'mental']),
        lucky: extractSection(fortuneText, ['lucky', 'fortune', 'auspicious', 'favorable']),
        fullReading: fortuneText,
        astrologyData
    };
}

// Extract specific sections from the fortune text
function extractSection(text, keywords) {
    const lines = text.split('\n');
    let sectionLines = [];
    let inSection = false;
    
    for (let line of lines) {
        const lowerLine = line.toLowerCase();
        
        // Check if this line starts a relevant section
        if (keywords.some(keyword => lowerLine.includes(keyword))) {
            inSection = true;
            sectionLines = [line];
            continue;
        }
        
        // Check if we've moved to a new section
        if (inSection && (line.match(/^\d+\./) || line.match(/^\*\*/) || line.match(/^##/))) {
            break;
        }
        
        if (inSection && line.trim()) {
            sectionLines.push(line);
        }
    }
    
    return sectionLines.join(' ').trim() || 'The stars hold positive energy for this aspect of your life.';
}

// Create a detailed prompt for BaZi fortune telling
function createBaZiFortunePrompt(data) {
    return `
Please provide a comprehensive BaZi (Eight Characters) fortune reading in English for someone with the following birth information:

**Personal Information:**
- Name: ${data.name}
- Birth Date: ${data.birthDate}
- Birth Time: ${data.birthTime}
- Birth Place: ${data.birthPlace}
- Gender: ${data.gender}
- Chinese Zodiac Animal: ${data.zodiacAnimal}
- Five Element: ${data.element}
- Birth Hour (Chinese): ${data.birthHour}

Please provide detailed insights on:
1. **Overall Fortune**: General life path and personality traits based on BaZi analysis
2. **Career and Wealth**: Professional prospects, financial outlook, and business opportunities
3. **Love and Marriage**: Romantic compatibility, relationship advice, and marriage prospects
4. **Health Condition**: Physical and mental well-being guidance based on elemental balance
5. **Advice**: Practical recommendations for enhancing fortune and avoiding potential challenges

Please write in clear, encouraging English. Make the reading positive, insightful, and authentic to traditional Chinese BaZi principles. Structure the response with clear sections and provide specific, actionable advice.
`;
}

// Parse BaZi fortune response into structured format
function parseBaZiFortune(fortuneText, astrologyData) {
    return {
        general: extractSection(fortuneText, ['overall', 'general', 'personality', 'life path']) || 'Your BaZi chart reveals a harmonious balance of elements that supports personal growth and success.',
        career: extractSection(fortuneText, ['career', 'wealth', 'professional', 'business', 'financial']) || 'Your elemental composition suggests strong potential for career advancement and financial stability.',
        love: extractSection(fortuneText, ['love', 'marriage', 'relationship', 'romantic']) || 'Your BaZi indicates positive energy for meaningful relationships and emotional fulfillment.',
        health: extractSection(fortuneText, ['health', 'physical', 'mental', 'well-being']) || 'Your elemental balance supports good health with attention to maintaining harmony between work and rest.',
        advice: extractSection(fortuneText, ['advice', 'recommendation', 'guidance', 'suggestion']) || 'Focus on maintaining elemental balance in your daily life and embrace opportunities that align with your natural strengths.',
        fullReading: fortuneText,
        astrologyData
    };
}

// Generate fallback BaZi fortune when API fails
function generateBaZiFallbackFortune(data) {
    return {
        general: `As a ${data.element} ${data.zodiacAnimal} born in ${data.birthPlace}, you possess a unique combination of ${getElementTraits(data.element)} and ${getZodiacTraits(data.zodiacAnimal)}. Your birth during ${data.birthHour} adds special significance to your life journey.`,
        career: `Your ${data.element} nature brings ${getCareerAdvice(data.element)} to your professional life. The ${data.zodiacAnimal} energy suggests ${getZodiacCareer(data.zodiacAnimal)} opportunities in your career path.`,
        love: `In relationships, your ${data.zodiacAnimal} characteristics attract ${getLoveAdvice(data.zodiacAnimal)}. Your ${data.element} element enhances emotional depth and compatibility.`,
        health: `Your ${data.element} constitution supports ${getHealthAdvice(data.element)}. The ${data.zodiacAnimal} energy encourages ${getZodiacHealth(data.zodiacAnimal)} for optimal wellness.`,
        advice: `Embrace your ${data.element} nature and ${data.zodiacAnimal} strengths. Your lucky elements include ${getLuckyElements(data.element, data.zodiacAnimal)}. Stay true to your authentic self and trust in your natural abilities.`,
        astrologyData: data
    };
}

// Fallback fortune generator
function generateSampleFortune(data) {
    const fortunes = {
        general: `As a ${data.element} ${data.zodiacAnimal}, you possess a unique blend of ${getElementTraits(data.element)} and ${getZodiacTraits(data.zodiacAnimal)}. Your birth in ${data.birthPlace} during the ${data.birthHour} adds special significance to your life path.`,
        career: `Your ${data.element} nature brings ${getCareerAdvice(data.element)} to your professional endeavors. The ${data.zodiacAnimal} energy suggests ${getZodiacCareer(data.zodiacAnimal)} opportunities ahead.`,
        love: `In matters of the heart, your ${data.zodiacAnimal} traits attract ${getLoveAdvice(data.zodiacAnimal)}. The ${data.element} element enhances your romantic compatibility and emotional depth.`,
        health: `Your ${data.element} constitution supports ${getHealthAdvice(data.element)}. The ${data.zodiacAnimal} energy encourages ${getZodiacHealth(data.zodiacAnimal)} for optimal well-being.`,
        lucky: `Your lucky elements include ${getLuckyElements(data.element, data.zodiacAnimal)}. These will bring positive energy to your endeavors.`,
        astrologyData: data
    };
    
    return fortunes;
}

// Helper functions for generating advice
function getElementTraits(element) {
    const traits = {
        Wood: 'growth, flexibility, and creativity',
        Fire: 'passion, energy, and leadership',
        Earth: 'stability, reliability, and nurturing',
        Metal: 'precision, determination, and clarity',
        Water: 'adaptability, wisdom, and intuition'
    };
    return traits[element] || 'balanced energy';
}

function getZodiacTraits(zodiac) {
    const traits = {
        Rat: 'intelligence and resourcefulness',
        Ox: 'determination and reliability',
        Tiger: 'courage and leadership',
        Rabbit: 'gentleness and diplomacy',
        Dragon: 'power and charisma',
        Snake: 'wisdom and intuition',
        Horse: 'freedom and adventure',
        Goat: 'creativity and compassion',
        Monkey: 'cleverness and adaptability',
        Rooster: 'confidence and precision',
        Dog: 'loyalty and honesty',
        Pig: 'generosity and optimism'
    };
    return traits[zodiac] || 'positive characteristics';
}

function getCareerAdvice(element) {
    const advice = {
        Wood: 'steady growth and creative innovation',
        Fire: 'dynamic leadership and inspiring vision',
        Earth: 'solid foundation and practical success',
        Metal: 'sharp focus and strategic thinking',
        Water: 'flowing adaptability and deep insight'
    };
    return advice[element] || 'positive momentum';
}

function getZodiacCareer(zodiac) {
    const careers = {
        Rat: 'strategic and analytical',
        Ox: 'methodical and persistent',
        Tiger: 'leadership and pioneering',
        Rabbit: 'diplomatic and artistic',
        Dragon: 'visionary and influential',
        Snake: 'analytical and transformative',
        Horse: 'dynamic and independent',
        Goat: 'creative and collaborative',
        Monkey: 'innovative and versatile',
        Rooster: 'organized and detail-oriented',
        Dog: 'service-oriented and trustworthy',
        Pig: 'generous and team-building'
    };
    return careers[zodiac] || 'promising';
}

function getLoveAdvice(zodiac) {
    const love = {
        Rat: 'intelligent and charming partners',
        Ox: 'stable and committed relationships',
        Tiger: 'passionate and exciting connections',
        Rabbit: 'gentle and harmonious bonds',
        Dragon: 'dynamic and inspiring partnerships',
        Snake: 'deep and mysterious attractions',
        Horse: 'adventurous and free-spirited love',
        Goat: 'artistic and emotional connections',
        Monkey: 'playful and intellectually stimulating relationships',
        Rooster: 'honest and straightforward partnerships',
        Dog: 'loyal and trustworthy companions',
        Pig: 'warm and generous love'
    };
    return love[zodiac] || 'meaningful connections';
}

function getHealthAdvice(element) {
    const health = {
        Wood: 'flexibility and growth-oriented wellness',
        Fire: 'active and energetic lifestyle choices',
        Earth: 'grounded and balanced health practices',
        Metal: 'structured and disciplined wellness routines',
        Water: 'flowing and adaptive health approaches'
    };
    return health[element] || 'balanced well-being';
}

function getZodiacHealth(zodiac) {
    const health = {
        Rat: 'mental stimulation and stress management',
        Ox: 'steady exercise and consistent routines',
        Tiger: 'active sports and physical challenges',
        Rabbit: 'gentle activities and peaceful environments',
        Dragon: 'dynamic workouts and energy cultivation',
        Snake: 'mindful practices and inner reflection',
        Horse: 'outdoor activities and freedom of movement',
        Goat: 'creative expression and emotional wellness',
        Monkey: 'varied activities and mental engagement',
        Rooster: 'regular schedules and organized health plans',
        Dog: 'loyal exercise partners and community wellness',
        Pig: 'enjoyable activities and social health practices'
    };
    return health[zodiac] || 'positive health practices';
}

function getLuckyElements(element, zodiac) {
    const colors = {
        Wood: 'green and brown',
        Fire: 'red and orange',
        Earth: 'yellow and beige',
        Metal: 'white and gold',
        Water: 'blue and black'
    };
    
    const numbers = Math.floor(Math.random() * 9) + 1;
    const directions = ['North', 'South', 'East', 'West', 'Northeast', 'Northwest', 'Southeast', 'Southwest'];
    const luckyDirection = directions[Math.floor(Math.random() * directions.length)];
    
    return `${colors[element]} colors, number ${numbers}, and ${luckyDirection} direction`;
}

// Start the server
app.listen(PORT, () => {
    console.log(`Fortune Teller server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
});