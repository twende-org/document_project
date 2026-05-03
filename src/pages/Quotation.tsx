import React from 'react';
import { FaArrowLeft, FaFileInvoice, FaSave, FaPlus, FaTrash, FaMagic } from 'react-icons/fa';
import { useDocumentEngine } from '../documents/hooks/useDocumentEngine';
import { SmartEditorLayout } from '../components/editor/SmartEditorLayout';
import { notify } from '../utils/notificationService';
import Button from '../components/formElements/Button';
import { useTranslation } from 'react-i18next';
import { DOCUMENT_REGISTRY } from '../documents/registry';

const Quotation = () => {
  const { t } = useTranslation();
  const calculateTotal = (data: any) => {
    return data.items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0);
  };

  const {
    formData,
    setFormData,
    handleSave,
    handlePolish,
    isSaving,
    isPolishing,
    isValidated,
    settings,
    setSettings
  } = useDocumentEngine({
    clientName: '',
    clientAddress: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unitPrice: 0 }] as any[]
  }, 'QUOTATION',
  { client_name: 'clientName', total: 'total' },
  (data) => ({ total: calculateTotal(data) })
  );

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { description: '', quantity: 1, unitPrice: 0 }] });
  };

  const removeItem = (index: number) => {
    setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const onSave = async () => {
    try {
      await handleSave(`Quotation: ${formData.clientName || 'Client'}`, 'FINAL');
      notify.success("Quotation Finalized & Exported.");
    } catch (err: any) {
      notify.error(err.response?.data?.message || err.message || "Failed to finalize quotation.");
    }
  };

  const onPolishItem = async (index: number) => {
      if (!formData.items[index].description) return;
      const polished = await handlePolish(formData.items[index].description);
      const newItems = [...formData.items];
      newItems[index].description = polished;
      setFormData({...formData, items: newItems});
  };

  const onStartTemplate = () => {
    const sampleData = t('invoice.sample_data', { returnObjects: true }) as any;
    setFormData({
      clientName: sampleData.clientName,
      clientAddress: sampleData.clientAddress,
      invoiceDate: sampleData.invoiceDate,
      dueDate: sampleData.dueDate,
      items: sampleData.items
    });
    notify.info(t('common.template_loaded'));
  };

  const onStartBlank = () => {
    setFormData({
      clientName: '',
      clientAddress: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, unitPrice: 0 }]
    });
    notify.info(t('common.editor_cleared'));
  };

  return (
    <SmartEditorLayout
      title={t('catalog.quotation_title')}
      subtitle={t('catalog.quotation_subtitle')}
      onSave={onSave}
      isSaving={isSaving}
      isPolishing={isPolishing}
      isValidated={isValidated}
      onStartTemplate={onStartTemplate}
      onStartBlank={onStartBlank}
      settings={settings}
      onSettingsChange={setSettings}
      templates={DOCUMENT_REGISTRY['QUOTATION'].templates}
      preview={
        <div className={`bg-white shadow-inner min-h-[850px] flex flex-col font-sans relative text-left ${settings?.layout === 'compact' ? 'gap-4 p-8' : 'gap-0 p-12'}`}>
            <div className={`flex justify-between items-start border-charcoal ${settings?.layout === 'compact' ? 'mb-8 border-b-4 pb-6' : 'mb-16 border-b-8 pb-12'}`} style={{ borderBottomColor: settings?.theme?.primaryColor }}>
              <div>
                <h2 className={`${settings?.layout === 'compact' ? 'text-3xl' : 'text-5xl'} font-black text-charcoal leading-none uppercase`}>{t('catalog.quotation_title')}</h2>
                <p className="font-black tracking-[0.3em] uppercase text-[10px] mt-2" style={{ color: settings?.theme?.primaryColor }}>{t('quotation.proposal_instrument')}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-charcoal text-xl tracking-tighter uppercase" style={{ color: settings?.theme?.primaryColor }}>{t('common.brand_name', 'TWENDE')}</p>
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">{t('quotation.official_solutions')}</p>
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-16 ${settings?.layout === 'compact' ? 'mb-8' : 'mb-16'}`}>
              <div className={`${settings?.layout === 'modern' ? 'bg-slate-50 p-6 rounded-2xl' : ''}`}>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-4">{t('quotation.quoted_to')}</p>
                <p className="font-black text-charcoal text-xl uppercase tracking-tighter mb-1 break-words max-w-[250px]">{formData.clientName || t('quotation.customer_name')}</p>
                <p className="text-[10px] text-gray-500 font-medium leading-relaxed max-w-xs break-words">{formData.clientAddress || t('quotation.customer_address')}</p>
              </div>
              <div className="space-y-4 text-right">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('quotation.quote_date')}</p>
                  <p className="font-black text-charcoal text-sm">{formData.invoiceDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('quotation.valid_until')}</p>
                  <p className="font-black uppercase tracking-widest text-sm" style={{ color: settings?.theme?.primaryColor }}>{formData.dueDate}</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <table className="w-full">
                <thead>
                  <tr className={`${settings?.layout === 'elegant' ? 'border-b-2' : 'border-b-4'} border-slate-100`}>
                    <th className="text-left py-6 text-[9px] font-black uppercase text-gray-400 tracking-[0.2em]">{t('quotation.service_description')}</th>
                    <th className="text-center py-6 text-[9px] font-black uppercase text-gray-400 tracking-[0.2em]">{t('quotation.qty')}</th>
                    <th className="text-right py-6 text-[9px] font-black uppercase text-gray-400 tracking-[0.2em]">{t('quotation.total')}</th>
                  </tr>
                </thead>
                <tbody className={`${settings?.layout === 'modern' ? 'divide-y-0' : 'divide-y-2'} divide-slate-50`}>
                  {formData.items.map((item, idx) => (
                    <tr key={idx} className={`${settings?.layout === 'modern' ? 'bg-slate-50/50' : ''}`}>
                      <td className={`${settings?.layout === 'compact' ? 'py-3' : 'py-6'}`}>
                        <p className="font-black text-charcoal uppercase tracking-tighter text-sm break-words whitespace-normal max-w-[280px]">{item.description || t('quotation.description')}</p>
                      </td>
                      <td className={`${settings?.layout === 'compact' ? 'py-3' : 'py-6'} text-center font-black text-gray-400 tracking-tighter`}>{item.quantity}</td>
                      <td className={`${settings?.layout === 'compact' ? 'py-3' : 'py-6'} text-right font-black text-charcoal text-sm`}>TSh {(item.quantity * item.unitPrice).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`${settings?.layout === 'compact' ? 'mt-8 pt-6' : 'mt-16 pt-12'} ${settings?.layout === 'elegant' ? 'border-t-2' : 'border-t-8'} border-slate-50`}>
              <div className={`flex justify-between items-center p-8 rounded-[1.5rem] text-white shadow-2xl ${settings?.layout === 'compact' ? 'p-6' : 'p-8'} ${settings?.layout === 'modern' ? 'rounded-none' : ''}`} style={{ backgroundColor: settings?.theme?.primaryColor || '#1E293B' }}>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] mb-1 opacity-70">{t('quotation.total_quote')}</p>
                  <p className="text-sm font-bold text-white/50 uppercase tracking-widest">{t('quotation.proposal_total')}</p>
                </div>
                <p className={`${settings?.layout === 'compact' ? 'text-2xl' : 'text-3xl'} font-black tracking-tighter`}>TSh {calculateTotal(formData).toLocaleString()}</p>
              </div>
            </div>
        </div>
      }

    >
      <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: settings?.theme?.primaryColor }} />
         
         <div className="space-y-8 text-left">
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">{t('quotation.client_details')}</h3>
             <div className="grid grid-cols-1 gap-6">
               <input 
                 type="text" 
                 value={formData.clientName} 
                 onChange={(e) => setFormData({...formData, clientName: e.target.value})} 
                 className="input-premium" 
                 placeholder={t('quotation.customer_name')}
               />
               <input 
                 type="text" 
                 value={formData.clientAddress} 
                 onChange={(e) => setFormData({...formData, clientAddress: e.target.value})} 
                 className="input-premium" 
                 placeholder={t('quotation.customer_address')}
               />
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="date" value={formData.invoiceDate} onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})} className="input-premium" />
                  <input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="input-premium" />
               </div>
             </div>
           </div>

           <div>
             <div className="flex justify-between items-center mb-8 border-b pb-4">
               <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em]">{t('quotation.quote_items')}</h3>
               <button onClick={addItem} className="text-redMain font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                 <FaPlus /> {t('quotation.add_item')}
               </button>
             </div>

             <div className="space-y-4">
               {formData.items.map((item, idx) => (
                 <div key={idx} className="bg-slate-50 p-6 rounded-2xl space-y-4 group relative">
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         value={item.description} 
                         onChange={(e) => handleItemChange(idx, 'description', e.target.value)} 
                         className="flex-1 p-4 bg-white border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-bold text-sm" 
                         placeholder={t('quotation.description')}
                       />
                       <button 
                          onClick={() => onPolishItem(idx)}
                          disabled={isPolishing || !item.description}
                          className="bg-white p-4 rounded-xl text-redMain hover:bg-redMain hover:text-white transition-colors shadow-sm"
                          title="AI Polish Description"
                       >
                          <FaMagic />
                       </button>
                    </div>
                    <div className="flex gap-4">
                       <input type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', parseInt(e.target.value))} className="w-24 p-4 bg-white border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-black text-center" placeholder={t('quotation.qty')} />
                       <input type="number" value={item.unitPrice} onChange={(e) => handleItemChange(idx, 'unitPrice', parseFloat(e.target.value))} className="flex-1 p-4 bg-white border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-black" placeholder={t('quotation.unit_price')} />
                       <button onClick={() => removeItem(idx)} className="p-4 text-gray-300 hover:text-redMain">
                          <FaTrash />
                       </button>
                    </div>
                 </div>
               ))}
             </div>
           </div>

           <Button 
               label={t('quotation.finalize')}
               variant="primary"
               icon={<FaSave />}
               onClick={onSave}
               disabled={isSaving}
               className="w-full"
            />
         </div>
      </section>
    </SmartEditorLayout>
  );
};

export default Quotation;
