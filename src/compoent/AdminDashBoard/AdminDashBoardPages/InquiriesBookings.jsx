

//  import React, { useEffect, useState, useContext, useCallback } from "react";
// import axios from "axios";
// import { Loader, Calendar, MapPin, User } from "lucide-react";
// import { AuthContext } from "../../Login/AuthContext";

// /* ================= HELPERS ================= */

// const extractOwnerId = (obj) => {
//   if (!obj || typeof obj !== "object") return null;
//   return (
//     obj.owner_id ||
//     obj.ownerId ||
//     obj.id ||
//     obj.user_id ||
//     obj.userId ||
//     (obj.user && extractOwnerId(obj.user)) ||
//     null
//   );
// };

// const formatDate = (d) =>
//   d
//     ? new Date(d).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       })
//     : "-";

// /* ================= COMPONENT ================= */

// const InquiriesBookings = () => {
//   const { user } = useContext(AuthContext);

//   const [ownerId, setOwnerId] = useState(null);
//   const [ownerPropertyIds, setOwnerPropertyIds] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoadingId, setActionLoadingId] = useState(null);

//   /* ---------- Resolve Owner ID ---------- */
//   const resolveOwnerId = useCallback(() => {
//     const idFromContext = extractOwnerId(user);
//     if (idFromContext) return String(idFromContext);

//     try {
//       const raw = localStorage.getItem("user");
//       if (!raw) return null;
//       const parsed = JSON.parse(raw);
//       return extractOwnerId(parsed)?.toString() || null;
//     } catch {
//       return null;
//     }
//   }, [user]);

//   useEffect(() => {
//     const id = resolveOwnerId();
//     setOwnerId(id);
//   }, [resolveOwnerId]);

//   /* ---------- STEP 1: Fetch OWNER PROPERTIES ---------- */
//   const fetchOwnerProperties = useCallback(async () => {
//     if (!ownerId) return [];

//     const res = await axios.get(
//       "https://townmanor.ai/api/ovika/properties"
//     );

//     let list = [];
//     if (Array.isArray(res.data)) list = res.data;
//     else if (Array.isArray(res.data?.data)) list = res.data.data;

//     const ownerProps = list.filter(
//       (p) =>
//         String(p.owner_id || p.ownerId) === String(ownerId)
//     );

//     const ids = ownerProps.map((p) => Number(p.id));
//     console.log("OWNER PROPERTY IDS:", ids);

//     return ids;
//   }, [ownerId]);

//   /* ---------- STEP 2: Fetch & FILTER ENQUIRIES ---------- */
//   const fetchRequests = useCallback(async () => {
//     if (!ownerId) {
//       setRequests([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);

//       const propertyIds = await fetchOwnerProperties();
//       setOwnerPropertyIds(propertyIds);

//       const res = await axios.get(
//         "https://townmanor.ai/api/booking-request"
//       );

//       let list = [];
//       if (Array.isArray(res.data)) list = res.data;
//       else if (Array.isArray(res.data?.data)) list = res.data.data;

//       console.log("ALL BOOKINGS:", list);

//       // 🔥 FINAL FILTER (FRONTEND JOIN)
//       const filtered = list.filter((req) =>
//         propertyIds.includes(Number(req.property_id))
//       );

//       console.log("FILTERED BOOKINGS:", filtered);

//       setRequests(filtered);
//     } catch (err) {
//       console.error("Failed to load enquiries", err);
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [ownerId, fetchOwnerProperties]);

//   useEffect(() => {
//     fetchRequests();
//   }, [fetchRequests]);

//   /* ---------- Accept / Reject ---------- */
//   const handleAction = async (id, action) => {
//     setActionLoadingId(id);
//     try {
//       await axios.patch(
//         `https://townmanor.ai/api/booking-request/${id}/${action}`
//       );
//       fetchRequests();
//     } catch {
//       alert("Action failed");
//     } finally {
//       setActionLoadingId(null);
//     }
//   };

//   /* ================= UI ================= */

//   if (loading) {
//     return (
//       <div style={{ padding: "4rem", textAlign: "center" }}>
//         <Loader size={40} className="animate-spin" />
//         <p style={{ marginTop: 12 }}>Loading enquiries…</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem", background: "#f1f5f9", minHeight: "100vh" }}>
//       <h2 style={{ fontSize: 26, marginBottom: 20 }}>
//         My Property Enquiries
//       </h2>

//       {requests.length === 0 ? (
//         <p>No enquiries for your properties.</p>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
//             gap: 20,
//           }}
//         >
//           {requests.map((req) => (
//             <div
//               key={req.id}
//               style={{
//                 background: "#fff",
//                 borderRadius: 16,
//                 boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
//                 overflow: "hidden",
//               }}
//             >
//               <div style={{ padding: 16 }}>
//                 <h3>{req.property?.name}</h3>

//                 <p style={{ color: "#64748b", fontSize: 14 }}>
//                   <MapPin size={14} /> {req.property?.city}
//                 </p>

//                 <p style={{ fontWeight: 600 }}>
//                   ₹{req.property?.price} / night
//                 </p>

//                 <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
//                   <span>
//                     <Calendar size={14} /> {formatDate(req.start_date)}
//                   </span>
//                   <span>
//                     <Calendar size={14} /> {formatDate(req.end_date)}
//                   </span>
//                 </div>

//                 <div style={{ marginTop: 8, fontSize: 13 }}>
//                   <User size={14} /> {req.username}
//                 </div>

//                 {req.status === "pending" && (
//                   <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
//                     <button
//                       onClick={() => handleAction(req.id, "accept")}
//                       disabled={actionLoadingId === req.id}
//                       style={{
//                         flex: 1,
//                         padding: 10,
//                         borderRadius: 10,
//                         border: "none",
//                         background: "#16a34a",
//                         color: "#fff",
//                         fontWeight: 600,
//                       }}
//                     >
//                       Accept
//                     </button>

//                     <button
//                       onClick={() => handleAction(req.id, "reject")}
//                       disabled={actionLoadingId === req.id}
//                       style={{
//                         flex: 1,
//                         padding: 10,
//                         borderRadius: 10,
//                         border: "none",
//                         background: "#dc2626",
//                         color: "#fff",
//                         fontWeight: 600,
//                       }}
//                     >
//                       Decline
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InquiriesBookings;
import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { Loader, Calendar, MapPin, User, Inbox } from "lucide-react";
import { AuthContext } from "../../Login/AuthContext";

/* ================= HELPERS ================= */
const extractOwnerId = (obj) => {
  if (!obj || typeof obj !== "object") return null;
  return (
    obj.owner_id ||
    obj.ownerId ||
    obj.id ||
    obj.user_id ||
    obj.userId ||
    (obj.user && extractOwnerId(obj.user)) ||
    null
  );
};

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

/* ================= COMPONENT ================= */
const InquiriesBookings = () => {
  const { user } = useContext(AuthContext);
  const [ownerId, setOwnerId] = useState(null);
  const [ownerPropertyIds, setOwnerPropertyIds] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  /* ---------- Resolve Owner ID ---------- */
  const resolveOwnerId = useCallback(() => {
    const idFromContext = extractOwnerId(user);
    if (idFromContext) return String(idFromContext);
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return extractOwnerId(parsed)?.toString() || null;
    } catch {
      return null;
    }
  }, [user]);

  useEffect(() => {
    const id = resolveOwnerId();
    setOwnerId(id);
  }, [resolveOwnerId]);

  /* ---------- STEP 1: Fetch OWNER PROPERTIES ---------- */
  const fetchOwnerProperties = useCallback(async () => {
    if (!ownerId) return [];
    const res = await axios.get(
      "https://townmanor.ai/api/ovika/properties"
    );
    let list = [];
    if (Array.isArray(res.data)) list = res.data;
    else if (Array.isArray(res.data?.data)) list = res.data.data;

    const ownerProps = list.filter(
      (p) => String(p.owner_id || p.ownerId) === String(ownerId)
    );
    const ids = ownerProps.map((p) => Number(p.id));
    console.log("OWNER PROPERTY IDS:", ids);
    return ids;
  }, [ownerId]);

  /* ---------- STEP 2: Fetch & FILTER ENQUIRIES ---------- */
  const fetchRequests = useCallback(async () => {
    if (!ownerId) {
      setRequests([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const propertyIds = await fetchOwnerProperties();
      setOwnerPropertyIds(propertyIds);

      const res = await axios.get(
        "https://townmanor.ai/api/booking-request"
      );
      let list = [];
      if (Array.isArray(res.data)) list = res.data;
      else if (Array.isArray(res.data?.data)) list = res.data.data;

      console.log("ALL BOOKINGS:", list);

      // 🔥 FINAL FILTER (FRONTEND JOIN)
      const filtered = list.filter((req) =>
        propertyIds.includes(Number(req.property_id))
      );

      console.log("FILTERED BOOKINGS:", filtered);
      setRequests(filtered);
    } catch (err) {
      console.error("Failed to load enquiries", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [ownerId, fetchOwnerProperties]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", flexDirection: "column", gap: "12px" }}>
        <Loader size={40} style={{ animation: "spin 1s linear infinite", color: "#3b82f6" }} />
        <p style={{ fontSize: "16px", color: "#6b7280", fontWeight: 500 }}>Loading enquiries…</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px", color: "#111827" }}>
        My Property Enquiries
      </h1>

      {requests.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh", padding: "40px 20px", background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ background: "#fff", padding: "32px", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", maxWidth: "400px", textAlign: "center" }}>
            <div style={{ background: "#c2772b", width: "80px", height: "80px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Inbox size={40} style={{ color: "#fff" }} />
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "12px" }}>No Enquiries Yet</h2>
            <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: "1.6", margin: 0 }}>
              You haven't received any enquiries for your properties at the moment. Check back later!
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
          {requests.map((req) => (
            <div key={req.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", transition: "all 0.3s ease", border: "1px solid #e5e7eb" }}>
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>
                  {req.property?.name}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
                  <MapPin size={16} />
                  <span>{req.property?.city}</span>
                </div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#16a34a", marginBottom: "16px" }}>
                  ₹{req.property?.price} / night
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#f9fafb", borderRadius: "10px", marginBottom: "12px" }}>
                  <Calendar size={18} style={{ color: "#3b82f6" }} />
                  <div style={{ flex: 1, display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#374151" }}>
                    <span>{formatDate(req.start_date)}</span>
                    <span style={{ color: "#9ca3af" }}>→</span>
                    <span>{formatDate(req.end_date)}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px", background: "#eff6ff", borderRadius: "10px", marginBottom: "16px" }}>
                  <User size={18} style={{ color: "#3b82f6" }} />
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#1e40af" }}>{req.username}</span>
                </div>

                {req.status === "pending" && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => handleAction(req.id, "accept")} disabled={actionLoadingId === req.id} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: "#16a34a", color: "#fff", fontWeight: 600, fontSize: "15px", cursor: actionLoadingId === req.id ? "not-allowed" : "pointer", opacity: actionLoadingId === req.id ? 0.6 : 1, transition: "all 0.2s" }}>
                      Accept
                    </button>
                    <button onClick={() => handleAction(req.id, "reject")} disabled={actionLoadingId === req.id} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: "#dc2626", color: "#fff", fontWeight: 600, fontSize: "15px", cursor: actionLoadingId === req.id ? "not-allowed" : "pointer", opacity: actionLoadingId === req.id ? 0.6 : 1, transition: "all 0.2s" }}>
                      Decline
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