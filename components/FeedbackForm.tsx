'use client';
import { useState, useRef, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  rating: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function FeedbackForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '', rating: 0 });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [hoverStar, setHoverStar] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal, .reveal-scale');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.message.trim()) newErrors.message = 'Please write a message';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('🎉 Thank you! Your feedback has been submitted.', 'success');
        setForm({ name: '', email: '', phone: '', message: '', rating: 0 });
        setErrors({});
      } else {
        showToast(data.error || 'Something went wrong.', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: keyof FormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="section feedback-section" id="feedback" ref={sectionRef}>
      <div className="section-header reveal">
        <span className="section-label">Share Your Experience</span>
        <h2 className="section-title">Leave Us Your <span>Feedback</span></h2>
        <p className="section-desc">
          Your words inspire us to tell Amritsar&apos;s story better. We read every message.
        </p>
        <div className="section-divider" />
      </div>

      <div className="feedback-wrapper">
        <div className="feedback-card reveal-scale">
          {/* Rating */}
          <div className="form-group" style={{ textAlign: 'center', marginBottom: 28 }}>
            <label className="form-label" style={{ textAlign: 'center', display: 'block', fontSize: '1rem' }}>
              Rate Your Experience
            </label>
            <div className="star-rating" style={{ justifyContent: 'center' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${(hoverStar || form.rating) >= star ? 'active' : ''}`}
                  onMouseEnter={() => setHoverStar(star)}
                  onMouseLeave={() => setHoverStar(0)}
                  onClick={() => update('rating', star)}
                  aria-label={`Rate ${star} stars`}
                  id={`star-${star}`}
                >
                  ★
                </button>
              ))}
            </div>
            {form.rating > 0 && (
              <p style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', marginTop: 6, fontWeight: 500 }}>
                {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent! 🌟'][form.rating]}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="feedback-name">Full Name *</label>
                <input
                  id="feedback-name"
                  className="form-input"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="feedback-phone">Phone</label>
                <input
                  id="feedback-phone"
                  className="form-input"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="feedback-email">Email Address *</label>
              <input
                id="feedback-email"
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="feedback-message">Your Message *</label>
              <textarea
                id="feedback-message"
                className="form-input"
                placeholder="Tell us what you loved, or how we can improve..."
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
              />
              {errors.message && <p className="error-text">{errors.message}</p>}
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="form-submit"
                disabled={submitting}
                id="feedback-submit"
              >
                {submitting ? '⏳ Sending...' : '✨ Submit Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] px-5 py-2.5 rounded-full border bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(201,162,39,0.12)] flex items-center gap-2 animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)_both] max-w-[90%] w-max text-xs sm:text-sm font-medium"
          style={{
            borderColor: toast.type === 'success' ? 'rgba(201, 162, 39, 0.3)' : 'rgba(239, 68, 68, 0.3)',
            color: toast.type === 'success' ? '#8B6914' : '#b91c1c',
          }}
        >
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.msg}</span>
        </div>
      )}
    </section>
  );
}
