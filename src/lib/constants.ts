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
  { label: "Certifications", href: "#certifications" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
