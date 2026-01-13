# Customer Loyalty Platform - Azure Architecture

An interactive demonstration platform showcasing a modern, AI-first customer loyalty platform built on Microsoft Azure. This application presents a comprehensive view of the architecture, AI capabilities, and migration strategy for enterprise-grade customer loyalty solutions.

## 🎯 Overview

The Customer Loyalty Platform is designed to demonstrate how to modernize legacy customer loyalty systems using Azure cloud services and AI-driven capabilities. It provides an engaging, explorable interface for stakeholders to understand the technical architecture, AI agent functionalities, and transformation roadmap.

## ✨ Features

### 🏗️ Architecture View
- **Comprehensive System Layers**: Visualize all components including User Channels, Gateway & API, Microservices, AI Agents, Data Platform, Security & Identity, and DevOps & Observability
- **Interactive Components**: Click on any architecture component to view detailed information
- **Layer-based Organization**: Clear separation of concerns across architectural layers

### 🤖 AI Agents
- **Intelligent Agent Showcase**: Explore AI-powered capabilities including customer insights, personalized recommendations, fraud detection, and automated support
- **Real-time Processing**: Demonstrations of how AI agents enhance the customer experience
- **Agent Details**: In-depth information about each AI agent's functionality and integration

### 🚀 Migration Strategy
- **Phase-by-phase Timeline**: Interactive migration roadmap with clear milestones
- **Challenge & Solution Mapping**: Understanding current platform challenges and modernization benefits
- **Risk Assessment**: Comprehensive view of migration risks and mitigation strategies

### 🎪 Demo Section
- **Live Interactions**: Explore the platform capabilities through interactive demonstrations
- **Metrics & KPIs**: Key performance indicators showing platform improvements
- **User Journey Visualization**: See how customers interact with the modernized platform

## 🛠️ Technology Stack

### Frontend Framework
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI Components & Styling
- **Radix UI** - Accessible component primitives
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Phosphor Icons** - Additional icon set

### Data & State Management
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Visualization
- **Recharts** - Chart library
- **D3.js** - Data visualization

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AndressaSiqueira/customer-loyalty-pla.git
   cd customer-loyalty-pla
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run optimize` | Optimize dependencies with Vite |
| `npm run kill` | Kill process running on port 5000 |

## 📁 Project Structure

```
customer-loyalty-pla/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── ArchitectureView.tsx
│   │   ├── AIAgentsView.tsx
│   │   ├── MigrationView.tsx
│   │   └── DemoView.tsx
│   ├── lib/              # Utility functions and data
│   ├── hooks/            # Custom React hooks
│   ├── assets/           # Static assets (images, icons)
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Public static files
├── index.html            # HTML template
├── package.json          # Project dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## 🎨 Design System

The application follows a modern design system with:
- **Professional & Enterprise-Grade**: Conveys technical sophistication for executive and technical stakeholders
- **Informative & Educational**: Clear communication of complex architectural concepts
- **Modern & Forward-Thinking**: Contemporary design patterns reflecting cloud-native maturity

### Color Palette
- **Primary (Azure Blue)**: Brand color for primary actions and highlights
- **AI Purple**: Intelligent agent components
- **Data Platform Colors**: Distinct colors for different architectural layers
- **Semantic Colors**: Success, warning, error, and info states

## 🎨 Theming

The application supports **Light** and **Dark** modes with automatic OS preference detection.

### Features
- **Instant Theme Switching**: Toggle between light and dark modes without page reload
- **Persistent Preference**: Your theme choice is saved in `localStorage` (key: `appTheme`)
- **OS Integration**: Automatically detects and respects system color scheme preference on first visit
- **WCAG AA Compliant**: All color combinations meet accessibility contrast requirements (≥4.5:1 for body text, ≥3:1 for large text)

### Theme Toggle
The theme toggle button is located in the header. Click to switch between:
- 🌞 **Light Mode**: Clean, bright interface optimized for daylight viewing
- 🌙 **Dark Mode**: Reduced eye strain for low-light environments

### Theme Tokens

All components use semantic CSS variables for consistent theming:

#### Core Colors
- `--background`: Main background color
- `--foreground`: Primary text color
- `--card`: Card background color
- `--card-foreground`: Card text color
- `--popover`: Popover/dropdown background
- `--popover-foreground`: Popover/dropdown text
- `--primary`: Primary action color
- `--primary-foreground`: Primary action text
- `--secondary`: Secondary element background
- `--secondary-foreground`: Secondary element text
- `--muted`: Muted background color
- `--muted-foreground`: Muted text color
- `--accent`: Accent color for highlights
- `--accent-foreground`: Accent text color
- `--destructive`: Error/destructive action color
- `--border`: Border color
- `--input`: Input field border color
- `--ring`: Focus ring color

#### Architecture-Specific Colors
- `--microservices`: Microservices layer color
- `--ai-agents`: AI agents layer color
- `--data-platform`: Data platform layer color
- `--security`: Security layer color
- `--devops`: DevOps layer color

#### Usage Example
```css
.my-component {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}
```

Or with Tailwind CSS:
```jsx
<div className="bg-background text-foreground border border-border">
  Content
</div>
```

### Implementation Details
- **Framework**: Uses `next-themes` for React theme management
- **Storage**: Themes persist in localStorage with key `appTheme`
- **Default**: Falls back to system preference (`prefers-color-scheme`)
- **Tailwind Integration**: Dark mode uses class-based strategy with `.dark` class

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a demonstration project. For contributions or suggestions, please open an issue or submit a pull request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

## 🏢 About

**Neo Contoso - Enterprise Transformation Initiative**

This platform demonstrates how modern cloud architecture and AI capabilities can transform customer loyalty programs at enterprise scale, powered by Microsoft Azure.

---

**Built with** ❤️ **using GitHub Spark and Microsoft Azure**
