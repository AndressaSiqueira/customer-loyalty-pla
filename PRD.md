# Planning Guide

An interactive visual demonstration of Neo Contoso's Customer Loyalty Platform modernization strategy, showcasing the journey from legacy systems to an AI-powered, cloud-native Azure architecture with intelligent agents.

**Experience Qualities**: 
1. **Professional & Enterprise-Grade** - Conveys technical sophistication and strategic thinking appropriate for executive and technical stakeholders
2. **Informative & Educational** - Clearly communicates complex architectural concepts through visual hierarchy and progressive disclosure
3. **Modern & Forward-Thinking** - Reflects innovation and transformation through contemporary design patterns that suggest cloud-native maturity

**Complexity Level**: Light Application (multiple features with basic state)
- This is an interactive demonstration platform that presents architecture diagrams, AI agent capabilities, migration strategies, and key metrics in an engaging, explorable format without requiring backend services or complex state management.

## Essential Features

### Architecture Visualization
- **Functionality**: Interactive diagram showing all system layers (User Channels, Gateway & API, Microservices, AI Agents, Data Platform, Security & Identity, DevOps & Observability)
- **Purpose**: Provides stakeholders with a comprehensive view of the modernized platform architecture
- **Trigger**: User lands on the main dashboard
- **Progression**: Dashboard loads → Architecture diagram displays with color-coded layers → User hovers over components → Tooltips reveal technical details → User clicks sections → Detailed views expand
- **Success criteria**: All architectural components are clearly labeled, organized by layer, and provide contextual information on interaction

### AI Agents Showcase
- **Functionality**: Dedicated sections for Campaign Designer Agent and Support & Operations Agent with capability details, use cases, and sample interactions
- **Purpose**: Demonstrates the strategic value of AI agents in solving real business problems
- **Trigger**: User navigates to AI Agents section or clicks agent components in architecture
- **Progression**: User selects agent → Agent card expands → Capabilities list displays → Sample queries/interactions shown → Business impact metrics highlighted
- **Success criteria**: Each agent's purpose, capabilities, and business value are clearly communicated with concrete examples

### Migration Strategy Timeline
- **Functionality**: Visual roadmap showing the four-phase migration strategy (Assessment → Planning → Phased Migration → Optimization)
- **Purpose**: Communicates the pragmatic, risk-managed approach to Azure migration
- **Trigger**: User navigates to Migration Strategy section
- **Progression**: Timeline view loads → Phases display sequentially → User clicks phase → Detailed activities and outcomes expand → Blocker solutions displayed
- **Success criteria**: Migration phases, key activities, and blocker mitigation strategies are presented in a logical, time-sequenced format

### Business Metrics Dashboard
- **Functionality**: Key performance indicators showing the platform's current challenges and expected outcomes post-modernization
- **Purpose**: Quantifies business value and justifies the modernization investment
- **Trigger**: User views metrics section or dashboard overview
- **Progression**: Metrics cards animate in → Before/after comparisons display → User hovers → Additional context appears
- **Success criteria**: Metrics clearly show the business case with compelling before/after data points

## Edge Case Handling

- **Empty State**: If no section is selected, default to architecture overview with prominent call-to-action
- **Mobile Responsiveness**: Architecture diagrams adapt to vertical layouts with collapsible sections on smaller screens
- **Long Content**: Scrollable containers with visual indicators for additional content
- **Navigation State**: Clear visual indication of current section with smooth transitions between views

## Design Direction

The design should evoke trust, innovation, and enterprise sophistication—reflecting Microsoft Azure's professional aesthetic while showcasing transformative AI capabilities. It should feel like a strategic presentation tool that technical leaders would use to communicate vision to stakeholders, balancing visual impact with information density.

## Color Selection

Drawing inspiration from Azure's cloud platform and enterprise architecture diagrams, with strategic use of color to denote different system layers.

- **Primary Color**: `oklch(0.45 0.15 240)` - Deep Azure Blue that communicates trust, stability, and cloud technology
- **Secondary Colors**: 
  - `oklch(0.55 0.12 145)` - Microservices Green for service components
  - `oklch(0.65 0.18 280)` - AI Purple for intelligent agent components
  - `oklch(0.60 0.18 35)` - Data Orange for platform and analytics components
- **Accent Color**: `oklch(0.70 0.20 340)` - Electric Magenta for interactive elements, CTAs, and highlights
- **Foreground/Background Pairings**: 
  - Background (Soft Cloud): `oklch(0.98 0.005 240)` - Very light blue-tinted white
  - Foreground (Deep Slate): `oklch(0.25 0.02 240)` - Dark blue-gray text - Ratio 14.2:1 ✓
  - Primary (Azure Blue): White text `oklch(1 0 0)` - Ratio 6.8:1 ✓
  - Accent (Electric Magenta): White text `oklch(1 0 0)` - Ratio 5.2:1 ✓

## Font Selection

Typography should balance technical precision with modern sophistication, suggesting both enterprise credibility and forward-thinking innovation.

- **Typographic Hierarchy**: 
  - H1 (Main Title): Space Grotesk Bold/36px/tight letter spacing - Commands attention for key section headers
  - H2 (Section Headers): Space Grotesk Semibold/24px/normal spacing - Clear hierarchy for major components
  - H3 (Component Labels): Space Grotesk Medium/18px/normal spacing - Labels for architecture elements
  - Body (Descriptions): IBM Plex Sans Regular/16px/1.6 line height - Readable technical content
  - Caption (Metadata): IBM Plex Sans Regular/14px/muted color - Supplementary information

## Animations

Animations should reinforce the narrative of transformation and modernization—components should appear to assemble and connect, suggesting the building of a new architecture. Use subtle motion to guide attention to key information without distracting from content comprehension.

## Component Selection

- **Components**: 
  - `Tabs` for navigating between Architecture, AI Agents, Migration Strategy, and Metrics sections
  - `Card` for component containers with hover states showing additional details
  - `Badge` for technology labels (Azure SQL, Cosmos DB, AKS, etc.)
  - `Accordion` for expandable phase details in migration timeline
  - `Separator` for visual breaks between architectural layers
  - `Dialog` for detailed component information when clicking architecture elements
  - `Tooltip` for quick contextual information on hover
  - `Progress` indicators for migration phases and metrics improvements
  
- **Customizations**: 
  - Custom architecture diagram component using flexbox/grid with connection lines (pseudo-elements or SVG)
  - Animated metric cards with number counting transitions
  - Layer-based color coding system matching the architecture diagram colors
  
- **States**: 
  - Cards have subtle elevation on hover with smooth shadow transitions
  - Active tab has bottom border accent with slide animation
  - Architecture components pulse gently to suggest they're interactive
  - Disabled states for future phases shown with reduced opacity
  
- **Icon Selection**: 
  - `CloudArrowUp` - Migration and Azure cloud
  - `Robot` - AI Agents
  - `ChartBar` - Analytics and metrics
  - `ShieldCheck` - Security components
  - `GitBranch` - DevOps and CI/CD
  - `Database` - Data platform components
  - `DeviceMobile` - User channels
  - `Gear` - Microservices
  
- **Spacing**: 
  - Container padding: `p-8` for main sections, `p-6` for cards
  - Card gaps: `gap-6` for primary grid layouts, `gap-4` for component lists
  - Section margins: `mb-12` between major sections, `mb-6` for subsections
  
- **Mobile**: 
  - Architecture diagram transforms from horizontal multi-column to vertical single-column flow
  - Tabs become full-width stacked buttons
  - Metric cards stack vertically with full width
  - Reduce font sizes by one step (H1→H2 size, Body→Small size)
  - Side-by-side comparisons become stacked on mobile
