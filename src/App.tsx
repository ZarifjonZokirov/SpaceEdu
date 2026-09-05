import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlanetEncyclopedia } from './components/PlanetEncyclopedia';
import { PlanetComparison } from './components/PlanetComparison';
import { SpaceCalculator } from './components/SpaceCalculator';
import { OrbitSimulator } from './components/OrbitSimulator';
import { SpaceQuiz } from './components/SpaceQuiz';
import { SpaceEvents } from './components/SpaceEvents';
import { Footer } from './components/Footer';
import { EnrollModal } from './components/EnrollModal';
import { UserProfileModal } from './components/UserProfileModal';

function MainApp() {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedComparisonA, setSelectedComparisonA] = useState<string>('earth');

  const handleSelectForComparison = (planetId: string) => {
    setSelectedComparisonA(planetId);
    const el = document.getElementById('taqqoslash');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#04101f] text-white selection:bg-cyan-400 selection:text-slate-950">
      {/* Top Fixed Header with Google Auth & Profile button */}
      <Navbar onOpenEnroll={() => setIsEnrollOpen(true)} />

      {/* Hero Section with Cinematic Planet Video & Rotation */}
      <Hero />

      {/* Main Educational Sections */}
      <main id="content">
        {/* Planet Encyclopedia */}
        <PlanetEncyclopedia onSelectForComparison={handleSelectForComparison} />

        {/* Side-by-Side Planet Comparison */}
        <PlanetComparison initialA={selectedComparisonA} initialB="mars" />

        {/* Space Gravity & Age Calculator */}
        <SpaceCalculator />

        {/* Virtual Physics Lab: Orbit Simulator */}
        <OrbitSimulator />

        {/* Interactive Astronomy Quiz & Certificate */}
        <SpaceQuiz />

        {/* Space Events Calendar & Live ISS Tracker */}
        <SpaceEvents />
      </main>

      {/* Footer */}
      <Footer />

      {/* Registration / Enrollment Modal */}
      <EnrollModal isOpen={isEnrollOpen} onClose={() => setIsEnrollOpen(false)} />

      {/* User Google Profile & Firebase Data Modal */}
      <UserProfileModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
