import React, { useState, useEffect } from "react";

function BookingDetail() {
  const [showMoreId, setShowMoreId] = useState(null);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= LOAD USER ================= */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      }
    } catch (e) {
      console.error("Failed to parse user", e);
    }
  }, []);

  /* ================= FETCH BOOKINGS ================= */
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.username) return;
      setLoading(true);
      setError("");

      try {
        // 1. Fetch all booking requests
        const bookingsRes = await fetch("https://www.townmanor.ai/api/booking-request");
        if (!bookingsRes.ok) throw new Error(`Bookings HTTP ${bookingsRes.status}`);
        const bookingsResult = await bookingsRes.json();

        let bookingsList = [];
        if (Array.isArray(bookingsResult)) bookingsList = bookingsResult;
        else if (Array.isArray(bookingsResult?.data)) bookingsList = bookingsResult.data;

        // 2. Fetch all properties to get accurate pricing
        const propsRes = await fetch("https://www.townmanor.ai/api/ovika/properties");
        if (!propsRes.ok) throw new Error(`Properties HTTP ${propsRes.status}`);
        const propsResult = await propsRes.json();
        const allProperties = Array.isArray(propsResult) ? propsResult : (propsResult?.data || []);

        // 3. Filter and enrich with property data
        const enrichedBookings = bookingsList
          .filter((b) => b.username === user.username)
          .map((b) => {
            // Find matched property
            const matchedProp = allProperties.find(p => String(p.id || p._id) === String(b.property_id));
            
            return {
              ...b,
              booking_status: b.status || "pending",
              // Use property API data if available, fallback to booking data
              property_name: matchedProp?.name || b.property_name || b.property?.name || "Unknown Property",
              property_address: matchedProp?.address || b.property_address || b.property?.address || "Address not available",
              // Use total_price from booking, or calculate if missing (nights * property_price)
              display_price: b.total_price || b.price || matchedProp?.price || 0
            };
          })
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setBookings(enrichedBookings);
      } catch (err) {
        console.error("Error fetching or enriching bookings", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  /* ================= CANCEL BOOKING ================= */
  const cancelBooking = async (booking) => {
    const bookingId = booking.id;
    const isPaid = booking.status === 'confirmed' || booking.status === 'paid' || booking.payment_status === 'paid' || booking.booking_status === 'confirmed' || booking.booking_status === 'paid';

    const confirmMsg = isPaid 
      ? "This booking is PAID. If you cancel, a refund will be processed according to our policy. Do you want to proceed with the cancellation request?"
      : "Are you sure you want to cancel this booking request?";

    const confirmCancel = window.confirm(confirmMsg);
    if (!confirmCancel) return;

    try {
      // Define status check
      const isActuallyPaid = isPaid || booking.status === 'confirmed' || booking.status === 'paid' || booking.payment_status === 'paid';
      
      // Consistent with Dashboard.jsx - point to booking-request for records found there
      const url = `https://www.townmanor.ai/api/booking-request/${bookingId}/cancel`;

      console.log(`Cancelling Booking ID: ${bookingId} at ${url}`);

      const res = await fetch(
        url,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            cancel_reason: isActuallyPaid ? "Cancellation of paid booking" : "Plan changed", 
          }),
        }
      );
      
      const data = await res.json();
      
      if (res.ok || data?.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId
              ? { ...b, cancelled: 1, status: "cancelled", booking_status: "cancelled" }
              : b
          )
        );
        alert(data.message || "Booking request cancelled successfully.");
      } else {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
    } catch (e) {
      console.error("Cancel failed", e);
      alert(`Error: ${e.message || "Failed to cancel booking."}`);
    }
  };

  /* ================= jsPDF LOADER ================= */
  const ensureJsPDF = (() => {
    let loaderPromise = null;
    return () => {
      if (window.jspdf?.jsPDF)
        return Promise.resolve(window.jspdf.jsPDF);

      if (loaderPromise) return loaderPromise;

      loaderPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";
        script.async = true;
        script.onload = () => resolve(window.jspdf.jsPDF);
        script.onerror = () =>
          reject(new Error("Failed to load jsPDF"));
        document.head.appendChild(script);
      });

      return loaderPromise;
    };
  })();

  const formatDate = (d) => {
    if (!d) return "N/A";
    const date = new Date(d);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
  };

  const formatDateTime = (d) => {
    if (!d) return "N/A";
    const date = new Date(d);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
  };

  /* ================= DOWNLOAD RECEIPT ================= */
  const downloadReceipt = async (b) => {
    try {
      const jsPDF = await ensureJsPDF();
      const doc = new jsPDF();

      // Add Logo (Top Left and Bottom Right)
      try {
        const logoUrl = '/ovika.png';
        const img = new Image();
        img.src = logoUrl;
        await new Promise((resolve, reject) => {
           img.onload = resolve;
           img.onerror = reject;
        });
        const logoRatio = img.width / img.height;
        const logoHeight = 32;
        const logoWidth = logoHeight * logoRatio;

        // Top Left
        doc.addImage(img, 'PNG', 20, 10, logoWidth, logoHeight);

        // Bottom Right
        doc.addImage(img, 'PNG', 190 - logoWidth, 255, logoWidth, logoHeight);
      } catch (e) {
        console.error("Logo load failed", e);
      }

      doc.setFontSize(22);
      doc.setTextColor(0, 0, 0); 
      doc.setFont(undefined, "bold");
      doc.text("Townmanor Technologies Pvt Ltd.", 105, 50, { align: "center" });
      
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.setFont(undefined, "normal");
      doc.text("Payment Receipt", 105, 58, { align: "center" });
      
      doc.setDrawColor(200, 200, 200);
      doc.line(15, 66, 195, 66);

      let y = 74;
      const x = 20;

      const row = (label, value) => {
        doc.setFont(undefined, "bold");
        doc.text(label, x, y);
        doc.setFont(undefined, "normal");
        doc.text(String(value ?? "N/A"), x + 60, y);
        y += 7;
      };

      row("Receipt ID:", `RCPT-${b.id}`);
      row("Booking ID:", b.id);
      row("Generated:", new Date().toLocaleString());
      y += 5;

      doc.setFont(undefined, "bold");
      doc.text("Customer Details", x, y);
      y += 7;
      row("Name:", b.username);
      row("Phone:", b.phone_number);
      y += 5;

      doc.setFont(undefined, "bold");
      doc.text("Property Details", x, y);
      y += 7;
      row("Property:", b.property_name);
      row("Address:", b.property_address);
      y += 5;

      doc.setFont(undefined, "bold");
      doc.text("Stay Details", x, y);
      y += 7;
      row("Check-in:", formatDate(b.start_date));
      row("Check-out:", formatDate(b.end_date));
      const nights = b.nights || 0;
      if (nights > 0) row("Nights:", nights);
      y += 5;

      doc.setFont(undefined, "bold");
      doc.text("Payment Details", x, y);
      y += 7;
      const subtotal = Number(b.display_price) || 0;
      const gst = subtotal > 0 ? (subtotal * 0.05) : 0;
      const finalTotal = subtotal + gst;

      row("Subtotal:", `Rs. ${subtotal.toFixed(2)}`);
      row("GST (5%):", `Rs. ${gst.toFixed(2)}`);
      row("Total Amount:", `Rs. ${finalTotal.toFixed(2)}`);
      
      const bStatus = (b.booking_status || "").toLowerCase();
      const st = (b.status || "").toLowerCase();
      const pStatus = (b.payment_status || "").toLowerCase();
      
      const isPaid = (
        bStatus === 'confirmed' || bStatus === 'paid' || bStatus === 'success' || bStatus === 'completed' ||
        st === 'confirmed' || st === 'paid' || st === 'success' || st === 'completed' ||
        pStatus === 'paid' || pStatus === 'success' || pStatus === 'completed' ||
        b.payment_id || b.txnid
      );
      
      row("Booking Status:", isPaid ? 'CONFIRMED' : (b.booking_status || b.status || "pending").toUpperCase());
      row("Created:", formatDateTime(b.created_at));

      doc.setFontSize(10);
      doc.text(
        "This is a system-generated receipt by OvikaLiving.com and does not require a manual signature",
        x,
        280
      );

      doc.save(`receipt-${b.id}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Failed to generate receipt");
    }
  };

  /* ================= INLINE STYLES ================= */
  const styles = {
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "24px",
      animation: "fadeIn 0.4s ease",
    },
    heading: {
      fontSize: "24px",
      fontWeight: 500,
      color: "#111827",
      marginBottom: "24px",
      letterSpacing: "-0.02em",
    },
    loadingText: {
      textAlign: "center",
      padding: "40px 20px",
      fontSize: "15px",
      color: "#6b7280",
    },
    errorText: {
      textAlign: "center",
      padding: "40px 20px",
      fontSize: "15px",
      color: "#dc2626",
      background: "#fef2f2",
      borderRadius: "12px",
      border: "1px solid #fee2e2",
    },
    emptyText: {
      textAlign: "center",
      padding: "40px 20px",
      fontSize: "15px",
      color: "#6b7280",
    },
    card: {
      background: "#ffffff",
      borderRadius: "16px",
      padding: "24px",
      marginBottom: "20px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.06)",
      transition: "all 0.3s ease",
    },
    table: {
      display: "flex",
      flexDirection: "column",
      gap: 0,
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      overflow: "hidden",
    },
    tableRow: {
      display: "grid",
      gridTemplateColumns: "180px 1fr",
      borderBottom: "1px solid #e5e7eb",
      transition: "background 0.2s ease",
    },
    tableRowLast: {
      display: "grid",
      gridTemplateColumns: "180px 1fr",
      transition: "background 0.2s ease",
    },
    tableLabel: {
      padding: "14px 18px",
      background: "#f9fafb",
      fontWeight: 500,
      fontSize: "14px",
      color: "#374151",
      borderRight: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
    },
    tableValue: {
      padding: "14px 18px",
      fontSize: "14px",
      color: "#111827",
      display: "flex",
      alignItems: "center",
      fontWeight: 400,
    },
    tableValuePrice: {
      padding: "14px 18px",
      fontSize: "16px",
      color: "#b60000",
      display: "flex",
      alignItems: "center",
      fontWeight: 600,
    },
    statusBadge: (status) => ({
      padding: "5px 14px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      background:
        status === "cancelled" || status === "rejected"
          ? "#fee2e2"
          : status === "pending"
          ? "#fef3c7"
          : (status === "confirmed" || status === "paid")
          ? "#d1fae5"
          : "#ecfdf5",
      color:
        status === "cancelled" || status === "rejected"
          ? "#991b1b"
          : status === "pending"
          ? "#92400e"
          : (status === "confirmed" || status === "paid")
          ? "#065f46"
          : "#15803d",
    }),
    moreInfoBox: {
      marginTop: "16px",
      padding: "16px",
      background: "#f9fafb",
      borderRadius: "12px",
      border: "1px dashed #d1d5db",
    },
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "6px 0",
      fontSize: "13px",
    },
    infoLabel: {
      fontWeight: 500,
      color: "#6b7280",
    },
    infoValue: {
      color: "#111827",
      fontWeight: 400,
    },
    actions: {
      display: "flex",
      gap: "12px",
      marginTop: "18px",
      flexWrap: "wrap",
    },
    btn: {
      padding: "11px 20px",
      borderRadius: "10px",
      border: "none",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.25s ease",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
      color: "#ffffff",
    },
    btnInfo: {
      background: "#6b7280",
    },
    btnDownload: {
      background: "#1677ff",
    },
    btnCancel: {
      background: "#dc2626",
    },
  };

  return (
    <>
      {/* ANIMATIONS & MEDIA QUERIES */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .booking-card:hover {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
          transform: translateY(-2px) !important;
        }

        .table-row-hover:hover {
          background: #f9fafb !important;
        }

        .btn-hover:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }

        .btn-info-hover:hover {
          background: #4b5563 !important;
        }

        .btn-download-hover:hover {
          background: #0958d9 !important;
        }

        .btn-cancel-hover:hover {
          background: #b91c1c !important;
        }

        @media (max-width: 768px) {
          .booking-container-mobile {
            padding: 16px !important;
          }

          .booking-heading-mobile {
            font-size: 20px !important;
          }

          .booking-card-mobile {
            padding: 18px !important;
          }
@media (max-width: 768px) {

  /* KEEP ROW IN SAME LINE */
  .table-row-mobile {
    grid-template-columns: 120px 1fr !important;
    align-items: right;
  }

  .table-label-mobile {
    background: transparent !important;
    border-right: none !important;
    font-size: 12px !important;
    color: #6b7280 !important;
    padding: 10px 12px !important;
  }

  .table-value-mobile {
    font-size: 13px !important;
    font-weight: 500 !important;
    color: #111827 !important;
    padding: 10px 12px !important;
    text-align: left;
  }

  /* PRICE STANDOUT */
  .table-value-mobile.table-value-small {
    font-weight: 600 !important;
  }

}


          .actions-mobile {
            flex-direction: column !important;
          }

          .btn-mobile {
            width: 100% !important;
            text-align: center !important;
          }

          .info-row-mobile {
            flex-direction: column !important;
            gap: 4px !important;
          }
        }

        @media (max-width: 480px) {
          .booking-heading-small {
            font-size: 18px !important;
          }

          .table-label-small,
          .table-value-small {
            font-size: 12px !important;
          }
        }
      `}</style>

      <div
        style={styles.container}
        className="booking-container-mobile"
      >
        <h2
          style={styles.heading}
          className="booking-heading-mobile booking-heading-small"
        >
          My Bookings
        </h2>

        {loading && (
          <p style={styles.loadingText}>Loading bookings...</p>
        )}
        {error && <p style={styles.errorText}>{error}</p>}

        {!loading && !error && bookings.length === 0 && (
          <p style={styles.emptyText}>No bookings found.</p>
        )}

        {!loading &&
          !error &&
          bookings.map((b) => (
            <div
              key={b.id}
              style={styles.card}
              className="booking-card booking-card-mobile"
            >
              {/* TABLE LAYOUT */}
              <div style={styles.table}>
                <div
                  style={styles.tableRow}
                  className="table-row-hover table-row-mobile"
                >
                  <div
                    style={styles.tableLabel}
                    className="table-label-mobile table-label-small"
                  >
                    Property
                  </div>
                  <div
                    style={styles.tableValue}
                    className="table-value-mobile table-value-small"
                  >
                    {b.property_name}
                  </div>
                </div>

                <div
                  style={styles.tableRow}
                  className="table-row-hover table-row-mobile"
                >
                  <div
                    style={styles.tableLabel}
                    className="table-label-mobile table-label-small"
                  >
                    Address
                  </div>
                  <div
                    style={styles.tableValue}
                    className="table-value-mobile table-value-small"
                  >
                    {b.property_address}
                  </div>
                </div>

                <div
                  style={styles.tableRow}
                  className="table-row-hover table-row-mobile"
                >
                  <div
                    style={styles.tableLabel}
                    className="table-label-mobile table-label-small"
                  >
                    Price
                  </div>
                  <div
                    style={styles.tableValuePrice}
                    className="table-value-mobile table-value-small"
                  >
                    ₹{Number(b.display_price || 0).toLocaleString('en-IN')}
                  </div>
                </div>

                <div
                  style={styles.tableRow}
                  className="table-row-hover table-row-mobile"
                >
                  <div
                    style={styles.tableLabel}
                    className="table-label-mobile table-label-small"
                  >
                    Check-in
                  </div>
                  <div
                    style={styles.tableValue}
                    className="table-value-mobile table-value-small"
                  >
                    {formatDate(b.start_date)}
                  </div>
                </div>

                <div
                  style={styles.tableRow}
                  className="table-row-hover table-row-mobile"
                >
                  <div
                    style={styles.tableLabel}
                    className="table-label-mobile table-label-small"
                  >
                    Check-out
                  </div>
                  <div
                    style={styles.tableValue}
                    className="table-value-mobile table-value-small"
                  >
                    {formatDate(b.end_date)}
                  </div>
                </div>

                <div
                  style={styles.tableRowLast}
                  className="table-row-hover table-row-mobile"
                >
                  <div
                    style={styles.tableLabel}
                    className="table-label-mobile table-label-small"
                  >
                    Status
                  </div>
                  <div
                    style={styles.tableValue}
                    className="table-value-mobile table-value-small"
                  >
                      <span
                        style={styles.statusBadge(b.booking_status)}
                      >
                        {b.booking_status === 'cancelled' ? 'CANCELLED' : (b.booking_status === 'confirmed' || b.booking_status === 'paid') ? 'PAYMENT COMPLETED' : b.booking_status?.toUpperCase()}
                      </span>
                  </div>
                </div>
              </div>

              {/* MORE INFO SECTION */}
              {showMoreId === b.id && (
                <div style={styles.moreInfoBox}>
                  <div
                    style={styles.infoRow}
                    className="info-row-mobile"
                  >
                    <span style={styles.infoLabel}>User:</span>
                    <span style={styles.infoValue}>
                      {b.username}
                    </span>
                  </div>
                  <div
                    style={styles.infoRow}
                    className="info-row-mobile"
                  >
                    <span style={styles.infoLabel}>Phone:</span>
                    <span style={styles.infoValue}>
                      {b.phone_number}
                    </span>
                  </div>
                  <div
                    style={styles.infoRow}
                    className="info-row-mobile"
                  >
                    <span style={styles.infoLabel}>Created:</span>
                    <span style={styles.infoValue}>
                      {formatDateTime(b.created_at)}
                    </span>
                  </div>
                  <div
                    style={styles.infoRow}
                    className="info-row-mobile"
                  >
                    <span style={styles.infoLabel}>Updated:</span>
                    <span style={styles.infoValue}>
                      {formatDateTime(b.updated_at)}
                    </span>
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div
                style={styles.actions}
                className="actions-mobile"
              >
                <button
                  style={{ ...styles.btn, ...styles.btnInfo }}
                  className="btn-hover btn-info-hover btn-mobile"
                  onClick={() =>
                    setShowMoreId(
                      showMoreId === b.id ? null : b.id
                    )
                  }
                >
                  {showMoreId === b.id ? "Hide Info" : "More Info"}
                </button>

                <button
                  style={{ ...styles.btn, ...styles.btnDownload }}
                  className="btn-hover btn-download-hover btn-mobile"
                  onClick={() => downloadReceipt(b)}
                >
                  Download Receipt
                </button>

                {b.booking_status !== "cancelled" && (
                  <button
                    style={{ ...styles.btn, ...styles.btnCancel }}
                    className="btn-hover btn-cancel-hover btn-mobile"
                    onClick={() => cancelBooking(b)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default BookingDetail;