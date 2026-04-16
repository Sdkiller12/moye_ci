import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import { config } from 'dotenv-safe';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

// Scanner endpoint
app.post('/api/scanner', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const SCANNER_PROMPT = `Tu es un expert en patrimoine culturel ivoirien.
Analyse cette image et réponds UNIQUEMENT en JSON:
{
  "type_objet": "masque|pagne|statuette|instrument|inconnu",
  "nom_probable": "...",
  "ethnie_probable": "...",
  "description_courte": "...",
  "usage_culturel": "...",
  "confiance": 0.0-1.0
}
Si l'objet n'est pas culturel ivoirien, retourne { "type_objet": "inconnu" }.`;

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString('base64'),
        mimeType: req.file.mimetype
      }
    };

    const result = await model.generateContent([SCANNER_PROMPT, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Invalid AI response' });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    res.json(parsed);
  } catch (error) {
    console.error('Scanner error:', error);
    res.status(500).json({ error: 'Scanner processing failed' });
  }
});

// Translation endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { text, source, target } = req.body;
    
    if (!text || !source || !target) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await fetch(`${process.env.LIBRETRANSLATE_URL}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source, target })
    });

    const data = await response.json();
    res.json({ translated: data.translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Batch translation
app.post('/api/translate/batch', async (req, res) => {
  try {
    const { translations } = req.body;
    
    if (!Array.isArray(translations)) {
      return res.status(400).json({ error: 'Invalid request format' });
    }

    const results = await Promise.all(
      translations.map(async ({ text, source, target }) => {
        try {
          const response = await fetch(`${process.env.LIBRETRANSLATE_URL}/translate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: text, source, target })
          });
          const data = await response.json();
          return { text, translated: data.translatedText };
        } catch {
          return { text, translated: text, error: true };
        }
      })
    );

    res.json(results);
  } catch (error) {
    console.error('Batch translation error:', error);
    res.status(500).json({ error: 'Batch translation failed' });
  }
});

// Chat translation
app.post('/api/chat/translate', async (req, res) => {
  try {
    const { content, source, targets } = req.body;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const prompt = `Traduis ce message en ${targets.join(', ')}. Réponds en JSON: {"${targets[0]}": "...", "${targets[1]}": "..."}\nMessage: ${content}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const translations = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    
    res.json({ translations });
  } catch (error) {
    console.error('Chat translation error:', error);
    res.status(500).json({ error: 'Chat translation failed' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🌅 MOYÉ server running on port ${PORT}`);
});
