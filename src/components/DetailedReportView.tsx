import React, { useState } from 'react';
import { CandidateProfile, AssessmentMetrics } from '../types';
import { Download, ArrowLeft, CheckCircle2, AlertTriangle, Compass, Target, User, Calendar, FileText, ChevronRight, ChevronLeft } from 'lucide-react';

interface DetailedReportViewProps {
  profile: CandidateProfile;
  metrics: AssessmentMetrics;
  onBack: () => void;
}

export const DetailedReportView: React.FC<DetailedReportViewProps> = ({
  profile,
  metrics,
  onBack
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 7;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      
      {/* Top Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} />
          <span>Back to Executive Dashboard</span>
        </button>

        {/* Page Switcher Tabs (Pages 1 to 7) */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pNum => (
            <button
              key={pNum}
              onClick={() => setCurrentPage(pNum)}
              style={{
                background: currentPage === pNum ? '#6366F1' : 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                color: '#FFF',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Page {pNum}
            </button>
          ))}
        </div>

        <button onClick={() => window.print()} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
          <Download size={16} />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* REPORT CONTAINER */}
      <div className="glass-card" style={{ padding: '3rem', minHeight: '650px', background: '#091A29', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              METI Executive Assessment Report • Page {currentPage} of {totalPages}
            </span>
            <h2 style={{ fontSize: '1.6rem', color: '#FFF', marginTop: '0.2rem' }}>
              {currentPage === 1 && '1. Candidate Information & Executive Summary'}
              {currentPage === 2 && '2. Overall Score & Capability Index (CCI / CPI)'}
              {currentPage === 3 && '3. Competency Breakdown & Performance Metrics'}
              {currentPage === 4 && '4. Demonstrated Strengths Analysis'}
              {currentPage === 5 && '5. Skill Gaps & Risk Identifiers'}
              {currentPage === 6 && '6. Executive Development Recommendations'}
              {currentPage === 7 && '7. Personalised Development Roadmap'}
            </h2>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            <div>Candidate: <strong>{profile.fullName || 'Harshitha N'}</strong></div>
            <div>Target Track: <strong>{profile.targetRole}</strong></div>
          </div>
        </div>

        {/* PAGE 1 CONTENT */}
        {currentPage === 1 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#38BDF8' }}>Candidate Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }} className="glass-panel">
              <div>
                <p style={{ marginBottom: '0.5rem' }}><strong>Name:</strong> {profile.fullName || 'Harshitha N'}</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> {profile.email}</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> {profile.phone}</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Degree:</strong> {profile.education}</p>
              </div>
              <div>
                <p style={{ marginBottom: '0.5rem' }}><strong>Experience:</strong> {profile.experienceYears} Years ({profile.currentRole})</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Target Role:</strong> {profile.targetRole}</p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>LinkedIn:</strong> {profile.linkedin ? (
                    <a 
                      href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => {
                        e.preventDefault();
                        const targetUrl = profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`;
                        window.open(targetUrl, '_blank');
                      }}
                      style={{ color: '#38BDF8', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      {profile.linkedin} ↗
                    </a>
                  ) : 'N/A'}
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>GitHub:</strong> {profile.github ? (
                    <a 
                      href={profile.github.startsWith('http') ? profile.github : `https://${profile.github}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => {
                        e.preventDefault();
                        const targetUrl = profile.github.startsWith('http') ? profile.github : `https://${profile.github}`;
                        window.open(targetUrl, '_blank');
                      }}
                      style={{ color: '#A855F7', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      {profile.github} ↗
                    </a>
                  ) : 'N/A'}
                </p>
                {profile.portfolioUrl && (
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Portfolio:</strong> (
                      <a 
                        href={profile.portfolioUrl.startsWith('http') ? profile.portfolioUrl : `https://${profile.portfolioUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => {
                          e.preventDefault();
                          const targetUrl = profile.portfolioUrl.startsWith('http') ? profile.portfolioUrl : `https://${profile.portfolioUrl}`;
                          window.open(targetUrl, '_blank');
                        }}
                        style={{ color: '#34D399', textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        {profile.portfolioUrl} ↗
                      </a>
                    )
                  </p>
                )}
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#38BDF8' }}>Assessment Executive Summary</h3>
            <p style={{ color: '#CBD5E1', lineHeight: 1.6, fontSize: '0.95rem' }}>
              The candidate has completed the 4-stage METI adaptive assessment engine. Demonstrated evidence was evaluated across 7 core consulting competencies. The overall evidence confidence rating is high ({metrics.evidenceConfidence}%), verifying strong problem structuring and communication baseline.
            </p>
          </div>
        )}

        {/* PAGE 2 CONTENT */}
        {currentPage === 2 && (
          <div className="animate-fade-in">
            <div style={{ textAlign: 'center', margin: '2rem 0 3rem 0' }}>
              <div style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                OVERALL ASSESSMENT SCORE
              </div>
              <div style={{ fontSize: '4.5rem', fontWeight: 800, color: '#84CC16', margin: '0.5rem 0' }}>
                {metrics.overallScore} <span style={{ fontSize: '2rem', color: '#94A3B8' }}>/ 100</span>
              </div>
              <p style={{ color: '#94A3B8' }}>Consulting Capability Index (CCI): <strong>{metrics.cci}%</strong> | Potential (CPI): <strong>{metrics.cpi}%</strong></p>
            </div>

            <div className="glass-panel" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Capability Score Range</div>
              <div style={{ display: 'flex', height: '16px', borderRadius: '8px', overflow: 'hidden', margin: '1rem 0' }}>
                <div style={{ width: '78%', background: 'linear-gradient(90deg, #6366F1, #84CC16)' }} />
                <div style={{ width: '22%', background: 'rgba(255,255,255,0.1)' }} />
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.85rem' }}>78 / 100 • Strong Capability Demonstrated</span>
            </div>
          </div>
        )}

        {/* PAGE 3 CONTENT */}
        {currentPage === 3 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#38BDF8' }}>Competency Scores Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {metrics.competencies.map((comp, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 700, color: '#FFF' }}>{comp.name}</span>
                    <span style={{ fontWeight: 800, color: comp.score >= 75 ? '#34D399' : '#FBBF24' }}>
                      {comp.score} / 100
                    </span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-fill" style={{ width: `${comp.score}%`, background: comp.score >= 75 ? '#10B981' : '#F59E0B' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 4 CONTENT */}
        {currentPage === 4 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={22} /> Demonstrated Strengths
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {metrics.strengths.map((str, idx) => (
                <div key={idx} className="glass-panel" style={{ borderLeft: '4px solid #10B981', padding: '1.25rem' }}>
                  <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.35rem' }}>{str.name} ({str.score}/100)</h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>High evidence rating demonstrated during scenario decomposition and logical decision tree structuring.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 5 CONTENT */}
        {currentPage === 5 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={22} /> Identified Skill Gaps
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {metrics.skillGaps.map((gap, idx) => (
                <div key={idx} className="glass-panel" style={{ borderLeft: '4px solid #F59E0B', padding: '1.25rem' }}>
                  <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.35rem' }}>{gap.name} ({gap.score}/100)</h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Requires targeted practice on enterprise change governance, RACI matrix assignment, and operating model value stream design.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 6 CONTENT */}
        {currentPage === 6 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#38BDF8' }}>Executive Development Recommendations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {metrics.developmentPriorities.map((prio, idx) => (
                <div key={idx} className="glass-panel" style={{ borderLeft: '4px solid #38BDF8', padding: '1.25rem' }}>
                  <h4 style={{ color: '#FFF', fontSize: '1.05rem' }}>{prio}</h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    Focus on structured case studies, cost-benefit sensitivity modeling, and executive briefing trade-off frameworks.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 7 CONTENT */}
        {currentPage === 7 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#A855F7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={22} /> Recommended Development Roadmap
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {metrics.recommendedPathway.map((step) => (
                <div key={step.step} className="glass-panel" style={{ borderLeft: '4px solid #8B5CF6' }}>
                  <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Phase {step.step} • {step.timeline}</span>
                  <h4 style={{ fontSize: '1.1rem', color: '#FFF', margin: '0.35rem 0' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page Footer Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem', marginTop: '3rem' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <ChevronLeft size={16} /> Previous Page
          </button>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Next Page <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
