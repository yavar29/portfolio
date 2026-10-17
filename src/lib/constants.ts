export const SITE = {
  name: "Yavar Khan",
  title: "Yavar Khan – AI Engineer",
  description:
    "Yavar Khan is an AI Engineer at Aerveil building Claude-based decision systems, and a Claude Certified Architect – Professional.",
  url: "https://yavarkhan.me",
  email: "yavarkhan1997@gmail.com",
  location: "San Jose, CA",
};

export const RESUME = {
  href: "/Yavar_Khan_Resume.pdf",
  filename: "Yavar_Khan_Resume.pdf",
};

// Cloudflare Turnstile
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAACwCkDujsT-LvOqY";

export const SOCIAL_LINKS = {
  github: "https://github.com/yavar29",
  linkedin: "https://www.linkedin.com/in/yavar-khan29/",
  email: `mailto:${SITE.email}`,
};

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Aerveil", href: "#aerveil" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
] as const;
