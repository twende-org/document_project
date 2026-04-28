import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { FaUsers, FaUserCheck, FaUserTie, FaUserShield, FaClipboardList, FaCheck, FaHourglassHalf, FaTools, FaTrash, FaEye, FaFileAlt, FaChartPie, FaUserCog, FaShieldAlt } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import { fetchDocRequests, updateRequestStatus } from "../store/docRequestsSlice";
import { toast } from "react-toastify";
import { fetchAdminUsers, toggleUserActive, deleteUser } from "../store/adminUsersSlice";
import { fetchDocuments, removeDocument } from "../features/documents/documentsSlice";

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading: usersLoading, error: usersError } = useSelector(
    (state: RootState) => state.adminUsers
  );
  const { user, loading: authLoading } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.is_staff || user?.is_superuser;
  const { requests, loading: reqLoading, updatingId } = useSelector(
    (state: RootState) => state.docRequests
  );
  const { list: documents, loading: docsLoading } = useSelector(
    (state: RootState) => state.documents
  );

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'documents' | 'requests'>('overview');

  useEffect(() => {
    dispatch(fetchAdminUsers());
    dispatch(fetchDocRequests());
    dispatch(fetchDocuments(undefined));
  }, [dispatch]);

  const handleStatusUpdate = (id: number, status: string) => {
    console.log("Updating status to:", status); dispatch(updateRequestStatus({ id, status })).unwrap().then(() => {
        toast.success("Status updated. User notified via email.");
        dispatch(fetchDocRequests());
    }).catch((err) => {
        toast.error("Update failed: " + (err.message || "Error"));
    });
  };

  const handleToggleUser = (id: number) => {
    if (window.confirm("Are you sure you want to toggle this user's active status?")) {
        dispatch(toggleUserActive(id));
    }
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("CRITICAL: Are you sure you want to delete this user? This action cannot be undone.")) {
        dispatch(deleteUser(id));
    }
  };

  const handleDeleteDocument = (id: number) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
        dispatch(removeDocument(id));
    }
  };

  const safeFormatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
        return 'Invalid Date';
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  if (!isAdmin) {
    return (
        <div className="mx-auto container mt-32 px-4 text-center">
            <div className="bg-red-50 p-12 rounded-[3rem] border border-red-100 inline-block">
                <h2 className="text-3xl font-black text-red-600 mb-4 uppercase tracking-tighter">Access Denied</h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8">You do not have administrative privileges to access this panel.</p>
                <a href="/" className="btn-primary px-10 py-4 inline-block">Return Home</a>
            </div>
        </div>
    );
  }

  if (usersLoading || reqLoading || docsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-black uppercase tracking-widest text-xs">{t('dashboard.loading_data', 'Loading System Data...')}</p>
      </div>
    );
  }

  if (usersError) {
    return (
        <div className="mx-auto container mt-32 px-4 text-center">
            <div className="bg-red-50 p-8 rounded-3xl border border-red-100 inline-block">
                <p className="text-red-500 font-bold mb-4">{usersError}</p>
                <button onClick={() => dispatch(fetchAdminUsers())} className="btn-primary px-8 py-3">Retry</button>
            </div>
        </div>
    );
  }

  // Compute statistics
  const totalUsers = users.length;
  const totalActive = users.filter((user) => user.is_active).length;
  const totalStaff = users.filter((user) => user.is_staff).length;
  const totalSuperusers = users.filter((user) => user.is_superuser).length;

  const stats = [
    { title: t('dashboard.total_users'), value: totalUsers, icon: FaUsers, bg: "bg-blue-100", color: "text-blue-600" },
    { title: t('dashboard.active_users'), value: totalActive, icon: FaUserCheck, bg: "bg-green-100", color: "text-green-600" },
    { title: t('dashboard.staff_users'), value: totalStaff, icon: FaUserTie, bg: "bg-purple-100", color: "text-purple-600" },
    { title: t('dashboard.superusers'), value: totalSuperusers, icon: FaUserShield, bg: "bg-yellow-100", color: "text-yellow-600" },
  ];

  const pieData = [
    { name: t('dashboard.active_users'), value: totalActive },
    { name: t('dashboard.staff_users'), value: totalStaff },
    { name: t('dashboard.superusers'), value: totalSuperusers },
  ];

  const COLORS = ["#34D399", "#8B5CF6", "#FACC15"];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FaChartPie },
    { id: 'users', name: 'Users', icon: FaUsers },
    { id: 'documents', name: 'Documents', icon: FaFileAlt },
    { id: 'requests', name: 'Requests', icon: FaClipboardList },
  ];

  return (
    <div className="mx-auto container mt-32 px-6 pb-20 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#1F2937] uppercase tracking-tighter mb-2">{t('dashboard.admin_command', 'Command Center')}</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Twende Precision Architecture v1.0 Admin</p>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex bg-gray-100 p-1.5 rounded-[1.5rem] gap-1 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeTab === tab.id 
                        ? "bg-white text-[#B91C1C] shadow-sm" 
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                      <tab.icon /> {tab.name}
                  </button>
              ))}
          </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div 
            key="overview" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Statistic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                <div
                    key={stat.title}
                    className={`flex items-center p-8 rounded-[2.5rem] shadow-xl bg-white border border-gray-50 hover:shadow-2xl transition-all duration-300 group`}
                >
                    <div className={`w-16 h-16 rounded-3xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl mr-6 group-hover:scale-110 transition-transform`}>
                    <stat.icon />
                    </div>
                    <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.title}</p>
                    <p className="text-3xl font-black text-[#1F2937] tracking-tighter">{stat.value}</p>
                    </div>
                </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="bg-white rounded-[3rem] shadow-xl p-10 border border-gray-100">
                <h3 className="text-xl font-black mb-10 text-[#1F2937] uppercase tracking-tighter flex items-center gap-4">
                    <FaUserCog /> {t('dashboard.user_distribution')}
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
                </div>

                {/* Quick Summary / System Health */}
                <div className="bg-[#1F2937] rounded-[3rem] shadow-2xl p-10 text-white relative overflow-hidden flex flex-col justify-between">
                <div className="relative z-10">
                    <h3 className="text-xl font-black mb-10 uppercase tracking-tighter flex items-center gap-4 text-primary">
                        <FaShieldAlt /> {t('dashboard.system_health', 'System Health')}
                    </h3>
                    <div className="space-y-8">
                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{t('dashboard.pending_requests', 'Pending Requests')}</span>
                            <span className="text-3xl font-black text-primary">{requests.filter(r => r.status === 'PENDING').length}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{t('dashboard.active_sessions', 'Active Sessions')}</span>
                            <span className="text-3xl font-black text-green-400">{totalActive}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{t('dashboard.total_documents', 'Total Documents')}</span>
                            <span className="text-3xl font-black text-blue-400">{documents.length}</span>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -mr-40 -mt-40" />
                </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div 
            key="users" 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
          >
             <div className="bg-[#1F2937] p-10 text-white">
                <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                   <FaUsers /> {t('dashboard.user_management', 'User Management')}
                </h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">User</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-8 py-6">
                                    <span className="font-black text-[#1F2937] uppercase tracking-tight block">{user.first_name} {user.last_name}</span>
                                    <span className="text-[10px] text-gray-400 font-medium">{user.email}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-gray-100 text-gray-600">
                                        {user.is_superuser ? 'Superuser' : user.is_staff ? 'Staff' : 'User'}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${user.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-[10px] font-bold text-gray-400">
                                    {safeFormatDate(user.created_at)}
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex justify-end gap-3">
                                        <button 
                                            onClick={() => handleToggleUser(user.id)}
                                            className={`p-3 rounded-xl transition-all ${user.is_active ? 'bg-orange-50 text-orange-500 hover:bg-orange-100' : 'bg-green-50 text-green-500 hover:bg-green-100'}`}
                                            title={user.is_active ? "Deactivate" : "Activate"}
                                        >
                                            <FaUserCheck />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                                            title="Delete User"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          </motion.div>
        )}

        {activeTab === 'documents' && (
          <motion.div 
            key="documents" 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
          >
             <div className="bg-[#B91C1C] p-10 text-white">
                <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                   <FaFileAlt /> {t('dashboard.document_management', 'All Documents')}
                </h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Document</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">User / Customer</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Modified</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-8 py-6">
                                    <span className="font-black text-[#1F2937] uppercase tracking-tight block">{doc.title}</span>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{doc.doc_type}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black text-gray-600 block uppercase">{doc.customer_name || 'Personal'}</span>
                                    {doc.customer_phone && <span className="text-[10px] text-gray-400">{doc.customer_phone}</span>}
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${doc.status === 'FINAL' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-[10px] font-bold text-gray-400">
                                    {safeFormatDate(doc.updated_at)}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button 
                                        onClick={() => handleDeleteDocument(doc.id)}
                                        className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all ml-auto block"
                                        title="Delete Document"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {documents.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                    No documents found in the system.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
             </div>
          </motion.div>
        )}

        {activeTab === 'requests' && (
          <motion.div 
            key="requests" 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
          >
             <div className="bg-[#B91C1C] p-10 text-white flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                    <FaClipboardList /> {t('dashboard.document_requests', 'User Document Requests')}
                    </h3>
                </div>
                <div className="bg-white/10 px-6 py-3 rounded-2xl text-xs font-black">
                    {requests.length} {t('dashboard.total', 'Total')}
                </div>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('dashboard.document_name', 'Document')}</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">User</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('dashboard.description', 'Use Case')}</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('dashboard.date', 'Submitted')}</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {requests.map((request) => (
                            <tr key={request.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-8 py-6">
                                    <span className="font-black text-[#1F2937] uppercase tracking-tight block">{request.doc_name}</span>
                                    <span className="text-[10px] text-gray-400 font-medium">ID: #{request.id}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="font-black text-[#1F2937] uppercase tracking-tight block">{request.user_name}</span>
                                    <span className="text-[10px] text-gray-400 font-medium">{request.user_email}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-xs text-gray-500 font-medium max-w-xs line-clamp-2 italic">
                                        "{request.description || t('dashboard.no_description', 'No details provided')}"
                                    </p>
                                </td>
                                <td className="px-8 py-6 text-[10px] font-bold text-gray-400">
                                    {safeFormatDate(request.created_at)}
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                    request.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' :
                                    request.status === 'DEVELOPING' ? 'bg-blue-50 text-blue-600' :
                                    'bg-green-50 text-green-600'
                                    }`}>
                                    {request.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex justify-end gap-3">
                                    {updatingId === request.id ? (
                                        <div className="flex items-center gap-2 text-[10px] font-black text-primary animate-pulse uppercase tracking-widest">
                                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            Updating...
                                        </div>
                                    ) : (
                                        <>
                                        <button 
                                            onClick={() => handleStatusUpdate(request.id, 'PENDING')}
                                            title="Mark as Pending"
                                            className="group/btn flex flex-col items-center gap-1 transition-all"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 group-hover/btn:bg-yellow-50 group-hover/btn:text-yellow-600 flex items-center justify-center transition-all shadow-sm">
                                                <FaHourglassHalf className="text-sm" />
                                            </div>
                                            <span className="text-[8px] font-black uppercase tracking-tighter text-gray-300 group-hover/btn:text-yellow-600">Pending</span>
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleStatusUpdate(request.id, 'DEVELOPING')}
                                            title="Mark as Developing"
                                            className="group/btn flex flex-col items-center gap-1 transition-all"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 group-hover/btn:bg-blue-50 group-hover/btn:text-blue-600 flex items-center justify-center transition-all shadow-sm">
                                                <FaTools className="text-sm" />
                                            </div>
                                            <span className="text-[8px] font-black uppercase tracking-tighter text-gray-300 group-hover/btn:text-blue-600">Dev</span>
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleStatusUpdate(request.id, 'ADDED')}
                                            title="Mark as Added"
                                            className="group/btn flex flex-col items-center gap-1 transition-all"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 group-hover/btn:bg-green-50 group-hover/btn:text-green-600 flex items-center justify-center transition-all shadow-sm">
                                                <FaCheck className="text-sm" />
                                            </div>
                                            <span className="text-[8px] font-black uppercase tracking-tighter text-gray-300 group-hover/btn:text-green-600">Added</span>
                                        </button>
                                        </>
                                    )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                    No document requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
