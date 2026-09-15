export type AssessmentStage = 
  | 1 // Landing Page & Auth
  | 2 // Candidate Profile
  | 3 // Senior Review / Approval (Assessor Portal)
  | 4 // Assessment Access Gate
  | 5 // Adaptive Assessment
  | 6 // Assessment Completion
  | 7 // AI Scoring Engine
  | 8 // Results Dashboard & 7-Page Report

export type AssessmentTrack = 
  | 'ai_engineer'
  | 'fullstack'
  | 'data_science'
  | 'product_leadership';

export interface CandidateProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  education: string;
  experienceYears: number;
  currentRole: string;
  targetRole: string;
  linkedin: string;
  github: string;
  portfolioUrl: string;
  resumeText: string;
  resumeFileName?: string;
  skills: string[];
  areasOfInterest: string[];
  approvalStatus: 'pending' | 'approved' | 'rejected';
  assessorNotes?: string;
  submittedAt: string;
  consentGiven?: boolean;
  selectedTrack?: AssessmentTrack;
  hasPaidDetailedReport?: boolean;
}

export type CompetencyName = 
  | 'Problem Structuring'
  | 'Communication'
  | 'Business Analysis'
  | 'Transformation Management'
  | 'Operating Model'
  | 'Stakeholder Management'
  | 'Strategy';

export interface MCQOption {
  key: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface QuestionBankItem {
  id: string;
  competency: CompetencyName;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'mcq' | 'scenario' | 'text';
  questionText: string;
  topic: string;
  expectedEvidence: string;
  options?: MCQOption[];
  correctOptionKey?: string;
}

export interface AdaptiveQuestion extends QuestionBankItem {
  questionNumber: number;
  aiRationale: string;
}

export interface CandidateResponse {
  questionId: string;
  questionText: string;
  competency: CompetencyName;
  type: 'mcq' | 'scenario' | 'text';
  answerText: string;
  selectedOptionKey?: string;
  timestamp: string;
  aiAnalysis?: {
    evidenceScore: number;
    competencyScore: number;
    demonstratedSkills: string[];
    gapDetected?: string;
    nextDifficultyRecommendation: 'Easy' | 'Medium' | 'Hard';
  };
}

export interface CompetencyScore {
  name: CompetencyName;
  score: number;
  status: 'Strength' | 'Skill Gap';
}

export interface AssessmentMetrics {
  overallScore: number;
  cci: number; // Consulting Capability Index
  cpi: number; // Consulting Potential Index
  cri: number; // Client Readiness Index
  evidenceConfidence: number;
  developmentGap: number;
  competencies: CompetencyScore[];
  strengths: CompetencyScore[];
  skillGaps: CompetencyScore[];
  developmentPriorities: string[];
  recommendedPathway: {
    step: number;
    title: string;
    description: string;
    timeline: string;
  }[];
}
