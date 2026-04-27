import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaBriefcase, 
  FaFileInvoice, 
  FaEnvelope, 
  FaFileSignature,
  FaArrowRight,
  FaHistory,
  FaGavel,
  FaGraduationCap,
  FaUsers,
  FaFileAlt,
  FaSearch,
  FaThLarge,
  FaEye
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocuments } from '../features/documents/documentsSlice';
import type { RootState, AppDispatch } from '../store/store';
import DocumentPreviewModal from '../components/documents/DocumentPreviewModal';

const Documents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { list: documents } = useSelector((state: RootState) => state.documents);
  const { access } = useSelector((state: RootState) => state.auth);

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const params = new URLSearchParams(location.search);
  const isShowcaseMode = params.get('mode') === 'showcase';
  
  useEffect(() => {
    // Only fetch if we have an active Redux session and we are NOT just in showcase mode
    if (access) {
      dispatch(fetchDocuments());
    }
    
    if (isShowcaseMode) {
      setActiveTab('SHOWCASE');
    }
  }, [dispatch, location, access, isShowcaseMode]);

  const categories = [
    { id: 'ALL', name: 'All Docs', icon: <FaThLarge /> },
    { id: 'CAREER', name: 'Career', icon: <FaBriefcase /> },
    { id: 'BUSINESS', name: 'Business', icon: <FaFileInvoice /> },
    { id: 'LEGAL', name: 'Legal', icon: <FaGavel /> },
    { id: 'ACADEMIC', name: 'Academic', icon: <FaGraduationCap /> },
    { id: 'SHOWCASE', name: 'Showcase', icon: <FaEye /> },
    { id: 'ARCHIVE', name: 'Archive', icon: <FaHistory /> },
  ];

  const allSupportedDocs = [
    {
      id: 'cv',
      category: 'CAREER',
      title: 'CV Architect',
      subtitle: 'Professional CV',
      description: 'Create industry-standard resumes that get you hired.',
      icon: <FaBriefcase />,
      path: '/create/cv',
      color: 'bg-red-600',
      tag: 'Popular'
    },
    {
      id: 'cover-letter',
      category: 'CAREER',
      title: 'Cover Letter',
      subtitle: 'Job Application',
      description: 'Craft compelling letters to accompany your job applications.',
      icon: <FaFileAlt />,
      path: '/create/letter?type=cover-letter',
      color: 'bg-slate-700',
      tag: 'Essential'
    },
    {
      id: 'invoice',
      category: 'BUSINESS',
      title: 'Smart Invoice',
      subtitle: 'Billing Suite',
      description: 'Professional billing and financial tracking for your business.',
      icon: <FaFileInvoice />,
      path: '/create/invoice',
      color: 'bg-red-600',
      tag: 'Business'
    },
    {
      id: 'proforma',
      category: 'BUSINESS',
      title: 'Proforma Invoice',
      subtitle: 'Quotations',
      description: 'Detailed documents for business quotes and estimates.',
      icon: <FaFileSignature />,
      path: '/create/invoice?type=proforma',
      color: 'bg-slate-700',
      tag: 'Estimates'
    },
    {
      id: 'official-letter',
      category: 'LEGAL',
      title: 'Official Letter',
      subtitle: 'Corporate Tool',
      description: 'Generate polished formal letters and correspondence.',
      icon: <FaEnvelope />,
      path: '/create/letter',
      color: 'bg-red-600',
      tag: 'Official'
    },
    {
      id: 'affidavits',
      category: 'LEGAL',
      title: 'Affidavits',
      subtitle: 'Legal Docs',
      description: 'Create legally binding affidavits and declarations.',
      icon: <FaGavel />,
      path: '/create/affidavit',
      color: 'bg-slate-700',
      tag: 'Legal'
    },
    {
      id: 'academic',
      category: 'ACADEMIC',
      title: 'Academic Docs',
      subtitle: 'School Suite',
      description: 'Manage your academic records and school correspondence.',
      icon: <FaGraduationCap />,
      path: '/create/academic',
      color: 'bg-red-600',
      tag: 'New'
    },
    {
      id: 'invitations',
      category: 'ACADEMIC',
      title: 'Invitations',
      subtitle: 'Event Suite',
      description: 'Design beautiful invitations and programs for your events.',
      icon: <FaUsers />,
      path: '/create/community',
      color: 'bg-slate-700',
      tag: 'Event'
    }
  ];

  const showcaseItems = [
    {
      id: 'sample-cv',
      category: 'SHOWCASE',
      title: 'Executive CV Preview',
      subtitle: 'Career Growth',
      description: 'See the impact of our precision-architected Executive Template.',
      icon: <FaBriefcase />,
      previewImage: '/assets/samples/cv_sample.png',
      targetPath: '/create/cv',
      tag: 'Sample'
    },
    {
      id: 'sample-invoice',
      category: 'SHOWCASE',
      title: 'Smart Invoice Preview',
      subtitle: 'Business Ops',
      description: 'Observe the professional hierarchy of our financial documents.',
      icon: <FaFileInvoice />,
      previewImage: '/assets/samples/invoice_sample.png',
      targetPath: '/create/invoice',
      tag: 'Sample'
    },
    {
      id: 'sample-letter',
      category: 'SHOWCASE',
      title: 'Formal Letter Preview',
      subtitle: 'Official Pro',
      description: 'High-fidelity corporate correspondence generated with AI precision.',
      icon: <FaEnvelope />,
      previewImage: '/assets/samples/letter_sample.png',
      targetPath: '/create/letter',
      tag: 'Sample'
    },
    {
      id: 'sample-affidavit',
      category: 'SHOWCASE',
      title: 'Legal Declaration Preview',
      subtitle: 'Legal Standard',
      description: 'Correctly formatted legal documents ready for verification.',
      icon: <FaGavel />,
      previewImage: '/assets/samples/affidavit_sample.png',
      targetPath: '/create/affidavit',
      tag: 'Sample'
    }
  ];

  const filteredDocs = useMemo(() => {
    if (activeTab === 'ARCHIVE') {
      return documents.filter((doc: any) => 
        (doc.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (doc.doc_type || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (activeTab === 'SHOWCASE') {
      return showcaseItems.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return allSupportedDocs.filter(doc => {
      const matchesTab = activeTab === 'ALL' || doc.category === activeTab;
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, documents]);

  return (
    <div className="min-h-screen bg-white pt-12 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header - Unified Studio Entry */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-gray-100">
          <div className="space-y-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 text-[#B91C1C] text-[10px] font-black uppercase tracking-[0.4em]"
            >
              <span className="w-1.5 h-1.5 bg-[#B91C1C] rounded-full" />
              Document Studio
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl font-black text-[#1F2937] tracking-tighter"
            >
              Select <span className="text-[#B91C1C]">Expertise</span>
            </motion.h1>
          </div>

          {/* Minimalist Search */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full md:w-80 group"
          >
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#B91C1C] transition-colors" />
            <input 
              type="text" 
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-100 font-bold text-sm text-[#111827] outline-none transition-all"
            />
          </motion.div>
        </header>

        {/* Cohesive Segmented Control - Responsive Scroll */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-[2rem] w-max mx-auto shadow-inner border border-gray-100 mb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-3 px-6 md:px-8 py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                  activeTab === cat.id 
                    ? 'bg-white text-[#B91C1C] shadow-lg scale-105' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className={activeTab === cat.id ? 'text-[#B91C1C]' : 'text-gray-300'}>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Concentrated Content Switcher */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + searchQuery}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredDocs.length > 0 ? filteredDocs.map((item: any) => {
                const isArchive = activeTab === 'ARCHIVE';
                const isShowcase = item.category === 'SHOWCASE';
                
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-red-900/5 transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between aspect-[4/5]"
                    onClick={() => {
                      if (isArchive) {
                        setSelectedDoc(item);
                        setIsPreviewOpen(true);
                      } else {
                        navigate(isShowcase ? item.targetPath : item.path);
                      }
                    }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[4rem] -mr-8 -mt-8 group-hover:bg-red-50 transition-colors" />
                    
                    <div className="relative z-10 space-y-6">
                      <div className={`w-14 h-14 ${isArchive ? 'bg-slate-800' : (item.color || 'bg-slate-800')} text-white rounded-2xl flex items-center justify-center text-xl shadow-xl group-hover:rotate-12 transition-all duration-500`}>
                        {isArchive ? <FaFileAlt /> : item.icon}
                      </div>
                      <div className="space-y-1">
                        <p className="text-[#B91C1C] text-[9px] font-black uppercase tracking-[0.4em] leading-none mb-2">
                          {isArchive ? item.status : item.subtitle}
                        </p>
                        <h3 className="text-2xl font-black text-[#1F2937] tracking-tighter leading-tight group-hover:text-[#B91C1C] transition-colors line-clamp-2">
                          {isArchive ? (item.title || 'Untitled Document') : item.title}
                        </h3>
                        <p className="text-gray-400 font-medium text-xs leading-relaxed line-clamp-3 pt-2">
                          {isArchive ? `Customer: ${item.customer_name || 'Personal'}` : item.description}
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 pt-4 flex items-center justify-between border-t border-gray-50">
                      <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest group-hover:text-primary transition-colors">
                        {isArchive ? item.doc_type : item.tag}
                      </span>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1F2937] group-hover:text-[#B91C1C] transition-colors">
                        {isArchive ? 'Details' : (isShowcase ? 'Create Sample' : 'Start Creating')}
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#B91C1C] group-hover:text-white transition-all">
                          <FaArrowRight size={10} />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                );
              }) : (
                <div className="col-span-full py-40 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200 mb-6">
                    <FaSearch size={30} />
                  </div>
                  <h3 className="text-xl font-black text-[#1F2937]">No Matches Found</h3>
                  <p className="text-gray-400 font-medium text-sm">We couldn't find any templates for "{searchQuery}"</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Refined Footer Workspace Access */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="pt-12 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 text-xl">
              <FaHistory />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#1F2937] uppercase tracking-[0.2em] mb-1">Historical Archive</p>
              <p className="text-xs text-gray-400 font-medium tracking-tight">Access your saved collection of <span className="text-[#B91C1C] font-bold">{documents?.length || 0}</span> documents.</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/documents/archive')}
            className="px-8 py-4 bg-[#1F2937] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#B91C1C] transition-all shadow-xl hover:shadow-red-900/20 active:scale-95"
          >
            Manage My Archive
          </button>
        </motion.div>

        <DocumentPreviewModal 
          isOpen={isPreviewOpen} 
          onClose={() => {
            setIsPreviewOpen(false);
            setSelectedDoc(null);
          }} 
          document={selectedDoc} 
        />
      </div>
    </div>
  );
};

export default Documents;
