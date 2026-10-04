import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Overview } from './components/Overview';
import { AboutMission } from './components/AboutMission';
import { ServicesHub } from './components/ServicesHub';
import { ResearchPage } from './components/ResearchPage';
import { RdPage } from './components/RdPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ContactPage } from './components/ContactPage';
import { CroServices } from './components/CroServices';
import { AcademicWriting } from './components/AcademicWriting';
import { StatisticalAnalysis } from './components/StatisticalAnalysis';
import { TrainingPrograms } from './components/TrainingPrograms';
import { UMAPViewer } from './components/UMAPViewer';
import { SpatialViewer } from './components/SpatialViewer';
import { OrganAtlas } from './components/OrganAtlas';
import { MicrobiomeExplorer } from './components/MicrobiomeExplorer';
import { DatasetRepository } from './components/DatasetRepository';
import { BrandKitModal } from './components/BrandKitModal';
import { SearchModal } from './components/SearchModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { AtlasView } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<AtlasView>('overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBrandKitOpen, setIsBrandKitOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState('cro');
  const [selectedGeneForUmap, setSelectedGeneForUmap] = useState<string>('CD3D');
  const [selectedOrganId, setSelectedOrganId] = useState<string>('brain');

  // Global keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Send page_view to Google Analytics (gtag.js) on SPA view navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as unknown as { gtag: Function }).gtag === 'function') {
      (window as unknown as { gtag: Function }).gtag('event', 'page_view', {
        page_title: `M & M BioATLAS – ${currentView.charAt(0).toUpperCase() + currentView.slice(1)}`,
        page_location: window.location.href,
        page_path: `/${currentView}`,
      });
    }
  }, [currentView]);

  const handleNavigateWithDetail = (view: AtlasView, detailId?: string) => {
    if (view === 'organs' && detailId) {
      setSelectedOrganId(detailId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToUmapWithGene = (gene: string) => {
    setSelectedGeneForUmap(gene);
    setCurrentView('umap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (serviceCategory?: string) => {
    if (serviceCategory) {
      setConsultationService(serviceCategory);
    }
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col selection:bg-blue-600/15 selection:text-blue-900">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onSelectView={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBrandKit={() => setIsBrandKitOpen(true)}
        onOpenConsultation={() => handleOpenConsultation('cro')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'overview' && (
          <Overview
            onSelectView={handleNavigateWithDetail}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenBrandKit={() => setIsBrandKitOpen(true)}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'services' && (
          <ServicesHub
            onSelectView={handleNavigateWithDetail}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'research' && (
          <ResearchPage
            onSelectView={handleNavigateWithDetail}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'rd' && (
          <RdPage
            onSelectView={handleNavigateWithDetail}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsPage
            onSelectView={handleNavigateWithDetail}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage
            onSelectView={handleNavigateWithDetail}
          />
        )}

        {currentView === 'about' && (
          <AboutMission
            onSelectView={handleNavigateWithDetail}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'cro-services' && (
          <CroServices
            onOpenConsultation={handleOpenConsultation}
            onNavigateToUmap={() => {
              setCurrentView('umap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'academic-writing' && (
          <AcademicWriting
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'statistics' && (
          <StatisticalAnalysis
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentView === 'training' && (
          <TrainingPrograms
            onOpenEnrollment={(progId) => handleOpenConsultation(progId)}
          />
        )}

        {currentView === 'umap' && (
          <UMAPViewer initialGene={selectedGeneForUmap} />
        )}

        {currentView === 'spatial' && (
          <SpatialViewer />
        )}

        {currentView === 'organs' && (
          <OrganAtlas
            initialOrganId={selectedOrganId}
            onNavigateToUmap={handleNavigateToUmapWithGene}
            onNavigateToDataset={() => {
              setCurrentView('datasets');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'microbiome' && (
          <MicrobiomeExplorer />
        )}

        {currentView === 'datasets' && (
          <DatasetRepository />
        )}
      </main>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigateWithDetail}
        onSelectGene={(gene) => setSelectedGeneForUmap(gene)}
      />

      <BrandKitModal
        isOpen={isBrandKitOpen}
        onClose={() => setIsBrandKitOpen(false)}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        initialServiceCategory={consultationService}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onSelectView={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBrandKit={() => setIsBrandKitOpen(true)}
        onOpenConsultation={() => handleOpenConsultation('cro')}
      />
    </div>
  );
}
