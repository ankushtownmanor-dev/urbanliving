// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./Dashboard.module.css";

// // Small UI atoms
// function KeyItem({ text, filetype = "pdf" }) {
//   const isXlsx = filetype === "xlsx";

//   return (
//     <div className={styles.keyItem}>
//       <span
//         className={`${styles.keyDot} ${isXlsx ? styles.xlsx : styles.pdf}`}
//       />
//       <span className={styles.keyText}>{text}</span>
//       <div className={styles.keyActions}>
//         <button title="View" className={styles.iconBtn} aria-label="view">
//           <i className="fa-regular fa-eye" />
//         </button>
//         <button title="Download" className={styles.iconBtn} aria-label="download">
//           <i className="fa-solid fa-download" />
//         </button>
//       </div>
//     </div>
//   );
// }

// function MessageItem({ initials, name, note }) {
//   return (
//     <div className={styles.msgItem}>
//       <div className={styles.avatar}>{initials}</div>
//       <div>
//         <div className={styles.msgName}>{name}</div>
//         <div className={styles.msgNote}>{note}</div>
//       </div>
//     </div>
//   );
// }

// function TicketRow({ title, status }) {
//   const statusClass =
//     status.toLowerCase() === "resolved" ? styles.resolved : styles.open;

//   return (
//     <div className={styles.ticketRow}>
//       <span className={styles.ticketTitle}>{title}</span>
//       <span className={`${styles.chip} ${statusClass}`}>{status}</span>
//     </div>
//   );
// }

// // PROPERTY CARD
// function PropertyCard({ photoUrl, name, location, priceText, details }) {
//   return (
//     <div className={styles.propertyCard}>
//       <img src={photoUrl} alt={name} className={styles.propertyImage} />
//       <div className={styles.propertyMeta}>
//         <div className={styles.propertyTitle}>{name}</div>
//         <div className={styles.propertySubtitle}>{location}</div>
//         {details && <div className={styles.propertyDetails}>{details}</div>}
//         {priceText && <div className={styles.propertyPrice}>{priceText}</div>}
//       </div>
//     </div>
//   );
// }

// function DashBoardAdmin() {
//   // ============================
//   // 📌 STATE FOR API DATA
//   // ============================
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ============================
//   // 📌 FETCH PROPERTIES FROM API
//   // ============================
//   useEffect(() => {
//     async function fetchProperties() {
//       try {
//         const res = await axios.get(
//           "https://townmanor.ai/api/ovika/properties"
//         );

//         if (res.data && Array.isArray(res.data.data)) {
//           setProperties(res.data.data); // store actual list
//         } else {
//           console.error("Invalid properties response format:", res.data);
//         }
//       } catch (error) {
//         console.error("Failed to load properties:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProperties();
//   }, []);

//   // Helper to safely get photo url from JSON
//   const getPropertyPhoto = (prop) => {
//     if (Array.isArray(prop.photos) && prop.photos.length > 0) {
//       // try cover_photo_index first
//       if (
//         typeof prop.cover_photo_index === "number" &&
//         prop.photos[prop.cover_photo_index]
//       ) {
//         return prop.photos[prop.cover_photo_index];
//       }
//       // fallback: first photo
//       return prop.photos[0];
//     }
//     // final fallback image
//     return "/public/image 68.png";
//   };

//   return (
//     <div className={styles.page}>
//       {/* Topbar */}
//       <div className={styles.topbar}>
//         {/* <button className={styles.profileDot} aria-label="profile" /> */}
//       </div>

//       {/* Hero */}
//       <section className={styles.hero}>
//         <img
//           className={styles.heroBg}
//           src="/public/Group 89.png"
//           alt="hero background"
//         />
//         <div className={styles.heroOverlay} />
//         <div className={styles.heroContent}>
//           <h1>
//             Let&apos;s Ovika Renovate and Manage
//             <br />
//             Your Property
//           </h1>
//           <p>
//             Maximize your rental income with zero hassle. We handle everything
//             from renovation to tenant management.
//           </p>
//         </div>
//       </section>

//       {/* Main */}
//       <main className={styles.grid}>
//         <section>
//           <h3 className={styles.sectionTitle}>My Properties</h3>

//           {/* ================================
//               📌 LOADING State
//               ================================ */}
//           {loading && <p>Loading properties...</p>}

//           {/* ================================
//               📌 API DATA MAPPING
//               ================================ */}
//           <div className={styles.properties}>
//             {!loading &&
//               properties.map((prop) => {
//                 const name = prop.property_name || "Untitled Property";

//                 const locationParts = [prop.city, prop.country].filter(Boolean);
//                 const location =
//                   locationParts.join(", ") || "Location not specified";

//                 const detailsPieces = [];
//                 if (prop.property_type) detailsPieces.push(prop.property_type);
//                 if (prop.bedrooms !== null && prop.bedrooms !== undefined)
//                   detailsPieces.push(`${prop.bedrooms} BR`);
//                 if (prop.bathrooms !== null && prop.bathrooms !== undefined)
//                   detailsPieces.push(`${prop.bathrooms} BA`);
//                 if (prop.max_guests !== null && prop.max_guests !== undefined)
//                   detailsPieces.push(`Up to ${prop.max_guests} guests`);

//                 const details = detailsPieces.join(" • ");

//                 const priceText = prop.price
//                   ? `₹${prop.price.toLocaleString("en-IN")} / night`
//                   : "";

//                 const photoUrl = getPropertyPhoto(prop);

//                 return (
//                   <PropertyCard
//                     key={prop.id}
//                     photoUrl={photoUrl}
//                     name={name}
//                     location={location}
//                     details={details}
//                     priceText={priceText}
//                   />
//                 );
//               })}
//           </div>
//         </section>

//         <aside className={styles.rightCol}>
//           <div className={styles.card}>
//             <h4 className={styles.cardTitle}>Key Document</h4>
//             <div className={styles.keyList}>
//               <KeyItem text="Lease Agreement - Unit 4B.pdf" filetype="pdf" />
//               <KeyItem text="Renovation Quote.pdf" filetype="pdf" />
//               <KeyItem
//                 text="Monthly P&L Statement.xlsx"
//                 filetype="xlsx"
//               />
//             </div>
//           </div>

//           <div className={styles.card}>
//             <h4 className={styles.cardTitle}>Messages</h4>
//             <MessageItem
//               initials="G"
//               name="Georgia"
//               note="The sink in Apt 4B is leaking"
//             />
//             <MessageItem
//               initials="H"
//               name="Heemant"
//               note="Your monthly statement is ready"
//             />
//           </div>

//           <div className={styles.card}>
//             <h4 className={styles.cardTitle}>My Support Tickets</h4>
//             <TicketRow title="Question About Insurance" status="Resolved" />
//             <TicketRow title="Payment Clarification" status="Open" />
//           </div>
//         </aside>
//       </main>

//       {/* Help Button */}
//       {/* <button className={styles.helpFab} aria-label="help" /> */}
//     </div>
//   );
// }

// export default DashBoardAdmin;
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { AuthContext } from "../../Login/AuthContext";

// Small UI atoms
function KeyItem({ text, filetype = "pdf" }) {
  const isXlsx = filetype === "xlsx";

  return (
    <div className={styles.keyItem}>
      <span
        className={`${styles.keyDot} ${isXlsx ? styles.xlsx : styles.pdf}`}
      />
      <span className={styles.keyText}>{text}</span>
      <div className={styles.keyActions}>
        <button title="View" className={styles.iconBtn} aria-label="view">
          <i className="fa-regular fa-eye" />
        </button>
        <button title="Download" className={styles.iconBtn} aria-label="download">
          <i className="fa-solid fa-download" />
        </button>
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
  const statusClass =
    status.toLowerCase() === "resolved" ? styles.resolved : styles.open;

  return (
    <div className={styles.ticketRow}>
      <span className={styles.ticketTitle}>{title}</span>
      <span className={`${styles.chip} ${statusClass}`}>{status}</span>
    </div>
  );
}

// PROPERTY CARD
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

function DashBoardAdmin() {
  const { user } = useContext(AuthContext);   // 🔐 current logged-in user

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to safely get photo url from JSON
  const getPropertyPhoto = (prop) => {
    if (Array.isArray(prop.photos) && prop.photos.length > 0) {
      if (
        typeof prop.cover_photo_index === "number" &&
        prop.photos[prop.cover_photo_index]
      ) {
        return prop.photos[prop.cover_photo_index];
      }
      return prop.photos[0];
    }
    return "/public/image 68.png";
  };

  useEffect(() => {
    // agar user hi nahi mila to kuch mat dikhao / ya message dikhao
    if (!user) {
      setLoading(false);
      setProperties([]);
      return;
    }

    // yahan se actual owner id nikalo (jis naam se tum store kar rahe ho)
    const ownerId = user.owner_id ?? user.id ?? user.userId ?? null;

    async function fetchProperties() {
      try {
        const res = await axios.get(
          "https://townmanor.ai/api/ovika/properties"
        );

        let all = [];
        if (res.data && Array.isArray(res.data.data)) {
          all = res.data.data;
        } else {
          console.error("Invalid properties response format:", res.data);
        }

        // 🔐 sirf is owner ki properties
        const filtered = ownerId
          ? all.filter((p) => String(p.owner_id) === String(ownerId))
          : all;

        setProperties(filtered);
      } catch (error) {
        console.error("Failed to load properties:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [user]);

  if (!user) {
    return (
      <div className={styles.page}>
        <main className={styles.grid}>
          <section>
            <h3 className={styles.sectionTitle}>My Properties</h3>
            <p>Please log in to view your properties.</p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Topbar */}
      <div className={styles.topbar}></div>

      {/* Hero */}
      <section className={styles.hero}>
        <img
          className={styles.heroBg}
          src="/public/Group 89.png"
          alt="hero background"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>
            Let&apos;s Ovika Renovate and Manage
            <br />
            Your Property
          </h1>
          <p>
            Maximize your rental income with zero hassle. We handle everything
            from renovation to tenant management.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className={styles.grid}>
        <section>
          <h3 className={styles.sectionTitle}>My Properties</h3>

          {loading && <p>Loading properties...</p>}

          <div className={styles.properties}>
            {!loading &&
              properties.map((prop) => {
                const name = prop.property_name || "Untitled Property";

                const locationParts = [prop.city, prop.country].filter(Boolean);
                const location =
                  locationParts.join(", ") || "Location not specified";

                const detailsPieces = [];
                if (prop.property_type) detailsPieces.push(prop.property_type);
                if (prop.bedrooms !== null && prop.bedrooms !== undefined)
                  detailsPieces.push(`${prop.bedrooms} BR`);
                if (prop.bathrooms !== null && prop.bathrooms !== undefined)
                  detailsPieces.push(`${prop.bathrooms} BA`);
                if (prop.max_guests !== null && prop.max_guests !== undefined)
                  detailsPieces.push(`Up to ${prop.max_guests} guests`);

                const details = detailsPieces.join(" • ");

                const priceText = prop.price
                  ? `₹${prop.price.toLocaleString("en-IN")} / night`
                  : "";

                const photoUrl = getPropertyPhoto(prop);

                return (
                  <PropertyCard
                    key={prop.id}
                    photoUrl={photoUrl}
                    name={name}
                    location={location}
                    details={details}
                    priceText={priceText}
                  />
                );
              })}

            {!loading && properties.length === 0 && (
              <p>No properties found for your account yet.</p>
            )}
          </div>
        </section>

        <aside className={styles.rightCol}>
          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Key Document</h4>
            <div className={styles.keyList}>
              <KeyItem text="Lease Agreement - Unit 4B.pdf" filetype="pdf" />
              <KeyItem text="Renovation Quote.pdf" filetype="pdf" />
              <KeyItem
                text="Monthly P&L Statement.xlsx"
                filetype="xlsx"
              />
            </div>
          </div>

          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Messages</h4>
            <MessageItem
              initials="G"
              name="Georgia"
              note="The sink in Apt 4B is leaking"
            />
            <MessageItem
              initials="H"
              name="Heemant"
              note="Your monthly statement is ready"
            />
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

export default DashBoardAdmin;
