import React, { useState } from "react";
import "./Subs3.css";

const faqData = [
  {
    q: "What is included in each subscription plan?",
    a: "Each subscription plan includes a defined number of property listings, featured listings, and access for a specific duration based on the plan you choose."
  },
  {
    q: "What are the differences between the Free and Starter plans?",
    a: "The Free plan allows limited listings for 30 days, while the Starter plan is a one-time purchase with additional listing and featured listing benefits."
  },
  {
    q: "Can I modify or cancel my subscription after purchasing?",
    a: "Yes, you can upgrade your plan anytime. Cancellation policies depend on the selected plan and usage."
  },
  {
    q: "What if I need more listings or featured listings than my current plan allows?",
    a: "You can upgrade to a higher plan or purchase add-ons to increase your listing and featured listing limits."
  },
  {
    q: "What are the key differences between the Premium and Business plans?",
    a: "Premium is ideal for individual owners with moderate needs, while Business plans are designed for high-volume listings with longer validity and higher limits."
  },
  {
    q: "How can I track my usage of listings and featured listings, and access my invoice?",
    a: "You can track your usage and download invoices directly from your dashboard under the billing section."
  },
  {
    q: "Who should I contact if I have questions or need assistance?",
    a: "You can contact our support team via email or the help section in your dashboard for quick assistance."
  }
];

const Subs3 = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-wrapper">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFaq(index)}
          >
            <div className="faq-question">
              <span className="faq-number">{index + 1}</span>
              <p>{item.q}</p>
              <span className="faq-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Subs3;
