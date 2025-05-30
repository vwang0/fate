class FortuneTeller {
    constructor() {
        this.form = document.getElementById('fortuneForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.resultDiv = document.getElementById('result');
        this.fortuneContent = document.getElementById('fortuneContent');
        this.detailedReadingBtn = document.getElementById('detailedReadingBtn');
        this.weeklyFortuneBtn = document.getElementById('weeklyFortuneBtn');
        this.formContainer = document.querySelector('.form-container');
        this.birthDateInput = document.getElementById('birthDate');
        this.birthDateSuggestions = document.getElementById('birthDateSuggestions');
        
        this.initEventListeners();
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    initEventListeners() {
        console.log('Initializing event listeners');
        console.log('detailedReadingBtn:', this.detailedReadingBtn);
        console.log('weeklyFortuneBtn:', this.weeklyFortuneBtn);
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        if (this.detailedReadingBtn) {
            this.detailedReadingBtn.addEventListener('click', () => {
                console.log('Detailed reading button clicked');
                this.getDetailedReading();
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    });
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } else {
            console.error('detailedReadingBtn not found');
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
        
        if (this.weeklyFortuneBtn) {
            this.weeklyFortuneBtn.addEventListener('click', () => {
                console.log('Weekly fortune button clicked');
                this.getWeeklyFortune();
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    });
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } else {
            console.error('weeklyFortuneBtn not found');
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
        
        // Birth date input event listeners
        if (this.birthDateInput) {
            this.birthDateInput.addEventListener('input', (e) => this.handleBirthDateInput(e));
            this.birthDateInput.addEventListener('blur', () => {
                setTimeout(() => this.hideDateSuggestions(), 200);
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    });
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        
        // Process name: if contains space, take the part before the first space
        const rawName = formData.get('name');
        const processedName = rawName.includes(' ') ? rawName.split(' ')[0] : rawName;
        
        const birthData = {
            name: processedName,
            birthDate: formData.get('birthDate'),
            birthTime: formData.get('birthTime'),
            birthPlace: formData.get('birthPlace'),
            gender: formData.get('gender')
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

        // Validate form data
        if (!this.validateForm(birthData)) {
            return;
        }
        
        // Store birth data in localStorage
        localStorage.setItem('birthData', JSON.stringify(birthData));
        
        // Show loading state
        const resultContainer = document.getElementById('result');
        if (resultContainer) {
            resultContainer.style.display = 'block';
            resultContainer.innerHTML = '<div class="loading">正在为您生成生辰八字测算结果...</div>';
        }
        
        // Scroll to result section
        if (resultContainer) {
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }
        
        try {
            // Call Tencent Yuanbao API for BaZi fortune telling
            const fortuneResult = await this.callBaZiFortuneAPI(birthData);
            
            // Display the English fortune result
            this.displayFortuneResult(fortuneResult);
            
            // Enable the fortune buttons
            if (this.detailedReadingBtn) {
                this.detailedReadingBtn.disabled = false;
            }
            if (this.weeklyFortuneBtn) {
                this.weeklyFortuneBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error generating BaZi fortune:', error);
            this.displayErrorResult();
        }
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
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
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } catch (error) {
            console.error('Error getting fortune:', error);
            this.showError('Sorry, there was an error getting your fortune reading. Please try again.');
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } finally {
            this.setLoadingState(false);
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    validateForm(data) {
        const errors = [];
        
        if (!data.name) errors.push('Name is required');
        if (!data.birthDate) {
            errors.push('Birth date is required');
        } else {
            const dateError = this.validateBirthDate(data.birthDate);
            if (dateError) {
                errors.push(dateError);
            }
        }
        
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return false;
        }
        
        return true;
    }
    
    validateBirthDate(birthDate) {
        // Support multiple formats: MMDDYYYY, MM-DD-YYYY, MM/DD/YYYY
        const formats = [
            /^(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(19|20)\d{2}$/,       // MMDDYYYY
            /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-(19|20)\d{2}$/,  // MM-DD-YYYY
            /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/   // MM/DD/YYYY
        ];
        
        let isValidFormat = false;
        let month, day, year;
        
        for (let format of formats) {
            const match = birthDate.match(format);
            if (match) {
                isValidFormat = true;
                month = parseInt(match[1]);
                day = parseInt(match[2]);
                year = parseInt(match[3]);
                break;
            }
        }
        
        if (!isValidFormat) {
            return 'Birth date must be in format MMDDYYYY, MM-DD-YYYY, or MM/DD/YYYY';
        }
        
        // Validate month
        if (month < 1 || month > 12) {
            return 'Invalid month. Please enter a month between 01 and 12.';
        }
        
        // Validate day
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        // Check for leap year
        if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))) {
            daysInMonth[1] = 29;
        }
        
        if (day < 1 || day > daysInMonth[month - 1]) {
            return `Invalid day for month ${month.toString().padStart(2, '0')}. Please enter a day between 01 and ${daysInMonth[month - 1].toString().padStart(2, '0')}.`;
        }
        
        // Check if date is not in the future
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (inputDate > today) {
            return 'Birth date cannot be in the future.';
        }
        
        return null; // Valid date
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } else {
            // Parse birth date - support multiple formats
            let month, day, year;
            const cleanDate = data.birthDate.trim();
            
            // Format 1: MM-DD-YYYY or MM/DD/YYYY
            const dateWithSeparator = /^(0[1-9]|1[0-2])[-\/](0[1-9]|[12]\d|3[01])[-\/](1|2)\d{3}$/;
            // Format 2: MMDDYYYY (8 digits)
            const dateWithoutSeparator = /^(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(1|2)\d{3}$/;
            
            if (dateWithSeparator.test(cleanDate)) {
                // Parse with separator (- or /)
                const parts = cleanDate.split(/[-\/]/);
                month = parseInt(parts[0]);
                day = parseInt(parts[1]);
                year = parseInt(parts[2]);
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } else if (dateWithoutSeparator.test(cleanDate)) {
                // Parse without separator (MMDDYYYY)
                month = parseInt(cleanDate.substring(0, 2));
                day = parseInt(cleanDate.substring(2, 4));
                year = parseInt(cleanDate.substring(4, 8));
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } else {
                errors.push('Birth date must be in format MM-DD-YYYY, MM/DD/YYYY, or MMDDYYYY with valid month (01-12), day (01-31), and year (1000-2999)');
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
            
            // Validate parsed date if format is correct
            if (month && day && year) {
                const date = new Date(year, month - 1, day);
                if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
                    errors.push('Please enter a valid birth date');
                }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
                // Check if date is not in the future
                if (date > new Date()) {
                    errors.push('Birth date cannot be in the future');
                }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
        if (!data.birthTime) errors.push('Birth time is required');
        if (!data.birthPlace) errors.push('Birth place is required');
        if (!data.gender) errors.push('Gender is required');
        
        if (errors.length > 0) {
            this.showError(errors.join(', '));
            return false;
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
        
        return true;
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
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
            birthPlace: birthData.birthPlace,
            gender: birthData.gender,
            birthDate: birthData.birthDate,
            birthTime: birthData.birthTime
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    };
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    async getFortune(astrologyData) {
        try {
            // Call the Vercel API endpoint
            const response = await fetch('/api/fortune', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    },
                body: JSON.stringify(astrologyData)
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    });
            
            if (!response.ok) {
                throw new Error(`API call failed: ${response.status}`);
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
            
            const result = await response.json();
            return result.fortune || this.generateSampleFortune(astrologyData);
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } catch (error) {
            console.error('API call failed, using sample fortune:', error);
            // Fallback to sample fortune if API fails
            await this.delay(1000); // Brief delay for UX
            return this.generateSampleFortune(astrologyData);
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    generateSampleFortune(data) {
        const fortunes = {
            general: [
                `As a ${data.element} ${data.zodiacAnimal}, you possess unique qualities that shape your destiny.`,
                `Born in ${data.birthPlace}, your connection to this place influences your life path.`,
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
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    };

        return {
            general: this.getRandomItem(fortunes.general),
            career: this.getRandomItem(fortunes.career),
            love: this.getRandomItem(fortunes.love),
            health: this.getRandomItem(fortunes.health),
            astrologyData: data
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    };
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    displayResult(fortune) {
        const { astrologyData } = fortune;
        
        // Save current astrology data for detailed reading and weekly fortune
        this.currentAstrologyData = astrologyData;
        
        this.fortuneContent.innerHTML = `
            <div class="personal-greeting">
                <h3>🌟 Hello, ${astrologyData.name}!</h3>
            </div>
            
            <div class="astrology-info">
                <h3>🌟 Your Chinese Astrology Profile</h3>
                <p><strong>Zodiac Animal:</strong> ${astrologyData.zodiacAnimal}</p>
                <p><strong>Element:</strong> ${astrologyData.element}</p>
                <p><strong>Birth Hour:</strong> ${astrologyData.birthHour}</p>
                <p><strong>Birth Location:</strong> ${astrologyData.birthPlace}</p>
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
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    resetForm() {
        this.form.reset();
        this.resultDiv.style.display = 'none';
        this.formContainer.style.display = 'block';
        this.clearError();
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    setLoadingState(loading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const loadingText = this.submitBtn.querySelector('.loading');
        
        if (loading) {
            btnText.style.display = 'none';
            loadingText.style.display = 'inline';
            this.submitBtn.disabled = true;
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } else {
            btnText.style.display = 'inline';
            loadingText.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    showError(message) {
        this.clearError();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        this.form.insertBefore(errorDiv, this.form.firstChild);
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    clearError() {
        const existingError = this.form.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    async getDetailedReading() {
        console.log('getDetailedReading called');
        console.log('currentAstrologyData:', this.currentAstrologyData);
        
        try {
            this.setLoadingState(true);
            
            // Get current astrology data from the last reading
            if (!this.currentAstrologyData) {
                alert('Please get a fortune reading first.');
                this.showError('Please get a fortune reading first.');
                return;
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

            // Store astrology data in sessionStorage for the payment page
            sessionStorage.setItem('astrologyData', JSON.stringify(this.currentAstrologyData));
            sessionStorage.setItem('reportType', 'detailed');
            sessionStorage.setItem('userName', this.currentAstrologyData.name);
            
            // Redirect directly to payment page
            window.location.href = 'payment.html';
            
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } catch (error) {
            console.error('Error getting detailed reading:', error);
            this.showError('Sorry, there was an error getting your detailed reading. Please try again.');
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } finally {
            this.setLoadingState(false);
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    async getWeeklyFortune() {
        console.log('getWeeklyFortune called');
        console.log('currentAstrologyData:', this.currentAstrologyData);
        
        try {
            this.setLoadingState(true);
            
            // Get current astrology data from the last reading
            if (!this.currentAstrologyData) {
                alert('Please get a fortune reading first.');
                this.showError('Please get a fortune reading first.');
                return;
            }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

            // Store astrology data in sessionStorage for the payment page
            sessionStorage.setItem('astrologyData', JSON.stringify(this.currentAstrologyData));
            sessionStorage.setItem('reportType', 'weekly');
            sessionStorage.setItem('userName', this.currentAstrologyData.name);
            
            // Redirect directly to payment page
            window.location.href = 'payment.html';
            
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } catch (error) {
            console.error('Error getting weekly fortune:', error);
            this.showError('Sorry, there was an error getting your weekly fortune. Please try again.');
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    } finally {
            this.setLoadingState(false);
        }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    displayDetailedReading(reading) {
        this.fortuneContent.innerHTML = `
            <div class="pdf-download">
                <a href="${reading.pdfUrl}" download="detailed-bazi-reading.pdf" class="pdf-download-btn">
                    📄 Download PDF Report
                </a>
            </div>
            
            <div class="detailed-reading">
                <h3>🔮 ${data.name}'s Detailed Ba Zi Interpretation</h3>
                <div class="reading-content">
                    ${reading.content}
                </div>
            </div>
        `;
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }

    displayWeeklyFortune(fortune) {
        this.fortuneContent.innerHTML = `
            <div class="pdf-download">
                <a href="${fortune.pdfUrl}" download="weekly-fortune.pdf" class="pdf-download-btn">
                    📄 Download PDF Report
                </a>
            </div>
            
            <div class="weekly-fortune">
                <h3>🗓️ ${data.name}'s Next 7-Day Fortune</h3>
                <div class="fortune-content">
                    ${fortune.content}
                </div>
            </div>
        `;
    }
    
    handleBirthDateInput(e) {
        const input = e.target.value.trim();
        if (input.length >= 4 && input.length <= 8) {
            const suggestions = this.generateDateSuggestions(input);
            if (suggestions.length > 0) {
                this.showDateSuggestions(suggestions);
            } else {
                this.hideDateSuggestions();
            }
        } else {
            this.hideDateSuggestions();
        }
    }
    
    generateDateSuggestions(input) {
        const suggestions = [];
        const currentYear = new Date().getFullYear();
        
        // Remove any non-digit characters
        const digits = input.replace(/\D/g, '');
        
        if (digits.length < 4) return suggestions;
        
        // Try different interpretations based on input length
        if (digits.length === 4) {
            // MMDD format - add current year and previous years
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            
            for (let year = currentYear - 1; year >= currentYear - 80; year -= 10) {
                const dateStr = `${mm}${dd}${year}`;
                if (this.isValidDateFormat(dateStr)) {
                    suggestions.push({
                        value: dateStr,
                        display: `${mm}/${dd}/${year}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 5) {
            // Could be MDDYY or MMDD + Y
            // Try MDDYY format
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yy = digits.substring(3, 5);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
            
            // Also try MMDD + current decade
            const mm2 = digits.substring(0, 2);
            const dd2 = digits.substring(2, 4);
            const y = digits.substring(4, 5);
            
            for (let decade = 0; decade <= 9; decade++) {
                const fullYear = `19${decade}${y}`;
                const dateStr2 = `${mm2}${dd2}${fullYear}`;
                if (this.isValidDateFormat(dateStr2) && parseInt(fullYear) <= currentYear) {
                    suggestions.push({
                        value: dateStr2,
                        display: `${mm2}/${dd2}/${fullYear}`
                    });
                }
                if (suggestions.length >= 5) break;
            }
        } else if (digits.length === 6) {
            // Could be MMDDYY
            const mm = digits.substring(0, 2);
            const dd = digits.substring(2, 4);
            const yy = digits.substring(4, 6);
            
            // Assume 20xx for years 00-30, 19xx for years 31-99
            const year = parseInt(yy) <= 30 ? `20${yy}` : `19${yy}`;
            
            const dateStr = `${mm}${dd}${year}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${year}`
                });
            }
        } else if (digits.length === 7) {
            // Could be MDDYYYY or MMDDYYY
            // Try MDDYYYY
            const m = digits.substring(0, 1);
            const dd = digits.substring(1, 3);
            const yyyy = digits.substring(3, 7);
            const mm = m.padStart(2, '0');
            
            const dateStr = `${mm}${dd}${yyyy}`;
            if (this.isValidDateFormat(dateStr)) {
                suggestions.push({
                    value: dateStr,
                    display: `${mm}/${dd}/${yyyy}`
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }
    
    isValidDateFormat(dateStr) {
        if (dateStr.length !== 8) return false;
        
        const mm = parseInt(dateStr.substring(0, 2));
        const dd = parseInt(dateStr.substring(2, 4));
        const yyyy = parseInt(dateStr.substring(4, 8));
        
        // Basic validation
        if (mm < 1 || mm > 12) return false;
        if (dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false;
        
        // Check if date is valid
        const date = new Date(yyyy, mm - 1, dd);
        return date.getFullYear() === yyyy && 
               date.getMonth() === mm - 1 && 
               date.getDate() === dd;
    }
    
    showDateSuggestions(suggestions) {
        this.birthDateSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'date-suggestion-item';
            item.textContent = suggestion.display;
            item.addEventListener('click', () => {
                this.birthDateInput.value = suggestion.value;
                this.hideDateSuggestions();
            });
            this.birthDateSuggestions.appendChild(item);
        });
        
        this.birthDateSuggestions.style.display = 'block';
    }
    
    hideDateSuggestions() {
        this.birthDateSuggestions.style.display = 'none';
    }
    
    // Call Tencent Yuanbao API for BaZi fortune telling
    async callBaZiFortuneAPI(birthData) {
        const astrologyData = this.prepareBaZiData(birthData);
        
        const response = await fetch('/api/bazi-fortune', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(astrologyData)
        });
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        
        const result = await response.json();
        return result.fortune;
    }
    
    // Prepare BaZi data for API call
    prepareBaZiData(birthData) {
        const birthDate = new Date(this.parseBirthDate(birthData.birthDate));
        const zodiacAnimal = this.getChineseZodiac(birthDate.getFullYear());
        const element = this.getFiveElement(birthDate.getFullYear());
        const birthHour = this.getBirthHour(birthData.birthTime);
        
        return {
            name: birthData.name,
            birthDate: birthData.birthDate,
            birthTime: birthData.birthTime,
            birthPlace: birthData.birthPlace,
            gender: birthData.gender,
            zodiacAnimal: zodiacAnimal,
            element: element,
            birthHour: birthHour
        };
    }
    
    // Parse birth date from various formats
    parseBirthDate(dateStr) {
        // Handle MMDDYYYY format
        if (dateStr.length === 8 && /^\d{8}$/.test(dateStr)) {
            const mm = dateStr.substring(0, 2);
            const dd = dateStr.substring(2, 4);
            const yyyy = dateStr.substring(4, 8);
            return `${yyyy}-${mm}-${dd}`;
        }
        
        // Handle MM/DD/YYYY or MM-DD-YYYY format
        if (dateStr.includes('/') || dateStr.includes('-')) {
            const parts = dateStr.split(/[/-]/);
            if (parts.length === 3) {
                const [mm, dd, yyyy] = parts;
                return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
            }
        }
        
        return dateStr;
    }
    
    // Get Chinese zodiac animal
    getChineseZodiac(year) {
        const animals = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
        return animals[year % 12];
    }
    
    // Get Five Element
    getFiveElement(year) {
        const elements = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];
        const elementIndex = Math.floor((year % 10) / 2);
        return elements[elementIndex];
    }
    
    // Get birth hour in traditional Chinese format
    getBirthHour(timeStr) {
        if (!timeStr) return 'Unknown';
        
        const [hours] = timeStr.split(':');
        const hour = parseInt(hours);
        
        const hourNames = {
            23: 'Zi (子)', 0: 'Zi (子)', 1: 'Chou (丑)', 2: 'Chou (丑)',
            3: 'Yin (寅)', 4: 'Yin (寅)', 5: 'Mao (卯)', 6: 'Mao (卯)',
            7: 'Chen (辰)', 8: 'Chen (辰)', 9: 'Si (巳)', 10: 'Si (巳)',
            11: 'Wu (午)', 12: 'Wu (午)', 13: 'Wei (未)', 14: 'Wei (未)',
            15: 'Shen (申)', 16: 'Shen (申)', 17: 'You (酉)', 18: 'You (酉)',
            19: 'Xu (戌)', 20: 'Xu (戌)', 21: 'Hai (亥)', 22: 'Hai (亥)'
        };
        
        return hourNames[hour] || 'Unknown';
    }
    
    // Display fortune result
    displayFortuneResult(fortune) {
        const resultContainer = document.getElementById('result');
        if (!resultContainer) return;
        
        const fortuneHTML = `
            <div class="fortune-result">
                <h3>Your BaZi Fortune Reading</h3>
                <div class="fortune-section">
                    <h4>Overall Fortune</h4>
                    <p>${fortune.general || 'Your overall fortune shows positive trends. Embrace opportunities and move forward with confidence.'}</p>
                </div>
                <div class="fortune-section">
                    <h4>Career and Wealth</h4>
                    <p>${fortune.career || 'New opportunities will emerge in your career. Stay focused and work diligently.'}</p>
                </div>
                <div class="fortune-section">
                    <h4>Love and Marriage</h4>
                    <p>${fortune.love || 'Your emotional life will be harmonious and fulfilling. Cherish those around you.'}</p>
                </div>
                <div class="fortune-section">
                    <h4>Health Condition</h4>
                    <p>${fortune.health || 'Your health condition is generally good. Remember to balance work and rest.'}</p>
                </div>
                <div class="fortune-section">
                    <h4>Advice</h4>
                    <p>${fortune.advice || 'Based on your BaZi characteristics, maintain a positive attitude and follow natural laws for a beautiful life.'}</p>
                </div>
            </div>
        `;
        
        resultContainer.innerHTML = fortuneHTML;
    }
    
    // Display error result
    displayErrorResult() {
        const resultContainer = document.getElementById('result');
        if (!resultContainer) return;
        
        resultContainer.innerHTML = `
            <div class="error-result">
                <h3>Service Temporarily Unavailable</h3>
                <p>We apologize, but our fortune telling service is temporarily unavailable. Please try again later.</p>
                <p>Your information has been saved and you can access other services using the buttons below.</p>
            </div>
        `;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FortuneTeller();
});