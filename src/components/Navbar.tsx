import React from 'react';
import { AssessmentStage } from '../types';
import { Cpu, ArrowLeft, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentStage: AssessmentStage;
  setStage: (stage: AssessmentStage) => void;
  isAssessorMode: boolean;
  setIsAssessorMode: (val: boolean) => void;
  onResetDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  setStage,
}) => {
  const stageLabels: Record<number, string> = {
    1: 'Landing Page & Sign In',
    2: 'Candidate Profile',
    3: 'Senior Assessor Review',
    4: 'Assessment Access Gate',
    5: 'AI Adaptive Assessment',
    6: 'Assessment Completion',
    7: 'AI Competency Scoring',
    8: 'Results & Executive Roadmap'
  };

  const handlePrev = () => {
    if (currentStage > 1) {
      setStage((currentStage - 1) as AssessmentStage);
    }
  };

  const handleNext = () => {
    if (currentStage < 8) {
      setStage((currentStage + 1) as AssessmentStage);
    }
  };

  return (
    <header style={{
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(8, 11, 17, 0.95)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0.85rem 2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* TOP LEFT CORNER: Brand + Arrow Navigation to move to next/prev step */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} onClick={() => setStage(1)}>
            <div style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
              padding: '0.4rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Cpu size={18} color="#FFF" />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: '#FFF' }}>
              MODUS <span style={{ color: '#38BDF8' }}>AI</span>
            </span>
          </div>

          <div style={{ height: '20px', width: '1px', background: 'rgba(255,255,255,0.15)' }} />

          {/* TOP LEFT ARROW NAVIGATION */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handlePrev}
              disabled={currentStage <= 1}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: currentStage <= 1 ? '#475569' : '#FFF',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: currentStage <= 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="Previous Step"
            >
              <ArrowLeft size={15} />
              <span>Back</span>
            </button>

            <span className="badge badge-purple" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
              Step {currentStage} of 8: {stageLabels[currentStage]}
            </span>

            <button
              onClick={handleNext}
              disabled={currentStage >= 8}
              style={{
                background: 'rgba(99, 102, 241, 0.2)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                color: currentStage >= 8 ? '#475569' : '#818CF8',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: currentStage >= 8 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="Next Step"
            >
              <span>Next Step</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* TOP RIGHT: Return to Home / Landing Page */}
        <button
          onClick={() => setStage(1)}
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Return to Landing Page
        </button>
      </div>
    </header>
  );
};
