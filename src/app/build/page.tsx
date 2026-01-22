'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Orb3D from '@/components/Orb3D';
import { AI_MODELS, AI_AGENTS, BUILD_WORKFLOW, DEPLOY_WORKFLOW, ACTION_CONFIG, CODE_TEMPLATES, GENERATED_FILES, AIModel, AIAgent, AIAction, ActionType } from '@/lib/ai-agents';

interface Message {
    id: string;
    type: 'user' | 'ai' | 'action' | 'file' | 'complete';
    content: string;
    timestamp: Date;
    actionType?: ActionType;
    target?: string;
}

interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
    language?: string;
}

export default function BuildPage() {
    const [appTitle, setAppTitle] = useState('Untitled App');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [isBuilding, setIsBuilding] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    const [buildComplete, setBuildComplete] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [activePanel, setActivePanel] = useState<'preview' | 'code'>('preview');
    const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [selectedFile, setSelectedFile] = useState<string>('App.tsx');
    const [messages, setMessages] = useState<Message[]>([]);
    const [showModelPicker, setShowModelPicker] = useState(false);
    const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);
    const [agents, setAgents] = useState<AIAgent[]>(AI_AGENTS);
    const [showAgentPanel, setShowAgentPanel] = useState(true);
    const [generatedCode, setGeneratedCode] = useState<Record<string, string>>({});
    const [generatedHTML, setGeneratedHTML] = useState('');
    const [buildProgress, setBuildProgress] = useState(0);
    const [currentAction, setCurrentAction] = useState<AIAction | null>(null);
    const [filesCreated, setFilesCreated] = useState<string[]>([]);
    const [showChatSidebar, setShowChatSidebar] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([{
            id: '1',
            type: 'ai',
            content: `Hey! 👋 I'm **${selectedModel.name}**. Tell me what you want to build and I'll create it for you.`,
            timestamp: new Date(),
        }]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const [fileStructure, setFileStructure] = useState<FileNode[]>([
        { name: 'package.json', type: 'file', language: 'json' },
    ]);

    const updateFileTree = (path: string) => {
        setFileStructure(prev => {
            const parts = path.split('/');
            const newTree = JSON.parse(JSON.stringify(prev)); // Deep clone
            let currentLevel = newTree;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                const isFile = i === parts.length - 1 && !part.endsWith('/');
                const name = part.replace('/', '');

                let existingNode = currentLevel.find((n: FileNode) => n.name === name);

                if (!existingNode) {
                    const newNode: FileNode = {
                        name,
                        type: isFile ? 'file' : 'folder',
                        children: isFile ? undefined : [],
                        language: isFile ? name.split('.').pop() : undefined
                    };
                    currentLevel.push(newNode);
                    // Sort folders first, then files
                    currentLevel.sort((a: FileNode, b: FileNode) => {
                        if (a.type === b.type) return a.name.localeCompare(b.name);
                        return a.type === 'folder' ? -1 : 1;
                    });
                    existingNode = newNode;
                }

                if (!isFile) {
                    currentLevel = existingNode.children;
                }
            }
            return newTree;
        });
    };

    const updateAgentStatus = (agentId: string, status: AIAgent['status']) => {
        setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status } : a));
    };

    const addActionMessage = (action: AIAction) => {
        const config = ACTION_CONFIG[action.type];
        setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            type: 'action',
            content: action.description,
            timestamp: new Date(),
            actionType: action.type,
            target: action.target,
        }]);
    };

    const addFileMessage = (filename: string, lines: number) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            type: 'file',
            content: `Created \`${filename}\` (${lines} lines)`,
            timestamp: new Date(),
            target: filename,
        }]);
        setFilesCreated(prev => [...prev, filename]);
    };

    const simulateBuild = async (userPrompt: string) => {
        setIsBuilding(true);
        setBuildComplete(false);
        setBuildProgress(0);
        setFilesCreated([]);

        // Reset all agents
        setAgents(AI_AGENTS.map(a => ({ ...a, status: 'idle' })));
        setFileStructure([{ name: 'package.json', type: 'file', language: 'json' }]);
        setGeneratedCode({});

        // Add user message
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'user',
            content: userPrompt,
            timestamp: new Date(),
        }]);

        await new Promise(r => setTimeout(r, 500));

        // Initial AI response
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: `Got it! I'll build that for you. Let me analyze your requirements...`,
            timestamp: new Date(),
        }]);

        await new Promise(r => setTimeout(r, 600));

        // Execute build workflow
        const totalActions = BUILD_WORKFLOW.flat().length;
        let completedActions = 0;
        const agentOrder = ['architect', 'database', 'backend', 'frontend', 'qa', 'devops'];

        for (let phaseIdx = 0; phaseIdx < BUILD_WORKFLOW.length; phaseIdx++) {
            const phase = BUILD_WORKFLOW[phaseIdx];
            const agentId = agentOrder[phaseIdx];

            // Update agent status
            updateAgentStatus(agentId, 'working');

            for (const action of phase) {
                setCurrentAction(action);
                addActionMessage(action);

                completedActions++;
                setBuildProgress(Math.round((completedActions / totalActions) * 100));

                // Simulate file creation for certain actions
                if (action.type === 'creating' && action.target) {
                    await new Promise(r => setTimeout(r, 400));
                    updateFileTree(action.target.includes('/') || action.target.includes('.') ? action.target : `${action.target}/`);
                }
                if (action.type === 'writing' && action.target) {
                    const lines = Math.floor(Math.random() * 80) + 30;
                    await new Promise(r => setTimeout(r, 350));
                    addFileMessage(action.target, lines);
                    // Ensure file exists in tree
                    updateFileTree(action.target);
                    // Add code to generatedCode if template exists
                    if (CODE_TEMPLATES.react[action.target]) {
                        setGeneratedCode(prev => ({
                            ...prev,
                            [action.target!]: CODE_TEMPLATES.react[action.target!]
                        }));
                    }
                }

                await new Promise(r => setTimeout(r, 300));
            }

            updateAgentStatus(agentId, 'done');
            await new Promise(r => setTimeout(r, 200));
        }

        setCurrentAction(null);

        // Set generated code
        setGeneratedCode(CODE_TEMPLATES.react);

        // Generate preview HTML
        setGeneratedHTML(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', system-ui, sans-serif;
                                    background: #ffffff;
                                    min-height: 100vh;
                                    color: #0f172a;
                                    line-height: 1.6;
    }
                                    .header {
                                        padding: 1rem 2rem;
                                    background: rgba(255, 255, 255, 0.8);
                                    backdrop-filter: blur(20px);
                                    border-bottom: 1px solid #e2e8f0;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    position: sticky;
                                    top: 0;
                                    z-index: 100;
    }
                                    .logo {
                                        font - size: 1.25rem;
                                    font-weight: 800;
                                    display: flex;
                                    align-items: center;
                                    gap: 0.5rem;
                                    color: #0f172a;
    }
                                    .logo-icon {
                                        width: 32px;
                                    height: 32px;
                                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                                    border-radius: 8px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: white;
    }
                                    .nav {display: flex; gap: 2rem; }
                                    .nav a {
                                        color: #64748b;
                                    text-decoration: none;
                                    font-size: 0.9rem;
                                    font-weight: 500;
                                    transition: color 0.2s;
    }
                                    .nav a:hover {color: #0f172a; }
                                    .hero {
                                        text - align: center;
                                    padding: 6rem 2rem;
                                    position: relative;
                                    overflow: hidden;
    }
                                    .hero::before {
                                        content: '';
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    height: 100%;
                                    background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05), transparent 70%);
                                    pointer-events: none;
    }
                                    .hero h1 {
                                        font - size: 3.5rem;
                                    font-weight: 800;
                                    margin-bottom: 1.5rem;
                                    background: linear-gradient(135deg, #0f172a, #475569);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    letter-spacing: -0.02em;
    }
                                    .hero p {
                                        font - size: 1.25rem;
                                    color: #64748b;
                                    max-width: 600px;
                                    margin: 0 auto 2.5rem;
                                    line-height: 1.6;
    }
                                    .btn {
                                        padding: 1rem 2.5rem;
                                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                                    color: white;
                                    border: none;
                                    border-radius: 12px;
                                    font-weight: 600;
                                    font-size: 1rem;
                                    cursor: pointer;
                                    transition: all 0.2s;
                                    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
    }
                                    .btn:hover {
                                        transform: translateY(-2px);
                                    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.35);
    }
                                    .features {
                                        display: grid;
                                    grid-template-columns: repeat(3, 1fr);
                                    gap: 2rem;
                                    padding: 4rem 2rem;
                                    max-width: 1200px;
                                    margin: 0 auto;
    }
                                    .feature {
                                        background: white;
                                    padding: 2.5rem;
                                    border-radius: 20px;
                                    border: 1px solid #e2e8f0;
                                    transition: all 0.3s;
                                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
    }
                                    .feature:hover {
                                        transform: translateY(-4px);
                                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01);
                                    border-color: #cbd5e1;
    }
                                    .feature-icon {
                                        width: 48px;
                                    height: 48px;
                                    background: linear-gradient(135deg, #eff6ff, #f3e8ff);
                                    border-radius: 12px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 1.5rem;
                                    margin-bottom: 1.5rem;
                                    color: #6366f1;
    }
                                    .feature h3 {
                                        font - size: 1.25rem;
                                    font-weight: 700;
                                    margin-bottom: 0.75rem;
                                    color: #1e293b;
    }
                                    .feature p {
                                        font - size: 0.95rem;
                                    color: #64748b;
                                    line-height: 1.6;
    }
                                </style>
                            </head>
                            <body>
                                <header class="header">
                                    <div class="logo">
                                        <div class="logo-icon">✨</div>
                                        ${appTitle}
                                    </div>
                                    <nav class="nav">
                                        <a href="#">Home</a>
                                        <a href="#">Features</a>
                                        <a href="#">Pricing</a>
                                        <a href="#">Docs</a>
                                    </nav>
                                </header>

                                <section class="hero">
                                    <h1>Build Faster with AI</h1>
                                    <p>Create beautiful, production-ready applications in minutes.</p>
                                    <button class="btn">Get Started Free</button>
                                </section>

                                <section class="features">
                                    <div class="feature">
                                        <div class="feature-icon">⚡</div>
                                        <h3>Lightning Fast</h3>
                                        <p>Generate full-stack apps in seconds with our optimized AI.</p>
                                    </div>
                                    <div class="feature">
                                        <div class="feature-icon">🎨</div>
                                        <h3>Beautiful Design</h3>
                                        <p>Modern UI with smooth animations and light mode.</p>
                                    </div>
                                    <div class="feature">
                                        <div class="feature-icon">🔒</div>
                                        <h3>Secure</h3>
                                        <p>Built-in authentication and security best practices.</p>
                                    </div>
                                </section>
                            </body>
                        </html>`);

        // Final completion message
        setMessages(prev => [...prev, {
            id: (Date.now() + 2).toString(),
            type: 'complete',
            content: `✅ **Build complete!** I created ${filesCreated.length + GENERATED_FILES.length} files for your app. Check the preview or browse the code!`,
            timestamp: new Date(),
        }]);

        setIsBuilding(false);
        setBuildComplete(true);
        setBuildProgress(100);
    };

    const handleDeploy = async () => {
        if (isDeploying || !buildComplete) return;
        setIsDeploying(true);
        setCurrentAction(null);
        setBuildProgress(0);

        // Reuse devops agent
        updateAgentStatus('devops', 'working');

        const totalActions = DEPLOY_WORKFLOW.flat().length;
        let completedActions = 0;

        for (const phase of DEPLOY_WORKFLOW) {
            for (const action of phase) {
                setCurrentAction(action);
                addActionMessage(action);
                completedActions++;
                setBuildProgress(Math.round((completedActions / totalActions) * 100));
                await new Promise(r => setTimeout(r, 800));
            }
        }

        updateAgentStatus('devops', 'done');
        setCurrentAction(null);
        setIsDeploying(false);
        setBuildProgress(100);

        // Final success message with link
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'complete',
            content: `**Deployment Successful!** 🚀\nYour app is live at: <a href="#" target="_blank" rel="noopener noreferrer" style="color:#818cf8;text-decoration:underline">https://prime-app-${Math.random().toString(36).slice(2, 7)}.vercel.app</a>`,
            timestamp: new Date(),
        }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isBuilding || isDeploying) return;
        simulateBuild(prompt);
        setPrompt('');
    };

    const handleModelChange = (model: AIModel) => {
        setSelectedModel(model);
        setShowModelPicker(false);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'ai',
            content: `Switched to **${model.name}** by ${model.provider}. Ready to build!`,
            timestamp: new Date(),
        }]);
    };

    const previewWidths: Record<string, string> = {
        desktop: '100%',
        tablet: '768px',
        mobile: '375px',
    };

    const getAgentById = (id: string) => agents.find(a => a.id === id);

    const highlightCode = (code: string) => {
        if (!code) return '';
        return code
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') // Escape HTML
            .replace(/\b(import|export|default|function|const|let|var|return|if|else|for|while|await|async|interface|type)\b/g, '<span style="color: #7c3aed">$1</span>') // Keywords (Purple)
            .replace(/\b(from)\b/g, '<span style="color: #7c3aed">$1</span>')
            .replace(/'([^']*)'/g, '<span style="color: #059669">\'$1\'</span>') // Strings (Emerald)
            .replace(/"([^"]*)"/g, '<span style="color: #059669">"$1"</span>')
            .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #db2777">$1</span>') // Booleans (Pink)
            .replace(/\b(console|log|map|filter|find|push|useState|useEffect|useRef)\b/g, '<span style="color: #2563eb">$1</span>') // Built-ins (Blue)
            .replace(/\/\/.*$/gm, '<span style="color: #94a3b8">$&</span>') // Comments (Slate)
            .replace(/\b(number|string|boolean|any|void)\b/g, '<span style="color: #d97706">$1</span>'); // Types (Amber)
    };

    const renderFileTree = (nodes: FileNode[], depth = 0) => (
        <div style={{ marginLeft: depth > 0 ? '1rem' : 0 }}>
            {nodes.map((node, idx) => (
                <motion.div
                    key={node.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                >
                    <div
                        onClick={() => node.type === 'file' && setSelectedFile(node.name)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.35rem 0.5rem',
                            borderRadius: '6px',
                            cursor: node.type === 'file' ? 'pointer' : 'default',
                            background: selectedFile === node.name ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                            color: selectedFile === node.name ? '#818cf8' : '#64748b',
                            fontSize: '0.8rem',
                            transition: 'all 0.15s',
                        }}
                    >
                        <span>{node.type === 'folder' ? '📁' : '📄'}</span>
                        <span>{node.name}</span>
                    </div>
                    {node.children && renderFileTree(node.children, depth + 1)}
                </motion.div>
            ))}
        </div>
    );

    const renderMessage = (msg: Message) => {
        if (msg.type === 'action') {
            const config = msg.actionType ? ACTION_CONFIG[msg.actionType] : null;
            return (
                <div key={msg.id} className="action-message">
                    <div className="action-icon" style={{ background: config?.color || '#6366f1' }}>
                        {config?.icon || '⚡'}
                    </div>
                    <div className="action-content">
                        <span className="action-label" style={{ color: config?.color, marginRight: '0.5rem' }}>
                            {config?.label}
                        </span>
                        {msg.target && <code className="action-target">{msg.target}</code>}
                        <span className="action-desc">{msg.content}</span>
                    </div>
                </div>
            );
        }

        if (msg.type === 'file') {
            return (
                <div key={msg.id} className="file-message">
                    <div className="file-icon">📄</div>
                    <span dangerouslySetInnerHTML={{ __html: msg.content.replace(/`([^`]+)`/g, '<code>$1</code>') }} />
                </div>
            );
        }

        if (msg.type === 'complete') {
            return (
                <div key={msg.id} className="message ai complete">
                    <div className="msg-avatar ai">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                        </svg>
                    </div>
                    <div className="msg-content success" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
            );
        }

        return (
            <div key={msg.id} className={`message ${msg.type}`}>
                {msg.type === 'ai' && (
                    <div className="msg-avatar ai">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                        </svg>
                    </div>
                )}
                <div className="msg-content" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
        );
    };

    return (
        <div className="build-page">
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <Orb3D style={{ right: 'auto', left: '-10%', top: '10%' }} />
            </div>
            {/* Top Header */}
            <header className="top-bar">
                <div className="top-left">
                    <Link href="/dashboard" className="logo">
                        <div className="logo-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                            </svg>
                        </div>
                        Prime Engine
                    </Link>
                    <span className="divider">/</span>
                    {isEditingTitle ? (
                        <input
                            type="text"
                            value={appTitle}
                            onChange={(e) => setAppTitle(e.target.value)}
                            onBlur={() => setIsEditingTitle(false)}
                            onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                            autoFocus
                            className="title-input"
                        />
                    ) : (
                        <span className="app-title" onClick={() => setIsEditingTitle(true)}>
                            {appTitle}
                            <span className="edit-icon">✏️</span>
                        </span>
                    )}
                </div>

                {/* Model Picker */}
                <div className="model-picker-wrapper">
                    <button
                        className="model-btn"
                        onClick={() => setShowModelPicker(!showModelPicker)}
                    >
                        <span>{selectedModel.icon}</span>
                        <span>{selectedModel.name}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>

                    {showModelPicker && (
                        <div className="model-dropdown">
                            <div className="model-dropdown-header">Select Model</div>
                            {AI_MODELS.map(model => (
                                <button
                                    key={model.id}
                                    className={`model-option ${selectedModel.id === model.id ? 'active' : ''}`}
                                    onClick={() => handleModelChange(model)}
                                >
                                    <div className="model-info">
                                        <span className="model-icon">{model.icon}</span>
                                        <div>
                                            <div className="model-name">{model.name}</div>
                                            <div className="model-provider">{model.provider}</div>
                                        </div>
                                    </div>
                                    <div className="model-badges">
                                        <span className={`badge ${model.speed}`}>{model.speed}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="top-right">
                    <button className="btn-icon" onClick={() => setShowAgentPanel(!showAgentPanel)}>
                        🤖
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                navigator.clipboard.writeText(window.location.href);
                                setIsCopied(true);
                                setTimeout(() => setIsCopied(false), 2000);
                            }
                        }}
                    >
                        {isCopied ? 'Copied!' : 'Share'}
                    </button>
                    <button
                        className="btn-primary"
                        disabled={!buildComplete || isDeploying}
                        onClick={handleDeploy}
                    >
                        <span>{isDeploying ? '⏳' : '🚀'}</span> {isDeploying ? 'Deploying...' : 'Deploy'}
                    </button>
                </div>
            </header>

            {/* Progress Bar */}
            {(isBuilding || isDeploying) && (
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${buildProgress}%` }} />
                </div>
            )}

            {/* Current Action Indicator */}
            {currentAction && (
                <div className="current-action-bar">
                    <div className="action-indicator">
                        <span className="action-spinner" />
                        <span style={{ color: ACTION_CONFIG[currentAction.type]?.color }}>
                            {ACTION_CONFIG[currentAction.type]?.icon} {ACTION_CONFIG[currentAction.type]?.label}
                        </span>
                        {currentAction.target && <code>{currentAction.target}</code>}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="main-content">
                {/* Left Panel - Chat */}
                <aside className={`chat-panel ${showChatSidebar ? 'open' : ''}`}>
                    <div className="chat-header">
                        <div className="chat-title">
                            <div className="ai-avatar">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                                </svg>
                            </div>
                            <span>AI Builder</span>
                        </div>
                        <span className="model-badge">{selectedModel.icon} {selectedModel.name}</span>
                    </div>

                    <div className="messages-area">
                        <AnimatePresence mode='popLayout'>
                            {messages.map(msg => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    layout
                                >
                                    {renderMessage(msg)}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isBuilding && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="message ai"
                            >
                                <div className="msg-avatar ai">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                                    </svg>
                                </div>
                                <div className="msg-content typing">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {buildComplete && (
                        <div className="suggestions">
                            {['Add dark mode', 'Add auth', 'Add animations', 'Add mobile menu'].map(s => (
                                <button key={s} onClick={() => setPrompt(s)} className="suggestion-chip">
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="chat-input-form">
                        <div className="input-wrapper">
                            <button type="button" className="attach-btn">📎</button>
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={isBuilding ? 'Building your app...' : 'What do you want to build?'}
                                disabled={isBuilding}
                            />
                            <button type="submit" disabled={isBuilding || !prompt.trim()} className="send-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </aside>

                <button
                    className="mobile-toggle-chat"
                    onClick={() => setShowChatSidebar(!showChatSidebar)}
                    style={{
                        position: 'fixed',
                        bottom: '1.5rem',
                        left: '1.5rem',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'var(--foreground)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        display: 'none', // Hidden on desktop via CSS
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 100,
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                    }}
                >
                    {showChatSidebar ? '✕' : '💬'}
                </button>

                {/* Agent Panel */}
                <aside className={`agent-panel ${showAgentPanel ? 'open' : ''}`}>
                    <div className="agent-header">
                        <span>🤖 Agents</span>
                        <span className="agent-count">{agents.filter(a => a.status === 'done').length}/{agents.length}</span>
                    </div>
                    <div className="agents-list">
                        {agents.map(agent => (
                            <div key={agent.id} className={`agent-card ${agent.status}`}>
                                <div className="agent-avatar" style={{ background: agent.color }}>
                                    {agent.avatar}
                                </div>
                                <div className="agent-info">
                                    <div className="agent-name">{agent.name}</div>
                                    <div className="agent-role">{agent.role}</div>
                                </div>
                                <div className={`agent-status ${agent.status}`}>
                                    {agent.status === 'idle' && '⏸️'}
                                    {agent.status === 'thinking' && '🤔'}
                                    {agent.status === 'working' && <span className="spinner" />}
                                    {agent.status === 'done' && '✅'}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
                {/* Preview/Code Panel */}
                <main className="preview-panel">
                    <div className="panel-header">
                        <div className="panel-tabs">
                            <button
                                className={activePanel === 'preview' ? 'active' : ''}
                                onClick={() => setActivePanel('preview')}
                            >
                                👁️ Preview
                            </button>
                            <button
                                className={activePanel === 'code' ? 'active' : ''}
                                onClick={() => setActivePanel('code')}
                            >
                                💻 Code
                            </button>
                        </div>

                        {activePanel === 'preview' && (
                            <div className="device-switcher">
                                {(['desktop', 'tablet', 'mobile'] as const).map(device => (
                                    <button
                                        key={device}
                                        className={previewMode === device ? 'active' : ''}
                                        onClick={() => setPreviewMode(device)}
                                        title={device}
                                    >
                                        {device === 'desktop' && '🖥️'}
                                        {device === 'tablet' && '📱'}
                                        {device === 'mobile' && '📲'}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button className="refresh-btn" title="Refresh Preview">
                            🔄
                        </button>
                    </div>

                    <div className="panel-content">
                        {activePanel === 'preview' ? (
                            <div className="preview-container">
                                <div
                                    className="preview-frame"
                                    style={{ width: previewWidths[previewMode] }}
                                >
                                    {generatedHTML ? (
                                        <iframe
                                            srcDoc={generatedHTML}
                                            title="Preview"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                border: 'none',
                                            }}
                                        />
                                    ) : (
                                        <div className="empty-preview">
                                            <div className="empty-icon">✨</div>
                                            <h3>Your App Preview</h3>
                                            <p>Describe what you want to build</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="code-container">
                                <div className="file-explorer">
                                    <div className="file-header">📁 Explorer</div>
                                    {renderFileTree(fileStructure)}
                                </div>
                                <div className="code-editor">
                                    <div className="code-header">
                                        <span className="file-icon">📄</span>
                                        <span>{selectedFile}</span>
                                        <button className="copy-btn" onClick={() => {
                                            if (generatedCode[selectedFile]) {
                                                navigator.clipboard.writeText(generatedCode[selectedFile]);
                                                // Optional: Show toast
                                            }
                                        }}>📋 Copy</button>
                                    </div>
                                    <pre className="code-content">
                                        <code dangerouslySetInnerHTML={{
                                            __html: highlightCode(generatedCode[selectedFile] || CODE_TEMPLATES.react[selectedFile] || '// Select a file to view code')
                                        }} />
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>


            <style jsx>{`
                .build-page {
                    height: 100vh;
                    overflow: hidden;
                    background: var(--background);
                    display: flex;
                    flex-direction: column;
                    color: var(--foreground);
                    font-family: var(--font-inter);
                }

                /* GLASSMORPHIC TOP BAR */
                .top-bar {
                    height: 68px;
                    background: rgba(255, 255, 255, 0.8);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 1.5rem;
                    backdrop-filter: blur(20px);
                    z-index: 100;
                }

                .top-left { display: flex; align-items: center; gap: 1rem; }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 800;
                    font-size: 1rem;
                    color: #0f172a;
                    text-decoration: none;
                    letter-spacing: -0.02em;
                }

                .logo-icon {
                    width: 36px;
                    height: 36px;
                    background: var(--foreground);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .divider { color: #e2e8f0; font-weight: 300; font-size: 1.25rem; }

                .app-title {
                    cursor: pointer;
                    padding: 0.5rem 0.75rem;
                    border-radius: 8px;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #1e293b;
                    font-weight: 600;
                    font-size: 0.95rem;
                    border: 1px solid transparent;
                }
                .app-title:hover { background: #f8fafc; border-color: #e2e8f0; }
                .edit-icon { opacity: 0; font-size: 0.8rem; color: #94a3b8; transform: translateX(-5px); transition: all 0.2s; }
                .app-title:hover .edit-icon { opacity: 1; transform: translateX(0); }

                .title-input {
                    background: white;
                    border: 2px solid var(--primary);
                    border-radius: 8px;
                    padding: 0.4rem 0.75rem;
                    color: #0f172a;
                    outline: none;
                    font-size: 0.95rem;
                    font-weight: 600;
                    box-shadow: 0 0 0 4px rgba(110, 56, 255, 0.1);
                }

                .model-picker-wrapper { position: relative; }

                .model-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.5rem 1rem;
                    background: rgba(255,255,255,0.5);
                    border: 1px solid rgba(0,0,0,0.06);
                    border-radius: 100px;
                    color: #334155;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .model-btn:hover { 
                    background: white; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    transform: translateY(-1px);
                }

                .model-dropdown {
                    position: absolute;
                    top: calc(100% + 12px);
                    left: 50%;
                    transform: translateX(-50%);
                    width: 320px;
                    background: rgba(255,255,255,0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(0,0,0,0.05);
                    border-radius: 16px;
                    padding: 0.5rem;
                    box-shadow: 0 20px 50px -10px rgba(0,0,0,0.15);
                    z-index: 200;
                    animation: slideDown 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }
                    to { opacity: 1; transform: translate(-50%, 0) scale(1); }
                }

                .model-dropdown-header {
                    font-size: 0.7rem;
                    color: #94a3b8;
                    padding: 0.75rem 1rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .model-option {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 0.8rem 1rem;
                    background: transparent;
                    border: none;
                    border-radius: 10px;
                    color: #334155;
                    cursor: pointer;
                    transition: all 0.15s;
                    text-align: left;
                }
                .model-option:hover { background: #f8fafc; }
                .model-option.active { background: #f0f9ff; }

                .model-info { display: flex; align-items: center; gap: 0.75rem; }
                .model-icon { font-size: 1.25rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
                .model-name { font-weight: 600; font-size: 0.95rem; color: #0f172a; }
                .model-provider { font-size: 0.75rem; color: #64748b; margin-top: 2px; }

                .badge {
                    font-size: 0.65rem;
                    padding: 0.2rem 0.5rem;
                    border-radius: 100px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .badge.fast { background: #ecfdf5; color: #059669; }
                .badge.medium { background: #fff7ed; color: #ea580c; }

                .top-right { display: flex; align-items: center; gap: 0.75rem; }

                .btn-icon {
                    width: 40px;
                    height: 40px;
                    background: transparent;
                    border: none;
                    border-radius: 10px;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                }
                .btn-icon:hover { 
                    background: rgba(0,0,0,0.03); 
                    color: var(--foreground);
                    transform: rotate(5deg);
                }

                .btn-secondary {
                    padding: 0.6rem 1.25rem;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 100px;
                    color: #334155;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-secondary:hover { background: #f8fafc; border-color: #cbd5e1; transform: translateY(-1px); }

                .btn-primary {
                    padding: 0.6rem 1.5rem;
                    background: var(--foreground);
                    border: none;
                    border-radius: 100px;
                    color: white;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .btn-primary:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                    background: #1a1a1a;
                }
                .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

                .progress-bar { height: 2px; background: rgba(99, 102, 241, 0.1); width: 100%; position: absolute; top: 68px; z-index: 90; }
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
                    transition: width 0.4s ease;
                    box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
                }

                .current-action-bar {
                    height: 40px;
                    background: rgba(255,255,255,0.9);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    color: #64748b;
                    z-index: 40;
                }

                .action-indicator { display: flex; align-items: center; gap: 0.6rem; }
                .action-indicator code {
                    background: rgba(99, 102, 241, 0.05);
                    border: 1px solid rgba(99, 102, 241, 0.1);
                    padding: 0.15rem 0.5rem;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    color: #6366f1;
                    font-weight: 600;
                    font-family: 'JetBrains Mono', monospace;
                }

                .action-spinner {
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(0,0,0,0.1);
                    border-top-color: var(--primary);
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                /* RESPONSIVE LAYOUT */
                .main-content {
                    flex: 1;
                    display: flex;
                    overflow: hidden;
                    position: relative;
                    flex-direction: row;
                }

                @media (max-width: 1024px) {
                    .chat-panel {
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        width: 320px !important;
                        transform: translateX(-100%);
                        transition: transform 0.4s var(--bezier-cinematic);
                        z-index: 50;
                    }
                    .chat-panel.open {
                        transform: translateX(0);
                    }
                    .agent-panel {
                        position: absolute;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        width: 240px !important;
                        transform: translateX(100%);
                        transition: transform 0.4s var(--bezier-cinematic);
                        z-index: 50;
                    }
                    .agent-panel.open {
                        transform: translateX(0);
                    }
                    .mobile-toggle-chat {
                        display: flex !important;
                    }
                }

                @media (max-width: 768px) {
                    .top-bar {
                        padding: 0 1rem;
                        height: 60px;
                    }
                    .divider { display: none; }
                    .logo { font-size: 0.9rem; }
                    .chat-panel {
                        width: 100% !important;
                    }
                    .preview-container {
                        padding: 1rem;
                    }
                    .preview-frame {
                        width: 100% !important;
                    }
                }

                /* MODERN CHAT PANEL */
                .chat-panel {
                    width: 400px;
                    background: rgba(255, 255, 255, 0.75);
                    border-right: 1px solid rgba(0,0,0,0.05);
                    display: flex;
                    flex-direction: column;
                    z-index: 20;
                    box-shadow: 10px 0 40px rgba(0,0,0,0.02);
                    backdrop-filter: blur(20px);
                    transition: width 0.3s ease;
                }

                .chat-header {
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: rgba(255,255,255,0.5);
                }

                .chat-title {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #0f172a;
                }

                .ai-avatar {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
                }

                .messages-area {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    background: #fdfdfd;
                    background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
                    background-size: 20px 20px;
                }

                .message {
                    display: flex;
                    gap: 1rem;
                    max-width: 90%;
                    animation: slideUp 0.3s var(--bezier-cinematic);
                }
                
                .message.user { flex-direction: row-reverse; align-self: flex-end; }

                .msg-content {
                    padding: 1rem 1.25rem;
                    background: white;
                    border-radius: 18px;
                    border-top-left-radius: 4px;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #334155;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                    border: 1px solid rgba(0,0,0,0.05);
                }
                
                .message.user .msg-content {
                    background: var(--foreground);
                    color: white;
                    border-radius: 18px;
                    border-top-right-radius: 4px;
                    border: none;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                }

                .msg-avatar { 
                    width: 36px; height: 36px; 
                    flex-shrink: 0; 
                    border-radius: 10px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    background: white; 
                    border: 1px solid rgba(0,0,0,0.05); 
                    box-shadow: 0 4px 8px rgba(0,0,0,0.02);
                }
                .msg-avatar.ai { 
                    background: linear-gradient(135deg, #6E38FF, #9D75FF); 
                    border: none; 
                    color: white; 
                    box-shadow: 0 4px 12px rgba(110, 56, 255, 0.25);
                }

                .typing { display: flex; gap: 4px; padding: 1.2rem; align-items: center; }
                .dot {
                    width: 6px; height: 6px;
                    background: #6366f1;
                    border-radius: 50%;
                    animation: bounce 1.4s infinite ease-in-out both;
                }
                .dot:nth-child(1) { animation-delay: -0.32s; }
                .dot:nth-child(2) { animation-delay: -0.16s; }

                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }

                .action-message {
                    display: flex;
                    gap: 1rem;
                    padding: 0.5rem 0.5rem 0.5rem 3.5rem;
                }

                .action-icon {
                    width: 24px; height: 24px;
                    border-radius: 50%;
                    background: white;
                    border: 1px solid rgba(0,0,0,0.05);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.75rem;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                }

                .action-content { font-size: 0.85rem; color: #64748b; display: flex; flex-direction: column; gap: 0.2rem; }
                .action-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8; }
                .action-target {
                    font-family: 'JetBrains Mono', monospace;
                    background: rgba(0,0,0,0.04);
                    padding: 0 0.4rem;
                    border-radius: 4px;
                    color: var(--primary);
                    font-size: 0.75rem;
                    display: inline-block;
                    width: fit-content;
                }

                .file-message {
                    margin-left: 3.5rem;
                    background: rgba(255,255,255,0.8);
                    border: 1px solid rgba(0,0,0,0.05);
                    border-radius: 12px;
                    padding: 0.75rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 0.9rem;
                    color: #334155;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.02);
                }
                .file-icon { font-size: 1.1rem; }

                .suggestions {
                    padding: 1rem 1.5rem;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.6rem;
                    background: white;
                    border-top: 1px solid rgba(0,0,0,0.05);
                }

                .suggestion-chip {
                    padding: 0.5rem 1rem;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 100px;
                    color: #64748b;
                    font-size: 0.8rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .suggestion-chip:hover {
                    border-color: var(--primary);
                    color: var(--primary);
                    background: rgba(99, 102, 241, 0.04);
                    transform: translateY(-1px);
                }

                .chat-input-form {
                    padding: 1.5rem;
                    background: white;
                    border-top: 1px solid rgba(0,0,0,0.05);
                }

                .input-wrapper {
                    display: flex;
                    gap: 0.75rem;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 0.6rem;
                    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
                }

                .input-wrapper:focus-within {
                    background: white;
                    border-color: var(--primary);
                    box-shadow: 0 4px 20px rgba(110, 56, 255, 0.15);
                    transform: translateY(-2px);
                }

                .attach-btn {
                    width: 36px; height: 36px;
                    border: none; background: transparent;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1.1rem;
                    color: #94a3b8;
                    transition: all 0.2s;
                }
                .attach-btn:hover { background: rgba(0,0,0,0.05); color: #475569; }

                .input-wrapper input {
                    flex: 1;
                    border: none; background: transparent;
                    font-size: 0.95rem;
                    color: #0f172a;
                    outline: none;
                }
                .input-wrapper input::placeholder { color: #94a3b8; }

                .send-btn {
                    width: 40px; height: 40px;
                    background: var(--foreground);
                    border: none;
                    border-radius: 12px;
                    color: white;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .send-btn:hover:not(:disabled) {
                    transform: scale(1.05);
                    background: var(--primary);
                    box-shadow: 0 4px 12px rgba(110, 56, 255, 0.3);
                }
                .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .agent-panel {
                    width: 240px;
                    background: #ffffff;
                    border-right: 1px solid rgba(0,0,0,0.05);
                    z-index: 10;
                }
                
                .agent-header {
                    height: 56px;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    padding: 0 1rem;
                    display: flex; align-items: center; justify-content: space-between;
                    font-weight: 700; color: #0f172a; font-size: 0.9rem;
                }

                .agents-list { padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }

                .agent-card {
                    display: flex; align-items: center; gap: 0.75rem;
                    padding: 0.75rem;
                    border-radius: 12px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    transition: all 0.2s;
                }
                .agent-card:hover { border-color: #cbd5e1; transform: translateY(-1px); }
                .agent-card.working { 
                    border-color: #bfdbfe; background: #eff6ff; 
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
                }
                
                .agent-avatar {
                    width: 32px; height: 32px;
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    background: #f1f5f9; font-size: 0.9rem;
                }

                .agent-info { flex: 1; }
                .agent-name { font-weight: 700; font-size: 0.85rem; color: #1e293b; }
                .agent-role { font-size: 0.7rem; color: #64748b; }

                .preview-panel {
                    flex: 1;
                    display: flex; flex-direction: column;
                    background: #f1f5f9;
                    position: relative;
                }

                .panel-header {
                    height: 56px;
                    background: white;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 0 1rem;
                }

                .panel-tabs { display: flex; background: #f1f5f9; padding: 0.25rem; border-radius: 10px; }
                .panel-tabs button {
                    padding: 0.35rem 0.85rem;
                    border-radius: 8px;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .panel-tabs button:hover { color: #0f172a; }
                .panel-tabs button.active { background: white; color: var(--primary); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

                .panel-content { flex: 1; overflow: hidden; position: relative; }
                
                .preview-container {
                    height: 100%;
                    background: #e2e8f0;
                    background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
                    background-size: 30px 30px;
                    display: flex; justify-content: center; padding: 2rem;
                    overflow: auto;
                }

                .preview-frame {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 
                        0 0 0 1px rgba(0,0,0,0.05),
                        0 20px 50px -10px rgba(0,0,0,0.2),
                        0 10px 20px -5px rgba(0,0,0,0.1);
                    transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .empty-preview {
                    height: 100%;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    gap: 1rem; color: #64748b;
                }
                .empty-icon { font-size: 4rem; margin-bottom: 0.5rem; opacity: 0.5; filter: grayscale(1); }
                .empty-preview h3 { font-size: 1.5rem; color: #0f172a; }

                .code-container { height: 100%; display: flex; background: white; }
                .file-explorer {
                    width: 220px;
                    background: #f8fafc;
                    border-right: 1px solid #e2e8f0;
                    padding: 1rem;
                }
                .file-header { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; }

                .code-editor { flex: 1; display: flex; flex-direction: column; }
                .code-header {
                    height: 48px; border-bottom: 1px solid #e2e8f0;
                    display: flex; align-items: center; padding: 0 1rem; gap: 0.75rem;
                    background: white; font-size: 0.9rem; color: #475569;
                }

                .code-content {
                    flex: 1; overflow: auto; padding: 1.5rem;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.85rem; color: #334155; line-height: 1.7;
                }

                .copy-btn {
                    margin-left: auto;
                    padding: 0.3rem 0.6rem;
                    background: #f1f5f9;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    cursor: pointer;
                    color: #64748b;
                }
                .copy-btn:hover { background: #e2e8f0; color: #0f172a; }

                 .device-switcher button {
                    padding: 0.4rem 0.5rem;
                    background: transparent;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 1rem;
                    color: #94a3b8;
                    transition: all 0.2s;
                }
                .device-switcher button:hover { color: #64748b; background: rgba(0,0,0,0.03); }
                .device-switcher button.active {
                    color: var(--primary);
                    background: white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
            `}</style>
        </div >
    );
}
