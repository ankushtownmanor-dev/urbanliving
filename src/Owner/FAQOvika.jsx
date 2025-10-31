import React, { useState } from 'react';
import './faq-ovika.css';

const data = [
  {
    q: 'Who manages the property?',
    a:
      "OVIKA’s professional property management team takes care of everything — from tenant onboarding and rent collection to maintenance and guest support — so you can earn without the daily hassles.",
  },
  {
    q: 'How is the commission structured?',
    a:
      'We charge a transparent commission on the rent or income generated from your property. The exact percentage depends on the property type and services included, all clearly stated in the agreement.',
  },
  {
    q: 'Do I retain property ownership?',
    a:
      'Yes, you remain the full and legal owner of your property. OVIKA only manages the property on your behalf under a management agreement.',
  },
    {
    q: "How do I receive my earnings?",
    a: "Your rental income is transferred directly to your registered bank account after deducting OVIKA’s commission. You also receive detailed monthly statements for full transparency."
  },
  {
    q: "How are tenants verified?",
    a: "Every tenant is thoroughly screened and verified through background and ID checks to ensure security, reliability, and peace of mind."
  },
  {
    q: "What if there are maintenance issues?",
    a: "Our team handles tenant-reported issues promptly through trusted service partners, keeping your property well-maintained and guests satisfied."
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