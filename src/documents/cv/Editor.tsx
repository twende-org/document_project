import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlus, 
  FaTrash, 
  FaUserAlt, 
  FaBriefcase, 
  FaGraduationCap, 
  FaMagic, 
  FaCog, 
  FaFilePdf, 
  FaCloudUploadAlt,
  FaCheckCircle,
  FaWhatsapp,
  FaFileAlt
} from "react-icons/fa";
import { useDocumentEngine } from "../hooks/useDocumentEngine";
import { SmartEditorLayout } from "../../components/editor/SmartEditorLayout";
import Preview from "./Preview";
import type { CVContent } from "../types";
import { CV_TEMPLATE } from "../templates";
import { toast } from "react-toastify";
import { notify } from "../../utils/notificationService";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { DOCUMENT_REGISTRY } from "../registry";
import { generateClientPDF } from "../../utils/pdfGenerator";

const Editor = () => {
  const { t } = useTranslation();
  const initialData: CVContent = {
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      address: "",
    },
    summary: "",
    experience: [
      { id: "1", title: "", company: "", duration: "", description: "" }
    ],
    education: [
      { id: "1", degree: "", school: "", year: "" }
    ],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    publications: [],
    presentations: [],
    languages: [],
    references: []
  };

  const {
    formData,
    setFormData,
    updateField,
    handleSave,
    handlePolish,
    isSaving,
    isPolishing,
    isValidated,
    settings,
    setSettings,
    error
  } = useDocumentEngine<CVContent>(initialData, 'CV');

  const [docTitle, setDocTitle] = useState("Professional CV");

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { id: Math.random().toString(), title: "", company: "", duration: "", description: "" }]
    });
  };

  const onDownload = async () => {
    try {
      const userName = formData.personalInfo.fullName || 'User';
      const layoutName = settings?.layout || 'modern';
      const fileName = `${userName}_${layoutName}_CV`.replace(/\s+/g, '_');
      
      await generateClientPDF('CV', formData, fileName, settings);
      notify.success("Document generated successfully!");
    } catch (err) {
      notify.error("Failed to generate PDF. Please check your data.");
    }
  };

  const handleWhatsAppShare = () => {
    // If we have an ID from useDocumentEngine or local state, use it for the public link
    const publicLink = (formData as any).id 
      ? `https://docs.twendedigital.tech/v/${(formData as any).id}` 
      : "https://docs.twendedigital.tech";
      
    const text = `Check out my professional CV created with Twende Docs Architect! 🚀\n\nView here: ${publicLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const polishSummary = async () => {
    if (!formData.summary) return;
    const polished = await handlePolish(formData.summary);
    updateField('summary', polished);
  };

  const handleImportProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/cv/factory-profile/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
      });
      setFormData(response.data);
      notify.success("Profile imported successfully!");
    } catch (err) {
      notify.error("Failed to import profile data.");
    }
  };


  const onFinalize = async () => {
    try {
      const userName = formData.personalInfo.fullName || 'User';
      const layoutName = settings?.layout || 'modern';
      const title = `${userName}_${layoutName}_CV`.replace(/\s+/g, '_');
      
      // handleSave('FINAL') will trigger generateClientPDF automatically via useDocumentEngine
      await handleSave(title, 'FINAL');
    } catch (err) {
      notify.error("Finalization failed.");
    }
  };

  return (
    <SmartEditorLayout
      title="CV Architect"
      subtitle="Identity Engine"
      onSave={onFinalize}
      isSaving={isSaving}
      isPolishing={isPolishing}
      isValidated={isValidated}
      settings={settings}
      onSettingsChange={setSettings}
      templates={DOCUMENT_REGISTRY['CV'].templates}
      preview={<Preview data={formData} settings={settings} />}
      customActions={
        <div className="flex gap-2">
          <button 
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all"
          >
            <FaWhatsapp size={16} /> Share
          </button>
        </div>
      }
      onImportProfile={handleImportProfile}
      onStartBlank={() => {
        setFormData(initialData);
        toast.info("Started with a blank canvas.");
      }}
      onStartTemplate={() => {
        setFormData(t('cv.sample_data', { returnObjects: true }) as any);
        toast.success("Template data loaded.");
      }}
      onStartAI={async () => {
        setFormData({
          ...CV_TEMPLATE,
          personalInfo: { ...CV_TEMPLATE.personalInfo, fullName: "AI Generated Profile" },
          summary: "This professional profile was generated using Twende AI logic to showcase optimal keywords and structure for your career journey..."
        });
        toast.success("AI-enhanced profile initialized!");
      }}
    >
      <div className="space-y-12">
        {/* Progress Tracker */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 custom-scrollbar">
           <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold whitespace-nowrap">
              <FaCheckCircle /> Information
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-neutral-light text-gray-400 rounded-full text-xs font-bold whitespace-nowrap">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center text-[8px]">2</div> Experience
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-neutral-light text-gray-400 rounded-full text-xs font-bold whitespace-nowrap">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center text-[8px]">3</div> Education
           </div>
        </div>

        {/* Target Industry */}
        <div className="card-premium bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-heading text-lg flex items-center gap-3">
               <FaMagic className="text-primary" /> Target Industry
             </h3>
          </div>
          <p className="text-[11px] text-gray-500 mb-4">Select your target industry to automatically adjust the required fields and optimize the final layout.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'corporate', label: 'Corporate / Standard' },
              { id: 'academic', label: 'Academic / Research' },
              { id: 'tech', label: 'Software / Tech' },
              { id: 'creative', label: 'Creative / Design' }
            ].map(industry => (
              <button 
                key={industry.id}
                onClick={() => {
                   updateField('industryTarget', industry.id);
                   // Automatically set the best layout based on industry
                   if (industry.id === 'academic') setSettings({...settings, layout: 'academic'});
                   if (industry.id === 'tech') setSettings({...settings, layout: 'technical'});
                   if (industry.id === 'creative') setSettings({...settings, layout: 'creative'});
                   if (industry.id === 'corporate') setSettings({...settings, layout: 'modern'});
                }}
                className={`p-3 rounded-lg border text-left transition-all ${formData.industryTarget === industry.id || (!formData.industryTarget && industry.id === 'corporate') ? 'border-primary bg-white shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white/50'}`}
              >
                <div className="font-bold uppercase tracking-widest text-[10px]" style={{ color: formData.industryTarget === industry.id || (!formData.industryTarget && industry.id === 'corporate') ? 'var(--color-primary)' : 'inherit' }}>{industry.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Personal Details */}
        <div className="card-premium">
          <div className="flex justify-between items-start mb-8">
             <h3 className="text-heading text-xl flex items-center gap-3">
               <FaUserAlt className="text-primary" /> 01. {t('cv.sections.personal_information')}
             </h3>
             <button onClick={handleImportProfile} className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <FaCloudUploadAlt /> Import Profile
             </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="label-premium">Full Name</label>
              <input 
                type="text" 
                value={formData.personalInfo.fullName}
                onChange={(e) => updateField('personalInfo', {...formData.personalInfo, fullName: e.target.value})}
                className="input-premium p-4"
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <label className="label-premium">Professional Title</label>
              <input 
                type="text" 
                value={formData.personalInfo.jobTitle}
                onChange={(e) => updateField('personalInfo', {...formData.personalInfo, jobTitle: e.target.value})}
                className="input-premium p-4"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>
            <div>
              <label className="label-premium">Email Address</label>
              <input 
                type="email" 
                value={formData.personalInfo.email}
                onChange={(e) => updateField('personalInfo', {...formData.personalInfo, email: e.target.value})}
                className="input-premium p-4"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="label-premium">Phone Number</label>
              <input 
                type="text" 
                value={formData.personalInfo.phone}
                onChange={(e) => updateField('personalInfo', {...formData.personalInfo, phone: e.target.value})}
                className="input-premium p-4"
                placeholder="+255..."
              />
            </div>
          </div>
        </div>

        {/* Career Summary */}
        <div className="card-premium relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-heading text-xl">02. {t('cv.sections.career_objective')}</h3>
            <button 
              onClick={polishSummary}
              disabled={isPolishing || !formData.summary}
              className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
            >
              <FaMagic className={isPolishing ? 'animate-spin' : ''} /> {isPolishing ? 'Polishing...' : 'AI Polish'}
            </button>
          </div>
          <textarea 
            value={formData.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            className="input-premium h-40 resize-none p-6"
            placeholder="Describe your professional journey and key achievements..."
          />
        </div>

        {/* Experience */}
        <div className="card-premium">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-heading text-xl flex items-center gap-3">
              <FaBriefcase className="text-primary" /> 03. {t('cv.sections.work_experience')}
            </h3>
            <button onClick={handleAddExperience} className="btn-primary text-xs px-6 py-2 rounded-full shadow-md font-bold">+ Add Role</button>
          </div>
          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {formData.experience.map((exp, i) => (
                <motion.div 
                  key={exp.id} 
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  className="bg-neutral-light/30 p-8 rounded-[2rem] relative border border-secondary/5 group transition-all hover:bg-white hover:shadow-xl"
                >
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Role Title</label>
                       <input 
                         type="text" 
                         placeholder="e.g. Senior Manager"
                         value={exp.title}
                         onChange={(e) => setFormData({...formData, experience: formData.experience.map(x => x.id === exp.id ? {...x, title: e.target.value} : x)})}
                         className="input-premium p-4 bg-white"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Duration</label>
                       <input 
                         type="text" 
                         placeholder="e.g. 2020 - Present"
                         value={exp.duration}
                         onChange={(e) => setFormData({...formData, experience: formData.experience.map(x => x.id === exp.id ? {...x, duration: e.target.value} : x)})}
                         className="input-premium p-4 bg-white"
                       />
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Company Name</label>
                    <input 
                      type="text" 
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => setFormData({...formData, experience: formData.experience.map(x => x.id === exp.id ? {...x, company: e.target.value} : x)})}
                      className="input-premium p-4 bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Accomplishments</label>
                    <textarea 
                      placeholder="Key accomplishments..."
                      value={exp.description}
                      onChange={(e) => setFormData({...formData, experience: formData.experience.map(x => x.id === exp.id ? {...x, description: e.target.value} : x)})}
                      className="input-premium p-4 bg-white h-32"
                    />
                  </div>
                  
                  <div className="absolute -top-4 -right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setFormData({...formData, experience: formData.experience.filter(x => x.id !== exp.id)})}
                      className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Education */}
        <div className="card-premium">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-heading text-xl flex items-center gap-3">
              <FaGraduationCap className="text-primary" /> 04. {t('cv.sections.education')}
            </h3>
            <button 
                onClick={() => setFormData({...formData, education: [...formData.education, { id: Math.random().toString(), degree: "", school: "", year: "" }]})}
                className="btn-primary text-xs px-6 py-2 rounded-full shadow-md font-bold"
            >
                + Add School
            </button>
          </div>
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {formData.education.map((edu, i) => (
                <motion.div 
                  key={edu.id} 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="grid md:grid-cols-3 gap-6 relative group bg-neutral-light/20 p-6 rounded-[1.5rem] border border-secondary/5"
                >
                  <input 
                    type="text" 
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => setFormData({...formData, education: formData.education.map(x => x.id === edu.id ? {...x, degree: e.target.value} : x)})}
                    className="input-premium p-4 bg-white md:col-span-1"
                  />
                  <input 
                    type="text" 
                    placeholder="School/University"
                    value={edu.school}
                    onChange={(e) => setFormData({...formData, education: formData.education.map(x => x.id === edu.id ? {...x, school: e.target.value} : x)})}
                    className="input-premium p-4 bg-white md:col-span-1"
                  />
                  <input 
                    type="text" 
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => setFormData({...formData, education: formData.education.map(x => x.id === edu.id ? {...x, year: e.target.value} : x)})}
                    className="input-premium p-4 bg-white md:col-span-1"
                  />
                  <button 
                    onClick={() => setFormData({...formData, education: formData.education.filter(x => x.id !== edu.id)})}
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash size={12} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Skills */}
        <div className="card-premium">
          <h3 className="text-heading text-xl mb-8 flex items-center gap-3">
            <FaCog className="text-primary" /> 05. {t('cv.sections.skills')}
          </h3>
          <div className="space-y-4">
             <div className="flex gap-4 items-center">
                <input 
                   id="skill-input"
                   type="text" 
                   className="input-premium flex-1 p-3 text-sm"
                   placeholder="e.g. React, Node.js, Project Management"
                   onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                         e.preventDefault();
                         const input = e.target as HTMLInputElement;
                         const val = input.value.trim();
                         const currentSkills = Array.isArray(formData.skills) ? formData.skills : [];
                         if (val && !currentSkills.includes(val)) {
                            setFormData({...formData, skills: [...currentSkills, val]});
                            input.value = '';
                         }
                      }
                   }}
                />
                <button 
                   onClick={() => {
                      const input = document.getElementById('skill-input') as HTMLInputElement;
                      const val = input.value.trim();
                      const currentSkills = Array.isArray(formData.skills) ? formData.skills : [];
                         if (val && !currentSkills.includes(val)) {
                            setFormData({...formData, skills: [...currentSkills, val]});
                            input.value = '';
                         }
                   }}
                   className="btn-primary px-6 py-2 text-sm font-bold rounded-xl h-fit"
                >
                   Add
                </button>
             </div>
                  <div className="flex flex-wrap gap-3 mt-6">
                {(Array.isArray(formData.skills) ? formData.skills : []).map((skill, index) => (
                   <span key={index} className="bg-white border border-primary/20 text-charcoal px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 group hover:border-primary transition-colors cursor-default">
                      {skill}
                      <button 
                         onClick={() => {
                            const currentSkills = Array.isArray(formData.skills) ? formData.skills : [];
                            setFormData({...formData, skills: currentSkills.filter(s => s !== skill)});
                         }}
                         className="text-primary hover:text-red-500"
                      >
                         <FaTrash size={10} />
                      </button>
                   </span>
                ))}
              </div>
          </div>
        </div>

        {/* Conditional Section: Projects (Tech/Creative) */}
        {['tech', 'creative'].includes(formData.industryTarget || '') && (
          <div className="card-premium">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-heading text-xl flex items-center gap-3">
                <FaBriefcase className="text-primary" /> Projects & Portfolio
              </h3>
              <button 
                  onClick={() => setFormData({...formData, projects: [...formData.projects, { title: "", description: "", technologies: [], link: "" }]})}
                  className="btn-primary text-xs px-6 py-2 rounded-full shadow-md font-bold"
              >
                  + Add Project
              </button>
            </div>
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {formData.projects?.map((proj, i) => (
                  <motion.div 
                    key={i} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="grid md:grid-cols-2 gap-6 relative group bg-neutral-light/20 p-6 rounded-[1.5rem] border border-secondary/5"
                  >
                    <input 
                      type="text" 
                      placeholder="Project Title"
                      value={proj.title}
                      onChange={(e) => {
                         const newProj = [...formData.projects];
                         newProj[i].title = e.target.value;
                         updateField('projects', newProj);
                      }}
                      className="input-premium p-4 bg-white md:col-span-1"
                    />
                    <input 
                      type="text" 
                      placeholder="Link / URL"
                      value={proj.link}
                      onChange={(e) => {
                         const newProj = [...formData.projects];
                         newProj[i].link = e.target.value;
                         updateField('projects', newProj);
                      }}
                      className="input-premium p-4 bg-white md:col-span-1"
                    />
                    <textarea 
                      placeholder="Project Description"
                      value={proj.description}
                      onChange={(e) => {
                         const newProj = [...formData.projects];
                         newProj[i].description = e.target.value;
                         updateField('projects', newProj);
                      }}
                      className="input-premium p-4 bg-white md:col-span-2 h-24"
                    />
                    <button 
                      onClick={() => {
                         const newProj = formData.projects.filter((_, idx) => idx !== i);
                         updateField('projects', newProj);
                      }}
                      className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Conditional Section: Publications (Academic) */}
        {formData.industryTarget === 'academic' && (
          <div className="card-premium">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-heading text-xl flex items-center gap-3">
                <FaFilePdf className="text-primary" /> Publications
              </h3>
              <button 
                  onClick={() => setFormData({...formData, publications: [...(formData.publications || []), { title: "", journal: "", year: "" }]})}
                  className="btn-primary text-xs px-6 py-2 rounded-full shadow-md font-bold"
              >
                  + Add Publication
              </button>
            </div>
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {formData.publications?.map((pub, i) => (
                  <motion.div 
                    key={i} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="grid md:grid-cols-3 gap-6 relative group bg-neutral-light/20 p-6 rounded-[1.5rem] border border-secondary/5"
                  >
                    <input 
                      type="text" 
                      placeholder="Paper Title"
                      value={pub.title}
                      onChange={(e) => {
                         const newPubs = [...formData.publications];
                         newPubs[i].title = e.target.value;
                         updateField('publications', newPubs);
                      }}
                      className="input-premium p-4 bg-white md:col-span-1"
                    />
                    <input 
                      type="text" 
                      placeholder="Journal / Conference"
                      value={pub.journal}
                      onChange={(e) => {
                         const newPubs = [...formData.publications];
                         newPubs[i].journal = e.target.value;
                         updateField('publications', newPubs);
                      }}
                      className="input-premium p-4 bg-white md:col-span-1"
                    />
                    <input 
                      type="text" 
                      placeholder="Year"
                      value={pub.year}
                      onChange={(e) => {
                         const newPubs = [...formData.publications];
                         newPubs[i].year = e.target.value;
                         updateField('publications', newPubs);
                      }}
                      className="input-premium p-4 bg-white md:col-span-1"
                    />
                    <button 
                      onClick={() => {
                         const newPubs = formData.publications.filter((_, idx) => idx !== i);
                         updateField('publications', newPubs);
                      }}
                      className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Conditional Section: Presentations (Academic) */}
        {formData.industryTarget === 'academic' && (
          <div className="card-premium">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-heading text-xl flex items-center gap-3">
                <FaFileAlt className="text-primary" /> Presentations
              </h3>
              <button 
                  onClick={() => setFormData({...formData, presentations: [...(formData.presentations || []), { title: "", event: "", year: "" }]})}
                  className="btn-primary text-xs px-6 py-2 rounded-full shadow-md font-bold"
              >
                  + Add Presentation
              </button>
            </div>
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {formData.presentations?.map((pres, i) => (
                  <motion.div 
                    key={i} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="grid md:grid-cols-3 gap-6 relative group bg-neutral-light/20 p-6 rounded-[1.5rem] border border-secondary/5"
                  >
                    <input 
                      type="text" 
                      placeholder="Presentation Title"
                      value={pres.title}
                      onChange={(e) => {
                         const newPres = [...formData.presentations];
                         newPres[i].title = e.target.value;
                         updateField('presentations', newPres);
                      }}
                      className="input-premium p-4 bg-white md:col-span-1"
                    />
                    <input 
                      type="text" 
                      placeholder="Event / Conference"
                      value={pres.event}
                      onChange={(e) => {
                         const newPres = [...formData.presentations];
                         newPres[i].event = e.target.value;
                         updateField('presentations', newPres);
                      }}
                      className="input-premium p-4 bg-white md:col-span-1"
                    />
                    <input 
                      type="text" 
                      placeholder="Year"
                      value={pres.year}
                      onChange={(e) => {
                         const newPres = [...formData.presentations];
                         newPres[i].year = e.target.value;
                         updateField('presentations', newPres);
                      }}
                      className="input-premium p-4 bg-white md:col-span-1"
                    />
                    <button 
                      onClick={() => {
                         const newPres = formData.presentations.filter((_, idx) => idx !== i);
                         updateField('presentations', newPres);
                      }}
                      className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 p-6 rounded-button border border-red-100 text-center font-bold text-sm tracking-widest">
            {error}
          </div>
        )}
      </div>
    </SmartEditorLayout>
  );
};

export default Editor;
