import React, { useState } from 'react';
import Animated from './Animated';
import { faqData } from '../data/faqs';
import { ChevronDownIcon } from './icons';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => (
  <div className="border-b border-[#0E5A64]">
    <button
      className="w-full flex justify-between items-center text-left py-6 transition-colors duration-300 hover:bg-white/5 px-2 -mx-2 rounded-md"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span className="text-xl font-semibold">{question}</span>
      <ChevronDownIcon
        className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className="overflow-hidden">
         <p className="pb-6 px-2 text-[#8AA0A6]">{answer}</p>
      </div>
    </div>
  </div>
);

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className="container mx-auto py-16">
            <div className="max-w-3xl mx-auto">
                <Animated>
                  <h2 className="text-4xl font-bold text-center mb-12">FAQs</h2>
                </Animated>
                {faqData.map((faq, index) => (
                  <Animated key={index} delay={100 * (index + 1)}>
                    <FaqItem
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                  </Animated>
                ))}
            </div>
        </section>
    );
};

export default FaqSection;