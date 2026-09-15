import React, { useState } from 'react';
import { CandidateProfile, CandidateResponse, AssessmentMetrics } from '../types';
import { AI_ENGINE } from '../services/aiEngine';
import { DetailedReportView } from './DetailedReportView';
import { Download, CheckCircle2, AlertTriangle, Compass, FileText, ArrowRight, RefreshCw } from 'lucide-react';

interface ResultsViewProps {
  profile: CandidateProfile;
  responses: CandidateResponse[];
  onRestart: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  profile,
  responses,
  onRestart
}) => {
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const metrics: AssessmentMetrics = AI_ENGINE.calculateFinalMetrics(profile, responses);

  if (showDetailedReport) {
    return (
      <DetailedReportView
        profile={profile}
        metrics={metrics}
        onBack={() => setShowDetailedReport(false)}
      />
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '840px', margin: '2rem auto', padding: '0 1rem' }}>
      
      {/* SECTION 9 DASHBOARD CARD */}
      <div className="glass-card" style={{ padding: '3rem 2.5rem', background: '#071827', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '16px' }}>
        
        {/* Title Header */}
        <div style={{ textAlign: 'center', borderBottom: '1px dashed rgba(255, 255, 255, 0.15)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>
            ------------------------------------------
          </span>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: '#FFF', margin: '0.5rem 0' }}>
            YOUR CONSULTING ASSESSMENT
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>
            ------------------------------------------
          </span>
        </div>

        {/* OVERALL SCORE & CONSULTING CAPABILITY METER */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.9rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
            Overall Score
          </div>

          <div style={{ fontSize: '4.5rem', fontWeight: 800, color: '#FFF', margin: '0.5rem 0', fontFamily: 'var(--font-heading)' }}>
            78<span style={{ fontSize: '2rem', color: '#94A3B8' }}>/100</span>
          </div>

          <div style={{ maxWidth: '500px', margin: '1rem auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '0.35rem', fontWeight: 600 }}>
              <span>Consulting Capability</span>
              <span style={{ color: '#38BDF8' }}>78 / 100</span>
            </div>
            
            {/* Visual Bar: ████████████████░░░░ */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              height: '22px',
              borderRadius: '6px',
              overflow: 'hidden',
              display: 'flex',
              padding: '2px'
            }}>
              <div style={{
                width: '78%',
                background: 'linear-gradient(90deg, #38BDF8 0%, #84CC16 100%)',
                borderRadius: '4px'
              }} />
            </div>
          </div>
        </div>

        {/* YOUR STRENGTHS SECTION */}
        <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>YOUR STRENGTHS</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span style={{ color: '#E2E8F0', fontWeight: 600 }}>✓ Problem Structuring</span>
              <strong style={{ color: '#34D399', fontSize: '1.1rem' }}>87</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span style={{ color: '#E2E8F0', fontWeight: 600 }}>✓ Communication</span>
              <strong style={{ color: '#34D399', fontSize: '1.1rem' }}>84</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span style={{ color: '#E2E8F0', fontWeight: 600 }}>✓ Business Analysis</span>
              <strong style={{ color: '#34D399', fontSize: '1.1rem' }}>81</strong>
            </div>
          </div>
        </div>

        {/* SKILL GAPS SECTION */}
        <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>SKILL GAPS</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <span style={{ color: '#E2E8F0', fontWeight: 600 }}>! Transformation</span>
              <strong style={{ color: '#FBBF24', fontSize: '1.1rem' }}>58</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <span style={{ color: '#E2E8F0', fontWeight: 600 }}>! Operating Model</span>
              <strong style={{ color: '#FBBF24', fontSize: '1.1rem' }}>61</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <span style={{ color: '#E2E8F0', fontWeight: 600 }}>! Stakeholder Management</span>
              <strong style={{ color: '#FBBF24', fontSize: '1.1rem' }}>64</strong>
            </div>
          </div>
        </div>

        {/* DEVELOPMENT PRIORITIES SECTION */}
        <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '1.75rem', marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
            DEVELOPMENT PRIORITIES
          </h3>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', padding: '1.25rem 1.5rem', lineHeight: 1.8, fontSize: '0.95rem', color: '#E2E8F0' }}>
            <div>1. Transformation Management</div>
            <div>2. Operating Model</div>
            <div>3. Stakeholder Management</div>
          </div>
        </div>

        {/* VIEW DETAILED REPORT BUTTON */}
        <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '2rem', textAlign: 'center' }}>
          <button
            onClick={() => setShowDetailedReport(true)}
            style={{
              background: '#84CC16',
              color: '#061B2B',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 6px 20px rgba(132, 204, 22, 0.4)'
            }}
          >
            <FileText size={20} />
            <span>VIEW DETAILED REPORT</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
