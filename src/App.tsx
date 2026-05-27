import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedArtworks } from './components/FeaturedArtworks';
import { About } from './components/About';
import { FeaturedArtist } from './components/FeaturedArtist';
import { Exhibitions } from './components/Exhibitions';
import { Collection } from './components/Collection';
import { VideoExperience } from './components/VideoExperience';
import { Testimonials } from './components/Testimonials';
import { Services } from './components/Services';
import { SocialFeed } from './components/SocialFeed';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
export function App() {
  return (
    <div className="bg-ink min-h-screen text-bone selection:bg-gold selection:text-ink">
      <Navbar />
      <main>
        <Hero />
        <FeaturedArtworks />
        <About />
        <FeaturedArtist />
        <Exhibitions />
        <Collection />
        <VideoExperience />
        <Testimonials />
        <Services />
        <SocialFeed />
        <Contact />
      </main>
      <Footer />
    </div>);

}