import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaFileAlt, FaSave, FaPlus, FaTrash, FaDownload, FaEye, FaChevronLeft } from 'react-icons/fa';
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { RootState, AppDispatch } from '../store/store';
import { saveDocument, aiPolishDocument } from '../features/documents/documentsSlice';
import QuotationPDF from "../components/templates/document-templates/QuotationPDF";
import Button from '../components/formElements/Button';

const Quotation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((state: RootState) => state.documents);
  const [showPreview, setShowPreview] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    clientName: '',
    clientAddress: '',
    quotationDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unitPrice: 0 }] as any[]
  });

  React.useEffect(() => {
    if (current && current.doc_type === 'QUOTATION') {
      setFormData(current.content);
    }
  }, [current]);

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { description: '', quantity: 1, unitPrice: 0 }] });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const handleSave = async () => {
    dispatch(saveDocument({
      id: current?.id,
      doc_type: 'QUOTATION',
      title: `Quotation for ${formData.clientName || 'Client'}`,
      content: formData
    })).unwrap()
    .then(() => alert("Quotation saved successfully!"))
    .catch((err) => alert(err || "Failed to save quotation."));
  };

  const handlePolish = async () => {
    if (!current?.id) {
      alert("Please save the quotation first!");
      return;
    }
    dispatch(aiPolishDocument(current.id)).unwrap()
    .then(() => alert("AI has polished your quotation!"))
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
               Quote <span className="text-redMain">Architect</span>
             </h1>
          </div>
          <div className="flex gap-4">
             <Button 
               label={showPreview ? "Edit Mode" : "Preview Mode"} 
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
               
               <div className="space-y-8">
                 <div>
                   <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">Client Info</h3>
                   <div className="grid grid-cols-1 gap-6">
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Customer Name</label>
                       <input 
                         type="text"
                         value={formData.clientName}
                         onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                         className="input-premium"
                         placeholder="Full name or company"
                       />
                     </div>
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Client Address</label>
                       <input 
                         type="text"
                         value={formData.clientAddress}
                         onChange={(e) => setFormData({...formData, clientAddress: e.target.value})}
                         className="input-premium"
                         placeholder="Street, City, Country"
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Quote Date</label>
                          <input 
                            type="date"
                            value={formData.quotationDate}
                            onChange={(e) => setFormData({...formData, quotationDate: e.target.value})}
                            className="input-premium"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Expiry Date</label>
                          <input 
                            type="date"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                            className="input-premium"
                          />
                        </div>
                     </div>
                   </div>
                 </div>

                 <div>
                   <div className="flex justify-between items-center mb-8 border-b pb-4">
                     <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em]">Quotable Items</h3>
                     <button onClick={addItem} className="text-redMain font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                       <FaPlus /> Add Line
                     </button>
                   </div>

                   <div className="space-y-4">
                     {formData.items.map((item, idx) => (
                       <div key={idx} className="grid grid-cols-12 gap-3 animate-fade-in group">
                         <div className="col-span-12 sm:col-span-6">
                           <input 
                             type="text"
                             placeholder="Item/Service Description"
                             value={item.description}
                             onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                             className="w-full p-4 bg-slate-50 dark:bg-charcoal border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-bold text-sm"
                           />
                         </div>
                         <div className="col-span-4 sm:col-span-2">
                           <input 
                             type="number"
                             placeholder="Qty"
                             value={item.quantity}
                             onChange={(e) => handleItemChange(idx, 'quantity', parseInt(e.target.value))}
                             className="w-full p-4 bg-slate-50 dark:bg-charcoal border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-bold text-sm text-center"
                           />
                         </div>
                         <div className="col-span-6 sm:col-span-3">
                           <input 
                             type="number"
                             placeholder="Price"
                             value={item.unitPrice}
                             onChange={(e) => handleItemChange(idx, 'unitPrice', parseFloat(e.target.value))}
                             className="w-full p-4 bg-slate-50 dark:bg-charcoal border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-bold text-sm"
                           />
                         </div>
                         <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                           <button onClick={() => removeItem(idx)} className="p-3 text-gray-300 hover:text-redMain transition-colors">
                             <FaTrash />
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </section>
          </main>

          {/* Preview Side */}
          <aside className={`lg:col-span-7 sticky top-32 transition-all duration-500 ${showPreview ? "block" : "hidden lg:block"}`}>
            <div className="flex items-center justify-between mb-6 px-4">
               <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-redMain animate-ping" />
                 Live Preview
               </h3>
               <div className="flex gap-4">
                  <PDFDownloadLink
                    document={<QuotationPDF data={formData} />}
                    fileName={`Quotation_${formData.clientName || 'Draft'}.pdf`}
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
               </div>
            </div>
            
            <div className="rounded-[2.5rem] bg-slate-200 p-8 shadow-2xl border-4 border-white overflow-hidden min-h-[800px]">
               <div className="bg-white p-12 shadow-inner min-h-[700px] flex flex-col font-sans">
                  <div className="flex justify-between items-start mb-16 border-b-8 border-redMain pb-12">
                    <div>
                      <h2 className="text-6xl font-black text-charcoal leading-none">QUOTE</h2>
                      <p className="text-redMain font-black tracking-[0.3em] uppercase text-xs mt-2">Professional Quotation</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-charcoal text-xl tracking-tighter uppercase">Twende Documents</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Quality Document Hub</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-16 mb-16">
                    <div>
                      <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-4">Quote To:</p>
                      <p className="font-black text-charcoal text-2xl uppercase tracking-tighter mb-1">{formData.clientName || 'CUSTOMER NAME'}</p>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">{formData.clientAddress || 'CUSTOMER ADDRESS'}</p>
                    </div>
                    <div className="space-y-4 text-right">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Issue Date</p>
                        <p className="font-black text-charcoal">{formData.quotationDate}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Valid Until</p>
                        <p className="font-black text-redMain uppercase tracking-widest">{formData.expiryDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-4 border-slate-100">
                          <th className="text-left py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Service Description</th>
                          <th className="text-center py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Qty</th>
                          <th className="text-right py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Price</th>
                          <th className="text-right py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-slate-50">
                        {formData.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-6">
                              <p className="font-black text-charcoal uppercase tracking-tighter text-lg">{item.description || 'Description of Services'}</p>
                            </td>
                            <td className="py-6 text-center font-black text-gray-400 tracking-tighter">{item.quantity}</td>
                            <td className="py-6 text-right font-bold text-gray-400">TSh {item.unitPrice.toLocaleString()}</td>
                            <td className="py-6 text-right font-black text-charcoal text-lg">TSh {(item.quantity * item.unitPrice).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-16 pt-12 border-t-8 border-slate-50">
                    <div className="flex justify-between items-center bg-charcoal p-10 rounded-[2rem] text-white shadow-2xl">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-redMain mb-1">Total Quote</p>
                        <p className="text-lg font-bold text-white/50 uppercase tracking-widest">Inclusive of taxes</p>
                      </div>
                      <p className="text-5xl font-black tracking-tighter">TSh {calculateTotal().toLocaleString()}</p>
                    </div>
                    
                    <div className="mt-12 text-center">
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Powered by Twende Documents Precision Architecture</p>
                    </div>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Quotation;
