import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Translator.css';

// Country codes and their corresponding languages
const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
};

function Translator() {
    const [fruit, setFruit] = useState('');
    const [language, setLanguage] = useState('hi-IN'); // Default to Hindi
    const [translation, setTranslation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to handle translation
    const handleTranslate = async () => {
        if (!fruit.trim()) {
            setError('Please enter a fruit name.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get('https://api.mymemory.translated.net/get', {
                params: {
                    q: fruit, // sentence to translate
                    langpair: `en|${language}`, // from English to selected language
                }
            });

            if (response.data.responseData.translatedText) {
                setTranslation(response.data.responseData.translatedText);
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (err) {
            console.error('Error during translation:', err);
            setError('Translation failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="translator-container">
            <h1>Fruit Translator</h1>
            <input
                type="text"
                placeholder="Enter a fruit name"
                value={fruit}
                onChange={(e) => setFruit(e.target.value)}
            />

            {/* Dropdown to select language from country codes */}
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                {Object.keys(countries).map((code) => (
                    <option key={code} value={code}>
                        {countries[code]}
                    </option>
                ))}
            </select>

            <button onClick={handleTranslate} disabled={isLoading || !fruit.trim()}>
                {isLoading ? 'Translating...' : 'Translate'}
            </button>

            {error && <div className="error-message">{error}</div>}
            {translation && !error && <div className="translation-result">{translation}</div>}
        </div>
    );
}

export default Translator;