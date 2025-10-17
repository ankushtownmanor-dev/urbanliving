

// Dashboard.jsx (CSS Modules version)
import React from "react";
import styles from "./Dashboard.module.css";

// Small UI atoms
function KeyItem({ text, filetype = "pdf" }) {
  return (
    <div className={styles.keyItem}>
      <span
        className={`${styles.keyDot} ${
          filetype === "xlsx" ? styles.xlsx : styles.pdf
        }`}
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

function PropertyCard({ img, title, subtitle }) {
  return (
    <div className={styles.propertyCard}>
      <img src={img} alt={title} />
      <div className={styles.propertyMeta}>
        <div className={styles.propertyTitle}>{title}</div>
        <div className={styles.propertySubtitle}>{subtitle}</div>
      </div>
    </div>
  );
}

 function DashBoardAdmin() {
  return (
    <div className={styles.page}>
      {/* Topbar */}
      <div className={styles.topbar}>
        <button className={styles.profileDot} aria-label="profile" />
      </div>

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

          <div className={styles.properties}>
            <PropertyCard
              img="/public/image 71.png"
              title="123 main St. Apt 4B"
              subtitle="Under Renovation"
            />
            <PropertyCard
              img="/public/image 68.png"
              title="H-27, 3rd Floor, Near Fortis Hospital"
              subtitle="Rented"
            />
            <PropertyCard
              img="/public/image 70.png"
              title="Flat No. 703, Paras Tirea Society"
              subtitle="Renovation | In progress"
            />
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

      {/* Bottom tiny help dot */}
      <button className={styles.helpFab} aria-label="help" />
    </div>
  );
}

export default DashBoardAdmin