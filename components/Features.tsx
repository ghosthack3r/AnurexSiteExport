import React from 'react';
import Animated from './Animated';
import { benefits } from '../data/benefits';
import { SnowflakeIcon, DeviceIcon, ReliefIcon } from './icons';

const howItWorksSteps = [
    {
        icon: SnowflakeIcon,
        title: 'Freeze',
        description: 'Simply place the Anurex applicator in your freezer inside its protective container.',
        iconClassName: ''
    },
    {
        icon: DeviceIcon,
        title: 'Apply',
        description: 'Gently apply for 8-10 minutes. The controlled cold provides instant, soothing relief.',
        iconClassName: '-rotate-45'
    },
    {
        icon: ReliefIcon,
        title: 'Reuse',
        description: 'Clean with soap and water, then refreeze. It\'s hygienic and ready for your next use.',
        iconClassName: ''
    }
];

const Features = () => (
    <section id="how-it-works" className="container mx-auto py-24 px-4">
        <Animated>
            <h2 className="text-4xl font-bold text-center mb-4">Natural & Safe Cryotherapy</h2>
            <p className="text-lg text-[#8AA0A6] text-center max-w-2xl mx-auto mb-16">
                A simple, three-step process for effective, drug-free relief.
            </p>
        </Animated>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* How It Works Column */}
            <div className="space-y-8">
                <Animated delay={200}>
                    <h3 className="text-3xl font-bold text-center lg:text-right mb-8">How It Works</h3>
                </Animated>
                {howItWorksSteps.map((step, index) => (
                    <Animated key={index} delay={300 + index * 150}>
                        <div className="flex justify-center lg:justify-end">
                            <div className="flex items-center gap-4 max-w-sm">
                                <div className="text-center lg:text-right">
                                    <h4 className="font-bold text-xl text-white">{step.title}</h4>
                                    <p className="text-[#8AA0A6]">{step.description}</p>
                                </div>
                                <div className="bg-[#0E5A64] p-3 rounded-full flex-shrink-0">
                                    <step.icon className={`w-8 h-8 text-[#8CD2DC] ${step.iconClassName}`}/>
                                </div>
                            </div>
                        </div>
                    </Animated>
                ))}
            </div>

            {/* Central Image Column */}
            <Animated delay={100} className="flex justify-center order-first lg:order-none">
                <img 
                    src="https://i.ibb.co/996pjHzd/Chat-GPT-Image-Oct-17-2025-07-31-06-PM.png" 
                    alt="Anurex applicator" 
                    className="max-w-[18rem] w-full animate-pulse-glow" 
                />
            </Animated>

            {/* Benefits Column */}
            <div className="space-y-8">
                <Animated delay={200}>
                    <h3 className="text-3xl font-bold text-center lg:text-left mb-8">Key Benefits</h3>
                </Animated>
                {benefits.map((benefit, index) => (
                     <Animated key={index} delay={300 + index * 150}>
                        <div className="flex justify-center lg:justify-start">
                             <div className="flex items-center gap-4 max-w-sm">
                                <div className="bg-[#0E5A64] p-3 rounded-full flex-shrink-0">
                                    <benefit.icon className="w-8 h-8 text-[#8CD2DC]"/>
                                </div>
                                <div className="text-center lg:text-left">
                                    <h4 className="font-bold text-xl text-white">{benefit.text}</h4>
                                    <p className="text-[#8AA0A6]">{benefit.description}</p>
                                </div>
                            </div>
                        </div>
                    </Animated>
                ))}
            </div>
        </div>
    </section>
);

export default Features;