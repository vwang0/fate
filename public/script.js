class FortuneTeller {
    constructor() {
        this.form = document.getElementById('fortuneForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.resultDiv = document.getElementById('result');
        this.fortuneContent = document.getElementById('fortuneContent');
        this.newReadingBtn = document.getElementById('newReading');
        this.formContainer = document.querySelector('.form-container');
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.newReadingBtn.addEventListener('click', () => this.resetForm());
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const birthData = {
            name: formData.get('name'),
            birthDate: formData.get('birthDate'),
            birthTime: formData.get('birthTime'),
            birthCity: formData.get('birthCity'),
            gender: formData.get('gender')
        };

        // Validate form data
        if (!this.validateForm(birthData)) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Calculate Chinese astrology data
            const astrologyData = this.calculateChineseAstrology(birthData);
            
            // Call fortune telling API
            const fortune = await this.getFortune(astrologyData);
            
            // Display result
            this.displayResult(fortune);
        } catch (error) {
            console.error('Error getting fortune:', error);
            this.showError('Sorry, there was an error getting your fortune reading. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm(data) {
        const errors = [];
        
        if (!data.name) errors.push('Name is required');
        if (!data.birthDate) errors.push('Birth date is required');
        if (!data.birthTime) errors.push('Birth time is required');
        if (!data.birthCity) errors.push('Birth city is required');
        if (!data.gender) errors.push('Gender is required');
        
        if (errors.length > 0) {
            this.showError(errors.join(', '));
            return false;
        }
        
        return true;
    }

    calculateChineseAstrology(birthData) {
        const birthDateTime = new Date(`${birthData.birthDate}T${birthData.birthTime}`);
        
        // Chinese zodiac animals (12-year cycle)
        const zodiacAnimals = [
            'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
            'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
        ];
        
        // Five elements (5-year cycle)
        const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
        
        // Calculate zodiac animal (based on year)
        const year = birthDateTime.getFullYear();
        const zodiacIndex = (year - 1900) % 12;
        const zodiacAnimal = zodiacAnimals[zodiacIndex];
        
        // Calculate element (simplified calculation)
        const elementIndex = Math.floor((year - 1900) / 2) % 5;
        const element = elements[elementIndex];
        
        // Calculate birth hour (Chinese double hours)
        const hour = birthDateTime.getHours();
        const chineseHours = [
            'Rat (11pm-1am)', 'Ox (1am-3am)', 'Tiger (3am-5am)', 'Rabbit (5am-7am)',
            'Dragon (7am-9am)', 'Snake (9am-11am)', 'Horse (11am-1pm)', 'Goat (1pm-3pm)',
            'Monkey (3pm-5pm)', 'Rooster (5pm-7pm)', 'Dog (7pm-9pm)', 'Pig (9pm-11pm)'
        ];
        const hourIndex = Math.floor((hour + 1) / 2) % 12;
        const birthHour = chineseHours[hourIndex];
        
        return {
            name: birthData.name,
            year,
            zodiacAnimal,
            element,
            birthHour,
            birthCity: birthData.birthCity,
            gender: birthData.gender,
            birthDate: birthData.birthDate,
            birthTime: birthData.birthTime
        };
    }

    async getFortune(astrologyData) {
        try {
            // Call the Vercel API endpoint
            const response = await fetch('/api/fortune', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(astrologyData)
            });
            
            if (!response.ok) {
                throw new Error(`API call failed: ${response.status}`);
            }
            
            const result = await response.json();
            return result.fortune || this.generateSampleFortune(astrologyData);
        } catch (error) {
            console.error('API call failed, using sample fortune:', error);
            // Fallback to sample fortune if API fails
            await this.delay(1000); // Brief delay for UX
            return this.generateSampleFortune(astrologyData);
        }
    }

    generateSampleFortune(data) {
        const fortunes = {
            general: [
                `As a ${data.element} ${data.zodiacAnimal}, you possess unique qualities that shape your destiny.`,
                `Born in ${data.birthCity}, your connection to this place influences your life path.`,
                `Your birth during the ${data.birthHour} hour adds special significance to your character.`
            ],
            career: [
                `Your ${data.element} nature brings stability and growth to your professional life.`,
                `The ${data.zodiacAnimal} energy suggests leadership opportunities ahead.`,
                `This year holds promising developments in your career sector.`
            ],
            love: [
                `In matters of the heart, your ${data.zodiacAnimal} traits attract genuine connections.`,
                `The ${data.element} element enhances your romantic compatibility.`,
                `Your birth time suggests harmonious relationships in the coming months.`
            ],
            health: [
                `Your ${data.element} constitution supports overall well-being.`,
                `The ${data.zodiacAnimal} energy encourages active lifestyle choices.`,
                `Pay attention to balance in all aspects of your health journey.`
            ]
        };

        return {
            general: this.getRandomItem(fortunes.general),
            career: this.getRandomItem(fortunes.career),
            love: this.getRandomItem(fortunes.love),
            health: this.getRandomItem(fortunes.health),
            astrologyData: data
        };
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    displayResult(fortune) {
        const { astrologyData } = fortune;
        
        this.fortuneContent.innerHTML = `
            <div class="personal-greeting">
                <h3>🌟 Hello, ${astrologyData.name}!</h3>
                <p>Here is your personalized Chinese astrology reading:</p>
            </div>
            
            <div class="astrology-info">
                <h3>🌟 Your Chinese Astrology Profile</h3>
                <p><strong>Zodiac Animal:</strong> ${astrologyData.zodiacAnimal}</p>
                <p><strong>Element:</strong> ${astrologyData.element}</p>
                <p><strong>Birth Hour:</strong> ${astrologyData.birthHour}</p>
                <p><strong>Birth Location:</strong> ${astrologyData.birthCity}</p>
            </div>
            
            <div class="fortune-sections">
                <h3>🔮 Your Fortune Reading</h3>
                
                <div class="fortune-section">
                    <h4>✨ General Fortune</h4>
                    <p>${fortune.general}</p>
                </div>
                
                <div class="fortune-section">
                    <h4>💼 Career & Finance</h4>
                    <p>${fortune.career}</p>
                </div>
                
                <div class="fortune-section">
                    <h4>💕 Love & Relationships</h4>
                    <p>${fortune.love}</p>
                </div>
                
                <div class="fortune-section">
                    <h4>🌿 Health & Wellness</h4>
                    <p>${fortune.health}</p>
                </div>
            </div>
            
            <div class="disclaimer">

            </div>
        `;
        
        this.formContainer.style.display = 'none';
        this.resultDiv.style.display = 'block';
    }

    resetForm() {
        this.form.reset();
        this.resultDiv.style.display = 'none';
        this.formContainer.style.display = 'block';
        this.clearError();
    }

    setLoadingState(loading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const loadingText = this.submitBtn.querySelector('.loading');
        
        if (loading) {
            btnText.style.display = 'none';
            loadingText.style.display = 'inline';
            this.submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            loadingText.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }

    showError(message) {
        this.clearError();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        this.form.insertBefore(errorDiv, this.form.firstChild);
    }

    clearError() {
        const existingError = this.form.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FortuneTeller();
});