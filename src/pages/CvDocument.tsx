import React, { useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaBullseye,
  FaStar,
  FaGraduationCap,
  FaLanguage,
  FaCertificate,
  FaProjectDiagram,
  FaTrophy,
  FaAddressBook,
  FaEdit,
  FaFilePdf
} from "react-icons/fa";
import { useAppSelector } from "../hooks/reduxHooks";
import { useTranslation } from "react-i18next";

import PersonalDetailsForm from "../components/forms/PersonalDetailsForm";
import LanguagesForm from "../components/forms/LanguagesForm";
import WorkExperienceForm from "../components/forms/WorkExperience";
import CareerObjective from "../components/forms/CareerObjective";
import EducationFormDetails from "../components/forms/EducationFormDetails";
import CertificateFormDetails from "../components/forms/CertificateFormDetails";
import ProjectFormDetails from "../components/forms/ProjectFormDetails";
import AchievementFormDetails from "../components/forms/AchievementFormDetails";
import ReferencesFormDetails from "../components/forms/ReferencesFormDetails";
import SkillsForm from "../components/forms/SkillsForm";

import SmartEditorLayout from "../components/editor/SmartEditorLayout";
import CvLivePreview from "../components/cv/CvLivePreview";
import { useCvEditor } from "../hooks/useCvEditor";
import { DOCUMENT_REGISTRY } from "../documents/registry";
import { generateClientPDF } from "../utils/pdfGenerator";
import { notify } from "../utils/notificationService";

const CvDocument: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("personal_information");
  const { access, user } = useAppSelector((state) => state.auth);
  const isLoggedIn = Boolean(access && user && user.is_active);

  const { data, settings, setSettings, loading } = useCvEditor();

  // Sidebar categories
  const categories = [
    { key: "personal_information", label: t('cv.sections.personal_information'), icon: <FaUser /> },
    { key: "career_objective", label: t('cv.sections.career_objective'), icon: <FaBullseye /> },
    { key: "work_experience", label: t('cv.sections.work_experience'), icon: <FaBriefcase /> },
    { key: "education", label: t('cv.sections.education'), icon: <FaGraduationCap /> },
    { key: "skills", label: t('cv.sections.skills'), icon: <FaStar /> },
    { key: "projects", label: t('cv.sections.projects'), icon: <FaProjectDiagram /> },
    { key: "certification", label: t('cv.sections.certification'), icon: <FaCertificate /> },
    { key: "achievements", label: t('cv.sections.achievements'), icon: <FaTrophy /> },
    { key: "language", label: t('cv.sections.language'), icon: <FaLanguage /> },
    { key: "references", label: t('cv.sections.references'), icon: <FaAddressBook /> },
  ];

  // Map category keys → components
  const categoryComponents: Record<string, React.ComponentType<any>> = {
    personal_information: PersonalDetailsForm,
    language: LanguagesForm,
    work_experience: WorkExperienceForm,
    career_objective: CareerObjective,
    education: EducationFormDetails,
    certification: CertificateFormDetails,
    projects: ProjectFormDetails,
    achievements: AchievementFormDetails,
    references: ReferencesFormDetails,
    skills: SkillsForm,
  };

  const SelectedComponent = categoryComponents[selectedCategory];

  const handleDownload = async () => {
    try {
      await generateClientPDF('CV', data, `CV_${data.personalInfo.fullName}`, settings);
      notify.success("CV Downloaded Successfully");
    } catch (err) {
      notify.error("Failed to generate PDF");
    }
  };

  return (
    <SmartEditorLayout
      title={t('catalog.cv_builder_title') || "Professional CV Builder"}
      subtitle={t('cv.subtitle') || "Create a premium, ATS-optimized resume in minutes."}
      onSave={handleDownload}
      isSaving={false}
      isValidated={true}
      isPolishing={loading}
      onStartTemplate={() => {}}
      onStartAI={() => setSelectedCategory('career_objective')}
      onStartBlank={() => {}}
      settings={settings}
      onSettingsChange={setSettings}
      templates={[
        { id: 'modern', label: 'Modern Professional', desc: 'Sleek contemporary design.' },
        { id: 'ats', label: 'ATS Optimized', desc: 'Maximum parser compatibility.' },
        { id: 'executive', label: 'Executive', desc: 'Senior leadership layout.' },
        { id: 'minimal', label: 'Minimalist', desc: 'Clean and airy spacing.' },
        { id: 'creative', label: 'Creative', desc: 'Visual-heavy portfolio style.' },
        { id: 'student', label: 'Student/Intern', desc: 'Education-focused layout.' },
        { id: 'academic', label: 'Academic', desc: 'Research and publication focus.' },
        { id: 'corporate', label: 'Corporate', desc: 'Traditional formal design.' },
        { id: 'technical', label: 'Technical', desc: 'Skills and project intensive.' },
        { id: 'international', label: 'International', desc: 'Global standard formatting.' }
      ]}
      customActions={
        <button 
          onClick={handleDownload}
          className="btn-premium flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-all"
        >
          <FaFilePdf /> Download PDF
        </button>
      }
      preview={
        <CvLivePreview data={data} settings={settings} />
      }
    >
      <div className="flex flex-col gap-8">
        <div className="bg-yellow-100 p-2 text-[10px] rounded border border-yellow-200">
           Debug: Current Layout is <strong>{settings?.layout}</strong>
        </div>
        {/* Section Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar">
           {categories.map((cat) => (
             <button
               key={cat.key}
               onClick={() => setSelectedCategory(cat.key)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border
                 ${selectedCategory === cat.key 
                   ? 'bg-redMain text-white border-redMain shadow-md' 
                   : 'bg-white text-gray-600 border-gray-200 hover:border-redMain/50'}`}
             >
               {cat.icon} {cat.label}
             </button>
           ))}
        </div>

        {/* Active Form Section */}
        <div className="card-premium p-6 md:p-8 shadow-xl min-h-[500px]">
           <div className="flex items-center gap-3 mb-8 border-b pb-4">
              <div className="p-3 bg-redMain/10 rounded-xl text-redMain text-xl">
                 {categories.find(c => c.key === selectedCategory)?.icon}
              </div>
              <div>
                 <h2 className="text-lg font-black text-charcoal uppercase tracking-widest">
                   {categories.find(c => c.key === selectedCategory)?.label}
                 </h2>
                 <p className="text-xs text-gray-500">Update this section to see changes in the live preview.</p>
              </div>
           </div>

           {isLoggedIn ? (
             <SelectedComponent 
                onDone={() => {
                  const currentIndex = categories.findIndex(c => c.key === selectedCategory);
                  if (currentIndex < categories.length - 1) {
                    setSelectedCategory(categories[currentIndex + 1].key);
                  }
                }}
             />
           ) : (
             <div className="text-center py-20">
                <p className="text-redMain font-bold">{t('cv.must_login')}</p>
             </div>
           )}
        </div>
      </div>
    </SmartEditorLayout>
  );
};

export default CvDocument;
