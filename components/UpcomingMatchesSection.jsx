import React from 'react';
import { Facebook, Send, Users, MessageCircle } from 'lucide-react'; 

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const UpcomingMatchesSection = () => {
  const socialLinks = [
    {
      name: "Telegram Channel",
      icon: <Send size={26} />,
      url: "https://t.me/AskThala",
      color: "hover:bg-[#26A5E4] hover:shadow-[#26A5E4]/30",
    },
    {
      name: "Telegram Group",
      icon: <Users size={26} />,
      url: "https://t.me/AskThalaKing",
      color: "hover:bg-[#229ED9] hover:shadow-[#229ED9]/30",
    },
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon size={26} />,
      url: "https://whatsapp.com/channel/0029VbBVMw842DcXEKIdYm1n",
      color: "hover:bg-[#25D366] hover:shadow-[#25D366]/30",
    },
    {
      name: "Facebook",
      icon: <Facebook size={26} />,
      url: "https://www.facebook.com/share/1BnSa246sC/",
      color: "hover:bg-[#1877F2] hover:shadow-[#1877F2]/30",
    },
  ];

  return (
    <section className="bg-white py-16 relative overflow-hidden flex justify-center items-center min-h-[400px]">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
        <div className="group relative bg-white rounded-3xl p-10 border border-gray-100 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-center">
          
          {/* Header */}
          <div className="relative z-10 mb-8">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Join Our Casino Community
            </h3>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 text-lg font-medium">
              Get the latest tips and match updates directly on your favorite platforms.
            </p>
          </div>

          {/* Social Icons Grid */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            {socialLinks.map((social, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <a 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/icon w-16 h-16 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-2xl text-gray-600 hover:text-white transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl ${social.color}`}
                  aria-label={social.name}
                >
                  <span className="group-hover/icon:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-1">
                    Join Our
                  </span>
                  <span className="text-sm font-bold text-gray-800 whitespace-nowrap">
                    {social.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default UpcomingMatchesSection;