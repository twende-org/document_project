import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { FaFileAlt, FaHistory, FaTrash, FaEdit, FaDownload, FaRocket } from "react-icons/fa";
import { fetchDocuments, removeDocument } from "../features/documents/documentsSlice";
import type { RootState, AppDispatch } from "../store/store";
import { NavLink } from "react-router-dom";

const AllDocuments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: documents, status, loading } = useSelector((state: RootState) => state.documents);

  const access = useSelector((state: RootState) => state.auth.access);

  useEffect(() => {
    if (access) {
      dispatch(fetchDocuments());
    }
  }, [dispatch, access]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      await dispatch(removeDocument(id));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 bg-secondary rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <FaHistory />
             </div>
             <div>
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary mb-1">Archive</h2>
                <h1 className="text-display text-secondary leading-none">All <span className="text-primary italic">Documents</span></h1>
             </div>
          </div>
          <NavLink 
            to="/create/cv" 
            className="btn-primary px-8 py-4 flex items-center gap-3 active:scale-95 transition-transform"
          >
            <FaRocket /> Start New Project
          </NavLink>
        </header>

        {loading && documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-secondary/20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-xs font-black uppercase tracking-widest">Scanning Database...</p>
          </div>
        ) : documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {documents.map((doc) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-8 rounded-card shadow-sm border border-secondary/5 hover:shadow-premium transition-all group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-neutral-light rounded-2xl flex items-center justify-center text-secondary/20 group-hover:text-primary transition-colors text-xl">
                        <FaFileAlt />
                      </div>
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${doc.status === 'FINAL' ? 'bg-secondary text-white border-secondary' : 'bg-white text-primary border-primary/20'}`}>
                        {doc.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">{doc.doc_type}</p>
                    <h3 className="text-xl font-black text-secondary tracking-tighter uppercase mb-4 line-clamp-2">
                        {doc.title || 'Untitled Document'}
                    </h3>
                    <p className="text-xs font-bold text-secondary/40 uppercase mb-8">
                        {doc.customer_name || 'Personal Project'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-secondary/5">
                    <span className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">
                        {new Date(doc.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleDelete(doc.id)}
                            className="w-10 h-10 rounded-full bg-white border border-secondary/5 text-secondary/20 hover:text-primary hover:border-primary/20 flex items-center justify-center transition-all"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white p-20 rounded-card shadow-inner border border-dashed border-secondary/10 text-center">
            <FaFileAlt className="text-6xl text-secondary/5 mx-auto mb-6" />
            <h3 className="text-xl font-black text-secondary mb-2">Workspace Empty</h3>
            <p className="text-xs font-black text-secondary/20 uppercase tracking-[0.3em]">No documents found in your archive.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDocuments;