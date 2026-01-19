'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import TiltCard from '@/components/TiltCard';
import Orb3D from '@/components/Orb3D';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!name || !email || !password) {
            setError('Please fill all fields');
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Update display name
            await updateProfile(userCredential.user, {
                displayName: name
            });
            router.push('/dashboard');
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already registered');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters');
            } else {
                setError('Failed to create account. Please try again.');
            }
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to sign up with Google');
            setIsLoading(false);
        }
    };

    const handleGithubSignup = () => {
        setIsLoading(true);
        setTimeout(() => router.push('/build'), 1000);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-form-section">
                    <Link href="/" className="logo">
                        <div className="logo-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                            </svg>
                        </div>
                        Prime Engine
                    </Link>

                    <div className="form-content">
                        <h1>Create Account</h1>
                        <p className="subtitle">Start building amazing apps with AI</p>

                        <div className="social-buttons">
                            <button className="social-btn" onClick={handleGoogleSignup} disabled={isLoading}>
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <button className="social-btn" onClick={handleGithubSignup} disabled={isLoading}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                Continue with GitHub
                            </button>
                        </div>

                        <div className="divider"><span>or continue with email</span></div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {error && <div className="error-msg">{error}</div>}

                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-btn" disabled={isLoading}>
                                {isLoading ? <span className="spinner" /> : 'Create Account'}
                            </button>
                        </form>

                        <p className="switch-text">
                            Already have an account? <Link href="/signin">Sign in</Link>
                        </p>
                    </div>
                </div>

                <div className="auth-visual">
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
                        <Orb3D />
                    </div>

                    <div className="visual-content">
                        <div className="floating-cards">
                            <div className="card-wrapper card-1">
                                <TiltCard className="visual-card">
                                    <div className="card-icon">🚀</div>
                                    <div className="card-text">Deploy in seconds</div>
                                </TiltCard>
                            </div>
                            <div className="card-wrapper card-2">
                                <TiltCard className="visual-card">
                                    <div className="card-icon">🤖</div>
                                    <div className="card-text">AI-powered builds</div>
                                </TiltCard>
                            </div>
                            <div className="card-wrapper card-3">
                                <TiltCard className="visual-card">
                                    <div className="card-icon">💎</div>
                                    <div className="card-text">Production ready</div>
                                </TiltCard>
                            </div>
                        </div>
                        <h2>Start building today</h2>
                        <p>Join thousands of developers using Prime Engine</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .auth-page {
                    min-height: 100vh;
                    background: var(--background);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    position: relative;
                    overflow: hidden;
                }

                .auth-page::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(circle at 100% 0%, rgba(110, 56, 255, 0.15), transparent 50%),
                        radial-gradient(circle at 0% 100%, rgba(255, 77, 0, 0.1), transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(110, 56, 255, 0.05), transparent 50%);
                    animation: pulse-bg 10s ease-in-out infinite alternate;
                }

                @keyframes pulse-bg {
                    0% { opacity: 0.5; transform: scale(1); }
                    100% { opacity: 1; transform: scale(1.1); }
                }

                .auth-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    width: 100%;
                    max-width: 1100px;
                    min-height: 700px;
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(40px);
                    -webkit-backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    border-radius: 32px;
                    overflow: hidden;
                    box-shadow: 
                        0 25px 50px -12px rgba(0, 0, 0, 0.1),
                        0 0 0 1px rgba(255, 255, 255, 0.5) inset;
                    position: relative;
                    z-index: 10;
                    margin-top: 2rem;
                    animation: slide-up 0.8s var(--bezier-cinematic) forwards;
                    opacity: 0;
                    transform: translateY(20px);
                }

                @keyframes slide-up {
                    to { opacity: 1; transform: translateY(0); }
                }

                .auth-form-section {
                    padding: 4rem;
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 800;
                    font-size: 1.25rem;
                    color: var(--foreground);
                    text-decoration: none;
                    margin-bottom: 3rem;
                    letter-spacing: -0.02em;
                    width: fit-content;
                }

                .logo-icon {
                    width: 38px;
                    height: 38px;
                    background: var(--foreground);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    transition: transform 0.3s var(--bezier-cinematic);
                }

                .logo:hover .logo-icon {
                    transform: rotate(10deg);
                }

                .form-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    max-width: 380px;
                    margin: 0 auto;
                    width: 100%;
                }

                h1 {
                    font-size: 2.75rem;
                    font-weight: 800;
                    color: var(--foreground);
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.04em;
                    line-height: 1.1;
                    background: linear-gradient(to right, var(--foreground), var(--secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .subtitle {
                    color: var(--secondary);
                    font-size: 1.1rem;
                    margin-bottom: 2.5rem;
                    font-weight: 500;
                }

                .social-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }

                .social-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    padding: 0.9rem;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    color: var(--foreground);
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s var(--bezier-cinematic);
                    position: relative;
                }

                .social-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                    border-color: #cbd5e1;
                    background: #fdfdff;
                }

                .divider {
                    display: flex;
                    align-items: center;
                    margin: 2rem 0;
                    color: var(--secondary);
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .divider::before,
                .divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(to right, transparent, #e2e8f0, transparent);
                }

                .divider span { padding: 0 1rem; }

                .auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .error-msg {
                    padding: 0.75rem 1rem;
                    background: rgba(239, 68, 68, 0.08);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    border-radius: 12px;
                    color: #ef4444;
                    font-size: 0.9rem;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    animation: shake 0.4s var(--bezier-cinematic);
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    position: relative;
                }

                .form-group label {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--foreground);
                    margin-left: 0.25rem;
                }

                .form-group input {
                    width: 100%;
                    padding: 1rem 1.25rem;
                    background: rgba(255, 255, 255, 0.5);
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    color: var(--foreground);
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s var(--bezier-cinematic);
                    font-weight: 500;
                }

                .form-group input:focus {
                    background: white;
                    border-color: var(--primary);
                    box-shadow: 
                        0 0 0 4px rgba(110, 56, 255, 0.1),
                        0 10px 20px rgba(0,0,0,0.05);
                    transform: translateY(-2px);
                }

                .form-group input::placeholder { color: #94a3b8; }

                .submit-btn {
                    padding: 1.1rem;
                    background: var(--foreground);
                    border: none;
                    border-radius: 100px;
                    color: white;
                    font-size: 1.05rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s var(--bezier-cinematic);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 1rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    position: relative;
                    overflow: hidden;
                }

                .submit-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.6s;
                }

                .submit-btn:hover {
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                    background: #1a1f36;
                }

                .submit-btn:hover::after {
                    transform: translateX(100%);
                }

                .submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255,255,255,0.2);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                .switch-text {
                    text-align: center;
                    color: var(--secondary);
                    font-size: 0.95rem;
                    margin-top: 2rem;
                    font-weight: 500;
                }

                .switch-text a {
                    color: var(--primary);
                    font-weight: 600;
                    text-decoration: none;
                    margin-left: 0.35rem;
                    transition: all 0.2s;
                    position: relative;
                    display: inline-block;
                }

                .switch-text a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 1.5px;
                    background: currentColor;
                    transition: width 0.3s var(--bezier-cinematic);
                }

                .switch-text a:hover::after {
                    width: 100%;
                }

                .auth-visual {
                    background: var(--silver-gradient);
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem;
                    overflow: hidden;
                    border-left: 1px solid rgba(255,255,255,0.5);
                }

                .visual-content {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    width: 100%;
                    max-width: 440px;
                }

                .visual-content h2 {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: var(--foreground);
                    margin-bottom: 1.25rem;
                    line-height: 1.1;
                    letter-spacing: -0.04em;
                }

                .visual-content p {
                    color: var(--secondary);
                    font-size: 1.2rem;
                    line-height: 1.6;
                    margin: 0 auto;
                    font-weight: 500;
                    opacity: 0.9;
                }

                .floating-cards {
                    margin-bottom: 5rem;
                    position: relative;
                    height: 280px;
                    perspective: 1000px;
                }

                .card-wrapper {
                    position: absolute;
                    z-index: 2;
                    animation: float 6s ease-in-out infinite;
                }

                :global(.visual-card) {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    border-radius: 20px;
                    padding: 1.25rem 1.75rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    box-shadow: 
                        0 20px 40px -4px rgba(0,0,0,0.08),
                        0 8px 16px -4px rgba(0,0,0,0.04);
                    width: max-content;
                    cursor: default;
                }

                .card-icon { font-size: 1.5rem; transform: translateZ(20px); }
                .card-text { 
                    color: var(--foreground); 
                    font-weight: 700; 
                    font-size: 1rem;
                    letter-spacing: -0.01em;
                    transform: translateZ(10px);
                }

                .card-1 { 
                    top: 10%; left: 0%; 
                    animation-delay: 0s; 
                }
                .card-2 { 
                    top: 50%; right: 0%; 
                    animation-delay: 1.5s; 
                    z-index: 3; 
                }
                :global(.card-2 .visual-card) {
                    background: white;
                    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.12);
                }
                .card-3 { 
                    bottom: 10%; left: 10%; 
                    animation-delay: 3s; 
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }

                .visual-gradient { 
                    display: none; 
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(var(--rot)) translateZ(var(--z)); }
                    50% { transform: translateY(-12px) rotate(var(--rot)) translateZ(var(--z)); }
                }

                .visual-gradient {
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(circle at 100% 0%, rgba(110, 56, 255, 0.05), transparent 60%),
                        radial-gradient(circle at 0% 100%, rgba(255, 77, 0, 0.05), transparent 60%);
                }

                @media (max-width: 900px) {
                    .auth-container { 
                        grid-template-columns: 1fr; 
                        max-width: 500px;
                        min-height: auto;
                    }
                    .auth-visual { display: none; }
                    .auth-form-section { padding: 3rem 2rem; }
                }
            `}</style>
        </div >
    );
}
