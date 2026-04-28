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
  FaBars,
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

const CvDocument: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { access, user } = useAppSelector((state) => state.auth);

  const isLoggedIn = Boolean(access && user && user.is_active);

  // Sidebar categories
  const categories = [
    { key: "personal_information", label: t('cv.sections.personal_information'), icon: <FaUser /> },
    { key: "language", label: t('cv.sections.language'), icon: <FaLanguage /> },
    { key: "work_experience", label: t('cv.sections.work_experience'), icon: <FaBriefcase /> },
    { key: "career_objective", label: t('cv.sections.career_objective'), icon: <FaBullseye /> },
    { key: "education", label: t('cv.sections.education'), icon: <FaGraduationCap /> },
    { key: "certification", label: t('cv.sections.certification'), icon: <FaCertificate /> },
    { key: "projects", label: t('cv.sections.projects'), icon: <FaProjectDiagram /> },
    { key: "achievements", label: t('cv.sections.achievements'), icon: <FaTrophy /> },
    { key: "references", label: t('cv.sections.references'), icon: <FaAddressBook /> },
    { key: "skills", label: t('cv.sections.skills'), icon: <FaStar /> },
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

  const SelectedComponent = selectedCategory
    ? categoryComponents[selectedCategory]
    : null;

  return (
    <div className="h-auto sm:p-8 mt-8 border-t font-sans w-full relative">
      {/* Toggle button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 md:hidden absolute top-4 left-4 z-50"
      >
        <FaBars />
      </button>

      <div className="prose prose-professional w-full text-center mt-10">
        <h1 className="text-h1 font-bold text-redMain mt-5">
          {t('cv.fill_details')}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4 w-full px-4 md:h-[calc(100vh-150px)]">
        {/* Sidebar */}
        <aside
          className={`col-span-1 bg-whiteBg rounded-xl border shadow p-4 transition-all duration-300 ease-in-out text-left
            ${isSidebarOpen ? "w-full md:w-auto opacity-100" : "w-0 opacity-0 overflow-hidden"}`}
        >
          {isSidebarOpen && (
            <>
              <h3 className="text-lg font-semibold text-subHeadingGray text-center mb-2 uppercase">
                {t('cv.cv_sections')}
              </h3>
              <p className="text-xs text-center text-gray-400 mb-4">
                {t('cv.select_section')}
              </p>
              <hr className="border-redMain" />
              <ul className="space-y-2 mt-4">
                {categories.map((category) => (
                  <li key={category.key}>
                    <button
                      onClick={() => setSelectedCategory(category.key)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                        ${
                          selectedCategory === category.key
                            ? "bg-redBg text-redMain"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      <span className="text-base">{category.icon}</span>
                      <span>{category.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>

        {/* Main content */}
        <main className="col-span-1 md:col-span-3 bg-whiteBg rounded-xl shadow p-6 md:overflow-y-auto w-full text-left">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <div className="flex items-center gap-2">
              <FaEdit className="text-redMain text-xl" />
              <h2 className="text-lg font-semibold text-subHeadingGray">
                {t('cv.cv_editor')}
              </h2>
            </div>
            <span className="text-xs text-gray-400 italic">
              {t('cv.customize_section')}
            </span>
          </div>

          <div className="min-h-[200px] w-full">
            {SelectedComponent ? (
              isLoggedIn ? (
                selectedCategory === "skills" ? (
                  <SelectedComponent
                    skillSet={user?.skill_sets}
                    onClose={() => setSelectedCategory(null)}
                  />
                ) : (
                  <SelectedComponent />
                )
              ) : (
                <p className="text-redMain text-center text-sm mt-10">
                  {t('cv.must_login')}
                </p>
              )
            ) : (
              <p className="text-subHeadingGray text-center text-sm mt-10">
                {t('cv.select_hint')}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CvDocument;
