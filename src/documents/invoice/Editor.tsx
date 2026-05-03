import React, { useState } from "react";
import { FaPlus, FaTrash, FaFileInvoiceDollar } from "react-icons/fa";
import { useDocumentEngine } from "../hooks/useDocumentEngine";
import { SmartEditorLayout } from "../../components/editor/SmartEditorLayout";
import Preview from "./Preview";
import type { InvoiceContent, InvoiceItem } from "../types";
import { INVOICE_TEMPLATE } from "../templates";
import { toast } from "react-toastify";
import { notify } from "../../utils/notificationService";
import { useTranslation } from "react-i18next";
import { DOCUMENT_REGISTRY } from "../registry";

const Editor = () => {
  const { t } = useTranslation();
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
    settings,
    setSettings,
    error
  } = useDocumentEngine<InvoiceContent>(initialData, 'INVOICE');

  const [docTitle, setDocTitle] = useState(t('invoice.invoice_builder'));

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
      notify.success(t('common.success_saved', 'Document Securely Saved.'));
    } catch (err) {}
  };

  return (
    <SmartEditorLayout
      title={t('invoice.invoice_builder')}
      subtitle={t('invoice.architecture_engine')}
      onSave={onSave}
      isSaving={isSaving}
      isValidated={isValidated}
      settings={settings}
      onSettingsChange={setSettings}
      templates={DOCUMENT_REGISTRY['INVOICE'].templates}
      preview={<Preview data={formData} settings={settings} />}
      onStartBlank={() => {
        setFormData(initialData);
        toast.info(t('invoice.add_line_items'));
      }}
      onStartTemplate={() => {
        setFormData(t('invoice.sample_data', { returnObjects: true }) as any);
        toast.success(t('common.template_loaded'));
      }}
      onStartAI={() => {
        setFormData({
          ...INVOICE_TEMPLATE,
          clientName: t('invoice.ai_client_name', 'AI Optimized Client Entity'),
          items: [
            { id: "ai1", description: t('invoice.ai_service_item', 'AI-Generated Service Consultation'), quantity: 1, unitPrice: 200000 }
          ]
        });
        toast.success(t('common.ai_drafted', 'AI-drafted initialized!'));
      }}
    >
      <div className="space-y-12 text-left">
        {/* Client Details */}
        <div className="card-premium">
          <h3 className="text-heading text-xl mb-8 flex items-center gap-3">
            <FaFileInvoiceDollar className="text-primary" /> 01. {t('invoice.client_entity')}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="label-premium">{t('invoice.client_name')}</label>
              <input 
                type="text" 
                value={formData.clientName}
                onChange={(e) => updateField('clientName', e.target.value)}
                className="input-premium p-4"
                placeholder={t('invoice.client_name_placeholder', "e.g. Acme Corp Int'l")}
              />
            </div>
            <div className="md:col-span-2">
              <label className="label-premium">{t('invoice.client_address')}</label>
              <textarea 
                value={formData.clientAddress}
                onChange={(e) => updateField('clientAddress', e.target.value)}
                className="input-premium p-4 h-24 resize-none"
                placeholder={t('invoice.client_address')}
              />
            </div>
            <div>
              <label className="label-premium">{t('invoice.issue_date')}</label>
              <input 
                type="date" 
                value={formData.invoiceDate}
                onChange={(e) => updateField('invoiceDate', e.target.value)}
                className="input-premium p-4"
              />
            </div>
            <div>
              <label className="label-premium">{t('invoice.due_date')}</label>
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
            <h3 className="text-heading text-xl">02. {t('invoice.service_lines')}</h3>
            <button onClick={handleAddItem} className="text-primary text-action">+ {t('quotation.add_item')}</button>
          </div>
          
          <div className="space-y-6">
            {formData.items.map((item) => (
              <div className="bg-neutral-light p-6 rounded-button border border-secondary/5 grid grid-cols-12 gap-4 items-center group relative">
                <div className="col-span-7">
                  <input 
                    type="text" 
                    placeholder={t('invoice.service_item')}
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    className="input-premium p-3 bg-white text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <input 
                    type="number" 
                    placeholder={t('invoice.qty')}
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    className="input-premium p-3 bg-white text-sm text-center"
                  />
                </div>
                <div className="col-span-3">
                  <input 
                    type="number" 
                    placeholder={t('invoice.rate')}
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
                <span>{t('invoice.subtotal')}</span>
                <span>{totals.subtotal.toLocaleString()} TZS</span>
             </div>
             <div className="flex justify-between text-white/60 text-xs font-black uppercase tracking-widest border-b border-white/10 pb-4">
                <span>{t('invoice.tax')} ({formData.taxRate}%)</span>
                <span>{totals.tax.toLocaleString()} TZS</span>
             </div>
             <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-black uppercase tracking-tighter">{t('invoice.grand_total')}</span>
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
