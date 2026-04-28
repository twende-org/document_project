import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface InvoicePreviewProps {
  data: any;
}

const Preview: React.FC<InvoicePreviewProps> = ({ data }) => {
  const { t } = useTranslation();
  const { clientName, clientAddress, invoiceDate, dueDate, items = [], taxRate = 18 } = data;

  const subtotal = items.reduce((acc: number, item: any) => acc + (Number(item.quantity || 0) * Number(item.unitPrice || 0)), 0);
  const tax = subtotal * (Number(taxRate) / 100);
  const total = subtotal + tax;

  return (
    <div className="bg-slate-200 p-4 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden min-h-[800px] sticky top-32">
      <div className="bg-white p-8 md:p-12 shadow-inner min-h-[700px] flex flex-col font-sans text-charcoal text-left">
        {/* Header */}
        <div className="flex justify-between items-start mb-16 border-b-8 border-charcoal pb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FaShieldAlt className="text-redMain text-3xl" />
              <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">{t('invoice.invoice')}</h2>
            </div>
            <p className="text-redMain font-black tracking-[0.3em] uppercase text-[10px]">{t('invoice.precision_generated')}</p>
          </div>
          <div className="text-right">
            <p className="font-black text-charcoal text-xl tracking-tighter uppercase">Twende Documents</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{t('invoice.official_solutions')}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">#INV-{new Date().getTime().toString().slice(-6)}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-16 mb-16 px-2">
          <div>
            <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-4">{t('invoice.invoice_to')}</p>
            <p className="font-black text-charcoal text-2xl uppercase tracking-tighter mb-1 truncate">{clientName || t('invoice.client_name')}</p>
            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">{clientAddress || t('invoice.client_address')}</p>
          </div>
          <div className="space-y-4 text-right">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('invoice.issue_date')}</p>
              <p className="font-black text-charcoal">{invoiceDate || "YYYY-MM-DD"}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('invoice.payment_terms')}</p>
              <p className="font-black text-redMain uppercase tracking-widest">{dueDate || t('invoice.upon_receipt')}</p>
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
                <th className="text-right py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{t('invoice.total_due')}</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-50">
              {items.length > 0 ? items.map((item: any, idx: number) => (
                <tr key={idx} className="group transition-colors hover:bg-slate-50/50">
                  <td className="py-6">
                    <p className="font-black text-charcoal uppercase tracking-tighter text-lg">{item.description || t('invoice.service_item')}</p>
                  </td>
                  <td className="py-6 text-center font-black text-gray-400 tracking-tighter">{item.quantity || 1}</td>
                  <td className="py-6 text-right font-bold text-gray-400">TSh {Number(item.unitPrice || 0).toLocaleString()}</td>
                  <td className="py-6 text-right font-black text-charcoal text-lg">TSh {(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toLocaleString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-300 font-black uppercase tracking-[0.2em]">{t('invoice.add_line_items')}</td>
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
          
          <div className="flex justify-between items-center bg-charcoal p-10 rounded-[2rem] text-white shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-redMain mb-1 underline decoration-2 underline-offset-4">{t('invoice.grand_total')}</p>
              <p className="text-lg font-bold text-white/50 uppercase tracking-widest">{t('invoice.amount_payable')}</p>
            </div>
            <p className="text-5xl font-black tracking-tighter">TSh {total.toLocaleString()}</p>
          </div>
          
          <div className="mt-12 text-center">
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">{t('invoice.precision_engine')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
