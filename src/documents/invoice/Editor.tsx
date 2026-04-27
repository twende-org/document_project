import React, { useState } from "react";
import { FaPlus, FaTrash, FaFileInvoiceDollar, FaMagic } from "react-icons/fa";
import { useDocumentEngine } from "../hooks/useDocumentEngine";
import { SmartEditorLayout } from "../../components/editor/SmartEditorLayout";
import Preview from "./Preview";
import type { InvoiceContent, InvoiceItem } from "../types";
import { INVOICE_TEMPLATE } from "../templates";
import { toast } from "react-toastify";

const Editor = () => {
  const initialData: InvoiceContent = {
    clientName: "",
    clientAddress: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    taxRate: 18,
    items: [
      { id: "1", description: "", quantity: 1, unitPrice: 0 }
    ]
  };

  const {
    formData,
    setFormData,
    updateField,
    handleSave,
    isSaving,
    isValidated,
    error
  } = useDocumentEngine<InvoiceContent>(initialData, 'INVOICE');

  const [docTitle, setDocTitle] = useState("New Business Invoice");

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const tax = subtotal * (formData.taxRate / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const totals = calculateTotals();

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: Math.random().toString(), description: "", quantity: 1, unitPrice: 0 }]
    });
  };

  const handleRemoveItem = (id: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== id)
    });
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    setFormData({
      ...formData,
      items: formData.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const onSave = async () => {
    try {
      await handleSave(docTitle, 'FINAL');
      alert("Invoice Finalized & Securely Saved.");
    } catch (err) {}
  };

  return (
    <SmartEditorLayout
      title="Invoice Builder"
      subtitle="Architecture Engine"
      onSave={onSave}
      isSaving={isSaving}
      isValidated={isValidated}
      preview={<Preview data={formData} />}
      onStartBlank={() => {
        setFormData(initialData);
        toast.info("Cleared all invoice fields.");
      }}
      onStartTemplate={() => {
        setFormData(INVOICE_TEMPLATE);
        toast.success("Standard business invoice template loaded!");
      }}
      onStartAI={() => {
        setFormData({
          ...INVOICE_TEMPLATE,
          clientName: "AI Optimized Client Entity",
          items: [
            { id: "ai1", description: "AI-Generated Service Consultation", quantity: 1, unitPrice: 200000 }
          ]
        });
        toast.success("AI-drafted invoice initialized!");
      }}
    >
      <div className="space-y-12">
        {/* Client Details */}
        <div className="card-premium">
          <h3 className="text-heading text-xl mb-8 flex items-center gap-3">
            <FaFileInvoiceDollar className="text-primary" /> 01. Client Entity
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="label-premium">Client Name</label>
              <input 
                type="text" 
                value={formData.clientName}
                onChange={(e) => updateField('clientName', e.target.value)}
                className="input-premium p-4"
                placeholder="e.g. Acme Corp Int'l"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label-premium">Address</label>
              <textarea 
                value={formData.clientAddress}
                onChange={(e) => updateField('clientAddress', e.target.value)}
                className="input-premium p-4 h-24 resize-none"
                placeholder="Client physical address..."
              />
            </div>
            <div>
              <label className="label-premium">Issue Date</label>
              <input 
                type="date" 
                value={formData.invoiceDate}
                onChange={(e) => updateField('invoiceDate', e.target.value)}
                className="input-premium p-4"
              />
            </div>
            <div>
              <label className="label-premium">Due Date</label>
              <input 
                type="date" 
                value={formData.dueDate}
                onChange={(e) => updateField('dueDate', e.target.value)}
                className="input-premium p-4"
              />
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="card-premium">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-heading text-xl">02. Service Lines</h3>
            <button onClick={handleAddItem} className="text-primary text-action">+ Add Item</button>
          </div>
          
          <div className="space-y-6">
            {formData.items.map((item) => (
              <div key={item.id} className="bg-neutral-light p-6 rounded-button border border-secondary/5 grid grid-cols-12 gap-4 items-center group relative">
                <div className="col-span-7">
                  <input 
                    type="text" 
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    className="input-premium p-3 bg-white text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <input 
                    type="number" 
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    className="input-premium p-3 bg-white text-sm text-center"
                  />
                </div>
                <div className="col-span-3">
                  <input 
                    type="number" 
                    placeholder="Rate"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="input-premium p-3 bg-white text-sm"
                  />
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="absolute -right-2 -top-2 bg-secondary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Summary */}
        <div className="card-premium border-primary/20 bg-secondary text-white">
          <div className="space-y-4">
             <div className="flex justify-between text-white/60 text-xs font-black uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{totals.subtotal.toLocaleString()} TZS</span>
             </div>
             <div className="flex justify-between text-white/60 text-xs font-black uppercase tracking-widest border-b border-white/10 pb-4">
                <span>Tax ({formData.taxRate}%)</span>
                <span>{totals.tax.toLocaleString()} TZS</span>
             </div>
             <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-black uppercase tracking-tighter">Grand Total</span>
                <span className="text-3xl font-black text-primary drop-shadow-[0_0_10px_rgba(185,28,28,0.3)]">{totals.total.toLocaleString()} TZS</span>
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
