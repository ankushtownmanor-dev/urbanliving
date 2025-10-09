import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Who handles renovations ?",
      answer:
        "Ovika’s experienced team manages all aspects of the renovation process, from initial design to final touches. We ensure high quality work and complete renovation.",
    },
    {
      question: "How is profit calculated ?",
      answer:
        "Profit is calculated transparently based on your property’s rental or resale income after all costs. You receive your share directly every month through our secure process.",
    },
    {
      question: "Do I retain property Ownership ?",
      answer:
        "Yes, you always retain 100% ownership of your property. Ovika simply helps you manage, renovate, and rent it efficiently while you stay in control.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently asked questions</h2>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{item.question}</span>
              <span className="arrow">
                {openIndex === index ? "▾" : "▸"}
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
