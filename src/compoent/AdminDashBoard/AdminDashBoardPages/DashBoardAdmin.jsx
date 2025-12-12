// src/pages/dashboard/DashBoardAdmin.jsx
import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
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

function PropertyCard({ photoUrl, name, location, priceText, details }) {
  return (
    <div className={styles.propertyCard}>
      <img src={photoUrl} alt={name} className={styles.propertyImage} />
      <div className={styles.propertyMeta}>
        <div className={styles.propertyTitle}>{name}</div>
        <div className={styles.propertySubtitle}>{location}</div>
        {details && <div className={styles.propertyDetails}>{details}</div>}
        {priceText && <div className={styles.propertyPrice}>{priceText}</div>}
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

export default function DashBoardAdmin() {
  const { user } = useContext(AuthContext);

  // ONLY use the canonical key "user" to avoid reading stale legacy keys
  const STORAGE_KEY = "user";

  const [ownerId, setOwnerId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <section className={styles.hero}>
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
              if (prop.bedrooms !== undefined && prop.bedrooms !== null) detailsPieces.push(`${prop.bedrooms} BR`);
              if (prop.bathrooms !== undefined && prop.bathrooms !== null) detailsPieces.push(`${prop.bathrooms} BA`);
              if (prop.max_guests !== undefined && prop.max_guests !== null) detailsPieces.push(`Up to ${prop.max_guests} guests`);
              const details = detailsPieces.join(" • ");

              const priceText = prop.price ? `₹${Number(prop.price).toLocaleString("en-IN")} / night` : "";
              const photoUrl = getPropertyPhoto(prop);

              return <PropertyCard key={prop.id || prop._id || Math.random()} photoUrl={photoUrl} name={name} location={location} details={details} priceText={priceText} />;
            })}

            {!loading && properties.length === 0 && <p>No properties found for your account yet. Create a listing to see it here.</p>}
          </div>
        </section>

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
