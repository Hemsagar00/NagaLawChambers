"use client";

/**
 * Pure presentational sub-component: the 5 inputs of the inquiry form.
 * Kept separate so ContactForm can focus on layout, status, and submit chrome.
 */
export default function InquiryFields() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-7">
        <div className="field">
          <input
            type="text"
            name="name"
            required
            placeholder=" "
            data-testid="form-name"
          />
          <label>Full Name</label>
        </div>
        <div className="field">
          <input
            type="email"
            name="email"
            required
            placeholder=" "
            data-testid="form-email"
          />
          <label>Email Address</label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-7">
        <div className="field">
          <input
            type="tel"
            name="phone"
            placeholder=" "
            data-testid="form-phone"
          />
          <label>Phone (optional)</label>
        </div>
        <div className="field filled">
          <select
            name="service"
            defaultValue="Land Revenue"
            data-testid="form-service"
          >
            <option>Land Revenue</option>
            <option>Civil Litigation</option>
            <option>Property Documentation</option>
            <option>Court Representation</option>
            <option>Other / Not sure</option>
          </select>
          <label>Matter Type</label>
        </div>
      </div>

      <div className="field">
        <textarea
          name="message"
          rows={4}
          required
          placeholder=" "
          data-testid="form-message"
        />
        <label>Briefly describe your matter</label>
      </div>
    </>
  );
}
