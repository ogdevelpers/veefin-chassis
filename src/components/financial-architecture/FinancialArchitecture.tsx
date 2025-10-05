"use client";
import { useRef, useState } from "react";
import LineSvg from "../line-svg/LineSvg";
import ProductSection from "./ProductSection";
import { AppState, sidebarContentMapper } from "@/lib/constants";
import MyModal from "../modal/modal";
import EmailFormModal from "../email-form/EmailForm";
import { toPng } from 'html-to-image';
import Sidebar from "../sidebar/sidebar";
import ThankYouPage from "../thank-you/ThankYouPage";



const channelIcons = (channel: string) => {
  switch (channel) {
    case 'WEB':
      return '/assets/web.svg';
    case 'MOBILE':
      return '/assets/mobile.png';
    case 'API':
      return '/assets/API.svg';
    case 'H2H':
      return '/assets/H2H.svg';
    case 'CHATBOT':
      return '/assets/chatbot.png';
    case 'BRANCHES':
      return '/assets/branches.png';
    default:
      return '/assets/web.svg';
  }
}

const resolveButtonText = (state: AppState) => {
  switch (state) {
    case 'start':
      return 'BUILD MY OWN ARCHITECTURE';
    case 'picking':
      return 'DONE';
    case 'selected':
      return 'DONE';
    case 'confirmed':
      return 'DONE';
    default:
      return 'BUILD MY OWN ARCHITECTURE';
  }
}

const digitalEngagement = [
  { title: 'CUSTOMER ONBOARDING' },
  { title: 'PRODUCT ONBOARDING' },
  { title: 'ENTITLEMENT SETUP' },
  { title: 'MASTER SETUP' },
  { title: 'PRE-CHECKERS (LIMIT ETC)' },
  { title: 'FX & RATES' },
  { title: 'TWO FACTOR AUTHENTICATION' },
  { title: 'APPLICATION FORMS' },
  { title: 'DOCUMENT UPLOADS' },
  { title: 'COMMUNICATIONS' },
  { title: 'REPORTS' },
  { title: 'DASHBOARD & WIDGETS' }
];

const tradeFinanceItems = [
  'IMPORT LC', 'EXPORT COLLECTION', 'BILLS UNDER EXPORT LC',
  'IMPORT FINANCING', 'EXPORT LC', 'IMPORT COLLECTION',
  'BILLS UNDER IMPORT LC', 'REMITTANCES', 'GUARANTEES',
  'VALIDATION RULES', 'BUSINESS RULES'
];

const cashManagementItems = [
  'ELECTRONIC PAYMENTS', 'EXPORT COLLECTION', 'PHYSICAL RECEIVABLES',
  'PHYSICAL PAYMENTS', 'BALANCE & TXN REPORTS', 'SWEEPS',
  'NOTIONAL POOLING', 'VIRTUAL ACCOUNTS', 'CASH FORECASTING',
  'VALIDATION RULES', 'BUSINESS RULES'
];

const supplyChainItems = [
  'PARTY/COUNTER PARTY SETUP', 'PROGRAM SETUP', 'FINANCING REQUEST',
  'DISBURSEMENT', 'ACCRUAL & POSTING', 'REPAYMENT',
  'SOA', 'LIMIT MANAGEMENT', 'NPA MANAGEMENT',
  'VALIDATION RULES', 'BUSINESS RULES'
];

const commonLayerItems = [
  'MASTERS', 'UAM', 'NOTIFICATION', 'WORKFLOW ENGINE',
  'STORAGE', 'ACCOUNTING', 'LIMITS', 'FEES',
  'CUSTOMERS', 'FILE CONVERTER', 'REPORTING', 'POSTING'
];

const dataLayerItems = [
  'PRODUCT DATA', 'CUSTOMER DATA', 'LOG DATA', 'TRANSACTIONAL DATA',
  'ANALYTICAL DATA', 'AUDITING DATA', 'RISK DATA', 'MASTER DATA USER DATA'
];

const leftPlatforms = ['CBS', 'ERP', 'BOOK KEEPING', 'GLOBAL RISK', 'LIMIT'];
const rightPlatforms = ['MASTER DATA MANAGEMENT', 'ANALYTICS & MI', 'DATA WAREHOUSE', 'DOCUMENT MANAGEMENT'];

const commonCapabilities = [
  'SSO', 'MULTI-LINGUAL', 'PURGING', 'AUDIT', 'ARCHIVAL',
  'MULTI-ENTITY', 'MULTI-TENANCY', 'DB AGNOSTIC DESIGN',
  'CLOUD AGNOSTIC DESIGN', 'EXCEPTION HANDLING', 'GLOBAL SEARCH ENGINE', 'INTEGRATOR'
];

const externalSystems = [
  'FINTECH', 'DATA PROVIDERS', 'AML', 'TAX', 'FX RATES',
  'SECONDARY MARKETS', 'SWIFT PAYMENT GATEWAYS', 'REGULATIONS',
  'INVOICING', 'CREDIT BUREAU', 'MARKET PLACE', 'SIGNATURE VERIFICATION'
];

const channels = ['WEB', 'MOBILE', 'API', 'H2H', 'CHATBOT', 'BRANCHES'];

const FinancialArchitecture = () => {
  const [appState, setAppState] = useState<AppState>('start');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: string }>({ title: '', content: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState<{ title: string; content: string }>({ title: '', content: '' });
  const [pngBlob, setPngBlob] = useState<Blob | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankYouData, setThankYouData] = useState<{ email: string; imageId: string; imageUrl: string } | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const [selections, setSelections] = useState<Record<string, string[]>>({
    'CHANNELS': [],
    'TRADE FINANCE': [],
    'CASH MANAGEMENT SYSTEMS': [],
    'SUPPLY CHAIN FINANCE': [],
    'COMMON LAYER': [],
  });


  const handleButtonClick = async () => {
    if (appState === 'start') {
      setAppState('picking');
    }
    else if (appState === 'picking') {
      setAppState('selected');

      // Generate high-quality PNG
      const png = await toPng(targetRef.current as HTMLElement, {
        backgroundColor: "#232228",
        width: 1920, // Higher resolution for better quality
        height: 1080, // Maintain 16:9 aspect ratio
        pixelRatio: 2, // Higher pixel ratio for crisp images
        quality: 1.0, // Maximum quality
        cacheBust: true, // Ensure fresh rendering
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });

      // Convert PNG data URL to blob
      const response = await fetch(png);
      const pngBlob = await response.blob();
      setPngBlob(pngBlob);
    } else if (appState === 'selected') {
      setModalContent({
        title: 'Please Enter Your Details',
        content: 'Please enter your details to receive the architecture via email.'
      });
      setIsModalOpen(true);
      setAppState('confirmed');
    } else if (appState === 'confirmed') {
      setAppState('start');
      setSelections({
        'CHANNELS': [],
        'TRADE FINANCE': [],
        'CASH MANAGEMENT SYSTEMS': [],
        'SUPPLY CHAIN FINANCE': [],
        'COMMON LAYER': [],
      });
    }
  }

  //  After a successfull entry to db, reset app. 
  const handleReset = () => {
    setAppState('start');
    setSelections({
      'CHANNELS': [],
      'TRADE FINANCE': [],
      'CASH MANAGEMENT SYSTEMS': [],
      'SUPPLY CHAIN FINANCE': [],
      'COMMON LAYER': [],
    });
    setPngBlob(null);
    setShowThankYou(false);
    setThankYouData(null);
    handleCloseModal();
  }

  const handleBackButtonClick = () => {
    setAppState('picking');
  }

  const handleEmailSuccess = (email: string, imageId: string, imageUrl: string) => {
    setThankYouData({ email, imageId, imageUrl });
    setShowThankYou(true);
    setIsModalOpen(false);
  }

  const handleBackToArchitecture = () => {
    setShowThankYou(false);
    setThankYouData(null);
    handleReset();
  }

  const openSidebar = (item: string) => {
    const content: string = sidebarContentMapper?.[item]?.content || sidebarContentMapper["default"].content;
    setSidebarContent({
      title: item,
      content: content
    });
    setIsSidebarOpen(true);
  }

  const toggleSelection = (category: string, item: string) => {
    if (appState === 'start') {
      // Open modal with details
      const content: string = sidebarContentMapper?.[item]?.content || sidebarContentMapper["default"].content;
      setSidebarContent({
        title: item,
        content: content
      });
      setIsSidebarOpen(true);
      return;
    }
    if (appState !== 'picking') {
      return;
    }

    if (category === 'DIGITAL ENGAGEMENT HUB' || category === 'DATA LAYER' || category === 'GROUP CORE PLATFORMS') {
      return; // non selectable items
    }

    if (category === "COMMON LAYER" && !(item === "FEES" || item === "CUSTOMERS" || item === "REPORTING" || item === "POSTING")) {
      return; // non selectable items in common layer
    }

    setSelections(prev => {
      const currentSelections = prev[category] || [];
      const isSelected = currentSelections.includes(item);

      return {
        ...prev,
        [category]: isSelected
          ? currentSelections.filter(i => i !== item)
          : [...currentSelections, item]
      };
    });
  };

  const isSelected = (category: string, item: string) => {
    return selections[category]?.includes(item) || false;
  };

  // Before the return statement, compute which sections are visible
  const isTradeFinanceVisible = ((appState === 'selected' || appState === 'confirmed') && selections['TRADE FINANCE'].length > 0) || (appState === 'picking' || appState === 'start');
  const isCashManagementVisible = ((appState === 'selected' || appState === 'confirmed') && selections['CASH MANAGEMENT SYSTEMS'].length > 0) || (appState === 'picking' || appState === 'start');
  const isSupplyChainVisible = ((appState === 'selected' || appState === 'confirmed') && selections['SUPPLY CHAIN FINANCE'].length > 0) || (appState === 'picking' || appState === 'start');
  const visibleCount = [isTradeFinanceVisible, isCashManagementVisible, isSupplyChainVisible].filter(Boolean).length;


  return (
    <div className="min-h-screen max-h-screen  text-white p-6 flex flex-col" ref={targetRef}>
      <MyModal isOpen={isModalOpen} onClose={handleCloseModal} title={modalContent.title || 'Veefin'}>
        {appState === 'selected' || appState === 'confirmed' ?
          (<EmailFormModal selections={selections} handleReset={handleReset} pngBlob={pngBlob} onEmailSuccess={handleEmailSuccess} />) :
          (
            <p className="text-gray-300">
              {modalContent.content || 'Detailed information about the selected item will be displayed here.'}
            </p>
          )
        }
      </MyModal>
      <Sidebar
        title={sidebarContent.title || 'Veefin'}
        content={sidebarContent.content || <p>Sidebar Content</p>}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div className="max-w-[330px] w-[330px] flex justify-start">
          {
            (appState === 'selected' || appState === 'confirmed') && (
              <button
                className="bg-[#27A689] ml-4 gap-2.5 py-3 px-[30px] h-[64px] min-h-[64px] rounded-lg mr-4 
                 animate-fadeIn" // Custom animation is now applied
                onClick={handleBackButtonClick}
              >
                <span className="font-arial font-bold text-base leading-none tracking-[-0.25px] uppercase">
                  <img src="/assets/back.svg" alt="Go Back" className="inline-block mr-2" /> Go Back
                </span>
              </button>
            )
          }
        </div>
        <div className="flex-1 flex items-center justify-center space-x-4 font-bold text-[40px] leading-tight tracking-[-0.25px] uppercase">
          <img src="/assets/logo.svg" alt="VeeFin" width={170} height={50} />
          <h1 className="text-4xl font-bold text-[#27A689]">
            4.0 WORKING CAPITAL ON A SINGLE CHASSIS
          </h1>
        </div>
        <div className="max-w-[330px] w-[330px] min-w-[330px]">
          <button
            className={`bg-[#27A689] gap-2.5 py-3 px-[30px] h-[64px] min-h-[64px] rounded-lg ml-auto mr-4 block overflow-hidden
      ${appState === 'start' ? 'w-[320px]' : 'w-[150px]'}`}
            onClick={handleButtonClick}
            style={{
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <span className="font-arial font-bold text-base leading-none tracking-[-0.25px] uppercase whitespace-nowrap">
              {resolveButtonText(appState)}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[170px_1fr_211px] gap-3 min-h-0">
        {/* Left Sidebar - Common Capabilities */}
        <div className="min-w-[170px] max-w-[170px] space-y-2 bg-[#111] p-3 space-y-6 rounded-xl max-h-[100%]">
          <h3 className="text-sm font-semibold text-[#9FE779] mb-4 ">
            COMMON<br />OPERATIONAL<br />CAPABILITIES
          </h3>
          {commonCapabilities.map((item, idx) => (
            <div key={idx} className={`${appState === 'start' ? `bg-[#232228] border-white` : `bg-[#181818] border-transparent`} px-4 rounded-lg border-2  text-xs min-h-[40px] flex items-center  transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,2,0.3,1)]`}
              onClick={() => openSidebar(item)}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-[1440px] space-y-3 h-[100vh] min-h-[100%] overflow-y-hidden">
          {/* Channels */}
          <div className="bg-[#111] p-4 rounded-xl flex items-center justify-between space-x-4">
            <h3 className="text-sm font-semibold text-[#9FE779]">CHANNELS</h3>
            <div className="flex-1 grid grid-cols-6 gap-2 transition-all duration-700 ease-in-out">
              {channels.map((channel, idx) => {
                const isChannelSelected = isSelected('CHANNELS', channel);
                const isFinalState = (appState === 'selected' || appState === 'confirmed');

                // If in the final state, and not selected, we hide it.
                const isHiding = isFinalState && !isChannelSelected;

                // The 'clicked' or 'bg-[#232228]' class.
                const baseClasses = isChannelSelected ? 'clicked' : 'bg-[#232228]';

                // Classes for animation and position
                const animationClasses = isHiding
                  ? 'opacity-0 scale-75 pointer-events-none duration-500' // Punchy and quick disappear
                  : 'opacity-100 scale-100 duration-700'; // Longer duration allows the movement animation to look smoother

                // The 'translate' class is crucial for forcing the browser to animate the position change smoothly
                // when its neighbors disappear.
                const positionClasses = isFinalState && isChannelSelected
                  ? 'justify-self-start' // Adjusts its position/span in the new (smaller) grid
                  : 'col-span-1';

                return (
                  <div
                    key={idx}
                    // Apply transition-all on every item
                    className={`
        flex items-center justify-center gap-3 px-3 rounded-lg leading-none border-2 border-white text-xs leading-tight min-h-[40px] 
        transition-all ease-in-out transform 
        ${baseClasses} 
        ${animationClasses} 

      `}
                    onClick={() => (appState === 'picking' || appState === 'start') && toggleSelection('CHANNELS', channel)}
                  >
                    <img src={channelIcons(channel)} alt={channel} className="w-6 h-6" />
                    {channel}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Digital Engagement Hub */}
          <div className="bg-[#111] p-4 rounded-xl flex items-center justify-between space-x-4">
            <h3 className="text-sm font-semibold text-[#9FE779] ">
              DIGITAL<br />ENGAGEMENT<br />HUB
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {digitalEngagement.map((section, idx) => (
                <div key={idx} className={`flex items-center justify-center text-center  px-3 leading-none rounded-lg border-2 ${appState === 'start' ? `bg-[#232228] border-white` : `bg-[#181818] border-transparent`} text-xs min-h-[40px] ${isSelected('DIGITAL ENGAGEMENT HUB', section.title) ? 'clicked' : ''}
                transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] shadow-md  
                `}
                  onClick={() => toggleSelection('DIGITAL ENGAGEMENT HUB', section.title)}
                >
                  {section.title}
                </div>
              ))}
            </div>
          </div>

          {/* APIs Section */}
          <div className="bg-[#111] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#9FE779] mb-5">APIs</h3>
            <div className="mb-6">
              <LineSvg title={"API Gateway"} />
            </div>

            <div className={`w-full flex justify-center gap-5`}>

              {/* Trade Finance */}
              {
                (((appState === 'selected' || appState === 'confirmed') && selections['TRADE FINANCE'].length > 0) || (appState === 'picking' || appState === 'start')) &&
                <ProductSection
                  title="TRADE FINANCE"
                  subheading="PRODUCT WORKFLOW & PROCESS ORCHESTRATION"
                  itemsList={tradeFinanceItems}
                  selectedItems={selections['TRADE FINANCE']}
                  onItemClick={item => toggleSelection('TRADE FINANCE', item)}
                  appState={appState}
                  color="blue"
                />}

              {/* Cash Management */}
              {
                (((appState === 'selected' || appState === 'confirmed') && selections['CASH MANAGEMENT SYSTEMS'].length > 0) || (appState === 'picking' || appState === 'start')) &&
                <ProductSection
                  title="CASH MANAGEMENT SYSTEMS"
                  subheading="PRODUCT WORKFLOW & PROCESS ORCHESTRATION"
                  itemsList={cashManagementItems}
                  selectedItems={selections['CASH MANAGEMENT SYSTEMS']}
                  onItemClick={item => toggleSelection('CASH MANAGEMENT SYSTEMS', item)}
                  appState={appState}
                  color="brown"
                />
              }
              {/* Supply Chain Finance */}
              {
                (((appState === 'selected' || appState === 'confirmed') && selections['SUPPLY CHAIN FINANCE'].length > 0) || (appState === 'picking' || appState === 'start')) &&
                <ProductSection
                  title="SUPPLY CHAIN FINANCE"
                  subheading="PRODUCT FACTORY"
                  itemsList={supplyChainItems}
                  selectedItems={selections['SUPPLY CHAIN FINANCE']}
                  onItemClick={item => toggleSelection('SUPPLY CHAIN FINANCE', item)}
                  appState={appState}
                  color="green"
                />
              }
            </div>

            {/* Common Layer */}
            <div className="bg-[#232228] p-4 rounded-xl flex items-center justify-between space-x-4 mt-2">
              <h4 className="text-sm font-semibold text-[#9FE779] mb-4">COMMON LAYER</h4>
              <div className="flex-1 flex flex-no-wrap gap-3">
                {commonLayerItems.map((item, idx) => (
                  <div key={idx}
                    onClick={() => toggleSelection('COMMON LAYER', item)}
                    className={`flex items-center justify-center gap-3 text-center ${appState === 'start' ? `bg-[#111] border-white` : `bg-[#181818] border-transparent`} 
                    ${(appState === 'picking' && (item === 'FEES' || item === 'CUSTOMERS' || item === 'REPORTING' || item === 'POSTING')) ? `bg-[#111] border-white` : ""}
                    ${(appState === 'selected' || appState === 'confirmed') && (item === 'FEES' || item === 'CUSTOMERS' || item === 'REPORTING' || item === 'POSTING') && !isSelected('COMMON LAYER', item) ? `opacity-0 hidden` : ""} 
                     px-3 rounded-lg leading-none border-2 text-xs min-h-[40px] ${isSelected('COMMON LAYER', item) ? 'clicked' : ''
                      }`}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Data Layer */}
            <div className="bg-[#232228] p-4 rounded-xl flex items-center justify-between space-x-4 mt-2">
              <h4 className="text-sm font-semibold text-[#9FE779] mb-4">DATA LAYER</h4>
              <div className="flex-1 flex gap-3">
                {dataLayerItems.map((item, idx) => (
                  <div key={idx}
                    onClick={() => toggleSelection('DATA LAYER', item)}
                    className={`flex items-center justify-center  ${appState === 'start' ? `bg-[#111] border-white` : `bg-[#181818] border-transparent`} px-4 rounded-lg border-2 leading-none text-xs min-h-[40px] ${isSelected('DATA LAYER', item) ? 'clicked' : ''
                      }`}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <LineSvg title={"System API"} />

          {/* Core Platforms */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#111] p-4 rounded-xl ">
              <h3 className="text-sm font-semibold text-[#9FE779] mb-4">GROUP CORE PLATFORMS</h3>
              <div className="grid grid-cols-5 gap-2">
                {leftPlatforms.map((platform, idx) => (
                  <div key={idx}
                    onClick={() => toggleSelection('GROUP CORE PLATFORMS', platform)}
                    className={`flex items-center justify-center ${appState === 'start' ? `bg-[#232228] border-white` : `bg-[#181818] border-transparent`} px-3 rounded-lg border-2 leading-none text-xs min-h-[40px] ${isSelected('GROUP CORE PLATFORMS', platform) ? 'clicked' : ''
                      }`}>
                    {platform}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#111] p-4 rounded-xl ">
              <h3 className="text-sm font-semibold text-[#9FE779] mb-4">GROUP CORE PLATFORMS</h3>
              <div className="grid grid-cols-4 gap-2">
                {rightPlatforms.map((platform, idx) => (
                  <div key={idx}
                    onClick={() => toggleSelection('GROUP CORE PLATFORMS', platform)}
                    className={`flex items-center justify-center text-center ${appState === 'start' ? `bg-[#232228] border-white` : `bg-[#181818] border-transparent`} px-3 rounded-lg border-2 leading-none text-xs min-h-[40px] ${isSelected('GROUP CORE PLATFORMS', platform) ? 'clicked' : ''
                      }`}>
                    {platform}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - External Systems */}
        <div className="w-[211px] flex items-start gap-3 h-[100%]">
          <div className="flex-shrink-0 w-[1px]">
            <LineSvg title={"System API"} tilt="khadaHai" />
          </div>
          <div className="min-w-[170px] max-w-[170px] space-y-2 bg-[#111] p-3 space-y-6 rounded-xl max-h-[100%]">
            <h3 className="text-sm font-semibold text-[#9FE779] mb-4 ">
              EXTERNAL<br />SYSTEMS
            </h3>
            {externalSystems.map((item, idx) => (
              <div key={idx} className={`${appState === 'start' ? `bg-[#232228] border-white` : `bg-[#181818] border-transparent`} px-4 rounded-lg border-2  text-xs min-h-[40px] flex items-center transition-all duration-1200 [transition-timing-function:cubic-bezier(0.4,2,0.3,1)]`}
                onClick={() => openSidebar(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Thank You Page */}
      {showThankYou && thankYouData && (
        <ThankYouPage
          email={thankYouData.email}
          imageId={thankYouData.imageId}
          imageUrl={thankYouData.imageUrl}
          onBackToArchitecture={handleBackToArchitecture}
        />
      )}

    </div>
  );
};

export default FinancialArchitecture;