import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, MapPin, Zap, Wind, Sun, TrendingUp, Calendar, Building2, ChevronDown, X, Filter, ArrowUpRight, FileText, Send, User, LogOut, Settings, BarChart3, Activity, Shield, DollarSign, Check } from 'lucide-react';

const developmentStages = [
  "Land Secured",
  "Environmental Permit",
  "Connection Secured",
  "Construction Permit Secured",
  "PPA Secured",
  "Under Construction"
];

const projects = [
  {
    id: 1,
    name: "Andalucía Sol I",
    type: "Solar",
    capacity: 450,
    location: "Córdoba, Spain",
    country: "Spain",
    epcCost: 285000000,
    distanceToSubstation: 3.2,
    landSurface: 900,
    landLeaseCost: 1200,
    developmentStage: "PPA Secured"
  },
  {
    id: 2,
    name: "Puglia Agrisolare",
    type: "Solar",
    capacity: 380,
    location: "Foggia, Italy",
    country: "Italy",
    epcCost: 245000000,
    distanceToSubstation: 4.7,
    landSurface: 760,
    landLeaseCost: 1400,
    developmentStage: "Under Construction"
  },
  {
    id: 3,
    name: "Alentejo Solar Complex",
    type: "Solar",
    capacity: 520,
    location: "Beja, Portugal",
    country: "Portugal",
    epcCost: 395000000,
    distanceToSubstation: 6.1,
    landSurface: 1040,
    landLeaseCost: 950,
    developmentStage: "Construction Permit Secured"
  },
  {
    id: 4,
    name: "Sicilia Vento",
    type: "Wind",
    capacity: 280,
    location: "Trapani, Italy",
    country: "Italy",
    epcCost: 195000000,
    distanceToSubstation: 5.3,
    landSurface: 1400,
    landLeaseCost: 700,
    developmentStage: "Under Construction"
  },
  {
    id: 5,
    name: "Loire Valley Solar",
    type: "Solar",
    capacity: 340,
    location: "Tours, France",
    country: "France",
    epcCost: 215000000,
    distanceToSubstation: 2.9,
    landSurface: 680,
    landLeaseCost: 1800,
    developmentStage: "Land Secured"
  },
  {
    id: 6,
    name: "Extremadura Solar Park",
    type: "Solar",
    capacity: 620,
    location: "Badajoz, Spain",
    country: "Spain",
    epcCost: 372000000,
    distanceToSubstation: 7.8,
    landSurface: 1240,
    landLeaseCost: 1100,
    developmentStage: "Environmental Permit"
  },
  {
    id: 7,
    name: "Sardegna Wind Farm",
    type: "Wind",
    capacity: 240,
    location: "Sassari, Italy",
    country: "Italy",
    epcCost: 168000000,
    distanceToSubstation: 4.2,
    landSurface: 1200,
    landLeaseCost: 650,
    developmentStage: "Connection Secured"
  },
  {
    id: 8,
    name: "Brandenburg Solar",
    type: "Solar",
    capacity: 290,
    location: "Cottbus, Germany",
    country: "Germany",
    epcCost: 185000000,
    distanceToSubstation: 2.1,
    landSurface: 580,
    landLeaseCost: 2200,
    developmentStage: "PPA Secured"
  },
  {
    id: 9,
    name: "Castilla Solar Farm",
    type: "Solar",
    capacity: 480,
    location: "Toledo, Spain",
    country: "Spain",
    epcCost: 305000000,
    distanceToSubstation: 4.5,
    landSurface: 960,
    landLeaseCost: 1150,
    developmentStage: "Under Construction"
  },
  {
    id: 10,
    name: "Algarve Solar Park",
    type: "Solar",
    capacity: 310,
    location: "Faro, Portugal",
    country: "Portugal",
    epcCost: 198000000,
    distanceToSubstation: 3.8,
    landSurface: 620,
    landLeaseCost: 1050,
    developmentStage: "PPA Secured"
  },
  {
    id: 11,
    name: "Provence Wind Farm",
    type: "Wind",
    capacity: 180,
    location: "Avignon, France",
    country: "France",
    epcCost: 135000000,
    distanceToSubstation: 5.9,
    landSurface: 900,
    landLeaseCost: 1650,
    developmentStage: "Construction Permit Secured"
  },
  {
    id: 12,
    name: "Saxony Solar Park",
    type: "Solar",
    capacity: 350,
    location: "Leipzig, Germany",
    country: "Germany",
    epcCost: 225000000,
    distanceToSubstation: 1.8,
    landSurface: 700,
    landLeaseCost: 2400,
    developmentStage: "Land Secured"
  },
  {
    id: 13,
    name: "Occitanie Solar Complex",
    type: "Solar",
    capacity: 410,
    location: "Montpellier, France",
    country: "France",
    epcCost: 262000000,
    distanceToSubstation: 5.2,
    landSurface: 820,
    landLeaseCost: 1750,
    developmentStage: "Environmental Permit"
  },
  {
    id: 14,
    name: "Lower Saxony Wind Park",
    type: "Wind",
    capacity: 320,
    location: "Hanover, Germany",
    country: "Germany",
    epcCost: 240000000,
    distanceToSubstation: 3.4,
    landSurface: 1600,
    landLeaseCost: 2100,
    developmentStage: "PPA Secured"
  }
];

const typeIcons = {
  Solar: Sun,
  Wind: Wind
};

const typeColors = {
  Solar: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  Wind: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' }
};

const stageColors = {
  'Land Secured': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  'Environmental Permit': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Connection Secured': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Construction Permit Secured': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'PPA Secured': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Under Construction': 'bg-amber-500/20 text-amber-300 border-amber-500/30'
};

function formatCurrency(amount) {
  if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
  return `$${(amount / 1000000).toFixed(0)}M`;
}

function ProjectCard({ project, onClick, hasNBO, isLoggedIn }) {
  const Icon = typeIcons[project.type];
  const colors = typeColors[project.type];
  
  const countryFlags = {
    'Spain': '🇪🇸',
    'Portugal': '🇵🇹',
    'France': '🇫🇷',
    'Italy': '🇮🇹',
    'Germany': '🇩🇪'
  };
  
  return (
    <div 
      onClick={onClick}
      className={`group relative bg-slate-800/50 backdrop-blur border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-slate-800/80 hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-1 ${
        hasNBO ? 'border-green-500/50 hover:border-green-400' : 'border-slate-700/50 hover:border-slate-600'
      }`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-700/20 to-transparent rounded-tr-2xl rounded-bl-full" />
      
      {hasNBO && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full flex items-center gap-1">
          <Send className="w-3 h-3 text-green-400" />
          <span className="text-xs text-green-400 font-medium">NBO Submitted</span>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div className={`flex items-center gap-2 ${hasNBO ? 'mt-8' : ''}`}>
          <span className="text-lg">{countryFlags[project.country]}</span>
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${stageColors[project.developmentStage]}`}>
            {project.developmentStage}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
        {project.name}
      </h3>
      
      <div className="flex items-center text-slate-400 text-sm mb-4">
        <MapPin className="w-4 h-4 mr-1" />
        {project.location}
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-900/50 rounded-lg p-3">
          <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">Capacity</div>
          <div className="text-white font-semibold flex items-center">
            <Zap className="w-4 h-4 mr-1 text-cyan-400" />
            {project.capacity} MW
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-3">
          <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">To Substation</div>
          <div className="text-white font-semibold flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-green-400" />
            {project.distanceToSubstation} km
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-900/50 rounded-lg p-3">
          <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">Land Surface</div>
          <div className="text-white font-semibold text-sm">
            {project.landSurface ? `${project.landSurface} ha` : 'N/A'}
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-3">
          <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">Land Lease</div>
          <div className="text-white font-semibold text-sm">
            {project.landLeaseCost ? `€${project.landLeaseCost}/ha/yr` : 'N/A'}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
        <div>
          <div className="text-slate-500 text-xs uppercase tracking-wide">Est. EPC Cost</div>
          <div className="text-lg font-bold text-cyan-300">{formatCurrency(project.epcCost)}</div>
        </div>
        <div className="flex items-center text-slate-400 group-hover:text-cyan-400 transition-colors">
          {isLoggedIn ? (
            <>
              <span className="text-sm mr-1">View Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-sm">Login to View</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose, onSubmitNBO, hasNBO }) {
  if (!project) return null;
  
  const Icon = typeIcons[project.type];
  const colors = typeColors[project.type];
  const currentStageIndex = developmentStages.indexOf(project.developmentStage);
  
  const countryFlags = {
    'Spain': '🇪🇸',
    'Portugal': '🇵🇹',
    'France': '🇫🇷',
    'Italy': '🇮🇹',
    'Germany': '🇩🇪'
  };

  const handleDownloadTeaser = () => {
    // PDF teasers should be placed in /teasers/ folder with naming convention: project-id.pdf
    const teaserUrl = `/teasers/${project.id}.pdf`;
    const link = document.createElement('a');
    link.href = teaserUrl;
    link.download = `${project.name.replace(/\s+/g, '-')}-Teaser.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                <span className="text-2xl">{countryFlags[project.country]}</span>
                {hasNBO && (
                  <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400 font-medium flex items-center gap-1">
                    <Send className="w-3 h-3" />
                    NBO Submitted
                  </span>
                )}
              </div>
              <div className="flex items-center text-slate-400 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {project.location}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        
        <div className="p-8">
          {/* Development Stage Progress */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Development Progress</h3>
            <div className="relative">
              <div className="flex justify-between mb-2">
                {developmentStages.map((stage, index) => (
                  <div key={stage} className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 
                      ${index <= currentStageIndex 
                        ? 'bg-cyan-500 text-slate-900' 
                        : 'bg-slate-700 text-slate-500'}`}
                    >
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-700 -z-0">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-500"
                  style={{ width: `${(currentStageIndex / (developmentStages.length - 1)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                {developmentStages.map((stage, index) => (
                  <div key={stage} className="flex-1 text-center px-1">
                    <span className={`text-xs ${index <= currentStageIndex ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`px-4 py-2 text-sm font-medium rounded-full border ${stageColors[project.developmentStage]}`}>
              {project.developmentStage}
            </span>
            <span className={`px-4 py-2 text-sm font-medium rounded-full ${colors.bg} ${colors.border} border ${colors.text}`}>
              {project.type}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <Zap className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">Capacity</div>
              <div className="text-xl font-bold text-white">{project.capacity} MW</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">Distance to Substation</div>
              <div className="text-xl font-bold text-white">{project.distanceToSubstation} km</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <Building2 className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">Land Surface</div>
              <div className="text-xl font-bold text-white">{project.landSurface ? `${project.landSurface} ha` : 'N/A (Offshore)'}</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <Calendar className="w-5 h-5 text-purple-400 mb-2" />
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">Land Lease Cost</div>
              <div className="text-xl font-bold text-white">{project.landLeaseCost ? `€${project.landLeaseCost.toLocaleString()}` : 'N/A'}</div>
              {project.landLeaseCost && <div className="text-slate-500 text-xs">per hectare / year</div>}
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 md:col-span-2">
              <MapPin className="w-5 h-5 text-rose-400 mb-2" />
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">Location</div>
              <div className="text-xl font-bold text-white">{project.location}</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-slate-400 text-sm mb-1">Estimated EPC Cost</div>
                <div className="text-3xl font-bold text-cyan-300">{formatCurrency(project.epcCost)}</div>
                <div className="text-slate-500 text-sm mt-1">
                  €{(project.epcCost / project.capacity / 1000000).toFixed(2)}M per MW
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleDownloadTeaser}
                  className="px-5 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Teaser
                </button>
                {hasNBO ? (
                  <button 
                    className="px-5 py-3 bg-green-500/20 text-green-400 font-semibold rounded-xl flex items-center gap-2 cursor-default"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    NBO Submitted
                  </button>
                ) : (
                  <button 
                    onClick={() => onSubmitNBO(project)}
                    className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                    Submit NBO
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RenewableMarketplace() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');

  // Disable body scroll when Privacy Policy, Terms, or Disclaimer modal is open
  useEffect(() => {
    if (showPrivacyModal || showTermsModal || showDisclaimerModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPrivacyModal, showTermsModal, showDisclaimerModal]);

  // Close all modals when returning to landing page
  useEffect(() => {
    if (showLandingPage && !showLearnMore) {
      setShowLoginModal(false);
      setShowRegisterModal(false);
      setShowPrivacyModal(false);
      setShowTermsModal(false);
      setShowDisclaimerModal(false);
    }
  }, [showLandingPage, showLearnMore]);

  // Focus trap for Privacy Policy modal
  const privacyModalRef = useRef(null);
  useEffect(() => {
    if (showPrivacyModal && privacyModalRef.current) {
      const focusableElements = privacyModalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [showPrivacyModal]);

  // Focus trap for Terms modal
  const termsModalRef = useRef(null);
  useEffect(() => {
    if (showTermsModal && termsModalRef.current) {
      const focusableElements = termsModalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [showTermsModal]);

  // Focus trap for Disclaimer modal
  const disclaimerModalRef = useRef(null);
  useEffect(() => {
    if (showDisclaimerModal && disclaimerModalRef.current) {
      const focusableElements = disclaimerModalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [showDisclaimerModal]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Registration form state
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    institution: '',
    courseCode: '',
    teamName: '',
    acceptPrivacy: false,
    acceptDisclaimer: false,
    acceptTerms: false
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [registerSubmitted, setRegisterSubmitted] = useState(false);

  // Simulated logged-in user
  const user = {
    name: registerForm.firstName || 'Training User',
    email: registerForm.email || 'user@training.com',
    avatar: null
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateRegisterForm = () => {
    const errors = {};
    
    if (!registerForm.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!registerForm.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!registerForm.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(registerForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!registerForm.password) {
      errors.password = 'Password is required';
    } else if (registerForm.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (!registerForm.role) {
      errors.role = 'Please select a role';
    }
    if (!registerForm.institution.trim()) {
      errors.institution = 'Institution is required';
    }
    if (!registerForm.acceptPrivacy) {
      errors.acceptPrivacy = 'You must accept the Privacy Policy';
    }
    if (!registerForm.acceptDisclaimer) {
      errors.acceptDisclaimer = 'You must accept the Disclaimer';
    }
    if (!registerForm.acceptTerms) {
      errors.acceptTerms = 'You must accept the Terms & Conditions';
    }
    
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterChange = (field, value) => {
    setRegisterForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (registerErrors[field]) {
      setRegisterErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterSubmitted(true);
    
    if (validateRegisterForm()) {
      // Simulate successful registration
      setIsLoggedIn(true);
      setShowRegisterModal(false);
      setShowPrivacyModal(false);
      setShowTermsModal(false);
      setShowDisclaimerModal(false);
      setShowLandingPage(false);
      setRegisterSubmitted(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowLandingPage(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowPrivacyModal(false);
    setShowTermsModal(false);
    setShowDisclaimerModal(false);
    setShowLandingPage(true);
    setRegisterForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      institution: '',
      courseCode: '',
      teamName: '',
      acceptPrivacy: false,
      acceptDisclaimer: false,
      acceptTerms: false
    });
  };

  const handleProjectClick = (project) => {
    if (isLoggedIn) {
      setSelectedProject(project);
    } else {
      setShowLoginModal(true);
    }
  };
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [sortBy, setSortBy] = useState('capacity');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [budget, setBudget] = useState(2000000);
  const [purchasedServices, setPurchasedServices] = useState([]);
  const [selectedResourceCountry, setSelectedResourceCountry] = useState('Spain');
  const [showNBOModal, setShowNBOModal] = useState(false);
  const [nboProject, setNboProject] = useState(null);
  const [selectedClauses, setSelectedClauses] = useState([]);
  const [submittedNBOs, setSubmittedNBOs] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [readNews, setReadNews] = useState([]);
  const [showPurchaseConfirm, setShowPurchaseConfirm] = useState(false);
  const [pendingPurchase, setPendingPurchase] = useState(null);

  // News items - placeholder data, to be customized later
  const newsItems = [
    {
      id: 'news1',
      date: '2025-01-28',
      category: 'Market',
      country: 'Spain',
      title: 'Spanish Government Announces New Renewable Energy Targets',
      summary: 'Spain sets ambitious 2030 targets with 50GW solar and 30GW wind capacity goals.',
      content: 'The Spanish government has unveiled its updated National Energy and Climate Plan (PNIEC), setting ambitious targets for renewable energy deployment by 2030. The plan includes 50GW of installed solar capacity and 30GW of wind capacity, representing a significant increase from current levels. Industry experts suggest this will create substantial investment opportunities in the coming years.',
      impact: 'Positive for Spanish projects - increased government support expected.',
      impactType: 'positive'
    },
    {
      id: 'news2',
      date: '2025-01-27',
      category: 'Regulation',
      country: 'Germany',
      title: 'Germany Streamlines Grid Connection Process',
      summary: 'New regulations reduce grid connection approval times by up to 40%.',
      content: 'German regulators have implemented new fast-track procedures for renewable energy grid connections. The reforms are expected to reduce approval times from an average of 24 months to approximately 14 months. This change addresses one of the key bottlenecks in project development and is expected to accelerate the country\'s energy transition.',
      impact: 'Reduces development risk for German projects.',
      impactType: 'positive'
    },
    {
      id: 'news3',
      date: '2025-01-26',
      category: 'Market',
      country: 'Europe',
      title: 'European Power Prices Show Continued Volatility',
      summary: 'Wholesale electricity prices fluctuate amid uncertain gas supply outlook.',
      content: 'European wholesale electricity markets have experienced significant volatility in recent weeks, with day-ahead prices ranging from €45/MWh to €120/MWh. Analysts attribute the fluctuations to ongoing uncertainty regarding natural gas supplies and variable renewable generation. Long-term PPA prices have remained more stable, averaging €65-75/MWh across major markets.',
      impact: 'PPA strategy becomes more important for revenue certainty.',
      impactType: 'neutral'
    },
    {
      id: 'news4',
      date: '2025-01-25',
      category: 'Policy',
      country: 'Italy',
      title: 'Italy Extends Renewable Energy Tax Credits',
      summary: 'Government extends investment tax credits for renewable projects through 2027.',
      content: 'The Italian government has confirmed the extension of favorable tax treatment for renewable energy investments. The scheme, which provides tax credits of up to 40% for qualifying investments, will now continue through 2027. The extension provides certainty for investors and is expected to maintain strong project development activity in the Italian market.',
      impact: 'Improved project economics for Italian investments.',
      impactType: 'positive'
    },
    {
      id: 'news5',
      date: '2025-01-24',
      category: 'Industry',
      country: 'Europe',
      title: 'Solar Panel Prices Drop to Record Lows',
      summary: 'Oversupply in global solar module market drives prices down 25% year-over-year.',
      content: 'Global solar module prices have fallen to historic lows, with tier-1 modules now available at €0.10-0.12/Wp, down approximately 25% from the previous year. The price decline is attributed to significant manufacturing capacity expansion in Asia. While beneficial for project economics, some European manufacturers have expressed concerns about market sustainability.',
      impact: 'Lower CAPEX for solar projects across all markets.',
      impactType: 'positive'
    },
    {
      id: 'news6',
      date: '2025-01-23',
      category: 'Regulation',
      country: 'France',
      title: 'France Tightens Environmental Assessment Requirements',
      summary: 'New biodiversity regulations add complexity to project permitting.',
      content: 'French authorities have introduced enhanced environmental assessment requirements for renewable energy projects. The new regulations mandate more comprehensive biodiversity impact studies and may require additional mitigation measures. Industry groups estimate the changes could add 3-6 months to permitting timelines and increase development costs by 5-10%.',
      impact: 'Increased development costs and timeline for French projects.',
      impactType: 'negative'
    },
    {
      id: 'news7',
      date: '2025-01-22',
      category: 'Market',
      country: 'Portugal',
      title: 'Portuguese Corporate PPA Market Sees Record Activity',
      summary: 'Tech companies drive demand for renewable PPAs in Iberian market.',
      content: 'The Portuguese corporate PPA market has seen unprecedented activity, with several major technology companies signing long-term agreements. Recent deals have been structured at prices between €55-65/MWh for 10-15 year terms. Market participants expect continued strong demand as corporations pursue carbon neutrality targets.',
      impact: 'Strong PPA opportunities for Portuguese projects.',
      impactType: 'positive'
    },
    {
      id: 'news8',
      date: '2025-01-21',
      category: 'Finance',
      country: 'Europe',
      title: 'Interest Rates Expected to Stabilize in 2025',
      summary: 'ECB signals end of rate hiking cycle, providing clarity for project financing.',
      content: 'The European Central Bank has signaled that interest rates are likely to stabilize at current levels through 2025, with potential for modest reductions in late 2025. The guidance provides greater certainty for project financing assumptions and may support improved debt terms for renewable energy projects.',
      impact: 'More predictable financing costs for all European projects.',
      impactType: 'positive'
    },
  ];

  const handleReadNews = (newsId) => {
    if (!readNews.includes(newsId)) {
      setReadNews(prev => [...prev, newsId]);
    }
  };

  // NBO Clauses - placeholder data, to be customized later
  const nboClauses = [
    { id: 'cp1', category: 'Due Diligence', name: 'Satisfactory Technical Due Diligence', description: 'NBO subject to completion of technical due diligence to buyer\'s satisfaction.' },
    { id: 'cp2', category: 'Due Diligence', name: 'Satisfactory Legal Due Diligence', description: 'NBO subject to completion of legal due diligence to buyer\'s satisfaction.' },
    { id: 'cp3', category: 'Due Diligence', name: 'Satisfactory Environmental Due Diligence', description: 'NBO subject to completion of environmental assessments to buyer\'s satisfaction.' },
    { id: 'cp4', category: 'Permits', name: 'All Permits in Place', description: 'NBO conditional on all required permits being obtained and in full force.' },
    { id: 'cp5', category: 'Permits', name: 'Grid Connection Agreement', description: 'NBO conditional on executed grid connection agreement with the TSO/DSO.' },
    { id: 'cp6', category: 'Commercial', name: 'PPA Execution', description: 'NBO subject to execution of PPA on terms acceptable to buyer.' },
    { id: 'cp7', category: 'Commercial', name: 'Minimum IRR Threshold', description: 'NBO conditional on project achieving minimum target IRR.' },
    { id: 'cp8', category: 'Commercial', name: 'EPC Contract on Acceptable Terms', description: 'NBO subject to EPC contract execution on terms acceptable to buyer.' },
    { id: 'cp9', category: 'Financing', name: 'Board Approval', description: 'NBO subject to final investment committee / board approval.' },
    { id: 'cp10', category: 'Financing', name: 'Financing Availability', description: 'NBO conditional on securing project financing on acceptable terms.' },
    { id: 'cp11', category: 'Legal', name: 'No Material Adverse Change', description: 'NBO subject to no material adverse change occurring prior to closing.' },
    { id: 'cp12', category: 'Legal', name: 'Exclusivity Period', description: 'Seller to grant exclusivity period for buyer to complete due diligence.' },
  ];

  const handleOpenNBO = (project) => {
    setNboProject(project);
    setSelectedClauses([]);
    setShowNBOModal(true);
  };

  const handleToggleClause = (clauseId) => {
    setSelectedClauses(prev => 
      prev.includes(clauseId) 
        ? prev.filter(id => id !== clauseId)
        : [...prev, clauseId]
    );
  };

  const handleSubmitNBO = () => {
    if (nboProject && selectedClauses.length > 0) {
      setSubmittedNBOs(prev => [...prev, {
        projectId: nboProject.id,
        projectName: nboProject.name,
        clauses: selectedClauses,
        submittedAt: new Date().toISOString()
      }]);
      setShowNBOModal(false);
      setSelectedProject(null);
      setNboProject(null);
      setSelectedClauses([]);
    }
  };

  const countries = ['Spain', 'Portugal', 'France', 'Italy', 'Germany'];
  
  const countryMultipliers = {
    'Spain': 1.0,
    'Portugal': 1.10,
    'Italy': 1.15,
    'France': 1.20,
    'Germany': 1.25
  };

  const countryFlags = {
    'Spain': '🇪🇸',
    'Portugal': '🇵🇹',
    'France': '🇫🇷',
    'Italy': '🇮🇹',
    'Germany': '🇩🇪'
  };

  const baseServices = [
    { id: 'yield', name: 'Yield Assessment Curve', basePrice: 150000, description: 'Detailed energy yield projections based on site-specific meteorological data and equipment specifications.', icon: BarChart3 },
    { id: 'curtailment', name: 'Curtailment Study', basePrice: 120000, description: 'Analysis of potential grid curtailment risks and revenue impact assessment.', icon: TrendingUp },
    { id: 'powermarket', name: 'Power Market Curves', basePrice: 180000, description: 'Forward price curves and market scenarios for electricity price forecasting.', icon: Activity },
    { id: 'ppa', name: 'PPA Originator', basePrice: 250000, description: 'Access to PPA counterparties and negotiation support for offtake agreements.', icon: FileText },
    { id: 'duediligence', name: 'Due Diligence Services', basePrice: 350000, description: 'Comprehensive technical, legal, and environmental due diligence package.', icon: Shield },
    { id: 'financial', name: 'Financial Advisory', basePrice: 400000, description: 'Expert financial modeling support and investment structuring advice.', icon: DollarSign }
  ];

  const handlePurchaseService = (serviceId, country, price, serviceName) => {
    if (budget >= price && !isServicePurchased(serviceId, country)) {
      setPendingPurchase({ serviceId, country, price, serviceName });
      setShowPurchaseConfirm(true);
    }
  };

  const confirmPurchase = () => {
    if (pendingPurchase) {
      setBudget(prev => prev - pendingPurchase.price);
      setPurchasedServices(prev => [...prev, { 
        serviceId: pendingPurchase.serviceId, 
        country: pendingPurchase.country,
        purchasedAt: new Date().toISOString()
      }]);
      setShowPurchaseConfirm(false);
      setPendingPurchase(null);
    }
  };

  const cancelPurchase = () => {
    setShowPurchaseConfirm(false);
    setPendingPurchase(null);
  };

  const isServicePurchased = (serviceId, country) => {
    return purchasedServices.some(p => p.serviceId === serviceId && p.country === country);
  };

  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All' || p.type === selectedType;
        const matchesStage = selectedStage === 'All' || p.developmentStage === selectedStage;
        const matchesCountry = selectedCountry === 'All' || p.country === selectedCountry;
        return matchesSearch && matchesType && matchesStage && matchesCountry;
      })
      .sort((a, b) => {
        if (sortBy === 'capacity') return b.capacity - a.capacity;
        if (sortBy === 'epc') return b.epcCost - a.epcCost;
        if (sortBy === 'distance') return a.distanceToSubstation - b.distanceToSubstation;
        if (sortBy === 'stage') return developmentStages.indexOf(b.developmentStage) - developmentStages.indexOf(a.developmentStage);
        return 0;
      });
  }, [searchQuery, selectedType, selectedStage, selectedCountry, sortBy]);

  const totalCapacity = filteredProjects.reduce((sum, p) => sum + p.capacity, 0);
  const totalEPC = filteredProjects.reduce((sum, p) => sum + p.epcCost, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; }
      `}</style>
      
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-800/20 rounded-full blur-3xl" />
      </div>

      {showLandingPage && !showLearnMore ? (
        // Landing Page
        <div className="relative min-h-screen flex flex-col">
          {/* Background */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-slate-900" />
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(135deg, transparent 40%, rgba(6, 182, 212, 0.03) 50%, transparent 60%),
                  linear-gradient(225deg, transparent 40%, rgba(59, 130, 246, 0.03) 50%, transparent 60%),
                  repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,0.01) 100px, rgba(255,255,255,0.01) 101px),
                  repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(255,255,255,0.01) 100px, rgba(255,255,255,0.01) 101px)
                `
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/90" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
          </div>

          {/* Landing Header */}
          <header className="relative z-10 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/30">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold tracking-tight">RENEWEX</h1>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Energy Marketplace</p>
                  </div>
                </div>
                
                <nav className="hidden md:flex items-center gap-8">
                  <a href="#about" className="text-sm text-slate-400 hover:text-white transition-colors">About</a>
                  <a href="#contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</a>
                </nav>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => isLoggedIn ? setShowLandingPage(false) : setShowLoginModal(true)}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-lg text-sm font-medium transition-colors"
                  >
                    Enter Platform
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Landing Hero */}
          <div className="relative flex-1 flex items-center z-10">
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-8">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  Educational Training Platform
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Utility-Scale
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    Renewable Energy
                  </span>
                  <br />
                  Marketplace
                </h2>
                
                <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                  Experience the full lifecycle of renewable energy project investment. 
                  Analyze projects, purchase market intelligence, and submit competitive offers 
                  in this immersive training simulation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <button 
                    onClick={() => isLoggedIn ? setShowLandingPage(false) : setShowLoginModal(true)}
                    className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
                  >
                    Start Simulation
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setShowLearnMore(true)}
                    className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold rounded-xl transition-colors text-lg border border-slate-600"
                  >
                    Learn More
                  </button>
                </div>

                {/* Feature Cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-5 bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
                      <Sun className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">Solar Projects</h3>
                    <p className="text-sm text-slate-400">Ground-mounted PV installations across Europe</p>
                  </div>
                  <div className="p-5 bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center mb-3">
                      <Wind className="w-5 h-5 text-sky-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">Wind Projects</h3>
                    <p className="text-sm text-slate-400">Onshore wind farms in prime locations</p>
                  </div>
                  <div className="p-5 bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">Real Market Data</h3>
                    <p className="text-sm text-slate-400">Purchase intelligence to inform your bids</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Landing Footer */}
          <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/80">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div className="md:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">RENEWEX</h3>
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Energy Marketplace</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm">
                    Educational platform for renewable energy project investment training.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Projects</a></li>
                    <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Resources</a></li>
                    <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">News</a></li>
                    <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Support</a></li>
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#disclaimer" className="text-slate-400 hover:text-white text-sm transition-colors">Disclaimer</a></li>
                    <li><a href="#privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
                    <li><a href="#terms" className="text-slate-400 hover:text-white text-sm transition-colors">Terms and Conditions</a></li>
                  </ul>
                </div>

                {/* Social */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
                  <div className="flex gap-3">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-slate-600 text-sm">
                  © 2025 RENEWEX. All rights reserved. Simulated data for training purposes only.
                </div>
                <div className="flex items-center gap-6">
                  <a href="#disclaimer" className="text-slate-500 hover:text-white text-sm transition-colors">Disclaimer</a>
                  <a href="#privacy" className="text-slate-500 hover:text-white text-sm transition-colors">Privacy</a>
                  <a href="#terms" className="text-slate-500 hover:text-white text-sm transition-colors">Terms</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      ) : showLearnMore ? (
        // Learn More Page
        <div className="relative min-h-screen flex flex-col">
          {/* Background */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-slate-900" />
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(135deg, transparent 40%, rgba(6, 182, 212, 0.05) 50%, transparent 60%),
                  linear-gradient(225deg, transparent 40%, rgba(59, 130, 246, 0.05) 50%, transparent 60%)
                `
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-950/90" />
          </div>

          {/* Header */}
          <header className="relative z-10 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/30">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setShowLearnMore(false)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold tracking-tight">RENEWEX</h1>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Energy Marketplace</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setShowLearnMore(false)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="relative z-10 flex-1 py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How to Play</h1>
              <p className="text-xl text-slate-400 mb-12">
                Master the renewable energy investment process through this immersive simulation.
              </p>

              {/* Game Overview */}
              <div className="bg-slate-900/60 backdrop-blur border border-slate-700 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Game Overview</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  RENEWEX is an educational simulation that puts you in the role of a renewable energy investment analyst. 
                  Your objective is to evaluate utility-scale solar and wind projects across Europe, purchase market intelligence, 
                  and submit competitive Non-Binding Offers (NBOs) for the most promising opportunities.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  You start with a budget of <span className="text-cyan-400 font-semibold">€2,000,000</span> to spend on 
                  analytical resources. Choose wisely—you cannot afford everything, so strategic prioritization is key.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-6 mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Gameplay Steps</h2>
                
                <div className="flex gap-6 bg-slate-900/40 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Browse Projects</h3>
                    <p className="text-slate-400">
                      Explore the marketplace to discover solar and wind projects across Spain, Portugal, France, Germany, and Italy. 
                      Review key metrics like capacity (MW), EPC costs, distance to substation, and development stage.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 bg-slate-900/40 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Purchase Resources</h3>
                    <p className="text-slate-400">
                      Use your budget to buy country-specific market intelligence: Yield Assessment Curves, Curtailment Studies, 
                      Power Market Curves, PPA Originator services, Due Diligence reports, and Financial Advisory. 
                      Prices vary by country—Germany is most expensive, Spain is the baseline.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 bg-slate-900/40 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Analyze & Download Teasers</h3>
                    <p className="text-slate-400">
                      Click on any project to view detailed information. Download project teasers (PDF) to review 
                      technical specifications, land agreements, and development timelines.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 bg-slate-900/40 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-xl">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Monitor Market News</h3>
                    <p className="text-slate-400">
                      Check the News feed regularly for regulatory changes, market developments, and policy updates 
                      that could affect project valuations. News is tagged by country and impact type (positive/negative/neutral).
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 bg-slate-900/40 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-xl">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Submit NBOs</h3>
                    <p className="text-slate-400">
                      When you've identified attractive projects, submit Non-Binding Offers. Select the conditions precedent 
                      (due diligence, permits, financing, legal) that will protect your investment. Submitted NBOs are 
                      tracked and displayed on project cards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Pro Tips</h2>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Focus your budget on 2-3 countries rather than spreading thin across all five.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Projects closer to "Under Construction" stage carry less development risk but may be more competitive.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Distance to substation significantly impacts project economics—shorter is better.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Read the news—regulatory changes can make or break a project's viability.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Don't forget to include appropriate conditions precedent in your NBOs to manage risk.</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center">
                <button 
                  onClick={() => {
                    setShowLearnMore(false);
                    if (isLoggedIn) {
                      setShowLandingPage(false);
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors text-lg inline-flex items-center gap-2"
                >
                  Start Playing
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/50 py-6 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-slate-500 text-sm">
                © 2025 RENEWEX. Educational Platform.
              </div>
              <button 
                onClick={() => setShowLearnMore(false)}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Back to Home
              </button>
            </div>
          </footer>
        </div>
      ) : (
        // Main Marketplace
        <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        {/* Header */}
        <header className="border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/80 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => {
                  setShowLandingPage(true);
                  setShowLoginModal(false);
                  setShowRegisterModal(false);
                  setShowPrivacyModal(false);
                  setShowTermsModal(false);
                  setShowDisclaimerModal(false);
                }}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">RENEWEX</h1>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Energy Marketplace</p>
                </div>
              </button>
              <nav className="hidden md:flex items-center gap-8">
                <button 
                  onClick={() => isLoggedIn ? setActiveTab('projects') : setShowLoginModal(true)}
                  className={`text-sm transition-colors ${activeTab === 'projects' ? 'text-cyan-400 font-medium' : 'text-slate-400 hover:text-white'}`}
                >
                  Projects
                </button>
                <button 
                  onClick={() => isLoggedIn ? setActiveTab('bids') : setShowLoginModal(true)}
                  className={`text-sm transition-colors flex items-center gap-1 ${activeTab === 'bids' ? 'text-cyan-400 font-medium' : 'text-slate-400 hover:text-white'}`}
                >
                  Bids
                  {isLoggedIn && submittedNBOs.length > 0 && (
                    <span className="px-1.5 py-0.5 bg-green-500 text-white text-xs rounded-full">
                      {submittedNBOs.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => isLoggedIn ? setActiveTab('news') : setShowLoginModal(true)}
                  className={`text-sm transition-colors flex items-center gap-1 ${activeTab === 'news' ? 'text-cyan-400 font-medium' : 'text-slate-400 hover:text-white'}`}
                >
                  News
                  {isLoggedIn && newsItems.length - readNews.length > 0 && (
                    <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {newsItems.length - readNews.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => isLoggedIn ? setActiveTab('resources') : setShowLoginModal(true)}
                  className={`text-sm transition-colors ${activeTab === 'resources' ? 'text-cyan-400 font-medium' : 'text-slate-400 hover:text-white'}`}
                >
                  Resources
                </button>
              </nav>
              <div className="flex items-center gap-4">
                {isLoggedIn && (
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <span className="text-slate-500 text-sm">Budget:</span>
                    <span className="text-cyan-400 font-bold">€{budget.toLocaleString()}</span>
                  </div>
                )}
                
                {isLoggedIn ? (
                  /* User Menu */
                  <div className="relative">
                    <button 
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-3 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="hidden md:block text-left">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                    
                    {showUserMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                        <div className="absolute top-full right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50">
                          <div className="p-4 border-b border-slate-800">
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                          </div>
                          <div className="py-2">
                            <button 
                              onClick={() => { setActiveTab('profile'); setShowUserMenu(false); }}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors w-full text-left"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                              My Profile
                            </button>
                            <button 
                              onClick={() => { setActiveTab('profile'); setShowUserMenu(false); }}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors w-full text-left"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                              My NBOs
                            </button>
                            <button 
                              onClick={() => { setActiveTab('profile'); setShowUserMenu(false); }}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors w-full text-left"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                              </svg>
                              My Documents
                            </button>
                          </div>
                          <div className="py-2 border-t border-slate-800">
                            <button 
                              onClick={handleLogout}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-800 transition-colors w-full"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                              </svg>
                              Log Out
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  /* Login Button */
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    Log In
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <>
            {/* Hero Section */}
            <section className="py-16 px-6">
              <div className="max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-6">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  Live Marketplace
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  Utility-Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Renewable Energy</span>
                  <br />Project Marketplace
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Connect with premium renewable energy investment opportunities. 
              Browse solar, wind, hydro, and storage projects from vetted developers worldwide.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="px-6 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
                <div className="text-slate-500 text-sm mb-1">Active Projects</div>
                <div className="text-3xl font-bold mono">{filteredProjects.length}</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
                <div className="text-slate-500 text-sm mb-1">Total Capacity</div>
                <div className="text-3xl font-bold mono">{(totalCapacity / 1000).toFixed(1)} <span className="text-lg text-slate-500">GW</span></div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
                <div className="text-slate-500 text-sm mb-1">Total EPC Cost</div>
                <div className="text-3xl font-bold mono text-cyan-300">{formatCurrency(totalEPC)}</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
                <div className="text-slate-500 text-sm mb-1">NBOs Submitted</div>
                <div className="text-3xl font-bold mono text-green-400">
                  {submittedNBOs.length}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-6 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search projects, locations, developers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
              
              <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4`}>
                <div className="relative">
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none px-4 py-3 pr-10 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="All">All Types</option>
                    <option value="Solar">Solar</option>
                    <option value="Wind">Wind</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                </div>

                <div className="relative">
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="appearance-none px-4 py-3 pr-10 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="All">All Countries</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{countryFlags[country]} {country}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select 
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="appearance-none px-4 py-3 pr-10 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="All">All Stages</option>
                    {developmentStages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-3 pr-10 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="capacity">Sort: Capacity</option>
                    <option value="epc">Sort: EPC Cost</option>
                    <option value="distance">Sort: Distance to Grid</option>
                    <option value="stage">Sort: Dev. Stage</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Grid */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={() => handleProjectClick(project)}
                  hasNBO={submittedNBOs.some(nbo => nbo.projectId === project.id)}
                  isLoggedIn={isLoggedIn}
                />
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <div className="text-slate-500 text-lg">No projects match your criteria</div>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedType('All'); setSelectedStage('All'); setSelectedCountry('All'); }}
                  className="mt-4 text-cyan-400 hover:text-cyan-300"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
          </>
        )}

        {/* Bids Tab */}
        {activeTab === 'bids' && (
          <section className="py-12 px-6 min-h-[60vh]">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Bids Leaderboard</h2>
                <p className="text-slate-400">Top 12 projects ranked by number of bids submitted</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
                  <div className="text-slate-500 text-sm mb-1">Total Bids</div>
                  <div className="text-3xl font-bold text-cyan-400">{submittedNBOs.length}</div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
                  <div className="text-slate-500 text-sm mb-1">Projects with Bids</div>
                  <div className="text-3xl font-bold text-green-400">{new Set(submittedNBOs.map(nbo => nbo.projectId)).size}</div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
                  <div className="text-slate-500 text-sm mb-1">Your Bids</div>
                  <div className="text-3xl font-bold text-amber-400">{submittedNBOs.length}</div>
                </div>
              </div>
              <div className="space-y-3">
                {(() => {
                  const projectBidData = projects.map(project => {
                    const projectBids = submittedNBOs.filter(nbo => nbo.projectId === project.id);
                    return { ...project, bidCount: projectBids.length, mostRecentBid: projectBids.length > 0 ? Math.max(...projectBids.map(b => new Date(b.submittedAt).getTime())) : 0 };
                  });
                  const sortedProjects = projectBidData.sort((a, b) => {
                    if (b.bidCount !== a.bidCount) return b.bidCount - a.bidCount;
                    if (b.mostRecentBid !== a.mostRecentBid) return b.mostRecentBid - a.mostRecentBid;
                    return a.name.localeCompare(b.name);
                  }).slice(0, 12);
                  if (submittedNBOs.length === 0) {
                    return (
                      <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-slate-500" /></div>
                        <h3 className="text-lg font-semibold text-white mb-2">No bids submitted yet</h3>
                        <p className="text-slate-400 mb-4">Browse projects and submit your first Non-Binding Offer.</p>
                        <button onClick={() => setActiveTab('projects')} className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium rounded-lg transition-colors">Browse Projects</button>
                      </div>
                    );
                  }
                  return sortedProjects.map((project, index) => {
                    const Icon = typeIcons[project.type];
                    const colors = typeColors[project.type];
                    const hasUserBid = submittedNBOs.some(nbo => nbo.projectId === project.id);
                    return (
                      <div key={project.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${hasUserBid ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800/50 border-slate-700/50'}`}>
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${index === 0 ? 'bg-amber-500/20 text-amber-400' : index === 1 ? 'bg-slate-400/20 text-slate-300' : index === 2 ? 'bg-orange-600/20 text-orange-400' : 'bg-slate-700/50 text-slate-400'}`}>{index + 1}</div>
                        <div className={`flex-shrink-0 p-2 rounded-lg ${colors.bg} ${colors.border} border`}><Icon className={`w-5 h-5 ${colors.text}`} /></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{countryFlags[project.country]}</span>
                            <h4 className="font-semibold text-white truncate">{project.name}</h4>
                            {hasUserBid && <span className="flex-shrink-0 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Your bid</span>}
                          </div>
                          <p className="text-sm text-slate-400">{project.location} • {project.capacity} MW</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className={`text-2xl font-bold ${project.bidCount > 0 ? 'text-cyan-400' : 'text-slate-500'}`}>{project.bidCount}</div>
                          <div className="text-xs text-slate-500">{project.bidCount === 1 ? 'bid' : 'bids'}</div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </section>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <section className="py-12 px-6 min-h-[60vh]">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Market News & Updates</h2>
                  <p className="text-slate-400">Stay informed about market developments</p>
                </div>
                <div className="text-right">
                  <div className="text-slate-500 text-xs uppercase tracking-wide">Read</div>
                  <div className="text-lg font-bold text-cyan-400">{readNews.length} / {newsItems.length}</div>
                </div>
              </div>
              {selectedNews ? (
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                  <button onClick={() => setSelectedNews(null)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    Back to all news
                  </button>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300">{selectedNews.category}</span>
                    <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300">{selectedNews.country}</span>
                    <span className="text-slate-500 text-sm">{selectedNews.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{selectedNews.title}</h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">{selectedNews.content}</p>
                  <div className={`p-4 rounded-xl border ${selectedNews.impactType === 'positive' ? 'bg-green-500/10 border-green-500/30' : selectedNews.impactType === 'negative' ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-700/30 border-slate-600/30'}`}>
                    <div className="text-sm font-medium text-slate-300 mb-1">Market Impact</div>
                    <div className={`font-semibold ${selectedNews.impactType === 'positive' ? 'text-green-400' : selectedNews.impactType === 'negative' ? 'text-red-400' : 'text-slate-400'}`}>{selectedNews.impact}</div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {newsItems.map(news => {
                    const isRead = readNews.includes(news.id);
                    return (
                      <div key={news.id} onClick={() => { setSelectedNews(news); handleReadNews(news.id); }} className={`p-6 rounded-2xl border cursor-pointer transition-all hover:border-slate-600 ${isRead ? 'bg-slate-800/30 border-slate-700/30' : 'bg-slate-800/50 border-slate-700/50'}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {!isRead && <span className="w-2 h-2 bg-cyan-400 rounded-full" />}
                              <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">{news.category}</span>
                              <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">{news.country}</span>
                              <span className="text-slate-500 text-xs">{news.date}</span>
                            </div>
                            <h4 className={`text-lg font-semibold mb-2 ${isRead ? 'text-slate-400' : 'text-white'}`}>{news.title}</h4>
                            <p className="text-slate-400 text-sm">{news.summary}</p>
                          </div>
                          <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${news.impactType === 'positive' ? 'bg-green-500/20 text-green-400' : news.impactType === 'negative' ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400'}`}>
                            {news.impactType === 'positive' ? '↑ Positive' : news.impactType === 'negative' ? '↓ Negative' : '→ Neutral'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <section className="py-12 px-6 min-h-[60vh]">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Resource Services</h2>
                  <p className="text-slate-400">Purchase country-specific services to complete your financial model</p>
                </div>
                <div className="text-right">
                  <div className="text-slate-500 text-xs uppercase tracking-wide">Available Budget</div>
                  <div className="text-2xl font-bold text-cyan-400">€{budget.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {countries.map(country => {
                  const purchasedInCountry = baseServices.filter(s => isServicePurchased(s.id, country)).length;
                  return (
                    <button key={country} onClick={() => setSelectedResourceCountry(country)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${selectedResourceCountry === country ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                      <span>{countryFlags[country]}</span><span>{country}</span>
                      {purchasedInCountry > 0 && <span className={`px-1.5 py-0.5 rounded text-xs ${selectedResourceCountry === country ? 'bg-slate-900/30 text-slate-900' : 'bg-cyan-500/20 text-cyan-400'}`}>{purchasedInCountry}/6</span>}
                    </button>
                  );
                })}
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {baseServices.map(service => {
                  const price = Math.round(service.basePrice * countryMultipliers[selectedResourceCountry]);
                  const isPurchased = isServicePurchased(service.id, selectedResourceCountry);
                  const canAfford = budget >= price;
                  const ServiceIcon = service.icon;
                  return (
                    <div key={service.id} className={`p-6 rounded-2xl border transition-all ${isPurchased ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isPurchased ? 'bg-green-500/20' : 'bg-slate-700'}`}><ServiceIcon className={`w-5 h-5 ${isPurchased ? 'text-green-400' : 'text-slate-400'}`} /></div>
                          <div><h4 className="font-semibold text-white">{service.name}</h4><p className="text-sm text-slate-400">{service.description}</p></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className={`text-xl font-bold ${isPurchased ? 'text-green-400' : 'text-cyan-400'}`}>€{price.toLocaleString()}</div>
                        {isPurchased ? (
                          <button className="px-4 py-2 bg-green-500 hover:bg-green-400 text-slate-900 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Download Document
                          </button>
                        ) : (
                          <button onClick={() => handlePurchaseService(service.id, selectedResourceCountry, price, service.name)} disabled={!canAfford} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${canAfford ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-900' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>{canAfford ? 'Purchase' : 'Insufficient Budget'}</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Purchased Services</h3>
                {purchasedServices.length === 0 ? (
                  <p className="text-slate-400">No services purchased yet.</p>
                ) : (
                  <div className="space-y-3">
                    {countries.map(country => {
                      const countryServices = purchasedServices.filter(p => p.country === country).map(p => baseServices.find(s => s.id === p.serviceId)).filter(Boolean);
                      if (countryServices.length === 0) return null;
                      return (
                        <div key={country} className="flex items-start gap-3">
                          <span className="text-xl">{countryFlags[country]}</span>
                          <div className="flex flex-wrap gap-2">{countryServices.map(service => (<span key={service.id} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">{service.name}</span>))}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <section className="py-12 px-6 min-h-[60vh]">
            <div className="max-w-4xl mx-auto">
              {/* Profile Header */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-8">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                    <p className="text-slate-400 mb-4">{user.email}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="bg-slate-800/50 rounded-lg px-4 py-2">
                        <div className="text-xs text-slate-500 uppercase tracking-wide">Available Budget</div>
                        <div className="text-lg font-bold text-cyan-400">€{budget.toLocaleString()}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg px-4 py-2">
                        <div className="text-xs text-slate-500 uppercase tracking-wide">NBOs Submitted</div>
                        <div className="text-lg font-bold text-green-400">{submittedNBOs.length}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg px-4 py-2">
                        <div className="text-xs text-slate-500 uppercase tracking-wide">Documents Purchased</div>
                        <div className="text-lg font-bold text-amber-400">{purchasedServices.length}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">My Documents</h3>
                  <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">{purchasedServices.length} documents</span>
                </div>
                {purchasedServices.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-slate-500" />
                    </div>
                    <p className="text-slate-400">No documents purchased yet.</p>
                    <button onClick={() => setActiveTab('resources')} className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm">Browse Resources →</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {purchasedServices.map((purchase, index) => {
                      const service = baseServices.find(s => s.id === purchase.serviceId);
                      if (!service) return null;
                      const ServiceIcon = service.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-green-500/20">
                              <ServiceIcon className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{service.name}</h4>
                              <p className="text-sm text-slate-400">{countryFlags[purchase.country]} {purchase.country}</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-green-500 hover:bg-green-400 text-slate-900 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Download
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* NBOs Section */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">My Non-Binding Offers</h3>
                  <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">{submittedNBOs.length} NBOs</span>
                </div>
                {submittedNBOs.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
                      <Send className="w-6 h-6 text-slate-500" />
                    </div>
                    <p className="text-slate-400">No NBOs submitted yet.</p>
                    <button onClick={() => setActiveTab('projects')} className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm">Browse Projects →</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {submittedNBOs.map((nbo, index) => {
                      const project = projects.find(p => p.id === nbo.projectId);
                      if (!project) return null;
                      const Icon = typeIcons[project.type];
                      const colors = typeColors[project.type];
                      return (
                        <div key={index} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${colors.bg} ${colors.border} border`}>
                                <Icon className={`w-5 h-5 ${colors.text}`} />
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{project.name}</h4>
                                <p className="text-sm text-slate-400">{countryFlags[project.country]} {project.location} • {project.capacity} MW</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Submitted</span>
                              <p className="text-xs text-slate-500 mt-1">{new Date(nbo.submittedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-slate-700/50 bg-slate-900/80">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Brand and Copyright */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="text-slate-500 text-sm">
                  © 2025 RENEWEX — Educational Platform. Simulated data for training purposes only.
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-6">
                <a href="#disclaimer" className="text-slate-500 hover:text-white text-sm transition-colors">Disclaimer</a>
                <a href="#privacy" className="text-slate-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#terms" className="text-slate-500 hover:text-white text-sm transition-colors">Terms and Conditions</a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          onSubmitNBO={handleOpenNBO}
          hasNBO={submittedNBOs.some(nbo => nbo.projectId === selectedProject.id)}
        />
      )}

      {/* Purchase Confirmation Modal */}
      {showPurchaseConfirm && pendingPurchase && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={cancelPurchase} />
          <div className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Confirm Purchase</h3>
              <p className="text-slate-400 mb-2">
                Are you sure you want to purchase this resource?
              </p>
              <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                <p className="text-white font-semibold">{pendingPurchase.serviceName}</p>
                <p className="text-slate-400 text-sm">{countryFlags[pendingPurchase.country]} {pendingPurchase.country}</p>
                <p className="text-cyan-400 font-bold text-lg mt-2">€{pendingPurchase.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={cancelPurchase}
                  className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
                >
                  No
                </button>
                <button
                  onClick={confirmPurchase}
                  className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium rounded-xl transition-colors"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NBO Modal */}
      {showNBOModal && nboProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setShowNBOModal(false)} />
          <div className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Submit Non-Binding Offer</h2>
                <button 
                  onClick={() => setShowNBOModal(false)}
                  className="p-2 rounded-full hover:bg-slate-800 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-400 text-sm mt-1 mb-2">
                  Project: <span className="text-cyan-400 font-medium">{nboProject.name}</span>
                </p>
                <h3 className="text-lg font-semibold text-white mb-2">Coming Soon</h3>
                <p className="text-slate-400">
                  The NBO submission form will be available shortly.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowNBOModal(false)}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowLoginModal(false)} />
          <div className="relative z-10 bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to RENEWEX</h2>
                <p className="text-slate-400">Log in to access project details and documentation</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="user@training.com"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-sm text-slate-400">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300">Forgot password?</a>
                </div>

                <button 
                  onClick={handleLogin}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors"
                >
                  Log In
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                <p className="text-slate-500 text-sm">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    Create account
                  </button>
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => {
            setShowRegisterModal(false);
            setShowPrivacyModal(false);
            setShowTermsModal(false);
            setShowDisclaimerModal(false);
          }} />
          <div className="relative z-10 bg-white border border-slate-200 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Create Account</h2>
                  <p className="text-sm text-slate-500">RENEWEX Training Platform</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowRegisterModal(false);
                  setShowPrivacyModal(false);
                  setShowTermsModal(false);
                  setShowDisclaimerModal(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleRegisterSubmit} className="p-8">
              <div className="space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1.5">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={registerForm.firstName}
                      onChange={(e) => handleRegisterChange('firstName', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-white border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all ${
                        registerErrors.firstName ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="John"
                    />
                    {registerErrors.firstName && (
                      <p className="mt-1.5 text-sm text-red-500">{registerErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={registerForm.lastName}
                      onChange={(e) => handleRegisterChange('lastName', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-white border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all ${
                        registerErrors.lastName ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="Smith"
                    />
                    {registerErrors.lastName && (
                      <p className="mt-1.5 text-sm text-red-500">{registerErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => handleRegisterChange('email', e.target.value)}
                    className={`w-full px-4 py-2.5 bg-white border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all ${
                      registerErrors.email ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="john.smith@university.edu"
                  />
                  {registerErrors.email && (
                    <p className="mt-1.5 text-sm text-red-500">{registerErrors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={registerForm.password}
                      onChange={(e) => handleRegisterChange('password', e.target.value)}
                      className={`w-full px-4 py-2.5 pr-12 bg-white border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all ${
                        registerErrors.password ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="Minimum 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {registerErrors.password && (
                    <p className="mt-1.5 text-sm text-red-500">{registerErrors.password}</p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    value={registerForm.role}
                    onChange={(e) => handleRegisterChange('role', e.target.value)}
                    className={`w-full px-4 py-2.5 bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all appearance-none cursor-pointer ${
                      registerErrors.role ? 'border-red-500' : 'border-slate-300'
                    } ${!registerForm.role ? 'text-slate-400' : ''}`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="observer">Observer</option>
                  </select>
                  {registerErrors.role && (
                    <p className="mt-1.5 text-sm text-red-500">{registerErrors.role}</p>
                  )}
                </div>

                {/* Institution */}
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Institution <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="institution"
                    type="text"
                    value={registerForm.institution}
                    onChange={(e) => handleRegisterChange('institution', e.target.value)}
                    className={`w-full px-4 py-2.5 bg-white border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all ${
                      registerErrors.institution ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="University of Example"
                  />
                  {registerErrors.institution && (
                    <p className="mt-1.5 text-sm text-red-500">{registerErrors.institution}</p>
                  )}
                </div>

                {/* Course (Optional) */}
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Course <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <select
                    id="course"
                    value={registerForm.courseCode}
                    onChange={(e) => handleRegisterChange('courseCode', e.target.value)}
                    className={`w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all appearance-none cursor-pointer ${!registerForm.courseCode ? 'text-slate-400' : ''}`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                  >
                    <option value="">Select your course</option>
                    <option value="ieb_miaf">IEB - MIAF</option>
                    <option value="exus">Exus In-Company Course</option>
                    <option value="exolum">Exolum In-Company Course</option>
                    <option value="repsol">Repsol In-Company Course</option>
                  </select>
                </div>

                {/* Team Name (Optional) */}
                <div>
                  <label htmlFor="teamName" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Team name <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    value={registerForm.teamName}
                    onChange={(e) => handleRegisterChange('teamName', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    placeholder="Team Alpha"
                  />
                </div>

                {/* Consent Checkboxes */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm font-medium text-slate-700 mb-4">Legal agreements</p>
                  
                  <div className="space-y-3">
                    <label className={`flex items-start gap-3 cursor-pointer group ${registerErrors.acceptPrivacy ? 'text-red-500' : ''}`}>
                      <input
                        type="checkbox"
                        checked={registerForm.acceptPrivacy}
                        onChange={(e) => handleRegisterChange('acceptPrivacy', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                        I accept the{' '}
                        <button 
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowPrivacyModal(true); }}
                          className="text-slate-900 underline hover:no-underline"
                        >
                          Privacy Policy
                        </button>
                        <span className="text-red-500"> *</span>
                      </span>
                    </label>
                    {registerErrors.acceptPrivacy && (
                      <p className="ml-7 text-sm text-red-500">{registerErrors.acceptPrivacy}</p>
                    )}

                    <label className={`flex items-start gap-3 cursor-pointer group ${registerErrors.acceptDisclaimer ? 'text-red-500' : ''}`}>
                      <input
                        type="checkbox"
                        checked={registerForm.acceptDisclaimer}
                        onChange={(e) => handleRegisterChange('acceptDisclaimer', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                        I accept the{' '}
                        <button 
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowDisclaimerModal(true); }}
                          className="text-slate-900 underline hover:no-underline"
                        >
                          Disclaimer
                        </button>
                        <span className="text-red-500"> *</span>
                      </span>
                    </label>
                    {registerErrors.acceptDisclaimer && (
                      <p className="ml-7 text-sm text-red-500">{registerErrors.acceptDisclaimer}</p>
                    )}

                    <label className={`flex items-start gap-3 cursor-pointer group ${registerErrors.acceptTerms ? 'text-red-500' : ''}`}>
                      <input
                        type="checkbox"
                        checked={registerForm.acceptTerms}
                        onChange={(e) => handleRegisterChange('acceptTerms', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                        I accept the{' '}
                        <button 
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTermsModal(true); }}
                          className="text-slate-900 underline hover:no-underline"
                        >
                          Terms & Conditions
                        </button>
                        <span className="text-red-500"> *</span>
                      </span>
                    </label>
                    {registerErrors.acceptTerms && (
                      <p className="ml-7 text-sm text-red-500">{registerErrors.acceptTerms}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                  >
                    Create account
                  </button>
                </div>

                {/* Microcopy */}
                <p className="text-xs text-slate-500 text-center leading-relaxed">
                  This platform is for educational use only. All projects, data, and offers are simulated and non-binding. No investment advice is provided.
                </p>
              </div>
            </form>

            {/* Footer */}
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{' '}
                <button 
                  onClick={() => { 
                    setShowRegisterModal(false); 
                    setShowPrivacyModal(false);
                    setShowTermsModal(false);
                    setShowDisclaimerModal(false);
                    setShowLoginModal(true); 
                  }}
                  className="text-slate-900 font-medium hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-policy-title"
          onKeyDown={(e) => { if (e.key === 'Escape') setShowPrivacyModal(false); }}
        >
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md" 
            onClick={() => setShowPrivacyModal(false)} 
          />
          
          {/* Modal Container */}
          <div 
            ref={privacyModalRef}
            className="relative z-10 bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col"
            style={{ 
              width: 'min(720px, 92vw)', 
              height: 'min(70vh, 640px)',
              maxWidth: '720px',
              maxHeight: '640px'
            }}
          >
            {/* Fixed Header */}
            <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 id="privacy-policy-title" className="text-lg font-bold text-slate-900">Privacy Policy</h2>
                <button 
                  onClick={() => setShowPrivacyModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  <strong>VAS CONSULTORIA</strong>, hereinafter the CONTROLLER, is the controller of the User's personal data and informs the User that such data will be processed in accordance with the provisions of Regulation (EU) 2016/679 of 27 April 2016 (GDPR) on the protection of natural persons with regard to the processing of personal data and on the free movement of such data. Accordingly, the following information regarding the processing is provided:
                </p>

                <p>
                  <strong>Purpose of the processing:</strong> to maintain a commercial relationship with the User. The processing operations envisaged include:
                </p>

                <ul className="list-disc pl-5 space-y-2">
                  <li>Sending commercial advertising communications by email, fax, SMS, MMS, social networks, or any other electronic or physical means, present or future, that enables commercial communications. Such communications will be carried out by the CONTROLLER and will relate to its products and services, or to those of its collaborators or suppliers with whom it has entered into a promotional agreement. In such cases, third parties will never have access to personal data.</li>
                  <li>Carrying out statistical studies.</li>
                  <li>Processing orders, requests, or any type of inquiry made by the User through any of the contact methods made available.</li>
                  <li>Sending the website's newsletter.</li>
                </ul>

                <p>
                  <strong>Data retention criteria:</strong> data will be retained as long as there is a mutual interest in maintaining the purpose of the processing. When the data are no longer necessary for that purpose, they will be deleted using appropriate security measures to ensure data pseudonymization or total destruction.
                </p>

                <p>
                  <strong>Data disclosure:</strong> data will not be disclosed to third parties, except where legally required.
                </p>

                <p>
                  <strong>User rights:</strong>
                </p>

                <ul className="list-disc pl-5 space-y-2">
                  <li>The right to withdraw consent at any time.</li>
                  <li>The right to access, rectify, port, and erase their data, and to restrict or object to their processing.</li>
                  <li>The right to lodge a complaint with the supervisory authority (agpd.es) if they consider that the processing does not comply with current regulations.</li>
                </ul>

                <p>
                  <strong>Contact details for exercising rights:</strong><br />
                  Postal address: VAS CONSULTORIA, Javier González Fornos, Calle Antonio Casero 24, Esc 1, 1ª, 28007 Madrid (Madrid).<br />
                  Email: <a href="mailto:javier.gonzalez@vas-consultoria.com" className="text-slate-900 underline hover:no-underline">javier.gonzalez@vas-consultoria.com</a>
                </p>

                <p className="font-semibold text-slate-900 pt-2">
                  MANDATORY OR OPTIONAL NATURE OF THE INFORMATION PROVIDED BY THE USER
                </p>

                <p>
                  By ticking the corresponding boxes and entering data in the fields marked with an asterisk (*) in the contact form or presented in download forms, Users expressly, freely, and unequivocally agree that their data are necessary to process their request by the service provider, while the inclusion of data in the remaining fields is voluntary. The User guarantees that the personal data provided to the CONTROLLER are accurate and undertakes to notify any changes thereto. The CONTROLLER expressly informs and guarantees Users that their personal data will not be transferred to third parties under any circumstances, and that should any transfer of personal data be contemplated, the prior, express, informed, and unequivocal consent of the Users will be requested. All data requested through the website are mandatory, as they are necessary to provide an optimal service to the User. If all required data are not provided, it cannot be guaranteed that the information and services offered will fully meet the User's needs.
                </p>

                <p className="font-semibold text-slate-900 pt-2">
                  SECURITY MEASURES
                </p>

                <p>
                  In accordance with the provisions of current personal data protection regulations, the CONTROLLER complies with all GDPR requirements for the processing of personal data under its responsibility, and expressly with the principles set out in Article 5 of the GDPR, whereby data are processed lawfully, fairly, and transparently in relation to the data subject, and are adequate, relevant, and limited to what is necessary in relation to the purposes for which they are processed. The CONTROLLER guarantees that it has implemented appropriate technical and organizational policies to apply the security measures established by the GDPR in order to protect the rights and freedoms of Users, and that it has provided them with the appropriate information so that they may exercise those rights.
                </p>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex-shrink-0 bg-slate-50 border-t border-slate-200 px-6 py-4 rounded-b-xl">
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-conditions-title"
          onKeyDown={(e) => { if (e.key === 'Escape') setShowTermsModal(false); }}
        >
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md" 
            onClick={() => setShowTermsModal(false)} 
          />
          
          {/* Modal Container */}
          <div 
            ref={termsModalRef}
            className="relative z-10 bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col"
            style={{ 
              width: 'min(720px, 92vw)', 
              height: 'min(70vh, 640px)',
              maxWidth: '720px',
              maxHeight: '640px'
            }}
          >
            {/* Fixed Header */}
            <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 id="terms-conditions-title" className="text-lg font-bold text-slate-900">Terms and Conditions</h2>
                <button 
                  onClick={() => setShowTermsModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  The owner of this website is <strong>Javier González Fornos</strong>, holder of Tax ID (NIF) 53540925-F, with registered address at C/ Antonio Casero 24, Esc. 1, 1A, 28007 Madrid (Spain).
                </p>

                <p>
                  Access to the VAS-CONSULTORIA website is free of charge. All content is the intellectual property of Javier González Fornos, holder of Tax ID (NIF) 53540925-F. Any use of such content that is contrary to intellectual property regulations will be prosecuted in accordance with applicable law.
                </p>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex-shrink-0 bg-slate-50 border-t border-slate-200 px-6 py-4 rounded-b-xl">
              <button 
                onClick={() => setShowTermsModal(false)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer Modal */}
      {showDisclaimerModal && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-title"
          onKeyDown={(e) => { if (e.key === 'Escape') setShowDisclaimerModal(false); }}
        >
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md" 
            onClick={() => setShowDisclaimerModal(false)} 
          />
          
          {/* Modal Container */}
          <div 
            ref={disclaimerModalRef}
            className="relative z-10 bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col"
            style={{ 
              width: 'min(720px, 92vw)', 
              height: 'min(70vh, 640px)',
              maxWidth: '720px',
              maxHeight: '640px'
            }}
          >
            {/* Fixed Header */}
            <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 id="disclaimer-title" className="text-lg font-bold text-slate-900">Disclaimer</h2>
                <button 
                  onClick={() => setShowDisclaimerModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p className="font-semibold text-slate-900">
                  INFORMATION SOCIETY SERVICES LAW (LSSI)
                </p>

                <p>
                  <strong>VAS CONSULTORIA</strong>, the owner of the website, hereinafter the CONTROLLER, makes this document available to users in order to comply with the obligations established in Law 34/2002 of 11 July, on Information Society Services and Electronic Commerce (LSSICE), Official State Gazette (BOE) No. 166, and to inform all website users of the terms and conditions of use.
                </p>

                <p>
                  Any person accessing this website assumes the role of user and undertakes to observe and strictly comply with the provisions set forth herein, as well as with any other applicable legal provisions.
                </p>

                <p>
                  VAS CONSULTORIA reserves the right to modify any type of information that may appear on the website, without any obligation to give prior notice or inform users of such changes, with publication on the VAS CONSULTORIA website being deemed sufficient.
                </p>

                <p className="font-semibold text-slate-900 pt-2">
                  IDENTIFICATION DETAILS
                </p>

                <ul className="list-none space-y-1">
                  <li><strong>Domain name:</strong> www.vas-consultoria.com</li>
                  <li><strong>Trade name:</strong> VAS CONSULTORIA</li>
                  <li><strong>Legal name:</strong> Javier González Fornos</li>
                  <li><strong>Tax ID (NIF):</strong> 53540925-F</li>
                  <li><strong>Registered office:</strong> Calle Antonio Casero 24, Esc 1, 1A, 28007 Madrid (Madrid)</li>
                  <li><strong>Telephone:</strong> +34 649 239 040</li>
                  <li><strong>Email:</strong> <a href="mailto:info@vas-consultoria.com" className="text-slate-900 underline hover:no-underline">info@vas-consultoria.com</a></li>
                </ul>

                <p className="font-semibold text-slate-900 pt-2">
                  INTELLECTUAL AND INDUSTRIAL PROPERTY RIGHTS
                </p>

                <p>
                  The website, including but not limited to its programming, editing, compilation, and other elements necessary for its operation, as well as the designs, logos, text, and/or graphics, are the property of the CONTROLLER or, where applicable, are used under license or with the express authorization of their respective authors. All website content is duly protected by intellectual and industrial property regulations and registered in the corresponding public registers.
                </p>

                <p>
                  Regardless of the purpose for which they are intended, total or partial reproduction, use, exploitation, distribution, or commercialization of such content requires, in all cases, prior written authorization from the CONTROLLER. Any unauthorized use shall be considered a serious infringement of the author's intellectual or industrial property rights.
                </p>

                <p>
                  Designs, logos, text, and/or graphics not owned by the CONTROLLER that may appear on the website belong to their respective owners, who are themselves responsible for any potential disputes that may arise in connection with them. The CONTROLLER expressly authorizes third parties to link directly to specific content on the website and, in any case, to link to the main website at www.vas-consultoria.com.
                </p>

                <p>
                  The CONTROLLER acknowledges the corresponding intellectual and industrial property rights in favor of their rightful owners. The mere mention or appearance of such content on the website does not imply the existence of any rights or responsibility on the part of the CONTROLLER, nor any endorsement, sponsorship, or recommendation.
                </p>

                <p>
                  Any observations regarding possible infringements of intellectual or industrial property rights, or regarding any content on the website, may be submitted via email to <a href="mailto:info@vas-consultoria.com" className="text-slate-900 underline hover:no-underline">info@vas-consultoria.com</a>.
                </p>

                <p className="font-semibold text-slate-900 pt-2">
                  DISCLAIMER OF LIABILITY
                </p>

                <p>
                  The CONTROLLER disclaims any liability arising from information published on the website when such information has been manipulated or introduced by a third party unrelated to the CONTROLLER.
                </p>

                <p className="font-semibold text-slate-900 pt-2">
                  Use of Cookies
                </p>

                <p>
                  This website may use technical cookies (small information files sent by the server to the user's computer) to perform certain functions that are considered essential for the proper functioning and display of the website. The cookies used are, in all cases, temporary in nature and intended solely to improve browsing efficiency; they disappear once the user session ends. Under no circumstances do these cookies themselves provide personal data, nor are they used to collect such data.
                </p>

                <p>
                  Through the use of cookies, the server hosting the website may also recognize the browser used by the user in order to facilitate navigation, allowing, for example, users who have previously registered to access areas, services, promotions, or contests reserved exclusively for them without having to register on each visit. Cookies may also be used to measure audience metrics, traffic parameters, track progress, and count visits, among other purposes. In such cases, these cookies are technically optional but beneficial for the user. This website will not install non-essential cookies without the user's prior consent.
                </p>

                <p>
                  Users may configure their browser to be notified of the receipt of cookies and to prevent their installation on their device. Please consult your browser's instructions for further information.
                </p>

                <p className="font-semibold text-slate-900 pt-2">
                  Links Policy
                </p>

                <p>
                  The website may contain links redirecting users to content on third-party websites. As the CONTROLLER cannot always control the content introduced by third parties on their respective websites, it assumes no responsibility for such content. In any case, the CONTROLLER will proceed with the immediate removal of any content that may contravene national or international legislation, morality, or public order, and will immediately remove the corresponding link, informing the competent authorities of the content in question.
                </p>

                <p>
                  The CONTROLLER is not responsible for information and content stored, including but not limited to, forums, chats, blog generators, comments, social networks, or any other means that allow third parties to independently publish content on the CONTROLLER's website. However, in compliance with Articles 11 and 16 of the LSSICE, the CONTROLLER makes itself available to users, authorities, and law enforcement agencies, actively collaborating in the removal or blocking of any content that may affect or contravene national or international legislation, third-party rights, or morality and public order. If a user considers that there is content on the website that may fall under this classification, they are requested to notify the website administrator immediately.
                </p>

                <p>
                  This website has been reviewed and tested to ensure proper functioning. In principle, correct operation can be guaranteed 365 days a year, 24 hours a day. However, the CONTROLLER does not rule out the possibility of programming errors or the occurrence of force majeure events, natural disasters, strikes, or similar circumstances that may make access to the website impossible.
                </p>

                <p className="font-semibold text-slate-900 pt-2">
                  IP ADDRESSES
                </p>

                <p>
                  The website servers may automatically detect the IP address and domain name used by the user. An IP address is a number automatically assigned to a computer when it connects to the Internet. All such information is recorded in a duly registered server activity log file, which allows for the subsequent processing of data solely for statistical purposes, such as determining the number of page impressions, number of visits to web servers, order of visits, access points, and similar metrics.
                </p>

                <p className="font-semibold text-slate-900 pt-2">
                  APPLICABLE LAW AND JURISDICTION
                </p>

                <p>
                  Spanish law shall apply to the resolution of any disputes or issues related to this website or the activities carried out on it. The parties expressly submit to Spanish legislation, and the Courts and Tribunals closest to Madrid shall have jurisdiction to resolve any disputes arising from or related to the use of the website.
                </p>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex-shrink-0 bg-slate-50 border-t border-slate-200 px-6 py-4 rounded-b-xl">
              <button 
                onClick={() => setShowDisclaimerModal(false)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
