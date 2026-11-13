import React, { useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function CustomerCarePage({ onNavigate }) {
  const [activeFaq, setActiveFaq] = useState(null)
  const toggleFaq = index => setActiveFaq(activeFaq === index ? null : index)

  const faqs = [
    {
      q: "How can I track my order once placed?",
      a: "Once your order is dispatched from our Bengaluru atelier, you will receive an email and SMS notification containing your AWB tracking number and a live courier tracking link. You can monitor every milestone until safe delivery at your door."
    },
    {
      q: "What are your shipping timelines and delivery charges?",
      a: "We offer complimentary express shipping across India on all orders exceeding ₹5,000. Orders under ₹5,000 incur a nominal flat fee of ₹150. Metro deliveries arrive within 2–4 business days, while non-metro addresses typically arrive within 4–6 business days."
    },
    {
      q: "What is your return and exchange policy?",
      a: "We provide a 7-day hassle-free return and exchange window from the date of delivery. Pieces must be unworn, in pristine condition, with all original security seals, certificates, and signature packaging intact. Complimentary doorstep reverse pickup is scheduled upon approval."
    },
    {
      q: "How do I care for my La Cinderae jewellery and apparel?",
      a: "Keep jewellery away from perfumes, hairsprays, lotions, and excessive moisture. Store each item in its original anti-tarnish pouch. For apparel, please review the internal care label — we recommend gentle dry cleaning or hand-washing in cool water for fine silk, modal, and linen blends."
    },
    {
      q: "Are your jewellery pieces authentic and hallmarked?",
      a: "Yes. Every La Cinderae creation is crafted with authentic, high-grade metals and precious materials, hallmarked and inspected by master artisans to ensure hypoallergenic comfort and lasting brilliance."
    },
    {
      q: "Can I request gift packaging or a personalized handwritten note?",
      a: "Every La Cinderae piece arrives in our signature minimalist luxury packaging. If you would like to include a complimentary handwritten gift card, simply specify your message at checkout or inform our concierge immediately after ordering."
    }
  ]

  return (
    <main className="brand-page customer-care-page">
      {/* Hero Section */}
      <section className="care-hero">
        <div className="care-hero-content">
          <span className="eyebrow">AT YOUR SERVICE</span>
          <h1>Customer Care & Concierge</h1>
          <p>Thoughtful assistance, styling consultations, and dedicated support for your La Cinderae experience.</p>
          <div className="care-hero-actions">
            <button className="cream-btn" onClick={() => onNavigate('Contact')}>
              Speak With Concierge <ArrowRight size={14} />
            </button>
            <button className="cream-outline" onClick={() => document.getElementById('care-faqs')?.scrollIntoView({ behavior: 'smooth' })}>
              Browse FAQs
            </button>
          </div>
        </div>
      </section>

      {/* Direct Assistance Channels */}
      <section className="section-pad care-channels-section">
        <div className="section-heading">
          <span className="eyebrow">DIRECT ASSISTANCE</span>
          <h2>How May We Assist You?</h2>
          <p>Choose your preferred channel for prompt, personal care.</p>
        </div>
        <div className="care-channels-grid">
          <div className="care-channel-card">
            <div className="care-channel-icon">✉</div>
            <h3>Email Concierge</h3>
            <p>For order queries, delivery updates, or bespoke requests.</p>
            <a href="mailto:concierge@lacinderae.com" className="care-contact-val">concierge@lacinderae.com</a>
            <small>Response within 24 hours · Mon – Sat</small>
          </div>
          <div className="care-channel-card">
            <div className="care-channel-icon">☏</div>
            <h3>Direct Assistance</h3>
            <p>Speak directly with our dedicated client advisory team.</p>
            <a href="tel:+918049201800" className="care-contact-val">+91 80 4920 1800</a>
            <small>10:00 AM – 7:00 PM IST · Mon – Sat</small>
          </div>
          <div className="care-channel-card">
            <div className="care-channel-icon">✦</div>
            <h3>Styling & Consultations</h3>
            <p>Personalized size recommendations and curated wardrobe pairing.</p>
            <button className="care-link-btn" onClick={() => onNavigate('Contact')}>
              Book Consultation <ArrowRight size={12} />
            </button>
            <small>Complimentary private consultation</small>
          </div>
        </div>
      </section>

      {/* Policy & Guide Shortcuts */}
      <section className="care-pillars-section">
        <div className="care-pillars-wrap">
          <div className="care-pillar-card" onClick={() => onNavigate('Shipping Policy')}>
            <span className="care-pillar-num">01</span>
            <div>
              <h4>Shipping & Delivery</h4>
              <p>Learn about dispatch times, complimentary shipping, and express delivery across India.</p>
              <span className="care-pillar-link">Read Shipping Policy →</span>
            </div>
          </div>
          <div className="care-pillar-card" onClick={() => onNavigate('Returns Policy')}>
            <span className="care-pillar-num">02</span>
            <div>
              <h4>Returns & Exchanges</h4>
              <p>Details on our 7-day complimentary return window, eligibility, and instant refunds.</p>
              <span className="care-pillar-link">Read Returns Policy →</span>
            </div>
          </div>
          <div className="care-pillar-card" onClick={() => onNavigate('Privacy Policy')}>
            <span className="care-pillar-num">03</span>
            <div>
              <h4>Privacy & Security</h4>
              <p>How we ensure complete data discretion, bank-grade encryption, and consumer safety.</p>
              <span className="care-pillar-link">Read Privacy Policy →</span>
            </div>
          </div>
          <div className="care-pillar-card" onClick={() => onNavigate('Terms & Conditions')}>
            <span className="care-pillar-num">04</span>
            <div>
              <h4>Terms & Conditions</h4>
              <p>Our service agreements, authentic product representations, and store guidelines.</p>
              <span className="care-pillar-link">Read Store Terms →</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="care-faqs" className="section-pad care-faq-section">
        <div className="section-heading">
          <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
          <h2>Common Inquiries</h2>
          <p>Find immediate clarity on our services, products, and ordering process.</p>
        </div>
        <div className="care-faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`care-faq-item ${activeFaq === idx ? 'open' : ''}`}>
              <button
                className="care-faq-question"
                onClick={() => toggleFaq(idx)}
                aria-expanded={activeFaq === idx}
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`care-faq-chevron ${activeFaq === idx ? 'rotated' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="care-faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Concierge CTA Footer Banner */}
      <section className="care-cta">
        <span className="eyebrow light">STILL NEED ASSISTANCE?</span>
        <h2>We are always here to help.</h2>
        <p>Our concierge is at your service for any questions, custom orders, or personal requests.</p>
        <button className="cream-btn" onClick={() => onNavigate('Contact')}>
          Send a Note <ArrowRight size={14} />
        </button>
      </section>
    </main>
  )
}
