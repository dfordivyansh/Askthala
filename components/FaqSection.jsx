import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

// --- FAQ Data ---
const faqData = [
  {
    question: "What is AskThala.com?",
    answer: "AskThala.com is a review and information website where users can learn about online betting apps, casino platforms, and sportsbook features before joining any platform."
  },
  {
    question: "Is AskThala.com a betting or casino app?",
    answer: "No. AskThala.com is not a betting app. We only share reviews, guides, comparisons, and information about third-party platforms."
  },
  {
    question: "Is online betting legal in India?",
    answer: "Online betting legality depends on state laws in India. Some states allow it, while others restrict it. Users should always check local regulations before participating."
  },
  {
    question: "Do I need to register on AskThala.com?",
    answer: "No. Registration is not required. You can freely read all reviews and guides on our website."
  },
  {
    question: "Are the platforms mentioned on AskThala.com safe?",
    answer: "We list popular and widely used platforms, but we advise users to verify details on the official website before signing up."
  },
  {
    question: "Can I earn guaranteed money from betting apps?",
    answer: "No. Betting involves risk, and no platform can guarantee profits. Always participate for entertainment, not as a source of income."
  },
  {
    question: "What is a Welcome Bonus?",
    answer: "A welcome bonus is an offer given to new users when they sign up or make their first deposit on a betting or casino platform."
  },
  {
    question: "Is bonus money real cash?",
    answer: "Bonus money is not direct withdrawable cash. It comes with conditions like wagering requirements, which must be completed before withdrawing any winnings."
  },
  {
    question: "How can I deposit money on betting apps?",
    answer: "Most platforms support UPI, bank transfer, and digital wallets for easy deposits."
  },
  {
    question: "How long do withdrawals take?",
    answer: "Withdrawal time depends on the platform. Generally, it takes a few minutes to 24 hours after verification."
  },
  {
    question: "Is KYC required?",
    answer: "Yes. Most betting platforms require KYC (Know Your Customer) to verify identity and process withdrawals smoothly."
  },
  {
    question: "Which sports can I bet on?",
    answer: "Popular sports include Casino, football, tennis, basketball, and more, depending on the platform."
  },
  {
    question: "Are online casino games fair?",
    answer: "Reputed platforms use licensed software providers, but users should always choose trusted and verified apps."
  },
  {
    question: "Is live betting available?",
    answer: "Yes. Many sportsbooks allow live betting during ongoing matches."
  },
  {
    question: "Is AskThala.com suitable for minors?",
    answer: "No. AskThala.com is strictly for users aged 18+."
  },
  {
    question: "Does AskThala.com promote gambling?",
    answer: "No. We provide information only and strongly encourage responsible gaming and safe participation."
  },
  {
    question: "Can I trust the reviews on AskThala.com?",
    answer: "Our reviews are based on research, platform features, bonuses, and real user experiences to help users make informed decisions."
  },
  {
    question: "What should I do if betting feels addictive?",
    answer: "Take breaks, set spending limits, and seek professional help if needed. Betting should never impact your personal or financial life."
  }
];


const FaqItem = ({ item, isOpen, toggle }) => {
  return (
    <div 
      className={`mb-4 rounded-2xl transition-all duration-300 border ${
        isOpen 
          ? 'bg-blue-50/30 border-blue-500 shadow-md' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
      }`}
    >
      <button
        onClick={toggle}
        className="flex items-center justify-between cursor-pointer w-full p-6 text-left focus:outline-none"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
          isOpen ? 'text-blue-600' : 'text-gray-900'
        }`}>
          {item.question}
        </span>
        
        <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
            isOpen ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50'
        }`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-gray-600 text-base md:text-lg leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleFaqs = showAll ? faqData : faqData.slice(0, 5);

  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4 border border-blue-100">
            <HelpCircle className="text-blue-600 w-6 h-6" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Got questions? We've got answers.
          </p>
        </div>

        {/* FAQ List */}
        <div className="w-full">
          {visibleFaqs.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              toggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Show More / Less Button */}
        {faqData.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setShowAll(!showAll);
                setOpenIndex(null);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              {showAll ? "Show Less" : "Show All FAQs"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};


export default FaqSection;