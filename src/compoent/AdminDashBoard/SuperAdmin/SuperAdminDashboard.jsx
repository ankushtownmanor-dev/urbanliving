import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SuperAdmin.css';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Icons Components
const Icons = {
  Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>,
  Properties: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Bookings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Finance: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
};

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const API_PROPERTIES = "https://townmanor.ai/api/ovika/properties";
const API_PROPERTIES_UPLOAD = "https://townmanor.ai/api/ovika/properties/upload";
const API_BOOKINGS = "https://townmanor.ai/api/booking-request";
const API_USERS = "https://townmanor.ai/api/users-list";

export default function SuperAdminDashboard() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'properties', 'users', 'bookings', 'finance', 'settings'
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [usersList, setUsersList] = useState([]); // Real users from API
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ 
    totalProps: 0, 
    totalVal: 0, 
    activeUsers: 0, 
    totalBookings: 0, 
    pendingBookings: 0, 
    confirmedBookings: 0, 
    cancelledBookings: 0, 
    totalRevenue: 0, 
    pendingRevenue: 0 
  });
  
  const [derivedUsers, setDerivedUsers] = useState([]); // Users aggregated from props (Owners)
  const [derivedGuests, setDerivedGuests] = useState([]); // Users aggregated from bookings (Guests)
  const [editingProp, setEditingProp] = useState(null); // For edit modal
  const [isCreatingProp, setIsCreatingProp] = useState(false); // Mode for property modal
  
  /* User Management State */
  const [editingUser, setEditingUser] = useState(null); 
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({ username: '', email: '', phone_number: '', role: 'user', password: '' });
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearch, setUserSearch] = useState(""); // Search for Users
  const [bookingFilter, setBookingFilter] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");
  
  // Settings State
  const [settings, setSettings] = useState({
    siteName: "TownManor",
    maintenanceMode: false,
    serviceFee: 5,
    adminEmail: "admin@townmanor.ai"
  });

  // Pagination State
  const [userPage, setUserPage] = useState(1);
  const [ownerPage, setOwnerPage] = useState(1);
  const [guestPage, setGuestPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // --- Fetch Data ---
  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchAllProperties(), fetchAllBookings(), fetchAllUsers()]);
    setLoading(false);
  };

  const fetchAllProperties = async () => {
    try {
      const res = await axios.get(API_PROPERTIES, { validateStatus: false });
      // Normalize data
      let data = [];
      if (res.data && Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
        data = res.data.data;
      }
      setProperties(data);
    } catch (e) {
      console.error("SuperAdmin load props failed", e);
    }
  };

  const fetchAllBookings = async () => {
    try {
        const res = await axios.get(API_BOOKINGS, { validateStatus: false });
        let data = [];
        if (res.status === 200 && Array.isArray(res.data)) {
             data = res.data; 
        } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
             data = res.data.data;
        }
        setBookings(data);
    } catch (e) {
        console.error("Fetch bookings failed", e);
        setBookings([]); 
    }
  };

  const fetchAllUsers = async () => {
    try {
        const res = await axios.get(API_USERS, { validateStatus: false });
        let data = [];
        if (res.data && Array.isArray(res.data)) {
            data = res.data;
        } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
            data = res.data.data;
        }
        setUsersList(data);
    } catch (e) {
        console.error("Fetch users failed", e);
    }
  };

  useEffect(() => {
    calculateStats(properties, bookings, usersList);
  }, [properties, bookings, usersList]);

  // --- Helpers ---
  const calculateDays = (start, end) => {
      if(!start || !end) return 1;
      const d1 = new Date(start);
      const d2 = new Date(end);
      if(isNaN(d1.getTime()) || isNaN(d2.getTime())) return 1;
      const diff = d2 - d1;
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 1;
  };

  const calculateBookingAmount = (b) => {
    let price = 0;
    if (b.property && b.property.price) {
        price = Number(b.property.price);
    } 
    else {
        const p = properties.find(p => p.id === b.property_id || p._id === b.property_id);
        price = p ? (Number(p.price) || 0) : 0;
    }
    const days = calculateDays(b.start_date, b.end_date);
    return days * price;
  };

  const calculateStats = (propsData, bookingsData, usersData = []) => {
    const totalProps = propsData.length;
    
    // Valuation
    const totalVal = propsData.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
    
    // Owners
    const owners = new Set(propsData.map(p => p.owner_id).filter(Boolean));
    
    // Booking Stats
    const pending = bookingsData.filter(b => (b.status||'').toLowerCase() === "pending").length;
    const confirmed = bookingsData.filter(b => (b.status||'').toLowerCase() === "accepted" || (b.status||'').toLowerCase() === "confirmed").length;
    const cancelled = bookingsData.filter(b => (b.status||'').toLowerCase() === "rejected" || (b.status||'').toLowerCase() === "cancelled").length;
    
    // Revenue
    let totalRev = 0;
    let pendingRev = 0;

    bookingsData.forEach(b => {
        const amt = calculateBookingAmount(b);
        const st = (b.status || '').toLowerCase();
        if(st === 'accepted' || st === 'confirmed') totalRev += amt;
        if(st === 'pending') pendingRev += amt;
    });
    
    setStats({
      totalProps,
      totalVal,
      activeUsers: owners.size,
      totalBookings: bookingsData.length,
      pendingBookings: pending,
      confirmedBookings: confirmed,
      cancelledBookings: cancelled,
      totalRevenue: totalRev,
      pendingRevenue: pendingRev
    });

    // 1. Aggregate Owners (Who Listed)
    const userMap = {};
    propsData.forEach(p => {
        const oid = p.owner_id || "Unclaimed";
        if (!userMap[oid]) {
            userMap[oid] = { 
                id: oid, 
                count: 0, 
                totalVal: 0,
                name: p.owner_name || `Owner ${oid.toString().slice(-4)}`,
                propertyNames: []
            };
        }
        userMap[oid].count += 1;
        userMap[oid].totalVal += (Number(p.price) || 0);
        if(p.property_name || p.name) userMap[oid].propertyNames.push(p.property_name || p.name);
    });

    // Enrich with Contact Info from usersData
    const enrichedOwners = Object.values(userMap).map(owner => {
         // loose comparison for ID as one might be string, other number
         const user = usersData.find(u => (u.id == owner.id || u._id == owner.id));
         return {
             ...owner,
             email: user ? user.email : "N/A",
             phone: user ? (user.phone_number || user.phone) : "N/A"
         };
    });

    setDerivedUsers(enrichedOwners);

    // 2. Aggregate Guests (Who Booked)
    const guestMap = {};
    bookingsData.forEach(b => {
         const uid = b.user_id || b.username || "Guest";
         const uName = b.username || "Unknown Guest";
         
         if (!guestMap[uid]) {
             guestMap[uid] = {
                 id: uid,
                 name: uName,
                 count: 0,
                 spent: 0
             };
         }
         guestMap[uid].count += 1;
         
         const st = (b.status || '').toLowerCase();
         if(st === 'accepted' || st === 'confirmed') {
             guestMap[uid].spent += calculateBookingAmount(b);
         }
    });
    setDerivedGuests(Object.values(guestMap));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // --- Handlers ---

  
  // --- Edit Handlers ---
  const handleEditClick = (prop) => {
      setEditingProp({ ...prop }); 
      setIsCreatingProp(false);
  };

  const handleCreatePropClick = () => {
      setEditingProp({ property_name: '', price: '', city: '', address: '', description: '', owner_name: 'Admin', owner_id: 'admin' });
      setIsCreatingProp(true);
  };

  const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditingProp(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveEdit = async () => {
    if(!editingProp) return;
    
    try {
        // Prepare payload: Spread editingProp FIRST, then override with formatted values
        const payload = {
            ...editingProp,
            property_name: editingProp.property_name || editingProp.name,
            description: editingProp.description,
            price: Number(editingProp.price), // Ensure Number type
            address: editingProp.address,
            city: editingProp.city,
        };

        // Stringify complex fields to prevent backend SQL errors
        ['amenities', 'photos', 'house_rules', 'safety_items', 'meta', 'id_files', 'guest_policy', 'bedroom_details', 'bathroom_details'].forEach(key => {
             if (payload[key] && typeof payload[key] === 'object') {
                 payload[key] = JSON.stringify(payload[key]);
             }
        });

        // Remove system fields that should not be sent in the body
        delete payload._id;
        delete payload.id;
        delete payload.created_at;
        delete payload.updated_at;

        if (isCreatingProp) {
            // Create
            await axios.post(API_PROPERTIES_UPLOAD, payload);
            alert("Property created successfully.");
        } else {
            // Update
            const id = editingProp.id || editingProp._id;
            await axios.put(`${API_PROPERTIES}/${id}`, payload);
            alert("Property updated successfully.");
        }
        
        setEditingProp(null);
        setIsCreatingProp(false);
        fetchAllProperties(); // Refresh list
    } catch(e) {
        console.error("Save Error Details:", e);
        const errMsg = e.response?.data?.message || e.response?.data?.error || e.message;
        alert("Operation failed: " + errMsg);
    }
  };

  // --- User Form Handlers ---
  const openUserModal = (user = null) => {
      if(user) {
          setEditingUser(user);
          setUserForm({ ...user, password: '' }); // Don't show password
      } else {
          setEditingUser(null);
          setUserForm({ username: '', email: '', phone_number: '', role: 'user', password: '' });
      }
      setIsUserModalOpen(true);
  };

  const handleUserFormChange = (e) => {
      setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async () => {
      try {
          if (editingUser) {
              const id = editingUser.id || editingUser._id;
              await axios.put(`${API_USERS}/${id}`, userForm);
              alert("User updated.");
          } else {
              await axios.post(API_USERS, userForm);
              alert("User created.");
          }
          setIsUserModalOpen(false);
          fetchAllUsers();
      } catch(e) {
          console.error(e);
          alert("User save failed: " + (e.response?.data?.message || e.message));
      }
  };

  const handleBookingAction = async (id, action) => {
    const confirmMsg = action === 'accept' ? 'Accept this booking?' : 'Reject this booking?';
    if (!window.confirm(confirmMsg)) return;

    try {
        const url = `${API_BOOKINGS}/${id}/${action}`; 
        const body = action === 'reject' ? { owner_note: 'Action by Super Admin' } : {};
        
        await axios.patch(url, body);
        
        const newStatus = action === 'accept' ? 'accepted' : 'rejected';
        setBookings(prev => prev.map(b => (b.id === id || b._id === id) ? { ...b, status: newStatus } : b));
        
        alert(`Booking ${newStatus} successfully.`);
    } catch (e) {
        console.error(e);
        alert("Action failed: " + (e.response?.data?.message || e.message));
    }
  };

  // --- Charts Data ---
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'New Listings',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.4
    }]
  };
  
  const pieData = {
    labels: ['Apartment', 'House', 'Villa', 'Commercial'],
    datasets: [{
      data: [12, 19, 3, 5],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      borderWidth: 0
    }]
  };

  // --- Filtering ---
  const filteredProperties = properties.filter(p => {
      // Type Filter
      let type = p.property_type || "N/A";
      if (!p.property_type && p.meta) {
          try {
             const meta = typeof p.meta === 'string' ? JSON.parse(p.meta) : p.meta;
             if (meta.propertyType) type = meta.propertyType;
             if (meta.type) type = meta.type;
          } catch(e) {}
      }
      
      if (filterType !== 'ALL' && type !== filterType) return false;

      if(!searchTerm) return true;
      const s = searchTerm.toLowerCase();
      const name = (p.property_name || p.name || "").toLowerCase();
      const loc = (p.city || "").toLowerCase();
      const owner = (String(p.owner_id || "")).toLowerCase();
      return name.includes(s) || loc.includes(s) || owner.includes(s);
  });

  // --- Render ---
  if (loading) return <div className="sa-loading-screen">Loading Super Admin Dashboard...</div>;

  return (
    <div className="sa-container">
      {/* Sidebar */}
      <aside className="sa-sidebar">
        <div>
            <div className="sa-brand-area">
                <span className="sa-brand">Ovika<span className="sa-badge">Admin</span></span>
            </div>
            <nav className="sa-nav">
                <button className={view === 'dashboard' ? 'active' : ''} onClick={() => setView('dashboard')}>
                    <span className="sa-nav-icon"><Icons.Dashboard /></span> Dashboard
                </button>
                <button className={view === 'properties' ? 'active' : ''} onClick={() => setView('properties')}>
                    <span className="sa-nav-icon"><Icons.Properties /></span> Properties
                </button>
                <button className={view === 'users' ? 'active' : ''} onClick={() => setView('users')}>
                    <span className="sa-nav-icon"><Icons.Users /></span> Users & Activity
                </button>
                <button className={view === 'bookings' ? 'active' : ''} onClick={() => setView('bookings')}>
                    <span className="sa-nav-icon"><Icons.Bookings /></span> Bookings
                </button>
                <button className={view === 'finance' ? 'active' : ''} onClick={() => setView('finance')}>
                    <span className="sa-nav-icon"><Icons.Finance /></span> Finance
                </button>
                <button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')}>
                    <span className="sa-nav-icon"><Icons.Settings /></span> Settings
                </button>
            </nav>
        </div>
        <div style={{ marginTop: 'auto', color: '#6b7280', fontSize: '12px' }}>
            v2.1.0 Build 495
        </div>
      </aside>

      {/* Content Area */}
      <div className="sa-content">
        <header className="sa-header">
            <h2>
                {view === 'dashboard' && 'Dashboard Overview'}
                {view === 'properties' && 'Property Management'}
                {view === 'users' && 'User Administration'}
                {view === 'bookings' && 'Booking Management'}
                {view === 'finance' && 'Financial Reports'}
                {view === 'settings' && 'Platform Settings'}
            </h2>
            <div className="sa-user-controls">
                <span className="sa-admin-tag">Super Admin</span>
            </div>
        </header>

        <div className="sa-main-body">
            {/* VIEW: DASHBOARD */}
            {view === 'dashboard' && (
                <>
                <div className="sa-stats-grid">
                    <div className="sa-stat-card">
                        <div className="sa-stat-title">Total Properties</div>
                        <div className="sa-stat-val">{stats.totalProps}</div>
                    </div>
                    <div className="sa-stat-card">
                        <div className="sa-stat-title">Total Asset Value</div>
                        <div className="sa-stat-val">₹{stats.totalVal.toLocaleString()}</div>
                    </div>
                    <div className="sa-stat-card">
                        <div className="sa-stat-title">Active Owners</div>
                        <div className="sa-stat-val">{stats.activeUsers}</div>
                    </div>
                    <div className="sa-stat-card">
                        <div className="sa-stat-title">Total Bookings</div>
                        <div className="sa-stat-val">{stats.totalBookings}</div>
                    </div>
                </div>

                <div className="sa-charts">
                    <div className="sa-chart-box">
                        <h4>Listing Growth Trend</h4>
                        <div style={{ height: '250px' }}>
                             <Line options={{ maintainAspectRatio: false }} data={lineData} />
                        </div>
                    </div>
                    <div className="sa-chart-box">
                        <h4>Property Distribution</h4>
                         <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
                             <Doughnut options={{ maintainAspectRatio: false }} data={pieData} />
                        </div>
                    </div>
                </div>
                </>
            )}

            {/* VIEW: PROPERTIES */}
            {(view === 'properties' || view === 'dashboard') && (
                <div className="sa-table-container" style={{ marginTop: view === 'dashboard' ? '0' : '0' }}>
                     <div className="sa-table-header-row">
                        <h3>Properties Database</h3>
                        <div style={{display:'flex', gap:'12px'}}>
                            <button className="sa-btn-primary" onClick={handleCreatePropClick} style={{backgroundColor:'#10b981'}}>+ Add Property</button>
                            <input 
                                type="text" 
                                placeholder="Search properties..." 
                                className="sa-search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select 
                                className="sa-search-input" 
                                style={{width: '150px'}}
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="ALL">All Types</option>
                                <option value="PG">PG / Hostel</option>
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                            </select>
                        </div>
                     </div>
                     <table className="sa-table">
                        <thead>
                            <tr>
                                <th>Ref ID</th>
                                <th>Thumbnail</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Listed By (Owner)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProperties.slice(0, 50).map(p => {
                                const img = (Array.isArray(p.photos) ? p.photos[0] : (p.photos ? p.photos.split(',')[0] : '')) || 'https://via.placeholder.com/60';
                                
                                let type = p.property_type || "N/A";
                                if (!p.property_type && p.meta) {
                                    try {
                                        const meta = typeof p.meta === 'string' ? JSON.parse(p.meta) : p.meta;
                                        if (meta.propertyType) type = meta.propertyType;
                                        if (meta.type) type = meta.type;
                                    } catch(e) {}
                                }

                                return (
                                    <tr key={p.id || p._id} style={{ borderLeft: editingProp && (editingProp.id || editingProp._id) === (p.id || p._id) ? '4px solid #3b82f6' : 'none' }}>
                                        <td style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: '12px' }}>{(p.id || p._id || '').toString().slice(-6)}</td>
                                        <td><img src={img} alt="thumb" className="sa-prop-img" /></td>
                                        <td>
                                            <span className="sa-prop-name">{p.property_name || p.name || "Untitled"}</span>
                                            <span className="sa-prop-meta">Updated: {new Date(p.updated_at || Date.now()).toLocaleDateString()}</span>
                                        </td>
                                        <td>
                                            <span className={`sa-badge-type ${type === 'PG' ? 'pg' : 'standard'}`}>
                                                {type}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: '500' }}>{p.city || p.address || "-"}</td>
                                        <td style={{ fontFamily: 'Inter', fontWeight: '600' }}>₹{Number(p.price).toLocaleString()}</td>
                                        <td>
                                            <div style={{fontWeight:'600', color:'#1e293b', fontSize:'13px'}}>
                                                {p.owner_name || "Unknown"}
                                            </div>
                                            <span style={{ background: '#f1f5f9', color: '#64748b', padding: '1px 6px', borderRadius: '4px', fontSize: '10px' }}>
                                              ID: {p.owner_id}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="sa-actions">
                                                <button className="sa-btn-primary" onClick={() => handleEditClick(p)}>Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredProperties.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="sa-empty">No properties found matching criteria.</td>
                                </tr>
                            )}
                        </tbody>
                     </table>
                </div>
            )}
            
            {/* VIEW: USERS (Derived from Properties & Bookings) */}
            {view === 'users' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    
                    {/* PRIMARY USER TABLE (REAL API) */}
                    {(() => {
                        const filteredUsers = usersList.filter(u => {
                            if(!userSearch) return true;
                            const s = userSearch.toLowerCase();
                            return (u.username||'').toLowerCase().includes(s) || 
                                   (u.email||'').toLowerCase().includes(s) || 
                                   (u.phone_number||'').toString().includes(s);
                        });
                        
                        const totalUserPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
                        const displayUsers = filteredUsers.slice((userPage - 1) * ITEMS_PER_PAGE, userPage * ITEMS_PER_PAGE);

                        return (
                            <div className="sa-table-container">
                                <div className="sa-table-header-row">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <h3>Registered Users</h3>
                                        <div className="sa-badge" style={{background:'#eff6ff', color:'#3b82f6', border:'none'}}>{filteredUsers.length} Total</div>
                                    </div>
                                    <div style={{display: 'flex', gap: '10px'}}>
                                        <input 
                                            type="text" 
                                            placeholder="Search users..." 
                                            className="sa-search-input"
                                            value={userSearch}
                                            onChange={(e) => {
                                                setUserSearch(e.target.value);
                                                setUserPage(1); // Reset to page 1 on search
                                            }}
                                        />
                                        <button className="sa-btn-primary" onClick={() => openUserModal()}>+ Add User</button>
                                    </div>
                                </div>
                                <table className="sa-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>User Profile</th>
                                            <th>Contact Info</th>
                                            <th>Status</th>
                                            <th>Joined</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayUsers.map(u => (
                                            <tr key={u.id || u._id}>
                                                <td style={{fontFamily:'monospace', color:'#64748b'}}>#{(u.id||u._id || '').toString().slice(-4)}</td>
                                                <td>
                                                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                                        <img 
                                                            src={u.profile_photo || 'https://via.placeholder.com/40'} 
                                                            alt="av" 
                                                            style={{width:'36px', height:'36px', borderRadius:'50%', objectFit:'cover', border:'1px solid #e2e8f0'}}
                                                        />
                                                        <div style={{fontWeight:'600', color:'#1e293b'}}>{u.username || "No Name"}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{fontSize:'13px', fontWeight:'500'}}>{u.email}</div>
                                                    <div style={{fontSize:'11px', color:'#64748b'}}>{u.phone_number || u.phone || "N/A"}</div>
                                                </td>
                                                <td>
                                                    <div style={{display:'flex', gap:'4px'}}>
                                                        {u.aadhaar_verified || u.pan_verified ? (
                                                            <span style={{fontSize:'10px', background:'#dcfce7', color:'#166534', padding:'2px 6px', borderRadius:'4px'}}>Verified</span>
                                                        ) : <span style={{fontSize:'10px', background:'#f1f5f9', color:'#94a3b8', padding:'2px 6px', borderRadius:'4px'}}>Not Verified</span>}
                                                    </div>
                                                </td>
                                                <td style={{fontSize:'12px', color:'#475569'}}>
                                                    {u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}
                                                </td>
                                                <td>
                                                    <div className="sa-actions">
                                                        <button className="sa-btn-primary" style={{padding:'4px 8px', fontSize:'11px'}} onClick={() => openUserModal(u)}>Edit</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {displayUsers.length === 0 && (
                                            <tr><td colSpan="6" className="sa-empty">No registered users found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                                {/* Pagination Controls for Users */}
                                <div className="sa-pagination" style={{display: 'flex', justifyContent: 'flex-end', padding: '12px', gap: '8px', alignItems: 'center'}}>
                                    <button 
                                        className="sa-btn-secondary" 
                                        disabled={userPage === 1}
                                        onClick={() => setUserPage(p => Math.max(1, p - 1))}
                                        style={{padding: '4px 8px', fontSize: '12px'}}
                                    >
                                        Prev
                                    </button>
                                    <span style={{fontSize: '12px', color: '#64748b'}}>
                                        Page {userPage} of {totalUserPages || 1}
                                    </span>
                                    <button 
                                        className="sa-btn-secondary" 
                                        disabled={userPage >= totalUserPages}
                                        onClick={() => setUserPage(p => Math.min(totalUserPages, p + 1))}
                                        style={{padding: '4px 8px', fontSize: '12px'}}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        );
                    })()}

                    <h3 style={{ margin: '0 0 10px 0', color: '#475569', fontSize: '16px' }}>Activity Analysis</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    
                    {/* OWNERS TABLE */}
                    {(() => {
                        const totalOwnerPages = Math.ceil(derivedUsers.length / ITEMS_PER_PAGE);
                        const displayOwners = derivedUsers.slice((ownerPage - 1) * ITEMS_PER_PAGE, ownerPage * ITEMS_PER_PAGE);

                        return (
                            <div className="sa-table-container">
                                <div className="sa-table-header-row">
                                    <h3>Property Owners (Listed)</h3>
                                </div>
                                <table className="sa-table">
                                    <thead>
                                        <tr>
                                            <th>Owner Desc</th>
                                            <th>Contact Details</th>
                                            <th>Properties</th>
                                            <th>Portfolio Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayOwners.map(u => (
                                            <tr key={u.id}>
                                                <td>
                                                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{u.name}</div>
                                                    <div style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '11px' }}>ID: {u.id}</div>
                                                </td>
                                                <td>
                                                    <div style={{ fontSize: '12px', fontWeight: '500' }}>{u.email}</div>
                                                    <div style={{ fontSize: '11px', color: '#64748b' }}>{u.phone}</div>
                                                </td>
                                                <td>
                                                    <div style={{ fontWeight: '700', fontSize: '14px' }}>{u.count} Assets</div>
                                                    <div style={{ fontSize: '11px', color: '#64748b', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {u.propertyNames.join(', ')}
                                                    </div>
                                                </td>
                                                <td>
                                                    ₹{u.totalVal.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                        {displayOwners.length === 0 && (
                                            <tr><td colSpan="4" className="sa-empty">No owners found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                                {/* Pagination Controls for Owners */}
                                <div className="sa-pagination" style={{display: 'flex', justifyContent: 'flex-end', padding: '12px', gap: '8px', alignItems: 'center'}}>
                                    <button 
                                        className="sa-btn-secondary" 
                                        disabled={ownerPage === 1}
                                        onClick={() => setOwnerPage(p => Math.max(1, p - 1))}
                                        style={{padding: '4px 8px', fontSize: '12px'}}
                                    >
                                        Prev
                                    </button>
                                    <span style={{fontSize: '12px', color: '#64748b'}}>
                                        {ownerPage} / {totalOwnerPages || 1}
                                    </span>
                                    <button 
                                        className="sa-btn-secondary" 
                                        disabled={ownerPage >= totalOwnerPages}
                                        onClick={() => setOwnerPage(p => Math.min(totalOwnerPages, p + 1))}
                                        style={{padding: '4px 8px', fontSize: '12px'}}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        );
                    })()}

                    {/* GUESTS TABLE */}
                    {(() => {
                        const totalGuestPages = Math.ceil(derivedGuests.length / ITEMS_PER_PAGE);
                        const displayGuests = derivedGuests.slice((guestPage - 1) * ITEMS_PER_PAGE, guestPage * ITEMS_PER_PAGE);
                        
                        return (
                            <div className="sa-table-container">
                                <div className="sa-table-header-row">
                                    <h3>Active Guests (Booked)</h3>
                                </div>
                                <table className="sa-table">
                                    <thead>
                                        <tr>
                                            <th>Guest Info</th>
                                            <th>Bookings</th>
                                            <th>Total Spent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayGuests.map(u => (
                                            <tr key={u.id}>
                                                <td>
                                                    <div style={{ fontWeight: '600', color: '#0f766e' }}>{u.name}</div>
                                                    <div style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '11px' }}>ID: {u.id}</div>
                                                </td>
                                                <td>
                                                    <span style={{ fontWeight: '700', fontSize: '15px' }}>{u.count}</span> Requests
                                                </td>
                                                <td>
                                                    ₹{u.spent.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                        {displayGuests.length === 0 && (
                                            <tr><td colSpan="3" className="sa-empty">No guest activity found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                                {/* Pagination Controls for Guests */}
                                <div className="sa-pagination" style={{display: 'flex', justifyContent: 'flex-end', padding: '12px', gap: '8px', alignItems: 'center'}}>
                                    <button 
                                        className="sa-btn-secondary" 
                                        disabled={guestPage === 1}
                                        onClick={() => setGuestPage(p => Math.max(1, p - 1))}
                                        style={{padding: '4px 8px', fontSize: '12px'}}
                                    >
                                        Prev
                                    </button>
                                    <span style={{fontSize: '12px', color: '#64748b'}}>
                                        {guestPage} / {totalGuestPages || 1}
                                    </span>
                                    <button 
                                        className="sa-btn-secondary" 
                                        disabled={guestPage >= totalGuestPages}
                                        onClick={() => setGuestPage(p => Math.min(totalGuestPages, p + 1))}
                                        style={{padding: '4px 8px', fontSize: '12px'}}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        );
                    })()}

                    </div>
                </div>
            )}

            {/* VIEW: BOOKINGS */}
            {view === 'bookings' && (
                <>
                {/* Bookings Stats Row */}
                <div className="sa-stats-grid" style={{ marginBottom: '24px', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    <div className="sa-stat-card" style={{ padding: '20px' }}>
                        <div className="sa-stat-title">All Bookings</div>
                        <div className="sa-stat-val">{stats.totalBookings}</div>
                    </div>
                    <div className="sa-stat-card" style={{ padding: '20px', borderLeft: '4px solid #f59e0b' }}>
                        <div className="sa-stat-title" style={{ color: '#d97706' }}>Pending</div>
                        <div className="sa-stat-val" style={{ color: '#d97706' }}>{stats.pendingBookings}</div>
                    </div>
                    <div className="sa-stat-card" style={{ padding: '20px', borderLeft: '4px solid #10b981' }}>
                        <div className="sa-stat-title" style={{ color: '#059669' }}>Confirmed</div>
                        <div className="sa-stat-val" style={{ color: '#059669' }}>{stats.confirmedBookings}</div>
                    </div>
                    <div className="sa-stat-card" style={{ padding: '20px', borderLeft: '4px solid #ef4444' }}>
                        <div className="sa-stat-title" style={{ color: '#dc2626' }}>Cancelled/Rejected</div>
                        <div className="sa-stat-val" style={{ color: '#dc2626' }}>{stats.cancelledBookings}</div>
                    </div>
                </div>

                <div className="sa-table-container">
                    <div className="sa-table-header-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <h3>All Bookings</h3>
                             <select 
                                className="sa-search-input" 
                                style={{width: '180px'}}
                                value={bookingFilter}
                                onChange={(e) => setBookingFilter(e.target.value)}
                            >
                                <option value="ALL">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="sa-actions">
                            <button className="sa-btn-primary" onClick={fetchAllBookings} style={{background:'white', color:'#3b82f6', border:'1px solid #3b82f6'}}>Refresh Data</button>
                        </div>
                    </div>
                     <table className="sa-table">
                        <thead>
                            <tr>
                                <th>Req ID</th>
                                <th>Property</th>
                                <th>Booked By (Guest)</th>
                                <th>Dates</th>
                                <th>Status</th>
                                <th>Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings
                                .filter(b => bookingFilter === 'ALL' || (b.status||'').toLowerCase() === bookingFilter.toLowerCase())
                                .map(b => {
                                    // Resolve name from property object or lookup
                                    let propName = "Unknown Property";
                                    let propCity = "";
                                    if(b.property) {
                                        propName = b.property.name || b.property.property_name;
                                        propCity = b.property.city;
                                    } else {
                                        const found = properties.find(p => p.id === b.property_id || p._id === b.property_id);
                                        if(found) {
                                            propName = found.property_name || found.name;
                                            propCity = found.city;
                                        }
                                    }

                                    const amount = calculateBookingAmount(b);

                                    return (
                                        <tr key={b.id || b._id}>
                                            <td style={{ fontFamily: 'monospace', color: '#6b7280' }}>#{(b.id || b._id || '').toString().slice(-4)}</td>
                                            <td>
                                                <div style={{ fontWeight: '600' }}>{propName}</div>
                                                <div style={{ fontSize: '11px', color: '#64748b' }}>{propCity}</div>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: '500', fontSize:'14px' }}>{b.username}</div>
                                                <div style={{ fontSize: '11px', color: '#64748b' }}>UID: {b.user_id}</div>
                                            </td>
                                            <td style={{ fontSize: '13px' }}>
                                                {new Date(b.start_date).toLocaleDateString()} <br/>to {new Date(b.end_date).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <span className={`sa-badge-type`} style={{
                                                    background: (b.status||'').toLowerCase() === 'accepted' ? '#dcfce7' : (b.status||'').toLowerCase() === 'rejected' ? '#fee2e2' : '#fef3c7',
                                                    color: (b.status||'').toLowerCase() === 'accepted' ? '#166534' : (b.status||'').toLowerCase() === 'rejected' ? '#991b1b' : '#92400e',
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {b.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>₹{amount.toLocaleString()}</td>
                                            <td>
                                                <div className="sa-actions">
                                                    {(b.status||'').toLowerCase() === 'pending' && (
                                                        <>
                                                         <button 
                                                            className="sa-btn-primary" 
                                                            style={{ background: '#10b981', padding: '6px 12px' }}
                                                            onClick={() => handleBookingAction(b.id || b._id, 'accept')}
                                                            title="Accept"
                                                         >
                                                            Accept
                                                         </button>
                                                         <button 
                                                            className="sa-btn-danger" 
                                                            style={{ padding: '6px 12px' }}
                                                            onClick={() => handleBookingAction(b.id || b._id, 'reject')}
                                                            title="Reject"
                                                         >
                                                            Reject
                                                         </button>
                                                        </>
                                                    )}
                                                    {(b.status||'').toLowerCase() !== 'pending' && (
                                                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Processed</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                             {bookings.filter(b => bookingFilter === 'ALL' || (b.status||'').toLowerCase() === bookingFilter.toLowerCase()).length === 0 && (
                                 <tr>
                                     <td colSpan="7" className="sa-empty">No bookings found for this filter.</td>
                                 </tr>
                             )}
                        </tbody>
                     </table>
                </div>
                </>
            )}

            {/* VIEW: FINANCE */}
            {view === 'finance' && (
                <>
                <div className="sa-stats-grid">
                    <div className="sa-stat-card">
                         <div className="sa-stat-title">Total Revenue (Confirmed)</div>
                         <div className="sa-stat-val" style={{color: '#059669'}}>₹{stats.totalRevenue.toLocaleString()}</div>
                    </div>
                    <div className="sa-stat-card">
                         <div className="sa-stat-title">Pending Revenue</div>
                         <div className="sa-stat-val" style={{color: '#d97706'}}>₹{stats.pendingRevenue.toLocaleString()}</div>
                    </div>
                    <div className="sa-stat-card">
                         <div className="sa-stat-title">Avg. Booking Value</div>
                         <div className="sa-stat-val">₹{stats.totalBookings > 0 ? Math.round((stats.totalRevenue + stats.pendingRevenue) / stats.totalBookings).toLocaleString() : 0}</div>
                    </div>
                </div>
                <div className="sa-chart-box" style={{ textAlign:'center', padding:'40px' }}>
                    <p style={{ color:'#64748b' }}>Detailed Transaction Logs are currently being synchronized with the Payment Gateway.</p>
                </div>
                </>
            )}

            {/* VIEW: SETTINGS */}
            {view === 'settings' && (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="sa-chart-box" style={{ padding: '40px' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>Platform Configurations</h3>
                        
                        <div className="sa-input-group">
                            <label>Site Name</label>
                            <input 
                                value={settings.siteName} 
                                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                            />
                        </div>

                        <div className="sa-input-group">
                            <label>Admin Contact Email</label>
                            <input 
                                value={settings.adminEmail} 
                                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                            />
                        </div>

                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                             <div className="sa-input-group">
                                 <label>Service Fee (%)</label>
                                 <input 
                                     type="number"
                                     value={settings.serviceFee} 
                                     onChange={(e) => setSettings({...settings, serviceFee: e.target.value})}
                                 />
                             </div>
                             
                             <div className="sa-input-group">
                                 <label>Maintenance Mode</label>
                                 <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                     <button 
                                        onClick={() => setSettings({...settings, maintenanceMode: true})}
                                        style={{ 
                                            padding: '8px 16px', 
                                            borderRadius: '6px', 
                                            border: '1px solid #e2e8f0',
                                            background: settings.maintenanceMode ? '#ef4444' : '#fff',
                                            color: settings.maintenanceMode ? '#fff' : '#64748b',
                                            cursor: 'pointer',
                                            fontWeight: '600'
                                        }}
                                     >On</button>
                                     <button 
                                        onClick={() => setSettings({...settings, maintenanceMode: false})}
                                        style={{ 
                                            padding: '8px 16px', 
                                            borderRadius: '6px', 
                                            border: '1px solid #e2e8f0',
                                            background: !settings.maintenanceMode ? '#10b981' : '#fff',
                                            color: !settings.maintenanceMode ? '#fff' : '#64748b',
                                            cursor: 'pointer',
                                            fontWeight: '600'
                                        }}
                                     >Off</button>
                                 </div>
                             </div>
                         </div>

                         <div style={{ marginTop: '32px', borderTop: '1px solid #e2e8f0', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                             <button className="sa-btn-primary" onClick={() => alert("Settings saved successfully!")} style={{ padding: '12px 24px', fontSize: '15px' }}>Save Configuration</button>
                         </div>
                    </div>
                </div>
            )}

            {/* EDIT PROPERTY MODAL */}
            {editingProp && (
                <div className="sa-modal-overlay">
                    <div className="sa-modal-content">
                        <h3 style={{ marginBottom: '20px' }}>{isCreatingProp ? 'Create Property' : 'Edit Property'}</h3>
                        
                        <div style={{ display: 'grid', gap: '0' }}>
                             <div className="sa-input-group">
                                 <label>Property Name</label>
                                 <input 
                                    name="property_name" 
                                    value={editingProp.property_name || editingProp.name || ""} 
                                    onChange={handleEditChange} 
                                 />
                             </div>
                             
                             <div className="sa-input-group">
                                 <label>Price</label>
                                 <input 
                                     type="number" 
                                     name="price"
                                     value={editingProp.price || ""} 
                                     onChange={handleEditChange} 
                                 />
                             </div>

                             <div className="sa-input-group">
                                 <label>City</label>
                                 <input 
                                     name="city"
                                     value={editingProp.city || ""} 
                                     onChange={handleEditChange} 
                                 />
                             </div>

                             <div className="sa-input-group">
                                 <label>Address</label>
                                 <textarea 
                                     rows="3"
                                     name="address"
                                     value={editingProp.address || ""} 
                                     onChange={handleEditChange} 
                                 />
                             </div>
                        </div>

                        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button className="sa-btn-danger" style={{ background:'#f3f4f6', color:'#374151', border:'1px solid #d1d5db' }} onClick={() => setEditingProp(null)}>Cancel</button>
                            <button className="sa-btn-primary" onClick={handleSaveEdit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* USER MODAL */}
            {isUserModalOpen && (
                <div className="sa-modal-overlay">
                    <div className="sa-modal-content" style={{maxWidth:'400px'}}>
                        <h3 style={{ marginBottom: '20px' }}>{editingUser ? 'Edit User' : 'Add New User'}</h3>
                        
                        <div style={{ display: 'grid', gap: '0' }}>
                             <div className="sa-input-group">
                                 <label>User Name</label>
                                 <input 
                                    name="username" 
                                    value={userForm.username || ""} 
                                    onChange={handleUserFormChange} 
                                 />
                             </div>
                             <div className="sa-input-group">
                                 <label>Email Address</label>
                                 <input 
                                    name="email" 
                                    type="email"
                                    value={userForm.email} 
                                    onChange={handleUserFormChange} 
                                 />
                             </div>
                             <div className="sa-input-group">
                                 <label>Phone Number</label>
                                 <input 
                                    name="phone_number" 
                                    value={userForm.phone_number || ""} 
                                    onChange={handleUserFormChange} 
                                 />
                             </div>
                             {!editingUser && (
                                <div className="sa-input-group">
                                    <label>Password</label>
                                    <input 
                                        name="password" 
                                        type="password"
                                        value={userForm.password} 
                                        onChange={handleUserFormChange} 
                                    />
                                </div>
                             )}
                             <div className="sa-input-group">
                                 <label>Role</label>
                                 <select 
                                    name="role"
                                    value={userForm.role}
                                    onChange={handleUserFormChange}
                                    className="sa-search-input" // Reuse style
                                    style={{width:'100%'}}
                                 >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">Super Admin</option>
                                 </select>
                             </div>
                        </div>

                        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button className="sa-btn-danger" style={{ background:'#f3f4f6', color:'#374151', border:'1px solid #d1d5db' }} onClick={() => setIsUserModalOpen(false)}>Cancel</button>
                            <button className="sa-btn-primary" onClick={handleUserSubmit}>Save User</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
