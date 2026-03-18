import React, { useEffect, useState } from 'react';

const OvikaVerified = () => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://www.townmanor.ai/api/formlead/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone_number: formData.phone,
          purpose: "Property Verification Request",
          source: "OvikaVerified Page"
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '120px auto 60px',
      padding: '40px',
      background: '#fff',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      fontFamily: '"Poppins", sans-serif',
      lineHeight: '1.8',
      color: '#333'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img 
          src="/ovikaver.png" 
          alt="OvikaLiving Verified" 
          style={{ width: '350px', height: 'auto', marginBottom: '0' }} 
        />
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:"-84px"
        }}>
          OvikaLiving Verified <span style={{ color: '#4CAF50' }}>✓</span>
        </h1>
      </div>

      <div style={{ fontSize: '18px', textAlign: 'center', marginBottom: '40px' }}>
        Properties with this badge are <span style={{ fontWeight: '700', color: '#b62305' }}>physically verified by our team</span>, 
        ensuring genuine listings, accurate details, and trusted stays.
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '40px 0' }} />

      <div style={{ display: 'grid', gap: '30px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ 
            minWidth: '50px', height: '50px', borderRadius: '50%', 
            background: '#fef2f2', color: '#b62305',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', fontWeight: '700'
          }}>1</div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Physical Inspection</h3>
            <p style={{ color: '#666' }}>Our team visits each property in person to verify its location, amenities, and overall condition. We ensure what you see online is exactly what you get when you arrive.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ 
            minWidth: '50px', height: '50px', borderRadius: '50%', 
            background: '#fef2f2', color: '#b62305',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', fontWeight: '700'
          }}>2</div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Genuine Listings</h3>
            <p style={{ color: '#666' }}>We confirm the existence of the property and its ownership details to protect you from fraudulent listings and ensure a safe booking experience.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ 
            minWidth: '50px', height: '50px', borderRadius: '50%', 
            background: '#fef2f2', color: '#b62305',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', fontWeight: '700'
          }}>3</div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Accurate Details</h3>
            <p style={{ color: '#666' }}>From the number of bedrooms to the availability of Wi-Fi and power backup, every detail has been checked and confirmed by our verification Team.</p>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <img 
                src="/verifyimage.png" 
                alt="Verification process" 
                style={{ width: '100%', maxWidth: '700px', borderRadius: '12px', border: '1px solid #eee' }} 
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '60px', 
        padding: '40px', 
        background: '#fff9f9', 
        borderRadius: '20px',
        border: '1px solid #fef2f2',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px', color: '#b62305' }}>Book for Verification Badge</h2>
        <p style={{ marginBottom: '30px', color: '#555' }}>Want to get your property verified? Submit your details or contact us directly.</p>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{ padding: '12px 20px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }}
            />
            <input 
              type="tel" 
              placeholder="Mobile Number" 
              pattern="[0-9]{10}"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={{ padding: '12px 20px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }}
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ 
                padding: '12px', 
                borderRadius: '10px', 
                border: 'none', 
                background: '#b62305', 
                color: '#fff', 
                fontSize: '18px', 
                fontWeight: '600', 
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        ) : (
          <div style={{ color: '#4CAF50', fontWeight: '600', fontSize: '18px' }}>
            Thank you! Our verification team will contact you soon.
          </div>
        )}

        <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
          <p style={{ marginBottom: '10px', fontSize: '16px' }}>Directly connect with our experts:</p>
          <a 
            href="https://wa.me/919319392227" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              color: '#25D366', 
              fontSize: '22px', 
              fontWeight: '700', 
              textDecoration: 'none' 
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.499-5.688-1.447l-6.309 1.655zm6.357-3.872l.45.267c1.535.911 3.424 1.393 5.362 1.394 5.42 0 9.831-4.411 9.833-9.832.001-2.628-1.023-5.098-2.883-6.958-1.859-1.86-4.329-2.885-6.958-2.885-5.421 0-9.831 4.411-9.834 9.832-.001 1.942.573 3.834 1.66 5.463l.293.438-1.096 4.008 4.102-1.077zm9.435-6.578c-.244-.121-1.442-.711-1.666-.793-.223-.081-.386-.121-.548.121-.162.243-.629.793-.771.954-.142.162-.284.182-.528.061-.243-.122-1.026-.378-1.953-1.206-.721-.643-1.208-1.437-1.35-1.68-.142-.243-.015-.375.106-.496.11-.11.244-.284.366-.425s.162-.243.244-.405c.081-.162.04-.304-.02-.425s-.548-1.319-.751-1.808c-.198-.476-.399-.411-.548-.419-.142-.007-.304-.008-.466-.008s-.426.061-.649.304c-.223.243-.853.832-.853 2.029s.872 2.35 1.015 2.532c.142.182 1.716 2.62 4.156 3.673.58.253 1.033.404 1.387.517.583.185 1.113.159 1.533.096.468-.07 1.442-.589 1.646-1.159.203-.57.203-1.056.142-1.157-.061-.101-.223-.162-.466-.283z" />
            </svg>
            9319392227
          </a>
        </div>
      </div>
    </div>
  );
};

export default OvikaVerified;
