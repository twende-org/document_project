import React from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaCog } from "react-icons/fa";

interface CVPreviewProps {
  data: any;
}

const Preview: React.FC<CVPreviewProps> = ({ data }) => {
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

  return (
    <div className="bg-slate-200 p-4 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden min-h-[800px] sticky top-32">
      <div className="bg-white shadow-inner min-h-[700px] flex font-sans text-charcoal">
        
        {/* Sidebar */}
        <div className="w-1/3 bg-slate-50 p-8 pt-12 flex flex-col gap-12 border-r border-slate-100">
           <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-redMain/10 text-redMain rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
                <FaUserCircle />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-redMain">Architect Identity</p>
           </div>

           {/* Contact */}
           <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                <FaEnvelope className="text-redMain" /> Contact
              </h4>
              <div className="space-y-4">
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Phone</span>
                    <span className="text-xs font-black truncate">{personalInfo.phone}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Email</span>
                    <span className="text-xs font-black truncate">{personalInfo.email}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Location</span>
                    <span className="text-xs font-black truncate">{personalInfo.address}</span>
                 </div>
              </div>
           </div>

           {/* Skills */}
           <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                <FaCog className="text-redMain" /> Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                 {skills.map((s: string, i: number) => (
                   <span key={i} className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-charcoal shadow-sm border border-slate-100 uppercase tracking-tighter">
                     {s.trim()}
                   </span>
                 ))}
              </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-10 pt-16">
           <header className="mb-12">
              <h2 className="text-4xl font-black text-charcoal uppercase tracking-tighter leading-none mb-2">{personalInfo.fullName}</h2>
              <p className="text-sm font-black text-redMain uppercase tracking-[0.4em] mb-8">{personalInfo.jobTitle}</p>
              
              <div className="bg-slate-50 p-6 rounded-3xl border-l-4 border-redMain shadow-sm">
                 <p className="text-xs text-gray-500 font-bold leading-relaxed italic">"{summary}"</p>
              </div>
           </header>

           {/* Experience */}
           <section className="mb-12">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-slate-100 pb-2 flex items-center gap-2">
                <FaBriefcase className="text-redMain" /> Experience
              </h4>
              <div className="space-y-8">
                 {experience.length > 0 ? experience.map((exp: any, i: number) => (
                    <div key={i} className="group">
                       <div className="flex justify-between items-start mb-1">
                          <h5 className="font-black text-charcoal uppercase tracking-tight">{exp.title}</h5>
                          <span className="text-[8px] font-black text-redMain bg-redMain/5 px-2 py-1 rounded-md">{exp.duration}</span>
                       </div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{exp.company}</p>
                       <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{exp.description}</p>
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
                <FaGraduationCap className="text-redMain" /> Education
              </h4>
              <div className="space-y-4">
                 {education.map((edu: any, i: number) => (
                    <div key={i}>
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
