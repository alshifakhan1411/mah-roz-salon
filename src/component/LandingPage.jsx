import ImageUploader from "./ImageUploader";
import React, { useEffect, useState, useRef } from 'react';
import {
  Crown, Palette, Sparkles, Eye, Scissors, Leaf, Hand, Feather,
  Award, Heart, Phone, MapPin, Clock, Star, MessageCircle, Menu, X
} from 'lucide-react';
import "../LandingPage.css";
import { salonInfo, services, whyChooseUs, testimonials, galleryItems } from '../mock';

const iconMap = {
  Crown, Palette, Sparkles, Eye, Scissors, Leaf, Hand, Feather, Award, Heart,
};

const LandingPage = () => {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef(null);

  /* Nav scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll-reveal observer */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.observe').forEach(el => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div>
      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <span className="navbar-logo" onClick={() => scrollTo('home')}>{salonInfo.name}</span>

        <ul className="navbar-links" style={mobileMenuOpen ? {display:'flex'} : {}}>
          {['about','services','testimonials','gallery','contact'].map(id => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <button className="cta-button" onClick={() => window.open(salonInfo.whatsappLink, '_blank')}>
              Book Now
            </button>
          </li>
        </ul>

        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(o => !o)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>{salonInfo.tagline}</h1>
            <p>Experience the perfect blend of traditional elegance and modern beauty at Abbottabad's most trusted ladies' salon.</p>
            <div className="hero-buttons">
              <button className="hero-button-primary" onClick={() => window.open(salonInfo.whatsappLink, '_blank')}>
                <MessageCircle size={20}/> Book on WhatsApp
              </button>
              <button className="hero-button-secondary" onClick={() => scrollTo('services')}>
                Explore Services
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <svg className="botanical-decoration" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   style={{stopColor:'#C9973A',stopOpacity:1}}/>
                  <stop offset="100%" style={{stopColor:'#E0B55A',stopOpacity:1}}/>
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="60" fill="none" stroke="url(#goldGrad)" strokeWidth="2" opacity="0.6">
                <animate attributeName="r" values="60;66;60" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="200" cy="200" r="80" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.4">
                <animate attributeName="r" values="80;87;80" dur="4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="200" cy="200" r="100" fill="none" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.2">
                <animate attributeName="r" values="100;108;100" dur="5s" repeatCount="indefinite"/>
              </circle>
              {[0,60,120,180,240,300].map((angle,i) => (
                <g key={i} transform={`rotate(${angle} 200 200)`}>
                  <ellipse cx="200" cy="128" rx="9" ry="14" fill="url(#goldGrad)" opacity="0.8"/>
                  <path d="M200,148 Q210,168 200,188 Q190,168 200,148" fill="url(#goldGrad)" opacity="0.65"/>
                </g>
              ))}
              <circle cx="200" cy="200" r="22" fill="url(#goldGrad)" opacity="0.9"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────── */}
      <section id="about" className="section observe" style={{background: 'var(--white)'}}>
        <div className="section-header">
          <h2>About Mah Roz</h2>
          <p>{salonInfo.description}</p>
          <div className="trust-badge">
            <Star size={16} fill="currentColor" style={{color:'var(--gold)'}}/>
            <span>{salonInfo.rating} Rating &nbsp;·&nbsp; {salonInfo.reviewCount} Reviews</span>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section id="services" className="section observe" style={{background:'var(--cream)'}}>
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive beauty solutions tailored to your needs</p>
        </div>
        <div className="services-grid">
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon];
            return (
              <div key={svc.id} className={`service-card observe reveal-delay-${(i % 3) + 1}`}>
                <div className="service-icon">{Icon && <Icon size={28}/>}</div>
                <h3>{svc.name}</h3>
                <p>{svc.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────── */}
      <section className="section observe" style={{background:'var(--white)'}}>
        <div className="section-header">
          <h2>Why Choose Mah Roz?</h2>
          <p>Excellence in every detail, care in every service</p>
        </div>
        <div className="why-choose-grid">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={i} className={`why-card observe reveal-delay-${i + 1}`}>
                <div className="why-icon">{Icon && <Icon size={32}/>}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section id="testimonials" className="section observe" style={{background:'var(--cream)'}}>
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <p>Real experiences from our valued customers</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`testimonial-card observe reveal-delay-${i + 1}`}>
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} fill="currentColor"/>
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">{t.name}</div>
              <div className="testimonial-date">{t.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ────────────────────────────────────────── */}
 <div className="gallery-grid">
  {galleryItems.map((item, i) => (
    <div
      key={item.id}
      className={`gallery-item observe reveal-delay-${(i % 3) + 1}`}
    >
      <img
        src={item.image}
        alt={item.label}
        className="gallery-image"
      />

      <div className="gallery-category">
        {item.category}
      </div>

      <div className="gallery-label">
        {item.label}
      </div>
    </div>
  ))}
</div>
      {/* ── BOOKING / CONTACT ──────────────────────────────── */}
      <section id="contact" className="booking-section observe">
        <div className="booking-content">
          <h2>Ready to Bloom?</h2>
          <p>Book your appointment today and experience the Mah Roz difference</p>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon"><Phone size={20}/></div>
              <div><strong>{salonInfo.phone}</strong></div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><MapPin size={20}/></div>
              <div><strong>{salonInfo.address}</strong></div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Clock size={20}/></div>
              <div><strong>{salonInfo.hours}</strong></div>
            </div>
          </div>
          <button className="whatsapp-button" onClick={() => window.open(salonInfo.whatsappLink, '_blank')}>
            <MessageCircle size={22}/> Book via WhatsApp
          </button>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">{salonInfo.name}</div>
            <p>{salonInfo.tagline}</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">FB</a>
              <a href="#" className="social-link" aria-label="Instagram">IG</a>
              <a href={salonInfo.whatsappLink} className="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">WA</a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            {['about','services','gallery','contact'].map(id => (
              <p key={id}>
                <a href={`#${id}`} style={{color:'inherit',textDecoration:'none'}}
                   onClick={e => { e.preventDefault(); scrollTo(id); }}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </p>
            ))}
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>{salonInfo.phone}</p>
            <p>{salonInfo.address}</p>
            <p>{salonInfo.hours}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 {salonInfo.name}. All rights reserved. · Ladies Only · Abbottabad, Pakistan</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
