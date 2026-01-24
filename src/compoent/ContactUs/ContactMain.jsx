import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactMain = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone && formData.message) {
      alert('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      alert('Please fill all required fields');
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', 'Arial', sans-serif", background: '#f8f9fa' }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #C8965F 0%, #A67843 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>
        <h1 style={{ 
          fontSize: '48px', 
          margin: '0 0 15px 0', 
          fontWeight: '700',
          position: 'relative',
          zIndex: 1,
          letterSpacing: '1px'
        }}>Get In Touch</h1>
        <p style={{ 
          fontSize: '20px', 
          margin: 0, 
          opacity: 0.95,
          position: 'relative',
          zIndex: 1,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>We'd love to hear from you. Reach out to us for any queries!</p>
      </div>

      {/* Map Section in Card */}
      <div style={{
        maxWidth: '1400px',
        margin: '-50px auto 60px',
        padding: '0 20px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          height: '500px'
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.694774142383!2d77.36040731508097!3d28.568851082442856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5456d11b54f%3A0x65da969aa8a715c!2sEldeco%20Edge%2C%20Sector%2093A%2C%20Noida%2C%20Uttar%20Pradesh%20201304!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Office Location"
          />
        </div>
      </div>

      {/* Contact Info Cards */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 60px',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {/* Address Card */}
          <div style={{
            background: 'white',
            padding: '35px 25px',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '2px solid transparent'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(200, 150, 95, 0.2)';
            e.currentTarget.style.borderColor = '#C8965F';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
            e.currentTarget.style.borderColor = 'transparent';
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #C8965F 0%, #A67843 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <MapPin size={32} color="white" strokeWidth={2.5} />
            </div>
            <h3 style={{ 
              color: '#333', 
              fontSize: '22px', 
              margin: '0 0 12px 0',
              fontWeight: '600'
            }}>Our Office</h3>
            <p style={{ 
              color: '#666', 
              fontSize: '15px', 
              lineHeight: '1.7', 
              margin: 0 
            }}>
              ST-304, Eldeco Studio,<br />
              Sector 93A, Noida,<br />
              Uttar Pradesh, India<br />
              PIN - 201304
            </p>
          </div>

          {/* Phone Card */}
          <div style={{
            background: 'white',
            padding: '35px 25px',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '2px solid transparent'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(200, 150, 95, 0.2)';
            e.currentTarget.style.borderColor = '#C8965F';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
            e.currentTarget.style.borderColor = 'transparent';
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #C8965F 0%, #A67843 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Phone size={32} color="white" strokeWidth={2.5} />
            </div>
            <h3 style={{ 
              color: '#333', 
              fontSize: '22px', 
              margin: '0 0 12px 0',
              fontWeight: '600'
            }}>Call Us</h3>
            <p style={{ 
              color: '#666', 
              fontSize: '15px', 
              margin: '8px 0',
              fontWeight: '500'
            }}>
              +91-0120-4420450
            </p>
            <p style={{ 
              color: '#666', 
              fontSize: '15px', 
              margin: '8px 0',
              fontWeight: '500'
            }}>
              +91-7042888903
            </p>
            <p style={{ 
              color: '#999', 
              fontSize: '13px', 
              margin: '12px 0 0 0',
              fontStyle: 'italic'
            }}>
              Technical Support: 9319392227
            </p>
          </div>

          {/* Email Card */}
          <div style={{
            background: 'white',
            padding: '35px 25px',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '2px solid transparent'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(200, 150, 95, 0.2)';
            e.currentTarget.style.borderColor = '#C8965F';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
            e.currentTarget.style.borderColor = 'transparent';
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #C8965F 0%, #A67843 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Mail size={32} color="white" strokeWidth={2.5} />
            </div>
            <h3 style={{ 
              color: '#333', 
              fontSize: '22px', 
              margin: '0 0 12px 0',
              fontWeight: '600'
            }}>Email Us</h3>
            <p style={{ 
              color: '#666', 
              fontSize: '15px', 
              margin: '8px 0',
              fontWeight: '500',
              wordBreak: 'break-word'
            }}>
              enquiry@ovikaliving.com
            </p>
            <p style={{ 
              color: '#999', 
              fontSize: '13px', 
              margin: '12px 0 0 0',
              fontStyle: 'italic'
            }}>
              We'll respond within 24 hours
            </p>
          </div>

          {/* Working Hours Card */}
          <div style={{
            background: 'white',
            padding: '35px 25px',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '2px solid transparent'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(200, 150, 95, 0.2)';
            e.currentTarget.style.borderColor = '#C8965F';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
            e.currentTarget.style.borderColor = 'transparent';
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #C8965F 0%, #A67843 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Clock size={32} color="white" strokeWidth={2.5} />
            </div>
            <h3 style={{ 
              color: '#333', 
              fontSize: '22px', 
              margin: '0 0 12px 0',
              fontWeight: '600'
            }}>Working Hours</h3>
            <p style={{ 
              color: '#666', 
              fontSize: '15px', 
              margin: '8px 0',
              fontWeight: '500'
            }}>
              Mon - Fri: 9:00 AM - 6:00 PM
            </p>
            <p style={{ 
              color: '#666', 
              fontSize: '15px', 
              margin: '8px 0',
              fontWeight: '500'
            }}>
              Saturday: 9:00 AM - 2:00 PM
            </p>
            <p style={{ 
              color: '#999', 
              fontSize: '13px', 
              margin: '12px 0 0 0',
              fontStyle: 'italic'
            }}>
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 100px',
        padding: '0 20px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <h2 style={{
            color: '#333',
            fontSize: '42px',
            marginBottom: '15px',
            fontWeight: '700'
          }}>Send Us a Message</h2>
          <p style={{
            color: '#666',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '50px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          {/* Name and Email Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px',
            marginBottom: '25px'
          }}>
            <div>
              <label style={{
                display: 'block',
                color: '#333',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '10px'
              }}>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', 'Arial', sans-serif"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#C8965F';
                  e.target.style.boxShadow = '0 0 0 4px rgba(200, 150, 95, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e8e8e8';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#333',
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '10px'
              }}>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', 'Arial', sans-serif"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#C8965F';
                  e.target.style.boxShadow = '0 0 0 4px rgba(200, 150, 95, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e8e8e8';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              color: '#333',
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '10px'
            }}>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 1234567890"
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '2px solid #e8e8e8',
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
                fontFamily: "'Poppins', 'Arial', sans-serif"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#C8965F';
                e.target.style.boxShadow = '0 0 0 4px rgba(200, 150, 95, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8e8e8';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Message */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              color: '#333',
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '10px'
            }}>Your Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your query..."
              rows="6"
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '2px solid #e8e8e8',
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s',
                resize: 'vertical',
                fontFamily: "'Poppins', 'Arial', sans-serif",
                boxSizing: 'border-box',
                minHeight: '150px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#C8965F';
                e.target.style.boxShadow = '0 0 0 4px rgba(200, 150, 95, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8e8e8';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '18px',
              background: 'linear-gradient(135deg, #C8965F 0%, #A67843 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '17px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(200, 150, 95, 0.3)',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 10px 30px rgba(200, 150, 95, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 20px rgba(200, 150, 95, 0.3)';
            }}
          >
            Send Message →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactMain;