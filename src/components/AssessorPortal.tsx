import React, { useState } from 'react';
import { CandidateProfile } from '../types';
import { CheckCircle, XCircle, ExternalLink, ArrowRight, UserCheck, ShieldCheck, GitBranch, Globe } from 'lucide-react';

interface AssessorPortalProps {
  profile: CandidateProfile;
  onApprove: (notes: string) => void;
  onReject: (notes: string) => void;
  onProceedToAccessGate: () => void;
}

export const AssessorPortal: React.FC<AssessorPortalProps> = ({
  profile,
  onApprove,
  onReject,
  onProceedToAccessGate
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);
  const [notes, setNotes] = useState(
    profile.assessorNotes || 'Profile verified. Strong technical architecture baseline. Approved for adaptive assessment.'
  );

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1050px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Stage 3 of 8 • Senior Assessor Portal</span>
            <h2 style={{ fontSize: '1.8rem' }}>Senior Dashboard</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Review submitted candidate credentials and grant adaptive assessment clearance.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-purple" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              1 Pending Review
            </span>
          </div>
        </div>

        {/* SENIOR DASHBOARD TABLE */}
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Candidate</th>
                <th style={{ padding: '0.85rem 1rem' }}>Profile</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Active Candidate */}
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#FFF' }}>{profile.fullName || 'Harshitha N'}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{profile.email}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                  <div><strong>Degree:</strong> {profile.education || 'B.E. AI & DS'}</div>
                  <div style={{ color: '#818CF8' }}>{profile.experienceYears} Years Exp ({profile.currentRole || 'Associate'})</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  {profile.approvalStatus === 'approved' ? (
                    <span className="badge badge-emerald">APPROVED • UNLOCKED</span>
                  ) : profile.approvalStatus === 'rejected' ? (
                    <span className="badge badge-amber">REJECTED</span>
                  ) : (
                    <span className="badge badge-purple">🟡 PENDING REVIEW</span>
                  )}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button
                    onClick={() => setSelectedCandidate(profile)}
                    className="btn-primary"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
                  >
                    Review Profile
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* REVIEW MODAL / DETAILED PANEL */}
        {selectedCandidate && (
          <div className="glass-panel" style={{ background: '#0B2135', borderColor: 'rgba(56, 189, 248, 0.3)', padding: '2rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#FFF' }}>Review Candidate: {selectedCandidate.fullName}</h3>
              <button onClick={() => setSelectedCandidate(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div>
                <p><strong>Education:</strong> {selectedCandidate.education || 'Not specified'}</p>
                <p><strong>Experience:</strong> {selectedCandidate.experienceYears} Years ({selectedCandidate.currentRole || 'N/A'})</p>
                <p><strong>Phone:</strong> {selectedCandidate.phone || 'Not specified'}</p>
                <p><strong>Target Role:</strong> {selectedCandidate.targetRole || 'Consultant'}</p>
              </div>

              <div>
                <p style={{ marginBottom: '0.4rem' }}><strong>Evidence Links:</strong></p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {selectedCandidate.linkedin ? (
                    <a 
                      href={selectedCandidate.linkedin.startsWith('http') ? selectedCandidate.linkedin : `https://${selectedCandidate.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => {
                        e.preventDefault();
                        const targetUrl = selectedCandidate.linkedin!.startsWith('http') ? selectedCandidate.linkedin! : `https://${selectedCandidate.linkedin!}`;
                        window.open(targetUrl, '_blank');
                      }}
                      className="btn-secondary" 
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', color: '#38BDF8', cursor: 'pointer' }}
                    >
                      <Globe size={13} color="#0EA5E9" /> LinkedIn Profile ↗
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>No LinkedIn Link</span>
                  )}

                  {selectedCandidate.github ? (
                    <a 
                      href={selectedCandidate.github.startsWith('http') ? selectedCandidate.github : `https://${selectedCandidate.github}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => {
                        e.preventDefault();
                        const targetUrl = selectedCandidate.github!.startsWith('http') ? selectedCandidate.github! : `https://${selectedCandidate.github!}`;
                        window.open(targetUrl, '_blank');
                      }}
                      className="btn-secondary" 
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', color: '#A855F7', cursor: 'pointer' }}
                    >
                      <GitBranch size={13} color="#A855F7" /> GitHub Profile ↗
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>No GitHub Link</span>
                  )}

                  {selectedCandidate.portfolioUrl && (
                    <a 
                      href={selectedCandidate.portfolioUrl.startsWith('http') ? selectedCandidate.portfolioUrl : `https://${selectedCandidate.portfolioUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => {
                        e.preventDefault();
                        const targetUrl = selectedCandidate.portfolioUrl!.startsWith('http') ? selectedCandidate.portfolioUrl! : `https://${selectedCandidate.portfolioUrl!}`;
                        window.open(targetUrl, '_blank');
                      }}
                      className="btn-secondary" 
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', color: '#34D399', cursor: 'pointer' }}
                    >
                      🌐 Portfolio Site ↗
                    </a>
                  )}
                </div>
              </div>
            </div>



            {/* Notes */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Assessor Review Notes</label>
              <textarea
                className="form-textarea"
                style={{ width: '100%', height: '70px' }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Action Buttons: [ Approve ] [ Reject / Request Changes ] */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => {
                    onApprove(notes);
                    setSelectedCandidate(null);
                  }}
                  className="btn-primary"
                  style={{ background: '#10B981', padding: '0.75rem 1.75rem' }}
                >
                  <CheckCircle size={18} />
                  <span>[ Approve Candidate ]</span>
                </button>

                <button
                  onClick={() => {
                    onReject(notes);
                    setSelectedCandidate(null);
                  }}
                  className="btn-secondary"
                  style={{ color: '#F87171', borderColor: 'rgba(239,68,68,0.3)', padding: '0.75rem 1.5rem' }}
                >
                  <XCircle size={18} />
                  <span>[ Reject / Request Changes ]</span>
                </button>
              </div>

              {profile.approvalStatus === 'approved' && (
                <button
                  onClick={onProceedToAccessGate}
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.75rem' }}
                >
                  <span>Launch Candidate Gatekeeper</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
