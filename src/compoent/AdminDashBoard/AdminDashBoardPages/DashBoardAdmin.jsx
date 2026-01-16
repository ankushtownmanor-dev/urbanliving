// src/pages/dashboard/DashBoardAdmin.jsx
import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { AuthContext } from "../../Login/AuthContext";

function KeyItem({ text, filetype = "pdf" }) {
  const isXlsx = filetype === "xlsx";
  return (
    <div className={styles.keyItem}>
      <span className={`${styles.keyDot} ${isXlsx ? styles.xlsx : styles.pdf}`} />
      <span className={styles.keyText}>{text}</span>
      <div className={styles.keyActions}>
        <button title="View" className={styles.iconBtn} aria-label="view"><i className="fa-regular fa-eye" /></button>
        <button title="Download" className={styles.iconBtn} aria-label="download"><i className="fa-solid fa-download" /></button>
      </div>
    </div>
  );
}

function MessageItem({ initials, name, note }) {
  return (
    <div className={styles.msgItem}>
      <div className={styles.avatar}>{initials}</div>
      <div>
        <div className={styles.msgName}>{name}</div>
        <div className={styles.msgNote}>{note}</div>
      </div>
    </div>
  );
}

function TicketRow({ title, status }) {
  const statusClass = status.toLowerCase() === "resolved" ? styles.resolved : styles.open;
  return (
    <div className={styles.ticketRow}>
      <span className={styles.ticketTitle}>{title}</span>
      <span className={`${styles.chip} ${statusClass}`}>{status}</span>
    </div>
  );
}

// Edit Modal Component
function EditPropertyModal({ property, onClose, onRefresh }) {
  const [loading, setLoading] = useState(false);
  
  // Helper to safely get meta fields
  const getMeta = (key, fallback = "") => {
    if (!property) return fallback;
    if (property[key] !== undefined && property[key] !== null) return property[key];
    let m = property.meta;
    if (typeof m === 'string') {
        try { m = JSON.parse(m); } catch(e) { m = {}; }
    }
    return m?.[key] ?? fallback;
  };

  // Helper to parse JSON fields
  const parseJson = (val, fallback = []) => {
    if (!val) return fallback;
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try { return JSON.parse(val) || fallback; } catch (e) { return fallback; }
    }
    return fallback;
  };

  // Safe Photos Parser (returns array of strings)
  const getInitialPhotos = () => {
      let p = property.photos;
      // If it's a string looking like an array ["url"]
      if (typeof p === 'string') {
         p = p.trim();
         if (p.startsWith('[') && p.endsWith(']')) {
             try { return JSON.parse(p); } catch(e) {}
         }
         return p.split(',').map(s=>s.trim()).filter(Boolean); 
      }
      if (Array.isArray(p)) return p;
      return [];
  };

  const [photoList, setPhotoList] = useState(getInitialPhotos());
  const [newFiles, setNewFiles] = useState([]);

  const [formData, setFormData] = useState({
    property_name: property.property_name || property.name || "",
    description: property.description || "",
    price: property.price || "",
    weekendRate: getMeta('weekendRate'),
    cleaningFee: getMeta('cleaningFee'),
    weeklyDiscountPct: getMeta('weeklyDiscountPct'),
    maxGuests: getMeta('maxGuests', 1),
    area: property.area || getMeta('area') || "",
    checkInTime: property.check_in_time || getMeta('checkInTime') || "",
    checkOutTime: property.check_out_time || getMeta('checkOutTime') || "",
    beds: property.beds || getMeta('beds') || "",
    
    // Address fields
    address: property.address || "",
    city: property.city || "",

    // Complex arrays - init from property if available
    bedrooms: parseJson(property.bedrooms || getMeta('bedrooms'), [{ type: "King Bed", count: 1 }]),
    bathrooms: parseJson(property.bathrooms || getMeta('bathrooms'), [{ type: "Attached", count: 1 }]),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Photo handlers
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const images = files.filter(f => f.type.startsWith('image/'));
      setNewFiles(prev => [...prev, ...images]);
    }
  };

  const removePhoto = (index) => {
    setPhotoList(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeNewFile = (index) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // 1. Upload any new files
      let uploadedUrls = [];
      if (newFiles.length > 0) {
         const uploadPromises = newFiles.map(async (file) => {
            const fd = new FormData();
            fd.append('images', file);
            // Using the endpoint described in PropertyDetailPage
            const res = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
               method: 'POST',
               body: fd,
            });
            const data = await res.json();
            return (data.fileUrls && data.fileUrls[0]) ? data.fileUrls[0] : null;
         });
         const results = await Promise.all(uploadPromises);
         uploadedUrls = results.filter(Boolean);
      }

      const finalAllPhotos = [...photoList, ...uploadedUrls];

      const payload = {};
      if (formData.property_name) payload.property_name = formData.property_name;
      if (formData.description) payload.description = formData.description;
      if (formData.price) payload.price = formData.price;
      if (formData.address) payload.address = formData.address;
      if (formData.city) payload.city = formData.city;
      
      // Send complex objects (arrays) as JSON strings
      payload.bedrooms = JSON.stringify(formData.bedrooms || []); 
      payload.bathrooms = JSON.stringify(formData.bathrooms || []);
      
      // Update photos
      payload.photos = JSON.stringify(finalAllPhotos);

      // Core fields
      if (Number(formData.weekendRate)) payload.weekend_rate = formData.weekendRate;
      if (Number(formData.cleaningFee)) payload.cleaning_fee = formData.cleaningFee;
      if (Number(formData.weeklyDiscountPct)) payload.weekly_discount_pct = formData.weeklyDiscountPct;
      if (Number(formData.maxGuests)) payload.max_guests = formData.maxGuests;
      if (formData.area) payload.area = formData.area;
      if (formData.checkInTime) payload.check_in_time = formData.checkInTime;
      if (formData.checkOutTime) payload.check_out_time = formData.checkOutTime;
      if (formData.beds) payload.beds = formData.beds;

      const id = property.id || property._id;
      console.log("Updating property with photos:", id, payload);

      await axios.put(`https://townmanor.ai/api/ovika/properties/${id}`, payload, {
          headers: { 'Content-Type': 'application/json' }
      });
      
      alert("Property updated successfully!");
      onRefresh(); 
      onClose();
    } catch (e) {
      console.error("Update Error:", e);
      const serverMsg = e.response?.data?.error || e.response?.data?.message || e.message;
      alert("Failed to update: " + serverMsg);
    } finally {
      setLoading(false);
    }
  };

  const modalOverlayStyle = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
  };
  const modalContentStyle = {
    background: '#fff', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '600px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto'
  };
  const inputStyle = {
    width: '100%', padding: '10px', margin: '4px 0 12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px'
  };
  const labelStyle = { fontSize: '13px', fontWeight: '600', color: '#555' };
  const btnGroupStyle = { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' };
  const btnStyle = { padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '500' };
  const dynamicRowStyle = { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' };

  // Styles for photos
  const photoGrid = { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px', marginTop: '5px' };
  const photoFrame = { position: 'relative', width: '70px', height: '70px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #eee' };
  const photoImg = { width: '100%', height: '100%', objectFit: 'cover' };
  const deleteBtn = { position: 'absolute', top: '2px', right: '2px', background: 'rgba(255,0,0,0.8)', color:'white', border:'none', borderRadius:'50%', width:'18px', height:'18px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px' };

  // Simple handlers for dynamic lists
  const handleAddList = (field) => {
      setFormData(prev => ({ ...prev, [field]: [...(prev[field]||[]), { type: "", count: 1 }] }));
  };
  const handleRemoveList = (field, idx) => {
      setFormData(prev => ({ ...prev, [field]: (prev[field]||[]).filter((_, i) => i !== idx) }));
  };
  const handleListChange = (field, idx, key, val) => {
      setFormData(prev => {
          const list = [...(prev[field]||[])];
          list[idx] = { ...list[idx], [key]: val };
          return { ...prev, [field]: list };
      });
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '20px' }}>Update Property</h3>
        
        {/* 1. Property Name */}
        <div>
          <label style={labelStyle}>Property Name</label>
          <input name="property_name" value={formData.property_name} onChange={handleChange} style={inputStyle} />
        </div>

        {/* 2. Description (TextArea) */}
        <div>
           <label style={labelStyle}>Description ({formData.description.length} chars)</label>
           <textarea name="description" value={formData.description} onChange={handleChange} rows={3} style={{ ...inputStyle, fontFamily: 'inherit' }} />
        </div>
        
        {/* PHOTOS SECTION */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Photos (Existing &amp; New)</label>
          <div style={photoGrid}>
             {photoList.map((url, i) => (
               <div key={`exist-${i}`} style={photoFrame} title="Existing Photo">
                 <img src={url} alt="prop" style={photoImg} onError={e=>e.target.src='https://via.placeholder.com/70?text=Err'} />
                 <button onClick={() => removePhoto(i)} style={deleteBtn}>&times;</button>
               </div>
             ))}
             {newFiles.map((file, i) => (
               <div key={`new-${i}`} style={photoFrame} title="New Upload">
                 <img src={URL.createObjectURL(file)} alt="new" style={photoImg} />
                 <button onClick={() => removeNewFile(i)} style={deleteBtn}>&times;</button>
               </div>
             ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <label htmlFor="modal-file-upload" style={{ ...btnStyle, padding: '8px 16px', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', display: 'inline-block', fontSize: '13px' }}>
                <i className="fa-solid fa-cloud-arrow-up" style={{ marginRight: '6px' }} />
                Select Photos
             </label>
             <input id="modal-file-upload" type="file" multiple accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
             <span style={{ fontSize: '12px', color: '#666' }}>{newFiles.length} new selected</span>
          </div>
        </div>

        {/* 2.5. Address & City & Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
             <div>
                <label style={labelStyle}>Address</label>
                <input name="address" value={formData.address} onChange={handleChange} style={inputStyle} />
             </div>
             <div>
                <label style={labelStyle}>City</label>
                <input name="city" value={formData.city} onChange={handleChange} style={inputStyle} />
             </div>
             <div>
                <label style={labelStyle}>Area (sq ft)</label>
                <input name="area" type="number" value={formData.area} onChange={handleChange} style={inputStyle} />
             </div>
        </div>

        {/* Bedroom Configuration */}
        <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Bedroom Configuration</label>
            <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', background: '#fafafa' }}>
                {(formData.bedrooms || []).map((bed, idx) => (
                    <div key={idx} style={dynamicRowStyle}>
                         <select
                            value={bed.type || ""} 
                            onChange={(e) => handleListChange('bedrooms', idx, 'type', e.target.value)}
                            style={{ ...inputStyle, margin: 0, flex: 2 }} 
                         >
                            <option value="">Select Bed Type</option>
                            {["King Bed", "Queen Bed", "Double Bed", "Single Bed", "Bunk Bed", "Sofa Bed"].map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                         </select>
                         <input 
                            type="number" 
                            min="1"
                            placeholder="Count" 
                            value={bed.count || 1} 
                            onChange={(e) => handleListChange('bedrooms', idx, 'count', Number(e.target.value))}
                            style={{ ...inputStyle, margin: 0, flex: 1 }} 
                         />
                         <button onClick={() => handleRemoveList('bedrooms', idx)} style={{ color: '#ef4444', border: '1px solid #ef4444', background: '#fff', borderRadius: '4px', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fa-solid fa-times" />
                         </button>
                    </div>
                ))}
                <button 
                  onClick={() => handleAddList('bedrooms')} 
                  style={{ ...btnStyle, background: '#fff', border: '1px dashed #999', color: '#555', fontSize: '13px', padding: '8px 16px', width: '100%' }}
                >
                  + Add Bedroom Type
                </button>
            </div>
             
             {/* Total Beds */}
             <div style={{ marginTop: '12px' }}>
                <label style={labelStyle}>Total Beds *</label>
                <input name="beds" type="number" min="1" value={formData.beds} onChange={handleChange} style={inputStyle} />
             </div>
        </div>

        {/* Bathroom Configuration */}
        <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Bathroom Configuration</label>
             <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', background: '#fafafa' }}>
                {(formData.bathrooms || []).map((bath, idx) => (
                    <div key={idx} style={dynamicRowStyle}>
                         <select 
                            value={bath.type || ""} 
                            onChange={(e) => handleListChange('bathrooms', idx, 'type', e.target.value)}
                            style={{ ...inputStyle, margin: 0, flex: 2 }} 
                         >
                            <option value="">Select Bath Type</option>
                            <option value="Attached">Attached</option>
                            <option value="Common">Common</option>
                            <option value="En-suite">En-suite</option>
                            <option value="Jack & Jill">Jack & Jill</option>
                            <option value="Separate">Separate</option>
                            <option value="Other">Other</option>
                         </select>
                         <input 
                            type="number" 
                            min="1"
                            placeholder="Count" 
                            value={bath.count || 1} 
                            onChange={(e) => handleListChange('bathrooms', idx, 'count', Number(e.target.value))}
                            style={{ ...inputStyle, margin: 0, flex: 1 }} 
                         />
                         <button onClick={() => handleRemoveList('bathrooms', idx)} style={{ color: '#ef4444', border: '1px solid #ef4444', background: '#fff', borderRadius: '4px', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fa-solid fa-times" />
                         </button>
                    </div>
                ))}
                <button 
                  onClick={() => handleAddList('bathrooms')} 
                  style={{ ...btnStyle, background: '#fff', border: '1px dashed #999', color: '#555', fontSize: '13px', padding: '8px 16px', width: '100%' }}
                >
                  + Add Bathroom Type
                </button>
            </div>
        </div>

        {/* 3. Price */}
        <div>
           <label style={labelStyle}>Price (₹ / night)</label>
           <input name="price" type="number" value={formData.price} onChange={handleChange} style={inputStyle} />
        </div>

        {/* 4. Weekly Price & Check-in/out */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
           <div>
              <label style={labelStyle}>Weekend Rate</label>
              <input name="weekendRate" type="number" value={formData.weekendRate} onChange={handleChange} style={inputStyle} placeholder="Optional" />
           </div>
           <div>
              <label style={labelStyle}>Check-in Time</label>
              <input name="checkInTime" value={formData.checkInTime} onChange={handleChange} style={inputStyle} placeholder="e.g. 03:00 PM" />
           </div>
           <div>
              <label style={labelStyle}>Check-out Time</label>
              <input name="checkOutTime" value={formData.checkOutTime} onChange={handleChange} style={inputStyle} placeholder="e.g. 11:00 AM" />
           </div>
        </div>

        {/* 5. Cleaning Cost */}
        <div>
           <label style={labelStyle}>Cleaning Cost</label>
           <input name="cleaningFee" type="number" value={formData.cleaningFee} onChange={handleChange} style={inputStyle} />
        </div>

        {/* 6. Discount Weekly */}
        <div>
           <label style={labelStyle}>Weekly Discount (%)</label>
           <input name="weeklyDiscountPct" type="number" value={formData.weeklyDiscountPct} onChange={handleChange} style={inputStyle} />
        </div>

        {/* 7. Maximum Guests */}
        <div>
           <label style={labelStyle}>Maximum Guests</label>
           <input name="maxGuests" type="number" value={formData.maxGuests} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={btnGroupStyle}>
          <button onClick={onClose} style={{ ...btnStyle, background: '#f5f5f5', color: '#333' }}>Cancel</button>
          <button onClick={handleSave} disabled={loading} style={{ ...btnStyle, background: '#c98b3e', color: '#fff' }}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ photoUrl, name, location, priceText, details, onEdit, onDelete, onView }) {
  return (
    <div className={styles.propertyCard}>
      <img 
        src={photoUrl} 
        alt={name} 
        className={styles.propertyImage} 
        onClick={onView}
        style={{ cursor: "pointer" }}
      />
      <div className={styles.propertyMeta}>
        <div className={styles.propertyTitle}>{name}</div>
        <div className={styles.propertySubtitle}>{location}</div>
        {details && <div className={styles.propertyDetails}>{details}</div>}
        {priceText && <div className={styles.propertyPrice}>{priceText}</div>}
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
          <button 
             onClick={onEdit} 
             style={{
               border: '1px solid #ddd', background: '#fff', padding: '6px 12px', borderRadius: '6px',
               cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
             }}
          >
            <i className="fa-solid fa-pen" /> Update
          </button>
          <button 
             onClick={onDelete} 
             style={{
               border: '1px solid #fdd', background: '#fff5f5', color: '#d32f2f', padding: '6px 12px', 
               borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
             }}
          >
            <i className="fa-solid fa-trash" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// robust id extractor
const extractIdFromObj = (obj) => {
  if (!obj || typeof obj !== "object") return null;
  if (obj.owner_id) return obj.owner_id;
  if (obj.ownerId) return obj.ownerId;
  if (obj.id) return obj.id;
  if (obj._id) return obj._id;
  if (obj.userId) return obj.userId;
  if (obj.uid) return obj.uid;
  if (obj.user && typeof obj.user === "object") return extractIdFromObj(obj.user);
  if (obj.data && typeof obj.data === "object") return extractIdFromObj(obj.data);
  return null;
};

const getPropertyPhoto = (prop) => {
  if (!prop) return "/public/image 68.png";
  if (Array.isArray(prop.photos) && prop.photos.length > 0) {
    if (typeof prop.cover_photo_index === "number" && prop.photos[prop.cover_photo_index]) {
      return prop.photos[prop.cover_photo_index];
    }
    return prop.photos[0];
  }
  if (typeof prop.photos === "string" && prop.photos.trim()) {
    const parts = prop.photos.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length) return parts[0];
  }
  return "/public/image 68.png";
};

const getRoomCount = (val) => {
  if (val === undefined || val === null) return 0;
  if (typeof val === 'number') return val;
  
  // Try parsing if string
  let parsed = val;
  if (typeof val === 'string') {
    // If it's a simple number-like string, just return that
    if (!isNaN(val) && !val.trim().startsWith('[')) {
      return Number(val);
    }
    try {
      parsed = JSON.parse(val);
    } catch (e) {
      // If parsing fails but it's not a simple number, fallback to 0 or 1?
      // Maybe check for "1" vs "1 bedroom"
      return parseFloat(val) || 0;
    }
  }

  // If we have a number now
  if (typeof parsed === 'number') return parsed;

  // If array (from JSON parse or original)
  if (Array.isArray(parsed)) {
    return parsed.reduce((acc, item) => {
      // If item has count, use it. Default to 1 if item exists but no count?
      // The schema usually has count.
      const c = Number(item.count);
      return acc + (isNaN(c) ? 1 : c);
    }, 0);
  }
  
  return 0;
};

export default function DashBoardAdmin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ONLY use the canonical key "user" to avoid reading stale legacy keys
  const STORAGE_KEY = "user";

  const [ownerId, setOwnerId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null); // State for modal

  // Resolve owner id primarily from context, fallback to localStorage 'user' only.
  const resolveOwnerIdFromSources = useCallback(() => {
    const idFromContext = extractIdFromObj(user);
    if (idFromContext) return String(idFromContext);

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const id = extractIdFromObj(parsed);
      if (id) return String(id);
    } catch (e) {
      // ignore parse errors
    }
    return null;
  }, [user]);

  // fetch properties and filter by ownerId
  const fetchFilteredProperties = useCallback(async (resolvedOwnerId) => {
    // If we don't have an owner id, do not fetch — show no properties for new users
    if (!resolvedOwnerId) {
      setProperties([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("https://townmanor.ai/api/ovika/properties", { timeout: 10000 });
      let all = [];

      if (!res || !res.data) {
        all = [];
      } else if (Array.isArray(res.data)) {
        all = res.data;
      } else if (Array.isArray(res.data.data)) {
        all = res.data.data;
      } else if (Array.isArray(res.data.results)) {
        all = res.data.results;
      } else {
        // attempt to pick first array value in response object
        const arr = Object.values(res.data).find((v) => Array.isArray(v));
        if (arr) all = arr;
      }

      // filter strictly by owner id fields
      const filtered = all.filter((p) => {
        if (!p || typeof p !== "object") return false;
        const candidates = [
          p.owner_id,
          p.ownerId,
          p.user_id,
          p.userId,
          (p.meta && (p.meta.ownerId || p.meta.owner_id)),
          p.owner,
        ].filter(Boolean);
        return candidates.some((c) => String(c) === String(resolvedOwnerId));
      });

      setProperties(filtered);
    } catch (err) {
      console.error("DashBoardAdmin: Failed to load properties:", err);
      setError("Failed to load properties (see console).");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // initial resolution: quick attempt, then short polling for immediate post-signup flows
  useEffect(() => {
    let mounted = true;
    let pollHandle = null;
    let attempts = 0;
    const maxAttempts = 6; // 6 * 400ms ~ 2.4s

    const tryResolveNow = () => {
      const id = resolveOwnerIdFromSources();
      if (!mounted) return;
      if (id) {
        setOwnerId(id);
        fetchFilteredProperties(id);
        return;
      }
      // start short polling (useful when signup redirects and context/localStorage are still settling)
      pollHandle = setInterval(() => {
        attempts += 1;
        const id2 = resolveOwnerIdFromSources();
        if (id2) {
          clearInterval(pollHandle);
          if (!mounted) return;
          setOwnerId(id2);
          fetchFilteredProperties(id2);
          return;
        }
        if (attempts >= maxAttempts) {
          clearInterval(pollHandle);
          if (!mounted) return;
          setOwnerId(null);
          setProperties([]);
          setLoading(false);
        }
      }, 400);
    };

    tryResolveNow();

    return () => {
      mounted = false;
      if (pollHandle) clearInterval(pollHandle);
    };
  }, [resolveOwnerIdFromSources, fetchFilteredProperties]);

  // Listen for localStorage changes for the canonical 'user' key (other tabs)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;

      // If user removed (logout), clear ownerId and properties
      if (!e.newValue) {
        setOwnerId(null);
        setProperties([]);
        setLoading(false);
        return;
      }

      try {
        const parsed = JSON.parse(e.newValue);
        const id = extractIdFromObj(parsed);
        if (id) {
          const sid = String(id);
          setOwnerId(sid);
          fetchFilteredProperties(sid);
        } else {
          setOwnerId(null);
          setProperties([]);
        }
      } catch (err) {
        setOwnerId(null);
        setProperties([]);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [fetchFilteredProperties]);

  // Listen to custom in-tab event 'propertyCreated' (the form can dispatch this after successful upload)
  useEffect(() => {
    const onPropertyCreated = (e) => {
      const created = e?.detail;
      if (!created) return;
      const pOwner = created.owner_id || created.ownerId || (created.meta && (created.meta.ownerId || created.meta.owner_id));
      const resolved = resolveOwnerIdFromSources();
      if (!resolved) {
        // if we don't have owner id yet, attempt to reload full list
        const id = resolveOwnerIdFromSources();
        if (id) {
          setOwnerId(id);
          fetchFilteredProperties(id);
        }
        return;
      }
      if (String(pOwner) === String(resolved)) {
        setProperties((prev) => [created, ...prev]);
      }
    };
    window.addEventListener("propertyCreated", onPropertyCreated);
    return () => window.removeEventListener("propertyCreated", onPropertyCreated);
  }, [fetchFilteredProperties, resolveOwnerIdFromSources]);

  // react when context user changes (login/logout in same tab)
  useEffect(() => {
    const id = resolveOwnerIdFromSources();
    if (!id) {
      // when context lost user, clear out
      setOwnerId(null);
      setProperties([]);
      setLoading(false);
      return;
    }
    if (id && id !== ownerId) {
      setOwnerId(id);
      fetchFilteredProperties(id);
    }
  }, [user, resolveOwnerIdFromSources, fetchFilteredProperties]);

  const refresh = async () => {
    const id = resolveOwnerIdFromSources();
    setOwnerId(id);
    await fetchFilteredProperties(id);
  };

  // UI when ownerId not resolved: show friendly message and no properties (this prevents showing other people's props)
  if (!ownerId) {
    return (
      <div className={styles.page}>
        <main className={styles.grid}>
          <section>
            <h3 className={styles.sectionTitle}>My Properties</h3>
            <p>We couldn't detect your account yet. If you just signed up, you won't see any properties until you publish your first listing.</p>
            <p style={{ marginTop: 8 }}>If you have already created a listing, click Retry to detect your account and refresh.</p>
            <div style={{ marginTop: 12 }}>
              <button className={styles.iconBtn} onClick={refresh}>Retry detect account</button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}></div>
      <section style={{marginTop:"-3px"}} className={styles.hero}>
        <img className={styles.heroBg} src="/public/Group 89.png" alt="hero background" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Let's Ovika Renovate and Manage<br/>Your Property</h1>
          <p>Maximize your rental income with zero hassle. We handle everything from renovation to tenant management.</p>
        </div>
      </section>

      <main className={styles.grid}>
        <section>
          <h3 className={styles.sectionTitle}>My Properties</h3>

          {loading && <p>Loading properties...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className={styles.properties}>
            {!loading && properties.map((prop) => {
              const name = prop.property_name || prop.name || "Untitled Property";
              const locationParts = [prop.city, prop.country].filter(Boolean);
              const location = locationParts.join(", ") || "Location not specified";

              const detailsPieces = [];
              if (prop.property_type) detailsPieces.push(prop.property_type);
              const bedroomCount = prop.total_bedrooms || getRoomCount(prop.bedrooms);
              if (bedroomCount > 0) detailsPieces.push(`${bedroomCount} BR`);
              
              const bathroomCount = prop.total_bathrooms || getRoomCount(prop.bathrooms);
              if (bathroomCount > 0) detailsPieces.push(`${bathroomCount} BA`);
              if (prop.max_guests !== undefined && prop.max_guests !== null) detailsPieces.push(`Up to ${prop.max_guests} guests`);
              const details = detailsPieces.join(" • ");

              const priceText = prop.price ? `₹${Number(prop.price).toLocaleString("en-IN")} / night` : "";
              const photoUrl = getPropertyPhoto(prop);

              return (
                <PropertyCard 
                  key={prop.id || prop._id || Math.random()} 
                  photoUrl={photoUrl} 
                  name={name} 
                  location={location} 
                  details={details} 
                  priceText={priceText}
                  onView={() => navigate(`/property/${prop.id || prop._id}`)}
                  onEdit={() => setEditingProperty(prop)}
                  onDelete={async () => {
                    if (!window.confirm("Are you sure you want to delete this property?")) return;
                    try {
                      const id = prop.id || prop._id;
                      await axios.delete(`https://townmanor.ai/api/ovika/properties/${id}`);
                      setProperties(prev => prev.filter(p => (p.id || p._id) !== id));
                    } catch(e) {
                      alert("Failed to delete property");
                      console.error(e);
                    }
                  }}
                />
              );
            })}

            {!loading && properties.length === 0 && <p>No properties found for your account yet. Create a listing to see it here.</p>}
          </div>
        </section>
        
        {/* Render Edit Modal if active */}
        {editingProperty && (
          <EditPropertyModal 
            property={editingProperty} 
            onClose={() => setEditingProperty(null)} 
            onRefresh={refresh} 
          />
        )}

        <aside className={styles.rightCol}>
          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Key Document</h4>
            <div className={styles.keyList}>
              <KeyItem text="Lease Agreement - Unit 4B.pdf" filetype="pdf" />
              <KeyItem text="Renovation Quote.pdf" filetype="pdf" />
              <KeyItem text="Monthly P&L Statement.xlsx" filetype="xlsx" />
            </div>
          </div>

          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Messages</h4>
            <MessageItem initials="G" name="Georgia" note="The sink in Apt 4B is leaking" />
            <MessageItem initials="H" name="Heemant" note="Your monthly statement is ready" />
          </div>

          <div className={styles.card}>
            <h4 className={styles.cardTitle}>My Support Tickets</h4>
            <TicketRow title="Question About Insurance" status="Resolved" />
            <TicketRow title="Payment Clarification" status="Open" />
          </div>
        </aside>
      </main>
    </div>
  );
}
