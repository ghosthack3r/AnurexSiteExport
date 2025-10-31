import React from 'react';
import Animated from './Animated';
import { PlayIcon, ChevronDownIcon } from './icons';

const ScrollIndicator = () => (
    <a href="#how-it-works" className="flex flex-col items-center space-y-2 text-[#8CD2DC] opacity-70 group cursor-pointer no-underline">
        <p className="text-sm tracking-widest uppercase group-hover:opacity-100 transition-opacity">Learn More</p>
        <ChevronDownIcon className="w-6 h-6 animate-bounce-slow" />
    </a>
);

const Hero = () => (
  <section className="relative container mx-auto flex flex-col">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
      <div className="flex flex-col space-y-6 pt-24">
        <Animated>
          <h1 className="text-3xl md:text-5xl font-black tracking-widest text-[#FFFFFF] whitespace-nowrap" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>FAST HEMORRHOID RELIEF</h1>
        </Animated>
        <Animated delay={200}>
            <img src="https://i.ibb.co/gL6B4kmy/Untitled-11.png" alt="Anurex" className="w-full max-w-md" />
        </Animated>
        <Animated delay={400}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button className="bg-[#F0C828] text-[#003087] font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:bg-yellow-400 transition-all transform hover:scale-105 flex items-center space-x-3">
              <span>Buy with</span>
              <img src="https://i.ibb.co/5xBfM1kw/Pay-Pal-svg.png" alt="PayPal Logo" className="h-6" />
            </button>
            <div className="flex items-center space-x-6">
              <img src="https://i.ibb.co/fVg03ym5/drreommended.png" alt="Doctor Recommended" className="h-16" />
              <img src="https://i.ibb.co/gZ24ybD7/CE-Mark.png" alt="CE Mark" className="h-12" />
              <img src="https://i.ibb.co/Lhb3W6Kk/madeisusa.png" alt="Made in USA Logo" className="h-16" />
            </div>
          </div>
        </Animated>
        <Animated delay={600}>
          <button type="button" aria-label="Play video" className="bg-[#0B2E34] aspect-video rounded-xl flex items-center justify-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2E34] focus-visible:ring-white w-full max-w-md">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
              <PlayIcon className="w-10 h-10 text-white" />
            </div>
          </button>
        </Animated>
      </div>
      <div className="flex flex-col items-center justify-between pt-40 pb-16">
        <Animated delay={300}>
            <img src="https://i.postimg.cc/76rK1gBz/anurex-double-effect.png" alt="Anurex Double Effect product box" className="max-w-lg w-full drop-shadow-2xl" />
        </Animated>
        <Animated delay={800}>
            <ScrollIndicator />
        </Animated>
      </div>
    </div>
  </section>
);

export default Hero;