import React, { useState } from "react";
import {
  Globe,
  Landmark,
  Award,
  Building2,
  Smartphone,
  Download,
  RefreshCcw,
  Upload,
  Clock,
  Gamepad2,
  Percent,
  MessageCircle,
  Mail,
  ArrowDownToLine,
  Activity,
  XCircle,
  UserX,
  PauseCircle,
  AlertTriangle,
  ClipboardCheck,
  Lock,
} from "lucide-react";

const ReviewTabs = ({ site }) => {
  const [activeTab, setActiveTab] = useState("General");

  const {
    url = "#",
    licences = "N/A",
    establishedDate = "N/A",
    ownerName = "N/A",
    depositMethods = "",
    withdrawalMethods = "",
    withdrawalTime = "",
    currencies = "",
    softwareProviders = "",
    supportEmail = "",
    responsibleTools = "",
  } = site || {};

  // Standard list of Responsible Gambling Tools to check against
  const ALL_RESPONSIBLE_TOOLS = [
    { name: "Deposit Limit Tool", icon: <ArrowDownToLine size={20} /> },
    { name: "Wager Limit Tool", icon: <Activity size={20} /> },
    { name: "Loss Limit Tool", icon: <XCircle size={20} /> },
    { name: "Time/Session Limit Tool", icon: <Clock size={20} /> },
    { name: "Self-Exclusion Tool", icon: <UserX size={20} /> },
    { name: "Cool Off/Time-Out Tool", icon: <PauseCircle size={20} /> },
    { name: "Reality Check Tool", icon: <AlertTriangle size={20} /> },
    { name: "Self-Assessment Test", icon: <ClipboardCheck size={20} /> },
    { name: "Withdrawal Lock", icon: <Lock size={20} /> },
  ];

  // Normalize the admin input for comparison
  const availableTools = responsibleTools
    ? responsibleTools
        .toLowerCase()
        .split(",")
        .map((t) => t.trim())
    : [];

  const tabs = [
    "General",
    "Payments",
    "Games",
    "Customer Support",
    "Responsible Gambling",
  ];

  const InfoItem = ({ icon, title, content, link }) => (
    <div className="flex items-start gap-4 mb-8">
      <div className="text-gray-400 mt-1 flex-shrink-0">{icon}</div>
      <div className="w-full">
        <h4 className="font-bold text-gray-900 mb-2 text-lg">{title}</h4>
        <p
          className={`text-gray-600 text-sm leading-relaxed ${link ? "text-blue-600 hover:underline cursor-pointer" : ""}`}>
          {link ? (
            <a href={content} target="_blank" rel="noreferrer">
              {content}
            </a>
          ) : (
            content
          )}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white flex justify-center pb-20 font-sans">
      <div className="max-w-6xl w-full">
        {/* Tabs Header */}
        <div className="flex flex-wrap border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 cursor-pointer font-semibold text-sm whitespace-nowrap transition-colors duration-200 border-b-2 
                ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px] pl-5">
          {/* General Tab */}
          {activeTab === "General" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div className="flex flex-col">
                <InfoItem
                  icon={<Globe size={20} />}
                  title="Website"
                  content={url}
                  link
                />
                <InfoItem
                  icon={<Building2 size={20} />}
                  title="Company"
                  content={ownerName}
                />
                <InfoItem
                  icon={<Landmark size={20} />}
                  title="Established"
                  content={establishedDate}
                />
              </div>
              <div className="flex flex-col">
                <InfoItem
                  icon={<Award size={20} />}
                  title="Licences"
                  content={licences}
                />
                <InfoItem
                  icon={<Smartphone size={20} />}
                  title="Casino Type"
                  content="Instant Play, Mobile, Live Casino"
                />
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "Payments" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div>
                <InfoItem
                  icon={<Download size={20} />}
                  title="Deposit Methods"
                  content={depositMethods || "N/A"}
                />
                <InfoItem
                  icon={<RefreshCcw size={20} />}
                  title="Currencies"
                  content={currencies || "N/A"}
                />
              </div>
              <div>
                <InfoItem
                  icon={<Upload size={20} />}
                  title="Withdrawal Methods"
                  content={withdrawalMethods || "N/A"}
                />
                <InfoItem
                  icon={<Clock size={20} />}
                  title="Withdrawal Times"
                  content={withdrawalTime || "N/A"}
                />
              </div>
            </div>
          )}

          {/* Games Tab */}
          {activeTab === "Games" && (
            <div className="w-full">
              <InfoItem
                icon={<Gamepad2 size={20} />}
                title="Software Providers"
                content={softwareProviders || "N/A"}
              />
              <InfoItem
                icon={<Percent size={20} />}
                title="RTP"
                content="Not publicly audited"
              />
            </div>
          )}

          {/* Customer Support Tab */}
          {activeTab === "Customer Support" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div>
                <InfoItem
                  icon={<MessageCircle size={20} />}
                  title="Live Chat"
                  content="Available 24/7"
                />
                <InfoItem
                  icon={<Mail size={20} />}
                  title="Contact"
                  content={supportEmail || "N/A"}
                />
              </div>
            </div>
          )}

          {activeTab === "Responsible Gambling" && (
            <div className="mt-4">
              {[
                { label: "Deposit Limit Tool", key: "depositLimit" },
                { label: "Wager Limit Tool", key: "wagerLimit" },
                { label: "Loss Limit Tool", key: "lossLimit" },
                { label: "Time/Session Limit Tool", key: "sessionLimit" },
                { label: "Self-Exclusion Tool", key: "selfExclusion" },
                { label: "Cool Off/Time-Out Tool", key: "coolOff" },
                { label: "Reality Check Tool", key: "realityCheck" },
                { label: "Self-Assessment Test", key: "selfAssessment" },
                { label: "Withdrawal Lock", key: "gamblingBlock" },
              ].map((tool, index) => {
                const isYes = site?.[tool.key] === "Yes";

                return (
                  <div
                    key={index}
                    className="flex justify-between items-center py-4 border-b border-gray-200">
                    {/* LEFT TEXT */}
                    <span className="text-gray-800 text-[15px]">
                      {tool.label}
                    </span>

                    {/* RIGHT BADGE */}
                    <span
                      className={`px-4 py-1 text-sm rounded-md font-semibold ${
                        isYes
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}>
                      {isYes ? "Yes" : "No"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewTabs;
