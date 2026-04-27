import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaFileAlt, FaDownload, FaSave, FaEye, FaChevronLeft } from "react-icons/fa";
import { useForm, type SubmitHandler } from "react-hook-form";
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { RootState, AppDispatch } from "../store/store";
import { saveDocument, aiPolishDocument } from "../features/documents/documentsSlice";
import LetterPDF from "../components/templates/document-templates/LetterPDF";
import Button from "../components/formElements/Button";

interface JobApplicationFormValues {
  applicantName: string;
  applicantAddress: string;
  applicantCityStateZip: string;
  applicantPhone: string;
  applicantEmail: string;
  date: string;
  hiringManager: string;
  companyName: string;
  companyAddress: string;
  companyCityStateZip: string;
  jobTitle: string;
  professionalField: string;
  previousCompany: string;
}

const JobApplicationLetter: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((state: RootState) => state.documents);
  const [showPreview, setShowPreview] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<JobApplicationFormValues>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  const [generatedLetter, setGeneratedLetter] = useState<string>("");
  const formValues = watch();

  React.useEffect(() => {
    if (current && current.doc_type === 'JOB_APPLICATION') {
      const content = current.content;
      Object.keys(content).forEach((key) => {
        setValue(key as any, content[key]);
      });
      setGeneratedLetter(content.letterBody || "");
    }
  }, [current, setValue]);

  const onSubmit: SubmitHandler<JobApplicationFormValues> = (data) => {
    const experienceParagraph = data.previousCompany
      ? `I have previously worked at ${data.previousCompany}, where I gained valuable experience in ${data.professionalField}.`
      : `Although I am a fresher, I am eager to learn and contribute my skills to your organization.`;

    const letter = `
Dear ${data.hiringManager},

I am writing to express my interest in the position of ${data.jobTitle} in the field of ${data.professionalField} at your esteemed organization, ${data.companyName}. ${experienceParagraph}

I am hardworking, responsible, and eager to contribute my skills and dedication to your organization. I am confident that my experience and enthusiasm will allow me to perform effectively and meet the expectations of the position.

I would be grateful for the opportunity to attend an interview at your convenience. Thank you for considering my application. I look forward to your positive response.

Yours sincerely,

${data.applicantName}
    `;
    setGeneratedLetter(letter.trim());
    setShowPreview(true);
  };

  const handleSave = () => {
    dispatch(saveDocument({
      id: current?.id,
      doc_type: 'JOB_APPLICATION',
      title: `Job Application: ${formValues.jobTitle} at ${formValues.companyName}`,
      content: { ...formValues, letterBody: generatedLetter }
    })).unwrap()
    .then(() => alert("Letter saved successfully!"))
    .catch((err) => alert(err || "Failed to save letter."));
  };

  const handlePolish = () => {
    if (!current?.id) {
       alert("Please save the letter first to polish with AI!");
       return;
    }
    dispatch(aiPolishDocument(current.id)).unwrap()
    .then(() => alert("AI has polished your application letter!"))
    .catch((err) => alert(err || "AI Polishing failed."));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
             <NavLink to="/documents" className="flex items-center text-redMain font-black uppercase text-xs tracking-widest hover:translate-x-[-4px] transition-transform">
               <FaArrowLeft className="mr-2" /> {t('common.back')}
             </NavLink>
             <h1 className="text-4xl md:text-6xl font-black text-charcoal dark:text-white uppercase tracking-tighter leading-none">
               Letter <span className="text-redMain">Architect</span>
             </h1>
          </div>
          <div className="flex gap-4">
             <Button 
               label={showPreview ? "Back to Edit" : "Live Preview"} 
               variant="secondary"
               icon={showPreview ? <FaChevronLeft /> : <FaEye />}
               onClick={() => setShowPreview(!showPreview)}
               className="lg:hidden"
             />
             <Button 
               label="Save Draft" 
               variant="secondary"
               icon={<FaSave />}
               onClick={handleSave}
               disabled={loading}
             />
             <Button 
               label="AI Polish" 
               variant="primary"
               icon={<span>✨</span>}
               onClick={handlePolish}
               disabled={loading}
               className="shadow-red-500/20"
             />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Side */}
          <main className={`lg:col-span-5 space-y-8 animate-fade-in ${showPreview ? "hidden lg:block" : "block"}`}>
            <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-redMain to-charcoal" />
               
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                 <div>
                   <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">Personal Info</h3>
                   <div className="grid grid-cols-1 gap-6">
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                       <input 
                         {...register("applicantName", { required: true })}
                         className="input-premium"
                         placeholder="Full name"
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Address</label>
                          <input 
                            {...register("applicantAddress", { required: true })}
                            className="input-premium"
                            placeholder="Street, No."
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">City/Zip</label>
                          <input 
                            {...register("applicantCityStateZip", { required: true })}
                            className="input-premium"
                            placeholder="City, ZIP"
                          />
                        </div>
                     </div>
                   </div>
                 </div>

                 <div>
                   <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">Employer Details</h3>
                   <div className="grid grid-cols-1 gap-6">
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Company Name</label>
                       <input 
                         {...register("companyName", { required: true })}
                         className="input-premium"
                         placeholder="Target Company"
                       />
                     </div>
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hiring Manager</label>
                       <input 
                         {...register("hiringManager", { required: true })}
                         className="input-premium"
                         placeholder="Name of recipient"
                       />
                     </div>
                   </div>
                 </div>

                 <div>
                   <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">Position Info</h3>
                   <div className="grid grid-cols-1 gap-6">
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Job Title</label>
                       <input 
                         {...register("jobTitle", { required: true })}
                         className="input-premium"
                         placeholder="Position you're applying for"
                       />
                     </div>
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Professional Field</label>
                       <input 
                         {...register("professionalField", { required: true })}
                         className="input-premium"
                         placeholder="e.g. Software Engineering"
                       />
                     </div>
                   </div>
                 </div>

                 <div className="pt-8 mb-12">
                   <Button 
                     label="Generate Preview" 
                     className="w-full py-6 text-lg shadow-xl"
                     type="submit"
                   />
                 </div>
               </form>
            </section>
          </main>

          {/* Preview Side */}
          <aside className={`lg:col-span-7 sticky top-32 transition-all duration-500 ${showPreview ? "block" : "hidden lg:block"}`}>
            <div className="flex items-center justify-between mb-6 px-4">
               <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-redMain animate-ping" />
                 Live Preview
               </h3>
               {generatedLetter && (
                  <PDFDownloadLink
                    document={<LetterPDF data={{ ...formValues, letterContent: generatedLetter }} />}
                    fileName={`Job_Application_${formValues.applicantName || 'Letter'}.pdf`}
                  >
                    {({ loading: pdfLoading }) => (
                      <Button 
                        label={pdfLoading ? 'Loading...' : 'Download PDF'} 
                        variant="primary"
                        icon={<FaDownload />}
                        className="py-2 text-xs"
                        disabled={pdfLoading}
                      />
                    )}
                  </PDFDownloadLink>
               )}
            </div>
            
            <div className="rounded-[2.5rem] bg-slate-200 p-8 md:p-16 shadow-2xl border-4 border-white overflow-hidden min-h-[800px]">
               <div className="bg-white p-8 md:p-16 shadow-inner min-h-[700px] flex flex-col font-serif relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <FaFileAlt className="text-8xl text-charcoal" />
                  </div>
                  
                  {generatedLetter ? (
                    <div className="text-charcoal leading-[1.8] text-lg animate-fade-in whitespace-pre-line">
                      {generatedLetter}
                    </div>
                  ) : (
                    <div className="h-[600px] flex flex-col items-center justify-center text-gray-300 italic text-center">
                       <FaFileAlt className="text-8xl mb-6 opacity-20" />
                       <p className="max-w-xs font-black uppercase tracking-[0.2em] text-sm leading-relaxed">
                         Fill in the details to generate your professional application letter
                       </p>
                    </div>
                  )}

                  <div className="mt-auto pt-12 border-t-2 border-slate-50">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] text-center">
                      Twende Documents Precision Engine • {new Date().getFullYear()}
                    </p>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationLetter;
