import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const FAQItem = ({ question, answer, number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <h3>{number}. {question}</h3>
        <span className="faq-icon">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </div>
      {isOpen && (
        <div className="faq-answer">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p className="last-updated">Last Updated: December 2023</p>
      </div>

      <div className="faq-section">
        <h2>General FAQs</h2>
        
        <FAQItem 
          number="1"
          question="What is OvikaLiving?"
          answer={<p>OvikaLiving is a technology-driven marketplace that connects guests with property owners offering short-term stays, PGs, co-living spaces, and rental accommodations across India.</p>}
        />

        <FAQItem 
          number="2"
          question="Who operates OvikaLiving?"
          answer={<p>OvikaLiving is a flagship brand operated under Townmanor Technologies Pvt. Ltd.</p>}
        />

        <FAQItem 
          number="3"
          question="Is OvikaLiving available outside India?"
          answer={<p>Currently, OvikaLiving operates only within India, and all transactions are processed in Indian Rupees (INR).</p>}
        />
      </div>

      <div className="faq-section">
        <h2>Guest FAQs</h2>
        
        <FAQItem 
          number="4"
          question="How do I book a property on OvikaLiving?"
          answer={<p>Guests can search for properties, review listings, and make bookings directly through the OvikaLiving platform.</p>}
        />

        <FAQItem 
          number="5"
          question="How are payments handled?"
          answer={<p>All payments are processed securely through authorized payment gateways. OvikaLiving does not store your card or banking details.</p>}
        />

        <FAQItem 
          number="6"
          question="What is the cancellation and refund policy?"
          answer={<p>Cancellation and refund eligibility depends on the timing of cancellation and the applicable policy shown during booking. Please refer to our <Link to="/refund-cancellation-policy" className="faq-link">Refund & Cancellation Policy</Link> for details.</p>}
        />

        <FAQItem 
          number="7"
          question="What happens if a host cancels my booking?"
          answer={<p>If a host cancels a confirmed booking, you are eligible for a full refund. OvikaLiving may also assist in finding alternative accommodation, subject to availability.</p>}
        />

        <FAQItem 
          number="8"
          question="Are properties verified?"
          answer={<p>Yes. Property owners are required to submit identity documents, and listings are reviewed before being published.</p>}
        />

        <FAQItem 
          number="9"
          question="What if I face an issue during my stay?"
          answer={<p>Guests can contact OvikaLiving support for assistance. However, the stay itself is managed directly between the guest and the property owner.</p>}
        />
      </div>

      <div className="faq-section">
        <h2>Owner FAQs</h2>
        
        <FAQItem 
          number="10"
          question="How do I list my property on OvikaLiving?"
          answer={<p>You can list your property by filling out the property onboarding form on our website. Alternatively, you can choose assisted listing through our team.</p>}
        />

        <FAQItem 
          number="11"
          question="Does OvikaLiving charge any commission?"
          answer={<p>No OvikaLiving does not charge commission on bookings.</p>}
        />

        <FAQItem 
          number="12"
          question="Who decides house rules and guest eligibility?"
          answer={<p>Property owners set their own house rules, check-in policies, and guest limits.</p>}
        />

        <FAQItem 
          number="13"
          question="How do I receive payments?"
          answer={<p>Payment flow details are communicated during booking. Owners receive payments as per the agreed process without commission deductions.</p>}
        />

        <FAQItem 
          number="14"
          question="Can OvikaLiving remove my listing?"
          answer={<p>Listings may be suspended or removed if they violate platform policies, contain misleading information, or fail verification checks.</p>}
        />

        <FAQItem 
          number="15"
          question="Does OvikaLiving own or manage the listed properties?"
          answer={<p>No. OvikaLiving acts as a technology intermediary and does not own or manage most properties listed on the platform.</p>}
        />
      </div>

      <div className="faq-section">
        <h2>Privacy & Data Protection FAQs</h2>
        
        <FAQItem 
          number="16"
          question="How is my personal data protected?"
          answer={<p>OvikaLiving follows applicable Indian data protection laws and implements security measures to protect user data. Please refer to our <Link to="/privacy-policy" className="faq-link">Privacy Policy</Link> for details.</p>}
        />

        <FAQItem 
          number="17"
          question="Is my ID safe with OvikaLiving?"
          answer={<p>Yes. Identity documents are used only for verification and compliance purposes and are stored securely.</p>}
        />

        <FAQItem 
          number="18"
          question="Does OvikaLiving share my data with third parties?"
          answer={<p>Personal data is shared only with trusted service providers where necessary (e.g., payment processing) or when required by law.</p>}
        />
      </div>

      <div className="faq-section">
        <h2>Legal & Platform FAQs</h2>
        
        <FAQItem 
          number="19"
          question="What laws govern OvikaLiving?"
          answer={<p>All services are governed by the laws of India, as outlined in our <Link to="/terms-and-conditions" className="faq-link">Terms & Conditions</Link>.</p>}
        />

        <FAQItem 
          number="20"
          question="Can OvikaLiving change its policies?"
          answer={<p>Yes. OvikaLiving may update its policies from time to time. Updated versions will be published on the platform.</p>}
        />

        <FAQItem 
          number="21"
          question="How can I contact OvikaLiving support?"
          answer={<p>You can contact us at: <a href="mailto:enquiry@ovikaLiving.com" className="faq-link">enquiry@ovikaLiving.com</a> or <a href="mailto:support@townmanor.ai" className="faq-link">support@townmanor.ai</a></p>}
        />
      </div>

      <div className="faq-contact">
        <p>Still have questions? Contact our support team at <a href="mailto:enquiry@ovikaLiving.com" className="faq-link">enquiry@ovikaLiving.com</a> or <a href="mailto:support@townmanor.ai" className="faq-link">support@townmanor.ai</a></p>
      </div>
    </div>
  );
};

export default FAQ;
