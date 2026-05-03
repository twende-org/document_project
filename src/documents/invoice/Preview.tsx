import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface InvoicePreviewProps {
  data: any;
  settings?: any;
}

const Preview: React.FC<InvoicePreviewProps> = ({ data, settings }) => {
  const { t } = useTranslation();
  const { clientName, clientAddress, invoiceDate, dueDate, items = [], taxRate = 18 } = data;

  const subtotal = items.reduce((acc: number, item: any) => acc + (Number(item.quantity || 0) * Number(item.unitPrice || 0)), 0);
  const tax = subtotal * (Number(taxRate) / 100);
  const total = subtotal + tax;

  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const layout = settings?.layout || 'standard';

  // Elegant Layout
  if (layout === 'elegant') {
    return (
      <div className="bg-slate-200 p-4 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden min-h-[800px] sticky top-32 text-left">
        <div className="bg-white p-12 shadow-inner min-h-[700px] flex flex-col font-sans text-charcoal items-center text-center">
          <header className="mb-16 pb-12 border-b w-full" style={{ borderColor: primaryColor + '20' }}>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: primaryColor + '10', color: primaryColor }}>
                <FaShieldAlt />
              </div>
              <h2 className="text-4xl font-black tracking-[0.2em] uppercase" style={{ color: primaryColor }}>{t('invoice.invoice')}</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Twende Digital Solutions</p>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-12 w-full mb-16 text-left">
            <div>
              <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-2">{t('invoice.attention_to')}</p>
              <p className="text-xl font-black uppercase text-charcoal">{clientName || t('invoice.client_entity')}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{clientAddress}</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-2">{t('invoice.date_terms')}</p>
              <p className="text-sm font-black text-charcoal">{invoiceDate}</p>
              <p className="text-sm font-black uppercase" style={{ color: primaryColor }}>{dueDate || t('invoice.upon_receipt')}</p>
            </div>
          </div>

          <table className="w-full mb-16">
            <thead className="border-b" style={{ borderColor: primaryColor + '20' }}>
              <tr>
                <th className="py-4 text-left text-[9px] font-black uppercase tracking-widest text-gray-400">{t('invoice.description')}</th>
                <th className="py-4 text-right text-[9px] font-black uppercase tracking-widest text-gray-400">{t('invoice.amount')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map((item: any, i: number) => (
                <tr key={i}>
                  <td className="py-4 text-left">
                    <p className="font-black text-charcoal uppercase text-sm">{item.description}</p>
                    <p className="text-[8px] text-gray-400">{t('invoice.qty')}: {item.quantity} × TSh {Number(item.unitPrice).toLocaleString()}</p>
                  </td>
                  <td className="py-4 text-right font-black text-charcoal">TSh {(item.quantity * item.unitPrice).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-auto w-full pt-12 border-t" style={{ borderColor: primaryColor + '20' }}>
            <div className="flex justify-between items-center bg-slate-50 p-8 rounded-3xl">
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('invoice.total_settlement')}</p>
                <p className="text-sm font-bold text-gray-300 uppercase">{t('invoice.amount_due_tzs')}</p>
              </div>
              <p className="text-4xl font-black" style={{ color: primaryColor }}>{total.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modern Layout
  if (layout === 'modern') {
    return (
      <div className="bg-slate-200 p-4 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden min-h-[800px] sticky top-32 text-left">
        <div className="bg-white p-12 shadow-inner min-h-[700px] flex flex-col font-sans text-charcoal">
          <header className="flex justify-between items-start mb-16">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-none" style={{ color: primaryColor }}>{t('invoice.invoice')}</h2>
              <p className="text-sm font-black text-gray-400 tracking-widest uppercase mt-2">Twende Documents Engine</p>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl" style={{ backgroundColor: primaryColor }}>
              <FaShieldAlt />
            </div>
          </header>

          <div className="bg-slate-50 p-8 rounded-3xl mb-12 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-gray-300 uppercase mb-1">{t('invoice.invoice_to')}</p>
              <p className="text-2xl font-black uppercase tracking-tight">{clientName || t('invoice.client_entity')}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-300 uppercase mb-1">{t('invoice.issue_date')}</p>
              <p className="text-lg font-black">{invoiceDate}</p>
            </div>
          </div>

          <div className="flex-1">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b-2 border-slate-100">
                  <th className="py-4 text-[10px] font-black uppercase text-gray-400">{t('invoice.service_items')}</th>
                  <th className="py-4 text-center text-[10px] font-black uppercase text-gray-400">{t('invoice.qty')}</th>
                  <th className="py-4 text-right text-[10px] font-black uppercase text-gray-400">{t('invoice.rate')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map((item: any, i: number) => (
                  <tr key={i}>
                    <td className="py-6">
                      <p className="font-black uppercase tracking-tight">{item.description}</p>
                    </td>
                    <td className="py-6 text-center font-bold text-gray-400">{item.quantity}</td>
                    <td className="py-6 text-right font-black text-charcoal">TSh {Number(item.unitPrice).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 pt-8 flex justify-between items-end">
            <div className="text-[10px] font-black text-gray-300 uppercase space-y-1">
              <p>Twende Digital Solutions</p>
              <p>Precision Built Documents</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-gray-400 uppercase mb-2">{t('invoice.total_amount_payable')}</p>
              <p className="text-5xl font-black tracking-tighter" style={{ color: primaryColor }}>TSh {total.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard/Compact
  const isCompact = layout === 'compact';

  return (
    <div className="bg-slate-200 p-4 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden min-h-[800px] sticky top-32 text-left">
      <div className={`bg-white p-8 md:p-12 shadow-inner min-h-[700px] flex flex-col font-sans text-charcoal ${isCompact ? 'text-[10px]' : ''}`}>
        {/* Header */}
        <div className={`flex justify-between items-start border-b-8 pb-12 ${isCompact ? 'mb-8' : 'mb-16'}`} style={{ borderBottomColor: primaryColor }}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FaShieldAlt className="text-3xl" style={{ color: primaryColor }} />
              <h2 className={`${isCompact ? 'text-3xl' : 'text-4xl'} font-black tracking-tighter uppercase leading-none`}>{t('invoice.invoice')}</h2>
            </div>
            <p className="font-black tracking-[0.3em] uppercase text-[10px]" style={{ color: primaryColor }}>{t('invoice.precision_generated')}</p>
          </div>
          <div className="text-right">
            <p className="font-black text-charcoal text-xl tracking-tighter uppercase" style={{ color: primaryColor }}>Twende Documents</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{t('invoice.official_solutions')}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">#INV-PREVIEW</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className={`grid grid-cols-2 gap-16 px-2 ${isCompact ? 'mb-8' : 'mb-16'}`}>
          <div>
            <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-4">{t('invoice.invoice_to')}</p>
            <p className="font-black text-charcoal text-2xl uppercase tracking-tighter mb-1 truncate max-w-[280px]">{clientName || t('invoice.client_name')}</p>
            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">{clientAddress || t('invoice.client_address')}</p>
          </div>
          <div className="space-y-4 text-right">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('invoice.issue_date')}</p>
              <p className="font-black text-charcoal">{invoiceDate || "YYYY-MM-DD"}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('invoice.payment_terms')}</p>
              <p className="font-black uppercase tracking-widest" style={{ color: primaryColor }}>{dueDate || t('invoice.upon_receipt')}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 px-2">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-slate-100">
                <th className="text-left py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{t('invoice.service_item')}</th>
                <th className="text-center py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{t('invoice.qty')}</th>
                <th className="text-right py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{t('invoice.rate')}</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-50">
              {items.length > 0 ? items.map((item: any, idx: number) => (
                <tr key={idx} className="group transition-colors hover:bg-slate-50/50">
                  <td className={`${isCompact ? 'py-3' : 'py-6'}`}>
                    <p className="font-black text-charcoal uppercase tracking-tighter text-lg">{item.description || t('invoice.service_item')}</p>
                  </td>
                  <td className="text-center font-black text-gray-400 tracking-tighter">{item.quantity || 1}</td>
                  <td className="text-right font-black text-charcoal text-lg">TSh {(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toLocaleString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-gray-300 font-black uppercase tracking-[0.2em]">{t('invoice.add_line_items')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-16 pt-12 border-t-8 border-slate-50">
          <div className="flex flex-col items-end gap-2 mb-8 px-6">
            <div className="flex justify-between w-64">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t('invoice.subtotal')}</span>
              <span className="font-black text-charcoal">TSh {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between w-64">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t('invoice.tax')} ({taxRate}%)</span>
              <span className="font-black text-charcoal">TSh {tax.toLocaleString()}</span>
            </div>
          </div>
          
          <div className={`flex justify-between items-center p-10 rounded-[2rem] text-white shadow-2xl transform hover:scale-[1.02] transition-transform duration-500`} style={{ backgroundColor: primaryColor }}>
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50 mb-1 underline decoration-2 underline-offset-4">{t('invoice.grand_total')}</p>
              <p className="text-lg font-bold text-white/50 uppercase tracking-widest">{t('invoice.amount_payable')}</p>
            </div>
            <p className={`${isCompact ? 'text-3xl' : 'text-5xl'} font-black tracking-tighter`}>TSh {total.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
