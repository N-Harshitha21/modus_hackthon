import React, { useState } from 'react';
import { CandidateProfile, AdaptiveQuestion, CandidateResponse } from '../types';
import { AI_ENGINE } from '../services/aiEngine';
import { Brain, Sparkles, Send, CheckCircle2, Zap, RefreshCw, BarChart2, Check, Lock } from 'lucide-react';

interface AdaptiveAssessmentViewProps {
  profile: CandidateProfile;
  onCompleteAssessment: (history: CandidateResponse[]) => void;
}

export const AdaptiveAssessmentView: React.FC<AdaptiveAssessmentViewProps> = ({
  profile,
  onCompleteAssessment
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<AdaptiveQuestion>(() => 
    AI_ENGINE.generateFirstQuestion(profile)
  );

  const [responseHistory, setResponseHistory] = useState<CandidateResponse[]>([]);
  const [selectedOptionKey, setSelectedOptionKey] = useState<string>('');
  const [answerText, setAnswerText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Sample pre-filled responses for Text / Scenario Questions
  const sampleProjectResponses: Record<number, string> = {
    1: `To structure the customer satisfaction decline, I would use a MECE root-cause tree breaking customer touchpoints into Service Quality, Product Value, Digital App UX, and Post-Purchase Support.`,
    2: `Cost-driver variance analysis comparing fuel, fleet maintenance, and labor cost growth rates against revenue growth.`,
    3: profile.resumeFileName 
      ? `In my uploaded resume project (${profile.resumeFileName}), I led the system architecture using ${profile.skills.slice(0, 3).join(', ') || 'Python & SQL'}, optimizing data pipelines and system performance.`
      : `In my major technical project, I designed an automated data pipeline using modular architecture, optimizing latency and reliability.`,
    4: `Regarding problem solving and optimization, I debugged latency bottlenecks by implementing caching and query optimization, reducing latency from 1.2s to sub-150ms.`
  };

  const handleFillSample = () => {
    const qNum = currentQuestion.questionNumber;
    if ((currentQuestion.type === 'mcq' || currentQuestion.type === 'scenario') && currentQuestion.options) {
      setSelectedOptionKey(currentQuestion.options[0].key);
    } else {
      setAnswerText(sampleProjectResponses[qNum] || sampleProjectResponses[3]);
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((currentQuestion.type === 'mcq' || currentQuestion.type === 'scenario') && currentQuestion.options && !selectedOptionKey) return;
    if (currentQuestion.type === 'text' && !answerText.trim()) return;

    setIsAnalyzing(true);

    let responseContent = answerText;
    if (currentQuestion.options && selectedOptionKey) {
      const opt = currentQuestion.options.find(o => o.key === selectedOptionKey);
      responseContent = `Selected Option [${selectedOptionKey}]: ${opt?.text || ''}`;
    }

    const newResponse: CandidateResponse = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.questionText,
      competency: currentQuestion.competency,
      type: currentQuestion.type,
      answerText: responseContent,
      selectedOptionKey: selectedOptionKey || undefined,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...responseHistory, newResponse];
    setResponseHistory(updatedHistory);
    setAnswerText('');
    setSelectedOptionKey('');

    const result = await AI_ENGINE.evaluateAndGetNextQuestionAsync(profile, updatedHistory);
    setIsAnalyzing(false);

    if (result.isComplete || !result.nextQuestion) {
      setIsComplete(true);
      setTimeout(() => {
        onCompleteAssessment(updatedHistory);
      }, 1200);
    } else {
      setCurrentQuestion(result.nextQuestion);
    }
  };

  if (profile.approvalStatus !== 'approved') {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '640px', margin: '4rem auto', padding: '0 1rem' }}>
        <div className="glass-card" style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <Lock size={38} color="#FBBF24" />
          </div>

          <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
            Stage 5 Locked • Senior Approval Required
          </span>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>
            Assessment Access Locked
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Questions cannot be generated until your candidate profile details or resume are uploaded and approved by a Senior Assessor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Assessment Header */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>
              Stage 5 of 8 • AI Adaptive Assessment Engine
            </span>
            <h2 style={{ fontSize: '1.6rem' }}>
              Competency: <span style={{ color: '#38BDF8' }}>{currentQuestion.competency}</span>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
              <Brain size={14} /> Difficulty: {currentQuestion.difficulty}
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
              Question {currentQuestion.questionNumber} of 4
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>
            <span>Evidence Sufficiency Progress</span>
            <span>{Math.round((currentQuestion.questionNumber / 4) * 100)}%</span>
          </div>
          <div className="progress-container">
            <div className="progress-fill" style={{ width: `${(currentQuestion.questionNumber / 4) * 100}%` }} />
          </div>
        </div>
      </div>

      {!isComplete ? (
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          {/* AI Rationale Box */}
          <div className="glass-panel" style={{ marginBottom: '1.75rem', background: 'rgba(99, 102, 241, 0.08)', borderColor: 'rgba(99, 102, 241, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#818CF8', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              <Sparkles size={16} />
              <span>AI Question Selection Rationale</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {currentQuestion.aiRationale}
            </p>
          </div>

          {/* Question Text */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Topic: <strong style={{ color: '#F3F4F6' }}>{currentQuestion.topic}</strong>
              <span className="badge badge-amber" style={{ marginLeft: '0.75rem', fontSize: '0.7rem' }}>
                Type: {currentQuestion.type.toUpperCase()}
              </span>
            </div>

            <h3 style={{ fontSize: '1.35rem', lineHeight: 1.5, color: '#FFF' }}>
              "{currentQuestion.questionText}"
            </h3>
          </div>

          <form onSubmit={handleSubmitAnswer}>
            {/* MCQ / SCENARIO OPTIONS TYPE */}
            {(currentQuestion.type === 'mcq' || currentQuestion.type === 'scenario') && currentQuestion.options ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <label className="form-label">Select Options / Decision Approach:</label>
                
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOptionKey === opt.key;
                  return (
                    <div
                      key={opt.key}
                      onClick={() => setSelectedOptionKey(opt.key)}
                      style={{
                        background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: isSelected ? '2px solid #6366F1' : '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem 1.25rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: isSelected ? '#6366F1' : 'rgba(255, 255, 255, 0.1)',
                        color: '#FFF',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem'
                      }}>
                        {opt.key}
                      </div>

                      <div style={{ flex: 1, fontSize: '0.95rem', color: isSelected ? '#FFF' : '#D1D5DB' }}>
                        {opt.text}
                      </div>

                      {isSelected && <Check size={20} color="#818CF8" />}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* TEXT / RESUME DEEP DIVE TYPE */
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label className="form-label">Your Rationale & Methodological Solution</label>
                  <button
                    type="button"
                    onClick={handleFillSample}
                    style={{ background: 'none', border: 'none', color: '#818CF8', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
                  >
                    <Zap size={13} /> Quick Fill Sample Answer
                  </button>
                </div>
                
                <textarea
                  className="form-textarea"
                  style={{ width: '100%', height: '160px', fontSize: '0.95rem', lineHeight: 1.6 }}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Describe your technical contributions, decision framework, trade-offs, and measurable outcomes..."
                  required
                />
              </div>
            )}

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Demonstrated evidence is evaluated by AI to determine next competency probe
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isAnalyzing || ((currentQuestion.type === 'mcq' || currentQuestion.type === 'scenario') && currentQuestion.options ? !selectedOptionKey : !answerText.trim())}
                style={{ padding: '0.85rem 2rem' }}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={18} className="spin" />
                    <span>Analyzing Answer & Updating Competency...</span>
                  </>
                ) : (
                  <>
                    <span>{currentQuestion.questionNumber === 4 ? 'Complete Assessment' : 'Submit & Next Question'}</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Completion Card */
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
            border: '1px solid #10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <CheckCircle2 size={36} color="#34D399" />
          </div>

          <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
            Stage 6 of 8 • Assessment Completed
          </span>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>All Questions Evaluated</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Sufficient evidence gathered across Problem Structuring, Business Analysis, Communication, and Operating Model competencies. Generating METI scoring dashboard...
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: '#818CF8' }}>
            <BarChart2 size={20} />
            <span style={{ fontWeight: 600 }}>Calculating Overall Score (78/100) & Competency Metrics...</span>
          </div>
        </div>
      )}
    </div>
  );
};
