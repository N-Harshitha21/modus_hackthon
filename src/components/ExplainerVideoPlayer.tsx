import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ShieldCheck, Brain, FileText, CheckCircle2, Sparkles } from 'lucide-react';

interface ExplainerVideoPlayerProps {
  onComplete?: () => void;
}

export const ExplainerVideoPlayer: React.FC<ExplainerVideoPlayerProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0); // 0 to 100
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const slides = [
    {
      title: '1. Candidate Profile Setup & Evidence Parsing',
      subtitle: 'CV Parsing & Verified Portfolio Extraction',
      description: 'Upload your resume or input your experience. Modus AI automatically extracts exact LinkedIn, GitHub, and Portfolio URLs while maintaining clean initial state.',
      icon: <FileText size={40} color="#38BDF8" />,
      color: '#38BDF8',
      bgGradient: 'linear-gradient(135deg, #0A2540 0%, #031222 100%)',
      details: ['PDF & TXT Parsing', 'Exact URL Extraction', 'No Placeholder Fallbacks']
    },
    {
      title: '2. Senior Assessor Gatekeeper Review',
      subtitle: 'Strict Quality Control & Assessment Authorization',
      description: 'Senior Assessors audit candidate evidence, current experience, and target roles before unlocking assessment access to prevent unverified submissions.',
      icon: <ShieldCheck size={40} color="#FBBF24" />,
      color: '#FBBF24',
      bgGradient: 'linear-gradient(135deg, #1E1B4B 0%, #090D16 100%)',
      details: ['Credential Audit', 'Assessor Approval Gate', 'Assessment Ticket Issuance']
    },
    {
      title: '3. Adaptive OpenAI Assessment Engine',
      subtitle: 'Dynamic Competency Probing (gpt-4o-mini)',
      description: 'Take a 5-question technical assessment that dynamically adapts to your exact resume skills, target role, and real-time response quality.',
      icon: <Brain size={40} color="#A855F7" />,
      color: '#A855F7',
      bgGradient: 'linear-gradient(135deg, #2E1065 0%, #08031A 100%)',
      details: ['OpenAI Integration', 'Hybrid Evidence Scoring', 'Real-Time Rationale']
    },
    {
      title: '4. Executive Report & 6-Month Roadmap',
      subtitle: 'Capability Metrics (CCI / CPI / CRI) & Action Plan',
      description: 'Receive your Capability Index, strengths, skill gaps, target role benchmark comparison, and 6-month personalized development roadmap.',
      icon: <Sparkles size={40} color="#34D399" />,
      color: '#34D399',
      bgGradient: 'linear-gradient(135deg, #064E3B 0%, #021B14 100%)',
      details: ['3-Page Detailed PDF', 'Skill Gap Identification', 'Career Pathway Benchmark']
    }
  ];

  // Automatic playback timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (onComplete) onComplete();
            return 100;
          }
          const nextProgress = prev + 1;
          const currentSlideIdx = Math.floor((nextProgress / 100) * slides.length);
          if (currentSlideIdx < slides.length && currentSlideIdx !== activeSlide) {
            setActiveSlide(currentSlideIdx);
          }
          return nextProgress;
        });
      }, 200); // 20s total video duration
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeSlide, onComplete]);

  const handleRestart = () => {
    setProgress(0);
    setActiveSlide(0);
    setIsPlaying(true);
  };

  const currentSlide = slides[activeSlide] || slides[0];

  return (
    <div style={{
      width: '100%',
      background: '#030D18',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Video Screen Area */}
      <div style={{
        position: 'relative',
        minHeight: '340px',
        background: currentSlide.bgGradient,
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.5s ease-in-out'
      }}>
        {/* Top Watermark & Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.4)', padding: '0.35rem 0.85rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isPlaying ? '#34D399' : '#EF4444' }}></span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isPlaying ? 'PLAYING DEMO VIDEO' : 'PAUSED'}
            </span>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>
            Modus AI Explainer • {Math.floor((progress / 100) * 105)}s / 105s
          </div>
        </div>

        {/* Video Slide Content */}
        <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'flex-start', gap: '1.75rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '16px',
            background: `${currentSlide.color}20`,
            border: `2px solid ${currentSlide.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {currentSlide.icon}
          </div>

          <div>
            <div style={{ color: currentSlide.color, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              {currentSlide.subtitle}
            </div>
            <h3 style={{ fontSize: '1.6rem', color: '#FFF', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
              {currentSlide.title}
            </h3>
            <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '620px', marginBottom: '1.25rem' }}>
              {currentSlide.description}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {currentSlide.details.map((detail, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#F8FAFC',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <CheckCircle2 size={13} color={currentSlide.color} /> {detail}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSlide(idx);
                setProgress((idx / slides.length) * 100);
              }}
              style={{
                height: '6px',
                width: activeSlide === idx ? '32px' : '10px',
                borderRadius: '3px',
                background: activeSlide === idx ? currentSlide.color : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out'
              }}
            />
          ))}
        </div>
      </div>

      {/* Video Control Bar */}
      <div style={{
        background: '#04101D',
        padding: '1rem 1.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {/* Progress Bar */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            const newProg = clickPos * 100;
            setProgress(newProg);
            setActiveSlide(Math.min(slides.length - 1, Math.floor((newProg / 100) * slides.length)));
          }}
          style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '3px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: currentSlide.color,
            borderRadius: '3px',
            transition: 'width 0.2s linear'
          }} />
        </div>

        {/* Controls Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: currentSlide.color,
                color: '#031222',
                border: 'none',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
            </button>

            <button
              onClick={handleRestart}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}
            >
              <RotateCcw size={16} /> Replay
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} color="#38BDF8" />}
              <span>{isMuted ? 'Muted' : 'Audio On'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
