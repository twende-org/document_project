import React from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaCog } from "react-icons/fa";

interface CVPreviewProps {
  data: any;
  settings?: any;
}

const Preview: React.FC<CVPreviewProps> = ({ data, settings }) => {
  const { 
    personalInfo = { 
      fullName: "Your Full Name", 
      jobTitle: "Professional Title", 
      email: "hello@twende.com", 
      phone: "+255 000 000 000", 
      address: "Dar es Salaam, TZ" 
    }, 
    summary = "Strategic leader with 10+ years experience...",
    experience = [], 
    education = [], 
    skills = [] 
  } = data;

  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const layout = settings?.layout || 'standard';

  // Elegant Layout (Centered)
  if (layout === 'elegant') {
    return (
      <div className="bg-slate-200 p-4 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden min-h-[800px] sticky top-32">
        <div className="bg-white shadow-inner min-h-[700px] flex flex-col font-sans text-charcoal p-12 text-center">
          <header className="mb-16 border-b pb-12" style={{ borderColor: primaryColor + '20' }}>
            <h2 className="text-5xl font-black text-charcoal uppercase tracking-[0.2em] mb-4" style={{ color: primaryColor }}>{personalInfo.fullName}</h2>
            <p className="text-sm font-black text-gray-400 uppercase tracking-[0.5em] mb-8">{personalInfo.jobTitle}</p>
            <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
               <span>{personalInfo.phone}</span>
               <span style={{ color: primaryColor }}>•</span>
               <span>{personalInfo.email}</span>
               <span style={{ color: primaryColor }}>•</span>
               <span>{personalInfo.address}</span>
            </div>
          </header>

          <div className="max-w-3xl mx-auto space-y-16">
            <section>
              <p className="text-sm text-gray-500 leading-loose italic font-medium">"{summary}"</p>
            </section>

            <section>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center justify-center gap-4">
                 <div className="h-px bg-gray-100 flex-1" />
                 Experience
                 <div className="h-px bg-gray-100 flex-1" />
              </h4>
              <div className="space-y-12">
                 {experience.map((exp: any, i: number) => (
                   <div key={i}>
                      <h5 className="font-black text-charcoal uppercase tracking-widest mb-1">{exp.title}</h5>
                      <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: primaryColor }}>{exp.company} | {exp.duration}</p>
                      <p className="text-xs text-gray-500 leading-relaxed text-justify">{exp.description}</p>
                   </div>
                 ))}
              </div>
            </section>

            <section>
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center justify-center gap-4">
                 <div className="h-px bg-gray-100 flex-1" />
                 Expertise
                 <div className="h-px bg-gray-100 flex-1" />
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                 {skills.map((s: string, i: number) => (
                   <span key={i} className="px-4 py-2 border rounded-full text-[10px] font-black uppercase tracking-widest" style={{ borderColor: primaryColor + '40', color: primaryColor }}>
                     {s.trim()}
                   </span>
                 ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // Modern Layout (Full Width)
  if (layout === 'modern') {
    return (
      <div className="bg-slate-200 p-2 md:p-4 rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden min-h-[600px] sticky top-32 text-left w-full">
        <div className="bg-white shadow-inner min-h-[580px] flex flex-col font-sans text-charcoal p-6 overflow-hidden w-full">
           <header className="mb-6 flex flex-row justify-between items-end border-b-2 pb-4 gap-4" style={{ borderBottomColor: primaryColor }}>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl sm:text-3xl font-black text-charcoal uppercase tracking-tighter leading-none mb-1 break-words">{personalInfo.fullName}</h2>
                <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-tight break-words">{personalInfo.jobTitle}</p>
              </div>
              <div className="text-right text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-gray-400 space-y-1 shrink-0 max-w-[140px]">
                 <p className="truncate break-words">{personalInfo.phone}</p>
                 <p className="truncate break-words">{personalInfo.email}</p>
                 <p className="truncate break-words">{personalInfo.address}</p>
              </div>
           </header>

           <div className="flex flex-row gap-4 sm:gap-6 w-full">
              <div className="flex-[7] space-y-6 min-w-0">
                 <section>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium leading-relaxed border-l-2 pl-3 break-words whitespace-pre-wrap" style={{ borderLeftColor: primaryColor }}>{summary}</p>
                 </section>
                 <section>
                    <h4 className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4">Professional History</h4>
                    <div className="space-y-6 w-full">
                       {experience.map((exp: any, i: number) => (
                         <div key={i} className="min-w-0 w-full">
                            <div className="flex flex-col mb-1">
                               <h5 className="font-black text-charcoal uppercase text-xs sm:text-sm break-words w-full">{exp.title}</h5>
                               <span className="text-[8px] font-black text-gray-400 mt-0.5">{exp.duration}</span>
                            </div>
                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-2 break-words" style={{ color: primaryColor }}>{exp.company}</p>
                            <p className="text-[9px] sm:text-[10px] text-gray-500 leading-relaxed break-words whitespace-pre-wrap">{exp.description}</p>
                         </div>
                       ))}
                    </div>
                 </section>
              </div>
              <div className="flex-[4] space-y-6 min-w-0">
                 <section>
                    <h4 className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4">Expertise</h4>
                    <div className="flex flex-col gap-1.5">
                       {skills.map((s: string, i: number) => (
                         <div key={i} className="flex items-start gap-2 min-w-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: primaryColor }} />
                            <span className="text-[9px] font-bold uppercase tracking-tight break-words leading-tight">{s}</span>
                         </div>
                       ))}
                    </div>
                 </section>
                 <section>
                    <h4 className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4">Academic Background</h4>
                    <div className="space-y-3">
                       {education.map((edu: any, i: number) => (
                         <div key={i} className="min-w-0">
                            <p className="text-[9px] font-black text-charcoal uppercase break-words leading-tight mb-0.5">{edu.degree}</p>
                            <p className="text-[8px] font-bold text-gray-400 break-words">{edu.school}</p>
                         </div>
                       ))}
                    </div>
                 </section>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Standard/Compact Layout (Sidebar)
  const isCompact = layout === 'compact';

  return (
    <div className="bg-slate-200 p-4 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden min-h-[800px] sticky top-32 text-left">
      <div className={`bg-white shadow-inner min-h-[700px] flex font-sans text-charcoal ${isCompact ? 'text-[10px]' : ''}`}>
        
        {/* Sidebar */}
        <div className={`${isCompact ? 'w-2/5 p-6' : 'w-2/5 p-8'} bg-slate-50 pt-12 flex flex-col gap-12 border-r border-slate-100`}>
           <div className="flex flex-col items-center text-center">
              <div className={`bg-slate-200 text-gray-400 rounded-full flex items-center justify-center mb-6 shadow-sm ${isCompact ? 'w-16 h-16 text-2xl' : 'w-24 h-24 text-4xl'}`}>
                <FaUserCircle style={{ color: primaryColor + '40' }} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: primaryColor }}>Architect Identity</p>
           </div>

           {/* Contact */}
           <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                <FaEnvelope style={{ color: primaryColor }} /> Contact
              </h4>
              <div className="space-y-4">
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Phone</span>
                    <span className="font-black truncate">{personalInfo.phone}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Email</span>
                    <span className="font-black truncate">{personalInfo.email}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Location</span>
                    <span className="font-black truncate">{personalInfo.address}</span>
                 </div>
              </div>
           </div>

           {/* Skills */}
           <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                <FaCog style={{ color: primaryColor }} /> Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                 {skills.map((s: string, i: number) => (
                   <span key={i} className={`bg-white px-3 py-1 rounded-full font-black text-charcoal shadow-sm border border-slate-100 uppercase tracking-tighter ${isCompact ? 'text-[8px]' : 'text-[10px]'}`}>
                     {s.trim()}
                   </span>
                 ))}
              </div>
           </div>
        </div>

        {/* Main Content */}
        <div className={`${isCompact ? 'w-3/5 p-8' : 'w-3/5 p-10'} pt-16`}>
           <header className="mb-12">
              <h2 className={`${isCompact ? 'text-2xl' : 'text-4xl'} font-black text-charcoal uppercase tracking-tighter leading-none mb-2`}>{personalInfo.fullName}</h2>
              <p className="font-black uppercase tracking-[0.4em] mb-8" style={{ color: primaryColor }}>{personalInfo.jobTitle}</p>
              
              <div className="bg-slate-50 p-6 rounded-3xl border-l-4 shadow-sm" style={{ borderLeftColor: primaryColor }}>
                 <p className="text-gray-500 font-bold leading-relaxed italic">"{summary}"</p>
              </div>
           </header>

           {/* Experience */}
           <section className="mb-12">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-slate-100 pb-2 flex items-center gap-2">
                <FaBriefcase style={{ color: primaryColor }} /> Experience
              </h4>
              <div className="space-y-8">
                 {experience.length > 0 ? experience.map((exp: any, i: number) => (
                    <div key={i} className="group text-left">
                       <div className="flex justify-between items-start mb-1">
                          <h5 className="font-black text-charcoal uppercase tracking-tight">{exp.title}</h5>
                          <span className="text-[8px] font-black px-2 py-1 rounded-md" style={{ backgroundColor: primaryColor + '10', color: primaryColor }}>{exp.duration}</span>
                       </div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{exp.company}</p>
                       <p className="text-gray-500 font-medium leading-relaxed">{exp.description}</p>
                    </div>
                 )) : (
                    <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Entry history will appear here</p>
                    </div>
                 )}
              </div>
           </section>

           {/* Education */}
           <section>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-slate-100 pb-2 flex items-center gap-2">
                <FaGraduationCap style={{ color: primaryColor }} /> Education
              </h4>
              <div className="space-y-4">
                 {education.map((edu: any, i: number) => (
                    <div key={i} className="text-left">
                       <h5 className="font-black text-charcoal uppercase tracking-tight text-xs">{edu.degree}</h5>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{edu.school} | {edu.year}</p>
                    </div>
                 ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default Preview;
