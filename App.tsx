import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type TransitionEvent } from "react";

// Replace this small media map with client-owned photographs during handoff.
const demoMedia = {
  hero: "https://images.pexels.com/photos/33452539/pexels-photo-33452539.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=2400&q=88",
  about: "https://images.pexels.com/photos/20285351/pexels-photo-20285351.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1800&q=86",
  serviceLiving: "https://images.pexels.com/photos/15867752/pexels-photo-15867752.png?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1800&q=86",
  serviceKitchen: "https://images.pexels.com/photos/35021550/pexels-photo-35021550.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1800&q=86",
  serviceStorage: "https://images.pexels.com/photos/6580380/pexels-photo-6580380.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1800&q=86",
  serviceLight: "https://images.pexels.com/photos/8089161/pexels-photo-8089161.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1800&q=86",
  living: "https://images.pexels.com/photos/6758777/pexels-photo-6758777.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000&q=86",
  kitchen: "https://images.pexels.com/photos/35021550/pexels-photo-35021550.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000&q=86",
  wardrobe: "https://images.pexels.com/photos/6580380/pexels-photo-6580380.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000&q=86",
  bedroom: "https://images.pexels.com/photos/6489100/pexels-photo-6489100.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000&q=86",
  details: "https://images.pexels.com/photos/8089187/pexels-photo-8089187.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000&q=86",
  kitchenTwo: "https://images.pexels.com/photos/7018836/pexels-photo-7018836.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000&q=86",
  cta: "https://images.pexels.com/photos/15867752/pexels-photo-15867752.png?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=2200&q=86",
};

const whatsappBase = "https://wa.me/919179897839";
const whatsappDefault = `${whatsappBase}?text=${encodeURIComponent(
  "Hi Thakur Interior, I would like to discuss an interior design project.",
)}`;
const mapsDirections =
  "https://www.google.com/maps/dir/?api=1&destination=Thakur%20Interior%2C%20Garha%20%2F%20Shukla%20Nagar%2C%20Jabalpur%2C%20Madhya%20Pradesh";
const googleBusiness =
  "https://www.google.com/maps/search/?api=1&query=Thakur%20Interior%2C%20Garha%20%2F%20Shukla%20Nagar%2C%20Jabalpur%2C%20Madhya%20Pradesh";
const googleReviews = googleBusiness;

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Services", "services"],
  ["Projects", "projects"],
  ["Process", "process"],
  ["Reviews", "reviews"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
] as const;

const services = [
  {
    name: "Residential interiors",
    detail: "A considered plan for the rooms, routines and details that make a home yours.",
    image: demoMedia.serviceLiving,
    alt: "Illustrative warm living room with neutral furniture and soft natural light",
  },
  {
    name: "Modular kitchens",
    detail: "Thoughtful layouts, practical storage and finishes that work hard every day.",
    image: demoMedia.serviceKitchen,
    alt: "Illustrative contemporary kitchen with wood cabinetry and a stone counter",
  },
  {
    name: "Wardrobes, furniture and storage",
    detail: "Made-to-measure furniture and storage ideas that bring order without wasting space.",
    image: demoMedia.serviceStorage,
    alt: "Illustrative walk-in wardrobe with warm wood shelving and integrated lighting",
  },
  {
    name: "Living and bedroom spaces",
    detail: "A balance of comfort, proportion, light and a calm material palette.",
    image: demoMedia.bedroom,
    alt: "Illustrative bedroom interior with warm timber and considered lighting",
  },
  {
    name: "Commercial and office interiors",
    detail: "Workplace and commercial spaces planned around people and purpose.",
    image: demoMedia.serviceLight,
    alt: "Illustrative modern interior with clean furniture and layered lighting",
  },
  {
    name: "False ceilings and lighting",
    detail: "Layered light and ceiling details that give a room a quieter sense of depth.",
    image: demoMedia.details,
    alt: "Illustrative contemporary interior showing architectural details and lighting",
  },
  {
    name: "Renovation and space planning",
    detail: "A practical way to rethink what you already have and make it work better.",
    image: demoMedia.about,
    alt: "Illustrative residential interior with a warm, uncluttered layout",
  },
];

const projects = [
  {
    id: "living",
    title: "Living room",
    category: "Living",
    image: demoMedia.living,
    alt: "Illustrative living room with a media wall and softly layered furnishings",
    shape: "project--wide",
    width: 2000,
    height: 1400,
    sizes: "(max-width: 760px) 100vw, 60vw",
  },
  {
    id: "kitchen",
    title: "Modular kitchen",
    category: "Kitchen",
    image: demoMedia.kitchen,
    alt: "Illustrative modern kitchen with wood cabinetry and a dark stone island",
    shape: "project--narrow",
    width: 1600,
    height: 1400,
    sizes: "(max-width: 760px) 50vw, 43vw",
  },
  {
    id: "wardrobe",
    title: "Wardrobe and storage",
    category: "Wardrobe",
    image: demoMedia.wardrobe,
    alt: "Illustrative walk-in wardrobe with open wood shelving and ambient light",
    shape: "project--narrow",
    width: 1600,
    height: 1300,
    sizes: "(max-width: 760px) 50vw, 43vw",
  },
  {
    id: "bedroom",
    title: "Bedroom",
    category: "Bedroom",
    image: demoMedia.bedroom,
    alt: "Illustrative bedroom with warm-toned finishes and considered furniture",
    shape: "project--wide",
    width: 2000,
    height: 1400,
    sizes: "(max-width: 760px) 50vw, 60vw",
  },
  {
    id: "living-details",
    title: "Living details",
    category: "Living",
    image: demoMedia.details,
    alt: "Illustrative contemporary living space with calm neutral furnishing",
    shape: "project--wide",
    width: 2000,
    height: 1400,
    sizes: "(max-width: 760px) 50vw, 60vw",
  },
  {
    id: "kitchen-light",
    title: "Kitchen and dining",
    category: "Kitchen",
    image: demoMedia.kitchenTwo,
    alt: "Illustrative kitchen and dining interior with pendant lighting",
    shape: "project--narrow",
    width: 1600,
    height: 1400,
    sizes: "(max-width: 760px) 50vw, 43vw",
  },
];

const projectFilters = ["All", "Living", "Kitchen", "Wardrobe", "Bedroom"];

const reviewSlides = [
  { name: "Pradeep Sharma", rating: 5 },
  { name: "Akhilesh Kumar Khare", rating: 5 },
  { name: "Abhishek Kumar Mittal", rating: 5 },
  { name: "Sankalp Pandey", rating: 5 },
  { name: "Khushiram Patel", rating: 5 },
  { name: "Saksham Pandey", rating: 5 },
];
const reviewTrackSlides = [reviewSlides[reviewSlides.length - 1], ...reviewSlides, reviewSlides[0]];

const faqs = [
  {
    question: "What interior design services do you provide?",
    answer:
      "Services include residential and commercial interiors, modular kitchens, wardrobes, living and bedroom interiors, office spaces, false ceilings, lighting, space planning, custom storage and interior renovation.",
  },
  {
    question: "Do you work on complete home interiors?",
    answer:
      "Residential interiors are part of the studio's offering. Share the rooms, priorities and scope you have in mind so the right brief can be discussed together.",
  },
  {
    question: "Can I get in touch about a modular kitchen?",
    answer:
      "Yes. Modular kitchen design is one of the services offered. A few room measurements, photos or a simple description can help start the conversation.",
  },
  {
    question: "Do you handle interior renovation projects?",
    answer:
      "Interior renovation is included in the service mix. Contact Thakur Interior with your location and a short note about what you would like to change.",
  },
  {
    question: "Where is Thakur Interior located?",
    answer:
      "Thakur Interior serves the Garha / Shukla Nagar area of Jabalpur, Madhya Pradesh. Use the directions link to find the business on Google Maps and confirm the exact pin before travelling.",
  },
  {
    question: "How can I book a consultation?",
    answer:
      "Call +91 91798 97839 or start a WhatsApp conversation. You can share your project type, location and requirements to begin.",
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M3 10h13m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      role="img"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.51 5.51 0 0 1-2.39 3.62v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.61Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.95-2.92l-3.86-2.96c-1.08.72-2.45 1.15-4.09 1.15-3.14 0-5.8-2.12-6.75-4.97H1.26v3.05A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.25 14.3a7.21 7.21 0 0 1 0-4.6V6.65H1.26a12 12 0 0 0 0 10.7l3.99-3.05Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.73c1.77 0 3.35.61 4.6 1.81l3.44-3.44C17.95 1.16 15.24 0 12 0A12 12 0 0 0 1.26 6.65l3.99 3.05C6.2 6.85 8.86 4.73 12 4.73Z"
      />
    </svg>
  );
}

function WhatsAppMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16.02 3.2A12.69 12.69 0 0 0 5.1 22.36L3.4 28.6l6.4-1.68a12.75 12.75 0 0 0 6.2 1.59h.01c7.04 0 12.76-5.73 12.76-12.77 0-3.4-1.32-6.6-3.72-9A12.66 12.66 0 0 0 16.02 3.2Zm-.01 23.17h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.8 1 1.02-3.7-.26-.4a10.54 10.54 0 0 1-1.62-5.63c0-5.83 4.74-10.57 10.57-10.57 2.82 0 5.48 1.1 7.47 3.1a10.49 10.49 0 0 1 3.1 7.48c0 5.83-4.74 10.57-10.58 10.57Zm5.8-7.92c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.5-.16-.72.16-.21.32-.82 1.05-1 1.27-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.84-1.59-1.89-1.78-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.31.32-.52.11-.22.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.53-.54-.72-.55h-.61c-.22 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.22 2.24 3.42 5.42 4.8.76.33 1.35.53 1.81.68.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.76.27-1.4.19-1.54-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

function makeDemoSrcSet(src: string) {
  try {
    const original = new URL(src);
    if (!original.hostname.endsWith("pexels.com")) return undefined;
    const maxWidth = Number(original.searchParams.get("w"));
    const maxHeight = Number(original.searchParams.get("h"));
    if (!maxWidth || !maxHeight) return undefined;

    const ratio = maxHeight / maxWidth;
    const widths = Array.from(new Set([480, 800, 1200, maxWidth].map((width) => Math.min(width, maxWidth))));
    return widths
      .sort((first, second) => first - second)
      .map((width) => {
        const candidate = new URL(src);
        candidate.searchParams.set("w", String(width));
        candidate.searchParams.set("h", String(Math.round(width * ratio)));
        return `${candidate.toString()} ${width}w`;
      })
      .join(", ");
  } catch {
    return undefined;
  }
}

function ResponsiveImage({
  src,
  alt,
  width,
  height,
  sizes = "100vw",
  loading = "lazy",
  fetchPriority,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
}) {
  return (
    <img
      className={className}
      src={src}
      srcSet={makeDemoSrcSet(src)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
    />
  );
}

function useReveal(refreshKey?: string) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [refreshKey]);
}

function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`wordmark${inverse ? " wordmark--inverse" : ""}`}>
      <span className="wordmark__symbol" aria-hidden="true">
        <span />
        <span />
      </span>
      <span className="wordmark__type">
        <strong>THAKUR</strong>
        <small>INTERIOR</small>
      </span>
    </span>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 28);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <a className="site-header__brand" href="#home" aria-label="Thakur Interior home" onClick={closeMenu}>
          <Wordmark />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, target]) => (
            <a key={target} href={`#${target}`}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href={whatsappDefault} target="_blank" rel="noreferrer">
          <span>Start a conversation</span>
          <ArrowIcon diagonal />
        </a>
        <button
          ref={menuButton}
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navItems.map(([label, target], index) => (
          <a key={target} href={`#${target}`} onClick={closeMenu} style={{ transitionDelay: menuOpen ? `${index * 35}ms` : "0ms" }}>
            <span>{label}</span>
            <ArrowIcon diagonal />
          </a>
        ))}
        <a className="mobile-nav__cta" href={whatsappDefault} target="_blank" rel="noreferrer" onClick={closeMenu}>
          Book a consultation <ArrowIcon />
        </a>
      </nav>
    </header>
  );
}

function ServiceSection() {
  const [activeService, setActiveService] = useState(0);
  const active = services[activeService];

  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="page-width">
        <div className="section-heading section-heading--split reveal">
          <div>
            <p className="eyebrow">WHAT WE DO</p>
            <h2 className="display-heading" id="services-title">
              Space for the<br /><em>everyday.</em>
            </h2>
          </div>
          <p className="section-heading__aside">
            From a single room to a complete brief, design decisions should feel as good to live with as they look.
          </p>
        </div>

        <div className="services-layout">
          <figure className="services-visual reveal">
            <div className="image-reveal services-visual__frame">
              <ResponsiveImage key={active.image} src={active.image} alt={active.alt} width={1800} height={1400} sizes="(max-width: 760px) 100vw, 58vw" />
            </div>
            <figcaption>
              <span>{active.name}</span>
              <span>{String(activeService + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
            </figcaption>
          </figure>
          <div className="services-list-wrap reveal">
            <p className="services-list__intro">A thoughtful approach, across every room.</p>
            <div className="services-list" aria-label="Interior design services">
              {services.map((service, index) => (
                <button
                  className={`service-row${activeService === index ? " is-active" : ""}`}
                  key={service.name}
                  type="button"
                  aria-pressed={activeService === index}
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                >
                  <span className="service-row__number">0{index + 1}</span>
                  <span className="service-row__name">{service.name}</span>
                  <ArrowIcon />
                </button>
              ))}
            </div>
            <p className="services-list__detail" aria-live="polite">{active.detail}</p>
            <a className="text-link" href="#contact">
              Discuss a service <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [active, setActive] = useState(1);
  const [offset, setOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [manualPause, setManualPause] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const slides = useRef<Array<HTMLElement | null>>([]);
  const viewport = useRef<HTMLDivElement>(null);
  const pauseTimer = useRef<number | null>(null);
  const total = reviewSlides.length;

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);
    const updatePageVisibility = () => setPageVisible(document.visibilityState === "visible");
    updateMotionPreference();
    updatePageVisibility();
    document.addEventListener("visibilitychange", updatePageVisibility);
    motionQuery.addEventListener("change", updateMotionPreference);
    return () => {
      document.removeEventListener("visibilitychange", updatePageVisibility);
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useLayoutEffect(() => {
    const measureSlide = () => setOffset(slides.current[active]?.offsetLeft ?? 0);
    measureSlide();
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(measureSlide) : null;
    if (viewport.current && resizeObserver) resizeObserver.observe(viewport.current);
    window.addEventListener("resize", measureSlide, { passive: true });
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureSlide);
    };
  }, [active]);

  useEffect(() => {
    if (transitionEnabled) return;
    const frame = window.requestAnimationFrame(() => setTransitionEnabled(true));
    return () => window.cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  useEffect(() => {
    if (!reducedMotion) return;
    if (active === 0) setActive(total);
    if (active === total + 1) setActive(1);
  }, [active, reducedMotion, total]);

  const settleLoop = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    if (active === 0) {
      setTransitionEnabled(false);
      setActive(total);
    } else if (active === total + 1) {
      setTransitionEnabled(false);
      setActive(1);
    }
  };

  useEffect(() => {
    if (isHovered || isFocused || reducedMotion || !pageVisible || manualPause) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current >= total ? total + 1 : current + 1));
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isHovered, isFocused, reducedMotion, pageVisible, manualPause, total]);

  useEffect(() => () => {
    if (pauseTimer.current !== null) window.clearTimeout(pauseTimer.current);
  }, []);

  const pauseAfterManualInput = () => {
    setManualPause(true);
    if (pauseTimer.current !== null) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(() => setManualPause(false), 9000);
  };

  const moveBy = (direction: number, manual = false) => {
    if (manual) pauseAfterManualInput();
    setActive((current) => {
      if (reducedMotion) {
        if (direction < 0) return current <= 1 ? total : current - 1;
        return current >= total ? 1 : current + 1;
      }
      if (direction < 0) return current <= 1 ? 0 : current - 1;
      return current >= total ? total + 1 : current + 1;
    });
  };

  const initials = (name: string) => name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const visibleReview = active === 0 ? total : active === total + 1 ? 1 : active;

  return (
    <section className="section reviews-section" id="reviews" aria-labelledby="reviews-title">
      <div className="page-width">
        <div className="reviews-header reveal">
          <div>
            <p className="eyebrow">GOOGLE REVIEWS / JABALPUR</p>
            <h2 className="display-heading" id="reviews-title">A strong reputation<br /><em>speaks for itself.</em></h2>
          </div>
          <div className="reviews-header__proof">
            <div className="reviews-rating" aria-label="4.9 out of 5 stars based on 208 Google reviews">
              <GoogleMark className="google-mark" />
              <span className="reviews-rating__score">4.9 <span aria-hidden="true">★</span></span>
              <span className="reviews-rating__label">208 Google Reviews</span>
            </div>
            <a className="google-review-link" href={googleReviews} target="_blank" rel="noreferrer">
              View on Google <ArrowIcon diagonal />
            </a>
          </div>
        </div>

        <div className="reviews-layout reveal">
          <div className="reviews-side-note">
            <span className="reviews-side-note__rule" />
            <p>Reviewer names and five-star ratings are shown as supplied. Read each full review in its original context on Google.</p>
          </div>

          <div
            className="review-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Google reviewers"
            tabIndex={0}
            onPointerEnter={(event) => setIsHovered(event.pointerType !== "touch")}
            onPointerLeave={() => setIsHovered(false)}
            onFocusCapture={() => setIsFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false);
            }}
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              pointerStart.current = event.clientX;
              dragged.current = false;
            }}
            onPointerMove={(event) => {
              if (pointerStart.current !== null && Math.abs(event.clientX - pointerStart.current) > 48 && !dragged.current) {
                dragged.current = true;
                event.currentTarget.setPointerCapture(event.pointerId);
              }
            }}
            onPointerUp={(event) => {
              if (pointerStart.current === null) return;
              const distance = event.clientX - pointerStart.current;
              if (Math.abs(distance) > 48) {
                dragged.current = true;
                moveBy(distance < 0 ? 1 : -1, true);
              }
              pointerStart.current = null;
            }}
            onPointerCancel={() => { pointerStart.current = null; dragged.current = false; }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveBy(-1, true);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveBy(1, true);
              }
            }}
            onClickCapture={(event) => {
              if (dragged.current) {
                event.preventDefault();
                event.stopPropagation();
                dragged.current = false;
              }
            }}
          >
            <div className="review-carousel__viewport" ref={viewport} aria-live={isFocused ? "polite" : "off"} aria-atomic="true">
              <div
                className="review-carousel__track"
                style={{ transform: `translate3d(-${offset}px, 0, 0)`, transition: transitionEnabled && !reducedMotion ? undefined : "none" }}
                onTransitionEnd={settleLoop}
              >
                {reviewTrackSlides.map((review, index) => {
                  const isHidden = index !== active;
                  return (
                    <article
                      className="review-slide"
                      key={`${review.name}-${index}`}
                      ref={(node) => { slides.current[index] = node; }}
                      aria-roledescription="slide"
                      aria-label={`${review.name}, ${review.rating} out of 5 stars on Google`}
                      aria-hidden={isHidden}
                      inert={isHidden}
                    >
                      <div className="review-slide__top">
                        <span className="review-slide__source"><GoogleMark className="google-mark" /> GOOGLE REVIEW</span>
                        <span className="review-stars" role="img" aria-label={`${review.rating} out of 5 stars`}>
                          {Array.from({ length: review.rating }, (_, star) => <span aria-hidden="true" key={star}>★</span>)}
                        </span>
                      </div>
                      <div className="review-slide__reviewer">
                        <span className="review-avatar" aria-hidden="true">{initials(review.name)}</span>
                        <div>
                          <h3>{review.name}</h3>
                          <p>Google reviewer</p>
                        </div>
                      </div>
                      <div className="review-slide__bottom">
                        <p>See the original review on the Thakur Interior listing.</p>
                        <a href={googleReviews} target="_blank" rel="noreferrer" tabIndex={isHidden ? -1 : undefined}>
                          View on Google <ArrowIcon diagonal />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            <div className="review-carousel__controls">
              <div className="review-carousel__pagination" role="group" aria-label="Choose a Google review">
                {reviewSlides.map((review, index) => (
                  <button
                    className={`review-dot${visibleReview === index + 1 ? " is-active" : ""}`}
                    key={index}
                    type="button"
                    aria-label={`Show review ${index + 1}: ${review.name}`}
                    aria-current={visibleReview === index + 1 ? "true" : undefined}
                    onClick={() => { pauseAfterManualInput(); setActive(index + 1); }}
                  />
                ))}
              </div>
              <span className="review-carousel__position" aria-live={isFocused ? "polite" : "off"}>{String(visibleReview).padStart(2, "0")} <span>/</span> {String(total).padStart(2, "0")}</span>
              <div className="review-carousel__arrows">
                <button type="button" onClick={() => moveBy(-1, true)} aria-label="Previous Google reviewers">
                  <ArrowIcon />
                </button>
                <button type="button" onClick={() => moveBy(1, true)} aria-label="Next Google reviewers">
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="page-width faq-layout">
        <div className="faq-heading reveal">
          <p className="eyebrow">GOOD TO KNOW</p>
          <h2 className="display-heading" id="faq-title">A few useful<br /><em>answers.</em></h2>
          <p>Have a different question? Start with a quick call or message.</p>
          <a className="text-link" href={whatsappDefault} target="_blank" rel="noreferrer">
            Ask on WhatsApp <ArrowIcon diagonal />
          </a>
        </div>
        <div className="faq-list reveal">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index + 1}`;
            return (
              <article className={`faq-item${isOpen ? " is-open" : ""}`} key={faq.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-toggle" aria-hidden="true"><span /><span /></span>
                  </button>
                </h3>
                <div className="faq-answer" id={answerId} aria-hidden={!isOpen}>
                  <div className="faq-answer__inner"><p>{faq.answer}</p></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type EnquiryField = "fullName" | "phone" | "email" | "projectType" | "projectLocation" | "message";
type EnquiryErrors = Partial<Record<EnquiryField, string>>;

function ContactForm() {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [status, setStatus] = useState("");

  const clearFieldState = (field: EnquiryField) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setStatus("");
    setWhatsappUrl("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = (field: string) => String(formData.get(field) ?? "").trim();
    const fullName = value("fullName");
    const phone = value("phone");
    const email = value("email");
    const projectType = value("projectType");
    const projectLocation = value("projectLocation");
    const budget = value("budget");
    const requirements = value("message");
    const nextErrors: EnquiryErrors = {};

    if (!fullName) nextErrors.fullName = "Please enter your full name.";
    if (!phone) {
      nextErrors.phone = "Please enter a phone number.";
    } else if (phone.replace(/\D/g, "").length < 7 || !/^[+()\d\s-]+$/.test(phone)) {
      nextErrors.phone = "Enter a valid phone number with at least 7 digits.";
    }
    if (email && !(form.elements.namedItem("email") as HTMLInputElement).validity.valid) {
      nextErrors.email = "Enter a valid email address, or leave this field blank.";
    }
    if (!projectType) nextErrors.projectType = "Choose the type of project you have in mind.";
    if (!projectLocation) nextErrors.projectLocation = "Please enter the project location.";
    if (!requirements) nextErrors.message = "Please share a little about your requirements.";

    setErrors(nextErrors);
    setWhatsappUrl("");
    if (Object.keys(nextErrors).length > 0) {
      setStatus("Please review the highlighted fields.");
      const firstInvalid = Object.keys(nextErrors)[0] as EnquiryField;
      window.requestAnimationFrame(() => {
        const field = document.getElementById(firstInvalid);
        field?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
        field?.focus({ preventScroll: true });
      });
      return;
    }

    const message = `Hello Thakur Interior,\n\nI would like to discuss an interior design project.\n\nPROJECT ENQUIRY\n\nName: ${fullName}\nPhone: ${phone}\nEmail: ${email || "Not provided"}\nProject Type: ${projectType}\nProject Location: ${projectLocation}\nApprox. Budget: ${budget || "Not specified"}\n\nProject Requirements:\n${requirements}\n\nI found you through your website and would like to discuss the project further.\n\nThank you.`;
    const url = `${whatsappBase}?text=${encodeURIComponent(message)}`;

    // Keep this synchronous with the submit gesture for mobile app handoff.
    window.open(url, "_blank", "noopener,noreferrer");
    setWhatsappUrl(url);
    setStatus("Opening WhatsApp with your enquiry. Review the details there and press Send to contact Thakur Interior. Your form details remain on this page.");
  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-intro">
        <p className="eyebrow">PROJECT ENQUIRY / WHATSAPP</p>
        <p>Share a few details. We will prepare a message for you to review in WhatsApp.</p>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="fullName">Full name <span className="field__required" aria-hidden="true">*</span></label>
          <input id="fullName" name="fullName" type="text" autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} onChange={() => clearFieldState("fullName")} required />
          {errors.fullName && <span className="field-error" id="fullName-error">{errors.fullName}</span>}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number <span className="field__required" aria-hidden="true">*</span></label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} onChange={() => clearFieldState("phone")} required />
          {errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}
        </div>
        <div className="field">
          <label htmlFor="email">Email address <span className="field__optional">Optional</span></label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} onChange={() => clearFieldState("email")} />
          {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="projectType">Project type <span className="field__required" aria-hidden="true">*</span></label>
          <select id="projectType" name="projectType" defaultValue="" aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "projectType-error" : undefined} onChange={() => clearFieldState("projectType")} required>
            <option value="" disabled>Select a project type</option>
            <option>Complete Home Interior</option>
            <option>Modular Kitchen</option>
            <option>Wardrobe</option>
            <option>Living Room</option>
            <option>Bedroom</option>
            <option>Office / Commercial Interior</option>
            <option>Renovation</option>
            <option>False Ceiling</option>
            <option>Other</option>
          </select>
          {errors.projectType && <span className="field-error" id="projectType-error">{errors.projectType}</span>}
        </div>
        <div className="field">
          <label htmlFor="projectLocation">Project location <span className="field__required" aria-hidden="true">*</span></label>
          <input id="projectLocation" name="projectLocation" type="text" autoComplete="address-level2" aria-invalid={Boolean(errors.projectLocation)} aria-describedby={errors.projectLocation ? "projectLocation-error" : undefined} onChange={() => clearFieldState("projectLocation")} required />
          {errors.projectLocation && <span className="field-error" id="projectLocation-error">{errors.projectLocation}</span>}
        </div>
        <div className="field">
          <label htmlFor="budget">Approximate budget <span className="field__optional">Optional</span></label>
          <select id="budget" name="budget" defaultValue="" onChange={() => { setStatus(""); setWhatsappUrl(""); }}>
            <option value="">Not sure yet</option>
            <option>Under INR 5 lakh</option>
            <option>INR 5-10 lakh</option>
            <option>INR 10-20 lakh</option>
            <option>INR 20 lakh and above</option>
          </select>
        </div>
        <div className="field field--full">
          <label htmlFor="message">Project requirements / message <span className="field__required" aria-hidden="true">*</span></label>
          <textarea id="message" name="message" rows={3} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} onChange={() => clearFieldState("message")} required />
          {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
        </div>
      </div>
      <div className="form-submit-row">
        <button className="button button--whatsapp" type="submit">
          <WhatsAppMark /> <span>Send enquiry on WhatsApp</span>
        </button>
        <p>Required fields are marked with an asterisk.</p>
      </div>
      {status && (
        <div className={`form-response${Object.keys(errors).length ? " form-response--error" : ""}`} role="status" aria-live="polite">
          <p>{status}</p>
          {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer">If WhatsApp did not open, continue here <ArrowIcon diagonal /></a>}
        </div>
      )}
    </form>
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [floatingVisible, setFloatingVisible] = useState(true);
  useReveal(activeFilter);

  useEffect(() => {
    const reviews = document.getElementById("reviews");
    const contact = document.getElementById("contact");
    const footer = document.querySelector(".site-footer");
    if (!reviews || !contact || !footer || !("IntersectionObserver" in window)) return;

    const visibility = new Map<Element, boolean>([[reviews, false], [contact, false], [footer, false]]);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visibility.set(entry.target, entry.isIntersecting));
      setFloatingVisible(!Array.from(visibility.values()).some(Boolean));
    }, { threshold: 0.04 });
    observer.observe(reviews);
    observer.observe(contact);
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visibleProjects = projects.filter((project) => activeFilter === "All" || project.category === activeFilter);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <ResponsiveImage
            className="hero__image"
            src={demoMedia.hero}
            alt="Illustrative contemporary living room with warm materials and natural light"
            width={2400}
            height={1600}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero__shade" />
          <div className="hero__content page-width">
            <p className="hero__eyebrow hero-reveal hero-reveal--one">INTERIOR DESIGN / JABALPUR</p>
            <h1 className="hero__title hero-reveal hero-reveal--two" id="hero-title">
              <span>THAKUR</span>
              <span className="hero__title-second">INTERIOR</span>
            </h1>
            <p className="hero__intro hero-reveal hero-reveal--three">Thoughtful interiors, designed around the way you live.</p>
            <div className="hero__actions hero-reveal hero-reveal--four">
              <a className="button button--light" href="#projects">
                Explore the projects <ArrowIcon />
              </a>
              <a className="hero__whatsapp" href={whatsappDefault} target="_blank" rel="noreferrer">
                Start your project <ArrowIcon diagonal />
              </a>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Business information">
          <div className="page-width trust-strip__inner">
            <a className="trust-rating" href={googleReviews} target="_blank" rel="noreferrer" aria-label="4.9 stars from 208 Google reviews. View on Google">
              <GoogleMark className="google-mark" />
              <strong>4.9 <span aria-hidden="true">★</span></strong>
              <span className="trust-rating__separator" aria-hidden="true" />
              <span>208 Google Reviews</span>
              <ArrowIcon diagonal />
            </a>
            <span className="trust-divider" aria-hidden="true" />
            <p>Residential and commercial interiors</p>
            <span className="trust-divider" aria-hidden="true" />
            <p>Garha / Shukla Nagar, Jabalpur</p>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="page-width about-layout">
            <figure className="about-visual reveal">
              <div className="image-reveal about-visual__frame">
                <ResponsiveImage src={demoMedia.about} alt="Illustrative sunlit living room with soft neutral furnishings and a simple contemporary palette" width={1800} height={1400} sizes="(max-width: 760px) 100vw, 52vw" />
              </div>
              <figcaption><span>Form with feeling</span><span>Illustrative media</span></figcaption>
            </figure>
            <div className="about-copy reveal">
              <p className="eyebrow">A MORE PERSONAL APPROACH</p>
              <h2 className="display-heading" id="about-title">A room is more<br />than a <em>room.</em></h2>
              <p className="about-copy__lead">Good interiors begin with listening.</p>
              <p>We start with how you want a space to work, then shape the light, storage, materials and details around it. The result should feel considered, comfortable and unmistakably yours.</p>
              <p>From a single room to a wider residential or commercial brief, every conversation begins with your requirements.</p>
              <a className="text-link" href="#services">Explore what we do <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <ServiceSection />

        <section className="section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="page-width">
            <div className="projects-heading reveal">
              <div>
                <p className="eyebrow">SELECTED DESIGN STUDIES</p>
                <h2 className="display-heading" id="projects-title">A closer look at<br /><em>considered spaces.</em></h2>
              </div>
              <p>Illustrative demo photography shown for layout. The final portfolio will feature client-approved Thakur Interior imagery.</p>
            </div>

            <div className="project-toolbar reveal">
              <div className="project-filters" role="group" aria-label="Filter projects by room">
                {projectFilters.map((filter) => (
                  <button
                    className={activeFilter === filter ? "is-active" : ""}
                    key={filter}
                    type="button"
                    aria-pressed={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <span className="project-count">{String(visibleProjects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            </div>

            <div className="project-grid" aria-live="polite">
              {visibleProjects.map((project) => (
                <article className={`project ${project.shape} reveal`} key={project.id}>
                  <figure>
                    <div className="image-reveal project__image-wrap">
                      <ResponsiveImage src={project.image} alt={project.alt} width={project.width} height={project.height} sizes={project.sizes} />
                    </div>
                    <figcaption className="project__caption">
                      <span className="project__title">{project.title}</span>
                      <span className="project__meta">{project.category} <i /> Illustrative media</span>
                    </figcaption>
                  </figure>
                </article>
              ))}
            </div>

          </div>
        </section>

        <section className="why-section" id="approach" aria-labelledby="why-title">
          <div className="page-width why-layout">
            <div className="why-heading reveal">
              <p className="eyebrow">THE THAKUR APPROACH</p>
              <h2 className="display-heading" id="why-title">Design that<br />earns its <em>place.</em></h2>
              <p>Good choices are the ones that look right and make everyday life feel easier.</p>
              <a className="text-link text-link--light" href="#contact">Start with your brief <ArrowIcon /></a>
            </div>
            <div className="principles-list">
              <article className="principle reveal">
                <span className="principle__number">01</span>
                <div><h3>Thoughtful planning</h3><p>Begin with the people, the space and what needs to happen there.</p></div>
              </article>
              <article className="principle reveal">
                <span className="principle__number">02</span>
                <div><h3>Function, made beautiful</h3><p>Let clear circulation, useful storage and natural light guide the design.</p></div>
              </article>
              <article className="principle reveal">
                <span className="principle__number">03</span>
                <div><h3>Details with purpose</h3><p>Finishes, fittings and lighting should feel connected to the whole.</p></div>
              </article>
              <article className="principle reveal">
                <span className="principle__number">04</span>
                <div><h3>Personal by design</h3><p>Your preferences and priorities shape a space that feels like your own.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="section process-section" id="process" aria-labelledby="process-title">
          <div className="page-width">
            <div className="process-heading reveal">
              <div>
                <p className="eyebrow">FROM FIRST HELLO TO FINISHING DETAIL</p>
                <h2 className="display-heading" id="process-title">A clear path, from<br /><em>brief to space.</em></h2>
              </div>
              <p>Every project takes its own shape. A shared understanding keeps the next step clear.</p>
            </div>
            <ol className="process-steps">
              <li className="process-step reveal"><span className="process-step__number">01</span><h3>Consultation</h3><p>Talk through your space, priorities and the way you want it to feel.</p></li>
              <li className="process-step reveal"><span className="process-step__number">02</span><h3>Planning and concept</h3><p>Set the direction for layout, materials, storage and light.</p></li>
              <li className="process-step reveal"><span className="process-step__number">03</span><h3>Design development</h3><p>Bring the details together around the brief and agreed scope.</p></li>
              <li className="process-step reveal"><span className="process-step__number">04</span><h3>Execution and handover</h3><p>Move from design decisions toward a finished, ready-to-use space.</p></li>
            </ol>
          </div>
        </section>

        <ReviewsSection />

        <FaqSection />

        <section className="final-cta" aria-labelledby="final-cta-title">
          <ResponsiveImage src={demoMedia.cta} alt="Illustrative calm living room with warm natural textures" width={2200} height={1500} sizes="100vw" />
          <div className="final-cta__shade" />
          <div className="page-width final-cta__content reveal">
            <p className="eyebrow">YOUR SPACE, YOUR STORY</p>
            <h2 className="display-heading" id="final-cta-title">A space on your mind?<br /><em>Let's begin there.</em></h2>
            <div className="final-cta__actions">
              <a className="button button--light" href={whatsappDefault} target="_blank" rel="noreferrer">Start on WhatsApp <ArrowIcon diagonal /></a>
              <a className="final-cta__phone" href="tel:+919179897839">Call +91 91798 97839 <ArrowIcon /></a>
            </div>
          </div>
          <p className="final-cta__media-note">Illustrative demo photography</p>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="page-width">
            <div className="contact-heading reveal">
              <div>
                <p className="eyebrow">LET'S TALK</p>
                <h2 className="display-heading" id="contact-title">Tell us about<br /><em>your space.</em></h2>
              </div>
              <p>A few details are enough to start a useful conversation. Share your brief or reach out directly.</p>
            </div>
            <div className="contact-layout">
              <div className="contact-form-wrap reveal">
                <ContactForm />
              </div>
              <aside className="contact-details reveal" aria-label="Thakur Interior contact details">
                <div className="contact-details__top">
                  <p className="eyebrow">THAKUR INTERIOR</p>
                  <a className="contact-detail" href="tel:+919179897839">
                    <span>PHONE</span><strong>+91 91798 97839</strong><ArrowIcon diagonal />
                  </a>
                  <a className="contact-detail" href={whatsappDefault} target="_blank" rel="noreferrer">
                    <span>WHATSAPP</span><strong>Start a conversation</strong><ArrowIcon diagonal />
                  </a>
                  <div className="contact-detail contact-detail--location">
                    <span>LOCATION</span><strong>Garha / Shukla Nagar<br />Jabalpur, Madhya Pradesh</strong>
                  </div>
                </div>
                <div className="map-block">
                  <div className="map-block__heading">
                    <span>Find us in Jabalpur</span>
                    <a href={mapsDirections} target="_blank" rel="noreferrer">Get directions <ArrowIcon diagonal /></a>
                  </div>
                  <iframe
                    title="Google Map search for Thakur Interior in Garha, Jabalpur"
                    src="https://www.google.com/maps?q=Thakur%20Interior%2C%20Garha%20%2F%20Shukla%20Nagar%2C%20Jabalpur%2C%20Madhya%20Pradesh&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#home" aria-label="Thakur Interior, back to top"><Wordmark inverse /></a>
              <p>Thoughtful interior design for homes and workplaces in Jabalpur.</p>
              <a className="footer-directions" href={mapsDirections} target="_blank" rel="noreferrer">Garha / Shukla Nagar, Jabalpur <ArrowIcon diagonal /></a>
            </div>
            <div className="footer-links">
              <p className="footer-label">EXPLORE</p>
              <div className="footer-link-grid">
                {navItems.map(([label, target]) => <a key={target} href={`#${target}`}>{label}</a>)}
              </div>
            </div>
            <div className="footer-contact">
              <p className="footer-label">GET IN TOUCH</p>
              <a className="footer-phone" href="tel:+919179897839">+91 91798 97839 <ArrowIcon diagonal /></a>
              <a className="footer-whatsapp" href={whatsappDefault} target="_blank" rel="noreferrer"><WhatsAppMark /> WhatsApp us</a>
              <a className="footer-google" href={googleReviews} target="_blank" rel="noreferrer"><GoogleMark className="google-mark" /> View Google reviews</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Thakur Interior</span>
            <span>Designed around the way you live.</span>
            <a href="#home">Back to top <ArrowIcon diagonal /></a>
          </div>
        </div>
      </footer>

      <a className={`floating-whatsapp${floatingVisible ? "" : " is-hidden"}`} href={whatsappDefault} target="_blank" rel="noreferrer" aria-label="Chat with Thakur Interior on WhatsApp" aria-hidden={!floatingVisible} tabIndex={floatingVisible ? 0 : -1}>
        <WhatsAppMark />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}