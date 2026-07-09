import React from "react";
import { 
  FaUserCircle, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaGraduationCap, 
  FaCog,
  FaTools,
  FaTrophy,
  FaLanguage,
  FaQuoteLeft,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaCalendarAlt,
  FaFileAlt,
  FaCertificate,
  FaAddressBook
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface CVPreviewProps {
  data: any;
  settings?: any;
}

const SectionTitle = ({ title, icon, color }: { title: string, icon?: React.ReactNode, color: string }) => (
  <div className="flex items-center gap-2 mb-4 border-b pb-1" style={{ borderBottomColor: `${color}20` }}>
    {icon && <span style={{ color: color }}>{icon}</span>}
    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: color }}>{title}</h3>
  </div>
);

const Preview: React.FC<CVPreviewProps> = ({ data, settings }) => {
  const { t } = useTranslation();

  const { 
    personalInfo = { 
      fullName: "Your Full Name", 
      jobTitle: "Professional Title", 
      email: "hello@twende.com", 
      phone: "+255 000 000 000", 
      address: "Dar es Salaam, TZ" 
    }, 
    summary = "",
    experience = [], 
    education = [], 
    skills = [],
    projects = [],
    publications = [],
    presentations = [],
    certifications = [],
    achievements = [],
    languages = [],
    references = []
  } = data;

  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const layout = settings?.layout || 'modern';

  // Helper for rendering skills (handles both string array and object)
  const technicalSkills = Array.isArray(skills) ? skills : (skills?.technical || []);

  // --- ATS / International ---
  if (layout === 'ats' || layout === 'international') {
    return (
      <div className="bg-white min-h-[1000px] shadow-inner p-16 text-left font-serif text-gray-900 leading-normal relative w-full max-w-[800px] mx-auto border shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold uppercase mb-2">{personalInfo.fullName}</h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">{personalInfo.jobTitle}</p>
          <div className="flex justify-center gap-2 text-[11px] mt-2 border-b pb-4">
            <span>{personalInfo.address}</span> | <span>{personalInfo.phone}</span> | <span>{personalInfo.email}</span>
          </div>
          {layout === 'international' && personalInfo.nationality && (
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">{personalInfo.nationality} National</p>
          )}
        </div>
        <div className="space-y-6">
          <div className="border-b border-black pb-1">
            <h2 className="text-xs font-bold uppercase">{t('cv.sections.summary') || "Summary"}</h2>
          </div>
          <p className="text-[11px]">{summary}</p>
          
          <div className="border-b border-black pb-1">
            <h2 className="text-xs font-bold uppercase">{t('cv.sections.work_experience') || "Professional Experience"}</h2>
          </div>
          {experience.map((exp: any, i: number) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between font-bold text-[11px]"><span>{exp.company}</span><span>{exp.duration}</span></div>
              <p className="text-[11px] italic">{exp.title}</p>
              <p className="text-[11px] mt-1 whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
          
          <div className="border-b border-black pb-1">
            <h2 className="text-xs font-bold uppercase">{t('cv.sections.education') || "Education"}</h2>
          </div>
          {education.map((edu: any, i: number) => (
            <div key={i} className="flex justify-between text-[11px] mb-2">
               <span className="font-bold">{edu.degree} - {edu.school}</span>
               <span>{edu.year}</span>
            </div>
          ))}
          
          {projects && projects.length > 0 && (
            <>
              <div className="border-b border-black pb-1 mt-4">
                <h2 className="text-xs font-bold uppercase">{t('cv.sections.projects') || "Projects"}</h2>
              </div>
              {projects.map((proj: any, i: number) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between font-bold text-[11px]"><span>{proj.title}</span></div>
                  {proj.link && <p className="text-[11px] italic">{proj.link}</p>}
                  <p className="text-[11px] mt-1 whitespace-pre-wrap">{proj.description}</p>
                </div>
              ))}
            </>
          )}
          
          {publications && publications.length > 0 && (
            <>
              <div className="border-b border-black pb-1 mt-4">
                <h2 className="text-xs font-bold uppercase">{t('cv.sections.publications') || "Publications"}</h2>
              </div>
              {publications.map((pub: any, i: number) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between font-bold text-[11px]"><span>{pub.title}</span><span>{pub.year}</span></div>
                  <p className="text-[11px] italic">{pub.journal}</p>
                </div>
              ))}
            </>
          )}

          {presentations && presentations.length > 0 && (
            <>
              <div className="border-b border-black pb-1 mt-4">
                <h2 className="text-xs font-bold uppercase">{t('cv.sections.presentations') || "Presentations"}</h2>
              </div>
              {presentations.map((pres: any, i: number) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between font-bold text-[11px]"><span>{pres.title}</span><span>{pres.year}</span></div>
                  <p className="text-[11px] italic">{pres.event}</p>
                </div>
              ))}
            </>
          )}

          {certifications && certifications.length > 0 && (
            <>
              <div className="border-b border-black pb-1 mt-4">
                <h2 className="text-xs font-bold uppercase">{t('cv.sections.certification') || "Certifications"}</h2>
              </div>
              {certifications.map((cert: any, i: number) => (
                <div key={i} className="flex justify-between text-[11px] mb-2">
                  <span className="font-bold">{cert.name} - {cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
              ))}
            </>
          )}

          {achievements && achievements.length > 0 && (
            <>
              <div className="border-b border-black pb-1 mt-4">
                <h2 className="text-xs font-bold uppercase">{t('cv.sections.achievements') || "Achievements"}</h2>
              </div>
              <ul className="list-disc list-inside text-[11px] space-y-1">
                {achievements.map((ach: string, i: number) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </>
          )}

          {languages && languages.length > 0 && (
            <>
              <div className="border-b border-black pb-1 mt-4">
                <h2 className="text-xs font-bold uppercase">{t('cv.sections.language') || "Languages"}</h2>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px]">
                {languages.map((lang: any, i: number) => (
                  <div key={i}>• {lang.name} ({lang.level})</div>
                ))}
              </div>
            </>
          )}

          {references && references.length > 0 && (
            <>
              <div className="border-b border-black pb-1 mt-4">
                <h2 className="text-xs font-bold uppercase">{t('cv.sections.references') || "References"}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                {references.map((ref: any, i: number) => (
                  <div key={i}>
                    <p className="font-bold">{ref.name}</p>
                    <p className="italic">{ref.position}</p>
                    <p>{ref.contact}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          
          <div className="border-b border-black pb-1 mt-4">
            <h2 className="text-xs font-bold uppercase">{t('cv.sections.skills') || "Skills"}</h2>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px]">
             {technicalSkills.map((s: string, i: number) => <div key={i}>• {s}</div>)}
          </div>
        </div>
      </div>
    );
  }

  // --- Executive / Academic ---
  if (layout === 'executive' || layout === 'academic') {
    return (
      <div className="bg-[#FDFCF8] min-h-[1000px] shadow-xl p-12 text-left font-serif leading-relaxed relative border-[20px] border-white w-full max-w-[800px] mx-auto">
         <div className={`text-center mb-10 pb-6 ${layout === 'academic' ? 'border-b-4 border-double' : 'border-b-2'}`} style={{ borderColor: primaryColor }}>
            <h1 className="text-3xl font-bold uppercase tracking-[0.2em] mb-3">{personalInfo.fullName}</h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mb-6">{personalInfo.jobTitle}</p>
            <div className="flex justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
               <span>{personalInfo.phone}</span><span>•</span><span>{personalInfo.email}</span>
            </div>
         </div>
         <div className="space-y-10">
            <SectionTitle title={layout === 'academic' ? (t('cv.sections.academic_summary') || "Academic Summary") : (t('cv.sections.executive_profile') || "Executive Profile")} color={primaryColor} />
            <p className="text-sm italic text-center text-gray-700 px-10 leading-loose">{summary}</p>
            
            <SectionTitle title={t('cv.sections.work_experience') || "Professional Milestones"} color={primaryColor} />
            {experience.map((exp: any, i: number) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between font-bold text-sm"><span>{exp.title}</span><span>{exp.duration}</span></div>
                <p className="text-xs italic text-gray-500">{exp.company}</p>
                <p className="text-xs mt-2 text-justify whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
            
            <SectionTitle title={t('cv.sections.education') || "Education & Credentials"} color={primaryColor} />
            {education.map((edu: any, i: number) => (
               <div key={i} className="mb-4">
                  <p className="text-sm font-bold uppercase tracking-tight">{edu.degree}</p>
                  <p className="text-xs opacity-60 uppercase tracking-widest">{edu.school} | {edu.year}</p>
               </div>
            ))}
            
            {projects && projects.length > 0 && (
               <>
                  <SectionTitle title={t('cv.sections.projects') || "Projects & Portfolio"} color={primaryColor} />
                  {projects.map((proj: any, i: number) => (
                    <div key={i} className="mb-6">
                      <div className="font-bold text-sm"><span>{proj.title}</span></div>
                      {proj.link && <p className="text-xs italic text-gray-500">{proj.link}</p>}
                      <p className="text-xs mt-2 text-justify whitespace-pre-wrap">{proj.description}</p>
                    </div>
                  ))}
               </>
            )}
            
            {publications && publications.length > 0 && (
               <>
                  <SectionTitle title={t('cv.sections.publications') || "Selected Publications"} color={primaryColor} />
                  {publications.map((pub: any, i: number) => (
                     <div key={i} className="mb-4">
                        <p className="text-sm font-bold uppercase tracking-tight">{pub.title}</p>
                        <p className="text-xs opacity-60 uppercase tracking-widest">{pub.journal} | {pub.year}</p>
                     </div>
                  ))}
               </>
            )}

            {presentations && presentations.length > 0 && (
               <>
                  <SectionTitle title={t('cv.sections.presentations') || "Presentations"} color={primaryColor} />
                  {presentations.map((pres: any, i: number) => (
                     <div key={i} className="mb-4">
                        <p className="text-sm font-bold uppercase tracking-tight">{pres.title}</p>
                        <p className="text-xs opacity-60 uppercase tracking-widest">{pres.event} | {pres.year}</p>
                     </div>
                  ))}
               </>
            )}

            {certifications && certifications.length > 0 && (
               <>
                  <SectionTitle title={t('cv.sections.certification') || "Certifications"} color={primaryColor} />
                  {certifications.map((cert: any, i: number) => (
                     <div key={i} className="mb-4">
                        <p className="text-sm font-bold uppercase tracking-tight">{cert.name}</p>
                        <p className="text-xs opacity-60 uppercase tracking-widest">{cert.issuer} | {cert.date}</p>
                     </div>
                  ))}
               </>
            )}

            {achievements && achievements.length > 0 && (
               <>
                  <SectionTitle title={t('cv.sections.achievements') || "Achievements"} color={primaryColor} />
                  <ul className="list-disc list-inside text-xs text-gray-700 space-y-2">
                    {achievements.map((ach: string, i: number) => (
                       <li key={i}>{ach}</li>
                    ))}
                  </ul>
               </>
            )}

            {languages && languages.length > 0 && (
               <>
                  <SectionTitle title={t('cv.sections.language') || "Languages"} color={primaryColor} />
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-700">
                    {languages.map((lang: any, i: number) => (
                       <div key={i} className="font-bold">{lang.name} <span className="font-normal opacity-60">({lang.level})</span></div>
                    ))}
                  </div>
               </>
            )}

            {references && references.length > 0 && (
               <>
                  <SectionTitle title={t('cv.sections.references') || "References"} color={primaryColor} />
                  <div className="grid grid-cols-2 gap-6 text-xs text-gray-700">
                    {references.map((ref: any, i: number) => (
                       <div key={i}>
                          <p className="font-bold">{ref.name}</p>
                          <p className="italic text-gray-500">{ref.position}</p>
                          <p className="opacity-80">{ref.contact}</p>
                       </div>
                    ))}
                  </div>
               </>
            )}
         </div>
      </div>
    );
  }

  // --- Creative ---
  if (layout === 'creative') {
    return (
      <div className="bg-white min-h-[1000px] shadow-xl text-left font-sans relative w-full max-w-[800px] mx-auto overflow-hidden">
         <div className="h-40 relative flex items-center px-12" style={{ backgroundColor: primaryColor }}>
            <div className="text-white z-10">
               <h1 className="text-4xl font-black uppercase tracking-tighter italic">{personalInfo.fullName}</h1>
               <p className="text-lg font-bold opacity-80 uppercase">{personalInfo.jobTitle}</p>
            </div>
         </div>
         <div className="p-12 grid grid-cols-3 gap-12">
            <div className="col-span-2 space-y-10">
               <SectionTitle title={t('cv.sections.story') || "The Story"} color={primaryColor} />
               <p className="text-sm text-gray-600 font-medium italic leading-relaxed">"{summary}"</p>
               
               <SectionTitle title={t('cv.sections.work_experience') || "Experience"} color={primaryColor} icon={<FaBriefcase />} />
               {experience.map((exp: any, i: number) => (
                 <div key={i} className="p-6 bg-gray-50 rounded-xl border-l-4 shadow-sm" style={{ borderLeftColor: primaryColor }}>
                    <div className="flex justify-between items-baseline mb-2">
                       <h4 className="font-bold text-gray-800 uppercase text-sm">{exp.title}</h4>
                       <span className="text-[10px] font-bold opacity-50">{exp.duration}</span>
                    </div>
                    <p className="text-xs font-bold mb-3 opacity-60 uppercase" style={{ color: primaryColor }}>{exp.company}</p>
                    <p className="text-xs text-gray-500 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                 </div>
               ))}
               
               {projects && projects.length > 0 && (
                 <>
                   <SectionTitle title={t('cv.sections.projects') || "Selected Projects"} color={primaryColor} icon={<FaTools />} />
                   {projects.map((proj: any, i: number) => (
                     <div key={i} className="p-6 bg-gray-50 rounded-xl shadow-sm border-l-4" style={{ borderLeftColor: primaryColor }}>
                        <h4 className="font-bold text-gray-800 uppercase text-sm mb-1">{proj.title}</h4>
                        {proj.link && <p className="text-[10px] text-blue-500 mb-2 truncate">{proj.link}</p>}
                        <p className="text-xs text-gray-500 whitespace-pre-wrap leading-relaxed">{proj.description}</p>
                     </div>
                   ))}
                 </>
               )}

               {presentations && presentations.length > 0 && (
                 <>
                   <SectionTitle title={t('cv.sections.presentations') || "Presentations"} color={primaryColor} icon={<FaFileAlt />} />
                   {presentations.map((pres: any, i: number) => (
                     <div key={i} className="p-6 bg-gray-50 rounded-xl shadow-sm border-l-4" style={{ borderLeftColor: primaryColor }}>
                        <div className="flex justify-between items-baseline mb-2">
                           <h4 className="font-bold text-gray-800 uppercase text-sm">{pres.title}</h4>
                           <span className="text-[10px] font-bold opacity-50">{pres.year}</span>
                        </div>
                        <p className="text-xs text-gray-500">{pres.event}</p>
                     </div>
                   ))}
                 </>
               )}

               {references && references.length > 0 && (
                 <>
                   <SectionTitle title={t('cv.sections.references') || "References"} color={primaryColor} icon={<FaAddressBook />} />
                   <div className="grid grid-cols-2 gap-6">
                     {references.map((ref: any, i: number) => (
                       <div key={i} className="p-6 bg-gray-50 rounded-xl shadow-sm border-l-4" style={{ borderLeftColor: primaryColor }}>
                          <h4 className="font-bold text-gray-800 uppercase text-sm mb-1">{ref.name}</h4>
                          <p className="text-xs font-bold opacity-60 uppercase mb-2" style={{ color: primaryColor }}>{ref.position}</p>
                          <p className="text-xs text-gray-500 whitespace-pre-wrap">{ref.contact}</p>
                       </div>
                     ))}
                   </div>
                 </>
               )}
            </div>
            
            <div className="space-y-10">
               <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl min-w-[200px]">
                  <h3 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">{t('cv.sections.contact') || "Contact Information"}</h3>
                  <div className="space-y-4 text-[11px]">
                     <div className="flex items-start gap-3"><FaPhone className="opacity-40 mt-0.5 shrink-0" /> <span className="break-words">{personalInfo.phone}</span></div>
                     <div className="flex items-start gap-3"><FaEnvelope className="opacity-40 mt-0.5 shrink-0" /> <span className="break-words">{personalInfo.email}</span></div>
                     <div className="flex items-start gap-3"><FaMapMarkerAlt className="opacity-40 mt-0.5 shrink-0" /> <span className="break-words">{personalInfo.address}</span></div>
                  </div>
               </div>
               
               <div>
                  <SectionTitle title={t('cv.sections.skills') || "Expertise"} color={primaryColor} icon={<FaTools />} />
                  <div className="flex flex-wrap gap-2">
                     {technicalSkills.map((s: string, i: number) => (
                       <span key={i} className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-bold text-gray-600 border border-gray-200">{s}</span>
                     ))}
                  </div>
               </div>
               
               <div>
                  <SectionTitle title={t('cv.sections.education') || "Education"} color={primaryColor} icon={<FaGraduationCap />} />
                  {education.map((edu: any, i: number) => (
                    <div key={i} className="mb-4">
                       <p className="text-xs font-bold uppercase">{edu.degree}</p>
                       <p className="text-[10px] opacity-60">{edu.school} | {edu.year}</p>
                    </div>
                  ))}
               </div>
               
               {publications && publications.length > 0 && (
                 <div>
                    <SectionTitle title={t('cv.sections.publications') || "Publications"} color={primaryColor} icon={<FaFileAlt />} />
                    {publications.map((pub: any, i: number) => (
                      <div key={i} className="mb-4">
                         <p className="text-xs font-bold uppercase">{pub.title}</p>
                         <p className="text-[10px] opacity-60">{pub.journal} | {pub.year}</p>
                      </div>
                    ))}
                 </div>
               )}

               {certifications && certifications.length > 0 && (
                 <div>
                    <SectionTitle title={t('cv.sections.certification') || "Certifications"} color={primaryColor} icon={<FaCertificate />} />
                    {certifications.map((cert: any, i: number) => (
                      <div key={i} className="mb-4">
                         <p className="text-xs font-bold uppercase">{cert.name}</p>
                         <p className="text-[10px] opacity-60">{cert.issuer} | {cert.date}</p>
                      </div>
                    ))}
                 </div>
               )}

               {achievements && achievements.length > 0 && (
                 <div>
                    <SectionTitle title={t('cv.sections.achievements') || "Achievements"} color={primaryColor} icon={<FaTrophy />} />
                    <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-1">
                      {achievements.map((ach: string, i: number) => (
                         <li key={i}>{ach}</li>
                      ))}
                    </ul>
                 </div>
               )}

               {languages && languages.length > 0 && (
                 <div>
                    <SectionTitle title={t('cv.sections.language') || "Languages"} color={primaryColor} icon={<FaLanguage />} />
                    <div className="space-y-2">
                      {languages.map((lang: any, i: number) => (
                        <div key={i} className="flex justify-between text-[11px] text-gray-600">
                           <span className="font-bold">{lang.name}</span>
                           <span>{lang.level}</span>
                        </div>
                      ))}
                    </div>
                 </div>
               )}
            </div>
         </div>
      </div>
    );
  }

  // --- Minimalist ---
  if (layout === 'minimal') {
    return (
      <div className="bg-white min-h-[1000px] shadow-xl p-16 text-left font-sans text-gray-800 w-full max-w-[800px] mx-auto">
         <div className="mb-12">
            <h1 className="text-2xl font-light tracking-[0.3em] uppercase mb-2">{personalInfo.fullName}</h1>
            <p className="text-[10px] tracking-widest uppercase opacity-40 font-bold">{personalInfo.jobTitle}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[10px] border-t pt-4 opacity-50 uppercase font-black">
               <span>{personalInfo.email}</span>
               <span>{personalInfo.phone}</span>
               <span>{personalInfo.address}</span>
            </div>
         </div>
         <div className="space-y-16">
            <div className="max-w-2xl"><p className="text-xs leading-relaxed opacity-60 italic">{summary}</p></div>
            
            <div>
               <h2 className="text-[10px] font-black uppercase tracking-widest mb-8 opacity-20 border-b pb-1">{t('cv.sections.work_experience') || "Professional History"}</h2>
               <div className="space-y-10">
                  {experience.map((exp: any, i: number) => (
                    <div key={i} className="grid grid-cols-4 gap-8">
                       <div className="text-[9px] font-black opacity-30 uppercase tracking-tighter">{exp.duration}</div>
                       <div className="col-span-3">
                          <h4 className="text-xs font-black uppercase tracking-tight">{exp.title}</h4>
                          <p className="text-[10px] font-bold opacity-50 mb-3 uppercase" style={{ color: primaryColor }}>{exp.company}</p>
                          <p className="text-[10px] leading-loose opacity-60 whitespace-pre-wrap">{exp.description}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            
            <div>
               <h2 className="text-[10px] font-black uppercase tracking-widest mb-8 opacity-20 border-b pb-1">{t('cv.sections.education') || "Academic Background"}</h2>
               <div className="space-y-6">
                  {education.map((edu: any, i: number) => (
                    <div key={i} className="flex justify-between items-baseline">
                       <div>
                          <h4 className="text-xs font-black uppercase">{edu.degree}</h4>
                          <p className="text-[10px] opacity-50 uppercase font-bold">{edu.school}</p>
                       </div>
                       <span className="text-[9px] font-black opacity-30 uppercase">{edu.year}</span>
                    </div>
                  ))}
               </div>
            </div>
            
            {projects && projects.length > 0 && (
               <div>
                  <h2 className="text-[10px] font-black uppercase tracking-widest mb-8 opacity-20 border-b pb-1">{t('cv.sections.projects') || "Projects & Portfolio"}</h2>
                  <div className="space-y-10">
                     {projects.map((proj: any, i: number) => (
                       <div key={i} className="grid grid-cols-4 gap-8">
                          <div className="text-[9px] font-black opacity-30 uppercase tracking-tighter">-</div>
                          <div className="col-span-3">
                             <h4 className="text-xs font-black uppercase tracking-tight">{proj.title}</h4>
                             {proj.link && <p className="text-[10px] font-bold opacity-50 mb-3 uppercase" style={{ color: primaryColor }}>{proj.link}</p>}
                             <p className="text-[10px] leading-loose opacity-60 whitespace-pre-wrap">{proj.description}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            )}
            
            {publications && publications.length > 0 && (
               <div>
                  <h2 className="text-[10px] font-black uppercase tracking-widest mb-8 opacity-20 border-b pb-1">{t('cv.sections.publications') || "Publications"}</h2>
                  <div className="space-y-6">
                     {publications.map((pub: any, i: number) => (
                       <div key={i} className="flex justify-between items-baseline">
                          <div>
                             <h4 className="text-xs font-black uppercase">{pub.title}</h4>
                             <p className="text-[10px] opacity-50 uppercase font-bold">{pub.journal}</p>
                          </div>
                          <span className="text-[9px] font-black opacity-30 uppercase">{pub.year}</span>
                       </div>
                     ))}
                  </div>
               </div>
            )}

            {presentations && presentations.length > 0 && (
               <div>
                  <h2 className="text-[10px] font-black uppercase tracking-widest mb-8 opacity-20 border-b pb-1">{t('cv.sections.presentations') || "Presentations"}</h2>
                  <div className="space-y-6">
                     {presentations.map((pres: any, i: number) => (
                       <div key={i} className="flex justify-between items-baseline">
                          <div>
                             <h4 className="text-xs font-black uppercase">{pres.title}</h4>
                             <p className="text-[10px] opacity-50 uppercase font-bold">{pres.event}</p>
                          </div>
                          <span className="text-[9px] font-black opacity-30 uppercase">{pres.year}</span>
                       </div>
                     ))}
                  </div>
               </div>
            )}

            {certifications && certifications.length > 0 && (
               <div>
                  <h2 className="text-[10px] font-black uppercase tracking-widest mb-8 opacity-20 border-b pb-1">{t('cv.sections.certification') || "Certifications"}</h2>
                  <div className="space-y-6">
                     {certifications.map((cert: any, i: number) => (
                       <div key={i} className="flex justify-between items-baseline">
                          <div>
                             <h4 className="text-xs font-black uppercase">{cert.name}</h4>
                             <p className="text-[10px] opacity-50 uppercase font-bold">{cert.issuer}</p>
                          </div>
                          <span className="text-[9px] font-black opacity-30 uppercase">{cert.date}</span>
                       </div>
                     ))}
                  </div>
               </div>
            )}

            {achievements && achievements.length > 0 && (
               <div>
                  <h2 className="text-[10px] font-black uppercase tracking-widest mb-8 opacity-20 border-b pb-1">{t('cv.sections.achievements') || "Achievements"}</h2>
                  <ul className="list-disc list-inside text-[10px] opacity-60 space-y-2">
                    {achievements.map((ach: string, i: number) => (
                       <li key={i}>{ach}</li>
                    ))}
                  </ul>
               </div>
            )}

            {languages && languages.length > 0 && (
               <div>
                  <h2 className="text-[10px] font-black uppercase tracking-widest mb-8 opacity-20 border-b pb-1">{t('cv.sections.language') || "Languages"}</h2>
                  <div className="space-y-3">
                    {languages.map((lang: any, i: number) => (
                       <div key={i} className="flex justify-between items-baseline text-[10px] opacity-60">
                          <span className="font-bold uppercase">{lang.name}</span>
                          <span>{lang.level}</span>
                       </div>
                    ))}
                  </div>
               </div>
            )}

            {references && references.length > 0 && (
               <div>
                  <h2 className="text-[10px] font-black uppercase tracking-widest mb-8 opacity-20 border-b pb-1">{t('cv.sections.references') || "References"}</h2>
                  <div className="grid grid-cols-2 gap-8">
                     {references.map((ref: any, i: number) => (
                       <div key={i}>
                          <h4 className="text-xs font-black uppercase">{ref.name}</h4>
                          <p className="text-[10px] opacity-50 uppercase font-bold">{ref.position}</p>
                          <p className="text-[10px] opacity-60 mt-1">{ref.contact}</p>
                       </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
    );
  }

  // --- Corporate / Standard / Modern / Technical / Student ---
  return (
    <div className="bg-white min-h-[1000px] shadow-xl flex flex-col md:flex-row text-left font-sans w-full max-w-[800px] mx-auto overflow-hidden">
      {/* Sidebar */}
      <div className={`w-full md:w-64 bg-slate-50 p-8 border-r ${layout === 'technical' ? 'bg-slate-900 text-white' : ''}`}>
         <div className="text-center mb-10">
            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto flex items-center justify-center mb-4 border-2 border-white shadow-sm overflow-hidden">
               {personalInfo.profileImage ? (
                  <img src={personalInfo.profileImage} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                  <FaUserCircle className="text-slate-400 text-5xl" />
               )}
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest" style={{ color: primaryColor }}>{t('cv.sections.personal_information') || "Personal Profile"}</h3>
         </div>
         <div className="space-y-8">
            <div>
               <SectionTitle title={t('cv.sections.contact') || "Contact"} color={primaryColor} icon={<FaEnvelope />} />
               <div className={`space-y-3 text-[10px] font-bold ${layout === 'technical' ? 'text-slate-400' : 'text-slate-500'}`}>
                  <p className="flex items-center gap-2 truncate"><FaPhone style={{ color: primaryColor }} /> {personalInfo.phone}</p>
                  <p className="flex items-center gap-2 truncate"><FaEnvelope style={{ color: primaryColor }} /> {personalInfo.email}</p>
                  <p className="flex items-center gap-2 truncate"><FaMapMarkerAlt style={{ color: primaryColor }} /> {personalInfo.address}</p>
               </div>
            </div>
            
            {languages && languages.length > 0 && (
               <div>
                  <SectionTitle title={t('cv.sections.language') || "Languages"} color={primaryColor} icon={<FaLanguage />} />
                  <div className="space-y-2 text-[10px] font-bold text-slate-500">
                     {languages.map((lang: any, i: number) => (
                        <p key={i} className="flex justify-between">
                           <span>{lang.name}</span>
                           <span style={{ color: primaryColor }}>{lang.level}</span>
                        </p>
                     ))}
                  </div>
               </div>
            )}

            {achievements && achievements.length > 0 && (
               <div>
                  <SectionTitle title={t('cv.sections.achievements') || "Achievements"} color={primaryColor} icon={<FaTrophy />} />
                  <ul className="list-disc list-inside text-[9px] font-bold text-slate-500 space-y-1">
                     {achievements.map((ach: string, i: number) => (
                        <li key={i} className="truncate">{ach}</li>
                     ))}
                  </ul>
               </div>
            )}

            <div>
               <SectionTitle title={t('cv.sections.skills') || "Skills"} color={primaryColor} icon={<FaCog />} />
               <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((s: string, i: number) => (
                     <span key={i} className={`px-2 py-1 rounded text-[9px] font-black uppercase border ${layout === 'technical' ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-slate-100 text-slate-600 shadow-sm'}`}>
                        {s}
                     </span>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-10 flex flex-col gap-10">
         <header>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2" style={{ color: primaryColor }}>{personalInfo.fullName}</h1>
            <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">{personalInfo.jobTitle}</p>
         </header>

         {summary && (
            <section className="bg-slate-50 p-6 rounded-3xl border-l-4" style={{ borderLeftColor: primaryColor }}>
               <p className="text-sm text-slate-600 font-medium italic leading-relaxed">"{summary}"</p>
            </section>
         )}

         <section>
            <SectionTitle title={layout === 'student' ? (t('cv.sections.projects') || 'Projects & Roles') : (t('cv.sections.work_experience') || 'Experience')} color={primaryColor} icon={<FaBriefcase />} />
            <div className="space-y-8">
               {experience.map((exp: any, i: number) => (
                  <div key={i} className="group">
                     <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-black text-slate-800 uppercase tracking-tight">{exp.title}</h4>
                        <span className="text-[10px] font-black px-2 py-1 rounded bg-slate-100 uppercase" style={{ color: primaryColor }}>{exp.duration}</span>
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{exp.company}</p>
                     <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap text-justify">{exp.description}</p>
                  </div>
               ))}
            </div>
         </section>

         {projects && projects.length > 0 && (
            <section>
               <SectionTitle title={t('cv.sections.projects') || "Projects & Portfolio"} color={primaryColor} icon={<FaTools />} />
               <div className="space-y-8">
                  {projects.map((proj: any, i: number) => (
                     <div key={i} className="group">
                        <h4 className="font-black text-slate-800 uppercase tracking-tight mb-1">{proj.title}</h4>
                        {proj.link && <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-3 truncate">{proj.link}</p>}
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap text-justify">{proj.description}</p>
                     </div>
                  ))}
               </div>
            </section>
         )}

         <section>
            <SectionTitle title={t('cv.sections.education') || "Education"} color={primaryColor} icon={<FaGraduationCap />} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {education.map((edu: any, i: number) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-xl shadow-sm">
                     <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-1">{edu.degree}</h4>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{edu.school} | {edu.year}</p>
                  </div>
               ))}
            </div>
         </section>

         {publications && publications.length > 0 && (
            <section>
               <SectionTitle title={t('cv.sections.publications') || "Publications"} color={primaryColor} icon={<FaFileAlt />} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {publications.map((pub: any, i: number) => (
                     <div key={i} className="bg-slate-50 p-4 rounded-xl shadow-sm">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-1">{pub.title}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{pub.journal} | {pub.year}</p>
                     </div>
                  ))}
               </div>
            </section>
         )}

         {presentations && presentations.length > 0 && (
            <section>
               <SectionTitle title={t('cv.sections.presentations') || "Presentations"} color={primaryColor} icon={<FaFileAlt />} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {presentations.map((pres: any, i: number) => (
                     <div key={i} className="bg-slate-50 p-4 rounded-xl shadow-sm">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-1">{pres.title}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{pres.event} | {pres.year}</p>
                     </div>
                  ))}
               </div>
            </section>
         )}

         {certifications && certifications.length > 0 && (
            <section>
               <SectionTitle title={t('cv.sections.certification') || "Certifications"} color={primaryColor} icon={<FaCertificate />} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certifications.map((cert: any, i: number) => (
                     <div key={i} className="bg-slate-50 p-4 rounded-xl shadow-sm">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-1">{cert.name}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cert.issuer} | {cert.date}</p>
                     </div>
                  ))}
               </div>
            </section>
         )}

         {references && references.length > 0 && (
            <section>
               <SectionTitle title={t('cv.sections.references') || "References"} color={primaryColor} icon={<FaAddressBook />} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {references.map((ref: any, i: number) => (
                     <div key={i} className="bg-slate-50 p-4 rounded-xl shadow-sm">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-1">{ref.name}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{ref.position}</p>
                        <p className="text-[10px] text-slate-500 truncate">{ref.contact}</p>
                     </div>
                  ))}
               </div>
            </section>
         )}
      </div>
    </div>
  );
};

export default Preview;
