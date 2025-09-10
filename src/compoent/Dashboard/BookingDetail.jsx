import React, { useState, useEffect } from "react";
import "./Dashboard.css";

function BookingDetail() {
  const [showMore, setShowMore] = useState(false);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load user from localStorage
    try {
      const raw = localStorage.getItem("user");
      console.log(raw)
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }, []);

  useEffect(() => {
    // Fetch bookings when user is available
    const fetchBookings = async () => {
      if (!user?.id) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://townmanor.ai/api/booking/user/${user.id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data?.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("Error fetching bookings", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      const res = await fetch(`https://townmanor.ai/api/booking/${bookingId}/cancel`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, user_id: user?.id }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data?.success) {
        throw new Error(data?.message || "Cancel failed");
      }
      // Update local state on success
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, cancelled: 1, booking_status: "cancelled" } : b))
      );
      alert(data.message || "Booking cancelled successfully.");
    } catch (e) {
      console.error("Failed to cancel booking", e);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <>
      <div className="dashboard-booking-section">
        <h2 className="dashboard-booking-heading">Booking Details</h2>

        {loading && <p>Loading bookings...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && bookings.length === 0 && (
          <p>No bookings found.</p>
        )}

        {!loading && !error && bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <p><strong>Property:</strong> {b?.property_name || "N/A"}</p>
            <p><strong>Address:</strong> {b?.property_address || "N/A"}</p>
            <p><strong>Price:</strong> ₹{b?.price != null && !isNaN(Number(b.price)) ? Number(b.price).toFixed(2) : "N/A"}</p>
            <p>
              <strong>Stay:</strong>{" "}
              {b?.start_date ? new Date(b.start_date).toLocaleDateString() : "N/A"} - {b?.end_date ? new Date(b.end_date).toLocaleDateString() : "N/A"}
            </p>
            <p><strong>Status:</strong> {b?.booking_status || (b?.cancelled ? "cancelled" : "N/A")}</p>

            {showMore && (
              <div className="booking-more-details">
                <p><strong>Booked By:</strong> {b?.username || "N/A"}</p>
                <p><strong>Phone:</strong> {b?.phone_number || "N/A"}</p>
                <p><strong>Phone Verified:</strong> {b?.phone_verified ? "Yes" : "No"}</p>
                <p><strong>Aadhar:</strong> {b?.aadhar_number || "N/A"}</p>
                <p><strong>Aadhar Verified:</strong> {b?.aadhar_verified ? "Yes" : "No"}</p>
                <p><strong>Terms Accepted:</strong> {b?.terms_verified ? "Yes" : "No"}</p>
                <p><strong>Cancelled:</strong> {b?.cancelled ? "Yes" : "No"}</p>
                <p><strong>Created:</strong> {b?.created_at ? new Date(b.created_at).toLocaleString() : "N/A"}</p>
                <p><strong>Updated:</strong> {b?.updated_at ? new Date(b.updated_at).toLocaleString() : "N/A"}</p>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button
                className="booking-more-btn"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Hide Information" : "More Information"}
              </button>
              {!(b.cancelled || b.booking_status === "cancelled") && (
                <button
                  className="booking-more-btn"
                  style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
                  onClick={() => cancelBooking(b.id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default BookingDetail