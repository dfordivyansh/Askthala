import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComplaintSteps = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white text-gray-600 font-sans p-6 md:p-12 flex justify-center">
      <div className="max-w-7xl w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-4xl font-normal text-gray-900">
            Things to Know Before Filing a Casino Complaint
          </h1>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 bg-blue-50 py-2 px-4 rounded-full border border-blue-100">
            <div className="w-8 h-8 rounded-full bg-white border border-blue-200 overflow-hidden flex items-center justify-center">
               <User size={20} className="text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-900 underline decoration-dotted decoration-gray-400 underline-offset-4 cursor-pointer hover:text-blue-600">
              Goran Gaćeša
            </span>
          </div>
        </div>

        {/* Intro Text */}
        <p className="text-lg text-gray-600 mb-12 max-w-4xl">
          Facing an issue with an online casino can be stressful. Ask Thala is here to reduce that stress and guide you toward the right resolution.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Step 1 Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Step 1 – Contact the Casino First</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Before filing a complaint, try resolving the issue directly with the casino’s support team. Many problems are settled faster when addressed directly.
            </p>
          </div>

          {/* Step 2 Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Step 2 – Review Our Guidelines</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-8 flex-grow">
              Please read Ask Thala’s complaint guidelines carefully. Following these steps helps us collect the necessary details and speeds up the resolution process.
            </p>
            <button className="px-6 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors text-sm font-medium w-full md:w-auto text-center">
              Read guidelines
            </button>
          </div>

          {/* Step 3 Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Step 3 – Submit Your Complaint</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-8 flex-grow">
              If the issue remains unresolved after contacting the casino and reviewing our guidelines, you can submit a formal complaint through our platform.
            </p>
            <button
             onClick={()=>navigate('/register-complain')}
             className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded transition-colors text-sm font-bold shadow-md hover:bg-blue-700 w-full md:w-auto text-center">
              Submit complaint
            </button>
          </div>

        </div>

        {/* Footer / Tip Section */}
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200">
          <p>
            <strong className="text-gray-900">Helpful Tip:</strong> Ask Thala casino reviews provide insights into past and ongoing complaints against casinos. Reviewing them can help you understand a casino’s history, payout reliability, and support quality.
          </p>
          <p>
            Our reviews are written by casino experts and include a unique Trust Score, calculated using multiple factors such as payment methods, withdrawal speed, customer support quality, and complaint history.
          </p>
        </div>

      </div>
    </div>
  );
}

export default ComplaintSteps