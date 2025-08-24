# DPO Tools Frontend

A comprehensive Data Protection Officer (DPO) tools platform built with React and TypeScript, providing GDPR compliance assessment, DPO applications, and expert consultation services.

## 🚀 Features

- **DPO Assessment Tool** - Determine if your organization needs a DPO
- **GDPR Compliance Assessment** - Evaluate your GDPR compliance status
- **GDPR Compliance Audit** - Comprehensive compliance audit with scoring
- **Ask Your DPO** - Submit questions to DPO experts
- **DPO Application Portal** - Apply to become a certified DPO
- **User Authentication** - Secure login and signup system

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with modern design patterns
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Type Safety**: TypeScript

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   └── Navbar.css      # Navigation styles
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── DPOAssessment.tsx          # DPO need assessment
│   ├── ComplianceAssessmentPage.tsx # GDPR compliance assessment
│   ├── GDPRComplianceAuditPage.tsx  # Comprehensive audit
│   ├── AskYourDPOPage.tsx          # DPO consultation
│   ├── DPOApplicationPage.tsx      # DPO application form
│   ├── LoginPage.tsx               # Authentication
│   └── SignUpPage.tsx              # User registration
├── domains/            # Business logic and types
│   ├── auth/          # Authentication domain
│   ├── dpo/           # DPO-related domain
│   └── common/        # Shared types and utilities
├── images/             # Static assets
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Key Components

### Pages
- **HomePage**: Landing page with service overview and navigation
- **DPOAssessment**: Interactive assessment to determine DPO requirements
- **ComplianceAssessmentPage**: GDPR compliance evaluation with scoring
- **GDPRComplianceAuditPage**: Multi-section compliance audit
- **AskYourDPOPage**: Question submission form for DPO consultation
- **DPOApplicationPage**: Comprehensive application form for DPO certification
- **LoginPage**: User authentication with login/signup toggle
- **SignUpPage**: User registration with form validation

### Components
- **Navbar**: Responsive navigation with logo and menu items

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone <repository-url>
cd dpo-tools-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Design System

The application uses a consistent design system with:
- **Color Palette**: Modern gradient backgrounds (#667eea to #764ba2)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Card-based layouts with subtle shadows and rounded corners
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Interactive Elements**: Hover effects, transitions, and smooth animations

## 📱 Responsive Design

All components are built with mobile-first responsive design:
- **Mobile**: Single-column layouts, optimized touch targets
- **Tablet**: Adaptive grid layouts
- **Desktop**: Multi-column layouts with enhanced spacing

## 🔧 Development

### Code Style
- TypeScript for type safety
- Functional components with React Hooks
- CSS modules for component-specific styling
- Consistent naming conventions

### Adding New Features
1. Create new page component in `src/pages/`
2. Add corresponding CSS file
3. Update routing in `App.tsx`
4. Add navigation links in `Navbar.tsx`

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for better data protection and GDPR compliance** 