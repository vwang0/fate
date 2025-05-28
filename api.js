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
app.use(express.static('.'));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Fortune telling API endpoint
app.post('/api/fortune', async (req, res) => {
    try {
        const { astrologyData } = req.body;
        
        // Validate input
        if (!astrologyData) {
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
- Location: ${data.birthCity}
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

// Fallback fortune generator
function generateSampleFortune(data) {
    const fortunes = {
        general: `As a ${data.element} ${data.zodiacAnimal}, you possess a unique blend of ${getElementTraits(data.element)} and ${getZodiacTraits(data.zodiacAnimal)}. Your birth in ${data.birthCity} during the ${data.birthHour} adds special significance to your life path.`,
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