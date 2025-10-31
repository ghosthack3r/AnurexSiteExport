import React from 'react';
import Animated from './Animated';
import { ReliefIcon } from './icons';

const ProductAdvantage = () => (
    <section id="advantage" className="container mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-[#0B2E34] p-8 md:p-12 rounded-2xl">
            <Animated className="flex justify-center">
                 <img src="https://i.ibb.co/zhpGSSC9/Customer-Image.png" alt="Anurex applicator" className="max-w-s w-full -rotate-15 drop-shadow-lg" />
            </Animated>
            <div className="text-left">
                <Animated>
                  <h2 className="text-4xl font-bold mb-6">The Anurex Advantage</h2>
                </Animated>
                <Animated delay={200}>
                  <p className="text-[#8AA0A6] mb-8">
                      Anurex is engineered for comfort and effectiveness, using clinically proven cryotherapy to provide instant relief. It's the smart, drug-free solution recommended by doctors worldwide.
                  </p>
                </Animated>
                <ul className="space-y-4">
                    <Animated delay={400}>
                      <li className="flex items-start space-x-3 transition-transform duration-300 hover:translate-x-2">
                          <ReliefIcon className="w-6 h-6 text-[#2BA9B3] mt-1 flex-shrink-0" />
                          <span><span className="font-bold text-white">Ergonomic Design:</span> Contoured for comfortable and precise application.</span>
                      </li>
                    </Animated>
                    <Animated delay={500}>
                      <li className="flex items-start space-x-3 transition-transform duration-300 hover:translate-x-2">
                          <ReliefIcon className="w-6 h-6 text-[#2BA9B3] mt-1 flex-shrink-0" />
                          <span><span className="font-bold text-white">Medical-Grade Materials:</span> Safe, hygienic, and easy to clean for repeated use.</span>
                      </li>
                    </Animated>
                    <Animated delay={600}>
                      <li className="flex items-start space-x-3 transition-transform duration-300 hover:translate-x-2">
                          <ReliefIcon className="w-6 h-6 text-[#2BA9B3] mt-1 flex-shrink-0" />
                          <span><span className="font-bold text-white">Controlled Cryotherapy:</span> Delivers a scientifically calibrated cooling effect directly to the tissue.</span>
                      </li>
                    </Animated>
                </ul>
            </div>
        </div>
    </section>
);

export default ProductAdvantage;