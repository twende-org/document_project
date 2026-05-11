import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DocumentService } from "../documents/DocumentService";
import Preview from "../documents/cv/Preview";
import Loader from "../components/Loader";
import { FaFilePdf, FaWhatsapp } from "react-icons/fa";

const PublicView = () => {
  const { id } = useParams<{ id: string }>();
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      DocumentService.getPublicDocument(id)
        .then(data => {
          setDoc(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <Loader message="Accessing Secure Document..." />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light">
      <div className="text-center p-8 bg-white rounded-card shadow-premium border border-neutral-border">
        <h1 className="text-3xl font-black text-secondary mb-4 uppercase">404 - Document Not Found</h1>
        <p className="text-secondary/60 font-medium">The document you are looking for might have been removed or set to private.</p>
        <a href="/" className="btn-primary inline-block mt-8">Go Back Home</a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-light py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
           <div className="text-left">
              <h1 className="text-3xl md:text-5xl font-black text-secondary uppercase tracking-tighter">{doc.title}</h1>
              <p className="text-secondary/50 font-bold uppercase tracking-widest text-xs mt-2">Verified Professional Identity</p>
           </div>
           <div className="flex gap-4">
              <button 
                onClick={() => window.print()}
                className="btn-secondary flex items-center gap-3"
              >
                 <FaFilePdf /> Print / Save
              </button>
              <button 
                onClick={() => {
                  const text = `Check out my verified professional profile on Twende Docs! 🚀\n\nView here: ${window.location.href}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="bg-[#25D366] text-white px-8 py-3 rounded-button font-bold text-xs uppercase tracking-widest hover:bg-[#128C7E] transition-all flex items-center gap-2"
              >
                 <FaWhatsapp size={16} /> Share
              </button>
           </div>
        </div>

        <div className="flex justify-center shadow-2xl rounded-card overflow-hidden">
           <Preview data={doc.content} settings={doc.settings} />
        </div>

        <div className="mt-20 text-center border-t border-neutral-border pt-12">
           <p className="text-secondary/30 text-[10px] font-black uppercase tracking-[0.5em]">Built with Twende Docs Architect</p>
           <p className="text-secondary/20 text-[8px] font-bold mt-2 uppercase tracking-widest">© 2026 Twende Digital. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PublicView;
