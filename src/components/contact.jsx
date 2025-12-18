import React from "react";

export default function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <p className="contact-intro">
        Have a question about an order, a product, or Shop Nexa in general? We’d
        love to hear from you.
      </p>

      <div className="contact-grid">
        {/* Contact Form */}
        <form className="contact-form">
          <label>
            Full Name
            <input type="text" placeholder="Your name" />
          </label>

          <label>
            Email Address
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            Message
            <textarea rows="5" placeholder="How can we help you?" />
          </label>

          <button type="submit">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <h3>Shop Nexa</h3>
          <p>Email: support@shopnexa.com</p>
          <p>Phone: +234 800 000 0000</p>
          <p>Hours: Mon – Fri, 9am – 6pm</p>
        </div>
      </div>
    </div>
  );
}
