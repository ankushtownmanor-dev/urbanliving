import React from 'react';
import './owners-ovika.css';

export default function OwnersSection() {
  return (
    <section className="owners-ovika section">
      <div className="owners-ovika container">
        {/* Top intro block */}
        <div className="owners-ovika intro">
          <h2 className="owners-ovika h2">Loved by Property Owners</h2>
          <p className="owners-ovika lead">
            {/* With the Ovika Owner Dashboard, you stay in control — anytime, anywhere. Our
            smart dashboard lets you track renovation progress, monitor tenant details, view
            rental income, and check your profit share in real time. From listing updates to
            maintenance requests, everything is organized in one simple, intuitive platform.
            Managing your property has never been this transparent and hassle‑free — we
            handle the work, and you stay informed. */}
            With the Ovīka Owner Dashboard, you stay informed while we manage everything.
Our transparent, commission-based system keeps you updated on every step — from tenant verification to rent payouts.

Track your property’s performance, monitor occupancy, view earnings in real time, and see how your home is being cared for — all in one smart dashboard.
Managing your rental business has never been this simple — we handle the work, you enjoy the returns.
          </p>

          <button className="owners-ovika cta">
            Check out process
            <span className="owners-ovika ctaArrow">›</span>
          </button>
        </div>

        {/* Divider space */}
        <div className="owners-ovika spacer" />

        {/* Testimonials header */}
        <div className="owners-ovika testimonialsHead">
          <h2 className="owners-ovika h2">Trusted by Homeowners Across Cities</h2>
          <p className="owners-ovika sub">Real stories from partners who earn stress-free with Ovika</p>
        </div>

        {/* Testimonials grid */}
        <div className="owners-ovika grid">
          {/* Card 1 */}
          <article className="owners-ovika review">
            <div className="owners-ovika row">
              <img
                className="owners-ovika avatar"
                src="https://i.pravatar.cc/80?img=12"
                alt="Anil Kumar"
                loading="lazy"
                decoding="async"
              />
              <div>
                <div className="owners-ovika name">Anil Kumar</div>
                <div className="owners-ovika meta">1 month ago</div>
                <div className="owners-ovika stars">★★★★★</div>
              </div>
            </div>
            <p className="owners-ovika body">
              I had an old flat sitting unused for years. The Ovika team renovated it
              beautifully — it looks brand new! They handled everything from design to
              renting, and now I get regular monthly income without any stress. Totally worth
              trusting their process.
            </p>
          </article>

          {/* Card 2 */}
          <article className="owners-ovika review">
            <div className="owners-ovika row">
              <img
                className="owners-ovika avatar"
                src="https://i.pravatar.cc/80?img=32"
                alt="Anshula Kapoor"
                loading="lazy"
                decoding="async"
              />
              <div>
                <div className="owners-ovika name">Anshula Kapoor</div>
                <div className="owners-ovika meta">2 month ago</div>
                <div className="owners-ovika stars">★★★★★</div>
              </div>
            </div>
            <p className="owners-ovika body">
              I was skeptical at first, but Ovika’s transparent process won me over. Their
              renovation team completely transformed my property, and within weeks it was
              rented out. I just receive my profit share every month. Smooth and professional
              experience!
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}