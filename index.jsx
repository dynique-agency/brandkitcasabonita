import React, { useState, useRef, useEffect } from 'react';
import { Anchor, Layout, Type, Palette, Globe, Share2, Copy, Check, X, Menu, Home, Sparkles, MousePointer, Move, Eye, ArrowDown, Wind, Mic2, Hexagon, Smartphone } from 'lucide-react';

const BrandLab = () => {
  const [activeTab, setActiveTab] = useState('essence');
  const [copiedColor, setCopiedColor] = useState(null);
  const [demoText, setDemoText] = useState("The Art of Slow Living");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [lang, setLang] = useState('english');

  // ULTRA PREMIUM PALETTE
  const palette = [
    { 
      name: 'Gilded Horizon', 
      hex: '#D4AF37', 
      gradient: 'linear-gradient(135deg, #D4AF37 0%, #C5A059 50%, #B08D55 100%)',
      usage: 'Primary Brand Mark, Foil Stamping', 
      cmyk: '20, 35, 80, 0' 
    },
    { 
      name: 'Obsidian Slate', 
      hex: '#1C1C1C', 
      usage: 'Headings, High Contrast Text', 
      cmyk: '70, 60, 50, 90' 
    },
    { 
      name: 'Ancient Olive', 
      hex: '#6B705C', 
      usage: 'Subtle Accents, Digital UI Elements', 
      cmyk: '50, 40, 70, 20' 
    },
    { 
      name: 'Alabaster', 
      hex: '#F2F0E9', 
      usage: 'Canvas Background, Stationery', 
      cmyk: '3, 2, 6, 0' 
    },
    { 
      name: 'Warm Taupe', 
      hex: '#A89F91', 
      usage: 'Secondary Text, Dividers', 
      cmyk: '30, 30, 40, 0' 
    },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Custom Hook for Scroll Trigger
  const useElementOnScreen = (options) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      }, options);
      
      if (containerRef.current) observer.observe(containerRef.current);
      
      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
      }
    }, [containerRef, options]);

    return [containerRef, isVisible];
  };

  // Reusable Logo Component with GOLD GRADIENT support
  const Logo = ({ className = "w-24 h-24", useGradient = true, animate = false }) => (
    <svg viewBox="0 0 100 100" className={`${className} ${animate ? 'logo-animate' : ''}`} fill="none" stroke={useGradient ? "url(#goldGradient)" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#B08D55" />
        </linearGradient>
      </defs>
      
      {/* The Arch */}
      <path d="M20 90 V 50 A 30 30 0 0 1 80 50 V 90" strokeWidth="2" className="path-draw delay-100" />
      <path d="M15 90 H 85" strokeWidth="2.5" className="path-draw delay-200" />
      <path d="M25 90 V 50 A 25 25 0 0 1 75 50 V 90" strokeWidth="0.75" opacity="0.8" className="path-draw delay-300" />
      
      {/* Keystone */}
      <path d="M46 20 H 54 L 52 26 H 48 Z" fill={useGradient ? "url(#goldGradient)" : "currentColor"} stroke="none" className="fade-in delay-500" />
      
      {/* The Olive Branch */}
      <path d="M45 85 Q 35 80 40 50" className="path-draw delay-400" /> 
      <path d="M40 60 Q 32 58 35 48" className="path-draw delay-500" /> 
      <path d="M42 55 Q 46 52 44 42" className="path-draw delay-600" /> 
      <path d="M38 70 Q 32 68 34 62" className="path-draw delay-700" /> 

      {/* The Wave */}
      <path d="M52 85 Q 60 78 70 85" className="path-draw delay-800" />
      <path d="M57 75 Q 65 68 75 75" className="path-draw delay-900" />
      <path d="M62 65 Q 67 60 72 65" className="path-draw delay-1000" />
    </svg>
  );

  // Magnetic Button Component - Mobile Optimized
  const MagneticButton = ({ children, className }) => {
    const btnRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPressed, setIsPressed] = useState(false);

    // Desktop: Magnetic Pull
    const handleMouseMove = (e) => {
      if (!btnRef.current || window.innerWidth < 768) return; // Disable magnetic on mobile
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * 0.2, y: y * 0.2 });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
      setIsPressed(false);
    };

    // Mobile: Tactile Press
    const handleTouchStart = () => setIsPressed(true);
    const handleTouchEnd = () => setIsPressed(false);

    return (
      <button
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) scale(${isPressed ? 0.95 : 1})`,
        }}
        className={`transition-all duration-200 ease-out ${className} ${isPressed ? 'shadow-inner opacity-90' : 'shadow-2xl'}`}
      >
        {children}
      </button>
    );
  };

  // Spotlight Effect Component - Touch Enabled
  const SpotlightEffect = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleMove = (clientX, clientY) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({ 
        x: clientX - rect.left, 
        y: clientY - rect.top 
      });
    };

    const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      // Prevent scrolling while interacting with spotlight
      // e.preventDefault(); 
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    return (
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-[300px] md:h-[400px] bg-[#1C1C1C] overflow-hidden cursor-none flex items-center justify-center group touch-none rounded-lg md:rounded-none"
      >
        {/* The Hidden Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="text-center px-4">
              <span className="block text-[#D4AF37] font-cinzel text-4xl md:text-6xl tracking-widest opacity-20 group-hover:opacity-100 transition-opacity duration-300">DISCOVER</span>
              <span className="block text-white font-cormorant italic text-lg md:text-2xl mt-4 opacity-20 group-hover:opacity-100 transition-opacity duration-300">"The beauty in the dark."</span>
           </div>
        </div>

        {/* The Spotlight Mask */}
        <div 
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, transparent 0%, rgba(28, 28, 28, 0.98) 100%)`
          }}
        />
        
        <div className="absolute bottom-4 md:bottom-8 text-[#A89F91] text-[9px] uppercase tracking-widest pointer-events-none">
          {window.innerWidth < 768 ? "Touch & Drag to reveal" : "Move cursor to reveal"}
        </div>
      </div>
    );
  };

  // Scroll Trigger Section Component
  const ScrollTriggerExample = () => {
    const [ref, isVisible] = useElementOnScreen({ threshold: 0.3 });

    return (
      <div ref={ref} className="bg-[#1C1C1C] text-[#F2F0E9] p-8 md:p-12 relative overflow-hidden h-[400px] flex items-center justify-center rounded-lg md:rounded-none">
        {/* Background Subtle Texture */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        
        <div className="relative z-10 max-w-lg text-center">
          {/* The Golden Thread Animation */}
          <div className={`w-[1px] bg-[#D4AF37] mx-auto mb-8 transition-all duration-[1.5s] ease-in-out ${isVisible ? 'h-16 md:h-24 opacity-100' : 'h-0 opacity-0'}`}></div>
          
          {/* Staggered Text Reveal */}
          <div className="overflow-hidden mb-2">
            <h3 className={`font-cinzel text-2xl md:text-4xl transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] delay-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
              The Narrative Arrives
            </h3>
          </div>
          
          <div className="overflow-hidden">
            <p className={`font-cormorant italic text-lg md:text-xl text-[#A89F91] transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] delay-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
              "We don't just show content;<br/>we choreograph its arrival."
            </p>
          </div>

          <div className={`mt-8 transition-opacity duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]">Scroll Trigger Active</span>
          </div>
        </div>
      </div>
    );
  };

  // Essence Content - TRILINGUAL & WARM
  const essenceContent = {
    english: {
      headline: "The Art of Slow Living",
      subhead: "More than a stay—a feeling of coming home.",
      guestTitle: "Your Private Sanctuary",
      guestBody: "We don't just hand over keys; we welcome you to a home prepared with love. It is about the luxury of silence, the warmth of the sun, and the joy of being together.",
      ownerTitle: "Trusted Guardians",
      ownerBody: "We treat your home as our own. With personal care and attention to every detail, we ensure your piece of paradise is cherished and protected.",
      manifestoTitle: "The Casa Bonita Manifesto",
      manifesto: "\"We believe true luxury is the absence of worry. It is the sound of the wind in the olive trees and the warmth of a shared meal. We are here to make every moment count.\""
    },
    german: {
      headline: "Die Kunst des Slow Living",
      subhead: "Mehr als ein Aufenthalt – ein Gefühl von Zuhause.",
      guestTitle: "Ihr Privates Rückzugsgebiet",
      guestBody: "Wir übergeben nicht nur Schlüssel, wir heißen Sie herzlich willkommen. Genießen Sie die Stille, die Sonne und die kostbare Zeit mit Ihren Liebsten.",
      ownerTitle: "Vertrauensvolle Hände",
      ownerBody: "Wir kümmern uns um Ihr Haus, als wäre es unser eigenes. Mit Sorgfalt und Liebe zum Detail sorgen wir dafür, dass Ihr Paradies geschützt und geschätzt wird.",
      manifestoTitle: "Das Casa Bonita Manifest",
      manifesto: "\"Wir glauben, dass wahrer Luxus die Abwesenheit von Sorgen ist. Es ist das Rauschen des Windes in den Olivenbäumen und die Wärme eines gemeinsamen Essens. Wir sind da, um jeden Moment unvergesslich zu machen.\""
    },
    spanish: {
      headline: "El Arte del Slow Living",
      subhead: "Más que una estancia, una vuelta a los orígenes.",
      guestTitle: "Su Santuario Privado",
      guestBody: "No solo entregamos llaves; le damos la bienvenida a un hogar preparado con cariño. Es el lujo del silencio, la calidez del sol y la alegría de compartir.",
      ownerTitle: "Guardianes de Confianza",
      ownerBody: "Cuidamos su casa como si fuera la nuestra. Con atención personal y cariño por cada detalle, aseguramos que su paraíso sea respetado y protegido.",
      manifestoTitle: "El Manifiesto Casa Bonita",
      manifesto: "\"Creemos que el verdadero lujo es la ausencia de preocupaciones. Es el sonido del viento en los olivos y la calidez de una comida compartida. Estamos aquí para que cada momento cuente.\""
    }
  };

  // Voice Content
  const voiceExamples = {
    english: {
      headline: "Escape to the untamed beauty of Santanyí.",
      body: "We don't just hand over keys; we welcome you home. A return to the rhythm of the sun and the sea.",
      cta: "Begin your journey"
    },
    german: {
      headline: "Exklusive Fincas, persönlich betreut.",
      body: "Wir übergeben nicht einfach Schlüssel; wir heißen Sie zu Hause willkommen. Eine Rückkehr zum Rhythmus von Sonne und Meer.",
      cta: "Ihre Reise beginnen"
    },
    spanish: {
      headline: "La auténtica esencia de Mallorca.",
      body: "No solo entregamos llaves; le damos la bienvenida a casa. Un retorno al ritmo del sol y el mar.",
      cta: "Comience su viaje"
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F0E9] text-[#1C1C1C] font-sans selection:bg-[#D4AF37] selection:text-white flex">
      {/* Import Premium Fonts & Animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
          
          .font-cinzel { font-family: 'Cinzel', serif; }
          .font-cormorant { font-family: 'Cormorant Garamond', serif; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
          
          .gold-text-gradient {
            background: linear-gradient(135deg, #D4AF37 0%, #997B3C 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          /* Path Drawing Animation for Logo */
          .logo-animate .path-draw {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: draw 2s ease-out forwards;
          }
          
          .logo-animate:hover .path-draw {
             animation: none;
             stroke-dashoffset: 0;
          }

          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
          
          .logo-animate .fade-in {
            opacity: 0;
            animation: fadeIn 1s ease-out forwards;
          }
          
          @keyframes fadeIn {
            to { opacity: 1; }
          }

          /* Cinematic Blur Reveal */
          .animate-blur-in {
            animation: blurIn 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }

          @keyframes blurIn {
            0% { filter: blur(12px); opacity: 0; transform: scale(1.05); }
            100% { filter: blur(0); opacity: 1; transform: scale(1); }
          }

          /* Delay utilities */
          .delay-100 { animation-delay: 100ms; }
          .delay-200 { animation-delay: 200ms; }
          .delay-300 { animation-delay: 300ms; }
          .delay-500 { animation-delay: 500ms; }

          /* Shimmer animation */
          @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(12deg); }
            100% { transform: translateX(200%) skewX(12deg); }
          }
          .animate-\\[shimmer_3s_infinite\\] {
            animation: shimmer 3s infinite;
          }
        `}
      </style>

      {/* Presentation Mode Toggle (Top Right) */}
      <div className="fixed top-6 right-6 z-[60]">
        <button 
          onClick={() => setPresentationMode(!presentationMode)}
          className="bg-[#1C1C1C] text-[#D4AF37] px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 text-xs uppercase tracking-widest font-bold hover:bg-black transition-all"
        >
          {presentationMode ? <X size={14} /> : <Eye size={14} />}
          <span>{presentationMode ? "Edit Mode" : "Client View"}</span>
        </button>
      </div>

      {/* Sidebar - Hidden in Presentation Mode */}
      {!presentationMode && (
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-[#E5E5E5] transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]`}>
          <div className="p-10 border-b border-[#E5E5E5]/50 flex justify-between items-center">
            <div className="flex flex-col items-center w-full">
              <Logo className="w-16 h-16 mb-4" />
              <h1 className="font-cinzel font-bold text-lg tracking-[0.25em] text-[#1C1C1C]">CASA<br/>BONITA</h1>
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#A89F91] mt-2">Brand Laboratory</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-[#1C1C1C]">
              <X size={24} />
            </button>
          </div>
          
          <nav className="p-8 space-y-1">
            {[
              { id: 'essence', label: 'Brand Essence', icon: Anchor },
              { id: 'logos', label: 'Identity System', icon: Layout },
              { id: 'typography', label: 'Typography', icon: Type },
              { id: 'palette', label: 'Color Palette', icon: Palette },
              { id: 'sensory', label: 'Sensory Identity', icon: Wind },
              { id: 'voice', label: 'Tone of Voice', icon: Globe },
              { id: 'digital', label: 'Digital Experience', icon: Sparkles },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-4 px-4 py-4 rounded-md text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeTab === item.id 
                    ? 'bg-[#1C1C1C] text-[#D4AF37] shadow-xl translate-x-2' 
                    : 'text-[#A89F91] hover:text-[#1C1C1C] hover:bg-[#F2F0E9]'
                }`}
              >
                <item.icon size={14} className={activeTab === item.id ? 'text-[#D4AF37]' : 'opacity-50'} />
                <span className="font-montserrat font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Stage */}
      <div className={`flex-1 transition-all duration-700 ${!presentationMode ? 'md:ml-72' : 'ml-0'} p-4 md:p-16 lg:p-24 min-h-screen flex flex-col items-center overflow-x-hidden`}>
        
        {/* Mobile Header */}
        <div className="md:hidden w-full flex justify-between items-center mb-8 pt-4">
           <Logo className="w-10 h-10" />
           <button onClick={() => setMobileMenuOpen(true)} className="p-2">
             <Menu size={24} color="#1C1C1C" />
           </button>
        </div>

        {/* Content Container */}
        <main className={`max-w-5xl w-full transition-all duration-1000 ${presentationMode ? 'scale-105' : 'scale-100'}`}>
          
          {/* ESSENCE TAB */}
          {activeTab === 'essence' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12 md:space-y-16">
              
              {/* Language Switcher for Essence */}
              <div className="flex justify-center space-x-1 bg-[#E5E5E5] p-1 rounded-full w-fit mx-auto mb-8">
                {['english', 'german', 'spanish'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 md:px-6 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all ${
                      lang === l 
                      ? 'bg-[#1C1C1C] text-[#D4AF37] shadow-lg' 
                      : 'text-[#666] hover:bg-white'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <header className="text-center space-y-6">
                <span className="font-montserrat text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase">Strategic Foundation</span>
                <h2 className="font-cinzel text-3xl md:text-7xl text-[#1C1C1C] leading-tight px-4">
                  {essenceContent[lang].headline}<br/>
                  <span className="gold-text-gradient italic font-cormorant text-2xl md:text-4xl block mt-4 px-2">{essenceContent[lang].subhead}</span>
                </h2>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
              </header>

              {/* Manifesto Card */}
              <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-xl border border-[#D4AF37]/20 relative rounded-sm">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                 <h3 className="font-montserrat text-[10px] uppercase tracking-widest text-[#A89F91] text-center mb-6 md:mb-8">{essenceContent[lang].manifestoTitle}</h3>
                 <p className="font-cormorant text-xl md:text-3xl text-center leading-relaxed text-[#1C1C1C]">
                   {essenceContent[lang].manifesto}
                 </p>
                 <div className="mt-8 text-center">
                    <Logo className="w-8 h-8 mx-auto opacity-50" />
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 md:gap-16 relative pb-12">
                {/* Vertical Divider (Desktop Only) */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#E5E5E5]"></div>

                <div className="text-center md:text-right md:pr-12 space-y-4 md:space-y-6">
                  <h3 className="font-cinzel text-xl md:text-2xl text-[#1C1C1C]">{essenceContent[lang].guestTitle}</h3>
                  <p className="font-cormorant text-xl md:text-2xl text-[#6B705C] italic">"Sanctuary."</p>
                  <p className="font-montserrat font-light text-sm leading-7 md:leading-8 text-[#A89F91]">
                    {essenceContent[lang].guestBody}
                  </p>
                </div>

                <div className="text-center md:text-left md:pl-12 space-y-4 md:space-y-6">
                  <h3 className="font-cinzel text-xl md:text-2xl text-[#1C1C1C]">{essenceContent[lang].ownerTitle}</h3>
                  <p className="font-cormorant text-xl md:text-2xl text-[#6B705C] italic">"Stewardship."</p>
                  <p className="font-montserrat font-light text-sm leading-7 md:leading-8 text-[#A89F91]">
                    {essenceContent[lang].ownerBody}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SENSORY IDENTITY TAB */}
          {activeTab === 'sensory' && (
             <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-16">
              <header className="border-b border-[#D4AF37]/20 pb-8 text-center md:text-left">
                <span className="font-montserrat text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase">Sensory Architecture</span>
                <h2 className="font-cinzel text-3xl md:text-4xl text-[#1C1C1C] mt-2">Beyond the Visual</h2>
              </header>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Scent */}
                <div className="bg-white p-8 border-t-2 border-[#D4AF37] shadow-lg group hover:-translate-y-2 transition-transform duration-500 rounded-sm">
                   <div className="w-12 h-12 bg-[#F2F0E9] rounded-full flex items-center justify-center mb-6 text-[#D4AF37]">
                      <Wind size={20} />
                   </div>
                   <h3 className="font-cinzel text-xl text-[#1C1C1C] mb-2">Olfactive Logo</h3>
                   <span className="text-[10px] uppercase tracking-widest text-[#A89F91] block mb-4">Wild Fig & Dry Stone</span>
                   <p className="font-montserrat text-xs text-[#666] leading-relaxed">
                      A bespoke scent developed to greet guests upon entry. Notes of green fig leaf, warmed limestone, and a hint of sea salt. It anchors the memory of the home.
                   </p>
                </div>

                {/* Sound */}
                <div className="bg-white p-8 border-t-2 border-[#1C1C1C] shadow-lg group hover:-translate-y-2 transition-transform duration-500 rounded-sm">
                   <div className="w-12 h-12 bg-[#F2F0E9] rounded-full flex items-center justify-center mb-6 text-[#1C1C1C]">
                      <Mic2 size={20} />
                   </div>
                   <h3 className="font-cinzel text-xl text-[#1C1C1C] mb-2">Sonic Branding</h3>
                   <span className="text-[10px] uppercase tracking-widest text-[#A89F91] block mb-4">Binaural Silence</span>
                   <p className="font-montserrat text-xs text-[#666] leading-relaxed">
                      Our digital presence uses "Silence" as a texture. UI sounds are muted, deep, and organic (wood clicks), creating a sense of weight and calm.
                   </p>
                </div>

                {/* Touch */}
                <div className="bg-white p-8 border-t-2 border-[#6B705C] shadow-lg group hover:-translate-y-2 transition-transform duration-500 rounded-sm">
                   <div className="w-12 h-12 bg-[#F2F0E9] rounded-full flex items-center justify-center mb-6 text-[#6B705C]">
                      <Hexagon size={20} />
                   </div>
                   <h3 className="font-cinzel text-xl text-[#1C1C1C] mb-2">Tactile Palette</h3>
                   <span className="text-[10px] uppercase tracking-widest text-[#A89F91] block mb-4">Raw Linen & Honed Slate</span>
                   <p className="font-montserrat text-xs text-[#666] leading-relaxed">
                      We prioritize uncoated papers for stationery and natural fabrics in the homes. Luxury is defined by the texture of the materials we touch.
                   </p>
                </div>
              </div>
             </div>
          )}

          {/* LOGOS TAB */}
          {activeTab === 'logos' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-16">
               <header className="border-b border-[#D4AF37]/20 pb-8 mb-12 flex justify-between items-end">
                <div>
                  <span className="font-montserrat text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase">Visual Identity</span>
                  <h2 className="font-cinzel text-3xl md:text-4xl text-[#1C1C1C] mt-2">The Brand Seal</h2>
                </div>
                {!presentationMode && (
                  <div className="text-right hidden md:block">
                     <p className="text-[10px] uppercase tracking-widest text-[#A89F91]">Download Assets</p>
                     <div className="flex space-x-2 mt-2">
                        <div className="w-8 h-8 bg-[#1C1C1C] rounded-full flex items-center justify-center text-[#D4AF37]"><Share2 size={12}/></div>
                     </div>
                  </div>
                )}
              </header>

              <div className="grid gap-16">
                {/* Primary Logo Hero */}
                <div className="bg-white p-12 md:p-24 flex flex-col items-center justify-center shadow-2xl shadow-[#A89F91]/10 relative border border-[#F2F0E9] group rounded-sm">
                  <div className="absolute top-6 left-6 text-[10px] font-montserrat text-[#A89F91] uppercase tracking-[0.3em] hidden md:block">Hover to Animate</div>
                  
                  <div className="text-center transform transition-transform duration-700">
                    <Logo className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8" animate={true} />
                    <div>
                      <h1 className="font-cinzel font-bold text-2xl md:text-4xl tracking-[0.3em] text-[#1C1C1C]">CASA BONITA</h1>
                      <div className="flex items-center justify-center space-x-4 mt-4">
                        <div className="w-8 md:w-12 h-[1px] bg-[#D4AF37]"></div>
                        <p className="font-montserrat text-[9px] md:text-[10px] tracking-[0.5em] text-[#6B705C] uppercase">Mallorca</p>
                        <div className="w-8 md:w-12 h-[1px] bg-[#D4AF37]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applications */}
                <div className="flex justify-center">
                   <div className="bg-gradient-to-br from-[#D4AF37] to-[#B08D55] p-12 md:p-16 flex flex-col items-center justify-center text-white relative shadow-2xl rounded-sm">
                       <span className="absolute top-6 left-6 text-[10px] font-montserrat text-white/50 uppercase tracking-[0.3em] hidden md:block">Favicon / Social</span>
                       <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Logo className="w-24 h-24" />
                       </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* PALETTE TAB */}
          {activeTab === 'palette' && (
             <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-16">
             <header className="border-b border-[#D4AF37]/20 pb-8">
              <span className="font-montserrat text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase">Color System</span>
              <h2 className="font-cinzel text-3xl md:text-4xl text-[#1C1C1C] mt-2">Earth, Sea & Stone</h2>
            </header>

            <div className="grid gap-6 md:gap-8">
              {palette.map((color, index) => (
                <div key={color.name} className="group flex flex-col md:flex-row items-stretch overflow-hidden rounded-lg md:rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                  
                  {/* Color Swatch */}
                  <div 
                    className="h-32 md:h-auto md:w-1/3 relative flex items-center justify-center cursor-pointer overflow-hidden"
                    style={{ background: color.gradient || color.hex }}
                    onClick={() => copyToClipboard(color.hex)}
                  >
                     {/* Shine effect for gold */}
                     {index === 0 && <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full animate-[shimmer_3s_infinite]"></div>}
                     
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1C1C] text-white px-6 py-2 rounded-full font-montserrat text-[10px] tracking-widest flex items-center shadow-2xl transform translate-y-2 group-hover:translate-y-0 duration-300">
                        <Copy size={12} className="mr-2" />
                        {copiedColor === color.hex ? 'COPIED' : color.hex}
                     </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-center">
                    <h3 className="font-cinzel font-bold text-xl md:text-2xl text-[#1C1C1C] mb-1">{color.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-[#A89F91] mb-6">{color.usage}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                         <span className="block text-[9px] text-[#A89F91] uppercase tracking-wider mb-1">HEX</span>
                         <code className="text-xs text-[#1C1C1C] font-mono border-b border-[#E5E5E5] pb-1 block w-full">{color.hex}</code>
                       </div>
                       <div>
                         <span className="block text-[9px] text-[#A89F91] uppercase tracking-wider mb-1">CMYK</span>
                         <code className="text-xs text-[#1C1C1C] font-mono border-b border-[#E5E5E5] pb-1 block w-full">{color.cmyk}</code>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* TYPOGRAPHY TAB */}
          {activeTab === 'typography' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-16">
               <header className="pb-8 border-b border-[#E5E5E5]">
                <span className="font-montserrat text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase">Typography</span>
                <h2 className="font-cinzel text-3xl md:text-4xl text-[#1C1C1C] mt-2">The "Triple Threat"</h2>
              </header>

              <div className="bg-white p-8 md:p-12 shadow-xl border-l-4 border-[#D4AF37] space-y-12 rounded-sm">
                 <div className="flex flex-col md:flex-row md:items-baseline border-b border-[#F2F0E9] pb-8">
                    <span className="w-32 font-montserrat text-[10px] uppercase tracking-widest text-[#A89F91] mb-2 md:mb-0">Display</span>
                    <h1 className="font-cinzel text-4xl md:text-6xl text-[#1C1C1C]">Cinzel Regular</h1>
                    <span className="md:ml-auto text-xs font-mono text-[#D4AF37] mt-2 md:mt-0">Headlines Only</span>
                 </div>
                 
                 <div className="flex flex-col md:flex-row md:items-baseline border-b border-[#F2F0E9] pb-8">
                    <span className="w-32 font-montserrat text-[10px] uppercase tracking-widest text-[#A89F91] mb-2 md:mb-0">Nuance</span>
                    <h2 className="font-cormorant italic text-3xl md:text-5xl text-[#6B705C]">Cormorant Garamond</h2>
                    <span className="md:ml-auto text-xs font-mono text-[#6B705C] mt-2 md:mt-0">Subheads & Quotes</span>
                 </div>

                 <div className="flex flex-col md:flex-row md:items-baseline">
                    <span className="w-32 font-montserrat text-[10px] uppercase tracking-widest text-[#A89F91] mb-2 md:mb-0">Body</span>
                    <p className="font-montserrat font-light text-base md:text-lg text-[#1C1C1C] max-w-xl">
                      Montserrat Light is used for all functional text. It ensures clarity and modern readability, balancing the historic weight of the display fonts.
                    </p>
                    <span className="md:ml-auto text-xs font-mono text-[#1C1C1C] mt-2 md:mt-0">UI & Paragraphs</span>
                 </div>
              </div>

               {/* Live Tester */}
               <div className="bg-[#1C1C1C] p-8 md:p-12 text-[#F2F0E9] rounded-sm">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-8">Contextual Example</h4>
                  <h2 className="font-cinzel text-3xl md:text-4xl mb-4">{demoText}</h2>
                  <p className="font-cormorant italic text-xl md:text-2xl text-[#A89F91] mb-6">"Where heritage meets silence."</p>
                  
                  <input 
                    type="text" 
                    value={demoText}
                    onChange={(e) => setDemoText(e.target.value)}
                    className="w-full mt-8 md:mt-12 bg-transparent border-b border-white/10 p-2 text-center font-cinzel text-lg md:text-xl focus:outline-none focus:border-[#D4AF37] transition-colors text-white/50"
                    placeholder="Type to test..."
                  />
               </div>
            </div>
          )}

          {/* VOICE TAB */}
          {activeTab === 'voice' && (
             <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-16">
             <header className="border-b border-[#D4AF37]/20 pb-8">
              <span className="font-montserrat text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase">Tone of Voice</span>
              <h2 className="font-cinzel text-3xl md:text-4xl text-[#1C1C1C] mt-2">The Trilingual Shift</h2>
            </header>

            <div className="flex justify-center space-x-1 bg-[#E5E5E5] p-1 rounded-full w-fit mx-auto mb-12">
              {['english', 'german', 'spanish'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 md:px-8 py-3 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-bold transition-all ${
                    lang === l 
                    ? 'bg-[#1C1C1C] text-[#D4AF37] shadow-lg' 
                    : 'text-[#666] hover:bg-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="bg-white p-8 md:p-16 border-t-4 border-[#D4AF37] shadow-2xl text-center max-w-2xl mx-auto relative rounded-sm">
              <div className="absolute top-4 right-4 opacity-10"><Globe size={64} /></div>
              <h3 className="font-cinzel text-2xl md:text-3xl mb-6 md:mb-8 text-[#1C1C1C] leading-snug">
                "{voiceExamples[lang].headline}"
              </h3>
              <p className="font-cormorant text-lg md:text-2xl italic text-[#6B705C] mb-8 md:mb-12 leading-relaxed">
                {voiceExamples[lang].body}
              </p>
              <button className="bg-[#1C1C1C] text-white px-8 md:px-10 py-3 md:py-4 font-montserrat text-[9px] md:text-[10px] tracking-[0.3em] uppercase hover:bg-[#D4AF37] transition-colors shadow-lg">
                {voiceExamples[lang].cta}
              </button>
            </div>
          </div>
          )}

          {/* DIGITAL EXPERIENCE TAB - MOBILE OPTIMIZED */}
          {activeTab === 'digital' && (
            <div className="space-y-16 md:space-y-24 pb-20">
               <header className="border-b border-[#D4AF37]/20 pb-8 animate-blur-in">
                <span className="font-montserrat text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase">Digital Atmosphere</span>
                <h2 className="font-cinzel text-3xl md:text-6xl text-[#1C1C1C] mt-4 leading-tight">
                   The Interactive<br/><span className="font-cormorant italic text-[#6B705C]">Symphony</span>
                </h2>
                <p className="mt-6 font-montserrat text-[#666] max-w-lg leading-relaxed text-sm md:text-base">
                   In the ultra-premium segment, web design is about "Feel". We have developed specific physics for both Desktop (Mouse) and Mobile (Touch) to ensure the luxury translates to the palm of your hand.
                </p>
              </header>

              {/* EFFECT 1: Cinematic Reveal */}
              <section className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                 <div className="md:col-span-4">
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold mb-2 block">01. The Entrance</span>
                    <h3 className="font-cinzel text-2xl mb-4">Cinematic Focus</h3>
                    <p className="text-xs text-[#666] leading-6 font-montserrat">
                       Standard websites just "load". Casa Bonita websites "awaken". We use a blur-to-clear transition that mimics the human eye focusing on a beautiful object.
                    </p>
                 </div>
                 <div className="md:col-span-8 bg-[#1C1C1C] h-64 flex items-center justify-center overflow-hidden relative rounded-lg md:rounded-none">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
                    <h2 className="text-white font-cormorant italic text-3xl md:text-5xl animate-blur-in relative z-10 text-center px-4">
                       "Silence is the<br/>ultimate luxury."
                    </h2>
                 </div>
              </section>

              {/* EFFECT 2: Magnetic Physics / Mobile Press */}
              <section className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                 <div className="md:col-span-4 md:order-2">
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold mb-2 block">02. The Touch</span>
                    <h3 className="font-cinzel text-2xl mb-4">Responsive Physics</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                         <MousePointer size={16} className="text-[#D4AF37] mr-2 mt-1 shrink-0" />
                         <p className="text-xs text-[#666] leading-5 font-montserrat">
                            <strong>Desktop:</strong> Buttons magnetically pull towards your cursor, creating a sense of gravity.
                         </p>
                      </div>
                      <div className="flex items-start">
                         <Smartphone size={16} className="text-[#D4AF37] mr-2 mt-1 shrink-0" />
                         <p className="text-xs text-[#666] leading-5 font-montserrat">
                            <strong>Mobile:</strong> Buttons have "Liquid Press" physics. They shrink and glow under your thumb, mimicking the resistance of a physical premium switch.
                         </p>
                      </div>
                    </div>
                 </div>
                 <div className="md:col-span-8 md:order-1 bg-[#FDFDFB] border border-[#E5E5E5] h-64 flex items-center justify-center rounded-lg md:rounded-none">
                    <MagneticButton className="bg-[#1C1C1C] text-[#D4AF37] px-8 md:px-12 py-4 md:py-5 rounded-full font-montserrat text-[10px] md:text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-[#D4AF37] hover:text-[#1C1C1C] transition-colors">
                       Inquire Now
                    </MagneticButton>
                 </div>
              </section>

              {/* EFFECT 3: Parallax Depth */}
              <section className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                 <div className="md:col-span-4">
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold mb-2 block">03. The Depth</span>
                    <h3 className="font-cinzel text-2xl mb-4">Parallax Layers</h3>
                    <p className="text-xs text-[#666] leading-6 font-montserrat">
                       We create depth by separating the image from the text. As you scroll (or hover), the layers move at different speeds, creating a 3D window into the property.
                    </p>
                 </div>
                 <div className="md:col-span-8 h-80 relative group overflow-hidden cursor-pointer rounded-lg md:rounded-none">
                    {/* Background Layer */}
                    <div className="absolute inset-0 bg-[#A89F91] transform group-hover:scale-105 transition-transform duration-[2s] ease-out"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* Floating Content Layer */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 transform group-hover:translate-y-[-10px] transition-transform duration-700">
                          <span className="text-white font-cinzel text-2xl md:text-3xl tracking-widest">FINCA SOL</span>
                       </div>
                    </div>
                 </div>
              </section>

               {/* EFFECT 4: The Narrative */}
              <section className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                 <div className="md:col-span-4 md:order-2">
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold mb-2 block">04. The Narrative</span>
                    <h3 className="font-cinzel text-2xl mb-4">Scroll-Triggered Pacing</h3>
                    <p className="text-xs text-[#666] leading-6 font-montserrat">
                       We control the flow of time. By revealing the "Golden Thread" and staggering the text only when the user scrolls, we force a moment of pause and reflection.
                    </p>
                 </div>
                 <div className="md:col-span-8 md:order-1">
                    <ScrollTriggerExample />
                 </div>
              </section>

              {/* EFFECT 5: The Spotlight (TOUCH ENABLED) */}
              <section className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                 <div className="md:col-span-4">
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold mb-2 block">05. The Discovery</span>
                    <h3 className="font-cinzel text-2xl mb-4">Interactive Spotlight</h3>
                    <div className="space-y-4">
                       <p className="text-xs text-[#666] leading-6 font-montserrat">
                          True luxury is often hidden. This effect uses curiosity to reveal content.
                       </p>
                       <div className="flex items-center space-x-2 text-[#D4AF37] bg-white/50 p-2 rounded w-fit">
                          <Smartphone size={16} />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Touch Enabled</span>
                       </div>
                    </div>
                 </div>
                 <div className="md:col-span-8">
                    <SpotlightEffect />
                 </div>
              </section>

            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default BrandLab;
