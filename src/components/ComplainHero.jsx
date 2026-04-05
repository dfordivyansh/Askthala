import React from 'react'
import { HeartHandshake, Coins, ClipboardList } from 'lucide-react';


const ComplainHero = () => {
  // Data for the three feature columns
  const features = [
    {
      id: 1,
      icon: <HeartHandshake size={64} className="text-blue-600" strokeWidth={1.5} />,
      heading: "Independent & Player-First Support",
      description: "Since launching our Casino Complaint Support service, Ask Thala has remained committed to providing a fair and neutral resolution process between players and online casinos."
    },
    {
      id: 2,
      icon: <Coins size={64} className="text-blue-600" strokeWidth={1.5} />,
      heading: "Transparent Complaint Process",
      description: "Transparency is at the core of what we do. Ask Thala provides a public complaint tracking system so players can monitor progress and understand decisions clearly."
    },
    {
      id: 3,
      icon: <ClipboardList size={64} className="text-blue-600" strokeWidth={1.5} />,
      heading: "Evidence-Based Decisions",
      description: "Every complaint is reviewed using verified facts, documented proof, and solid evidence to ensure fair outcomes without bias or manipulation."
    }
  ];


  // Data for the statistics cards
  const stats = [
    { id: 1, value: "34,000+", label: "PROCESSED COMPLAINTS" },
    { id: 2, value: "₹ Crores Returned", label: "Funds Successfully Recovered" },
    { id: 3, value: "26,000+", label: "RESOLVED COMPLAINTS" },
    { id: 4, value: "100,000+", label: "Total Complaints Received" }
  ];

  return (
    <div className="bg-white text-gray-900 font-sans flex flex-col items-center py-16 pt-30">

      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-16 space-y-2 px-6">
        <h1 className="text-3xl md:text-5xl font-normal tracking-wide text-gray-900">
          Ask Thala Online Casino Complaints
        </h1>
        <p className="text-lg md:text-xl font-bold text-gray-600 mt-2">
          Helping players resolve casino issues with transparency and fairness.
        </p>
      </div>

      {/* Features Grid (Icons + Text) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-20 px-6">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center">

            {/* Icon Container (same styling preserved) */}
            <div className="mb-6 p-4 rounded-full bg-blue-50 shadow-sm border border-blue-100">
              {feature.icon}
            </div>

            {/* Heading */}
            <h3 className="text-xl md:text-xl font-bold text-gray-900 mb-3">
              {feature.heading}
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm md:text-base max-w-xs">
              {feature.description}
            </p>

          </div>
        ))}

      </div>

      {/* Stats Cards Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white border border-gray-200 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 rounded-lg py-10 px-4 text-center shadow-md flex flex-col justify-center items-center group"
          >
            <span className="text-3xl md:text-4xl font-normal text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300 group-hover:text-blue-600">
              {stat.value}
            </span>
            <span className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider group-hover:text-gray-700">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ComplainHero