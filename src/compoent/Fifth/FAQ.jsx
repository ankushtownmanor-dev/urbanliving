import React, { useState } from 'react';
import './FAQ.css';

const data = [
  {
    q: 'Who handles renovations ?',
    a:
      "Ovika’s experienced team manages all aspects of the renovation process , from initial design to final touches. We ensure  high quality work and complete renovation.",
  },
  {
    q: 'How is profit calculated ?',
    a:
      'Profit is calculated transparently based on rental income minus agreed service fees and maintenance costs. You can track it in real time on your dashboard.',
  },
  {
    q: 'Do I retain property Ownership ?',
    a:
      'Yes. You retain 100% ownership of your property. Ovika only manages operations and returns the profit share as per the agreement.',
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
                  className="faq-ovika question"
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