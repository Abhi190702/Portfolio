const config = {
  title: "Abhijeet Ranjan | Portfolio",
  description: {
    long: "Portfolio of Abhijeet Ranjan, a first-year student at ABV-IIITM Gwalior. I work on web development and cybersecurity, and I have contributed to a research paper in hardware security.",
    short:
      "Portfolio of Abhijeet Ranjan, first-year ABV-IIITM Gwalior student focused on web development, cybersecurity, and hardware security research.",
  },
  role: "First Year Student @ ABV-IIITM Gwalior",
  intro:
    "I am building practical projects in web development and cybersecurity while exploring secure systems through research.",
  location: "Gwalior, India",
  phone: "+91 8308509180",
  resumeLink:
    "mailto:abhijitzende75@gmail.com?subject=Resume%20Request",
  keywords: [
    "Abhijeet",
    "Abhijeet Ranjan",
    "abhijeet ranjan portfolio",
    "ABV-IIITM Gwalior",
    "portfolio",
    "student portfolio",
    "cybersecurity",
    "hardware security",
    "research paper",
    "web development",
    "next.js",
    "react",
  ],
  author: "Abhijeet Ranjan",
  email: "abhijitzende75@gmail.com",
  site: "https://www.abhijitzende.com/",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    instagram: "https://www.instagram.com/abhi.lonelyfans/",
  },
};
export { config };
