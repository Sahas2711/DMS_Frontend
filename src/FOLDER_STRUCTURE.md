# Frontend Folder Structure

## Industry-Standard Organization

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Primitives (Button, Input, Modal, etc.)
│   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   ├── forms/           # Form components
│   ├── editorial/       # Editorial/design system components
│   ├── navigation/      # Navigation components
│   ├── admin/           # Admin panel shared UI
│   ├── auth/            # Authentication components
│   ├── cms/             # CMS media helpers
│   └── icons/           # SVG icon components
│
├── features/            # Feature-based modules
│   ├── home/            # Homepage sections
│   ├── destination/     # Destination feature
│   ├── tours/           # Tours feature
│   ├── admin/           # Admin panel
│   ├── auth/            # Authentication
│   └── booking/         # Booking flow
│
├── pages/               # Page-level components (routing)
├── config/              # Configuration files
├── context/             # React contexts
├── hooks/               # Custom hooks
├── services/            # API services
├── lib/                 # Utility libraries
├── utils/               # Helper functions
└── styles/              # CSS/styling
```

## Import Conventions

```jsx
// Feature-based imports (recommended)
import { Hero, FinalCTA } from '../features/home';

// Component imports
import { Button, Modal } from '../components/ui';
import { PageHeader } from '../components/admin/ui';

// Page imports
import Home from './Home';
```

## Adding New Features

1. Create directory in `src/features/[feature-name]/`
2. Add component files
3. Create `index.js` barrel export
4. Import from feature directory, not individual files
