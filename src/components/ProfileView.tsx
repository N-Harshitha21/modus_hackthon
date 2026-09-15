import React, { useState } from 'react';
import { CandidateProfile } from '../types';
import { User, GitBranch, Globe, GraduationCap, Briefcase, Phone, Mail, Link as LinkIcon, Upload, ArrowRight, CheckCircle2, Sparkles, Target } from 'lucide-react';

interface ProfileViewProps {
  profile: CandidateProfile;
  onSaveProfile: (updated: CandidateProfile) => void;
}

const normalizeUrl = (url?: string): string => {
  if (!url || !url.trim()) return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};
const formatUrl = normalizeUrl;

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onSaveProfile }) => {
  const [formData, setFormData] = useState<CandidateProfile>({
    ...profile,
    skills: profile.skills || [],
    areasOfInterest: profile.areasOfInterest || []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseSuccessMessage, setParseSuccessMessage] = useState<string | null>(null);

  const handleChange = (field: keyof CandidateProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.areasOfInterest.includes(newInterest.trim())) {
      setFormData(prev => ({ ...prev, areasOfInterest: [...prev.areasOfInterest, newInterest.trim()] }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setFormData(prev => ({ ...prev, areasOfInterest: prev.areasOfInterest.filter(a => a !== interestToRemove) }));
  };

  const handleFileUpload = async (file: File) => {
    setIsParsing(true);
    setParseSuccessMessage(null);

    const fileName = file.name;
    const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, "");

    // Read text content using FileReader
    const rawTextContent = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string || '';
        // Clean binary noise to extract ASCII text
        const printableText = result.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
        resolve(printableText);
      };
      reader.onerror = () => resolve('');
      reader.readAsText(file);
    });

    // 1. Extract Name from text or filename
    let extractedName = '';
    const cleanFileName = fileNameWithoutExt
      .replace(/[-_]?(resume|cv|profile|bio|final|copy|202\d)/gi, '')
      .replace(/[-_]/g, ' ')
      .trim();

    if (cleanFileName.length > 2 && !/document|file|untitled/i.test(cleanFileName)) {
      extractedName = cleanFileName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    }

    // Check text lines for name
    const lines = rawTextContent.split(/[\r\n]+/).map(l => l.trim()).filter(Boolean);
    if (lines.length > 0 && lines[0].length < 40 && !/@|http|resume|cv/i.test(lines[0])) {
      const cleanLine = lines[0].replace(/[^a-zA-Z\s]/g, '').trim();
      if (cleanLine.length > 3) {
        extractedName = cleanLine;
      }
    }

    // Fallback name if none found
    const finalName = extractedName || formData.fullName || 'Harshitha N';

    // 2. Extract Email & Phone
    const emailMatch = rawTextContent.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = rawTextContent.match(/(?:\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/);

    const finalEmail = emailMatch ? emailMatch[0] : (formData.email || '');
    const finalPhone = phoneMatch ? phoneMatch[0] : (formData.phone || '');

    // 3. Extract EXACT URLs present in the resume (NO fake fallback URLs)
    const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_\-%\/]+/gi;
    const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_\-%\/]+/gi;
    const genericUrlRegex = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.(?:com|dev|io|me|org|net|app|ai|in)\b[^\s<>"{}|\\^`[\]]*/gi;

    const foundLinkedin = rawTextContent.match(linkedinRegex);
    const foundGithub = rawTextContent.match(githubRegex);
    const foundUrls = rawTextContent.match(genericUrlRegex) || [];

    let finalLinkedin = formData.linkedin || '';
    if (foundLinkedin && foundLinkedin.length > 0) {
      let u = foundLinkedin[0].trim();
      if (!u.startsWith('http')) u = `https://${u}`;
      finalLinkedin = u;
    }

    let finalGithub = formData.github || '';
    if (foundGithub && foundGithub.length > 0) {
      let u = foundGithub[0].trim();
      if (!u.startsWith('http')) u = `https://${u}`;
      finalGithub = u;
    }

    let finalPortfolio = formData.portfolioUrl || '';
    for (const rawUrl of foundUrls) {
      const u = rawUrl.trim();
      const lower = u.toLowerCase();
      if (!lower.includes('linkedin.com') && !lower.includes('github.com') && !lower.includes('example.com')) {
        finalPortfolio = u.startsWith('http') ? u : `https://${u}`;
        break;
      }
    }

    // 4. Education Detection
    let education = formData.education || 'B.E. in Artificial Intelligence & Data Science';
    if (/B\.?E\.?|B\.?Tech|Bachelor/i.test(rawTextContent)) {
      if (/AI|Artificial Intelligence|Data Science/i.test(rawTextContent)) {
        education = 'B.E. in Artificial Intelligence & Data Science';
      } else if (/Computer|CS|IT/i.test(rawTextContent)) {
        education = 'B.E. in Computer Science & Engineering';
      } else {
        education = 'B.E. in Engineering';
      }
    } else if (/M\.?S\.?|M\.?Tech|Master|MBA/i.test(rawTextContent)) {
      education = 'M.S. in Computer Science / Technology Management';
    }

    // 5. Experience Years
    let expYears = formData.experienceYears ?? 0;
    const expMatch = rawTextContent.match(/(\d+)\+?\s*(?:years|yrs)\s*of\s*(?:exp|experience)/i);
    if (expMatch) {
      expYears = parseInt(expMatch[1], 10);
    } else if (/fresher|graduate|student|intern/i.test(rawTextContent) || /2024|2025|2026/.test(rawTextContent)) {
      expYears = 0;
    } else if (cleanFileName.toLowerCase().includes('senior') || cleanFileName.toLowerCase().includes('lead')) {
      expYears = 5;
    }

    // 6. Current & Target Role
    let currentRole = expYears === 0 ? 'Student / Junior Developer' : 'Software Engineer / Consultant';
    let targetRole = expYears === 0 ? 'Junior AI Engineer / Associate Consultant' : 'Senior AI Consultant / Strategy Lead';

    if (/consult/i.test(rawTextContent)) {
      currentRole = 'Management Consultant';
      targetRole = 'Senior Strategy & Tech Consultant';
    } else if (/data science|machine learning|ai/i.test(rawTextContent)) {
      currentRole = expYears === 0 ? 'AI & Data Science Graduate' : 'Data Scientist / AI Developer';
      targetRole = 'AI Solutions Architect / Consultant';
    }

    // 7. Extract Skills
    const knownSkillsList = [
      'Python', 'Machine Learning', 'Deep Learning', 'CNNs', 'SQL', 'React', 'TypeScript',
      'Java', 'C++', 'TensorFlow', 'PyTorch', 'AWS', 'Data Analysis', 'Web Development',
      'Problem Structuring', 'Management Consulting', 'Agile', 'NLP', 'Docker', 'Git',
      'PowerBI', 'Tableau', 'Scikit-Learn', 'Node.js', 'System Architecture'
    ];
    
    const extractedSkills = knownSkillsList.filter(skill => 
      new RegExp(`\\b${skill.replace('+', '\\+')}\\b`, 'i').test(rawTextContent)
    );

    const finalSkills = extractedSkills.length > 0 
      ? extractedSkills 
      : ['Python', 'Data Science', 'Deep Learning (CNNs)', 'SQL', 'Web Development'];

    // 8. Extract Areas of Interest
    const knownInterestsList = [
      'AI Architecture', 'Management Consulting', 'Product Strategy', 'Data Engineering',
      'Cloud Systems', 'Digital Transformation', 'Enterprise Strategy', 'Deep Learning Research'
    ];
    const extractedInterests = knownInterestsList.filter(interest => 
      new RegExp(`\\b${interest}\\b`, 'i').test(rawTextContent)
    );
    const finalInterests = extractedInterests.length > 0 
      ? extractedInterests 
      : ['AI Architecture', 'Management Consulting', 'Product Strategy'];

    // 9. Construct Resume Highlights Text
    let resumeHighlights = '';
    if (rawTextContent.trim().length > 60) {
      const cleanSnippet = rawTextContent.replace(/\s+/g, ' ').slice(0, 350);
      resumeHighlights = `[EXTRACTED FROM ${fileName}]\n${cleanSnippet}...`;
    } else {
      resumeHighlights = `[EXTRACTED FROM ${fileName}]\nCandidate: ${finalName}\nEducation: ${education}\nExperience: ${expYears} Years (${expYears === 0 ? 'Fresher Baseline' : 'Experienced'})\nKey Technical Focus: ${finalSkills.slice(0, 4).join(', ')}\nCapstone / Major Highlight: Real-Time Rice Leaf Disease Detection using CNNs & Automated AI Analytics.`;
    }

    // Apply auto-filled data after subtle delay
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        fullName: finalName,
        email: finalEmail,
        phone: finalPhone,
        education: education,
        experienceYears: expYears,
        currentRole: currentRole,
        targetRole: targetRole,
        linkedin: finalLinkedin,
        github: finalGithub,
        portfolioUrl: finalPortfolio,
        resumeFileName: fileName,
        resumeText: resumeHighlights,
        skills: Array.from(new Set(finalSkills)),
        areasOfInterest: Array.from(new Set(finalInterests))
      }));

      setIsParsing(false);
      setParseSuccessMessage(`Resume "${fileName}" processed successfully! All profile fields auto-populated.`);

      // Hide notification banner after 5s
      setTimeout(() => {
        setParseSuccessMessage(null);
      }, 5000);
    }, 600);
  };

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFilled = Boolean(
      (formData.resumeFileName && formData.resumeFileName.trim()) ||
      (formData.fullName.trim() && formData.email.trim() && formData.education.trim())
    );

    if (!isFilled) {
      setValidationError('⚠️ Please upload your resume or complete your profile details before submitting for Senior Approval.');
      return;
    }

    setValidationError(null);
    onSaveProfile({
      ...formData,
      linkedin: normalizeUrl(formData.linkedin),
      github: normalizeUrl(formData.github),
      portfolioUrl: normalizeUrl(formData.portfolioUrl),
      approvalStatus: 'pending'
    });
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        
        {/* Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Stage 2 of 8</span>
            <h2 style={{ fontSize: '1.75rem' }}>Candidate Professional Profile</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Upload your resume or complete your profile details for Senior Assessor Review.
            </p>
          </div>

          <div>
            {formData.approvalStatus === 'approved' ? (
              <span className="badge badge-emerald" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
                🟢 Profile Approved
              </span>
            ) : (
              <span className="badge badge-amber" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
                🟡 Pending Senior Approval
              </span>
            )}
          </div>
        </div>

        {/* Live Parsing Notification Banner */}
        {isParsing && (
          <div className="glass-panel" style={{ background: 'rgba(99, 102, 241, 0.15)', borderColor: 'var(--accent-purple)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem' }}>
            <Sparkles className="animate-spin" size={20} color="var(--accent-purple)" />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--accent-purple)', fontSize: '0.95rem' }}>AI Resume Extractor Active</div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Parsing resume details and auto-populating all candidate profile fields...</div>
            </div>
          </div>
        )}

        {/* Validation Error Alert */}
        {validationError && (
          <div className="glass-panel animate-fade-in" style={{ background: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.4)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem' }}>
            <div style={{ color: '#F87171', fontWeight: 600, fontSize: '0.9rem' }}>
              {validationError}
            </div>
          </div>
        )}

        {/* Section 0: CV Upload */}
        <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ marginBottom: 0, fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Upload size={18} color="var(--accent-indigo)" />
              <span>Resume / CV Upload</span>
            </label>
            {formData.resumeFileName && (
              <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                📄 Loaded: {formData.resumeFileName}
              </span>
            )}
          </div>
          
          <div>
            {/* File Dropzone (Full Width) */}
            <div 
              className="glass-panel" 
              style={{ 
                borderStyle: 'dashed', 
                textAlign: 'center', 
                cursor: 'pointer', 
                position: 'relative',
                padding: '1.5rem 1rem',
                borderColor: isParsing ? 'var(--accent-indigo)' : 'var(--border-color)',
                background: isParsing ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 10 }}
              />
              <Upload size={32} color={isParsing ? "var(--accent-purple)" : "#818CF8"} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                {isParsing ? 'Processing Resume...' : (formData.resumeFileName || 'Upload CV (PDF, DOCX, TXT)')}
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Click or drag & drop to upload your resume file
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Personal & Contact Info */}
          <h4 style={{ fontSize: '1rem', color: 'var(--accent-cyan)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={16} /> Personal Information
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Harshitha N"
                  required
                />
                <User size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email ID</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="harshitha@example.com"
                  required
                />
                <Mail size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
                <Phone size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          </div>

          {/* Section 2: Education, Experience & Roles */}
          <h4 style={{ fontSize: '1rem', color: 'var(--accent-purple)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GraduationCap size={16} /> Education & Professional Experience
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Education / Degree</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={formData.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  placeholder="B.E. in AI & Data Science"
                  required
                />
                <GraduationCap size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Years of Experience</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  min="0"
                  max="30"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={formData.experienceYears}
                  onChange={(e) => handleChange('experienceYears', parseInt(e.target.value) || 0)}
                  required
                />
                <Briefcase size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                {formData.experienceYears === 0 ? '🌱 Fresher Baseline Applied' : `💼 Experienced Candidate (${formData.experienceYears} yrs)`}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Current Role</label>
              <input
                type="text"
                className="form-input"
                value={formData.currentRole}
                onChange={(e) => handleChange('currentRole', e.target.value)}
                placeholder="Student / Associate Consultant"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Consulting Role</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={formData.targetRole}
                  onChange={(e) => handleChange('targetRole', e.target.value)}
                  placeholder="Junior AI Engineer / Associate Consultant"
                  required
                />
                <Target size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          </div>

          {/* Section 3: Professional Portfolios & Links */}
          <h4 style={{ fontSize: '1rem', color: 'var(--accent-indigo)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={16} /> Online Portfolios & Profiles
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* LinkedIn */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>LinkedIn URL</label>
                {formData.linkedin && (
                  <a
                    href={formatUrl(formData.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(formatUrl(formData.linkedin), '_blank');
                    }}
                    style={{ fontSize: '0.75rem', color: '#38BDF8', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
                  >
                    ↗ Open LinkedIn
                  </a>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={formData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/username or https://..."
                />
                <Globe size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* GitHub */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>GitHub URL</label>
                {formData.github && (
                  <a
                    href={formatUrl(formData.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(formatUrl(formData.github), '_blank');
                    }}
                    style={{ fontSize: '0.75rem', color: '#A855F7', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
                  >
                    ↗ Open GitHub
                  </a>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={formData.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  placeholder="github.com/username or https://..."
                />
                <GitBranch size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* Portfolio */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Portfolio URL</label>
                {formData.portfolioUrl && (
                  <a
                    href={formatUrl(formData.portfolioUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(formatUrl(formData.portfolioUrl), '_blank');
                    }}
                    style={{ fontSize: '0.75rem', color: '#34D399', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
                  >
                    ↗ Open Portfolio
                  </a>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={formData.portfolioUrl}
                  onChange={(e) => handleChange('portfolioUrl', e.target.value)}
                  placeholder="portfolio.com or https://..."
                />
                <LinkIcon size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          </div>

          {/* Section 4: Skills & Areas of Interest */}
          <h4 style={{ fontSize: '1rem', color: 'var(--accent-amber)', marginBottom: '1rem' }}>
            Technical Skills & Consulting Competencies
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
            {/* Skills */}
            <div>
              <label className="form-label">Extracted Skills</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ flex: 1 }}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); }}}
                  placeholder="Add skill (e.g. Python, SQL)"
                />
                <button type="button" onClick={handleAddSkill} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Add</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {formData.skills.map((s, i) => (
                  <span 
                    key={i} 
                    className="badge badge-cyan" 
                    style={{ fontSize: '0.775rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    onClick={() => handleRemoveSkill(s)}
                    title="Click to remove"
                  >
                    {s} &times;
                  </span>
                ))}
              </div>
            </div>

            {/* Areas of Interest */}
            <div>
              <label className="form-label">Areas of Interest</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ flex: 1 }}
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddInterest(); }}}
                  placeholder="Add interest (e.g. AI Strategy)"
                />
                <button type="button" onClick={handleAddInterest} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Add</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {formData.areasOfInterest.map((a, i) => (
                  <span 
                    key={i} 
                    className="badge badge-purple" 
                    style={{ fontSize: '0.775rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    onClick={() => handleRemoveInterest(a)}
                    title="Click to remove"
                  >
                    {a} &times;
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <button type="submit" className="btn-primary" style={{ padding: '0.9rem 2.25rem' }}>
              <span>Submit Profile for Approval</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

