import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { fetchCv } from '../features/cv/cvSlice';
import type { CVContent, DocumentSettings } from '../documents/types';
import type { 
  User, 
  WorkExperience, 
  Education, 
  Project, 
  Certificate, 
  Achievement, 
  Language, 
  Reference 
} from '../types/cv/cv';

export const useCvEditor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const cvData = useSelector((state: RootState) => state.cv.cv);
  const loading = useSelector((state: RootState) => state.cv.loading);

  const [settings, setSettings] = useState<DocumentSettings>({
    theme: { primaryColor: '#B91C1C' },
    layout: 'modern',
    lang: 'en'
  });

  useEffect(() => {
    dispatch(fetchCv());
  }, [dispatch]);

  // Transform backend User model to CVContent for preview
  const transformedData = useMemo((): CVContent => {
    if (!cvData) return {
      personalInfo: { fullName: '', email: '', phone: '', address: '', jobTitle: '' },
      summary: '',
      experience: [],
      education: [],
      skills: { technical: [], soft: [] },
      projects: [],
      certifications: [],
      achievements: [],
      publications: [],
      presentations: [],
      languages: [],
      references: []
    };

    const d = cvData;

    return {
      personalInfo: {
        fullName: `${d.personal_details?.first_name || ''} ${d.personal_details?.last_name || ''}`.trim() || `${d.first_name || ''} ${d.last_name || ''}`.trim(),
        email: d.personal_details?.email || d.email,
        phone: d.personal_details?.phone || '',
        address: d.personal_details?.address || '',
        jobTitle: d.personal_details?.profile_summary?.split('.')[0] || 'Professional Title', // Fallback
        linkedin: d.personal_details?.linkedin,
        github: d.personal_details?.github,
        website: d.personal_details?.website,
        profileImage: d.personal_details?.profile_image ? `${import.meta.env.VITE_APP_API_BASE_URL}${d.personal_details.profile_image}` : undefined
      },
      summary: d.personal_details?.profile_summary || (d.career_objectives?.[0]?.career_objective || ''),
      experience: (d.work_experiences || []).map((exp: WorkExperience) => ({
        id: exp.id?.toString() || Math.random().toString(),
        company: exp.company,
        title: exp.job_title,
        location: exp.location,
        duration: `${exp.start_date} - ${exp.end_date || 'Present'}`,
        description: (exp.responsibilities || []).map((r: any) => r.value).join('\n')
      })),
      education: (d.educations || []).map((edu: Education) => ({
        id: edu.id?.toString() || Math.random().toString(),
        school: edu.institution,
        degree: edu.degree,
        location: edu.location,
        year: edu.end_date ? edu.end_date.split('-')[0] : (edu.start_date ? edu.start_date.split('-')[0] : ''),
        grade: edu.grade
      })),
      skills: {
        technical: (d.skill_sets?.[0]?.technical_skills || []).map(s => s.value),
        soft: (d.skill_sets?.[0]?.soft_skills || []).map(s => s.value)
      },
      projects: (d.projects || []).map((p: Project) => ({
        title: p.title,
        description: p.description,
        technologies: (p.technologies || []).map(t => t.value),
        link: p.link
      })),
      certifications: (d.profile?.certificates || []).map((c: Certificate) => ({
        name: c.name,
        issuer: c.issuer,
        date: c.date
      })),
      achievements: (d.achievement_profile?.achievements || []).map((a: Achievement) => a.value),
      languages: (d.languages || []).map((l: Language) => ({
        name: l.language,
        level: l.proficiency
      })),
      publications: [],
      presentations: [],
      references: (d.references || []).map((r: Reference) => ({
        name: r.name,
        position: r.position,
        contact: `${r.email} | ${r.phone}`
      }))
    };
  }, [cvData]);

  return {
    data: transformedData,
    rawData: cvData,
    settings,
    setSettings,
    loading
  };
};
