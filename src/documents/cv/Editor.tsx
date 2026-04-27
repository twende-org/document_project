import React, { useState } from "react";
import { FaPlus, FaTrash, FaUserAlt, FaBriefcase, FaGraduationCap, FaMagic, FaCog } from "react-icons/fa";
import { useDocumentEngine } from "../hooks/useDocumentEngine";
import { SmartEditorLayout } from "../../components/editor/SmartEditorLayout";
import Preview from "./Preview";
import type { CVContent } from "../types";
import { CV_TEMPLATE } from "../templates";
import { toast } from "react-toastify";

const Editor = () => {
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
    skills: []
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
    error
  } = useDocumentEngine<CVContent>(initialData, 'CV');

  const [docTitle, setDocTitle] = useState("Professional CV");

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { id: Math.random().toString(), title: "", company: "", duration: "", description: "" }]
    });
  };

  const onSave = async () => {
    try {
      await handleSave(docTitle, 'FINAL');
      alert("Success! Your document is finalized and ready for download.");
    } catch (err) {}
  };

  const polishSummary = async () => {
    if (!formData.summary) return;
    const polished = await handlePolish(formData.summary);
    updateField('summary', polished);
  };

  return (
    <SmartEditorLayout
      title="CV Architect"
      subtitle="Identity Engine"
      onSave={onSave}
      isSaving={isSaving}
      isPolishing={isPolishing}
      isValidated={isValidated}
      preview={<Preview data={formData} />}
      onStartBlank={() => {
        setFormData(initialData);
        toast.info("Started with a blank canvas.");
      }}
      onStartTemplate={() => {
        setFormData(CV_TEMPLATE);
        toast.success("Industry-standard template loaded!");
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
        {/* Document Metadata moved to Layout */}

        {/* Personal Details */}
        <div className="card-premium">
          <h3 className="text-heading text-xl mb-8 flex items-center gap-3">
            <FaUserAlt className="text-primary" /> 01. Identity
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="label-premium">Full Name</label>
              <input 
                type="text" 
                value={formData.personalInfo.fullName}
                onChange={(e) => updateField('personalInfo', {...formData.personalInfo, fullName: e.target.value})}
                className="input-premium p-4"
              />
            </div>
            <div>
              <label className="label-premium">Professional Title</label>
              <input 
                type="text" 
                value={formData.personalInfo.jobTitle}
                onChange={(e) => updateField('personalInfo', {...formData.personalInfo, jobTitle: e.target.value})}
                className="input-premium p-4"
              />
            </div>
            <div>
              <label className="label-premium">Email</label>
              <input 
                type="email" 
                value={formData.personalInfo.email}
                onChange={(e) => updateField('personalInfo', {...formData.personalInfo, email: e.target.value})}
                className="input-premium p-4"
              />
            </div>
            <div>
              <label className="label-premium">Phone</label>
              <input 
                type="text" 
                value={formData.personalInfo.phone}
                onChange={(e) => updateField('personalInfo', {...formData.personalInfo, phone: e.target.value})}
                className="input-premium p-4"
              />
            </div>
          </div>
        </div>

        {/* Career Summary */}
        <div className="card-premium relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-heading text-xl">02. Career Summary</h3>
            <button 
              onClick={polishSummary}
              disabled={isPolishing || !formData.summary}
              className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <FaMagic /> AI Polish
            </button>
          </div>
          <textarea 
            value={formData.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            className="input-premium h-40 resize-none"
            placeholder="Describe your professional journey..."
          />
        </div>

        {/* Experience */}
        <div className="card-premium">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-heading text-xl flex items-center gap-3">
              <FaBriefcase className="text-primary" /> 03. Experience
            </h3>
            <button onClick={handleAddExperience} className="text-primary text-action hover:scale-105 transition-transform">+ Add Role</button>
          </div>
          <div className="space-y-12">
            {formData.experience.map((exp, i) => (
              <div key={exp.id} className="bg-neutral-light p-8 rounded-button relative border border-secondary/5 group">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <input 
                    type="text" 
                    placeholder="Role Title"
                    value={exp.title}
                    onChange={(e) => setFormData({...formData, experience: formData.experience.map(x => x.id === exp.id ? {...x, title: e.target.value} : x)})}
                    className="input-premium p-4 bg-white"
                  />
                  <input 
                    type="text" 
                    placeholder="Duration (e.g. 2020 - Present)"
                    value={exp.duration}
                    onChange={(e) => setFormData({...formData, experience: formData.experience.map(x => x.id === exp.id ? {...x, duration: e.target.value} : x)})}
                    className="input-premium p-4 bg-white"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => setFormData({...formData, experience: formData.experience.map(x => x.id === exp.id ? {...x, company: e.target.value} : x)})}
                  className="input-premium p-4 bg-white mb-6"
                />
                <textarea 
                  placeholder="Key accomplishments..."
                  value={exp.description}
                  onChange={(e) => setFormData({...formData, experience: formData.experience.map(x => x.id === exp.id ? {...x, description: e.target.value} : x)})}
                  className="input-premium p-4 bg-white h-32"
                />
                
                <div className="absolute -top-4 -right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={async () => {
                      const polished = await handlePolish(exp.description);
                      const newExp = formData.experience.map(x => x.id === exp.id ? {...x, description: polished} : x);
                      setFormData({...formData, experience: newExp});
                    }}
                    className="bg-primary text-white p-3 rounded-full shadow-lg"
                  >
                    <FaMagic />
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, experience: formData.experience.filter(x => x.id !== exp.id)})}
                    className="bg-secondary text-white p-3 rounded-full shadow-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-premium">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-heading text-xl flex items-center gap-3">
              <FaGraduationCap className="text-primary" /> 04. Education
            </h3>
            <button 
                onClick={() => setFormData({...formData, education: [...formData.education, { id: Math.random().toString(), degree: "", school: "", year: "" }]})}
                className="text-primary text-action hover:scale-105 transition-transform"
            >
                + Add Education
            </button>
          </div>
          <div className="space-y-8">
            {formData.education.map((edu, i) => (
              <div key={edu.id} className="grid md:grid-cols-3 gap-6 relative group bg-neutral-light p-6 rounded-button border border-secondary/5">
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
                  className="absolute -top-3 -right-3 bg-secondary text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="card-premium">
          <h3 className="text-heading text-xl mb-8 flex items-center gap-3">
            <FaCog className="text-primary" /> 05. Expertise & Skills
          </h3>
          <div className="space-y-4">
             <div className="flex gap-4">
                <input 
                   type="text" 
                   id="skill-input"
                   placeholder="Add a skill (e.g. React, Strategic Planning)"
                   className="input-premium flex-1"
                   onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                         const val = (e.target as HTMLInputElement).value.trim();
                         if (val && !formData.skills.includes(val)) {
                            setFormData({...formData, skills: [...formData.skills, val]});
                            (e.target as HTMLInputElement).value = '';
                         }
                      }
                   }}
                />
                <button 
                   onClick={() => {
                      const input = document.getElementById('skill-input') as HTMLInputElement;
                      const val = input.value.trim();
                         if (val && !formData.skills.includes(val)) {
                            setFormData({...formData, skills: [...formData.skills, val]});
                            input.value = '';
                         }
                   }}
                   className="btn-primary px-8"
                >
                   Add
                </button>
             </div>
             <div className="flex flex-wrap gap-3 mt-6">
                {formData.skills.map((skill, index) => (
                   <span key={index} className="bg-white border border-primary/20 text-charcoal px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 group">
                      {skill}
                      <button 
                         onClick={() => setFormData({...formData, skills: formData.skills.filter(s => s !== skill)})}
                         className="text-primary hover:text-redMain"
                      >
                         <FaTrash size={10} />
                      </button>
                   </span>
                ))}
             </div>
          </div>
        </div>

        {error && (
          <div className="bg-primary/5 text-primary p-6 rounded-button border border-primary/10 text-center font-bold text-sm tracking-widest">
            {error}
          </div>
        )}
      </div>
    </SmartEditorLayout>
  );
};

export default Editor;
