export type AppState = 'start' | 'picking' | 'selected' | 'confirmed';

export type veefinSchema = {
    username: string;
    email: string;
    companyname: string;
    selections: Record<string, string[]>;
}

export const sidebarContentMapper: { [key: string]: { title: string; content: string } } = {
    "IMPORT LC": {
        title: "Import LC",
        content: `An Import Letter of Credit (Import LC) is a widely used trade finance instrument that helps international buyers and sellers conduct business securely. It is essentially a guarantee issued by the importer’s bank on behalf of the importer (buyer) in favor of the exporter (seller). The guarantee ensures that the exporter will be paid the agreed amount, provided that they submit the required shipping and commercial documents that comply with the terms and conditions outlined in the LC.

Here’s how it works: when an importer agrees to purchase goods from a foreign supplier, the supplier wants assurance of payment since cross-border transactions carry risks like non-payment, currency fluctuations, or political instability. To resolve this, the importer asks their bank to issue an Import LC. The bank then promises payment to the exporter once the exporter provides the correct documents (like the bill of lading, invoice, packing list, and certificate of origin). Importantly, banks deal with documents, not the actual goods, meaning payment is tied to proper paperwork rather than physical inspection.

For the importer, an LC builds trust with suppliers and enables smoother trade, sometimes even with longer credit terms. For the exporter, it reduces the risk of default, since the payment obligation shifts from the buyer to a reliable bank. However, Import LCs involve costs such as bank fees, and strict compliance with documentation is crucial—any discrepancy can delay or prevent payment.

In short, Import LC balances trust in international trade by protecting both buyers and sellers while routing obligations through banks.

Would you like me to also sketch a simple flow diagram of how Import LC transactions work? That often makes the process clearer.`
    },
    "SSO": {
        title: "Single Sign-On (SSO)",
        content: `
        Brief Description: Unified authentication gateway enabling users to access all Veefin
modules—Trade Finance, SCF, Cash Management—with one set of credentials, eliminating
password fatigue and reducing helpdesk overhead.
Core Features & Bank Significance: • Seamless integration with bank's existing identity
providers (Active Directory, LDAP, OAuth2/OIDC) • Reduces onboarding friction for relationship
managers accessing multiple product workflows • Centralized session management preventing
unauthorized access across distributed microservices
AI-Powered Capabilities: • Behavioral biometrics analyzing login patterns to detect account
compromise attempts • Adaptive authentication adjusting security requirements based on risk
scores (location, device, time)
Business Impact: • Reduce IT support costs by 40% through elimination of password reset
requests • Ensure compliance with PCI DSS and SOX through centralized access audit trails
        `
    },
    "MULTI-LINGUAL": {
        title: "Multi-Lingual Support",
        content: `
        Brief Description: Native support for 15+ languages enabling banks to deploy Veefin platforms
across geographically diverse markets without custom development, accelerating regional
expansion.
Core Features & Bank Significance: • Dynamic UI translation covering Trade Finance
documentation, SCF workflows, and payment instructions • Right-to-left (RTL) language support
for Middle Eastern markets • Currency, date, and number format localization aligned with
regional banking standards
AI-Powered Capabilities: • NLP-based contextual translation ensuring financial terminology
accuracy across languages • Auto-detection of user language preference from browser settings
and transaction history
Business Impact: • Accelerate market entry by 60% through out-of-the-box localization for new
geographies • Improve user adoption rates in non-English markets through native language
interfaces`
    },
    "PURGING": {
        title: "Purging",
        content: `
        THE CHALLENGE • Banks accumulate petabytes of transactional data over decades, inflating
storage costs and degrading query performance • Manual data retention policies create
compliance risks when sensitive customer data is retained beyond regulatory limits • Legacy
purging scripts cause database locks during business hours, impacting transaction processing
THE SOLUTION • Intelligent Data Lifecycle Management with configurable retention policies
by data type (transactional logs: 7 years, audit trails: 10 years, temp tables: 90 days) •
Non-Blocking Archival Engine executing incremental purges during off-peak hours without
impacting live operations • Compliance-Driven Automation aligning with GDPR "right to be
forgotten," RBI data localization, and Basel retention mandates
AI-POWERED CAPABILITIES • Predictive Storage Optimization forecasting database growth
patterns and recommending proactive archival schedules • Sensitive Data Discovery using ML
classifiers to identify PII/PCI data requiring priority purging post-retention expiry
BUSINESS IMPACT • Reduce cloud storage costs by 35% through automated archival of
dormant transactional data • Ensure regulatory compliance with audit-ready proof of data
deletion adhering to retention policies`
    },
    "AUDIT": {
        title: "AUDIT",
        content: `
        THE CHALLENGE • Regulators demand complete visibility into every system action—who
changed what, when, and why—across distributed microservices • Manual audit log collection
from disparate systems creates gaps, making fraud investigations and compliance reviews
time-intensive • Immutable audit requirements under SOX and Basel frameworks necessitate
tamper-proof logging infrastructure
THE SOLUTION • Centralized Audit Trail Repository capturing every API call, data mutation,
approval action, and configuration change across all microservices • Immutable Event
Logging with cryptographic hashing ensuring audit records cannot be altered post-creation •
Role-Based Audit Access enabling compliance officers to query logs while preventing
tampering by administrators
AI-POWERED CAPABILITIES • Anomaly-Based Fraud Detection flagging unusual patterns
such as after-hours approvals, bulk limit modifications, or privilege escalations • Intelligent
Audit Summarization generating natural language reports from raw logs for regulator
submissions
BUSINESS IMPACT • Accelerate compliance audits by 70% with instant retrieval of transaction
lineage and approval workflows • Mitigate fraud risk through real-time alerts on suspicious
administrative actions or policy violations
        `
    },
    "ARCHIVAL": {
        title: "ARCHIVAL",
        content: `
        Brief Description: Automated long-term storage solution moving dormant transactional data
from hot databases to cost-effective cold storage while maintaining instant retrieval for audit
requests.
Core Features & Bank Significance: • Tiered storage architecture (hot → warm → cold)
optimizing cost-to-access ratios • Seamless retrieval APIs enabling compliance officers to fetch
archived records without IT intervention • Regulatory-aligned retention schedules for trade
documents, payment instructions, and limit histories
AI-Powered Capabilities: • Predictive archival triggers analyzing data access patterns to
determine optimal migration timing • Intelligent compression algorithms reducing archive storage
footprint by 80% without data loss
Business Impact: • Cut database infrastructure costs by 50% through migration of 5+ year-old
data to cold storage • Maintain 100% audit readiness with sub-second retrieval of archived
records
        `
    },
    "MULTI-ENTITY": {
        title: "MULTI-ENTITY",
        content: `
        Brief Description: Native support for banks operating subsidiary entities (retail bank,
investment arm, microfinance unit) to manage separate legal entities within a unified platform
while maintaining data isolation.
Core Features & Bank Significance: • Entity-level segregation of customer data, limits, and
workflows ensuring regulatory compliance • Consolidated group-level reporting for parent bank
visibility into subsidiary exposures • Cross-entity limit hierarchies enabling parent-subsidiary
credit structures
AI-Powered Capabilities: • Cross-entity risk aggregation detecting concentration exposures
across subsidiaries • Smart entity mapping recommendations during customer onboarding
based on business attributes
Business Impact: • Enable multi-brand banking strategies without deploying separate platforms
per entity • Ensure regulatory compliance with entity-specific data residency and reporting
requirements`
    },
    "MULTI-TENANCY": {
        title: "MULTI-TENANCY",
        content: `
        THE CHALLENGE: • Banks managing multiple business units (corporate banking, MSME, retail)
face infrastructure duplication costs when deploying separate instances • Shared infrastructure
models risk data leakage between tenants, violating compliance mandates • Scaling
infrastructure per tenant creates operational complexity and version management nightmares
THE SOLUTION: • Secure Tenant Isolation with database-level segregation ensuring zero data
leakage between business units • Elastic Resource Allocation dynamically provisioning
compute and storage based on per-tenant transaction volumes • Centralized Configuration
Management enabling tenant-specific workflow customizations without codebase forks
AI-POWERED CAPABILITIES: • Intelligent Tenant Scaling predicting peak load times per
business unit and auto-provisioning resources preemptively • Cross-Tenant Benchmarking
providing anonymized performance metrics helping units optimize operational efficiency
BUSINESS IMPACT: • Reduce infrastructure costs by 60% through shared multi-tenant
deployment versus isolated instances • Accelerate new business unit onboarding from months
to days with tenant provisioning automation
`
    },
    "DB AGNOSTIC DESIGN": {
        title: "DB AGNOSTIC DESIGN",
        content: `
        Brief Description: Platform independence enabling banks to deploy Veefin on their preferred
database (Oracle, PostgreSQL, MySQL, SQL Server) without vendor lock-in or performance
degradation.
Core Features & Bank Significance: • Abstraction layer ensuring consistent query
performance across database engines • Migration tooling supporting seamless transitions
between databases without downtime • Optimized query patterns leveraging database-specific
features (partitioning, indexing)
AI-Powered Capabilities: • Query optimizer analyzing execution plans and recommending
database-specific performance tuning • Predictive migration assessment flagging potential
compatibility issues before database switches
Business Impact: • Eliminate vendor lock-in enabling banks to negotiate favorable licensing
terms • Future-proof architecture supporting cloud-native databases as institutions migrate to
AWS/Azure
        `
    },
    "CLOUD AGNOSTIC DESIGN": {
        title: "CLOUD AGNOSTIC DESIGN",
        content: `
        Brief Description: Infrastructure portability supporting deployment across AWS, Azure, GCP, or
on-premises data centers without architectural redesign, protecting banks from cloud vendor
lock-in.
Core Features & Bank Significance: • Containerized microservices (Docker/Kubernetes)
ensuring consistent behavior across cloud providers • Cloud-neutral storage APIs abstracting
S3/Blob/GCS differences • Multi-cloud disaster recovery enabling failover between providers
during outages
AI-Powered Capabilities: • Cost optimization engine comparing pricing across clouds and
recommending workload placement • Intelligent geo-distribution balancing latency, data
residency laws, and infrastructure costs
Business Impact: • Reduce cloud costs by 25% through multi-cloud arbitrage and reserved
instance optimization • Ensure business continuity with cross-cloud failover eliminating
single-provider dependency
        `
    },
    "EXCEPTION HANDLING": {
        title: "EXCEPTION HANDLING",
        content: `
        THE CHALLENGE: • System failures during payment processing or limit checks leave
transactions in limbo, requiring manual investigation • Unhandled exceptions cascade across
microservices causing widespread outages • Lack of intelligent retry logic forces operations
teams to manually reprocess failed transactions
THE SOLUTION: • Circuit Breaker Patterns isolating failures preventing cascading outages
across dependent services • Dead Letter Queue Management capturing failed messages with
automated retry policies and escalation workflows • Graceful Degradation ensuring core
functions remain operational even when non-critical services fail
AI-POWERED CAPABILITIES: • Root Cause Analysis Automation using ML to correlate
exception patterns and identify systemic issues • Predictive Failure Detection analyzing
service health metrics to preemptively restart degrading components
BUSINESS IMPACT: • Improve system availability from 99.5% to 99.99% through intelligent
failure isolation • Reduce MTTR (Mean Time To Recovery) by 80% with automated exception
resolution workflows
        `
    },
    "GLOBAL SEARCH ENGINE": {
        title: "GLOBAL SEARCH ENGINE",
        content: `
        Brief Description: Enterprise-wide search capability enabling users to instantly locate
customers, transactions, limits, documents, or audit entries across all microservices from a
single search bar.
Core Features & Bank Significance: • Full-text indexing of structured data (customer IDs,
transaction references) and unstructured documents (trade invoices, contracts) • Federated
search querying across Trade Finance, SCF, Cash Management, and Common Layer
microservices • Role-based result filtering ensuring users only see data within their authorization
scope
AI-Powered Capabilities: • Natural language query understanding (e.g., "show all rejected
L/Cs for ABC Corp last month") • Semantic search surfacing contextually related records
beyond exact keyword matches
Business Impact: • Reduce customer service resolution time by 60% through instant access to
complete transaction history • Improve compliance investigation efficiency with rapid retrieval of
audit trails and supporting documents
        `
    },
    "INTEGRATOR": {
        title: "INTEGRATOR",
        content: `
        Brief Description: Pre-built connector framework accelerating integration with external systems
(core banking, ERP, payment networks) through standardized APIs and transformation layers,
eliminating custom integration development.
Core Features & Bank Significance: • 50+ out-of-the-box connectors for common banking
systems (Finacle, Flexcube, SAP, Temenos) • Protocol abstraction supporting REST, SOAP,
FTP, MQ, and Host-to-Host connectivity • Low-code integration designer enabling business
analysts to configure mappings without coding
AI-Powered Capabilities: • Smart field mapping suggestions analyzing source/target schemas
and recommending transformations • Integration health monitoring predicting connector failures
based on error rate trends
Business Impact: • Accelerate go-live timelines by 50% through elimination of custom
integration code • Reduce integration maintenance costs by 70% with centralized connector
management
        `
    },
    "default": {
        title: "Default Title",
        content: "Default content. Detailed information will be displayed here."
    }
}