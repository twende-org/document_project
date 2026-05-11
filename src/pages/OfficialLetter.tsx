import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBuilding, FaUserTie, FaRegBuilding, FaStamp, FaBriefcase, FaGraduationCap, FaCertificate, FaUser, FaWandMagicSparkles } from 'react-icons/fa6';
import { FaExclamationTriangle, FaMagic, FaSave } from 'react-icons/fa';
import { useDocumentEngine } from '../documents/hooks/useDocumentEngine';
import { SmartEditorLayout } from '../components/editor/SmartEditorLayout';
import { notify } from '../utils/notificationService';
import Button from '../components/formElements/Button';
import { useTranslation } from 'react-i18next';
import { DOCUMENT_REGISTRY } from '../documents/registry';
import { DocumentService } from '../documents/DocumentService';

const OfficialLetter = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const letterType = queryParams.get('type');

  const getInitialData = () => {
    return {
      referenceNumber: '',
      senderName: '',
      senderTitle: '',
      senderOrganization: '',
      senderAddress: '',
      senderContact: '',
      recipientName: '',
      recipientTitle: '',
      recipientOrganization: '',
      recipientAddress: '',
      date: new Date().toISOString().split('T')[0],
      subject: '',
      salutation: '',
      body: '',
      closing: '',
      logoUrl: '',
      watermarkText: '',
      // Internship Specific Fields
      internName: '',
      internshipId: '',
      university: '',
      department: '',
      internshipTitle: '',
      organization: '',
      duration: '',
      startDate: '',
      endDate: '',
      supervisorName: '',
      supervisorTitle: '',
      workDepartment: '',
      objectives: '',
      skillsAcquired: '',
      performanceRemarks: '',
      qrCodeUrl: '',
      sealUrl: '',
      signatureUrl: ''
    };
  };

  const {
    formData,
    setFormData,
    handleSave,
    isSaving,
    isPolishing,
    isValidated,
    settings,
    setSettings
  } = useDocumentEngine(getInitialData(), 'LETTER', {
    reference_number: 'referenceNumber',
    sender_name: 'senderName',
    sender_title: 'senderTitle',
    sender_organization: 'senderOrganization',
    sender_address: 'senderAddress',
    sender_contact: 'senderContact',
    recipient_name: 'recipientName',
    recipient_title: 'recipientTitle',
    recipient_organization: 'recipientOrganization',
    recipient_address: 'recipientAddress',
    date: 'date',
    subject: 'subject',
    salutation: 'salutation',
    body: 'body',
    closing: 'closing',
    logo_url: 'logoUrl',
    watermark_text: 'watermarkText',
    // Internship Mapping
    intern_name: 'internName',
    internship_id: 'internshipId',
    university: 'university',
    department: 'department',
    internship_title: 'internshipTitle',
    organization: 'organization',
    duration: 'duration',
    start_date: 'startDate',
    end_date: 'endDate',
    supervisor_name: 'supervisorName',
    supervisor_title: 'supervisorTitle',
    work_department: 'workDepartment',
    objectives: 'objectives',
    skills_acquired: 'skillsAcquired',
    performance_remarks: 'performanceRemarks',
    qr_code_url: 'qrCodeUrl',
    seal_url: 'sealUrl',
    signature_url: 'signatureUrl'
  }, undefined, {
    layout: 'standard',
    theme: { primaryColor: '#B91C1C' },
    lang: i18n.language
  });

  // Sync language with settings for PDF generation
  React.useEffect(() => {
    if (settings && settings.lang !== i18n.language) {
      setSettings({ ...settings, lang: i18n.language });
    }
  }, [i18n.language, settings, setSettings]);

  const [isDrafting, setIsDrafting] = useState(false);

  const onSave = async () => {
    if (!formData.recipientName || !formData.subject || !formData.body) {
      notify.error("Please fill in the Recipient, Subject, and Body before finalizing.");
      return;
    }

    try {
      await handleSave(`Letter: ${formData.subject}`, 'FINAL');
      notify.success("Letter Finalized & Exported.");
    } catch (err: any) {
      notify.error(err.response?.data?.message || err.message || "Failed to finalize letter.");
    }
  };

  const onPolish = async () => {
      if (!formData.body) {
        notify.warn("Please write some content first so AI can polish it.");
        return;
      }
      
      const context = {
        subject: formData.subject,
        body: formData.body,
        recipient: formData.recipientName,
        sender: formData.senderName,
        sender_title: formData.senderTitle
      };

      try {
        const response = await DocumentService.polish(JSON.stringify(context), 'LETTER', i18n.language.substring(0, 2));
        if (response.polished_content) {
          const polished = typeof response.polished_content === 'object' 
            ? response.polished_content.body || response.polished_content.content 
            : response.polished_content;
          
          setFormData({...formData, body: polished});
          notify.success(t('common.ai_polish_desc'));
        }
      } catch (err) {
        notify.error("AI Polishing failed.");
      }
  };

  const onAIDraft = async () => {
    if (!formData.subject) {
      notify.warn("Please enter a subject line first so AI knows what to write about.");
      return;
    }

    setIsDrafting(true);
    try {
      const response = await DocumentService.generateLetter({
        ...formData,
        lang: i18n.language.substring(0, 2)
      });
      
      if (response && response.content) {
        setFormData({
          ...formData,
          body: response.content,
          closing: response.closing || formData.closing
        });
        notify.success(t('common.ai_drafted'));
      }
    } catch (err) {
      notify.error("AI Generation failed.");
    } finally {
      setIsDrafting(false);
    }
  };

  const loadPreset = (presetKey: string) => {
    const presetData = t(`letter.${presetKey}`, { returnObjects: true }) as any;
    setFormData({ ...formData, ...presetData });
    notify.info(t('common.template_loaded'));
  };

  const onStartTemplate = () => {
    loadPreset('sample_data_internship');
  };

  const onStartBlank = () => {
    setFormData(getInitialData());
    notify.info(t('common.editor_cleared'));
  };

  const presets = letterType === 'internship-letter' ? [
    { label: t('letter.label_internship_offer'), icon: <FaUserTie />, key: 'data_internship_offer' },
    { label: t('letter.label_internship_acceptance'), icon: <FaRegBuilding />, key: 'data_internship_acceptance' },
    { label: t('letter.label_internship_appointment'), icon: <FaStamp />, key: 'data_internship_appointment' },
    { label: t('letter.label_internship_recommendation'), icon: <FaGraduationCap />, key: 'data_internship_recommendation' },
    { label: t('letter.label_internship_completion'), icon: <FaCertificate />, key: 'data_internship_completion' },
    { label: t('letter.label_internship_experience'), icon: <FaBriefcase />, key: 'data_internship_experience' },
    { label: t('letter.label_internship_verification'), icon: <FaRegBuilding />, key: 'data_internship_verification' },
    { label: t('letter.label_internship_certificate'), icon: <FaCertificate />, key: 'data_internship_certificate' },
    { label: t('letter.label_internship_evaluation'), icon: <FaStamp />, key: 'data_internship_evaluation' },
    { label: t('letter.label_internship_rejection'), icon: <FaExclamationTriangle />, key: 'data_internship_rejection' },
  ] : [
    { label: t('catalog.internship_letter_title'), icon: <FaGraduationCap />, key: 'sample_data_internship' },
    { label: t('letter.preset_general'), icon: <FaBuilding />, key: 'sample_data_general' },
    { label: t('letter.preset_employment'), icon: <FaBriefcase />, key: 'sample_data_employment' },
    { label: t('letter.preset_offer'), icon: <FaUserTie />, key: 'sample_data_offer' },
    { label: t('letter.preset_appointment'), icon: <FaStamp />, key: 'sample_data_appointment' },
    { label: t('letter.preset_recommendation'), icon: <FaGraduationCap />, key: 'sample_data_recommendation' },
    { label: t('letter.preset_verification'), icon: <FaRegBuilding />, key: 'sample_data_verification' },
    { label: t('letter.preset_warning'), icon: <FaExclamationTriangle />, key: 'sample_data_warning' },
    { label: t('letter.preset_notice'), icon: <FaBuilding />, key: 'sample_data_notice' },
    { label: t('letter.preset_certificate'), icon: <FaCertificate />, key: 'sample_data_certificate' },
  ];

  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const layout = settings?.layout || 'standard';

  const renderPreview = () => {
    if (layout === 'certificate') {
      return (
        <div className="bg-white p-8 border-[12px] min-h-[600px] flex flex-col items-center relative text-center" style={{ borderColor: primaryColor }}>
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
             <span className="text-8xl font-black uppercase transform -rotate-45">{formData.watermarkText}</span>
          </div>
          
          <div className="mb-8 mt-10">
             <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{formData.senderOrganization || formData.senderName}</p>
          </div>

          <h1 className="text-4xl font-black mb-6 uppercase tracking-tight" style={{ color: primaryColor }}>
             {formData.subject || 'Certificate of Internship'}
          </h1>

          <div className="mb-6 italic text-lg text-gray-600">This is to certify that</div>
          
          <div className="text-3xl font-black mb-8 border-b-2 border-black pb-2 min-w-[300px]">
            {formData.internName || formData.recipientName}
          </div>

          <div className="max-w-xl text-center leading-loose text-gray-700 mb-12">
            Has successfully completed their internship as a <span className="font-bold">{formData.internshipTitle || 'Intern'}</span> at <span className="font-bold">{formData.senderOrganization || 'our institution'}</span>.
            During the period from <span className="font-bold">{formData.startDate}</span> to <span className="font-bold">{formData.endDate}</span>.
          </div>

          <div className="flex justify-between w-full px-12 mt-auto mb-10">
             <div className="text-center border-t border-black pt-2 w-48">
                <p className="font-bold text-sm">{formData.supervisorName || 'Supervisor'}</p>
                <p className="text-[10px] text-gray-500">{formData.supervisorTitle || 'Department Head'}</p>
             </div>
             <div className="text-center border-t border-black pt-2 w-48">
                <p className="font-bold text-sm">{formData.senderName}</p>
                <p className="text-[10px] text-gray-500">{formData.senderTitle || 'Managing Director'}</p>
             </div>
          </div>

          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full border-4 border-dashed opacity-20 flex items-center justify-center" style={{ borderColor: primaryColor }}>
             <span className="text-[8px] font-black text-center" style={{ color: primaryColor }}>OFFICIAL<br/>SEAL</span>
          </div>
        </div>
      );
    }

    return (
      <div className={`bg-white p-12 shadow-inner min-h-[1000px] flex flex-col font-sans relative text-left text-gray-800 ${layout === 'elegant' ? 'font-serif' : 'font-sans'}`}>
          
          {formData.watermarkText && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0 overflow-hidden">
              <span className="text-[120px] font-black uppercase transform -rotate-45 text-center leading-none tracking-widest break-words w-[150%]">
                {formData.watermarkText}
              </span>
            </div>
          )}

          <div className="relative z-10 flex flex-col flex-1">
            
            {layout === 'modern' ? (
              <div className="mb-10 border-l-4 pl-4" style={{ borderColor: primaryColor }}>
                <h2 className="text-xl font-bold" style={{ color: primaryColor }}>{formData.senderName}</h2>
                {formData.senderOrganization && <p className="text-xs text-gray-700 mt-1">{formData.senderOrganization}</p>}
                <p className="text-[11px] text-gray-500 whitespace-pre-wrap mt-1">{formData.senderAddress}</p>
                <p className="text-[11px] text-gray-500">{formData.senderContact}</p>
              </div>
            ) : (
              <div className="text-right mb-10">
                <h2 className="text-sm font-bold">{formData.senderName}</h2>
                {formData.senderOrganization && <p className="text-xs text-gray-800">{formData.senderOrganization}</p>}
                <p className="text-[11px] text-gray-600 whitespace-pre-wrap">{formData.senderAddress}</p>
                <p className="text-[11px] text-gray-600">{formData.senderContact}</p>
              </div>
            )}

            <div className="flex justify-between mb-8">
              <p className="font-bold text-[11px] text-gray-700">{formData.referenceNumber ? `Ref: ${formData.referenceNumber}` : ''}</p>
              <p className="text-[11px] text-gray-700">{formData.date}</p>
            </div>

            <div className="mb-8">
              <p className="font-bold text-sm">{formData.recipientName}</p>
              {formData.recipientTitle && <p className="text-xs text-gray-700">{formData.recipientTitle}</p>}
              {formData.recipientOrganization && <p className="font-bold text-xs">{formData.recipientOrganization}</p>}
              <p className="text-xs text-gray-600 whitespace-pre-wrap">{formData.recipientAddress}</p>
            </div>

            {formData.salutation && <p className="font-bold text-sm mb-4">{formData.salutation}</p>}

            {formData.subject && (
              <div className="mb-6">
                <p className={`font-bold text-[13px] uppercase ${layout !== 'modern' ? 'underline' : ''}`} style={layout === 'modern' ? { color: primaryColor } : {}}>
                  {formData.subject.toUpperCase().startsWith('RE:') || formData.subject.toUpperCase().startsWith('YAH:') || formData.subject.toUpperCase().startsWith('KUH:')
                    ? formData.subject 
                    : `${i18n.language.startsWith('sw') ? 'YAH:' : 'RE:'} ${formData.subject}`}
                </p>
              </div>
            )}

            <div className="flex-1 text-justify text-[12px] leading-loose whitespace-pre-wrap mb-8">
              {formData.body || t('architect.ai_polishing')}
            </div>

            <div className="mb-16 mt-8">
              <p className="text-sm mb-12">{formData.closing || 'Sincerely,'}</p>
              <div className="w-48 pt-2 border-t border-black">
                <p className="font-bold text-sm">{formData.supervisorName || formData.senderName}</p>
                {(formData.supervisorTitle || formData.senderTitle) && <p className="text-[11px] text-gray-500">{formData.supervisorTitle || formData.senderTitle}</p>}
              </div>
            </div>

          </div>
      </div>
    );
  };

  return (
    <SmartEditorLayout
      title={t('catalog.official_letter_title')}
      subtitle={t('letter.official_correspondence')}
      onSave={onSave}
      isSaving={isSaving}
      isValidated={isValidated}
      isPolishing={isPolishing || isDrafting}
      onStartTemplate={onStartTemplate}
      onStartAI={onAIDraft}
      onStartBlank={onStartBlank}
      settings={settings}
      onSettingsChange={setSettings}
      templates={DOCUMENT_REGISTRY['LETTER'].templates}
      preview={renderPreview()}
    >
      <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: primaryColor }} />
        <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-6">{t('letter.presets')}</h3>
        <p className="text-xs text-gray-500 mb-6">Need a standard text? Click a preset to auto-fill professional text. You can still modify it.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {presets.map((preset) => (
            <button
              key={preset.key}
              onClick={() => loadPreset(preset.key)}
              className="flex items-center gap-2 p-3 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded hover:border-redMain hover:text-redMain transition-all"
            >
              {preset.icon} <span className="truncate">{preset.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden">
         <div className="space-y-10 text-left">
           
           {/* Section 1: Sender Details */}
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-6 border-b pb-4 flex items-center gap-2"><FaUser /> {t('letter.personnel_details')}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label-premium">{t('letter.sender_name')}</label>
                  <input type="text" value={formData.senderName} onChange={(e) => setFormData({...formData, senderName: e.target.value})} className="input-premium font-bold" placeholder="E.g. John Doe" />
                </div>
                <div>
                  <label className="label-premium">{t('letter.sender_title')}</label>
                  <input type="text" value={formData.senderTitle} onChange={(e) => setFormData({...formData, senderTitle: e.target.value})} className="input-premium" placeholder="E.g. Applicant, Manager" />
                </div>
                <div className="md:col-span-2">
                  <label className="label-premium">{t('letter.sender_organization')}</label>
                  <input type="text" value={formData.senderOrganization} onChange={(e) => setFormData({...formData, senderOrganization: e.target.value})} className="input-premium" placeholder="If sending on behalf of a group" />
                </div>
                <div className="md:col-span-2">
                  <label className="label-premium">{t('letter.sender_address')}</label>
                  <textarea value={formData.senderAddress} onChange={(e) => setFormData({...formData, senderAddress: e.target.value})} className="input-premium h-20" placeholder="Your physical address or P.O. Box" />
                </div>
                <div className="md:col-span-2">
                  <label className="label-premium">{t('letter.sender_contact')}</label>
                  <input type="text" value={formData.senderContact} onChange={(e) => setFormData({...formData, senderContact: e.target.value})} className="input-premium" placeholder="Email, Phone" />
                </div>
             </div>
           </div>

           {/* Section 2: Recipient Details */}
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-6 border-b pb-4 flex items-center gap-2"><FaUserTie /> {t('letter.recipient_subject')}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="label-premium">{t('letter.recipient_name')}</label>
                  <input type="text" value={formData.recipientName} onChange={(e) => setFormData({...formData, recipientName: e.target.value})} className="input-premium" placeholder="Recipient Name" />
               </div>
               <div>
                  <label className="label-premium">{t('letter.recipient_title')}</label>
                  <input type="text" value={formData.recipientTitle} onChange={(e) => setFormData({...formData, recipientTitle: e.target.value})} className="input-premium" placeholder="e.g. Managing Director" />
               </div>
               <div className="md:col-span-2">
                  <label className="label-premium">{t('letter.recipient_organization')}</label>
                  <input type="text" value={formData.recipientOrganization} onChange={(e) => setFormData({...formData, recipientOrganization: e.target.value})} className="input-premium" placeholder="Recipient Company" />
               </div>
               <div className="md:col-span-2">
                 <label className="label-premium">{t('letter.recipient_address')}</label>
                 <textarea value={formData.recipientAddress} onChange={(e) => setFormData({...formData, recipientAddress: e.target.value})} className="input-premium h-20" placeholder="Recipient Address" />
               </div>
             </div>
           </div>

           {/* Section 2.5: Internship Details (Conditional) */}
           {(letterType === 'internship-letter' || formData.internName) && (
             <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
               <h3 className="text-sm font-black text-blue-800 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><FaGraduationCap /> {t('letter.internship_details')}</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-premium text-blue-700">{t('letter.intern_name')}</label>
                    <input type="text" value={formData.internName} onChange={(e) => setFormData({...formData, internName: e.target.value})} className="input-premium bg-white border-blue-200" placeholder="Full name of the intern" />
                  </div>
                  <div>
                    <label className="label-premium text-blue-700">{t('letter.internship_id')}</label>
                    <input type="text" value={formData.internshipId} onChange={(e) => setFormData({...formData, internshipId: e.target.value})} className="input-premium bg-white border-blue-200" placeholder="ID Number / Ref" />
                  </div>
                  <div>
                    <label className="label-premium text-blue-700">{t('letter.university')}</label>
                    <input type="text" value={formData.university} onChange={(e) => setFormData({...formData, university: e.target.value})} className="input-premium bg-white border-blue-200" placeholder="e.g. University of Dar es Salaam" />
                  </div>
                  <div>
                    <label className="label-premium text-blue-700">{t('letter.internship_title')}</label>
                    <input type="text" value={formData.internshipTitle} onChange={(e) => setFormData({...formData, internshipTitle: e.target.value})} className="input-premium bg-white border-blue-200" placeholder="e.g. Software Engineering Intern" />
                  </div>
                  <div>
                    <label className="label-premium text-blue-700">{t('letter.start_date')}</label>
                    <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="input-premium bg-white border-blue-200" />
                  </div>
                  <div>
                    <label className="label-premium text-blue-700">{t('letter.end_date')}</label>
                    <input type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} className="input-premium bg-white border-blue-200" />
                  </div>
                  <div>
                    <label className="label-premium text-blue-700">{t('letter.supervisor_name')}</label>
                    <input type="text" value={formData.supervisorName} onChange={(e) => setFormData({...formData, supervisorName: e.target.value})} className="input-premium bg-white border-blue-200" placeholder="Name of Supervisor" />
                  </div>
                  <div>
                    <label className="label-premium text-blue-700">{t('letter.supervisor_title')}</label>
                    <input type="text" value={formData.supervisorTitle} onChange={(e) => setFormData({...formData, supervisorTitle: e.target.value})} className="input-premium bg-white border-blue-200" placeholder="Title of Supervisor" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label-premium text-blue-700">{t('letter.performance_remarks')}</label>
                    <textarea value={formData.performanceRemarks} onChange={(e) => setFormData({...formData, performanceRemarks: e.target.value})} className="input-premium bg-white border-blue-200 h-20" placeholder="Excellent performance, demonstrated strong technical skills..." />
                  </div>
               </div>
             </div>
           )}

           {/* Section 3: Content & Body */}
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-6 border-b pb-4 flex items-center gap-2"><FaBriefcase /> {t('letter.letter_content')}</h3>
             <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="label-premium">{t('letter.date')}</label>
                    <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="input-premium" />
                  </div>
                  <div>
                    <label className="label-premium">{t('letter.reference_number')} (Optional)</label>
                    <input type="text" value={formData.referenceNumber} onChange={(e) => setFormData({...formData, referenceNumber: e.target.value})} className="input-premium" placeholder="REF/2026/001" />
                  </div>
                </div>

                <div>
                  <label className="label-premium">{t('letter.salutation')}</label>
                  <input type="text" value={formData.salutation} onChange={(e) => setFormData({...formData, salutation: e.target.value})} className="input-premium" placeholder="Dear Sir/Madam," />
                </div>
                
                <div>
                  <label className="label-premium">{t('letter.letter_subject')}</label>
                  <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="input-premium font-black text-lg" placeholder="OFFICIAL SUBJECT LINE" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="label-premium mb-0">Main Body</label>
                    <div className="flex gap-4">
                        <button 
                            onClick={onAIDraft}
                            disabled={isDrafting || !formData.subject}
                            className="text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:opacity-70 disabled:opacity-30"
                        >
                            <FaWandMagicSparkles /> {t('letter.ai_draft_body')}
                        </button>
                        <button 
                            onClick={onPolish}
                            disabled={isPolishing || !formData.body}
                            className="text-redMain font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:opacity-70 disabled:opacity-30"
                        >
                            <FaMagic /> {t('letter.ai_polish_body')}
                        </button>
                    </div>
                  </div>
                  <textarea 
                    value={formData.body} 
                    onChange={(e) => setFormData({...formData, body: e.target.value})} 
                    className="input-premium h-80 text-justify leading-loose" 
                    placeholder="Enter the main content of your letter here..."
                  />
                </div>
             </div>
           </div>

           {/* Section 4: Signatory & Extras */}
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-6 border-b pb-4 flex items-center gap-2"><FaStamp /> {t('letter.closing')} & Extras</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label-premium">{t('letter.closing')}</label>
                  <input type="text" value={formData.closing} onChange={(e) => setFormData({...formData, closing: e.target.value})} className="input-premium" placeholder="Sincerely," />
                </div>
                <div>
                  <label className="label-premium">{t('letter.watermark_text')}</label>
                  <input type="text" value={formData.watermarkText} onChange={(e) => setFormData({...formData, watermarkText: e.target.value})} className="input-premium" placeholder="CONFIDENTIAL" />
                </div>
             </div>
           </div>

           <div className="pt-6">
             <Button 
                 label={t('letter.finalize')} 
                 variant="primary"
                 icon={<FaSave />}
                 onClick={onSave}
                 disabled={isSaving}
                 className="w-full text-lg py-4"
              />
           </div>
         </div>
      </section>
    </SmartEditorLayout>
  );
};

export default OfficialLetter;