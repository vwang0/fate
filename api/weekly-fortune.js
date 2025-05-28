// Vercel Serverless Function for Weekly Fortune
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const astrologyData = req.body;
        
        // Call Tencent Yuanbao DeepSeek API for weekly fortune
        const weeklyFortune = await getWeeklyFortune(astrologyData);
        
        // Generate PDF (placeholder URL for now)
        const pdfUrl = await generatePDF(weeklyFortune, 'weekly-fortune');
        
        res.status(200).json({
            content: weeklyFortune,
            pdfUrl: pdfUrl
        });
    } catch (error) {
        console.error('Error in weekly fortune API:', error);
        res.status(500).json({ error: 'Failed to generate weekly fortune' });
    }
}

async function getWeeklyFortune(astrologyData) {
    try {
        const today = new Date();
        const days = [];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push({
                date: date.toLocaleDateString('zh-CN'),
                dayName: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
            });
        }
        
        const prompt = `Please provide detailed fortune predictions for the next 7 days for ${astrologyData.name}.
        
        Basic Information:
        - Name: ${astrologyData.name}
        - Chinese Zodiac: ${astrologyData.zodiacAnimal}
        - Element: ${astrologyData.element}
        - Birth Hour: ${astrologyData.birthHour}
        - Birth Place: ${astrologyData.birthCity}
        
        Please provide daily fortune for the following dates:
        ${days.map(day => `${day.date} (${day.dayName})`).join('\n        ')}
        
        Each daily fortune should include:
        1. Overall fortune rating (1-10 points)
        2. Career and work fortune
        3. Wealth and financial analysis
        4. Love and relationship fortune
        5. Health fortune
        6. Lucky colors and numbers
        7. Precautions and recommendations
        
        Please analyze in professional and detailed language, keeping each daily fortune between 300-500 words in English.`;

        const response = await axios.post(
            process.env.TENCENT_YUANBAO_API_URL || 'https://api.hunyuan.cloud.tencent.com/v1/chat/completions',
            {
                model: process.env.DEEPSEEK_MODEL || 'hunyuan-lite',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional Chinese traditional astrology master, proficient in BaZi (Four Pillars of Destiny), Five Elements theory, and daily fortune prediction. Please provide detailed daily fortune analysis in English with professional and accurate language.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: parseInt(process.env.MAX_TOKENS) || 4000,
                temperature: parseFloat(process.env.TEMPERATURE) || 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TENCENT_YUANBAO_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling Tencent Yuanbao API:', error);
        // Fallback to sample content if API fails
        return getFallbackWeeklyFortune(astrologyData);
    }
}

function getFallbackWeeklyFortune(astrologyData) {
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push({
            date: date.toLocaleDateString('zh-CN'),
            dayName: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
        });
    }
    
    const prompt = `请为${astrologyData.name}提供未来7天的详细运势预测。
    
    基本信息：
    - 姓名：${astrologyData.name}
    - 生肖：${astrologyData.zodiacAnimal}
    - 五行：${astrologyData.element}
    - 出生时辰：${astrologyData.birthHour}
    - 出生地点：${astrologyData.birthCity}
    
    请为每一天提供详细的运势分析，包括：
    1. 整体运势
    2. 事业工作
    3. 财运状况
    4. 感情关系
    5. 健康状况
    6. 幸运色彩
    7. 幸运数字
    8. 注意事项
    9. 开运建议
    
    请结合当前的流年大运，给出专业而实用的建议。`;
    
    // TODO: Replace with actual Tencent Yuanbao API call
    // const response = await callTencentYuanbaoAPI(prompt);
    
    // Sample weekly fortune for now
    return `
        <div class="weekly-overview">
            <h4>📅 本周运势总览</h4>
            <p><strong>${astrologyData.name}</strong>，根据您的生辰八字和当前流年大运分析，未来7天您的整体运势呈现稳中有升的趋势。作为${astrologyData.zodiacAnimal}年出生，${astrologyData.element}五行的您，本周将迎来一些积极的变化和机遇。</p>
            
            <div class="week-highlights">
                <p><strong>🌟 本周亮点：</strong>事业方面有新的发展机会，人际关系和谐</p>
                <p><strong>⚠️ 注意事项：</strong>注意健康管理，避免过度劳累</p>
                <p><strong>🍀 开运建议：</strong>多穿${astrologyData.element}系颜色的衣物，有助提升运势</p>
            </div>
        </div>
        
        <div class="daily-fortune">
            ${days.map((day, index) => `
                <div class="day-card">
                    <h5>📆 ${day.date} (${day.dayName})</h5>
                    
                    <div class="fortune-aspects">
                        <div class="aspect">
                            <strong>🌈 整体运势：</strong>
                            <span class="rating">${getRandomRating()}</span>
                            <p>${getDailyOverallFortune(astrologyData, index)}</p>
                        </div>
                        
                        <div class="aspect">
                            <strong>💼 事业工作：</strong>
                            <span class="rating">${getRandomRating()}</span>
                            <p>${getDailyCareerFortune(astrologyData, index)}</p>
                        </div>
                        
                        <div class="aspect">
                            <strong>💰 财运状况：</strong>
                            <span class="rating">${getRandomRating()}</span>
                            <p>${getDailyWealthFortune(astrologyData, index)}</p>
                        </div>
                        
                        <div class="aspect">
                            <strong>💕 感情关系：</strong>
                            <span class="rating">${getRandomRating()}</span>
                            <p>${getDailyLoveFortune(astrologyData, index)}</p>
                        </div>
                        
                        <div class="aspect">
                            <strong>🏥 健康状况：</strong>
                            <span class="rating">${getRandomRating()}</span>
                            <p>${getDailyHealthFortune(astrologyData, index)}</p>
                        </div>
                        
                        <div class="lucky-elements">
                            <p><strong>🎨 幸运色彩：</strong>${getLuckyColor(index)}</p>
                            <p><strong>🔢 幸运数字：</strong>${getLuckyNumber(index)}</p>
                        </div>
                        
                        <div class="daily-advice">
                            <p><strong>💡 今日建议：</strong>${getDailyAdvice(astrologyData, index)}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="weekly-summary">
            <h4>📋 本周总结与建议</h4>
            <div class="summary-points">
                <h5>🎯 重点关注日期</h5>
                <ul>
                    <li><strong>${days[2].date}：</strong>事业发展的关键日，适合重要决策</li>
                    <li><strong>${days[4].date}：</strong>财运较佳，可考虑投资理财</li>
                    <li><strong>${days[6].date}：</strong>感情运势上升，适合约会或表白</li>
                </ul>
                
                <h5>⚡ 本周开运法</h5>
                <ul>
                    <li>每天早晨面向东方深呼吸3分钟，吸收朝阳之气</li>
                    <li>在办公桌或家中摆放与您五行${astrologyData.element}相配的物品</li>
                    <li>多与属相相合的朋友交流，增强人际运势</li>
                    <li>保持积极心态，多做善事积累福报</li>
                </ul>
                
                <h5>🚫 本周忌讳</h5>
                <ul>
                    <li>避免在${days[1].date}进行重大投资决策</li>
                    <li>${days[3].date}不宜与人发生争执，保持和谐</li>
                    <li>本周尽量避免熬夜，保证充足睡眠</li>
                </ul>
            </div>
            
            <div class="final-blessing">
                <p><strong>🙏 祝福语：</strong></p>
                <p>${astrologyData.name}，愿您在这一周中把握机遇，化解挑战，让生活更加美好。记住，运势只是参考，您的努力和智慧才是成功的关键。保持信心，积极向前，好运自然相随！</p>
            </div>
        </div>
    `;
}

function getRandomRating() {
    const ratings = ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
    return ratings[Math.floor(Math.random() * ratings.length)];
}

function getDailyOverallFortune(astrologyData, dayIndex) {
    const fortunes = [
        `${astrologyData.name}，今天整体运势平稳，适合处理日常事务，保持平常心。`,
        `运势逐渐上升，${astrologyData.zodiacAnimal}的特质今天会为您带来好运。`,
        `今天是本周的转折点，您的${astrologyData.element}能量特别活跃，把握机会。`,
        `运势稳中有进，适合推进重要计划，您的努力会得到回报。`,
        `今天运势较为旺盛，各方面都有不错的表现，保持积极态度。`,
        `运势达到本周高峰，是实现目标的好时机，大胆行动吧。`,
        `本周收官之日，适合总结反思，为下周做好准备。`
    ];
    return fortunes[dayIndex];
}

function getDailyCareerFortune(astrologyData, dayIndex) {
    const fortunes = [
        `工作方面保持稳定，专注于手头任务，避免分心。`,
        `有机会展示您的专业能力，同事关系和谐，合作顺利。`,
        `今天适合提出新想法或方案，领导会认真考虑您的建议。`,
        `工作效率较高，可以处理一些积压的事务，进展顺利。`,
        `事业运势上升，可能有新的合作机会或项目邀请。`,
        `今天是事业发展的关键日，重要会议或决策都会有好结果。`,
        `适合整理工作思路，规划下周的工作重点。`
    ];
    return fortunes[dayIndex];
}

function getDailyWealthFortune(astrologyData, dayIndex) {
    const fortunes = [
        `财运平稳，适合理性消费，避免冲动购买。`,
        `有小额收入的可能，也适合进行保守型投资。`,
        `财运开始好转，可以关注一些投资机会，但要谨慎。`,
        `今天财运不错，之前的投资可能有回报，适合理财规划。`,
        `财运较旺，有意外收入的可能，也适合谈论薪资待遇。`,
        `本周财运最佳的一天，投资理财都有不错的机会。`,
        `适合整理财务状况，制定下周的理财计划。`
    ];
    return fortunes[dayIndex];
}

function getDailyLoveFortune(astrologyData, dayIndex) {
    const fortunes = [
        `感情运势平稳，与伴侣保持良好沟通，单身者保持开放心态。`,
        `桃花运开始显现，单身者有机会遇到心仪对象。`,
        `感情运势上升，适合表达心意或加深关系。`,
        `与伴侣关系和谐，单身者可以主动参加社交活动。`,
        `感情运势较旺，有浪漫的邂逅或甜蜜的约会。`,
        `本周感情运势最佳，适合求婚、表白或确定关系。`,
        `适合与伴侣规划未来，单身者反思感情需求。`
    ];
    return fortunes[dayIndex];
}

function getDailyHealthFortune(astrologyData, dayIndex) {
    const fortunes = [
        `健康状况良好，注意规律作息，适量运动。`,
        `精神状态不错，可以进行一些户外活动，呼吸新鲜空气。`,
        `注意饮食健康，多吃蔬菜水果，少吃油腻食物。`,
        `身体状况稳定，适合进行体检或健康咨询。`,
        `精力充沛，可以进行较强度的运动或健身。`,
        `健康运势最佳，身心都处于良好状态。`,
        `适合放松休息，为下周积蓄能量。`
    ];
    return fortunes[dayIndex];
}

function getLuckyColor(dayIndex) {
    const colors = ['红色', '橙色', '黄色', '绿色', '蓝色', '紫色', '白色'];
    return colors[dayIndex];
}

function getLuckyNumber(dayIndex) {
    const numbers = ['3, 8', '1, 6', '2, 7', '4, 9', '5, 0', '1, 8', '3, 6'];
    return numbers[dayIndex];
}

function getDailyAdvice(astrologyData, dayIndex) {
    const advice = [
        `保持内心平静，专注当下，一步一个脚印地前进。`,
        `主动与他人交流，您的${astrologyData.zodiacAnimal}魅力会吸引贵人。`,
        `相信自己的直觉，在重要决策时听从内心的声音。`,
        `今天适合学习新知识或技能，投资自己永远不会错。`,
        `保持乐观积极的心态，您的正能量会感染周围的人。`,
        `抓住今天的机遇，勇敢地迈出重要的一步。`,
        `总结本周的得失，为未来制定更好的计划。`
    ];
    return advice[dayIndex];
}

async function generatePDF(content, type) {
    try {
        const puppeteer = await import('puppeteer');
        
        // Create HTML template for PDF
        const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>七天运势预测报告</title>
            <style>
                body {
                    font-family: 'Microsoft YaHei', 'SimHei', sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background: #fff;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #4a90e2;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #4a90e2;
                    font-size: 28px;
                    margin: 0;
                }
                .header p {
                    color: #666;
                    font-size: 14px;
                    margin: 10px 0 0 0;
                }
                .daily-fortune {
                    margin-bottom: 25px;
                    padding: 15px;
                    border-left: 4px solid #4a90e2;
                    background: #f8fbff;
                    border-radius: 0 8px 8px 0;
                }
                .daily-fortune h4 {
                    color: #4a90e2;
                    font-size: 18px;
                    margin: 0 0 10px 0;
                    display: flex;
                    align-items: center;
                }
                .fortune-score {
                    background: #4a90e2;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    margin-left: 10px;
                }
                .fortune-item {
                    margin-bottom: 8px;
                    padding: 5px 0;
                }
                .fortune-item strong {
                    color: #2c3e50;
                }
                .summary-section {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 30px;
                }
                .summary-section h4 {
                    color: white;
                    text-align: center;
                    margin-bottom: 15px;
                }
                .footer {
                    text-align: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    color: #666;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>七天运势预测报告</h1>
                <p>生成时间：${new Date().toLocaleString('zh-CN')}</p>
            </div>
            ${content}
            <div class="footer">
                <p>本报告由AI智能生成，仅供参考娱乐。您的命运掌握在自己手中。</p>
            </div>
        </body>
        </html>
        `;

        // Launch puppeteer browser
        const browser = await puppeteer.default.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
        
        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '15mm',
                bottom: '20mm',
                left: '15mm'
            }
        });
        
        await browser.close();
        
        // Save PDF to public directory
        const fileName = `${type}-${Date.now()}.pdf`;
        const publicDir = path.join(process.cwd(), 'public', 'pdf');
        
        // Ensure pdf directory exists
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }
        
        const filePath = path.join(publicDir, fileName);
        fs.writeFileSync(filePath, pdfBuffer);
        
        return `/pdf/${fileName}`;
    } catch (error) {
        console.error('Error generating PDF:', error);
        // Return a placeholder URL if PDF generation fails
        return `/pdf/${type}-${Date.now()}.pdf`;
    }
}