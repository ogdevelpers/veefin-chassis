"use client";
import { useRef, useState } from "react";
import LineSvg from "../line-svg/LineSvg";
import ProductSection from "./ProductSection";
import { AppState } from "@/lib/constants";
import MyModal from "../modal/modal";
import EmailFormModal from "../email-form/EmailForm"; 
import { toPng } from 'html-to-image';



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
  'ENTITLEMENT', 'FEE CONVERTER', 'REPORTING', 'POSTING'
];

const dataLayerItems = [
  'PRODUCT DATA', 'CUSTOMER DATA', 'LOGO DATA', 'TRANSACTIONAL DATA',
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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const [selections, setSelections] = useState<Record<string, string[]>>({
    'CHANNELS': [],
    'DIGITAL ENGAGEMENT HUB': [],
    'TRADE FINANCE': [],
    'CASH MANAGEMENT SYSTEMS': [],
    'SUPPLY CHAIN FINANCE': [],
    'COMMON LAYER': [],
    'DATA LAYER': [],
    'GROUP CORE PLATFORMS LEFT': [],
    'GROUP CORE PLATFORMS RIGHT': []
  });


  const handleButtonClick = async () => {
    if (appState === 'start') {
      setAppState('picking');
    }
    else if (appState === 'picking') {
      setAppState('selected');
 
      const png = await toPng(targetRef.current as HTMLElement, {
        backgroundColor: "#232228",
        width: 1920,
        height:1080,

      });
      const link = document.createElement("a");
      link.href = png;
      link.download = "financial-architecture.png";
      link.click();
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
        'DIGITAL ENGAGEMENT HUB': [],
        'TRADE FINANCE': [],
        'CASH MANAGEMENT SYSTEMS': [],
        'SUPPLY CHAIN FINANCE': [],
        'COMMON LAYER': [],
        'DATA LAYER': [],
        'GROUP CORE PLATFORMS LEFT': [],
        'GROUP CORE PLATFORMS RIGHT': []
      });
    }
  }

  //  After a successfull entry to db, reset app. 
  const handleReset = () => {
    setAppState('start');
    setSelections({
      'CHANNELS': [],
      'DIGITAL ENGAGEMENT HUB': [],
      'TRADE FINANCE': [],
      'CASH MANAGEMENT SYSTEMS': [],
      'SUPPLY CHAIN FINANCE': [],
      'COMMON LAYER': [],
      'DATA LAYER': [],
      'GROUP CORE PLATFORMS LEFT': [],
      'GROUP CORE PLATFORMS RIGHT': []
    });
    handleCloseModal();
  }

  const toggleSelection = (category: string, item: string) => {
    console.log('Toggling selection for', category, item, selections);
    if (appState === 'start') {
      // Open modal with details
      setModalContent({
        title: item,
        content: `Detailed information about ${item} will be displayed here.`
      });
      handleOpenModal();
      return;
    }
    if (appState !== 'picking') {
      return;
    }

    // start picking state
    if (category === 'CHANNELS') {
      setSelections(prev => ({
        ...prev,
        [category]: [item] // Only one selection allowed
      }));
      return;
    }

    // now we know its not channels
    if(selections['CHANNELS'].length === 0){
      return;
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

  return (
    <div className="min-h-screen max-h-screen  text-white p-6 flex flex-col" ref={targetRef}>
      <MyModal isOpen={isModalOpen} onClose={handleCloseModal} title={modalContent.title || 'Veefin'}>
        {appState === 'selected' || appState === 'confirmed' ?
          (<EmailFormModal selections={selections} handleReset={handleReset} />) :
          (
            <p className="text-gray-300">
              {modalContent.content || 'Detailed information about the selected item will be displayed here.'}
            </p>
          )
        }
      </MyModal>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <div className="flex-1 flex items-center justify-center space-x-4 font-bold text-[40px] leading-tight tracking-[-0.25px] uppercase">
          <img src="/assets/logo.svg" alt="VeeFin" width={170} height={50} />
          <h1 className="text-4xl font-bold text-[#27A689]">
            4.0 WORKING CAPITAL ON A SINGLE CHASSIS
          </h1>
        </div>
        <button className="bg-[#27A689] gap-2.5 rotate-0 opacity-100 py-3 px-[30px] rounded-lg mr-4 max-w-[330px]"
          onClick={handleButtonClick}>
          <span className="font-arial font-bold text-base leading-none tracking-[-0.25px] uppercase">
            {resolveButtonText(appState)}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-[170px_1fr_211px] gap-3 min-h-0">
        {/* Left Sidebar - Common Capabilities */}
        <div className="min-w-[170px] max-w-[170px] space-y-2 bg-[#111] p-3 space-y-6 rounded-xl max-h-[100%]">
          <h3 className="text-sm font-semibold text-[#9FE779] mb-4 ">
            COMMON<br />OPERATIONAL<br />CAPABILITIES
          </h3>
          {commonCapabilities.map((item, idx) => (
            <div key={idx} className={`${appState === 'start' ? `bg-[#232228] border-white` : `bg-[#181818] border-transparent`} px-4 rounded-lg border-2  text-xs min-h-[40px] flex items-center`}>
              {item}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-[1440px] space-y-3 h-[100vh] min-h-[100%] overflow-y-hidden">
          {/* Channels */}
          <div className="bg-[#111] p-4 rounded-xl flex items-center justify-between space-x-4">
            <h3 className="text-sm font-semibold text-[#9FE779] ">CHANNELS</h3>
            <div className="flex-1 grid grid-cols-6 gap-2">
              {(appState === 'selected' || appState === 'confirmed') &&  
                <div className="flex items-center justify-center gap-3 clicked px-3 rounded-lg leading-none border-2 border-white text-xs leading-tight min-h-[40px]">
                  <img src={channelIcons(selections['CHANNELS'][0])} alt={selections['CHANNELS'][0]} className="w-6 h-6" />
                  {selections['CHANNELS'][0]}
                </div>
              }
              { (appState === 'picking' || appState === 'start') &&
              channels.map((channel, idx) => (
                <div key={idx} className={`flex items-center justify-center gap-3 bg-[#232228] px-3 rounded-lg leading-none border-2 border-white text-xs leading-tight min-h-[40px] ${isSelected('CHANNELS', channel) ? 'clicked' : ''}`}
                  onClick={() => toggleSelection('CHANNELS', channel)}
                >
                  <img src={channelIcons(channel)} alt={channel} className="w-6 h-6" />
                  {channel}
                </div>
              ))}
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

            <div className="grid grid-cols-3 gap-4">

              {/* Trade Finance */}
              <ProductSection
                title="TRADE FINANCE"
                subheading="PRODUCT WORKFLOW & PROCESS ORCHESTRATION"
                itemsList={tradeFinanceItems}
                selectedItems={selections['TRADE FINANCE']}
                onItemClick={item => toggleSelection('TRADE FINANCE', item)}
                appState={appState}

              />

              {/* Cash Management */}
              <ProductSection
                title="CASH MANAGEMENT SYSTEMS"
                subheading="PRODUCT WORKFLOW & PROCESS ORCHESTRATION"
                itemsList={cashManagementItems}
                selectedItems={selections['CASH MANAGEMENT SYSTEMS']}
                onItemClick={item => toggleSelection('CASH MANAGEMENT SYSTEMS', item)}
                appState={appState}
              />

              {/* Supply Chain Finance */}
              <ProductSection
                title="SUPPLY CHAIN FINANCE"
                subheading="PRODUCT FACTORY"
                itemsList={supplyChainItems}
                selectedItems={selections['SUPPLY CHAIN FINANCE']}
                onItemClick={item => toggleSelection('SUPPLY CHAIN FINANCE', item)}
                appState={appState}
              />
            </div>

            {/* Common Layer */}
            <div className="bg-[#232228] p-4 rounded-xl flex items-center justify-between space-x-4 mt-2">
              <h4 className="text-sm font-semibold text-[#9FE779] mb-4">COMMON LAYER</h4>
              <div className="flex-1 flex flex-no-wrap gap-3">
                {commonLayerItems.map((item, idx) => (
                  <div key={idx}
                    onClick={() => toggleSelection('COMMON LAYER', item)}
                    className={`flex items-center justify-center gap-3 text-center ${appState === 'start' ? `bg-[#111] border-white` : `bg-[#181818] border-transparent`} px-3 rounded-lg leading-none border-2 text-xs min-h-[40px] ${isSelected('COMMON LAYER', item) ? 'clicked' : ''
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
            <div key={idx} className={`${appState === 'start' ? `bg-[#232228] border-white` : `bg-[#181818] border-transparent`} px-4 rounded-lg border-2  text-xs min-h-[40px] flex items-center`}>
              {item}
            </div>
          ))}
        </div>
        </div>

      </div>


    </div>
  );
};

export default FinancialArchitecture;