import React, { useState } from 'react';
import './FAQ.css';

const data = [


  /////
    {
      q: 'Who handles renovations ?',
      a:
        "OVIKA’s experienced design and project team manages every aspect of the renovation — from evaluation and planning to final execution. We ensure quality upgrades that enhance your property’s value and earning potential.",
    },
    {
      q: 'How is the profit calculated?',
      a:
        "Profits are calculated based on the net income generated from your property after deducting operational and management costs. The agreed-upon share is then distributed transparently as per the signed agreement.",
    },
     {
      q: 'Do I retain property ownership?',
      a:
        "Yes, you retain full ownership of your property. OVIKA only partners with you to renovate, manage, and share the profits generated from its use — ownership always remains with you.",
    },
     {
      q: 'What types of properties are eligible?',
      a:
        "Residential apartments, villas, and standalone houses located in prime or high-demand areas are generally eligible. Each property is first evaluated for its renovation and income potential.",
    },
     {
      q: 'How long does the renovation process take?',
      a:
        "The timeline depends on the scope of work and property condition, typically ranging from 30 to 90 days. You’ll receive a detailed schedule before signing the agreement.",
    },
     {
      q: 'When do I start earning profit?',
      a:
        "Earnings begin once your renovated property goes live under OVIKA’s management and starts generating revenue. Profit distribution follows the agreed schedule outlined in your partnership contract.",
    },
];

export default function FAQOvika() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq-ovika section">
      <div className="faq-ovika container">
        <h2 className="faq-heading-renovation">Frequently asked questions</h2>

        <div className="faq-ovika list">
          {data.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-ovika item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-ovika-question-setout"
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