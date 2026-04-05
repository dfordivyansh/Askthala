import React from 'react';

const ReviewDetail = ({ site }) => {
  const {
    name = "The Casino",
    editorsView = "No information available.",
    generalInfo = "No information available.",
    paymentInfo = "No information available.",
    supportInfo = "No information available.",
    gamesInfo = "No information available.",
    responsibleInfo = "No information available.",
    finalVerdict = "No information available."
  } = site || {};

  const renderText = (text) => {
    if (!text) return null;
    return text.split('\n').map((str, index) => (
      <p key={index} className="mb-4 leading-relaxed text-gray-600 min-h-[20px]">
        {str}
      </p>
    ));
  };

  return (
    <div className="bg-white -mt-24 text-gray-900 px-6 py-10 md:px-20 relative z-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Editor's View */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Editor’s View</h2>
          {renderText(editorsView)}
        </section>

        {/* General Information */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            General Information about {name}
          </h2>
          {renderText(generalInfo)}
        </section>

        {/* Payment Information */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Payment Information and Options at {name}
          </h2>
          {renderText(paymentInfo)}
        </section>

        {/* Customer Support */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Customer Support at {name}
          </h2>
          {renderText(supportInfo)}
        </section>

        {/* Games */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Games at {name}</h2>
          {renderText(gamesInfo)}
        </section>

        {/* Responsible Gambling Commitment */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            {name}’s Commitment to Responsible Gambling
          </h2>
          {renderText(responsibleInfo)}
        </section>

        {/* Final Verdict - Merged (No Box) */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Final Verdict on {name}
          </h2>
          {renderText(finalVerdict)}
        </section>

      </div>
    </div>
  )
}

export default ReviewDetail;