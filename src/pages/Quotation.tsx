import React from 'react';
import { FaArrowLeft, FaFileInvoice, FaSave, FaPlus, FaTrash, FaMagic } from 'react-icons/fa';
import { useDocumentEngine } from '../documents/hooks/useDocumentEngine';
import { SmartEditorLayout } from '../components/editor/SmartEditorLayout';
import { notify } from '../utils/notificationService';
import Button from '../components/formElements/Button';

const Quotation = () => {
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
    isValidated
  } = useDocumentEngine({
    clientName: '',
    clientAddress: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unitPrice: 0 }] as any[]
  }, 'QUOTATION',
  { client_name: 'clientName' },
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
    setFormData({
      clientName: 'Premier Agency',
      clientAddress: 'Plot 45, Victoria Area\nDar es Salaam',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [
        { description: 'Graphic Design Services', quantity: 1, unitPrice: 50000 },
        { description: 'Social Media Management (1 Month)', quantity: 1, unitPrice: 150000 },
        { description: 'Content Writing (5 Articles)', quantity: 5, unitPrice: 20000 }
      ]
    });
    notify.info("Standard Quotation template loaded.");
  };

  const onStartBlank = () => {
    setFormData({
      clientName: '',
      clientAddress: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, unitPrice: 0 }]
    });
    notify.info("Editor cleared for a fresh start.");
  };

  return (
    <SmartEditorLayout
      title="Quotation Architect"
      subtitle="Financial Proposal"
      onSave={onSave}
      isSaving={isSaving}
      isPolishing={isPolishing}
      isValidated={isValidated}
      onStartTemplate={onStartTemplate}
      onStartBlank={onStartBlank}
      preview={
        <div className="bg-white p-12 shadow-inner min-h-[850px] flex flex-col font-sans relative text-left">
            <div className="flex justify-between items-start mb-16 border-b-8 border-charcoal pb-12">
              <div>
                <h2 className="text-5xl font-black text-charcoal leading-none">QUOTATION</h2>
                <p className="text-redMain font-black tracking-[0.3em] uppercase text-[10px] mt-2">Proposal Instrument</p>
              </div>
              <div className="text-right">
                <p className="font-black text-charcoal text-xl tracking-tighter uppercase">TWENDE</p>
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Official Document Solutions</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-16 mb-16">
              <div>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-4">Quoted To:</p>
                <p className="font-black text-charcoal text-xl uppercase tracking-tighter mb-1">{formData.clientName || 'CUSTOMER NAME'}</p>
                <p className="text-[10px] text-gray-500 font-medium leading-relaxed max-w-xs">{formData.clientAddress || 'CUSTOMER ADDRESS'}</p>
              </div>
              <div className="space-y-4 text-right">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quote Date</p>
                  <p className="font-black text-charcoal text-sm">{formData.invoiceDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Valid Until</p>
                  <p className="font-black text-redMain uppercase tracking-widest text-sm">{formData.dueDate}</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <table className="w-full">
                <thead>
                  <tr className="border-b-4 border-slate-100">
                    <th className="text-left py-6 text-[9px] font-black uppercase text-gray-400 tracking-[0.2em]">Service Description</th>
                    <th className="text-center py-6 text-[9px] font-black uppercase text-gray-400 tracking-[0.2em]">Qty</th>
                    <th className="text-right py-6 text-[9px] font-black uppercase text-gray-400 tracking-[0.2em]">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-50">
                  {formData.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-6">
                        <p className="font-black text-charcoal uppercase tracking-tighter text-sm">{item.description || 'Service Description'}</p>
                      </td>
                      <td className="py-6 text-center font-black text-gray-400 tracking-tighter">{item.quantity}</td>
                      <td className="py-6 text-right font-black text-charcoal text-sm">TSh {(item.quantity * item.unitPrice).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-16 pt-12 border-t-8 border-slate-50">
              <div className="flex justify-between items-center bg-charcoal p-8 rounded-[1.5rem] text-white shadow-2xl">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-redMain mb-1">Total Quote</p>
                  <p className="text-sm font-bold text-white/50 uppercase tracking-widest">Proposal Total</p>
                </div>
                <p className="text-3xl font-black tracking-tighter">TSh {calculateTotal(formData).toLocaleString()}</p>
              </div>
            </div>
        </div>
      }
    >
      <section className="card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-redMain to-charcoal" />
         
         <div className="space-y-8 text-left">
           <div>
             <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em] mb-8 border-b pb-4">Client Details</h3>
             <div className="grid grid-cols-1 gap-6">
               <input 
                 type="text" 
                 value={formData.clientName} 
                 onChange={(e) => setFormData({...formData, clientName: e.target.value})} 
                 className="input-premium" 
                 placeholder="Customer Name"
               />
               <input 
                 type="text" 
                 value={formData.clientAddress} 
                 onChange={(e) => setFormData({...formData, clientAddress: e.target.value})} 
                 className="input-premium" 
                 placeholder="Billing Address"
               />
               <div className="grid grid-cols-2 gap-4">
                  <input type="date" value={formData.invoiceDate} onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})} className="input-premium" />
                  <input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="input-premium" />
               </div>
             </div>
           </div>

           <div>
             <div className="flex justify-between items-center mb-8 border-b pb-4">
               <h3 className="text-sm font-black text-charcoal uppercase tracking-[0.2em]">Quote Items</h3>
               <button onClick={addItem} className="text-redMain font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                 <FaPlus /> Add Item
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
                         placeholder="Description"
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
                       <input type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', parseInt(e.target.value))} className="w-24 p-4 bg-white border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-black text-center" placeholder="Qty" />
                       <input type="number" value={item.unitPrice} onChange={(e) => handleItemChange(idx, 'unitPrice', parseFloat(e.target.value))} className="flex-1 p-4 bg-white border-2 border-transparent rounded-xl outline-none focus:border-redMain transition-all font-black" placeholder="Unit Price" />
                       <button onClick={() => removeItem(idx)} className="p-4 text-gray-300 hover:text-redMain">
                          <FaTrash />
                       </button>
                    </div>
                 </div>
               ))}
             </div>
           </div>

           <Button 
               label="Finalize Quotation" 
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
