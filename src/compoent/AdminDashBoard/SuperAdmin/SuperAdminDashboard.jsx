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

const API_MSG = "https://townmanor.ai/api/ovika";

  export default function SuperAdminDashboard() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'properties', 'users', 'bookings', 'settings'
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalProps: 0, totalVal: 0, activeUsers: 0, totalBookings: 0, pendingBookings: 0, confirmedBookings: 0, cancelledBookings: 0, totalRevenue: 0, pendingRevenue: 0 });
  const [derivedUsers, setDerivedUsers] = useState([]); // Users aggregated from props
  const [editingProp, setEditingProp] = useState(null); // For edit modal
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingFilter, setBookingFilter] = useState("ALL");

  
  // Settings State
  const [settings, setSettings] = useState({
    siteName: "TownManor",
    maintenanceMode: false,
    serviceFee: 5,
    adminEmail: "admin@townmanor.ai"
  });

  // --- Fetch Data ---
  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchAllProperties(), fetchAllBookings()]);
    setLoading(false);
  };

  const fetchAllProperties = async () => {
    try {
      const res = await axios.get(`${API_MSG}/properties`, {
        validateStatus: false
      });
      // Normalize data: support { data: [...] } or direct array
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
        // Attempt to fetch bookings - fallback to mock if 404/error
        const res = await axios.get(`${API_MSG}/bookings`, { validateStatus: false });
        let data = [];
        if (res.status === 200 && Array.isArray(res.data)) {
            data = res.data;
        } else if (res.status === 200 && res.data.data && Array.isArray(res.data.data)) {
            data = res.data.data;
        } else {
            // No mock data - strict real data only
            data = [];
        }
        setBookings(data);
    } catch (e) {
        console.error("Fetch bookings failed", e);
        // Handle error gracefully, maybe show empty list
        setBookings([]); 
    }
  };

  useEffect(() => {
    if(properties.length > 0) calculateStats(properties, bookings);
  }, [properties, bookings]);

  const calculateStats = (propsData, bookingsData) => {
    const totalProps = propsData.length;
    // Mock valuation or price sum
    const totalVal = propsData.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
    // Mock user count from unique owner_ids
    const owners = new Set(propsData.map(p => p.owner_id).filter(Boolean));
    
    // Booking Stats
    const pending = bookingsData.filter(b => b.status === "Pending").length;
    const confirmed = bookingsData.filter(b => b.status === "Confirmed").length;
    const cancelled = bookingsData.filter(b => b.status === "Cancelled").length;
    
    // Revenue Stats
    const totalRevenue = bookingsData.filter(b => b.status === "Confirmed").reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const pendingRevenue = bookingsData.filter(b => b.status === "Pending").reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    
    setStats({
      totalProps,
      totalVal,
      activeUsers: owners.size,
      totalBookings: bookingsData.length,
      pendingBookings: pending,
      confirmedBookings: confirmed,
      cancelledBookings: cancelled,
      totalRevenue,
      pendingRevenue
    });

    // Aggregate Users
    const userMap = {};
    propsData.forEach(p => {
        const oid = p.owner_id || "Unclaimed";
        if (!userMap[oid]) {
            userMap[oid] = { 
                id: oid, 
                count: 0, 
                totalVal: 0 
            };
        }
        userMap[oid].count += 1;
        userMap[oid].totalVal += (Number(p.price) || 0);
    });
    setDerivedUsers(Object.values(userMap));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // --- Handlers ---
  const handleDelete = async (id) => {
    if (!window.confirm("SUPER ADMIN ACTION:\nAre you sure you want to PERMANENTLY delete this property? This cannot be undone.")) return;
    
    try {
      await axios.delete(`${API_MSG}/properties/${id}`);
      setProperties(prev => prev.filter(p => (p.id || p._id) !== id));
      alert("Property deleted successfully.");
    } catch(e) {
        // Log basic error first
        console.error("Delete failed:", e);
        
        let msg = "Delete failed.";
        
        if (e.response) {
            // Server responded with a status code outside 2xx range
            msg += ` Server Error: ${e.response.status}`;
            if (e.response.data && e.response.data.message) {
                msg += ` - ${e.response.data.message}`;
            } else {
                 // Try to stringify data if it's an object
                 msg += ` - ${JSON.stringify(e.response.data)}`;
            }
        } else if (e.request) {
            // Request was made but no response was received
            msg += " No response received from server. Check network or CORS.";
        } else {
            // Something happened in setting up the request
            msg += ` Request Error: ${e.message}`;
        }
    
        alert(msg);
    }
  };
  
  // --- Edit Handlers ---
  const handleEditClick = (prop) => {
      setEditingProp({ ...prop }); // Copy object to avoid direct mutation
  };

  const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditingProp(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveEdit = async () => {
    if(!editingProp) return;
    const id = editingProp.id || editingProp._id;
    try {
        const payload = {
            property_name: editingProp.property_name || editingProp.name,
            description: editingProp.description,
            price: editingProp.price,
            address: editingProp.address,
            city: editingProp.city,
             // Add other fields as necessary from your schema
        };
        
        await axios.put(`${API_MSG}/properties/${id}`, payload);
        alert("Property updated by Super Admin.");
        setEditingProp(null);
        fetchAllProperties(); // Refresh list
    } catch(e) {
        console.error(e);
        alert("Failed to update property: " + (e.response?.data?.message || e.message));
    }
  };

  const handleBookingAction = async (id, status) => {
    if (!window.confirm(`Are you sure you want to change status to ${status}?`)) return;
    try {
        await axios.put(`${API_MSG}/bookings/${id}`, { status });
        // Update local state
        setBookings(prev => prev.map(b => (b.id === id || b._id === id) ? { ...b, status } : b));
        // alert(`Booking ${status}`);
    } catch (e) {
        console.error(e);
        alert("Action failed: " + (e.response?.data?.message || e.message));
    }
  };

  const [filterType, setFilterType] = useState("ALL");

  // --- Filtering ---
  const filteredProperties = properties.filter(p => {
      // Type Filter
      let type = p.property_type || "N/A";
      if (!p.property_type && p.meta) {
          try {
             const meta = typeof p.meta === 'string' ? JSON.parse(p.meta) : p.meta;
             if (meta.propertyType) type = meta.propertyType;
             if (meta.type) type = meta.type; // PGListingForm sets type: 'PG'
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

  // --- Charts Data (Mock) ---
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
                    <span className="sa-nav-icon"><Icons.Properties /></span> All Properties
                </button>
                <button className={view === 'users' ? 'active' : ''} onClick={() => setView('users')}>
                    <span className="sa-nav-icon"><Icons.Users /></span> Users
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
            v2.1.0 Build 492
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
                        <h3>All Properties Database</h3>
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
                     <table className="sa-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Thumbnail</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Owner ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProperties.slice(0, 50).map(p => {
                                const img = (Array.isArray(p.photos) ? p.photos[0] : (p.photos ? p.photos.split(',')[0] : '')) || 'https://via.placeholder.com/60';
                                
                                // Parse Type
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
                                            <span className="sa-prop-meta">Added: {new Date(p.created_at || Date.now()).toLocaleDateString()}</span>
                                        </td>
                                        <td>
                                            <span className={`sa-badge-type ${type === 'PG' ? 'pg' : 'standard'}`}>
                                                {type}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: '500' }}>{p.city || p.address || "-"}</td>
                                        <td style={{ fontFamily: 'Inter', fontWeight: '600' }}>₹{Number(p.price).toLocaleString()}</td>
                                        <td>
                                            <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', border: '1px solid #e2e8f0' }}>
                                              {p.owner_name || p.owner_id || "Unclaimed"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="sa-actions">
                                                <button className="sa-btn-primary" onClick={() => handleEditClick(p)}>Edit</button>
                                                <button className="sa-btn-danger" onClick={() => handleDelete(p.id || p._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredProperties.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="sa-empty">No properties found matching criteria.</td>
                                </tr>
                            )}
                        </tbody>
                     </table>
                </div>
            )}
            
            {/* VIEW: USERS (Derived from Properties) */}
            {view === 'users' && (
                <div className="sa-table-container">
                    <div className="sa-table-header-row">
                        <h3>Active Owners (Verified by Listings)</h3>
                    </div>
                     <table className="sa-table">
                        <thead>
                            <tr>
                                <th>Owner ID</th>
                                <th>Properties Uploaded</th>
                                <th>Estimated Portfolio Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {derivedUsers.map(u => (
                                <tr key={u.id}>
                                    <td style={{ fontFamily: 'monospace', color: '#6b7280' }}>
                                        {u.id}
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: '700', fontSize: '15px' }}>{u.count}</span> Properties
                                    </td>
                                     <td>
                                        ₹{u.totalVal.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                             {derivedUsers.length === 0 && (
                                 <tr>
                                     <td colSpan="3" className="sa-empty">No active owners found from property data.</td>
                                 </tr>
                             )}
                        </tbody>
                     </table>
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
                        <div className="sa-stat-title" style={{ color: '#dc2626' }}>Cancelled</div>
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
                                <option value="Pending">Pending Review</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="sa-actions">
                            <button className="sa-btn-primary" onClick={fetchAllBookings} style={{background:'white', color:'#3b82f6', border:'1px solid #3b82f6'}}>Refresh Data</button>
                        </div>
                    </div>
                     <table className="sa-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Property</th>
                                <th>Guest</th>
                                <th>Check-In</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings
                                .filter(b => bookingFilter === 'ALL' || b.status === bookingFilter)
                                .map(b => (
                                <tr key={b.id || b._id}>
                                    <td style={{ fontFamily: 'monospace', color: '#6b7280' }}>{(b.id || b._id || '').slice(-6)}</td>
                                    <td style={{ fontWeight: '600' }}>{b.property_name}</td>
                                    <td>{b.user_name}</td>
                                    <td>{new Date(b.check_in).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`sa-badge-type`} style={{
                                            background: b.status === 'Confirmed' ? '#dcfce7' : b.status === 'Cancelled' ? '#fee2e2' : '#fef3c7',
                                            color: b.status === 'Confirmed' ? '#166534' : b.status === 'Cancelled' ? '#991b1b' : '#92400e'
                                        }}>
                                            {b.status}
                                        </span>
                                    </td>
                                    <td style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>₹{Number(b.amount).toLocaleString()}</td>
                                    <td>
                                        <div className="sa-actions">
                                            {b.status === 'Pending' && (
                                                <>
                                                 <button 
                                                    className="sa-btn-primary" 
                                                    style={{ background: '#10b981', padding: '6px 10px' }}
                                                    onClick={() => handleBookingAction(b.id || b._id, 'Confirmed')}
                                                    title="Confirm Booking"
                                                 >
                                                    ✓
                                                 </button>
                                                 <button 
                                                    className="sa-btn-danger" 
                                                    style={{ padding: '6px 10px' }}
                                                    onClick={() => handleBookingAction(b.id || b._id, 'Cancelled')}
                                                    title="Cancel Booking"
                                                 >
                                                    ✕
                                                 </button>
                                                </>
                                            )}
                                            {b.status !== 'Pending' && (
                                                <button className="sa-btn-primary" style={{padding:'6px 12px', fontSize:'12px', background: 'transparent', color: '#3b82f6', border: '1px solid #e2e8f0'}}>
                                                    Details
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                             {bookings.filter(b => bookingFilter === 'ALL' || b.status === bookingFilter).length === 0 && (
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

                <div className="sa-table-container">
                    <div className="sa-table-header-row">
                        <h3>Recent Transactions</h3>
                        <button className="sa-btn-primary" style={{background:'white', color:'#3b82f6', border:'1px solid #3b82f6'}}>Download Report</button>
                    </div>
                    <table className="sa-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Payer</th>
                                <th>Property</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b.id || b._id}>
                                    <td style={{ fontFamily: 'monospace', color: '#6b7280' }}>TX-{(b.id || b._id || '').slice(-6)}</td>
                                    <td>{new Date(b.check_in).toLocaleDateString()}</td>
                                    <td>
                                        <div style={{fontWeight:'500'}}>{b.user_name}</div>
                                        <div style={{fontSize:'11px', color:'#94a3b8'}}>Via Online Payment</div>
                                    </td>
                                    <td style={{fontSize:'13px'}}>{b.property_name}</td>
                                    <td>
                                         <span className={`sa-badge-type`} style={{
                                            background: b.status === 'Confirmed' ? '#dcfce7' : b.status === 'Cancelled' ? '#fee2e2' : '#fef3c7',
                                            color: b.status === 'Confirmed' ? '#166534' : b.status === 'Cancelled' ? '#991b1b' : '#92400e'
                                        }}>
                                            {b.status === 'Confirmed' ? 'Paid' : b.status === 'Cancelled' ? 'Refunded' : 'Pending'}
                                        </span>
                                    </td>
                                    <td style={{ fontFamily: 'Inter', fontWeight: 'bold', color: b.status==='Confirmed' ? '#059669' : 'inherit' }}>
                                        {b.status === 'Confirmed' ? '+' : ''}₹{Number(b.amount).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                             {bookings.length === 0 && (
                                 <tr>
                                     <td colSpan="6" className="sa-empty">No transaction data available.</td>
                                 </tr>
                             )}
                        </tbody>
                    </table>
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

            {/* EDIT MODAL */}
            {editingProp && (
                <div className="sa-modal-overlay">
                    <div className="sa-modal-content">
                        <h3 style={{ marginBottom: '20px' }}>Edit Property</h3>
                        
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
        </div>
      </div>
    </div>
  );
}
