import React, { useState } from "react";
import "./CareerSupport.css";

const CareerSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Structure precisely matching working forms and documentation screenshot
      const payload = {
        name: formData.name,
        phone_number: formData.phone_number,
        purpose: `Email: ${formData.email} | Application Details: ${formData.message}`,
        source: "Career Support Form",
        city: "N/A",
        property_id: 0,
        property_name: "Career Page"
      };

      console.log("Submitting payload:", payload);

      const response = await fetch("https://www.townmanor.ai/api/formlead/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        setShowSuccess(true);
        setFormData({ name: "", email: "", phone_number: "", message: "" });
      } else {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        console.error("Server Error Response:", errorData);
        throw new Error(errorData.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit. Please try again or check your phone/email format.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="career-support-container">
      <div className="career-content">
        <h1>Career Support</h1>
        <p>Join our team and help us redefine smart urban living.</p>

        {showSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Application Submitted!</h2>
            <p>Thank you for your interest in OvikaLiving. We'll review your application and get back to you soon.</p>
            <button onClick={() => setShowSuccess(false)} className="back-btn">Submit Another</button>
          </div>
        ) : (
          <form className="career-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number *</label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter 10-digit number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">What do you know about Ovika? *Resume Link *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                maxLength="400"
                placeholder="Tell us what you know about OvikaLiving and paste your resume link (Google Drive/LinkedIn) here..."
              ></textarea>
              <small style={{ color: "#888", display: "block", marginTop: "5px", textAlign: "right" }}>
                {formData.message.length}/400 characters
              </small>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CareerSupport;
