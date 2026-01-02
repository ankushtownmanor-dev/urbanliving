// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { CheckCircle, XCircle, Loader } from 'lucide-react';

// const InquiriesBookings = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoadingId, setActionLoadingId] = useState(null);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('https://townmanor.ai/api/booking-request');

//       let list = [];
//       if (Array.isArray(res.data)) list = res.data;
//       else if (Array.isArray(res.data?.data)) list = res.data.data;

//       setRequests(list);
//     } catch (err) {
//       console.error(err);
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const handleAction = async (id, action) => {
//     setActionLoadingId(id);
//     try {
//       await axios.patch(
//         `https://townmanor.ai/api/booking-request/${id}/${action}`
//       );
//       await fetchRequests();
//     } catch (err) {
//       alert(`Failed to ${action} request`);
//     } finally {
//       setActionLoadingId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={styles.center}>
//         <Loader className="animate-spin" size={32} />
//         <p>Loading booking requests...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Booking Requests</h2>

//       {requests.length === 0 ? (
//         <p style={styles.empty}>No booking requests found.</p>
//       ) : (
//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Property</th>
//                 <th>User</th>
//                 <th>Check-in</th>
//                 <th>Check-out</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {requests.map((req) => (
//                 <tr key={req.id}>
//                   <td>{req.id}</td>
//                   <td>{req.property_id}</td>
//                   <td>{req.username}</td>
//                   <td>{formatDate(req.start_date)}</td>
//                   <td>{formatDate(req.end_date)}</td>
//                   <td>
//                     <StatusBadge status={req.status} />
//                   </td>
//                   <td>
//                     {req.status === 'pending' ? (
//                       <div style={styles.actionGroup}>
//                         <button
//                           style={styles.acceptBtn}
//                           disabled={actionLoadingId === req.id}
//                           onClick={() => handleAction(req.id, 'accept')}
//                         >
//                           <CheckCircle size={16} /> Accept
//                         </button>

//                         <button
//                           style={styles.rejectBtn}
//                           disabled={actionLoadingId === req.id}
//                           onClick={() => handleAction(req.id, 'reject')}
//                         >
//                           <XCircle size={16} /> Reject
//                         </button>
//                       </div>
//                     ) : (
//                       <span style={{ color: '#777' }}>—</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ---------------- HELPERS ---------------- */

// const formatDate = (d) =>
//   d ? new Date(d).toLocaleDateString() : '-';

// const StatusBadge = ({ status }) => {
//   const map = {
//     pending: { bg: '#FEF3C7', color: '#92400E' },
//     accepted: { bg: '#DCFCE7', color: '#166534' },
//     rejected: { bg: '#FEE2E2', color: '#991B1B' }
//   };

//   return (
//     <span
//       style={{
//         padding: '4px 10px',
//         borderRadius: '999px',
//         fontSize: '12px',
//         fontWeight: 600,
//         background: map[status]?.bg,
//         color: map[status]?.color
//       }}
//     >
//       {status}
//     </span>
//   );
// };

// /* ---------------- STYLES ---------------- */

// const styles = {
//   container: {
//     padding: '2rem',
//     background: '#f8fafc',
//     minHeight: '100vh'
//   },
//   heading: {
//     marginBottom: '1.5rem'
//   },
//   center: {
//     padding: '3rem',
//     textAlign: 'center',
//     color: '#555'
//   },
//   empty: {
//     color: '#777'
//   },
//   tableWrapper: {
//     overflowX: 'auto',
//     background: '#fff',
//     borderRadius: '12px',
//     boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse'
//   },
//   actionGroup: {
//     display: 'flex',
//     gap: '0.5rem'
//   },
//   acceptBtn: {
//     background: '#16a34a',
//     color: '#fff',
//     border: 'none',
//     padding: '6px 10px',
//     borderRadius: '6px',
//     fontSize: '13px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '4px'
//   },
//   rejectBtn: {
//     background: '#dc2626',
//     color: '#fff',
//     border: 'none',
//     padding: '6px 10px',
//     borderRadius: '6px',
//     fontSize: '13px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '4px'
//   }
// };

// export default InquiriesBookings;

// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { CheckCircle, XCircle, Loader } from "lucide-react";
// import { AuthContext } from "../../Login/AuthContext";

// /* ================= HELPERS ================= */

// // safely extract owner/user id from any shape
// const extractOwnerId = (obj) => {
//   if (!obj || typeof obj !== "object") return null;

//   return (
//     obj.id ||
//     obj.user_id ||
//     obj.userId ||
//     obj.owner_id ||
//     obj.ownerId ||
//     (obj.user && extractOwnerId(obj.user)) ||
//     null
//   );
// };

// const formatDate = (d) =>
//   d ? new Date(d).toLocaleDateString() : "-";

// /* ================= COMPONENT ================= */

// const InquiriesBookings = () => {
//   const { user } = useContext(AuthContext);

//   const [ownerId, setOwnerId] = useState(null);
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoadingId, setActionLoadingId] = useState(null);

//   /* ---------- STEP 1: Resolve Owner ID ---------- */
//   useEffect(() => {
//     const idFromContext = extractOwnerId(user);
//     if (idFromContext) {
//       setOwnerId(Number(idFromContext));
//       return;
//     }

//     try {
//       const raw = localStorage.getItem("user");
//       if (!raw) return;
//       const parsed = JSON.parse(raw);
//       const idFromStorage = extractOwnerId(parsed);
//       if (idFromStorage) setOwnerId(Number(idFromStorage));
//     } catch (e) {
//       console.error("Owner ID parse error", e);
//     }
//   }, [user]);

//   /* ---------- STEP 2: Fetch OWNER-SPECIFIC BOOKINGS ---------- */
//   const fetchRequests = async () => {
//     try {
//       setLoading(true);

//       if (!ownerId) {
//         setRequests([]);
//         return;
//       }

//       /* 1️⃣ Fetch all properties */
//       const propRes = await axios.get(
//         "https://townmanor.ai/api/ovika/properties"
//       );

//       let properties = [];
//       if (Array.isArray(propRes.data)) properties = propRes.data;
//       else if (Array.isArray(propRes.data?.data))
//         properties = propRes.data.data;

//       /* 2️⃣ Filter only OWNER properties */
//       const ownerProperties = properties.filter((p) => {
//         const possibleOwnerIds = [
//           p.owner_id,
//           p.ownerId,
//           p.user_id,
//           p.userId,
//           p.created_by,
//           p.meta?.ownerId,
//           p.meta?.owner_id,
//         ].filter(Boolean);

//         return possibleOwnerIds.some(
//           (id) => Number(id) === Number(ownerId)
//         );
//       });

//       const ownerPropertyIds = ownerProperties
//         .map((p) => Number(p.id || p._id))
//         .filter(Boolean);

//       console.log("OWNER ID:", ownerId);
//       console.log("OWNER PROPERTY IDS:", ownerPropertyIds);

//       if (ownerPropertyIds.length === 0) {
//         setRequests([]);
//         return;
//       }

//       /* 3️⃣ Fetch all booking / enquiry requests */
//       const reqRes = await axios.get(
//         "https://townmanor.ai/api/booking-request"
//       );

//       let list = [];
//       if (Array.isArray(reqRes.data)) list = reqRes.data;
//       else if (Array.isArray(reqRes.data?.data))
//         list = reqRes.data.data;

//       console.log("ALL BOOKINGS:", list);

//       /* 4️⃣ FILTER: only bookings of owner's properties */
//       const filtered = list.filter(
//         (r) =>
//           r.property_id &&
//           ownerPropertyIds.includes(Number(r.property_id))
//       );

//       console.log("FILTERED BOOKINGS:", filtered);

//       setRequests(filtered);
//     } catch (err) {
//       console.error("Booking fetch error:", err);
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, [ownerId]);

//   /* ---------- OPTIONAL: Accept / Reject ---------- */
//   const handleAction = async (id, action) => {
//     setActionLoadingId(id);
//     try {
//       await axios.patch(
//         `https://townmanor.ai/api/booking-request/${id}/${action}`
//       );
//       fetchRequests();
//     } catch (err) {
//       alert(`Failed to ${action}`);
//     } finally {
//       setActionLoadingId(null);
//     }
//   };

//   /* ================= UI ================= */

//   if (loading) {
//     return (
//       <div style={{ padding: "3rem", textAlign: "center" }}>
//         <Loader size={32} className="animate-spin" />
//         <p>Loading enquiries…</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem", background: "#f8fafc", minHeight: "100vh" }}>
//       <h2 style={{ marginBottom: "1rem" }}>My Property Enquiries</h2>

//       {requests.length === 0 ? (
//         <p>No enquiries for your listed properties.</p>
//       ) : (
//         <div style={{ overflowX: "auto", background: "#fff", borderRadius: 12 }}>
//           <table width="100%" cellPadding="12" style={{ borderCollapse: "collapse" }}>
//             <thead style={{ background: "#0f172a", color: "#fff" }}>
//               <tr>
//                 <th>ID</th>
//                 <th>Property ID</th>
//                 <th>User</th>
//                 <th>Check-in</th>
//                 <th>Check-out</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {requests.map((req) => (
//                 <tr key={req.id} style={{ borderBottom: "1px solid #eee" }}>
//                   <td>{req.id}</td>
//                   <td>{req.property_id}</td>
//                   <td>{req.username}</td>
//                   <td>{formatDate(req.start_date)}</td>
//                   <td>{formatDate(req.end_date)}</td>
//                   <td>{req.status}</td>
//                   <td>
//                     {req.status === "pending" ? (
//                       <>
//                         <button
//                           disabled={actionLoadingId === req.id}
//                           onClick={() => handleAction(req.id, "accept")}
//                           style={{ marginRight: 8 }}
//                         >
//                           Accept
//                         </button>
//                         <button
//                           disabled={actionLoadingId === req.id}
//                           onClick={() => handleAction(req.id, "reject")}
//                         >
//                           Reject
//                         </button>
//                       </>
//                     ) : (
//                       "—"
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InquiriesBookings;
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Loader, Calendar, MapPin, User } from "lucide-react";
import { AuthContext } from "../../Login/AuthContext";

/* ================= HELPERS ================= */

const extractOwnerId = (obj) => {
  if (!obj || typeof obj !== "object") return null;
  return (
    obj.id ||
    obj.user_id ||
    obj.userId ||
    obj.owner_id ||
    obj.ownerId ||
    (obj.user && extractOwnerId(obj.user)) ||
    null
  );
};

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }) : "-";

/* ================= COMPONENT ================= */

const InquiriesBookings = () => {
  const { user } = useContext(AuthContext);

  const [ownerId, setOwnerId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  /* ---------- Resolve Owner ID ---------- */
  useEffect(() => {
    const idFromContext = extractOwnerId(user);
    if (idFromContext) {
      setOwnerId(Number(idFromContext));
      return;
    }

    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const idFromStorage = extractOwnerId(parsed);
      if (idFromStorage) setOwnerId(Number(idFromStorage));
    } catch {}
  }, [user]);

  /* ---------- Fetch Bookings ---------- */
  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await axios.get("https://townmanor.ai/api/booking-request");

      let list = [];
      if (Array.isArray(res.data)) list = res.data;
      else if (Array.isArray(res.data?.data)) list = res.data.data;

      setRequests(list);
    } catch (err) {
      console.error(err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [ownerId]);

  /* ---------- Accept / Reject ---------- */
  const handleAction = async (id, action) => {
    setActionLoadingId(id);
    try {
      await axios.patch(
        `https://townmanor.ai/api/booking-request/${id}/${action}`
      );
      fetchRequests();
    } catch {
      alert("Action failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <Loader size={40} className="animate-spin" />
        <p style={{ marginTop: 12 }}>Loading enquiries…</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: 26, marginBottom: 20 }}>
        Property Enquiries
      </h2>

      {requests.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {requests.map((req) => (
            <div
              key={req.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                transition: "transform .3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-6px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {/* IMAGE */}
              <div style={{ height: 180, overflow: "hidden" }}>
                <img
                  src={req.property?.image}
                  alt={req.property?.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* BODY */}
              <div style={{ padding: 16 }}>
                <h3 style={{ margin: "0 0 6px" }}>
                  {req.property?.name}
                </h3>

                <p style={{ color: "#64748b", fontSize: 14 }}>
                  <MapPin size={14} /> {req.property?.city}
                </p>

                <p style={{ marginTop: 6, fontWeight: 600 }}>
                  ₹{req.property?.price} / night
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 12,
                    fontSize: 13,
                    color: "#475569",
                  }}
                >
                  <span>
                    <Calendar size={14} /> {formatDate(req.start_date)}
                  </span>
                  <span>
                    <Calendar size={14} /> {formatDate(req.end_date)}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <User size={14} /> {req.username}
                </div>

                {/* STATUS */}
                <div style={{ marginTop: 14 }}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                      background:
                        req.status === "pending"
                          ? "#fef3c7"
                          : req.status === "accepted"
                          ? "#dcfce7"
                          : "#fee2e2",
                      color:
                        req.status === "pending"
                          ? "#92400e"
                          : req.status === "accepted"
                          ? "#166534"
                          : "#991b1b",
                    }}
                  >
                    {req.status.toUpperCase()}
                  </span>
                </div>

                {/* ACTIONS */}
                {req.status === "pending" && (
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginTop: 16,
                    }}
                  >
                    <button
                      onClick={() => handleAction(req.id, "accept")}
                      disabled={actionLoadingId === req.id}
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: 10,
                        border: "none",
                        background: "#16a34a",
                        color: "#fff",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {actionLoadingId === req.id ? (
                        <Loader size={16} className="animate-spin" />
                      ) : (
                        "Accept"
                      )}
                    </button>

                    <button
                      onClick={() => handleAction(req.id, "reject")}
                      disabled={actionLoadingId === req.id}
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: 10,
                        border: "none",
                        background: "#dc2626",
                        color: "#fff",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiriesBookings;
