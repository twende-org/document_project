import React from 'react';
import type { CVContent, DocumentSettings } from '../../documents/types';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaGlobe,
  FaCalendarAlt,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaProjectDiagram,
  FaTrophy,
  FaLanguage,
  FaQuoteLeft
} from 'react-icons/fa';

interface CvLivePreviewProps {
  data: CVContent;
  settings?: DocumentSettings;
}

const SectionTitle = ({ title, icon, color }: { title: string, icon?: React.ReactNode, color: string }) => (
  <div className="flex items-center gap-2 mb-4 border-b pb-1" style={{ borderBottomColor: `${color}20` }}>
    {icon && <span style={{ color: color }}>{icon}</span>}
    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: color }}>{title}</h3>
  </div>
);

const CvLivePreview: React.FC<CvLivePreviewProps> = ({ data, settings }) => {
  const { 
    personalInfo = {} as any, 
    summary = '', 
    experience = [], 
    education = [], 
    skills = { technical: [], soft: [] },
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
    references = []
  } = data;

  const primaryColor = settings?.theme?.primaryColor || '#B91C1C';
  const layout = settings?.layout || 'modern';

  // --- ATS / International ---
  if (layout === 'ats' || layout === 'international') {
    return (
      <div className="bg-white min-h-[1000px] shadow-inner p-16 text-left font-serif text-gray-900 leading-normal relative">
        <div className="absolute top-2 right-2 bg-black text-white text-[8px] px-2 rounded z-50">PREVIEW: {layout.toUpperCase()}</div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold uppercase">{personalInfo.fullName}</h1>
          <div className="flex justify-center gap-2 text-[11px] mt-2 border-b pb-4">
            <span>{personalInfo.address}</span> | <span>{personalInfo.phone}</span> | <span>{personalInfo.email}</span>
          </div>
        </div>
        <div className="space-y-6">
          <div className="border-b border-black pb-1"><h2 className="text-xs font-bold uppercase">Summary</h2></div>
          <p className="text-[11px]">{summary}</p>
          <div className="border-b border-black pb-1"><h2 className="text-xs font-bold uppercase">Experience</h2></div>
          {experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between font-bold text-[11px]"><span>{exp.company}</span><span>{exp.duration}</span></div>
              <p className="text-[11px] italic">{exp.title}</p>
              <p className="text-[11px] mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Executive / Academic ---
  if (layout === 'executive' || layout === 'academic') {
    return (
      <div className="bg-[#FDFCF8] min-h-[1000px] shadow-inner p-12 text-left font-serif leading-relaxed relative border-[20px] border-white">
         <div className="absolute top-2 right-2 bg-blue-600 text-white text-[8px] px-2 rounded z-50">PREVIEW: {layout.toUpperCase()}</div>
         <div className="text-center mb-10 border-b-2 pb-6" style={{ borderColor: primaryColor }}>
            <h1 className="text-3xl font-bold uppercase tracking-[0.2em] mb-2">{personalInfo.fullName}</h1>
            <div className="flex justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
               <span>{personalInfo.phone}</span><span>•</span><span>{personalInfo.email}</span>
            </div>
         </div>
         <div className="space-y-10">
            <SectionTitle title="Executive Profile" color={primaryColor} />
            <p className="text-sm italic text-center text-gray-700 px-10">{summary}</p>
            <SectionTitle title="Professional Experience" color={primaryColor} />
            {experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between font-bold text-sm"><span>{exp.title}</span><span>{exp.duration}</span></div>
                <p className="text-xs italic text-gray-500">{exp.company}</p>
                <p className="text-xs mt-2 text-justify">{exp.description}</p>
              </div>
            ))}
         </div>
      </div>
    );
  }

  // --- Creative ---
  if (layout === 'creative') {
    return (
      <div className="bg-white min-h-[1000px] shadow-inner text-left font-sans relative">
         <div className="absolute top-2 right-2 bg-pink-600 text-white text-[8px] px-2 rounded z-50">PREVIEW: CREATIVE</div>
         <div className="h-40 relative flex items-center px-12" style={{ backgroundColor: primaryColor }}>
            <div className="text-white">
               <h1 className="text-4xl font-black uppercase">{personalInfo.fullName}</h1>
               <p className="text-lg font-bold opacity-80">{personalInfo.jobTitle}</p>
            </div>
         </div>
         <div className="p-12 grid grid-cols-3 gap-12">
            <div className="col-span-2 space-y-10">
               <SectionTitle title="The Story" color={primaryColor} />
               <p className="text-sm text-gray-600 font-medium italic">{summary}</p>
               <SectionTitle title="Experience" color={primaryColor} />
               {experience.map((exp, i) => (
                 <div key={i} className="p-4 bg-gray-50 rounded-xl border-l-4" style={{ borderLeftColor: primaryColor }}>
                    <h4 className="font-bold text-gray-800">{exp.title}</h4>
                    <p className="text-xs text-gray-500">{exp.description}</p>
                 </div>
               ))}
            </div>
            <div className="space-y-8">
               <div className="p-6 bg-slate-900 text-white rounded-3xl">
                  <h3 className="text-xs font-bold mb-4 opacity-50">Contact</h3>
                  <p className="text-[10px]">{personalInfo.email}</p>
                  <p className="text-[10px]">{personalInfo.phone}</p>
               </div>
            </div>
         </div>
      </div>
    );
  }

  // --- Default / Modern / Others ---
  return (
    <div className="bg-white min-h-[1000px] shadow-inner flex flex-col md:flex-row text-left font-sans relative">
      <div className="absolute top-2 right-2 bg-green-600 text-white text-[8px] px-2 rounded z-50">PREVIEW: {layout.toUpperCase()}</div>
      <div className="w-full md:w-64 bg-slate-50 p-8 border-r">
         <SectionTitle title="Contact" color={primaryColor} />
         <p className="text-[11px] text-gray-600 mb-2">{personalInfo.email}</p>
         <p className="text-[11px] text-gray-600">{personalInfo.phone}</p>
         <div className="mt-10">
            <SectionTitle title="Skills" color={primaryColor} />
            <div className="flex flex-wrap gap-2">
                {(Array.isArray(skills) ? skills : (skills?.technical || [])).map((s: string, i: number) => <span key={i} className="text-[10px] px-2 py-1 bg-white border rounded">{s}</span>)}
            </div>
         </div>
      </div>
      <div className="flex-1 p-10 space-y-8">
         <div>
            <h1 className="text-4xl font-black uppercase" style={{ color: primaryColor }}>{personalInfo.fullName}</h1>
            <p className="text-lg font-bold text-gray-400">{personalInfo.jobTitle}</p>
         </div>
         <SectionTitle title="Profile" color={primaryColor} />
         <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
         <SectionTitle title="Experience" color={primaryColor} icon={<FaBriefcase />} />
         {experience.map((exp, i) => (
            <div key={i} className="border-l-2 pl-4" style={{ borderLeftColor: primaryColor + '40' }}>
               <h4 className="text-sm font-bold">{exp.title}</h4>
               <p className="text-[11px] font-bold" style={{ color: primaryColor }}>{exp.company}</p>
               <p className="text-[11px] text-gray-500 mt-2">{exp.description}</p>
            </div>
         ))}
      </div>
    </div>
  );
};

export default CvLivePreview;
