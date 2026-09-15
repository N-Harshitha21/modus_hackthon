import React, { useState } from 'react';
import { CandidateProfile } from '../types';
import { ShieldCheck, CreditCard, Sparkles, Check, ArrowRight, Lock } from 'lucide-react';

interface PaymentViewProps {
  profile: CandidateProfile;
  onPaymentComplete: (paidDetailedReport: boolean) => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({ profile, onPaymentComplete }) => {
  const [selectedTier, setSelectedTier] = useState<'free' | 'premium'>('premium');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete(selectedTier === 'premium');
    }, 1200);
  };

  return (
    <div className="glass-card fade-in" style={{ padding: '2.5rem', maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38BDF8', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Step 5 of 6 • Checkout & Access Ticket
        </div>
        <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
          Assessment Ticket & Pass Selection
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.5 }}>
          Selected Track: <strong style={{ color: '#38BDF8', textTransform: 'capitalize' }}>{profile.selectedTrack?.replace('_', ' ') || 'Technical Assessment'}</strong>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Tier 1: Standard Assessment ($0) */}
        <div
          onClick={() => setSelectedTier('free')}
          style={{
            background: selectedTier === 'free' ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.03)',
            border: selectedTier === 'free' ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.75rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFF' }}>Standard Assessment Pass</h3>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Included for candidates</div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38BDF8' }}>$0</div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
                <Check size={16} color="#34D399" /> 5-Question AI Adaptive Assessment
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
                <Check size={16} color="#34D399" /> Summary of Findings Dashboard
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
                <Check size={16} color="#34D399" /> Basic Skill Gap Analysis
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748B', textDecoration: 'line-through' }}>
                3-Page Detailed Technical Report ($250)
              </li>
            </ul>
          </div>

          <div style={{ padding: '0.6rem', borderRadius: '6px', background: selectedTier === 'free' ? '#38BDF8' : 'rgba(255,255,255,0.06)', color: selectedTier === 'free' ? '#031222' : '#FFF', textAlign: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
            {selectedTier === 'free' ? 'Selected' : 'Choose Standard ($0)'}
          </div>
        </div>

        {/* Tier 2: Premium $250 Detailed Report Pass */}
        <div
          onClick={() => setSelectedTier('premium')}
          style={{
            background: selectedTier === 'premium' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255, 255, 255, 0.03)',
            border: selectedTier === 'premium' ? '2px solid #FBBF24' : '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.75rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', top: '-0.75rem', right: '1.5rem', background: '#FBBF24', color: '#0F172A', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '12px', textTransform: 'uppercase' }}>
            Recommended
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={18} color="#FBBF24" /> Premium Pass + Report
                </h3>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Full Executive Evaluation</div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FBBF24' }}>$250</div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
                <Check size={16} color="#FBBF24" /> Everything in Standard Pass
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
                <Check size={16} color="#FBBF24" /> <strong>3-Page Detailed Technical Report ($250 Value)</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
                <Check size={16} color="#FBBF24" /> Personalized 6-Month Development Roadmap
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
                <Check size={16} color="#FBBF24" /> Senior Assessor Verification Badge
              </li>
            </ul>
          </div>

          <div style={{ padding: '0.6rem', borderRadius: '6px', background: selectedTier === 'premium' ? '#FBBF24' : 'rgba(255,255,255,0.06)', color: selectedTier === 'premium' ? '#0F172A' : '#FFF', textAlign: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
            {selectedTier === 'premium' ? 'Selected' : 'Choose Premium ($250)'}
          </div>
        </div>
      </div>

      {/* Mock Payment Checkout Form */}
      <form onSubmit={handleCheckout} style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.5rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CreditCard size={18} color="#38BDF8" /> Payment Information ({selectedTier === 'free' ? '$0.00' : '$250.00'})
        </h4>

        {selectedTier === 'premium' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Card Number</label>
              <input
                type="text"
                className="form-input"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Expiry Date</label>
              <input
                type="text"
                className="form-input"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>CVV Code</label>
              <input
                type="password"
                className="form-input"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          style={{
            width: '100%',
            background: selectedTier === 'premium' ? '#FBBF24' : '#38BDF8',
            color: '#031222',
            border: 'none',
            padding: '0.85rem',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            opacity: isProcessing ? 0.7 : 1
          }}
        >
          <Lock size={16} />
          <span>
            {isProcessing
              ? 'Processing Payment...'
              : selectedTier === 'premium'
              ? 'Complete Checkout ($250) & Start Assessment'
              : 'Confirm Free Ticket ($0) & Start Assessment'}
          </span>
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
};
