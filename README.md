# Model List
> Exploring and comparing AI language models across different providers.

## Features

- 📊 Interactive data visualization with Chart.js
- 📱 Responsive design for all screen sizes
- 🌓 Light/Dark mode support
- 🔍 Advanced filtering and search capabilities
- 📈 Multiple view options (Table and Charts)
- ⚡ Static site generation for optimal performance

### Data Visualization

- Bar chart showing models by provider
- Pie chart showing license distribution
- Context window distribution analysis
- Top 10 models by context window size
- Average context window by provider trend

### Interactive Table Features

- Sort by any column (Model Name, Creator, Context Window, License)
- Filter by creator and license type
- Full-text search across model names and creators
- Responsive table with horizontal scrolling on mobile

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [React Chart.js 2](https://react-chartjs-2.js.org/) - React wrapper for Chart.js
- [Lucide Icons](https://lucide.dev/) - Icons
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-models-dashboard.git
cd ai-models-dashboard
```

2. Install dependencies:


```shellscript
npm install
```

3. Run the development server:


```shellscript
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


### Building for Production

To create a production build:

```shellscript
npm run build
```

The static site will be generated in the `out` directory.

## Project Structure

```plaintext
ai-models-dashboard/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── model-charts.tsx  # Chart components
│   ├── model-table.tsx   # Table component
│   └── ...
├── data/                 # Static data files
│   └── ai-models.json    # AI models dataset
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── styles/              # Global styles
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## Data Structure

The AI models data is stored in `data/ai-models.json` with the following structure:

```typescript
interface Model {
  name: string;
  creator: string;
  license: "Open" | "Proprietary";
  contextWindow: string;
}
```

## Customization

### Adding New Models

Add new models to the `data/ai-models.json` file following the existing structure.

### Theming

The dashboard uses CSS variables for theming. Customize colors in:

- `styles/globals.css` for base theme variables
- `tailwind.config.js` for Tailwind configuration


### Charts

Chart configurations can be modified in the `components/model-charts.tsx` file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License
WTFPL

## Acknowledgments

- Data sourced from various AI model providers
- UI components from shadcn/ui
- Icons from Lucide Icons