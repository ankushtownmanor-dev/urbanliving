import React, { useState } from 'react';
import './faq-ovika.css';

const data = [
  {
    q: 'Who manages my property on OVIKA?',
    a:
      'OVIKA provides end-to-end hosting management. From listing creation and pricing to guest communication, check-in support, cleaning coordination, and issue handling — everything is managed by our professional team.',
  },
  {
    q: 'Do I need to handle guest communication or bookings?',
    a:
      'No. OVIKA handles all guest interactions including inquiries, booking confirmations, check-in assistance, and ongoing support during the stay.',
  },
  {
    q: 'How is pricing decided for my property?',
    a:
      'Pricing is optimized by OVIKA based on location, demand, seasonality, and comparable listings. You always have full visibility and control, and pricing can be reviewed or adjusted as needed.',
  },
  {
    q: 'How do I receive my earnings?',
    a:
      'Your earnings are settled on a regular payout cycle and transferred directly to your registered bank account after successful guest stays, as per the agreed payout schedule.',
  },
  {
    q: 'Do I retain full ownership and control of my property?',
    a:
      'Yes. You retain 100% ownership of your property. OVIKA only manages the hosting operations — you can pause availability or stop hosting anytime.',
  },
  {
    q: 'How are guests verified?',
    a:
      'All guests go through ID verification and booking validation before confirmation. OVIKA ensures only verified guests are allowed to stay at your property.',
  },
  {
    q: 'What about cleaning, maintenance, or damages?',
    a:
      'OVIKA coordinates professional cleaning after every stay. Any maintenance or damage issues are promptly reported and handled as per agreed policies, ensuring your property remains well maintained.',
  },
  {
    q: 'Can I block dates for personal use?',
    a:
      'Yes. You can block dates anytime through your owner dashboard, giving you complete flexibility to use your property whenever you want.',
  },
  {
    q: 'Is hosting really hassle-free with OVIKALIVING?',
    a:
      'Absolutely. From onboarding to payouts, OVIKA manages everything — so you enjoy passive income without daily operational stress.',
  }
];

export default function FAQOvika() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq-ovika section">
      <div className="faq-ovika container">
        <h2  className="faq-ovika-heading-ownerpage">Frequently asked questions</h2>

        <div className="faq-ovika list">
          {data.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-ovika item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-ovika-question-newup"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  {/* Chevron icon via JSX (can swap with <img src="..." />) */}
                  <svg
                    className={`faq-ovika chevron ${isOpen ? 'rot' : ''}`}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="faq-ovika answer">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}