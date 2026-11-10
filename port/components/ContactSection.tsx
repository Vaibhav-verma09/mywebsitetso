'use client';

import { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Client-side validations
    if (!formData.name.trim()) {
      setFeedback({ type: 'error', message: 'Please provide your full name.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFeedback({ type: 'error', message: 'Please provide a valid email address.' });
      return;
    }

    if (formData.message.trim().length < 10) {
      setFeedback({ type: 'error', message: 'Message must be at least 10 characters long.' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setFeedback({
        type: 'success',
        message: 'Your enquiry has been successfully delivered and logged in Vaibhav’s dashboard!',
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please reach out directly by email.';
      setFeedback({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-line overflow-hidden">
      {/* Glow */}
      <div className="orb-glow-1" style={{ top: '30%', left: '40%' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="kick justify-center">Direct Communication</div>
          <h2 className="font-serif text-4xl sm:text-6xl text-ink leading-tight">
            Let’s build <em className="text-gold italic not-italic">something real.</em>
          </h2>
          <p className="text-muted text-base sm:text-lg mt-4 font-light">
            Open to summer software engineering internships, hackathon collaborations, and freelance studio projects through TSO Groups.
          </p>

          {/* Quick Direct Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="mailto:vermavaibhav710@gmail.com"
              className="btn-solid-gold !py-2.5 !px-5 text-xs flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>vermavaibhav710@gmail.com</span>
            </a>
            <a
              href="tel:+919151362992"
              className="btn-gold !py-2.5 !px-5 text-xs flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>+91 9151362992</span>
            </a>
          </div>
        </div>

        {/* Real Form Box */}
        <div className="max-w-2xl mx-auto bg-surface-1 border border-lineGold/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-dim font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Sharma"
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-3 text-sm text-ink placeholder:text-dim/60 focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-dim font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-3 text-sm text-ink placeholder:text-dim/60 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="contact-subject" className="block text-xs uppercase tracking-wider text-dim font-semibold mb-2">
                Subject (Optional)
              </label>
              <input
                id="contact-subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Internship Inquiry / Website Project / Studio Branding"
                className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-3 text-sm text-ink placeholder:text-dim/60 focus:outline-none transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-dim font-semibold mb-2">
                Message *
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Provide details about your project scope, engineering requirements, or team opportunity..."
                className="w-full bg-surface-2 border border-line focus:border-gold rounded-xl px-4 py-3 text-sm text-ink placeholder:text-dim/60 focus:outline-none transition-colors resize-y min-h-[120px]"
              />
            </div>

            {/* Feedback Message */}
            {feedback && (
              <div
                className={`p-4 rounded-xl flex items-start gap-3 text-xs leading-relaxed ${
                  feedback.type === 'success'
                    ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
                }`}
                role="status"
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-solid-gold w-full !py-3.5 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validating &amp; Delivering Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Enquiry</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
