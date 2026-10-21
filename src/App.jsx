import React, { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const HeaderMarkup = "<div class=\"topbar\">Ace of Fades Barbershop · Omaha, Nebraska</div>\n  <header class=\"site-header\"><div class=\"wrap nav\">\n    <a class=\"brand\" href=\"#home\"><img src=\"/logo.webp\" alt=\"Ace of Fades logo\"><span>ACE OF FADES<small>BARBERSHOP · OMAHA</small></span></a>\n    <nav class=\"navlinks\" aria-label=\"Main navigation\"><a href=\"#home\">Home</a><a href=\"#services\">Services</a><a href=\"#about\">About us</a><a href=\"#reviews\">Reviews</a><a href=\"#contact\">Location</a></nav>\n    <a class=\"button nav-cta\" href=\"https://square.site/book/J2XJ7XFND7NK8/ace-of-fades-ne-13th-street-omaha-ne\" target=\"_blank\" rel=\"noopener\">Book now</a>\n    <button class=\"menu-toggle\" aria-label=\"Open navigation\" aria-expanded=\"false\">☰</button>\n  </div></header>";
const FooterMarkup = "<footer><div class=\"wrap\"><div class=\"footer-grid\"><div class=\"footer-brand\"><img src=\"/logo.webp\" alt=\"Ace of Fades logo\"><strong>ACE OF FADES</strong><p>Ace of Fades · 2601 S 13th St, Omaha, Nebraska 68108</p></div><div class=\"footer-col\"><h3>Menu</h3><a href=\"#home\">Home</a><a href=\"#about\">About</a><a href=\"#services\">Services</a><a href=\"#reviews\">Reviews</a></div><div class=\"footer-col\"><h3>Quick links</h3><a href=\"https://square.site/book/J2XJ7XFND7NK8/ace-of-fades-ne-13th-street-omaha-ne\" target=\"_blank\" rel=\"noopener\">Book an appointment</a><a href=\"https://maps.google.com/?q=2601+S+13th+St,+Omaha,+NE+68108\" target=\"_blank\" rel=\"noopener\">Directions</a><a href=\"mailto:aceoffadesne@gmail.com\">Email the shop</a></div><div class=\"footer-col\"><h3>Contact</h3><a href=\"tel:+15314667719\">(531) 466-7719</a><a href=\"mailto:aceoffadesne@gmail.com\">aceoffadesne@gmail.com</a><a href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\">Instagram</a></div></div><div class=\"footer-bottom\"><span>© <span data-year></span> Ace of Fades Barbershop</span><span class=\"social\"><a href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\">Instagram</a><a href=\"https://maps.app.goo.gl/78Yvgv1qHKnR2eRy7\" target=\"_blank\" rel=\"noopener\">Google reviews</a></span><span>Omaha, Nebraska</span></div></div></footer>";
const LocationMarkup = "<section class=\"location\" id=\"contact\"><div class=\"wrap location-grid\">\n      <div class=\"location-copy\"><span class=\"eyebrow\" style=\"color:var(--orange)\">Good cuts, good company</span><h2 class=\"display\">Service beyond expectation</h2><p>Come by for your next cut, beard cleanup, or a little time in the chair. We’re on South 13th Street in Omaha.</p><a class=\"button\" href=\"https://square.site/book/J2XJ7XFND7NK8/ace-of-fades-ne-13th-street-omaha-ne\" target=\"_blank\" rel=\"noopener\">Book an appointment</a></div>\n      <iframe class=\"location-map\" title=\"Map to 2601 S 13th St, Omaha\" loading=\"lazy\" src=\"https://www.google.com/maps?q=2601+S+13th+St,+Omaha,+NE+68108&output=embed\"></iframe>\n      <div class=\"location-info\"><div class=\"info-row\"><span class=\"info-icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/></svg></span><div><h3>Location</h3><p>2601 S 13th St<br>Omaha, NE 68108</p><a href=\"https://maps.google.com/?q=2601+S+13th+St,+Omaha,+NE+68108\" target=\"_blank\" rel=\"noopener\">Get directions</a></div></div>\n      <div class=\"info-row\"><span class=\"info-icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.1a2 2 0 0 1-.6 1.7L7.2 10.3a16 16 0 0 0 6.5 6.5l1.8-1.8a2 2 0 0 1 1.7-.6l3.1.5a2 2 0 0 1 1.7 2Z\"/></svg></span><div><h3>Call the shop</h3><p><a href=\"tel:+15314667719\">(531) 466-7719</a><br>Tue–Sat · Sunday by appointment<br>Monday · Closed</p></div></div></div>\n    </div></section>";
const PortfolioMarkup = "<section class=\"portfolio\" id=\"about\"><div class=\"wrap\">\n      <div class=\"portfolio-head\"><div><span class=\"eyebrow\" style=\"color:#9a6025\">Our craft</span><h2 class=\"display\">Discover our work</h2><p>From clean fades to classic styles, each cut is shaped around the person in the chair.</p><a class=\"button dark\" href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\">See us on Instagram</a></div><div class=\"portfolio-photos\"><figure><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=720&q=80\" alt=\"Barber giving a detailed haircut\"><figcaption>Precision fades</figcaption></figure><figure><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=720&q=80\" alt=\"Barber shaping a modern style\"><figcaption>Modern styles</figcaption></figure><figure><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=720&q=80\" alt=\"Barber tools and haircut detail\"><figcaption>Attention to detail</figcaption></figure></div></div>\n    </div></section>";
const ServicesMarkup = "<section class=\"reviews-prices\" id=\"services\"><div class=\"wrap split\">\n      <div id=\"reviews\"><div class=\"testimonial-list\"><article class=\"testimonial\"><div class=\"review-kicker\">Google review highlight</div><blockquote>Nick says Brad is easy to talk with, delivers consistent cuts, and listens carefully to what he wants.</blockquote><cite>Nick Huff</cite></article><article class=\"testimonial\"><div class=\"review-kicker\">Google review highlight</div><blockquote>Sylvia says she and her son have visited for years and value the team’s skill and welcoming atmosphere.</blockquote><cite>Sylvia Orduna</cite></article><article class=\"testimonial\"><div class=\"review-kicker\">Google review highlight</div><blockquote>Jordan says Juan checks that everything looks right and makes sure he is satisfied before he leaves.</blockquote><cite>Jordan Norris</cite></article></div><div class=\"review-source\"><span>4.9★ on Google · 1,000+ reviews</span><a href=\"https://maps.app.goo.gl/78Yvgv1qHKnR2eRy7\" target=\"_blank\" rel=\"noopener\">Read all reviews</a></div></div>\n      <div class=\"prices\"><span class=\"eyebrow\" style=\"color:#9a6025\">The service menu</span><h2 class=\"display\">Our services</h2><div class=\"price-row\"><span>Adult haircut · 17+</span><strong>$50 · 45 min</strong></div><div class=\"price-row\"><span>Adult haircut + beard</span><strong>$60 · 50 min</strong></div><div class=\"price-row\"><span>Young adult / kids</span><strong>$45 · 45 min</strong></div><div class=\"price-row\"><span>Haircut + beard + eyebrows</span><strong>$65 · 60 min</strong></div><div class=\"price-row\"><span>Members special · full grooming</span><strong>$90 · 75 min</strong></div><div class=\"price-row\"><span>Adult haircut + eyebrows</span><strong>$55 · 45 min</strong></div><div class=\"price-row\"><span>Sunday appointment</span><strong>From $60</strong></div><div class=\"price-row\"><span>Early / after hours</span><strong>From $70</strong></div><div class=\"price-row\"><span>House / business call</span><strong>From $150</strong></div><p class=\"price-note\">Prices may vary by barber. Sunday, early, and after-hours service requires an appointment. Confirm the current price and availability when booking.</p><a class=\"button dark\" style=\"margin-top:19px\" href=\"https://square.site/book/J2XJ7XFND7NK8/ace-of-fades-ne-13th-street-omaha-ne\" target=\"_blank\" rel=\"noopener\">Reserve your chair</a></div>\n    </div></section>";
const TeamMarkup = "<section class=\"team\"><div class=\"wrap\"><div class=\"team-heading\"><span class=\"eyebrow\" style=\"color:#9a6025\">The people behind the cut</span><h2 class=\"display\">Meet our experts</h2><p>Choose a barber and a time that works for you in the online booking menu.</p><p class=\"photo-note\">Portraits are illustrative and do not represent the barbers pictured.</p></div><div class=\"team-grid\">\n      <article class=\"barber\"><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80\" alt=\"Illustrative black and white portrait of a barber\"><div class=\"barber-caption\"><strong>Alan Adame</strong><span>Barber · Book online</span></div><div class=\"barber-social\"><span class=\"linkedin\" aria-label=\"LinkedIn profile not provided\">in</span><a href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\" aria-label=\"Ace of Fades Instagram\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"18\" cy=\"6\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg></a></div></article>\n      <article class=\"barber\"><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80\" alt=\"Illustrative black and white portrait of a barber\"><div class=\"barber-caption\"><strong>Angel Flores</strong><span>Barber · Book online</span></div><div class=\"barber-social\"><span class=\"linkedin\" aria-label=\"LinkedIn profile not provided\">in</span><a href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\" aria-label=\"Ace of Fades Instagram\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"18\" cy=\"6\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg></a></div></article>\n      <article class=\"barber\"><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=700&q=80\" alt=\"Illustrative black and white portrait of a barber\"><div class=\"barber-caption\"><strong>Derek Beltran</strong><span>Barber · Book online</span></div><div class=\"barber-social\"><span class=\"linkedin\" aria-label=\"LinkedIn profile not provided\">in</span><a href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\" aria-label=\"Ace of Fades Instagram\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"18\" cy=\"6\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg></a></div></article>\n      <article class=\"team-cta\"><div><h3>Join our team</h3><p>Interested in working with the shop? Send us a note.</p><a href=\"mailto:aceoffadesne@gmail.com\">Get in touch ↗</a></div></article>\n    </div></div></section>";

const BOOKING_URL = 'https://square.site/book/J2XJ7XFND7NK8/ace-of-fades-ne-13th-street-omaha-ne';

function Markup({ html }) {
  const bookingLinksRewritten = html.replaceAll(
    `href="${BOOKING_URL}" target="_blank" rel="noopener"`,
    'href="#booking"',
  );
  return <div dangerouslySetInnerHTML={{ __html: bookingLinksRewritten }} />;
}

function Header({ menuOpen }) {
  const html = HeaderMarkup
    .replace('class="navlinks"', `class="navlinks${menuOpen ? ' open' : ''}"`)
    .replace('aria-label="Open navigation" aria-expanded="false"', `aria-label="${menuOpen ? 'Close' : 'Open'} navigation" aria-expanded="${menuOpen}"`)
    .replace('>☰</button>', `>${menuOpen ? '×' : '☰'}</button>`)
    .replace('</nav>', '<a href="#booking">Book appointment</a></nav>');
  return <Markup html={html} />;
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-inner">
        <p className="hero-caption">Our barbers take time to understand the look you want, then bring it to life with care and precision.</p>
        <h1 className="hero-title display">Where tradition<br />meets modern style</h1>
        <a className="button hero-booking-link" href="#booking">Book an appointment</a>
      </div>
    </section>
  );
}

function getShopDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const dateParts = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
}

function formatTime(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
}

function formatDate(date) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day, 12).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function BookingSection({ open, onClose }) {
  const [catalog, setCatalog] = useState({ services: [], barbers: [], schedule: null });
  const [form, setForm] = useState({ name: '', email: '', phone: '', serviceId: '', barberId: '', date: '' });
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(0);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [catalogError, setCatalogError] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');
  const [demoAvailability, setDemoAvailability] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [availabilityVersion, setAvailabilityVersion] = useState(0);

  useEffect(() => {
    let active = true;
    fetch('/api/catalog')
      .then(async (response) => {
        if (!response.ok) throw new Error('Booking service is unavailable.');
        return response.json();
      })
      .then((data) => { if (active) setCatalog(data); })
      .catch(() => { if (active) setCatalogError('The booking service is unavailable. Start the app with npm run dev.'); })
      .finally(() => { if (active) setLoadingCatalog(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!open || !form.serviceId || !form.barberId || !form.date) {
      setSlots([]);
      setSelectedTime('');
      setAvailabilityError('');
      setDemoAvailability(false);
      setLoadingSlots(false);
      return undefined;
    }

    let active = true;
    let firstLoad = true;
    const loadAvailability = async () => {
      if (firstLoad) setLoadingSlots(true);
      try {
        const query = new URLSearchParams({ date: form.date, barberId: form.barberId, serviceId: form.serviceId });
        const response = await fetch(`/api/availability?${query}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load availability.');
        if (active) {
          setSlots(data.slots);
          setAvailabilityError('');
          setDemoAvailability(data.demo === true);
          setSelectedTime((current) => (
            data.slots.some((slot) => slot.time === current && slot.available) ? current : ''
          ));
        }
      } catch (error) {
        if (active) setAvailabilityError(error.message || 'Live availability could not be loaded. Try again shortly.');
      } finally {
        if (active && firstLoad) setLoadingSlots(false);
        firstLoad = false;
      }
    };

    loadAvailability();
    const interval = window.setInterval(loadAvailability, 30_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [open, form.serviceId, form.barberId, form.date, availabilityVersion]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const selectedService = catalog.services.find((service) => service.id === form.serviceId);
  const selectedBarber = catalog.barbers.find((barber) => barber.id === form.barberId);
  const steps = ['Service', 'Barber', 'Date & time', 'Your details'];

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name === 'date') setSelectedTime('');
    setConfirmation(null);
    setSubmitError('');
  }

  function closeModal() {
    setStep(0);
    setConfirmation(null);
    onClose();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedTime || demoAvailability) return;
    setSubmitting(true);
    setSubmitError('');
    setConfirmation(null);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, time: selectedTime }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) setAvailabilityVersion((version) => version + 1);
        throw new Error(data.error || 'Unable to book this time.');
      }
      setConfirmation(data.booking);
      setSelectedTime('');
      setAvailabilityVersion((version) => version + 1);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="booking-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
        <header className="booking-modal-header">
          <div>
            <span className="eyebrow">Ace of Fades · Omaha</span>
            <h2 className="display" id="booking-modal-title">Book your appointment</h2>
          </div>
          <button className="booking-modal-close" type="button" onClick={closeModal} aria-label="Close booking">×</button>
        </header>

        {catalogError && <p className="booking-alert" role="alert">{catalogError}</p>}
        {confirmation ? (
          <div className="booking-confirmation" role="status">
            <span className="booking-confirmation-mark" aria-hidden="true">✓</span>
            <span className="eyebrow">Appointment confirmed</span>
            <h3>{confirmation.serviceName}</h3>
            <p>With {confirmation.barberName}</p>
            <p>{formatDate(confirmation.date)} · {formatTime(confirmation.time)}</p>
            <small>Confirmation #{confirmation.id.slice(0, 8).toUpperCase()}</small>
            <button className="button booking-submit" onClick={closeModal} type="button">Done</button>
          </div>
        ) : (
          <>
            <nav className="booking-progress" aria-label="Booking steps">
              {steps.map((label, index) => (
                <button
                  className={step === index ? 'active' : step > index ? 'complete' : ''}
                  key={label}
                  type="button"
                  disabled={index >= step}
                  aria-current={step === index ? 'step' : undefined}
                  onClick={() => { setStep(index); setSubmitError(''); }}
                >
                  <span>{label}</span>
                </button>
              ))}
            </nav>

            <form className="booking-wizard" onSubmit={handleSubmit}>
              {step === 0 && (
                <div className="wizard-step">
                  <div className="wizard-step-heading">
                    <h3>Choose a service</h3>
                    <p>Every service includes time with one of our barbers.</p>
                  </div>
                  {loadingCatalog ? <p className="booking-hint">Loading services…</p> : (
                    <div className="service-options">
                      {catalog.services.map((service) => (
                        <button
                          className={`service-option${form.serviceId === service.id ? ' selected' : ''}`}
                          key={service.id}
                          onClick={() => {
                            setForm((current) => ({ ...current, serviceId: service.id, barberId: '', date: '' }));
                            setSelectedTime('');
                            setStep(1);
                          }}
                          type="button"
                        >
                          <span className="service-option-main">
                            <strong>{service.name}</strong>
                            <span>{service.description}</span>
                          </span>
                          <span className="service-option-meta">
                            <strong>${service.price}</strong>
                            <span>{service.duration} min</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {step === 1 && (
                <div className="wizard-step">
                  <div className="wizard-step-heading">
                    <h3>Choose your barber</h3>
                    <p>{selectedService?.name || 'Selected service'} · ${selectedService?.price || 0} · {selectedService?.duration || 0} min</p>
                  </div>
                  <div className="barber-options">
                    {catalog.barbers.map((barber) => (
                      <button
                        className={`barber-option${form.barberId === barber.id ? ' selected' : ''}`}
                        key={barber.id}
                        onClick={() => {
                          setForm((current) => ({ ...current, barberId: barber.id, date: '' }));
                          setSelectedTime('');
                          setStep(2);
                        }}
                        type="button"
                      >
                        <span className="barber-initials">{barber.name.split(' ').map((part) => part[0]).join('')}</span>
                        <span><strong>{barber.name}</strong><small>Barber</small></span>
                        <span className="option-arrow" aria-hidden="true">›</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="wizard-step">
                  <div className="wizard-step-heading">
                    <h3>Pick a date and time</h3>
                    <p>{selectedBarber?.name} · {selectedService?.name}</p>
                  </div>
                  <div className="date-and-times">
                    <DatePicker
                      label="Appointment date"
                      value={form.date ? dayjs(form.date) : null}
                      minDate={dayjs(getShopDate())}
                      shouldDisableDate={(date) => selectedService?.sundayOnly
                        ? date.day() !== 0
                        : date.day() === 0 || date.day() === 1}
                      onChange={(date) => {
                        setForm((current) => ({ ...current, date: date?.isValid() ? date.format('YYYY-MM-DD') : '' }));
                        setSelectedTime('');
                      }}
                      slotProps={{
                        textField: { required: true, size: 'small', fullWidth: true, sx: formFieldStyles },
                      }}
                    />
                    <div className="booking-time-field">
                      <div className="booking-time-heading">
                        <span>Available times</span>
                        <small>{demoAvailability ? 'Example times · not live' : 'Refreshes every 30 seconds'}</small>
                      </div>
                      {!form.date ? (
                        <p className="booking-hint">Choose a date to see live availability.</p>
                      ) : loadingSlots ? (
                        <p className="booking-hint">Checking available times…</p>
                      ) : availabilityError ? (
                        <p className="booking-alert" role="alert">{availabilityError}</p>
                      ) : slots.length ? (
                        <div className="booking-times">
                          {slots.map((slot) => (
                            <button
                              className={`time-slot${selectedTime === slot.time ? ' selected' : ''}`}
                              disabled={!slot.available}
                              key={slot.time}
                              onClick={() => setSelectedTime(slot.time)}
                              type="button"
                              aria-pressed={selectedTime === slot.time}
                            >
                              {formatTime(slot.time)}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="booking-hint">No times are available. Choose another date or barber.</p>
                      )}
                      {demoAvailability && <p className="booking-demo-note" role="status">Example times only. Live booking requires a connected schedule.</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="wizard-step">
                  <div className="wizard-step-heading">
                    <h3>Your details</h3>
                    <p>Review the appointment and tell us how to reach you.</p>
                  </div>
                  <div className="review-layout">
                    <div className="customer-fields">
                      <TextField name="name" label="Your name" autoComplete="name" required size="small" fullWidth value={form.name} onChange={updateForm} sx={formFieldStyles} />
                      <TextField name="email" label="Email" type="email" autoComplete="email" required size="small" fullWidth value={form.email} onChange={updateForm} sx={formFieldStyles} />
                      <TextField name="phone" label="Phone (optional)" type="tel" autoComplete="tel" size="small" fullWidth value={form.phone} onChange={updateForm} sx={formFieldStyles} />
                    </div>
                    <aside className="booking-summary">
                      <h4>Appointment summary</h4>
                      <dl>
                        <div><dt>Service</dt><dd>{selectedService?.name}</dd></div>
                        <div><dt>Barber</dt><dd>{selectedBarber?.name}</dd></div>
                        <div><dt>Date</dt><dd>{formatDate(form.date)}</dd></div>
                        <div><dt>Time</dt><dd>{formatTime(selectedTime)}</dd></div>
                        <div className="booking-total"><dt>Service price</dt><dd>${selectedService?.price}</dd></div>
                      </dl>
                    </aside>
                  </div>
                  <p className="booking-payment-note">Payment is handled at the shop.</p>
                  {demoAvailability && <p className="booking-demo-note" role="status">This is a preview only. Appointment confirmation is disabled until live booking storage is configured.</p>}
                </div>
              )}

              {submitError && <p className="booking-alert" role="alert">{submitError}</p>}
              <footer className="wizard-footer">
                {step > 0 ? <button className="wizard-back" onClick={() => { setStep((current) => current - 1); setSubmitError(''); }} type="button">Back</button> : <span />}
                {step < 2 ? null : step === 2 ? (
                  <button className="button booking-submit" disabled={!selectedTime} onClick={() => setStep(3)} type="button">Continue</button>
                ) : (
                  <button className="button booking-submit" disabled={!selectedTime || demoAvailability || submitting || loadingCatalog} onClick={handleSubmit} type="button">
                    {submitting ? 'Confirming…' : demoAvailability ? 'Demo only' : 'Confirm appointment'}
                  </button>
                )}
              </footer>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

const formFieldStyles = {
  '&.MuiFormControl-root': { margin: '10px 0' },
  '& .MuiInputLabel-root': {
    color: '#433a31',
    fontSize: '0.78rem',
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#a86a22' },
  '& .MuiInputLabel-root.MuiInputLabel-shrink:not(.Mui-focused)': {
    color: '#5c5146',
    textShadow: 'none',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '3px',
    backgroundColor: 'rgba(255,255,255,.96)',
    color: '#29231e',
    fontSize: '0.76rem',
  },
  '& .MuiPickersOutlinedInput-root': {
    borderRadius: '3px',
    backgroundColor: 'rgba(255,255,255,.96)',
    color: '#29231e',
    fontSize: '0.76rem',
  },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,.55)' },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f0a044' },
  '& .MuiInputBase-input': { py: '9px' },
};

function Location() {
  const html = LocationMarkup.replace(
    'https://www.google.com/maps?q=2601+S+13th+St,+Omaha,+NE+68108&output=embed',
    'https://www.openstreetmap.org/export/embed.html?bbox=-95.939%2C41.232%2C-95.928%2C41.238&layer=mapnik&marker=41.234934%2C-95.933035',
  ).replace('loading="lazy"', 'loading="eager"');
  return <Markup html={html} />;
}
function Portfolio() { return <Markup html={PortfolioMarkup} />; }
function Services() { return <Markup html={ServicesMarkup} />; }
function Team() { return <Markup html={TeamMarkup} />; }
function Footer() {
  return <Markup html={FooterMarkup.replace('<footer>', '<footer class="site-footer">')} />;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
  }, []);

  function handleClick(event) {
    if (event.target.closest('.menu-toggle')) {
      setMenuOpen((open) => !open);
      return;
    }
    if (event.target.closest('a[href="#booking"]')) {
      event.preventDefault();
      setBookingOpen(true);
      setMenuOpen(false);
      return;
    }
    if (event.target.closest('.navlinks a')) setMenuOpen(false);
  }

  return (
    <div onClick={handleClick}>
      <Header menuOpen={menuOpen} />
      <main><Hero /><Location /><Portfolio /><Services /><Team /></main>
      <Footer />
      <BookingSection open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
