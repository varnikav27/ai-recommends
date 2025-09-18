#!/bin/bash

# VibePack AI Environment Setup Script

echo "🚀 VibePack AI Environment Setup"
echo "================================"
echo

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    echo "Contents:"
    cat .env
    echo
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled."
        exit 1
    fi
fi

echo "🔑 Setting up your Gemini API key..."
echo
echo "To get your API key:"
echo "1. Visit: https://aistudio.google.com/app/apikey"
echo "2. Create a new API key"
echo "3. Copy the key"
echo
read -p "Enter your Gemini API key: " api_key

# Validate API key format (basic check)
if [[ ${#api_key} -lt 30 ]]; then
    echo "❌ API key seems too short. Please check and try again."
    exit 1
fi

# Create .env file
cat > .env << EOF
# Gemini API Configuration
# Generated on $(date)
VITE_GEMINI_API_KEY=$api_key
EOF

echo "✅ .env file created successfully!"
echo
echo "🔒 Security reminders:"
echo "- Your .env file is gitignored (won't be committed)"
echo "- Never share your API key publicly"
echo "- For Vercel deployment, add this key in your project settings"
echo
echo "🚀 You can now run: npm run dev"
echo

# Make the script remind about Vercel deployment
echo "📝 For Vercel deployment:"
echo "1. Go to your Vercel project dashboard"
echo "2. Settings → Environment Variables"
echo "3. Add: VITE_GEMINI_API_KEY = $api_key"
echo
