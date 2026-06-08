# GitHub Package Downloader

A modern web application for discovering, browsing, and downloading GitHub repositories with an intuitive interface.

## Features

- **Trending Packages**: Browse the most popular GitHub repositories from the past week
- **Advanced Search**: Search repositories with customizable filters (stars, forks, recent updates)
- **Package Details**: View comprehensive information about any repository
- **One-Click Download**: Download repository source code as ZIP archives
- **Responsive Design**: Fully responsive interface that works on all devices
- **Real-time Data**: Live data from GitHub API

## Architecture

```
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD automation pipeline
├── src/
│   ├── components/          # React components
│   │   ├── PackageCard.tsx  # Repository card component
│   │   ├── SearchBar.tsx    # Search interface with filters
│   │   └── PackageDetails.tsx # Detailed package view modal
│   ├── services/
│   │   └── github.ts        # GitHub API service layer
│   ├── types/
│   │   └── package.ts       # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── package.json             # Dependencies and scripts
└── README.md                # Documentation
```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: GitHub REST API v3
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd github-package-downloader
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Usage

### Browsing Trending Packages

When you first open the application, you'll see trending repositories from the past week, sorted by stars.

### Searching for Packages

1. Enter your search query in the search bar
2. Click the filters icon to customize sorting options
3. Select sort criteria (stars, forks, or recently updated)
4. Choose ascending or descending order
5. Click "Search" to view results

### Downloading Packages

- Click the download icon on any package card for instant download
- Or click on a card to view details, then click "Download Package"
- Files are downloaded as ZIP archives containing the repository source code

### Viewing Package Details

Click on any package card to see:
- Full repository information
- Star and fork counts
- Primary programming language
- Topics and tags
- Links to GitHub repository

## API Integration

This application uses the GitHub REST API v3. No authentication is required for basic usage, but API rate limits apply:

- **Unauthenticated requests**: 60 requests per hour
- **Authenticated requests**: 5,000 requests per hour (if you add a GitHub token)

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:
- Runs on every push to main/develop branches
- Executes type checking and linting
- Builds the production bundle
- Uploads build artifacts

## Performance

- Optimized bundle size with code splitting
- Efficient API calls with error handling
- Responsive UI with smooth transitions
- Accessible design following WCAG guidelines

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- GitHub API for providing repository data
- Lucide for beautiful icons
- The open-source community

## Future Enhancements

- [ ] User authentication for higher API rate limits
- [ ] Bookmark favorite repositories
- [ ] Download release assets
- [ ] View repository README content
- [ ] Compare multiple packages
- [ ] Advanced filtering options
- [ ] Package analytics and insights
