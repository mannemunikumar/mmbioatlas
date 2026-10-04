import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  BookOpen, 
  BarChart3, 
  GraduationCap, 
  Menu, 
  X, 
  ChevronDown, 
  Compass, 
  Layers, 
  Radio, 
  Database,
  Send,
  Building2,
  FlaskConical,
  Briefcase,
  Boxes,
  PhoneCall,
  LayoutGrid,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Globe,
  Phone,
  Mail
} from 'lucide-react';
import { Logo } from './Logo';
import { AtlasView } from '../types';
import { LEADERSHIP_CONTACT } from '../data/organizationData';

interface NavbarProps {
  currentView: AtlasView;
  onSelectView: (view: AtlasView) => void;
  onOpenSearch: () => void;
  onOpenBrandKit: () => void;
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  onOpenSearch,
  onOpenBrandKit,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [dataDropdownOpen, setDataDropdownOpen] = useState(false);

  const mainNavItems: { id: AtlasView; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Home', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'services', label: 'Services', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'research', label: 'Research', icon: <FlaskConical className="w-3.5 h-3.5" /> },
    { id: 'rd', label: 'R&D', icon: <Boxes className="w-3.5 h-3.5" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'training', label: 'Training', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Contact', icon: <PhoneCall className="w-3.5 h-3.5" /> },
  ];

  const serviceSubItems: { id: AtlasView; label: string; sub: string; icon: React.ReactNode }[] = [
    { id: 'services', label: 'All Services Directory', sub: 'Comprehensive overview of 6 scientific divisions', icon: <LayoutGrid className="w-3.5 h-3.5 text-blue-600" /> },
    { id: 'cro-services', label: 'CRO & Simulations', sub: 'Molecular docking, GROMACS MD, & NGS pipelines', icon: <Cpu className="w-3.5 h-3.5 text-cyan-600" /> },
    { id: 'academic-writing', label: 'Academic Writing', sub: 'Q1 manuscripts, dissertations, & PRISMA reviews', icon: <BookOpen className="w-3.5 h-3.5 text-sky-600" /> },
    { id: 'statistics', label: 'Biostatistics', sub: 'G*Power sample size, ANOVA, & survival analysis', icon: <BarChart3 className="w-3.5 h-3.5 text-amber-600" /> },
  ];

  const atlasSubItems: { id: AtlasView; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'Mission & Activities', icon: <Building2 className="w-3.5 h-3.5 text-blue-500" /> },
    { id: 'umap', label: 'Single-Cell UMAP', icon: <Radio className="w-3.5 h-3.5 text-cyan-500" /> },
    { id: 'spatial', label: 'Spatial Biology', icon: <Layers className="w-3.5 h-3.5 text-purple-500" /> },
    { id: 'organs', label: 'Organ Systems Census', icon: <Compass className="w-3.5 h-3.5 text-rose-500" /> },
    { id: 'microbiome', label: 'Microbiome Metagenomics', icon: <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> },
    { id: 'datasets', label: 'Open Access Datasets', icon: <Database className="w-3.5 h-3.5 text-blue-500" /> },
  ];

  const isServicesActive = ['services', 'cro-services', 'academic-writing', 'statistics'].includes(currentView);
  const isAtlasActive = ['about', 'umap', 'spatial', 'organs', 'microbiome', 'datasets'].includes(currentView);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs transition-all">
      {/* Top bar with International Research & Social Media Links */}
      <div className="hidden md:block bg-gradient-to-r from-[#071d33] via-[#0b2b4f] to-[#071d33] text-slate-200 text-[11px] py-1.5 px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-sans">
          {/* Left: Institutional Research Overview */}
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-cyan-400 font-semibold">M &amp; M BioATLAS Innovation Hub</span>
          </div>

          {/* Right: Academic Social Media Links */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">Connect:</span>
            <div className="flex items-center gap-1">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded hover:bg-white/15 text-slate-300 hover:text-sky-300 transition"
                title="LinkedIn – Institutional & Research Updates"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded hover:bg-white/15 text-slate-300 hover:text-sky-300 transition"
                title="X / Twitter – Preprints & Bioinformatic Benchmarks"
                aria-label="X / Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded hover:bg-white/15 text-slate-300 hover:text-sky-300 transition"
                title="GitHub – Open-Source Nextflow Pipelines & Code"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded hover:bg-white/15 text-slate-300 hover:text-rose-400 transition"
                title="YouTube – Scientific Webinars & MD Tutorials"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectView('overview')}
            className="cursor-pointer group py-2 shrink-0"
            id="brand-logo-button"
          >
            <Logo size="md" variant="full" theme="light" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/80 shadow-xs">
            {mainNavItems.map((item) => {
              if (item.id === 'services') {
                return (
                  <div key={item.id} className="relative" onMouseLeave={() => setServicesDropdownOpen(false)}>
                    <button
                      id={`nav-${item.id}`}
                      onClick={() => onSelectView('services')}
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                        isServicesActive
                          ? 'bg-[#0b3b70] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[#0b3b70] hover:bg-white/80 border border-transparent'
                      }`}
                    >
                      <span className={isServicesActive ? 'text-sky-200' : 'text-slate-500'}>
                        {item.icon}
                      </span>
                      <span>Services</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-72 rounded-xl bg-white border border-slate-200 shadow-xl p-2 space-y-1 z-50 animate-fadeIn text-slate-700">
                        {serviceSubItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              onSelectView(sub.id);
                              setServicesDropdownOpen(false);
                            }}
                            className={`w-full flex items-start gap-2.5 p-2.5 rounded-lg text-left transition ${
                              currentView === sub.id
                                ? 'bg-sky-50 text-[#0b3b70]'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span className="p-1.5 rounded bg-slate-100 mt-0.5 shrink-0">{sub.icon}</span>
                            <div>
                              <div className="text-sm font-bold leading-tight">{sub.label}</div>
                              <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{sub.sub}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => onSelectView(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0b3b70] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0b3b70] hover:bg-white/80 border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-sky-200' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Atlas & More Dropdown */}
            <div className="relative" onMouseLeave={() => setDataDropdownOpen(false)}>
              <button
                onClick={() => setDataDropdownOpen(!dataDropdownOpen)}
                onMouseEnter={() => setDataDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isAtlasActive
                    ? 'bg-[#0b3b70] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0b3b70] hover:bg-white/80 border border-transparent'
                }`}
              >
                <span>Atlas Data</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dataDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dataDropdownOpen && (
                <div 
                  className="absolute top-full right-0 mt-1.5 w-60 rounded-xl bg-white border border-slate-200 shadow-xl p-2 space-y-1 z-50 animate-fadeIn text-slate-700"
                >
                  {atlasSubItems.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onSelectView(sub.id);
                        setDataDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition ${
                        currentView === sub.id
                          ? 'bg-sky-50 text-[#0b3b70] font-semibold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {sub.icon}
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Utilities & Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Contact CTA */}
            <button
              id="nav-consultation-trigger"
              onClick={() => onSelectView('contact')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0b3b70] hover:bg-[#082e59] text-white text-xs font-semibold tracking-wide transition shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-2 shadow-lg max-h-[85vh] overflow-y-auto">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                currentView === item.id || (item.id === 'services' && isServicesActive)
                  ? 'bg-[#0b3b70] text-white'
                  : 'text-slate-700 hover:text-[#0b3b70] hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-2 border-t border-slate-200">
            <div className="text-[11px] font-mono text-slate-400 px-4 mb-2 uppercase font-semibold">
              Atlas Explorers &amp; Data:
            </div>
            {atlasSubItems.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  onSelectView(sub.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium transition ${
                  currentView === sub.id
                    ? 'bg-sky-50 text-[#0b3b70] font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sub.icon}
                <span>{sub.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Social Links & Global Desk */}
          <div className="pt-3 pb-1 border-t border-slate-200">
            <div className="text-[11px] font-mono text-slate-400 px-4 mb-2 uppercase font-semibold flex items-center justify-between">
              <span>Scientific Socials:</span>
              <span className="text-[10px] text-emerald-600 font-sans font-medium">Global Desks</span>
            </div>
            <div className="flex items-center justify-around px-4 py-2 bg-slate-50 rounded-xl mx-2 border border-slate-200/80">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-700 hover:text-blue-700 font-medium"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-300">•</span>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-700 hover:text-sky-600 font-medium"
              >
                <Twitter className="w-4 h-4 text-sky-500" />
                <span>X</span>
              </a>
              <span className="text-slate-300">•</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-700 hover:text-slate-950 font-medium"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-300">•</span>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-700 hover:text-red-600 font-medium"
              >
                <Youtube className="w-4 h-4 text-red-600" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <a
              href={`tel:${LEADERSHIP_CONTACT.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call Dr. Manne Munikumar: {LEADERSHIP_CONTACT.phoneDisplay}</span>
            </a>

            <a
              href={`mailto:${LEADERSHIP_CONTACT.email}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0b3b70] text-xs font-bold font-mono border border-blue-200 transition"
            >
              <Mail className="w-4 h-4 text-blue-700" />
              <span>{LEADERSHIP_CONTACT.email}</span>
            </a>

            <button
              onClick={() => {
                onSelectView('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0b3b70] text-white text-xs font-semibold shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Contact Desk &amp; Submit Scope</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

