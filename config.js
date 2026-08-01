/* ==========================================================================
   RJ18 PROPERTY DEALER & WORK SERVICE — CENTRAL CONFIG
   Edit business details, properties, and testimonials in this one file.
   ========================================================================== */

const RJ18 = {
  business: {
    name: "RJ18 Property Dealer & Work Service",
    shortName: "RJ18",
    tagline: "Sapna Aapka, Ghar Hum Dilaye",
    taglineEn: "Your Dream, Our Delivery",
    phone: "+91 98765 43210",
    phoneRaw: "919876543210",
    whatsapp: "919876543210",
    email: "info@rj18property.com",
    address: "Main Road, Near Bus Stand, Jhunjhunu, Rajasthan 333001",
    city: "Jhunjhunu & Sikar, Rajasthan",
    hours: "Mon – Sun : 9:00 AM – 8:00 PM",
    mapEmbed: "https://www.google.com/maps?q=Jhunjhunu,Rajasthan&output=embed",
    social: {
      facebook: "#",
      instagram: "#",
      youtube: "#",
      twitter: "#"
    }
  },

  stats: [
    { value: 100, suffix: "+", label: "Happy Clients" },
    { value: 200, suffix: "+", label: "Properties Sold" },
    { value: 100, suffix: "%", label: "Legal Documentation" },
    { value: 24, suffix: "×7", label: "Support Available" }
  ],

  services: [
    {
      icon: "plot",
      title: "Residential Plots",
      desc: "Prime residential plots in verified, RIICO & JDA approved colonies across Jhunjhunu and Sikar."
    },
    {
      icon: "commercial",
      title: "Commercial Plots",
      desc: "High footfall commercial land for shops, showrooms and offices on main highways and market roads."
    },
    {
      icon: "farmhouse",
      title: "Farm Houses",
      desc: "Peaceful farmhouse land on the outskirts, perfect for weekend retreats and long-term investment."
    },
    {
      icon: "buy",
      title: "House Buying",
      desc: "End-to-end assistance finding and buying a home that fits your family and budget, stress-free."
    },
    {
      icon: "sell",
      title: "House Selling",
      desc: "Maximum-value resale support with genuine buyers, market pricing guidance and quick closing."
    },
    {
      icon: "invest",
      title: "Investment Properties",
      desc: "High-growth investment opportunities handpicked for strong future appreciation in the region."
    },
    {
      icon: "docs",
      title: "Property Documentation",
      desc: "Complete registry, mutation, patta and legal paperwork handled by our in-house documentation team."
    },
    {
      icon: "consult",
      title: "Property Consultation",
      desc: "One-on-one guidance from experienced consultants who know every locality inside out."
    }
  ],

  properties: [
    {
      id: "p1",
      title: "Green Valley Residential Plot",
      type: "Residential Plot",
      location: "Mandawa Road, Jhunjhunu",
      price: "₹ 12,00,000",
      area: "1000 sq.ft",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
      tag: "Featured"
    },
    {
      id: "p2",
      title: "Sikar Highway Commercial Plot",
      type: "Commercial Plot",
      location: "NH-52, Sikar",
      price: "₹ 45,00,000",
      area: "2500 sq.ft",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      tag: "Hot Deal"
    },
    {
      id: "p3",
      title: "Royal Enclave 3BHK House",
      type: "House",
      location: "Pilani Road, Jhunjhunu",
      price: "₹ 68,00,000",
      area: "1800 sq.ft",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      tag: "New"
    },
    {
      id: "p4",
      title: "Riico Industrial Shop Space",
      type: "Shop",
      location: "Riico Industrial Area, Sikar",
      price: "₹ 22,00,000",
      area: "600 sq.ft",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
      tag: "Featured"
    },
    {
      id: "p5",
      title: "Serene Acres Farm House Land",
      type: "Farm House",
      location: "Khetri Road, Jhunjhunu",
      price: "₹ 35,00,000",
      area: "1 Acre",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1200&auto=format&fit=crop",
      tag: "Investment"
    },
    {
      id: "p6",
      title: "Sikar City Center Apartment",
      type: "House",
      location: "Station Road, Sikar",
      price: "₹ 42,00,000",
      area: "1400 sq.ft",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
      tag: "New"
    }
  ],

  gallery: [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592595896616-c37162298647?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=900&auto=format&fit=crop"
  ],

  testimonials: [
    {
      name: "Ramesh Kumar Sharma",
      location: "Jhunjhunu",
      rating: 5,
      text: "RJ18 helped me buy my first residential plot with complete legal transparency. The whole process from site visit to registration was smooth and honest."
    },
    {
      name: "Suman Devi",
      location: "Sikar",
      rating: 5,
      text: "Sold our old house through RJ18 at a great price within three weeks. Their documentation team handled everything so we didn't have to run around offices."
    },
    {
      name: "Vikram Singh Rathore",
      location: "Jhunjhunu",
      rating: 5,
      text: "Bought a commercial plot on the highway for my new showroom. RJ18's location knowledge and price negotiation saved us lakhs of rupees."
    },
    {
      name: "Anita Choudhary",
      location: "Sikar",
      rating: 5,
      text: "Very trustworthy dealer. They guided us through farm house investment with clear advice on future growth of the area. Highly recommended."
    }
  ],

  whyChoose: [
    { icon: "legal", title: "100% Legal Properties", desc: "Every property is verified against government records before listing." },
    { icon: "verified", title: "Verified Documents", desc: "Complete title, patta and mutation checks before any deal closes." },
    { icon: "price", title: "Best Prices", desc: "Direct dealer pricing with zero hidden brokerage surprises." },
    { icon: "trust", title: "Trusted Dealer", desc: "Over a decade of relationships built on honesty across the region." },
    { icon: "location", title: "Excellent Locations", desc: "Handpicked plots and homes in the fastest growing localities." },
    { icon: "support", title: "Professional Support", desc: "Dedicated consultant assigned to you from enquiry to registration." },
    { icon: "guidance", title: "Investment Guidance", desc: "Data-backed advice on which properties will appreciate fastest." }
  ],

  process: [
    { step: "01", title: "Contact Us", desc: "Call, WhatsApp or fill our enquiry form to share your requirement." },
    { step: "02", title: "Site Visit", desc: "We arrange a personal visit to shortlisted properties at your convenience." },
    { step: "03", title: "Property Selection", desc: "Compare options with full transparency on pricing and location." },
    { step: "04", title: "Documentation", desc: "Our legal team verifies and prepares every required document." },
    { step: "05", title: "Registration", desc: "Complete registry process handled with you at the sub-registrar office." },
    { step: "06", title: "Happy Customer", desc: "You move into your dream property with total peace of mind." }
  ]
};
