import React, { useEffect, useState } from 'react';
import { Button as MuiButton, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const HeaderMarkup = "<div class=\"topbar\">Ace of Fades Barbershop · Omaha, Nebraska</div>\n  <header class=\"site-header\"><div class=\"wrap nav\">\n    <a class=\"brand\" href=\"#home\"><img src=\"/logo.webp\" alt=\"Ace of Fades logo\"><span>ACE OF FADES<small>BARBERSHOP · OMAHA</small></span></a>\n    <nav class=\"navlinks\" aria-label=\"Main navigation\"><a href=\"#home\">Home</a><a href=\"#services\">Services</a><a href=\"#about\">About us</a><a href=\"#reviews\">Reviews</a><a href=\"#contact\">Location</a></nav>\n    <a class=\"button nav-cta\" href=\"https://square.site/book/J2XJ7XFND7NK8/ace-of-fades-ne-13th-street-omaha-ne\" target=\"_blank\" rel=\"noopener\">Book now</a>\n    <button class=\"menu-toggle\" aria-label=\"Open navigation\" aria-expanded=\"false\">☰</button>\n  </div></header>";
const FooterMarkup = "<footer><div class=\"wrap\"><div class=\"footer-grid\"><div class=\"footer-brand\"><img src=\"/logo.webp\" alt=\"Ace of Fades logo\"><strong>ACE OF FADES</strong><p>Ace of Fades · 2601 S 13th St, Omaha, Nebraska 68108</p></div><div class=\"footer-col\"><h3>Menu</h3><a href=\"#home\">Home</a><a href=\"#about\">About</a><a href=\"#services\">Services</a><a href=\"#reviews\">Reviews</a></div><div class=\"footer-col\"><h3>Quick links</h3><a href=\"https://square.site/book/J2XJ7XFND7NK8/ace-of-fades-ne-13th-street-omaha-ne\" target=\"_blank\" rel=\"noopener\">Book an appointment</a><a href=\"https://maps.google.com/?q=2601+S+13th+St,+Omaha,+NE+68108\" target=\"_blank\" rel=\"noopener\">Directions</a><a href=\"mailto:aceoffadesne@gmail.com\">Email the shop</a></div><div class=\"footer-col\"><h3>Contact</h3><a href=\"tel:+15314667719\">(531) 466-7719</a><a href=\"mailto:aceoffadesne@gmail.com\">aceoffadesne@gmail.com</a><a href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\">Instagram</a></div></div><div class=\"footer-bottom\"><span>© <span data-year></span> Ace of Fades Barbershop</span><span class=\"social\"><a href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\">Instagram</a><a href=\"https://maps.app.goo.gl/78Yvgv1qHKnR2eRy7\" target=\"_blank\" rel=\"noopener\">Google reviews</a></span><span>Omaha, Nebraska</span></div></div></footer>";
const LocationMarkup = "<section class=\"location\" id=\"contact\"><div class=\"wrap location-grid\">\n      <div class=\"location-copy\"><span class=\"eyebrow\" style=\"color:var(--orange)\">Good cuts, good company</span><h2 class=\"display\">Service beyond expectation</h2><p>Come by for your next cut, beard cleanup, or a little time in the chair. We’re on South 13th Street in Omaha.</p><a class=\"button\" href=\"https://square.site/book/J2XJ7XFND7NK8/ace-of-fades-ne-13th-street-omaha-ne\" target=\"_blank\" rel=\"noopener\">Book an appointment</a></div>\n      <iframe class=\"location-map\" title=\"Map to 2601 S 13th St, Omaha\" loading=\"lazy\" src=\"https://www.google.com/maps?q=2601+S+13th+St,+Omaha,+NE+68108&output=embed\"></iframe>\n      <div class=\"location-info\"><div class=\"info-row\"><span class=\"info-icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/></svg></span><div><h3>Location</h3><p>2601 S 13th St<br>Omaha, NE 68108</p><a href=\"https://maps.google.com/?q=2601+S+13th+St,+Omaha,+NE+68108\" target=\"_blank\" rel=\"noopener\">Get directions</a></div></div>\n      <div class=\"info-row\"><span class=\"info-icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.1a2 2 0 0 1-.6 1.7L7.2 10.3a16 16 0 0 0 6.5 6.5l1.8-1.8a2 2 0 0 1 1.7-.6l3.1.5a2 2 0 0 1 1.7 2Z\"/></svg></span><div><h3>Call the shop</h3><p><a href=\"tel:+15314667719\">(531) 466-7719</a><br>Tue–Sat · Sunday by appointment<br>Monday · Closed</p></div></div></div>\n    </div></section>";
const PortfolioMarkup = "<section class=\"portfolio\" id=\"about\"><div class=\"wrap\">\n      <div class=\"portfolio-head\"><div><span class=\"eyebrow\" style=\"color:#9a6025\">Our craft</span><h2 class=\"display\">Discover our work</h2><p>From clean fades to classic styles, each cut is shaped around the person in the chair.</p><a class=\"button dark\" href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\">See us on Instagram</a></div><div class=\"portfolio-photos\"><figure><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=720&q=80\" alt=\"Barber giving a detailed haircut\"><figcaption>Precision fades</figcaption></figure><figure><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=720&q=80\" alt=\"Barber shaping a modern style\"><figcaption>Modern styles</figcaption></figure><figure><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=720&q=80\" alt=\"Barber tools and haircut detail\"><figcaption>Attention to detail</figcaption></figure></div></div>\n    </div></section>";
const ServicesMarkup = "<section class=\"reviews-prices\" id=\"services\"><div class=\"wrap split\">\n      <div id=\"reviews\"><div class=\"testimonial-list\"><article class=\"testimonial\"><div class=\"review-kicker\">Google review highlight</div><blockquote>Nick says Brad is easy to talk with, delivers consistent cuts, and listens carefully to what he wants.</blockquote><cite>Nick Huff</cite></article><article class=\"testimonial\"><div class=\"review-kicker\">Google review highlight</div><blockquote>Sylvia says she and her son have visited for years and value the team’s skill and welcoming atmosphere.</blockquote><cite>Sylvia Orduna</cite></article><article class=\"testimonial\"><div class=\"review-kicker\">Google review highlight</div><blockquote>Jordan says Juan checks that everything looks right and makes sure he is satisfied before he leaves.</blockquote><cite>Jordan Norris</cite></article></div><div class=\"review-source\"><span>4.9★ on Google · 1,000+ reviews</span><a href=\"https://maps.app.goo.gl/78Yvgv1qHKnR2eRy7\" target=\"_blank\" rel=\"noopener\">Read all reviews</a></div></div>\n      <div class=\"prices\"><span class=\"eyebrow\" style=\"color:#9a6025\">The service menu</span><h2 class=\"display\">Our services</h2><div class=\"price-row\"><span>Adult haircut · 17+</span><strong>$50 · 45 min</strong></div><div class=\"price-row\"><span>Adult haircut + beard</span><strong>$60 · 50 min</strong></div><div class=\"price-row\"><span>Young adult / kids</span><strong>$45 · 45 min</strong></div><div class=\"price-row\"><span>Haircut + beard + eyebrows</span><strong>$65 · 60 min</strong></div><div class=\"price-row\"><span>Members special · full grooming</span><strong>$90 · 75 min</strong></div><div class=\"price-row\"><span>Adult haircut + eyebrows</span><strong>$55 · 45 min</strong></div><div class=\"price-row\"><span>Sunday appointment</span><strong>From $60</strong></div><div class=\"price-row\"><span>Early / after hours</span><strong>From $70</strong></div><div class=\"price-row\"><span>House / business call</span><strong>From $150</strong></div><p class=\"price-note\">Prices may vary by barber. Sunday, early, and after-hours service requires an appointment. Confirm the current price and availability when booking.</p><a class=\"button dark\" style=\"margin-top:19px\" href=\"https://square.site/book/J2XJ7XFND7NK8/ace-of-fades-ne-13th-street-omaha-ne\" target=\"_blank\" rel=\"noopener\">Reserve your chair</a></div>\n    </div></section>";
const TeamMarkup = "<section class=\"team\"><div class=\"wrap\"><div class=\"team-heading\"><span class=\"eyebrow\" style=\"color:#9a6025\">The people behind the cut</span><h2 class=\"display\">Meet our experts</h2><p>Choose a barber and a time that works for you in the online booking menu.</p><p class=\"photo-note\">Portraits are illustrative and do not represent the barbers pictured.</p></div><div class=\"team-grid\">\n      <article class=\"barber\"><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80\" alt=\"Illustrative black and white portrait of a barber\"><div class=\"barber-caption\"><strong>Alan Adame</strong><span>Barber · Book online</span></div><div class=\"barber-social\"><span class=\"linkedin\" aria-label=\"LinkedIn profile not provided\">in</span><a href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\" aria-label=\"Ace of Fades Instagram\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"18\" cy=\"6\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg></a></div></article>\n      <article class=\"barber\"><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80\" alt=\"Illustrative black and white portrait of a barber\"><div class=\"barber-caption\"><strong>Angel Flores</strong><span>Barber · Book online</span></div><div class=\"barber-social\"><span class=\"linkedin\" aria-label=\"LinkedIn profile not provided\">in</span><a href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\" aria-label=\"Ace of Fades Instagram\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"18\" cy=\"6\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg></a></div></article>\n      <article class=\"barber\"><img loading=\"lazy\" src=\"https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=700&q=80\" alt=\"Illustrative black and white portrait of a barber\"><div class=\"barber-caption\"><strong>Derek Beltran</strong><span>Barber · Book online</span></div><div class=\"barber-social\"><span class=\"linkedin\" aria-label=\"LinkedIn profile not provided\">in</span><a href=\"https://www.instagram.com/ace_of_fades_ne/\" target=\"_blank\" rel=\"noopener\" aria-label=\"Ace of Fades Instagram\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"18\" cy=\"6\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg></a></div></article>\n      <article class=\"team-cta\"><div><h3>Join our team</h3><p>Interested in working with the shop? Send us a note.</p><a href=\"mailto:aceoffadesne@gmail.com\">Get in touch ↗</a></div></article>\n    </div></div></section>";

function Markup({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function Header({ menuOpen }) {
  const html = HeaderMarkup
    .replace('class="navlinks"', `class="navlinks${menuOpen ? ' open' : ''}"`)
    .replace('aria-label="Open navigation" aria-expanded="false"', `aria-label="${menuOpen ? 'Close' : 'Open'} navigation" aria-expanded="${menuOpen}"`)
    .replace('>☰</button>', `>${menuOpen ? '×' : '☰'}</button>`);
  return <Markup html={html} />;
}

function Hero({ onSubmit }) {
  const [preferredDate, setPreferredDate] = useState(null);

  return (
    <section className="hero" id="home">
      <div className="wrap hero-inner">
        <form className="request-card" id="appointment-form" onSubmit={onSubmit}>
          <h2>Make an appointment</h2>
          <p>Tell us what you have in mind. We’ll help you find a time.</p>
          <TextField
            name="name"
            label="Your name"
            autoComplete="name"
            required
            size="small"
            fullWidth
            sx={formFieldStyles}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
            size="small"
            fullWidth
            sx={formFieldStyles}
          />
          <TextField
            name="service"
            label="Choose a service"
            select
            defaultValue=""
            required
            size="small"
            fullWidth
            sx={formFieldStyles}
          >
            <MenuItem value="" disabled>Choose a service</MenuItem>
            <MenuItem value="Adult haircut">Adult haircut</MenuItem>
            <MenuItem value="Haircut with beard">Haircut with beard</MenuItem>
            <MenuItem value="Kids / young adult haircut">Kids / young adult haircut</MenuItem>
            <MenuItem value="Full service">Full service</MenuItem>
            <MenuItem value="Other service">Other service</MenuItem>
          </TextField>
          <DatePicker
            label="Preferred date"
            value={preferredDate}
            onChange={setPreferredDate}
            format="MM/DD/YYYY"
            slotProps={{ textField: { size: 'small', fullWidth: true, sx: formFieldStyles } }}
          />
          <input type="hidden" name="date" value={preferredDate?.format('YYYY-MM-DD') ?? ''} />
          <MuiButton type="submit" variant="contained" className="button" fullWidth disableElevation sx={submitButtonStyles}>
            Send request
          </MuiButton>
          <p className="booking-note">
            Prefer to book directly?{' '}
            <a href="https://square.site/book/J2XJ7XFND7NK8/ace-of-fades-ne-13th-street-omaha-ne" target="_blank" rel="noopener">
              Choose a time online
            </a>.
          </p>
        </form>
        <p className="hero-caption">Our barbers take time to understand the look you want, then bring it to life with care and precision.</p>
        <h1 className="hero-title display">Where tradition<br />meets modern style</h1>
      </div>
    </section>
  );
}

const formFieldStyles = {
  my: 0.35,
  '& .MuiInputLabel-root': { color: '#635d57', fontSize: '0.78rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#a86a22' },
  '& .MuiOutlinedInput-root': {
    borderRadius: '3px',
    backgroundColor: 'rgba(255,255,255,.96)',
    color: '#29231e',
    fontSize: '0.76rem',
  },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,.55)' },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f0a044' },
  '& .MuiInputBase-input': { py: '9px' },
};

const submitButtonStyles = {
  mt: 0.5,
  minHeight: 44,
  borderRadius: '2px',
  backgroundColor: '#f0a044',
  color: '#211811',
  fontFamily: 'DM Sans, Arial, sans-serif',
  fontWeight: 700,
  fontSize: '0.72rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  '&:hover': { backgroundColor: '#ffb65d' },
};
function Location() { return <Markup html={LocationMarkup} />; }
function Portfolio() { return <Markup html={PortfolioMarkup} />; }
function Services() { return <Markup html={ServicesMarkup} />; }
function Team() { return <Markup html={TeamMarkup} />; }
function Footer() { return <Markup html={FooterMarkup} />; }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent('Appointment request - Ace of Fades');
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\nPreferred date: ${data.get('date') || 'Flexible'}\n\nPlease contact me about availability.`);
    window.location.href = `mailto:aceoffadesne@gmail.com?subject=${subject}&body=${body}`;
  }

  function handleClick(event) {
    if (event.target.closest('.menu-toggle')) {
      setMenuOpen((open) => !open);
      return;
    }
    if (event.target.closest('.navlinks a')) setMenuOpen(false);
  }

  return (
    <div onClick={handleClick}>
      <Header menuOpen={menuOpen} />
      <main><Hero onSubmit={handleSubmit} /><Location /><Portfolio /><Services /><Team /></main>
      <Footer />
    </div>
  );
}
