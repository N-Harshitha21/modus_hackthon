import React from 'react';
import { AssessmentTrack, CandidateProfile } from '../types';
import { Cpu, Code, BarChart, Target, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ChooseAssessmentViewProps {
  profile: CandidateProfile;
  onSelectTrack: (track: AssessmentTrack) => void;
}

export const ChooseAssessmentView: React.FC<ChooseAssessmentViewProps> = ({ profile, onSelectTrack }) => {
  const tracks: {
    id: AssessmentTrack;
    title: string;
    icon: React.ReactNode;
    color: string;
    description: string;
    skillsCovered: string[];
    duration: string;
    level: string;
  }[] = [
    {
      id: 'ai_engineer',
      title: 'AI Engineering & LLM Architecture',
      icon: <Cpu size={28} color="#38BDF8" />,
      color: '#38BDF8',
      description: 'Focuses on RAG pipelines, fine-tuning, prompt engineering, vector databases, and scalable AI infrastructure.',
      skillsCovered: ['Python', 'OpenAI API', 'LangChain', 'Vector Search', 'LLM Evaluation'],
      duration: '15-20 Mins',
      level: 'Intermediate - Advanced'
    },
    {
      id: 'fullstack',
      title: 'Full-Stack Web & Cloud Systems',
      icon: <Code size={28} color="#34D399" />,
      color: '#34D399',
      description: 'Evaluates microservices, React/TypeScript architecture, API integration, and cloud DevOps resilience.',
      skillsCovered: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Cloud Architecture'],
      duration: '15-20 Mins',
      level: 'Junior - Senior'
    },
    {
      id: 'data_science',
      title: 'Data Science & Predictive Analytics',
      icon: <BarChart size={28} color="#FBBF24" />,
      color: '#FBBF24',
      description: 'Assesses exploratory data analysis, machine learning algorithms, SQL optimization, and statistical modeling.',
      skillsCovered: ['Pandas / NumPy', 'Scikit-Learn', 'SQL', 'Data Visualization', 'Hypothesis Testing'],
      duration: '15-20 Mins',
      level: 'Intermediate'
    },
    {
      id: 'product_leadership',
      title: 'Product Strategy & Technical Leadership',
      icon: <Target size={28} color="#A855F7" />,
      color: '#A855F7',
      description: 'Measures product roadmap execution, stakeholder management, MECE problem decomposition, and ROI analysis.',
      skillsCovered: ['Problem Structuring', 'MECE Trees', 'Financial Modeling', 'Stakeholder Mgmt'],
      duration: '15 Mins',
      level: 'Senior / Lead'
    }
  ];

  return (
    <div className="glass-card fade-in" style={{ padding: '2.5rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38BDF8', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Step 4 of 6 • Track Selection
        </div>
        <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
          Choose Your Assessment Track
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.5 }}>
          Hello <strong>{profile.fullName || 'Candidate'}</strong>, select the specialized assessment track that best matches your career goals and technical expertise.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '1.5rem' }}>
        {tracks.map((track) => {
          const isSelected = profile.selectedTrack === track.id;
          return (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track.id)}
              style={{
                background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? `2px solid ${track.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              {isSelected && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: track.color, fontSize: '0.8rem', fontWeight: 700 }}>
                  <CheckCircle2 size={18} /> Selected
                </div>
              )}

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '10px',
                    background: `${track.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {track.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFF' }}>{track.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                      {track.duration} • {track.level}
                    </div>
                  </div>
                </div>

                <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {track.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {track.skillsCovered.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: '#94A3B8',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 500
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                style={{
                  width: '100%',
                  background: isSelected ? track.color : 'rgba(255, 255, 255, 0.06)',
                  color: isSelected ? '#031222' : '#FFF',
                  border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: 'auto'
                }}
              >
                <span>{isSelected ? 'Proceed with Selected Track' : 'Select Track'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
