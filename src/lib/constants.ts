export const SITE = {
  name: "Yavar Khan",
  title: "Yavar Khan | AI & Software Engineer",
  description:
    "Portfolio of Yavar Khan — AI/ML Engineer bridging Software Engineering and Artificial Intelligence to build intelligent, scalable systems.",
  url: "https://yavarkhan.dev",
  email: "yavarkhan1997@gmail.com",
  phone: "(669)-339-8555",
  location: "San Jose, CA",
};

// Cloudflare Turnstile
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAACwCkDujsT-LvOqY";

export const SOCIAL_LINKS = {
  github: "https://github.com/yavar29",
  linkedin: "https://linkedin.com/in/yavar-khan29",
  email: `mailto:${SITE.email}`,
};

export const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Featured", href: "#featured" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
