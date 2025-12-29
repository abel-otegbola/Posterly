# Posterly 🎨

An AI-powered poster generation tool that creates professional, eye-catching posters with custom backgrounds and creative text layouts. Built with Next.js 15 and powered by cutting-edge AI models.

## ✨ Features

- **AI-Generated Backgrounds**: Generate unique poster backgrounds using HuggingFace's FLUX.1-schnell model with context-aware styling
- **Smart Text Generation**: Automatically generate compelling poster copy using Google's Gemini Pro AI
- **Creative Templates**: Professionally designed templates with unique aesthetics
- **Visual Text Editor**: Intuitive editor with real-time preview and customization controls
- **Smart Preferences**: Customize theme, text style, and color scheme to influence AI generation
- **Background Regeneration**: Don't like the background? Regenerate with one click
- **Responsive Design**: Works seamlessly across different screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- HuggingFace API token
- Google Generative AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd posterly
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   HUGGINGFACE_API_TOKEN=your_huggingface_token_here
   GOOGLE_API_KEY=your_google_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔑 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `HUGGINGFACE_API_TOKEN` | API token for HuggingFace Inference API | [HuggingFace Settings](https://huggingface.co/settings/tokens) - Create a free account and generate a token |
| `GOOGLE_API_KEY` | API key for Google Generative AI (Gemini) | [Google AI Studio](https://makersuite.google.com/app/apikey) - Get your free API key |

### Getting API Keys

**HuggingFace Token:**
1. Sign up at [HuggingFace](https://huggingface.co/join)
2. Go to Settings → Access Tokens
3. Create a new token with read permissions
4. Copy and paste into `.env.local`

**Google API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key"
4. Copy and paste into `.env.local`

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Models**: 
  - HuggingFace FLUX.1-schnell (Image Generation)
  - Google Gemini Pro (Text Generation)
- **Icons**: Phosphor Icons
- **UI Components**: Custom component library

## 📁 Project Structure

```
posterly/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-image/    # Image generation endpoint
│   │   │   └── generate-text/     # Text generation endpoint
│   │   ├── create/                # Poster creation page
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx               # Landing page
│   └── components/
│       ├── button/                # Custom button component
│       ├── dropdown/              # Custom dropdown component
│       ├── input/                 # Custom input component
│       ├── toggle/                # Custom toggle component
│       └── text-editor/           # Poster editor components
│           ├── TextEditor.tsx
│           └── PosterPreview.tsx
├── public/
├── .env.local                     # Environment variables (create this)
├── package.json
└── README.md
```

## 🎯 Usage

1. **Start Creating**: Click "Create Your Poster" on the landing page
2. **Set Preferences**: Choose your theme, text style, and color scheme
3. **Enter Prompt**: Describe what you want your poster to be about
4. **Generate**: Click "Generate Poster" and wait for AI magic
5. **Select Template**: Choose from 5 creative templates
6. **Customize**: Fine-tune text content, colors, sizes, and positions
7. **Regenerate Background**: Click the regenerate button if you want a different background
8. **Export**: (Coming soon) Download your poster in high resolution

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- AI powered by [HuggingFace](https://huggingface.co) and [Google AI](https://ai.google.dev)
- Icons by [Phosphor Icons](https://phosphoricons.com)
