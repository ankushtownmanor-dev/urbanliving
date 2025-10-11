import React, { useState } from "react";
import "./PropertyShareForm.css";

<<<<<<< HEAD
const PropertyShareForm = () => (
  <div className="property-share-wrapper">
    <h1 className="main-heading">Start sharing your property with Ovika today !</h1>
    <p className="sub-heading">
      Ready to unlock your property potential chews your preferred <br/>way to connect with us below
    </p>
=======
const PropertyShareForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    propertyAddress: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [autoReply, setAutoReply] = useState(''); // Auto-generated reply based on message
  
  const whatsappNumber = "919319392227";
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate reply based on message content
    if (name === 'message') {
      generateAutoReply(value);
    }
    
    if (submitStatus) setSubmitStatus('');
  };
  
  // Smart Auto-Reply Generator based on keywords
  const generateAutoReply = (message) => {
    const lowerMessage = message.toLowerCase();
    
    let reply = '';
    
    // Keyword detection for different scenarios
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rent')) {
      reply = "Thank you for your interest! Our team will provide you with detailed pricing and rental information within 24 hours.";
    } 
    else if (lowerMessage.includes('visit') || lowerMessage.includes('inspection') || lowerMessage.includes('see')) {
      reply = "We'd love to schedule a property visit for you! Our team will contact you shortly to arrange a convenient time.";
    }
    else if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('immediately')) {
      reply = "We understand this is urgent. Our priority team will reach out to you within 2-4 hours.";
    }
    else if (lowerMessage.includes('renovation') || lowerMessage.includes('repair') || lowerMessage.includes('maintenance')) {
      reply = "Great! We handle all renovations and maintenance. Our expert team will assess your property and provide a detailed plan.";
    }
    else if (lowerMessage.includes('profit') || lowerMessage.includes('earning') || lowerMessage.includes('income')) {
      reply = "Excellent question! We'll share a detailed profit-sharing breakdown and earning potential analysis for your property.";
    }
    else if (lowerMessage.includes('contract') || lowerMessage.includes('agreement') || lowerMessage.includes('legal')) {
      reply = "Our legal team will explain the complete contract terms and answer all your questions during our meeting.";
    }
    else {
      reply = "Thank you for reaching out! Our team will review your inquiry and get back to you within 24-48 hours.";
    }
    
    setAutoReply(reply);
  };
  
  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.propertyAddress.trim() || 
        !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      return false;
    }
    
    return true;
  };
  
  // Enhanced Template with Auto-Reply
  const generateEmailTemplate = () => {
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    const currentTime = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    // Detect inquiry type
    const inquiryType = detectInquiryType(formData.message);
    
    return `*OVIKA LIVING - NEW PROPERTY INQUIRY*
>>>>>>> 614feb66e4a1c3372589e7ce1d6f9a90462216fd

Date: ${currentDate}
Time: ${currentTime}
Inquiry Type: ${inquiryType}

<<<<<<< HEAD
      {/* Office Visit Section */}
      <div className="office-section">
        <h2 className="section-heading-two">Our visit our office</h2>
        <p className="office-desc">
          We’d love to meet you in person and help you get started on your property’s transformation journey.
          Visit our Ovika office to discuss your space, renovation goals, and earning potential with our expert team.
          Bring your property details – our specialists will walk you through the process, explain profit-sharing options,
          and show how we can turn your unused property into a consistent income source. Let’s build something beautiful
          and profitable together!
        </p>
        {/* <div className="address-block">
          
          <div className="address-details">
            <span className="address-title">Our Adress is :</span>
            2nd Floor, Tower B, Logix City Center,<br />
            Sector 32, Noida – 201301,<br />
            Uttar Pradesh, India
          </div>
        </div> */}
  <div className="address-block">
  <div className="address-line"></div>
  <div className="address-container">
    <span className="address-title">Our Address is :</span>
    <div>
      2nd Floor, Tower B, Logix City Center,<br />
      Sector 32, Noida – 201301,<br />
      Uttar Pradesh, India
    </div>
  </div>
</div>


        <p className="footnote">
          Please include your contact information, property address, a brief description of the property and any photos. If available we will get back to you within 5-7 business days.
        </p>
=======
----------------------------
CUSTOMER DETAILS
----------------------------

Name: ${formData.fullName}
Email: ${formData.email}
Property Address: ${formData.propertyAddress}

----------------------------
CUSTOMER MESSAGE
----------------------------

${formData.message}

----------------------------
AUTO-GENERATED RESPONSE
----------------------------

${autoReply}

----------------------------
ACTION REQUIRED
----------------------------

${getActionItems(inquiryType)}

----------------------------
OFFICE ADDRESS
----------------------------

2nd Floor, Tower B, Logix City Center,
Sector 32, Noida - 201301,
Uttar Pradesh, India

----------------------------

Note: This is an automated inquiry from Ovika Living Property Share Form.
Priority: ${getPriority(formData.message)}`;
  };
  
  // Detect inquiry type
  const detectInquiryType = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) return 'PRICING INQUIRY';
    if (lowerMessage.includes('visit') || lowerMessage.includes('inspection')) return 'PROPERTY VISIT REQUEST';
    if (lowerMessage.includes('urgent') || lowerMessage.includes('asap')) return 'URGENT REQUEST';
    if (lowerMessage.includes('renovation') || lowerMessage.includes('repair')) return 'RENOVATION INQUIRY';
    if (lowerMessage.includes('profit') || lowerMessage.includes('earning')) return 'PROFIT SHARING INQUIRY';
    if (lowerMessage.includes('contract') || lowerMessage.includes('legal')) return 'LEGAL/CONTRACT INQUIRY';
    
    return 'GENERAL INQUIRY';
  };
  
  // Get priority level
  const getPriority = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('immediately')) {
      return 'HIGH - Contact within 2-4 hours';
    }
    if (lowerMessage.includes('soon') || lowerMessage.includes('quickly')) {
      return 'MEDIUM - Contact within 12 hours';
    }
    
    return 'NORMAL - Contact within 24-48 hours';
  };
  
  // Get action items based on inquiry type
  const getActionItems = (inquiryType) => {
    const actions = {
      'PRICING INQUIRY': '1. Prepare pricing sheet\n2. Calculate rental estimates\n3. Share profit breakdown',
      'PROPERTY VISIT REQUEST': '1. Check team availability\n2. Schedule visit\n3. Send confirmation',
      'URGENT REQUEST': '1. IMMEDIATE RESPONSE REQUIRED\n2. Assign priority agent\n3. Call customer directly',
      'RENOVATION INQUIRY': '1. Schedule property assessment\n2. Prepare renovation plan\n3. Share cost estimates',
      'PROFIT SHARING INQUIRY': '1. Prepare profit analysis\n2. Share case studies\n3. Explain revenue model',
      'LEGAL/CONTRACT INQUIRY': '1. Share sample contract\n2. Schedule legal consultation\n3. Answer FAQs',
      'GENERAL INQUIRY': '1. Review customer details\n2. Prepare information packet\n3. Schedule follow-up call'
    };
    
    return actions[inquiryType] || actions['GENERAL INQUIRY'];
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      const whatsappMessage = generateEmailTemplate();
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      window.open(whatsappURL, '_blank');
      
      setSubmitStatus('success');
      
      setTimeout(() => {
        setFormData({
          fullName: '',
          propertyAddress: '',
          email: '',
          message: ''
        });
        setAutoReply('');
        setSubmitStatus('');
      }, 3000);
      
    } catch (error) {
      console.error('WhatsApp message failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="property-share-wrapper">
      <h1 className="main-heading">Start sharing your property with Ovika today !</h1>
      <p className="sub-heading">
        Ready to unlock your property potential choose your preferred way to connect with us below
      </p>

      <div className="form-office-container">
        {/* Form Section */}
        <div className="form-section">
          <h2 className="section-heading">Fill out the form</h2>
          <form className="share-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="fullName"
              placeholder="Full name" 
              className="input-field" 
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            <input 
              type="text" 
              name="propertyAddress"
              placeholder="Property address" 
              className="input-field" 
              value={formData.propertyAddress}
              onChange={handleInputChange}
              required
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email address" 
              className="input-field" 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea 
              name="message"
              placeholder="Message..." 
              className="input-field textarea-field" 
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            
            {/* Auto-Reply Preview */}
            {autoReply && (
              <div className="auto-reply-preview">
                <strong>Auto-Generated Response:</strong>
                <p>{autoReply}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit Details'}
              <span className="arrow">{'>'}</span>
            </button>
            
            {submitStatus === 'success' && (
              <div className="form-success">
                Thank you! We've received your details and will contact you shortly via WhatsApp.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="form-error">
                Please fill in all required fields correctly.
              </div>
            )}
          </form>
        </div>

        {/* Office Visit Section */}
        <div className="office-section">
          <h2 className="section-heading">Or visit our office</h2>
          <p className="office-desc">
            We'd love to meet you in person and help you get started on your property's transformation journey.
            Visit our Ovika office to discuss your space, renovation goals, and earning potential with our expert team.
            Bring your property details – our specialists will walk you through the process, explain profit-sharing options,
            and show how we can turn your unused property into a consistent income source. Let's build something beautiful
            and profitable together!
          </p>
          <div className="address-block">
            <span className="address-title">Our Address is :</span>
            <div className="address-details">
              2nd Floor, Tower B, Logix City Center,<br />
              Sector 32, Noida – 201301,<br />
              Uttar Pradesh, India
            </div>
          </div>
          <p className="footnote">
            Please include your contact information, property address, a brief description of the property and any photos if available. We will get back to you within 5-7 business days.
          </p>
        </div>
>>>>>>> 614feb66e4a1c3372589e7ce1d6f9a90462216fd
      </div>
    </div>
  );
};

export default PropertyShareForm;