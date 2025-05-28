# 🔮 Fortune Teller - Chinese Astrology Reading

A modern web application that provides Chinese astrology fortune readings based on birth information (生辰八字). The application uses AI-powered analysis through Tencent Yuanbao's DeepSeek model to generate personalized fortune readings.

## ✨ Features

- **Interactive Web Interface**: Clean, modern UI for entering birth information
- **Chinese Astrology Calculation**: Automatic calculation of zodiac animals, elements, and birth hours
- **AI-Powered Readings**: Integration with Tencent Yuanbao DeepSeek model for detailed fortune analysis
- **Comprehensive Fortune Areas**: 
  - General personality and fortune
  - Career and finance prospects
  - Love and relationships
  - Health and wellness
  - Lucky elements and guidance
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **GitHub Pages Ready**: Easy deployment to GitHub Pages

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Tencent Yuanbao API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fortune-teller.git
   cd fortune-teller
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Tencent Yuanbao API key:
   ```
   TENCENT_YUANBAO_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌐 Deployment

### GitHub Pages (Frontend Only)

For a static version without AI integration:

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/fortune-teller`

### Full Stack Deployment

For the complete application with AI integration, deploy to platforms like:

- **Heroku**
- **Vercel**
- **Railway**
- **DigitalOcean App Platform**

## 🔧 Configuration

### API Integration

To use the Tencent Yuanbao DeepSeek model:

1. Sign up for Tencent Yuanbao service
2. Obtain your API key
3. Update the `.env` file with your credentials
4. Modify `api.js` if needed for your specific API endpoint

### Customization

- **Styling**: Edit `styles.css` to customize the appearance
- **Fortune Logic**: Modify `script.js` for frontend behavior
- **AI Prompts**: Update `api.js` to customize the AI prompts
- **Languages**: Add translations for multi-language support

## 📁 Project Structure

```
fortune-teller/
├── index.html          # Main HTML page
├── styles.css          # CSS styling
├── script.js           # Frontend JavaScript
├── api.js              # Backend API server
├── package.json        # Node.js dependencies
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🎯 How It Works

1. **User Input**: Users enter their birth date, time, city, and gender
2. **Astrology Calculation**: The system calculates Chinese zodiac animal, element, and birth hour
3. **AI Analysis**: Birth information is sent to Tencent Yuanbao DeepSeek model
4. **Fortune Generation**: AI generates personalized readings for different life aspects
5. **Result Display**: Formatted fortune reading is displayed to the user

## 🔮 Chinese Astrology Elements

### Zodiac Animals (12-year cycle)
- Rat, Ox, Tiger, Rabbit, Dragon, Snake
- Horse, Goat, Monkey, Rooster, Dog, Pig

### Five Elements (5-element cycle)
- Wood (木), Fire (火), Earth (土), Metal (金), Water (水)

### Birth Hours (12 double-hour periods)
- Each 2-hour period corresponds to a zodiac animal

## 🛡️ Security & Privacy

- API keys are stored securely in environment variables
- User birth information is not stored permanently
- All communications use HTTPS in production
- No personal data is logged or tracked

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Tencent Yuanbao for AI model access
- Traditional Chinese astrology masters for wisdom
- Open source community for tools and libraries

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/fortune-teller/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your setup and the issue

## 🔄 Updates

- **v1.0.0**: Initial release with basic fortune telling functionality
- Check [Releases](https://github.com/yourusername/fortune-teller/releases) for latest updates

---

**Disclaimer**: This application is for entertainment purposes only. Fortune readings should not be used as the sole basis for important life decisions.