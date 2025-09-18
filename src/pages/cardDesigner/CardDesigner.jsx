import React, { useRef, useState, useEffect, useContext } from 'react';
import CardPreview from './CardPreview';
import { CreditCard, Save, Share2, Eye, Search, User, Palette, Type, Settings } from 'lucide-react';
import { getCardDesign } from "../../api/card-design";
import { AuthContext } from '../../context/AuthContext';
import AboutSection from './Tabs/AboutSection';
import ContentSection from './Tabs/ContentSection';
import StylesSection from './Tabs/StylesSection';
import SettingsSection from './Tabs/SettingsSection';
import { showToast } from "../../components/toast";
import { useNavigate } from "react-router-dom";
import { ShareModal } from "./components/ShareModal";

const CardDesigner = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [card, setCard] = useState({
    about: {
      basicdetails: {
        name: "", email: "", mobilenumber: "", jobTitle: "",
        organization: "", location: "", cardVisibility: false,
      },
      mainButton: { buttonType: "call", buttonText: "", buttonInput: "" },
      whatsappButton: { whatsappNumber: "", message: "", isEnabled: false },
    },
    content: {
      textSection: {
        heading: "",
        title: '',
        content: '',
        isEnabled: true
      },
      linksSection: { isEnabled: true, title: "", link: "" },
      gallerySections: { isEnabled: true, imgUrl: "" },
      photoSections: { imgUrls: [], isEnabled: true, imgUrl: "" },
      youtubeSections: { isEnabled: true, title: "", link: "" }
    },
    style: {},
    settings: {
      public: true,
      removeBranding: false,
      emailContact: false,
      showSaveContact: false,
      enableExchangeContact: false
    },
  });


  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await getCardDesign();
        if (data) {
          setCard(data);
        }
      } catch (err) {
        console.error("Error fetching Card:", err);
      }
    };

    fetchCard();
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("about");


  const tabsConfig = [
    {
      id: "about",
      label: "Profile",
      icon: <User size={16} />,
      roles: ["student", "admin"],
    },
    {
      id: "content",
      label: "Content",
      icon: <Type size={16} />,
      roles: ["student", "admin"],
    },
    {
      id: "style",
      label: "Style",
      icon: <Palette size={16} />,
      roles: ["student", "admin"],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={16} />,
      roles: ["student", "admin"],
    },
  ];

  const tabs = tabsConfig.filter(
    (tab) => user && tab.roles.includes(user.role)
  );

  const handleViewCard = () => {
    const shareUrl = `/cardview?id=${card._id}`;
    navigate(shareUrl);
  };

  const handleShareCard = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-4 xl:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-9xl mx-auto">
          {/* Header */}

          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <h1 className="text-[30px] font-bold font-poppins text-headcolor">Web Cards</h1>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleViewCard}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-headcolor cursor-pointer"
                >
                  <Eye size={18} /> View Card
                </button>
                <button
                  onClick={handleShareCard}
                  className="flex items-center gap-2 border border-gray-300 text-subtext px-4 py-2 rounded-lg hover:bg-headcolor hover:text-white cursor-pointer"
                >
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>
          </div>


          {/* Tabs */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex cursor-pointer items-center gap-2 px-4 py-3 font-medium font-poppins ${activeTab === tab.id
                      ? 'bg-activecolor text-primary border-b-2 border-primary'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* for admin only the All Cards section showing */}


            {/* Students to access card editor */}
            {/* {activeTab === 'editor' && (
              <div className="p-4 sm:p-6 lg:p-4 xl:p-8 flex flex-wrap">
                <div className='flex flex-wrap lg:flex-nowrap w-full gap-2 justify-between'>
                  <div className='w-full lg:w-[60%]'>
                    <CardEditor card={card} onCardChange={setCard} />
                  </div>
                  <div className='w-full lg:w-[38%] flex justify-center'>
                    <CardPreview card={card} previewMode="desktop" />
                  </div>
                </div>
              </div>
            )} */}
            <div className="p-4 sm:p-6 lg:p-4 xl:p-8 flex flex-wrap">
              <div className="flex flex-wrap lg:flex-nowrap w-full gap-2 justify-between">
                <div className="w-full lg:w-[60%]">
                  {activeTab === 'about' && (
                    <AboutSection card={card} onCardChange={setCard} />
                  )}
                  {activeTab === 'content' && (
                    <ContentSection card={card} onCardChange={setCard} />
                  )}
                  {activeTab === 'style' && (
                    <StylesSection card={card} onCardChange={setCard} />
                  )}
                  {activeTab === 'settings' && (
                    <SettingsSection card={card} onCardChange={setCard} />
                  )}
                </div>

                {/* Preview Always on Right Side */}
                <div className="w-full lg:w-[38%] flex justify-center">
                  <CardPreview card={card} previewMode="desktop" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <ShareModal card={card} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

export { CardDesigner };
