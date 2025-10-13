import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Anil Kumar",
      time: "1 month ago",
      rating: 5,
      image: "/public/r1.png",
      text: "I had an old flat sitting unused for years. The Ovika team renovated it beautifully — it looks brand new! They handled everything from design to renting, and now I get regular monthly income without any stress. Totally worth trusting their process."
    },
    {
      name: "Anshula Kapoor",
      time: "2 month ago",
      rating: 5,
      image: "/public/r4.png",
      text: "I was skeptical at first, but Ovika's transparent process won me over. Their renovation team completely transformed my property, and within weeks it was rented out. I just receive my profit share every month. Smooth and professional experience!"
    },
     {
      name: "",
      time: "",
      rating: ,
      image: "",
      text: ""
    }
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '80px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: '550',
          textAlign: 'center',
          marginBottom: '8px',
          color: '#000',
          letterSpacing: '-0.5px'
        }}>
          Loved by property owners
        </h2>
        <p style={{
          textAlign: 'center',
          fontSize: '18px',
          color: '#666',
          marginBottom: '60px',
          fontWeight: '400'
        }}>
          Real stories from partner who trusts Ovika
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '40px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={{
              backgroundColor: '#fff',
              padding: '0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '20px'
              }}>
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '20px'
                  }}
                />
                <div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    margin: '0 0 4px 0',
                    color: '#000'
                  }}>
                    {testimonial.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    margin: '0 0 8px 0'
                  }}>
                    {testimonial.time}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '2px'
                  }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} style={{
                        color: '#FF0000',
                        fontSize: '16px'
                      }}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#333',
                margin: '0'
              }}>
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;