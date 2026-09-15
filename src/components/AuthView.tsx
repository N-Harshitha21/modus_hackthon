import React, { useState } from 'react';
import { LogIn, UserPlus, ArrowRight, UserCheck, ShieldCheck, Brain, BarChart2 } from 'lucide-react';

interface AuthViewProps {
  onLoginSuccess: (role: 'candidate' | 'assessor') => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [activeModal, setActiveModal] = useState<'signin' | 'signup' | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [email, setEmail] = useState('candidate.demo@modus.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Harshitha N');
  const [consentGiven, setConsentGiven] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('candidate');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0A2540 0%, #081B30 60%, #04101D 100%)',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-body)'
    }}>
      {/* 1. HEADER */}
      <header style={{
        padding: '1.5rem 4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Modus Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveModal(null)}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.75rem', color: '#38BDF8' }}>
            Modus AI
          </span>
        </div>

        {/* Nav Links: About, How It Works, Sign In */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
          <button
            onClick={() => scrollToSection('about')}
            style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.95rem', cursor: 'pointer', fontWeight: 500 }}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.95rem', cursor: 'pointer', fontWeight: 500 }}
          >
            How It Works
          </button>

          <button
            onClick={() => setActiveModal('signin')}
            style={{ background: 'none', border: 'none', color: '#E2E8F0', fontSize: '0.95rem', cursor: 'pointer', fontWeight: 600 }}
          >
            Sign In
          </button>
        </nav>

      </header>

      {/* 2. HERO SECTION */}
      <section style={{
        padding: '5rem 1.5rem 4rem 1.5rem',
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{
          fontSize: '3.6rem',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: '1.25rem',
          color: '#FFFFFF'
        }}>
          Discover Your Potential
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: '#94A3B8',
          maxWidth: '680px',
          lineHeight: 1.6,
          marginBottom: '2.5rem'
        }}>
          Assess your capabilities, identify your strengths and skill gaps, and receive a personalised development pathway.
        </p>

        {/* Hero CTA & Explainer Video Button */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveModal('signup')}
            style={{
              background: '#38BDF8',
              color: '#031222',
              padding: '0.85rem 1.75rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>Start Candidate Assessment</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => setIsVideoOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#F8FAFC',
              padding: '0.85rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>▶</span>
            <span>Watch Explainer Video</span>
          </button>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" style={{
        background: 'rgba(0, 0, 0, 0.25)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '4.5rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
            How It Works
          </h2>
          <p style={{ color: '#94A3B8', marginBottom: '3rem', fontSize: '1.05rem' }}>
            Four structured steps from profile registration to your personalised development report.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {/* Step 1 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '2rem 1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38BDF8', marginBottom: '0.75rem' }}>1. Create Profile</div>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Complete your professional profile with education, experience, LinkedIn, GitHub, and CV.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '2rem 1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FBBF24', marginBottom: '0.75rem' }}>2. Get Approved</div>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Senior/assessor reviews your profile credentials and grants assessment access.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '2rem 1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#A855F7', marginBottom: '0.75rem' }}>3. Take Assessment</div>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.5 }}>
                AI dynamically selects questions based on your responses and demonstrated evidence.
              </p>
            </div>

            {/* Step 4 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '2rem 1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34D399', marginBottom: '0.75rem' }}>4. Get Results</div>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Receive your capability score, strengths, skill gaps and development recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>About Modus AI</h2>
        <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Modus AI is an evidence-based framework designed to measure capability (CCI), potential (CPI), and readiness (CRI). Demonstrated evidence carries higher weight than self-reported claims.
        </p>
      </section>

      {/* 4. FOOTER */}
      <footer style={{
        padding: '2rem 4rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        color: '#64748B',
        fontSize: '0.875rem'
      }}>
        <div>© 2026 Modus AI. All rights reserved.</div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <span style={{ cursor: 'pointer' }}>About</span>
          <span style={{ cursor: 'pointer' }}>Privacy</span>
          <span style={{ cursor: 'pointer' }}>Terms</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
      </footer>

      {/* AUTH MODAL */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2, 11, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '440px',
            padding: '2.5rem 2rem',
            background: '#0B253A',
            borderColor: 'rgba(56, 189, 248, 0.3)',
            borderRadius: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: '#FFF' }}>
                {activeModal === 'signin' ? 'Sign In to Modus AI' : 'Create Candidate Account'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {activeModal === 'signup' && (
                <div className="form-group" style={{ textAlign: 'left' }}>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Candidate Name"
                    required
                  />
                </div>
              )}

              <div className="form-group" style={{ textAlign: 'left' }}>
                <label className="form-label">Work Email ID</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div className="form-group" style={{ textAlign: 'left' }}>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Registration & Evaluation Consent Checkbox */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', margin: '1rem 0 0.5rem 0', textAlign: 'left' }}>
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  required
                  style={{ marginTop: '0.2rem', accentColor: '#38BDF8', cursor: 'pointer' }}
                />
                <label htmlFor="consent" style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.4, cursor: 'pointer' }}>
                  I consent to automated AI candidate evaluation, resume parsing, and storage of my assessment results under privacy terms.
                </label>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: '#84CC16',
                  color: '#061B2B',
                  border: 'none',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{activeModal === 'signin' ? 'Sign In & Launch Profile' : 'Register Account'}</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => onLoginSuccess('candidate')}
                style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', padding: '0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <UserCheck size={13} color="#38BDF8" /> Demo Candidate
              </button>
              <button
                type="button"
                onClick={() => onLoginSuccess('assessor')}
                style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399', padding: '0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <ShieldCheck size={13} color="#34D399" /> Demo Assessor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPLAINER VIDEO MODAL */}
      {isVideoOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2, 11, 20, 0.9)',
          backdropFilter: 'blur(12px)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '800px',
            background: '#081B30',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Brain color="#38BDF8" size={24} /> Modus AI Evaluation Process Explainer
              </h3>
              <button
                onClick={() => setIsVideoOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Universal Video Player Container */}
            <div style={{
              position: 'relative',
              paddingTop: '56.25%',
              background: '#030D18',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(56, 189, 248, 0.4)'
            }}>
              <iframe
                src="https://www.youtube.com/embed/aircAruvnKk?autoplay=1&rel=0&modestbranding=1"
                title="Modus AI Platform Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
              />
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setIsVideoOpen(false);
                  setActiveModal('signup');
                }}
                style={{
                  background: '#38BDF8',
                  color: '#031222',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Proceed to Registration →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
