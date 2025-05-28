// Vercel Serverless Function for Detailed Ba Zi Reading
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
        
        // Call Tencent Yuanbao DeepSeek API for detailed reading
        const detailedReading = await getDetailedBaZiReading(astrologyData);
        
        // Generate PDF (placeholder URL for now)
        const pdfUrl = await generatePDF(detailedReading, 'detailed-bazi');
        
        res.status(200).json({
            content: detailedReading,
            pdfUrl: pdfUrl
        });
    } catch (error) {
        console.error('Error in detailed reading API:', error);
        res.status(500).json({ error: 'Failed to generate detailed reading' });
    }
}

async function getDetailedBaZiReading(astrologyData) {
    try {
        const prompt = `Please provide a detailed BaZi (Four Pillars of Destiny) reading report for ${astrologyData.name}.
    
    Basic Information:
    - Name: ${astrologyData.name}
    - Chinese Zodiac: ${astrologyData.zodiacAnimal}
    - Element: ${astrologyData.element}
    - Birth Hour: ${astrologyData.birthHour}
    - Birth Place: ${astrologyData.birthPlace}
    
    Please provide detailed Four Pillars analysis including:
    1. Detailed interpretation of Year, Month, Day, and Hour Pillars
    2. Five Elements balance analysis
    3. Ten Gods relationship analysis
    4. Major luck periods and annual fortune analysis
    5. In-depth personality traits reading
    6. Career development recommendations
    7. Love and marriage analysis
    8. Health and wellness suggestions
    9. Wealth and financial fortune analysis
    10. Life stage predictions
    
    Please analyze in professional and detailed language, keeping the content between 2000-3000 words in English.`;

        const response = await axios.post(
            process.env.TENCENT_YUANBAO_API_URL || 'https://api.hunyuan.cloud.tencent.com/v1/chat/completions',
            {
                model: process.env.DEEPSEEK_MODEL || 'hunyuan-lite',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional Chinese traditional astrology master, proficient in BaZi (Four Pillars of Destiny), Five Elements theory, and traditional divination. Please provide detailed BaZi readings in English with professional and accurate language.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: parseInt(process.env.MAX_TOKENS) || 3000,
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
        return getFallbackDetailedReading(astrologyData);
    }
}

function getFallbackDetailedReading(astrologyData) {
    const prompt = `请为${astrologyData.name}提供详细的生辰八字解读报告。
    
    基本信息：
    - 姓名：${astrologyData.name}
    - 生肖：${astrologyData.zodiacAnimal}
    - 五行：${astrologyData.element}
    - 出生时辰：${astrologyData.birthHour}
    - 出生地点：${astrologyData.birthPlace}
    
    请提供详细的四柱八字分析，包括：
    1. 年柱、月柱、日柱、时柱的详细解析
    2. 五行平衡分析
    3. 十神关系分析
    4. 大运流年分析
    5. 性格特征深度解读
    6. 事业发展建议
    7. 感情婚姻分析
    8. 健康养生建议
    9. 财运分析
    10. 人生重要阶段预测`;
    
    // TODO: Replace with actual Tencent Yuanbao API call
    // const response = await callTencentYuanbaoAPI(prompt);
    
    // Sample detailed reading for now
    return `
        <div class="detailed-section">
            <h4>📊 四柱八字详细分析</h4>
            <p><strong>${astrologyData.name}</strong>，根据您的出生信息，您的四柱八字蕴含着丰富的命理信息。</p>
            
            <h5>🏛️ 年柱分析（祖上根基）</h5>
            <p>您的年柱显示了家族传承的特质。作为${astrologyData.zodiacAnimal}年出生，您天生具有该生肖的核心特征，这影响着您的人生基调和性格底色。</p>
            
            <h5>🌙 月柱分析（父母宫位）</h5>
            <p>月柱反映了您与父母的关系以及青年时期的运势。${astrologyData.element}元素在此位置，表明您在成长过程中会受到相应五行能量的滋养。</p>
            
            <h5>☀️ 日柱分析（自身本命）</h5>
            <p>日柱是您的本命核心，代表您的真实性格和内在品质。结合您的出生时辰${astrologyData.birthHour}，可以看出您具有独特的个性魅力。</p>
            
            <h5>⏰ 时柱分析（子女后代）</h5>
            <p>时柱关系到您的晚年运势和子女缘分。您的时柱配置显示了未来发展的潜力和方向。</p>
        </div>
        
        <div class="detailed-section">
            <h4>⚖️ 五行平衡深度分析</h4>
            <p>您的五行配置中，${astrologyData.element}元素较为突出。这种配置带来以下特点：</p>
            <ul>
                <li><strong>优势：</strong>在相关领域具有天赋和敏锐度</li>
                <li><strong>需要平衡：</strong>建议在日常生活中多接触互补的五行元素</li>
                <li><strong>发展建议：</strong>选择与您五行相合的行业和方向</li>
            </ul>
        </div>
        
        <div class="detailed-section">
            <h4>🎭 十神关系详解</h4>
            <p>根据您的八字配置，十神关系显示了您在人际交往和社会角色中的特点：</p>
            <ul>
                <li><strong>正官偏官：</strong>权威感和责任心的体现</li>
                <li><strong>正财偏财：</strong>财富观念和理财能力</li>
                <li><strong>食神伤官：</strong>创造力和表达能力</li>
                <li><strong>正印偏印：</strong>学习能力和智慧来源</li>
                <li><strong>比肩劫财：</strong>竞争意识和合作精神</li>
            </ul>
        </div>
        
        <div class="detailed-section">
            <h4>🌊 大运流年预测</h4>
            <p><strong>${astrologyData.name}</strong>，您的人生大运呈现以下特点：</p>
            <ul>
                <li><strong>青年期（20-30岁）：</strong>学习成长，建立基础的重要时期</li>
                <li><strong>壮年期（30-50岁）：</strong>事业发展的黄金时期，需要把握机遇</li>
                <li><strong>中年期（50-65岁）：</strong>收获期，注意健康和家庭和谐</li>
                <li><strong>晚年期（65岁以后）：</strong>享受人生，传承智慧的阶段</li>
            </ul>
        </div>
        
        <div class="detailed-section">
            <h4>💼 事业发展深度建议</h4>
            <p>基于您的八字分析，以下行业和发展方向特别适合您：</p>
            <ul>
                <li>与${astrologyData.element}元素相关的行业</li>
                <li>发挥您${astrologyData.zodiacAnimal}特质的领域</li>
                <li>需要在${astrologyData.birthPlace}或类似环境发展的机会</li>
            </ul>
            <p><strong>职业发展建议：</strong>充分发挥您的天赋，同时注意弥补五行不足，寻求平衡发展。</p>
        </div>
        
        <div class="detailed-section">
            <h4>💕 感情婚姻深度分析</h4>
            <p>您的八字显示在感情方面具有以下特点：</p>
            <ul>
                <li><strong>感情模式：</strong>真诚专一，重视精神契合</li>
                <li><strong>理想伴侣：</strong>寻找能够互补五行的另一半</li>
                <li><strong>婚姻时机：</strong>注意大运流年的有利时期</li>
                <li><strong>相处建议：</strong>保持沟通，尊重差异，共同成长</li>
            </ul>
        </div>
        
        <div class="detailed-section">
            <h4>🏥 健康养生指导</h4>
            <p>根据您的五行配置，需要特别注意以下健康方面：</p>
            <ul>
                <li><strong>体质特点：</strong>${astrologyData.element}型体质的养护要点</li>
                <li><strong>易患疾病：</strong>预防相关脏腑的问题</li>
                <li><strong>养生建议：</strong>适合的运动方式和饮食调理</li>
                <li><strong>最佳作息：</strong>结合您的出生时辰${astrologyData.birthHour}制定</li>
            </ul>
        </div>
        
        <div class="detailed-section">
            <h4>💰 财运深度解析</h4>
            <p><strong>${astrologyData.name}</strong>，您的财运特点如下：</p>
            <ul>
                <li><strong>财运类型：</strong>正财为主还是偏财机会较多</li>
                <li><strong>理财建议：</strong>适合的投资方式和风险控制</li>
                <li><strong>财富积累：</strong>最佳的财富增长策略</li>
                <li><strong>注意事项：</strong>避免的财务陷阱和风险</li>
            </ul>
        </div>
        
        <div class="detailed-section">
            <h4>🎯 人生重要节点预测</h4>
            <p>根据您的八字和大运分析，以下是人生的重要转折点：</p>
            <ul>
                <li><strong>学业关键期：</strong>把握教育和技能提升的最佳时机</li>
                <li><strong>事业突破期：</strong>职业发展的重要机遇窗口</li>
                <li><strong>感情收获期：</strong>遇到真爱和建立家庭的有利时段</li>
                <li><strong>财富积累期：</strong>财运亨通的黄金时期</li>
                <li><strong>健康关注期：</strong>需要特别注意身体保养的阶段</li>
            </ul>
        </div>
        
        <div class="summary-section">
            <h4>🌟 总结与建议</h4>
            <p><strong>${astrologyData.name}</strong>，您的八字显示了独特的人生轨迹和发展潜力。建议您：</p>
            <ol>
                <li>充分发挥自身优势，同时注意平衡发展</li>
                <li>在重要决策时参考大运流年的影响</li>
                <li>保持积极心态，主动创造有利条件</li>
                <li>注重身心健康，为长远发展打好基础</li>
                <li>珍惜人际关系，寻求互利共赢</li>
            </ol>
            <p>记住，命理只是参考，您的努力和选择才是决定人生的关键因素。愿您前程似锦，幸福安康！</p>
        </div>
    `;
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
            <title>八字详细解读报告</title>
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
                    border-bottom: 3px solid #d4af37;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #d4af37;
                    font-size: 28px;
                    margin: 0;
                }
                .header p {
                    color: #666;
                    font-size: 14px;
                    margin: 10px 0 0 0;
                }
                .detailed-section {
                    margin-bottom: 25px;
                    padding: 15px;
                    border-left: 4px solid #d4af37;
                    background: #fafafa;
                }
                .detailed-section h4 {
                    color: #d4af37;
                    font-size: 18px;
                    margin: 0 0 10px 0;
                }
                .summary-section {
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 30px;
                }
                .summary-section h4 {
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 15px;
                }
                ul, ol {
                    padding-left: 20px;
                }
                li {
                    margin-bottom: 5px;
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
                <h1>八字详细解读报告</h1>
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