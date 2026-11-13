import React from 'react'
import { ArrowRight } from 'lucide-react'

function PolicyLayout({ title, eyebrow, effectiveDate, summary, currentTab, onNavigate, children }) {
  return (
    <main className="brand-page policy-page">
      <header className="policy-hero">
        <div className="policy-hero-inner">
          <div className="policy-breadcrumbs">
            <button onClick={() => onNavigate('Home')}>Home</button>
            <span>›</span>
            <button onClick={() => onNavigate('Customer Care')}>Customer Care</button>
            <span>›</span>
            <span>{title}</span>
          </div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <div className="policy-meta">{effectiveDate}</div>

          <nav className="policy-tabs" aria-label="Policy Navigation">
            <button
              className={`policy-tab-btn ${currentTab === 'privacy' ? 'active' : ''}`}
              onClick={() => onNavigate('Privacy Policy')}
            >
              Privacy Policy
            </button>
            <button
              className={`policy-tab-btn ${currentTab === 'terms' ? 'active' : ''}`}
              onClick={() => onNavigate('Terms & Conditions')}
            >
              Terms & Conditions
            </button>
            <button
              className={`policy-tab-btn ${currentTab === 'shipping' ? 'active' : ''}`}
              onClick={() => onNavigate('Shipping Policy')}
            >
              Shipping Policy
            </button>
            <button
              className={`policy-tab-btn ${currentTab === 'returns' ? 'active' : ''}`}
              onClick={() => onNavigate('Returns Policy')}
            >
              Returns & Exchanges
            </button>
            <button
              className="policy-tab-btn"
              onClick={() => onNavigate('Customer Care')}
            >
              Help & Concierge
            </button>
          </nav>
        </div>
      </header>

      <div className="policy-container">
        {summary && (
          <div className="policy-summary-box">
            <p>"{summary}"</p>
          </div>
        )}

        <div className="policy-body">
          {children}
        </div>

        <div className="policy-contact-note">
          <h4>Have questions regarding this policy?</h4>
          <p>Our concierge team is at your disposal to answer any inquiries or provide clarity.</p>
          <button className="dark-btn" onClick={() => onNavigate('Contact')}>
            Contact Concierge <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </main>
  )
}

export function PrivacyPolicyPage({ onNavigate }) {
  return (
    <PolicyLayout
      title="Privacy Policy"
      eyebrow="LEGAL & DATA PRIVACY"
      effectiveDate="Effective Date: November 2026"
      summary="At La Cinderae, we honor your trust with absolute confidentiality. We treat your personal details, browsing data, and purchase records with the highest standards of discretion and security."
      currentTab="privacy"
      onNavigate={onNavigate}
    >
      <article className="policy-section-block">
        <h3>1. Commitment to Privacy & Scope</h3>
        <p>This Privacy Policy explains how La Cinderae collects, protects, utilizes, and discloses information gathered through our digital storefront, bespoke styling services, and concierge channels. By accessing our services, you consent to the data practices described herein.</p>
      </article>

      <article className="policy-section-block">
        <h3>2. Information We Collect</h3>
        <p>In delivering an effortless and personalized luxury shopping experience, we may collect the following categories of information:</p>
        <ul>
          <li><strong>Identity & Contact Details:</strong> Full name, telephone number, email address, delivery address, and billing information provided during checkout or account registration.</li>
          <li><strong>Transactional Records:</strong> Order details, purchase amounts, payment reference identifiers, and communication logs. We do not store complete credit/debit card numbers or security CVVs on our servers.</li>
          <li><strong>Technical & Usage Insights:</strong> IP addresses, browser specifications, device identifiers, and aggregated interaction telemetry that help us enhance site speed and usability.</li>
        </ul>
      </article>

      <article className="policy-section-block">
        <h3>3. Purpose of Data Processing</h3>
        <p>Your personal information is utilized strictly to provide, improve, and tailor our luxury offerings:</p>
        <ul>
          <li>Fulfilling and dispatching your orders with real-time transit updates.</li>
          <li>Facilitating doorstep reverse pickups, exchanges, and verified refunds.</li>
          <li>Providing personal styling advice, sizing assistance, and concierge support.</li>
          <li>Safeguarding transactions against fraud and verifying high-value orders.</li>
        </ul>
      </article>

      <article className="policy-section-block">
        <h3>4. Security & Data Protection Standards</h3>
        <p>We deploy rigorous technical, organizational, and physical safeguards. All digital data transmission is encrypted via industry-leading 256-bit SSL protocols. Payment integrations comply fully with global PCI-DSS security criteria.</p>
      </article>

      <article className="policy-section-block">
        <h3>5. Non-Disclosure & Third-Party Sharing</h3>
        <p>La Cinderae does not sell, lease, or monetize your personal information to any third parties. Data is shared solely with certified logistical partners (e.g., BlueDart, Delhivery) and verified payment processors solely for the explicit purpose of fulfilling your order.</p>
      </article>

      <article className="policy-section-block">
        <h3>6. Cookies & Client Preferences</h3>
        <p>We utilize essential and performance cookies to maintain your shopping bag contents, retain your curated wishlist, and provide smooth site navigation. You can adjust your cookie preferences through your individual web browser at any time.</p>
      </article>

      <article className="policy-section-block">
        <h3>7. Your Rights & Access</h3>
        <p>You reserve the right to review, update, or request the permanent erasure of your personal data from our systems. To exercise any data rights, please email our Data Privacy Officer at <a href="mailto:privacy@lacinderae.com">privacy@lacinderae.com</a>.</p>
      </article>
    </PolicyLayout>
  )
}

export function TermsConditionsPage({ onNavigate }) {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      eyebrow="TERMS OF USE"
      effectiveDate="Effective Date: November 2026"
      summary="Please read these Terms & Conditions carefully before exploring or purchasing from La Cinderae. By accessing our platform, you acknowledge and agree to these terms."
      currentTab="terms"
      onNavigate={onNavigate}
    >
      <article className="policy-section-block">
        <h3>1. Acceptance of Terms</h3>
        <p>These Terms & Conditions govern your access to and use of the La Cinderae platform, including all associated digital experiences, concierge services, and purchase transactions. By using our website, you confirm your acceptance of these Terms.</p>
      </article>

      <article className="policy-section-block">
        <h3>2. Intellectual Property & Brand Ownership</h3>
        <p>All brand assets, including the La Cinderae wordmark, bespoke silhouettes, jewellery and garment designs, photography, editorial text, visual graphics, and code, are protected under copyright, trademark, and intellectual property laws. Unauthorized reproduction, resale, or scraping is strictly prohibited.</p>
      </article>

      <article className="policy-section-block">
        <h3>3. Product Authenticity & Artisanal Character</h3>
        <p>We take immense pride in crafting each piece with precision. Because our creations involve authentic precious metals, stones, and natural textiles, minor artisanal nuances may appear across individual pieces. Such nuances are celebrated hallmarks of genuine craft and individuality.</p>
      </article>

      <article className="policy-section-block">
        <h3>4. Pricing & Ordering Integrity</h3>
        <p>All prices on the platform are stated in Indian Rupees (₹ INR) inclusive of applicable GST taxes. While we strive for uncompromising accuracy, we reserve the right to rectify inadvertent pricing or typographical errors prior to dispatching your parcel, offering you the option of confirmation or cancellation.</p>
      </article>

      <article className="policy-section-block">
        <h3>5. Order Acceptance & Verification</h3>
        <p>Submission of an order constitutes an offer to purchase. An automated email acknowledgment does not constitute legal acceptance. Acceptance occurs upon shipment dispatch and delivery of an official tracking confirmation. We reserve the right to verify high-value orders prior to fulfillment.</p>
      </article>

      <article className="policy-section-block">
        <h3>6. Title & Risk of Delivery</h3>
        <p>Title and risk of loss for products pass to you upon successful delivery by our courier partners at the specified delivery address. Packages must be received with verified OTP or signature.</p>
      </article>

      <article className="policy-section-block">
        <h3>7. Governing Law & Dispute Resolution</h3>
        <p>These Terms shall be interpreted and enforced in accordance with the laws of India. Any controversy, dispute, or claim arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.</p>
      </article>
    </PolicyLayout>
  )
}

export function ShippingPolicyPage({ onNavigate }) {
  return (
    <PolicyLayout
      title="Shipping Policy"
      eyebrow="DELIVERY & TRANSIT"
      effectiveDate="Effective Date: November 2026"
      summary="We provide seamless, insured, and discreet doorstep delivery across India. Every creation is packaged with intention to ensure an unforgettable unboxing experience."
      currentTab="shipping"
      onNavigate={onNavigate}
    >
      <article className="policy-section-block">
        <h3>1. Complimentary Express Shipping</h3>
        <p>To celebrate our patrons, La Cinderae offers complimentary express shipping across India on all domestic orders of ₹5,000 or above. For domestic orders below ₹5,000, a nominal flat shipping fee of ₹150 is applied at checkout.</p>
      </article>

      <article className="policy-section-block">
        <h3>2. Delivery Timelines</h3>
        <p>Standard delivery timelines across destinations:</p>
        <ul>
          <li><strong>Tier 1 & Metro Cities:</strong> 2 to 4 business days (Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune).</li>
          <li><strong>Tier 2 & Tier 3 Cities:</strong> 4 to 6 business days.</li>
          <li><strong>Special / Remote Destinations:</strong> Up to 7 business days.</li>
        </ul>
      </article>

      <article className="policy-section-block">
        <h3>3. Processing & Atelier Dispatch</h3>
        <p>Orders are meticulously inspected, authenticated, and dispatched from our Bengaluru atelier within 24 to 48 business hours. Orders placed on Sundays or public holidays will be processed on the following working day.</p>
      </article>

      <article className="policy-section-block">
        <h3>4. Discreet & Tamper-Proof Luxury Unboxing</h3>
        <p>Every piece arrives nestled inside our signature keepsake box with protective velvet pouches and authenticity certificates. For transit security, the outer shipping carton is discreet and tamper-sealed without conspicuous external brand labeling.</p>
      </article>

      <article className="policy-section-block">
        <h3>5. Real-Time Tracking & Updates</h3>
        <p>As soon as your shipment is handed over to our courier partners, an automated SMS and email containing your consignment AWB and live tracking link will be sent to your registered contact details.</p>
      </article>

      <article className="policy-section-block">
        <h3>6. Damaged or Tampered Shipments</h3>
        <p>If your outer carton appears visibly damaged, torn, or tampered with at the time of delivery, please do not accept the shipment and refuse delivery. Immediately contact our concierge at <a href="mailto:concierge@lacinderae.com">concierge@lacinderae.com</a> or <a href="tel:+918049201800">+91 80 4920 1800</a>.</p>
      </article>
    </PolicyLayout>
  )
}

export function ReturnsPolicyPage({ onNavigate }) {
  return (
    <PolicyLayout
      title="Returns Policy"
      eyebrow="RETURNS & EXCHANGES"
      effectiveDate="Effective Date: November 2026"
      summary="We want you to feel complete confidence in every piece you select. We offer a 7-day gracious return and exchange window for our patrons."
      currentTab="returns"
      onNavigate={onNavigate}
    >
      <article className="policy-section-block">
        <h3>1. Our 7-Day Gracious Return Window</h3>
        <p>If you are not completely enchanted with your selection, you may initiate a return or exchange request within 7 calendar days from the date your order was marked as delivered.</p>
      </article>

      <article className="policy-section-block">
        <h3>2. Eligibility Criteria</h3>
        <p>To qualify for a full refund or exchange, items must satisfy the following conditions:</p>
        <ul>
          <li>The piece must be unworn, unwashed, unaltered, and without traces of fragrance, cosmetics, or handling marks.</li>
          <li>All original security tags, authenticity cards, and hallmark seals must remain securely attached.</li>
          <li>The item must be returned in its complete original signature packaging, including pouches, care booklets, and outer boxes.</li>
        </ul>
      </article>

      <article className="policy-section-block">
        <h3>3. Exceptions & Non-Returnable Items</h3>
        <p>In accordance with health, hygiene, and bespoke standards, the following items are strictly non-returnable:</p>
        <ul>
          <li><strong>Pierced Earrings:</strong> Excluded from returns due to statutory hygiene regulations.</li>
          <li><strong>Custom-Tailored or Altered Apparel:</strong> Pieces custom-sized or tailored specifically to patron specifications.</li>
          <li><strong>Items Marked Final Sale:</strong> Promotional or archive sale pieces explicitly designated as non-returnable.</li>
        </ul>
      </article>

      <article className="policy-section-block">
        <h3>4. Complimentary Reverse Doorstep Pickup</h3>
        <p>Once your return request is logged and approved, our dedicated courier partner will arrange a doorstep pickup from your address within 24 to 48 business hours at no additional charge.</p>
      </article>

      <article className="policy-section-block">
        <h3>5. Quality Inspection & Refund Process</h3>
        <p>Returned items undergo an artisanal quality verification upon arrival at our atelier (usually within 48 hours). Once approved:</p>
        <ul>
          <li><strong>Prepaid Transactions:</strong> Refunds are credited back to your original payment method (Credit/Debit Card, Net Banking, or UPI) within 5 to 7 business days.</li>
          <li><strong>Cash on Delivery (COD):</strong> Refunds are processed via direct NEFT bank transfer to your provided account details, or issued as store credit upon your request.</li>
        </ul>
      </article>

      <article className="policy-section-block">
        <h3>6. Seamless Exchanges for Size or Style</h3>
        <p>Need a different size or apparel fit? We provide one complimentary exchange per order with expedited dispatch as soon as the original piece is collected.</p>
      </article>
    </PolicyLayout>
  )
}
