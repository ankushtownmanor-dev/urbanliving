import React, { useState } from 'react';
import './FAQ.css';

const data = [
  {
    q: 'Who can list their property on Ovika?',
    a:
      "Any property owner - Whether you have an apartment, villa or studio - can list it on Ovika. Our Platform is open to homeownwers, landloards and agents" },
  {
    q: 'How do I list my property?',
    a:
      'Simply sign up on Ovika, fill in your property details, upload photos, set your rent or price and publish your listing. It takes just a few minutes',
  },
  {
    q: 'Is there any cost to list my property??',
    a:
      'Listing your property on Ovīka is free. You can later choose premium visibility or management options if you want faster results.',
  },
  {
    q: 'How do I find tenants through Ovīka?',
    a:
      'Once your property is listed, verified tenants can contact you directly through the platform. You can manage inquiries, schedule visits, and finalize rentals securely.',
  },



  {
    q: 'Can Ovīka help manage my property after listing?',
    a:
      'Yes! If you opt for our property management services, Ovīka can handle tenant screening, rent collection, and maintenance on your behalf.',
  },
  {
    q: 'Do I retain full ownership of my property?',
    a:
      'Absolutely. You remain the sole owner of your property at all times. Ovīka only facilitates listings and management — ownership never transfers.',
  },
  {
    q: 'How long does my property stay listed?',
    a:
      'Your listing remains active as long as you choose. You can pause or update your listing anytime from your dashboard.',
  },
];

export default function FAQOvika() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq-ovika section">
      <div className="faq-ovika container">
        <h2 className="faq-heading">Frequently asked questions</h2>

        <div className="faq-ovika list">
          {data.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-ovika item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-ovika-question"
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
                  <div className="faq-answer">
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