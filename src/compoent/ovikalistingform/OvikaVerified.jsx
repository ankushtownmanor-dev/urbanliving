import React, { useEffect } from 'react';

const OvikaVerified = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          // gap: '10px',
          // margin: '0'
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
                style={{ width: '100%', maxWidth: '700px', borderRadius: '12px', border: '1px solid #eee' ,marginLeft:'-67px'}} 
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '60px', 
        padding: '30px', 
        background: '#f9f9f9', 
        borderRadius: '15px',
        textAlign: 'center'
      }}>
        <p style={{ fontWeight: '500' }}>Stay with confidence. Choose OvikaLiving Verified properties for a premium and reliable stay experience.</p>
      </div>
    </div>
  );
};

export default OvikaVerified;
