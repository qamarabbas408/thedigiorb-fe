'use client';

import React, { useState } from 'react';
import { RevampHero } from '@/components/revamp/Hero';
import { RevampAbout } from '@/components/revamp/About';
import { RevampServices } from '@/components/revamp/Services';
import { InteractiveGraph } from '@/components/revamp/InteractiveGraph';
import { ParallaxBanner } from '@/components/revamp/ParallaxBanner';
import { RevampPortfolio } from '@/components/revamp/Portfolio';
import { RevampWhyUs } from '@/components/revamp/WhyUs';
import { RevampTestimonials } from '@/components/revamp/Testimonials';
import { RevampFaq } from '@/components/revamp/Faq';
import { RevampTeam } from '@/components/revamp/Team';
import { RevampContact } from '@/components/revamp/Contact';
import { ProjectModal } from '@/components/revamp/ProjectModal';
import { PortfolioItem } from '@/lib/revamp';

export default function RevampLandingPage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <RevampHero onContactClick={handleContactClick} />
      <RevampAbout onContactClick={handleContactClick} />
      <RevampServices onContactClick={handleContactClick} />
      <InteractiveGraph onContactClick={handleContactClick} />
      <ParallaxBanner onContactClick={handleContactClick} />
      <RevampPortfolio onSelectProject={setSelectedProject} />
      <RevampWhyUs />
      <RevampTestimonials />
      <RevampFaq onContactClick={handleContactClick} />
      <RevampTeam />
      <RevampContact />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}