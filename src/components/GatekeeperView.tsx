import React from 'react';
import { CandidateProfile } from '../types';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

interface GatekeeperViewProps {
  profile: CandidateProfile;
  onStartAssessment: () => void;
  onSwitchToAssessor: () => void;
}

export const GatekeeperView: React.FC<GatekeeperViewProps> = ({
  profile,
  onStartAssessment,
  onSwitchToAssessor
}) => {
  const isApproved = profile.approvalStatus === 'approved';
  const isRejected = profile.approvalStatus === 'rejected';

  return (
    <div className="animate-fade-in" style={{ maxWidth: '720px', margin: '3rem auto', padding: '0 1rem' }}>
      <div className="glass-card" style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
        {/* Dynamic Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: isApproved 
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)' 
            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)',
          border: isApproved 
            ? '1px solid rgba(16, 185, 129, 0.4)' 
            : '1px solid rgba(245, 158, 11, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto'
        }}>
          {isApproved ? (
            <ShieldCheck size={38} color="#34D399" />
          ) : isRejected ? (
            <AlertTriangle size={38} color="#F87171" />
          ) : (
            <Lock size={38} color="#FBBF24" />
          )}
        </div>

        <span className={isApproved ? 'badge badge-emerald' : 'badge badge-amber'} style={{ marginBottom: '0.75rem' }}>
          Stage 4 of 8 • Assessment Access Gate
        </span>

        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
          {isApproved 
            ? 'Senior Approval Granted!' 
            : isRejected 
            ? 'Application Under Review' 
            : 'Awaiting Senior Review Approval'}
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 2rem auto' }}>
          {isApproved 
            ? 'Your profile has been reviewed and verified by the Senior Assessor team. You have been cleared to launch the AI Adaptive Assessment.'
            : 'Candidate profiles must be verified and approved by a Senior Assessor before access to the adaptive evaluation engine is enabled.'}
        </p>

        {/* Approval Card / Assessor Notes */}
        {isApproved ? (
          <div className="glass-panel" style={{ textAlign: 'left', marginBottom: '2rem', borderLeft: '4px solid #10B981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#34D399', marginBottom: '0.5rem' }}>
              <CheckCircle2 size={18} />
              <span>Assessor Clearance Verified</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#D1D5DB', fontStyle: 'italic' }}>
              "{profile.assessorNotes || 'Profile verified. Approved for adaptive assessment.'}"
            </p>
          </div>
        ) : (
          <div className="glass-panel" style={{ textAlign: 'left', marginBottom: '2rem', borderLeft: '4px solid #F59E0B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#FBBF24', marginBottom: '0.5rem' }}>
              <Clock size={18} />
              <span>Gatekeeper Status: Locked</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              To test the full flow in demo mode, you can click the button below to switch to the Senior Assessor Portal and approve this profile.
            </p>
          </div>
        )}

        {/* Action CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {isApproved ? (
            <button
              onClick={onStartAssessment}
              className="btn-primary"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.05rem',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
              }}
            >
              <span>Begin Adaptive Assessment</span>
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={onSwitchToAssessor}
              className="btn-primary"
              style={{ padding: '0.9rem 2rem' }}
            >
              <span>Go to Assessor Portal to Grant Access</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
