import LineSvg from "../line-svg/LineSvg";

const FinancialArchitecture = () => {
  const channels = ['WEB', 'MOBILE', 'API', 'H2H', 'CHATBOT', 'BRANCHES'];

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
  
  const digitalEngagement = [
    { title: 'CUSTOMER ONBOARDING', items: ['TWO FACTOR AUTHENTICATION'] },
    { title: 'PRODUCT ONBOARDING', items: ['APPLICATION FORMS'] },
    { title: 'ENTITLEMENT SETUP', items: ['DOCUMENT UPLOADS'] },
    { title: 'MASTER SETUP', items: ['COMMUNICATIONS'] },
    { title: 'PRE-CHECKERS (LIMIT ETC)', items: ['REPORTS'] },
    { title: 'FX & RATES', items: ['DASHBOARD & WIDGETS'] }
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

  return (
    <div className="min-h-screen text-white p-6">
      {/* Header */}
        <div className="flex items-center justify-between mb-5">
        <div className="flex-1 flex items-center justify-center space-x-4 font-bold text-[40px] leading-tight tracking-[-0.25px] uppercase">
            <img src="/assets/logo.svg" alt="VeeFin" width={170} height={50} />
            <h1 className="text-4xl font-bold text-[#27A689]">
            4.0 WORKING CAPITAL ON A SINGLE CHASSIS
            </h1>
        </div>
        <button className="bg-[#27A689] gap-2.5 rotate-0 opacity-100 pt-5 pr-[30px] pb-5 pl-[30px] rounded-lg ">
            <span className="font-arial font-bold text-base leading-none tracking-[-0.25px] uppercase">BUILD MY OWN ARCHITECTURE</span>
        </button>
        </div>

      <div className="grid grid-cols-[170px_1fr_211px] gap-4">
        {/* Left Sidebar - Common Capabilities */}
        <div className="w-[170px] space-y-2 bg-[#111] p-3 space-y-6 rounded-xl">
          <h3 className="text-sm font-semibold text-[#9FE779] mb-4 ">
            COMMON<br />OPERATIONAL<br />CAPABILITIES
          </h3>
          {commonCapabilities.map((item, idx) => (
            <div key={idx} className="bg-[#232228] py-1 px-3 rounded-lg border-2 border-white text-[13px]">
              {item}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-[1440px] space-y-6">
          {/* Channels */}
          <div className="bg-[#111] p-4 rounded-xl flex items-center justify-between space-x-4">
            <h3 className="text-sm font-semibold text-[#9FE779] ">CHANNELS</h3>
            <div className="flex-1 grid grid-cols-6 gap-2">
              {channels.map((channel, idx) => (
                <div key={idx} className="flex items-center justify-center gap-3 bg-[#232228] py-1 px-3 rounded-lg border-2 border-white text-[13px]">
                  <img  src= {channelIcons(channel)} alt={channel} className="w-6 h-6" />
                  {channel}
                </div>
              ))}
            </div>
          </div>

          {/* Digital Engagement Hub */}
          <div>
            <h3 className="text-sm font-semibold text-teal-400 mb-3">
              DIGITAL<br />ENGAGEMENT<br />HUB
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {digitalEngagement.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="bg-gray-700 rounded px-3 py-2 text-xs font-semibold text-center">
                    {section.title}
                  </div>
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-center">
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* APIs Section */}
          <div className="bg-gray-800 border-2 border-gray-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-center mb-4">APIs</h3>
            <LineSvg title={"API Gateway"} />
            
            <div className="grid grid-cols-3 gap-4">
              {/* Trade Finance */}
              <div className="bg-teal-800 rounded-lg p-4">
                <h4 className="font-semibold text-center mb-2">TRADE FINANCE</h4>
                <p className="text-xs text-center mb-3">PRODUCT WORKFLOW & PROCESS ORCHESTRATION</p>
                <div className="space-y-1">
                  {tradeFinanceItems.map((item, idx) => (
                    <div key={idx} className="bg-gray-800 rounded px-2 py-1 text-xs text-center">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cash Management */}
              <div className="bg-teal-800 rounded-lg p-4">
                <h4 className="font-semibold text-center mb-2">CASH MANAGEMENT SYSTEMS</h4>
                <p className="text-xs text-center mb-3">PRODUCT WORKFLOW & PROCESS ORCHESTRATION</p>
                <div className="space-y-1">
                  {cashManagementItems.map((item, idx) => (
                    <div key={idx} className="bg-gray-800 rounded px-2 py-1 text-xs text-center">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Supply Chain Finance */}
              <div className="bg-teal-800 rounded-lg p-4">
                <h4 className="font-semibold text-center mb-2">SUPPLY CHAIN FINANCE</h4>
                <p className="text-xs text-center mb-3">PRODUCT FACTORY</p>
                <div className="space-y-1">
                  {supplyChainItems.map((item, idx) => (
                    <div key={idx} className="bg-gray-800 rounded px-2 py-1 text-xs text-center">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Common Layer */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-teal-400 mb-2">COMMON LAYER</h4>
              <div className="grid grid-cols-12 gap-1">
                {commonLayerItems.map((item, idx) => (
                  <div key={idx} className="bg-gray-700 rounded px-2 py-1 text-xs text-center">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Data Layer */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-teal-400 mb-2">DATA LAYER</h4>
              <div className="grid grid-cols-8 gap-1">
                {dataLayerItems.map((item, idx) => (
                  <div key={idx} className="bg-gray-700 rounded px-2 py-1 text-xs text-center">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Platforms */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-teal-400 mb-3">GROUP CORE PLATFORMS</h3>
              <div className="grid grid-cols-5 gap-2">
                {leftPlatforms.map((platform, idx) => (
                  <div key={idx} className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-xs text-center">
                    {platform}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-teal-400 mb-3">GROUP CORE PLATFORMS</h3>
              <div className="grid grid-cols-4 gap-2">
                {rightPlatforms.map((platform, idx) => (
                  <div key={idx} className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-xs text-center">
                    {platform}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - External Systems */}
        <div className="w-[211px] space-y-2 bg-[#111] p-3 space-y-6 rounded-xl">
          <h3 className="text-sm font-semibold text-[#9FE779] mb-4">
            EXTERNAL<br />SYSTEMS
          </h3>
          {externalSystems.map((item, idx) => (
            <div key={idx} className="bg-[#232228] py-1 px-3 rounded-lg border-2 border-white text-[13px]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialArchitecture;