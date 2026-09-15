import React, { useState, useEffect } from 'react';
import { AssessmentStage, CandidateProfile, CandidateResponse } from './types';
import { Navbar } from './components/Navbar';
import { AuthView } from './components/AuthView';
import { ProfileView } from './components/ProfileView';
import { AssessorPortal } from './components/AssessorPortal';
import { GatekeeperView } from './components/GatekeeperView';
import { AdaptiveAssessmentView } from './components/AdaptiveAssessmentView';
import { ResultsView } from './components/ResultsView';

const EMPTY_PROFILE: CandidateProfile = {
  id: 'cand-101',
  fullName: '',
  email: '',
  phone: '',
  education: '',
  experienceYears: 0,
  currentRole: '',
  targetRole: '',
  linkedin: '',
  github: '',
  portfolioUrl: '',
  resumeText: '',
  resumeFileName: '',
  skills: [],
  areasOfInterest: [],
  approvalStatus: 'pending',
  submittedAt: new Date().toISOString()
};

export function App() {
  const [currentStage, setCurrentStage] = useState<AssessmentStage>(1);
  const [isAssessorMode, setIsAssessorMode] = useState<boolean>(false);

  // Candidate Profile State (Persisted in LocalStorage)
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(() => {
    const saved = localStorage.getItem('modus_candidate_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return EMPTY_PROFILE;
  });

  // Assessment History (Persisted in LocalStorage)
  const [responseHistory, setResponseHistory] = useState<CandidateResponse[]>(() => {
    const saved = localStorage.getItem('modus_assessment_responses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  // Automatically sync profile changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('modus_candidate_profile', JSON.stringify(candidateProfile));
  }, [candidateProfile]);

  // Automatically sync assessment responses to LocalStorage
  useEffect(() => {
    localStorage.setItem('modus_assessment_responses', JSON.stringify(responseHistory));
  }, [responseHistory]);

  // Clear Storage & Reset Demo
  const handleResetDemo = () => {
    localStorage.removeItem('modus_candidate_profile');
    localStorage.removeItem('modus_assessment_responses');
    setCandidateProfile(EMPTY_PROFILE);
    setResponseHistory([]);
    setCurrentStage(2);
  };

  // Auth Handler
  const handleLoginSuccess = (role: 'candidate' | 'assessor') => {
    if (role === 'assessor') {
      setIsAssessorMode(true);
      setCurrentStage(3);
    } else {
      setIsAssessorMode(false);
      setCurrentStage(2);
    }
  };

  // Profile Save -> Advance to Stage 3
  const handleSaveProfile = (updated: CandidateProfile) => {
    setCandidateProfile(updated);
    setCurrentStage(3); // Senior Review
  };

  // Assessor Actions
  const handleApproveProfile = (notes: string) => {
    setCandidateProfile(prev => ({
      ...prev,
      approvalStatus: 'approved',
      assessorNotes: notes
    }));
  };

  const handleRejectProfile = (notes: string) => {
    setCandidateProfile(prev => ({
      ...prev,
      approvalStatus: 'rejected',
      assessorNotes: notes
    }));
  };

  // Assessment Handlers
  const handleCompleteAssessment = (history: CandidateResponse[]) => {
    setResponseHistory(history);
    setCurrentStage(7); // AI Evaluation
    setTimeout(() => {
      setCurrentStage(8); // Results Dashboard & Report
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {currentStage !== 1 && (
        <Navbar
          currentStage={currentStage}
          setStage={setCurrentStage}
          isAssessorMode={isAssessorMode}
          setIsAssessorMode={setIsAssessorMode}
          onResetDemo={handleResetDemo}
        />
      )}

      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        {currentStage === 1 && (
          <AuthView onLoginSuccess={handleLoginSuccess} />
        )}

        {currentStage === 2 && (
          <ProfileView
            profile={candidateProfile}
            onSaveProfile={handleSaveProfile}
          />
        )}

        {currentStage === 3 && (
          <AssessorPortal
            profile={candidateProfile}
            onApprove={handleApproveProfile}
            onReject={handleRejectProfile}
            onProceedToAccessGate={() => {
              setIsAssessorMode(false);
              setCurrentStage(4);
            }}
          />
        )}

        {currentStage === 4 && (
          <GatekeeperView
            profile={candidateProfile}
            onStartAssessment={() => setCurrentStage(5)}
            onSwitchToAssessor={() => {
              setIsAssessorMode(true);
              setCurrentStage(3);
            }}
          />
        )}

        {(currentStage === 5 || currentStage === 6) && (
          <AdaptiveAssessmentView
            profile={candidateProfile}
            onCompleteAssessment={handleCompleteAssessment}
          />
        )}

        {(currentStage === 7 || currentStage === 8) && (
          <ResultsView
            profile={candidateProfile}
            responses={responseHistory}
            onRestart={() => setCurrentStage(1)}
          />
        )}
      </main>
    </div>
  );
}
export default App;
