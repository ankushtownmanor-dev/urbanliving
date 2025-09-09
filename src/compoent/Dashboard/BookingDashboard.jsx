import React from "react";
import {
  FaStar,
  FaTicketAlt,
  FaCircle,
  FaComments,
  FaPhone,
  FaQuestionCircle,
  FaBell,
} from "react-icons/fa";
import "./BookingDashboard.css";

const BookingDashboard = () => {
  return (
    <div className="booking-container">

      {/* Booking Overview */}
      <h3 className="section-title">Booking Overview</h3>
      <div className="card-row">
        <div className="card">
          <img src="/dicon.png" alt="upcoming" />
          <p className="card-title">Upcoming Booking:</p>
          <h4 className="card-subtitle">Cozy Cabins</h4>
          
        </div>
        <div className="card">
          <img src="/dicon3.png" alt="completed" />
          <p className="card-title">Completed :</p>
          <h4 className="card-subtitle">Modern Apartment</h4>
        </div>
        <div className="card">
          <img src="/dicon2.png" alt="canceled" />
          <p className="card-title">Canceled Booking:</p>
          <h4 className="card-subtitle">Luxury Villa</h4>
        </div>
      </div>

      {/* Rewards */}
      <h3 className="section-title">Rewards & Coupons</h3>
      <div className="reward-row">
        <div className="reward-card">
          <div> <FaStar className="reward-icon" color="#f9d923" /></div>
         <div className="reward-content"><p className="reward-text">Earned Points</p>
          <h2 className="reward-value">1,240</h2>
          <span className="reward-status">+150%</span></div>
          
        </div>
        <div className="reward-card">
            <div><FaTicketAlt className="reward-icon" color="#ff6f61" /></div>
          <div className="reward-content">  <p className="reward-text">Available Coupons</p>
          <h2 className="reward-value">3</h2>
          <span className="reward-status">+100%</span></div>
        
        </div>
      </div>

      {/* Progress */}
      <div className="progress-section">
        <p>Next Reward</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: "65%" }}></div>
        </div>
        <p className="progress-text">650/1000 Points</p>
        <div id="redeem"> <button className="redeem-btn">Redeem rewards</button></div>
       
      </div>

      {/* Notification */}
      <h3 className="section-title">Notification</h3>
      <div className="notification">
        <FaBell className="dot" color="#6E0B0C" size={30} />
        <div className="notification-content">
          <b>Exclusive offer:</b> 20% off on your next Stay.
          <p>Expires in 7 Days.</p>
        </div>
      </div>
      <div className="notification">
      <FaBell className="dot" color="#6E0B0C" size={30} />
      <div className="notification-content">
          <b>Upcoming Stays:</b> Cozy Cabins.
          <p>Reminder check-in Tomorrow.</p>
        </div>
      </div>
      <div className="notification">
      <FaBell className="dot" color="#6E0B0C" size={30} />
      <div className="notification-content">
          <b>TM updates</b>
          <p>Check what is new.</p>
        </div>
      </div>

      {/* Trips */}
      <div className="trip-gallery">
        <img src="/b1.jpeg" alt="trip1" />
        <img src="/b2.jpg" alt="trip2" />
        <img src="/b3.jpeg" alt="trip3" />
        <img src="/b4.jpg" alt="trip4" />
        <img src="/b5.jpg" alt="trip5" />
      </div>
      <div className="trip-text">
        <h4>No trips booked.... yet!</h4>
        <p>
          Time to dust off your bags and start planning your next stay, we have
          a world of destinations waiting for you.
        </p>
        <button className="start-btn">Start Searching</button>
      </div>

      {/* Support */}
      <div className="support">
        <div className="support-item">
          <FaQuestionCircle />
          <p>FAQ</p>
        </div>
        <div className="support-item">
          <FaComments />
          <p>Chat with support</p>
        </div>
        <div className="support-item">
          <FaPhone />
          <p>Call Us</p>
        </div>
      </div>
    </div>
  );
};

export default BookingDashboard;