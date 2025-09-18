# VibePack AI - Travel Booking Assistant

A modern React app that uses Gemini AI to generate personalized travel recommendations and packing lists.

## 🌟 Features

- **Trip Planning**: Get AI-powered travel recommendations based on your preferences
- **Packing Lists**: Receive personalized packing suggestions with tips
- **Real-time AI Integration**: Powered by Google's Gemini 2.0 Flash model
- **Beautiful UI**: Modern, responsive design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd vibe-booking-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy from .env.example if available
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

**Get your Gemini API key:**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy and paste it into your `.env` file

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🌐 Deployment on Vercel

### 1. Connect Your Repository

1. Push your code to GitHub (make sure `.env` is in `.gitignore`)
2. Connect your GitHub repository to Vercel
3. Import your project

### 2. Set Environment Variables in Vercel

1. Go to your project dashboard in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Environment**: Production (and Preview if needed)

### 3. Deploy

```bash
# Vercel will automatically deploy when you push to main branch
git add .
git commit -m "Initial deployment"
git push origin main
```

## 🔒 Security Notes

- ✅ **Environment Variables**: API keys are stored securely in environment variables
- ✅ **Git Ignore**: Sensitive files are excluded from version control
- ✅ **No Hardcoded Keys**: No API keys are committed to the repository
- ⚠️ **Client-Side Note**: Since this is a client-side app, the API key will be visible in the browser. For production apps handling sensitive data, consider implementing a backend proxy.

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure

```
src/
├── components/       # React components
│   ├── StepOne.tsx          # User preferences form
│   ├── StepTwo.tsx          # Trip planning form
│   ├── RecommendationsResults.tsx  # Trip recommendations display
│   └── PackingResults.tsx   # Packing list display
├── services/
│   └── gemini.ts    # Gemini AI integration
├── types/
│   └── index.ts     # TypeScript type definitions
└── App.tsx          # Main application component
```

## 🤖 API Integration

The app integrates with Google's Gemini 2.0 Flash model:

- **Model**: `gemini-2.0-flash`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- **Features**: Text generation with structured JSON responses

## 🧪 Testing

To test the Gemini integration:

1. Open browser developer console (F12)
2. Fill out the travel form
3. Click "Create My VibePack"
4. Watch console logs for API call details:
   - Request/response logging
   - JSON parsing details
   - Error handling

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key | Yes |

## 🎨 Customization

- **Styling**: Uses Tailwind CSS for styling
- **Icons**: Lucide React for icons
- **Components**: Modular component structure for easy customization

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🔗 Links

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Google Gemini AI.
