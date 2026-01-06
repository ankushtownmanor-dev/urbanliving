import React from 'react';
import { Link } from 'react-router-dom';
import './RefundAndCancellation.css';

const RefundAndCancellation = () => {
  return (
    <div className="refund-policy-container">
      <div className="refund-policy-header">
        <h1>Refund & Cancellation Policy</h1>
        <p className="last-updated">Last Updated: 17 December, 2025</p>
      </div>
      
      <div className="refund-policy-content">
        <p className="policy-intro">
          This Refund & Cancellation Policy ("Policy") governs the cancellation of bookings and the processing
          of refunds made through the Ovikaliving platform.
        </p>
        <p>
          Ovikaliving is a flagship brand operated under Townmanor Technology Pvt. Ltd. ("Company", "we",
          "us", "our").
        </p>
        <p>
          This Policy is to be read in conjunction with our Terms & Conditions and Privacy Policy. In the event
          of any conflict, the Terms & Conditions shall prevail.
        </p>

        <section className="policy-section">
          <h2>1. About Ovikaliving & Applicability of This Policy</h2>
          <p>
            Ovikaliving operates as a technology-enabled short-term stay marketplace connecting guests with
            hosts or property owners offering PG, co-living, rental, and other residential living spaces across
            India.
          </p>
          <p>This Policy applies to:</p>
          <ul>
            <li>All bookings made through:</li>
            <ul>
              <li>https://www.ovikaliving.com</li>
              <li>https://ovikaliving.com/</li>
            </ul>
            <li>All cancellations initiated by guests or hosts</li>
            <li>All refund requests processed through the Platform</li>
          </ul>
          <p>
            Ovikaliving acts primarily as an intermediary platform and facilitates refunds in accordance with this
            Policy, applicable host terms, and Indian law.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Currency & Payment Mode</h2>
          <ul>
            <li>All prices, payments, cancellations, and refunds are processed exclusively in Indian Rupees (INR).</li>
            <li>Foreign currency payments are not accepted at present.</li>
            <li>Payments and refunds are processed through authorized Indian payment gateways (currently PayU or its successors).</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Guest-Initiated Cancellations (Time-Based Refund Structure)</h2>
          <p>If a guest cancels a confirmed booking, refunds shall be processed according to the time remaining before the scheduled check-in date and time, as outlined below:</p>
          
          <h3>Short-term stays</h3>
          <div className="policy-cards-container">
            <div className="policy-card">
              <div className="policy-card-header">
                <h4>Flexible</h4>
              </div>
              <ul>
                <li>Full refund at least 1 day before check-in</li>
                <li>Partial refund within 1 day of check-in</li>
              </ul>
            </div>
            
            <div className="policy-card">
              <div className="policy-card-header">
                <h4>Moderate</h4>
              </div>
              <ul>
                <li>Full refund at least 5 days before check-in</li>
                <li>Partial refund within 5 days of check-in</li>
              </ul>
            </div>

            <div className="policy-card">
              <div className="policy-card-header">
                <h4>Standard</h4>
              </div>
              <ul>
                <li>Full refund at least 14 days before check-in</li>
                <li>Partial refund 7–14 days before check-in</li>
              </ul>
            </div>

            <div className="policy-card">
              <div className="policy-card-header">
                <h4>Not Flexible</h4>
              </div>
              <ul>
                <li>Full refund at least 30 days before check-in</li>
                <li>Partial refund 7–30 days before check-in</li>
              </ul>
            </div>
          </div>
          
          <p className="notes">
            <strong>Notes:</strong><br />
            • The countdown is calculated from the official check-in date and time mentioned in the booking confirmation.<br />
            • "Booking amount" refers to the base rental amount excluding non-refundable charges, if any.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Non-Refundable Charges</h2>
          <p>Unless explicitly stated otherwise at the time of booking or required by law, the following may be non-refundable:</p>
          <ul>
            <li>Payment gateway or transaction fees</li>
            <li>Platform service or convenience fees</li>
            <li>Taxes already remitted to authorities</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>5. Host-Specific or Property-Specific Policies</h2>
          <ul>
            <li>Certain listings may display custom cancellation terms defined by the host.</li>
            <li>Where such terms are clearly disclosed before booking, those terms shall apply only if they are not less favorable than this Policy, unless legally permitted.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>6. Host-Initiated Cancellations</h2>
          <p>If a host cancels a confirmed booking:</p>
          <ul>
            <li>The guest shall receive a 100% refund, including applicable service charges</li>
            <li>Ovikaliving may, at its discretion, assist the guest in finding alternative accommodation</li>
            <li>Repeated host cancellations may result in:</li>
            <ul>
              <li>Reduced listing visibility</li>
              <li>Temporary suspension</li>
              <li>Permanent removal from the Platform</li>
            </ul>
          </ul>
        </section>

        <section className="policy-section">
          <h2>7. No-Shows & Early Check-Outs</h2>
          <h3>• No-Show:</h3>
          <p>If a guest fails to check in without prior cancellation, no refund shall be issued.</p>
          
          <h3>• Early Check-Out:</h3>
          <p>
            Leaving the property before the scheduled check-out date does not entitle the guest to a
            refund, unless:
          </p>
          <ul>
            <li>Explicitly permitted by the host, or</li>
            <li>Approved by Ovikaliving under exceptional circumstances</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>8. Exceptional Circumstances</h2>
          <p>
            Refunds or partial refunds may be considered on a case-by-case basis in situations including but not
            limited to:
          </p>
          <ul>
            <li>Government-imposed travel bans or lockdowns</li>
            <li>Natural disasters or severe weather events</li>
            <li>Legal or safety-related restrictions</li>
            <li>Situations where the property becomes uninhabitable</li>
          </ul>
          <p>Supporting documents may be required. Approval under this clause remains at the sole discretion of Ovikaliving, subject to applicable law.</p>
        </section>

        <section className="policy-section">
          <h2>9. Refund Processing Timeline</h2>
          <ul>
            <li>Approved refunds are processed through the original payment method.</li>
            <li>Typical processing time: 5–10 business days</li>
            <li>Delays caused by banks, payment gateways, or third-party systems are beyond Ovikaliving's control.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>10. Misuse, Fraud & Policy Violations</h2>
          <p>No refund shall be issued where:</p>
          <ul>
            <li>The booking involves fraudulent activity</li>
            <li>Platform policies or house rules are violated</li>
            <li>There is intentional damage to property</li>
            <li>The account is suspended or terminated due to misuse</li>
          </ul>
          <p>Ovikaliving reserves the right to deduct charges or deny refunds in such cases.</p>
        </section>

        <section className="policy-section">
          <h2>11. Legal & Regulatory Compliance</h2>
          <p>
            This Policy is governed by the laws of India and is aligned with:
          </p>
          <ul>
            <li>The Information Technology Act, 2000</li>
            <li>Applicable consumer protection laws</li>
            <li>Contractual principles under Indian law</li>
          </ul>
          <p>Courts within India shall have exclusive jurisdiction.</p>
        </section>

        <section className="policy-section">
          <h2>12. Amendments to This Policy</h2>
          <p>Ovikaliving reserves the right to modify or update this Policy at any time. Changes will be effective upon publication on the Platform. Continued use of the Platform after such changes constitutes acceptance of the revised Policy.</p>
        </section>

        <section className="policy-section contact-section">
          <h2>13. Contact & Support</h2>
          <p>For cancellation or refund-related queries, please contact:</p>
          <p>
            <strong>Email:</strong><br />
            <a href="mailto:enquiry@ovikaliving.com">enquiry@ovikaliving.com</a><br />
            <a href="mailto:support@townmanor.ai">support@townmanor.ai</a>
          </p>
        </section>

        <div className="back-to-home">
          <Link to="/" className="back-button">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default RefundAndCancellation;
