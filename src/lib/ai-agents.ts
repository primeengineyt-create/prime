// AI Agent Types and Models for Prime Engine

export type AIModel = {
    id: string;
    name: string;
    provider: string;
    description: string;
    icon: string;
    speed: 'fast' | 'medium' | 'slow';
    quality: 'standard' | 'high' | 'ultra';
    context: string;
    isDefault?: boolean;
};

export type AIAgent = {
    id: string;
    name: string;
    role: string;
    description: string;
    avatar: string;
    color: string;
    specialties: string[];
    status: 'idle' | 'thinking' | 'working' | 'done';
};

export type ActionType =
    | 'thinking'
    | 'analyzing'
    | 'planning'
    | 'creating'
    | 'editing'
    | 'writing'
    | 'reading'
    | 'searching'
    | 'generating'
    | 'optimizing'
    | 'deploying'
    | 'testing'
    | 'fixing'
    | 'complete';

export interface AIAction {
    type: ActionType;
    target?: string;
    description: string;
    icon: string;
}

export const AI_MODELS: AIModel[] = [
    {
        id: 'prime-1',
        name: 'Prime-1',
        provider: 'Prime Engine',
        description: 'Our flagship model. Best for complex apps.',
        icon: '⚡',
        speed: 'medium',
        quality: 'ultra',
        context: '128K tokens',
        isDefault: true,
    },
    {
        id: 'prime-flash',
        name: 'Prime Flash',
        provider: 'Prime Engine',
        description: 'Lightning fast. Perfect for quick iterations.',
        icon: '🚀',
        speed: 'fast',
        quality: 'high',
        context: '32K tokens',
    },
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        description: 'OpenAI\'s multimodal flagship model.',
        icon: '🧠',
        speed: 'medium',
        quality: 'ultra',
        context: '128K tokens',
    },
    {
        id: 'claude-3.5',
        name: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        description: 'Excellent for code and reasoning.',
        icon: '🎭',
        speed: 'medium',
        quality: 'ultra',
        context: '200K tokens',
    },
    {
        id: 'gemini-2',
        name: 'Gemini 2.0',
        provider: 'Google',
        description: 'Google\'s latest multimodal model.',
        icon: '💎',
        speed: 'fast',
        quality: 'high',
        context: '1M tokens',
    },
];

export const AI_AGENTS: AIAgent[] = [
    {
        id: 'architect',
        name: 'Architect',
        role: 'System Designer',
        description: 'Designs app architecture and database schemas',
        avatar: '🏗️',
        color: '#6366f1',
        specialties: ['Database Design', 'API Structure', 'System Architecture'],
        status: 'idle',
    },
    {
        id: 'frontend',
        name: 'Frontend',
        role: 'UI Developer',
        description: 'Creates beautiful user interfaces',
        avatar: '🎨',
        color: '#ec4899',
        specialties: ['React', 'CSS', 'Animations', 'Responsive Design'],
        status: 'idle',
    },
    {
        id: 'backend',
        name: 'Backend',
        role: 'API Developer',
        description: 'Builds secure APIs and server logic',
        avatar: '⚙️',
        color: '#10b981',
        specialties: ['Node.js', 'APIs', 'Authentication', 'Security'],
        status: 'idle',
    },
    {
        id: 'database',
        name: 'Database',
        role: 'Data Engineer',
        description: 'Manages data models and queries',
        avatar: '🗄️',
        color: '#f59e0b',
        specialties: ['PostgreSQL', 'MongoDB', 'Redis', 'Optimization'],
        status: 'idle',
    },
    {
        id: 'devops',
        name: 'DevOps',
        role: 'Infrastructure',
        description: 'Handles deployment and scaling',
        avatar: '🚀',
        color: '#8b5cf6',
        specialties: ['Docker', 'CI/CD', 'Cloud', 'Monitoring'],
        status: 'idle',
    },
    {
        id: 'qa',
        name: 'QA',
        role: 'Quality Assurance',
        description: 'Tests and ensures quality',
        avatar: '🔍',
        color: '#06b6d4',
        specialties: ['Testing', 'Bug Fixing', 'Performance', 'Accessibility'],
        status: 'idle',
    },
];

// Action icons and labels
export const ACTION_CONFIG: Record<ActionType, { icon: string; label: string; color: string }> = {
    thinking: { icon: '🤔', label: 'Thinking', color: '#6366f1' },
    analyzing: { icon: '🔍', label: 'Analyzing', color: '#8b5cf6' },
    planning: { icon: '📋', label: 'Planning', color: '#a855f7' },
    creating: { icon: '✨', label: 'Creating', color: '#22c55e' },
    editing: { icon: '✏️', label: 'Editing', color: '#f59e0b' },
    writing: { icon: '📝', label: 'Writing', color: '#3b82f6' },
    reading: { icon: '👁️', label: 'Reading', color: '#64748b' },
    searching: { icon: '🔎', label: 'Searching', color: '#06b6d4' },
    generating: { icon: '⚡', label: 'Generating', color: '#ec4899' },
    optimizing: { icon: '🚀', label: 'Optimizing', color: '#f97316' },
    deploying: { icon: '🌐', label: 'Deploying', color: '#10b981' },
    testing: { icon: '🧪', label: 'Testing', color: '#14b8a6' },
    fixing: { icon: '🔧', label: 'Fixing', color: '#ef4444' },
    complete: { icon: '✅', label: 'Complete', color: '#22c55e' },
};

// Build workflow with realistic AI actions
export const BUILD_WORKFLOW: AIAction[][] = [
    // Phase 1: Understanding
    [
        { type: 'thinking', description: 'Understanding your request...', icon: '🤔' },
        { type: 'analyzing', target: 'requirements', description: 'Analyzing requirements and constraints...', icon: '🔍' },
        { type: 'planning', description: 'Planning the application architecture...', icon: '📋' },
    ],
    // Phase 2: Database
    [
        { type: 'creating', target: 'schema.prisma', description: 'Creating database schema...', icon: '✨' },
        { type: 'writing', target: 'schema.prisma', description: 'Writing table definitions...', icon: '📝' },
        { type: 'generating', target: 'migrations', description: 'Generating database migrations...', icon: '⚡' },
    ],
    // Phase 3: Backend
    [
        { type: 'creating', target: 'api/routes.ts', description: 'Creating API routes...', icon: '✨' },
        { type: 'writing', target: 'api/auth.ts', description: 'Writing authentication logic...', icon: '📝' },
        { type: 'writing', target: 'lib/db.ts', description: 'Writing database utilities...', icon: '📝' },
        { type: 'editing', target: 'middleware.ts', description: 'Editing middleware configuration...', icon: '✏️' },
    ],
    // Phase 4: Frontend
    [
        { type: 'creating', target: 'components/', description: 'Creating UI components...', icon: '✨' },
        { type: 'writing', target: 'Header.tsx', description: 'Writing Header component...', icon: '📝' },
        { type: 'writing', target: 'Dashboard.tsx', description: 'Writing Dashboard component...', icon: '📝' },
        { type: 'writing', target: 'globals.css', description: 'Writing global styles...', icon: '📝' },
        { type: 'editing', target: 'App.tsx', description: 'Editing main App component...', icon: '✏️' },
    ],
    // Phase 5: Testing & Optimization  
    [
        { type: 'testing', description: 'Running component tests...', icon: '🧪' },
        { type: 'optimizing', description: 'Optimizing bundle size...', icon: '🚀' },
        { type: 'fixing', target: 'warnings', description: 'Fixing linting warnings...', icon: '🔧' },
    ],
    // Phase 6: Final Build
    [
        { type: 'generating', target: 'build', description: 'Generating production build...', icon: '⚡' },
        { type: 'optimizing', description: 'Minifying assets...', icon: '🚀' },
        { type: 'complete', description: 'Build complete! Ready to deploy.', icon: '✅' },
    ],
];

export const DEPLOY_WORKFLOW: AIAction[][] = [
    [
        { type: 'thinking', description: 'Initializing deployment pipeline...', icon: '🤔' },
        { type: 'analyzing', description: 'Checking build artifacts...', icon: '🔍' },
    ],
    [
        { type: 'deploying', target: 'server', description: 'Provisioning serverless functions...', icon: '⚡' },
        { type: 'deploying', target: 'edge', description: 'Distributing to edge network...', icon: '🌐' },
        { type: 'optimizing', description: 'Verifying deployment health...', icon: '🚀' },
    ],
    [
        { type: 'complete', description: '🚀 App is live! Click to view.', icon: '✅' },
    ]
];

// File operations messages
export const FILE_OPERATIONS = {
    create: (file: string) => `Created \`${file}\``,
    edit: (file: string) => `Edited \`${file}\``,
    write: (file: string, lines: number) => `Wrote ${lines} lines to \`${file}\``,
    delete: (file: string) => `Deleted \`${file}\``,
    read: (file: string) => `Read \`${file}\``,
};

// Generated files structure
export const GENERATED_FILES = [
    { name: 'App.tsx', lines: 45, status: 'created' },
    { name: 'Header.tsx', lines: 62, status: 'created' },
    { name: 'Dashboard.tsx', lines: 128, status: 'created' },
    { name: 'globals.css', lines: 89, status: 'created' },
    { name: 'api/routes.ts', lines: 76, status: 'created' },
    { name: 'lib/db.ts', lines: 34, status: 'created' },
    { name: 'schema.prisma', lines: 28, status: 'created' },
];

export const CODE_TEMPLATES: Record<string, Record<string, string>> = {
    react: {
        'App.tsx': `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}`,
        'Header.tsx': `import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">✨</span>
          <span className="logo-text">MyApp</span>
        </Link>
        
        <nav className={isMenuOpen ? 'nav open' : 'nav'}>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/settings">Settings</Link>
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}`,
        'Dashboard.tsx': `import { useState, useEffect } from 'react';
import { LineChart, BarChart, Stats } from '../components/Charts';
import './Dashboard.css';

interface DashboardData {
  users: number;
  revenue: number;
  orders: number;
  growth: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <main className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <Stats label="Total Users" value={data?.users} icon="👥" />
        <Stats label="Revenue" value={\`$\${data?.revenue}\`} icon="💰" />
        <Stats label="Orders" value={data?.orders} icon="📦" />
        <Stats label="Growth" value={\`\${data?.growth}%\`} icon="📈" />
      </div>

      <div className="charts-grid">
        <LineChart title="Revenue Over Time" />
        <BarChart title="Orders by Category" />
      </div>
    </main>
  );
}`,
        'globals.css': `/* Prime Engine Generated Styles */
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --secondary: #64748b;
  --background: #0f172a;
  --foreground: #f8fafc;
  --card: #1e293b;
  --border: #334155;
  --radius: 12px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--background);
  color: var(--foreground);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
}`,
        'routes.ts': `import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { db } from '../lib/database';

const router = express.Router();

// Dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const [users, orders, revenue] = await Promise.all([
      db.users.count(),
      db.orders.count(),
      db.orders.sum('total'),
    ]);

    const lastMonth = await db.orders.count({ 
      where: { createdAt: { gte: thirtyDaysAgo } } 
    });
    const growth = ((orders - lastMonth) / lastMonth * 100).toFixed(1);

    res.json({ users, orders, revenue, growth });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// CRUD for items
router.get('/items', async (req, res) => {
  const items = await db.items.findMany();
  res.json(items);
});

router.post('/items', authenticateToken, async (req, res) => {
  const item = await db.items.create({ data: req.body });
  res.status(201).json(item);
});

router.put('/items/:id', authenticateToken, async (req, res) => {
  const item = await db.items.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(item);
});

router.delete('/items/:id', authenticateToken, async (req, res) => {
  await db.items.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;`,
        'package.json': `{
  "name": "prime-app",
  "private": true,
  "version": "0.0.0"
}`,
    },
};
