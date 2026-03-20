export interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "true_false" | "select_all" | "matching" | "ordering" | "free_response" | "scenario";
  question: string;
  options?: string[];
  correct?: number | number[] | boolean;
  correct_order?: number[];
  pairs?: { term: string; definition: string }[];
  items?: string[];
  explanation: string;
  sample_answer?: string;
  grading_criteria?: string;
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string; // HTML content
}

export interface Module {
  id: number;
  title: string;
  estimatedTime: string;
  sections: ModuleSection[];
  quiz: QuizQuestion[];
}

export const modules: Module[] = [
  {
    id: 1,
    title: "What is NationGraph",
    estimatedTime: "30 min",
    sections: [
      {
        id: "1.1",
        title: "Company Overview",
        content: `<p>NationGraph is a <strong>procurement intelligence platform built specifically for SLED sellers</strong> (State, Local government, and Education). It unifies public-sector data and sales signals into a single workflow so reps can:</p>
<ul>
<li>Spot emerging opportunities before competitors</li>
<li>Identify the right decision-makers with verified contact info</li>
<li>Launch outreach from one place — no tool-hopping</li>
</ul>
<p>NationGraph is an <strong>AI-powered platform</strong> designed to streamline public sector sales by providing comprehensive procurement intelligence. It makes life easier for businesses selling to the government by providing AI-powered insights and automation that streamline the traditionally slow, complex, and research-intensive public sector sales process.</p>`
      },
      {
        id: "1.2",
        title: "Key Differentiators (Why We Win)",
        content: `<ol>
<li><strong>Bottom-up, not top-down:</strong> Competitors asked vendors what they want. NationGraph asked decision-makers what they look for during the buying cycle and what actually helps vendors win. Our workflows mirror real public-sector evaluation and purchasing behavior.</li>
<li><strong>Early indicators, not last-minute alerts:</strong> We surface <strong>pre-RFP signals</strong> so you can build a relationship before the RFP drops — rather than chasing postings that go live today or next week.</li>
<li><strong>End-to-end in one flow:</strong> Signals → decision-maker contacts (verified) → guided outreach — no tool-hopping between multiple platforms.</li>
<li><strong>FOIA at scale:</strong> Our data team files <strong>~10,000 FOIAs per week</strong>, and FOIAs are free for customers when records aren't already public.</li>
</ol>`
      },
      {
        id: "1.3",
        title: "Platform Capabilities",
        content: `<h4>1) Unified Intelligence Hub</h4>
<p>Work across States, Counties, Municipalities, K-12, Higher Ed, Police, Special Districts, and Agencies — with territory, population, competitor, and product/service filters to focus on the right institutions.</p>

<h4>2) Live Signals (with early buying intent)</h4>
<p>See activity that precedes purchase decisions:</p>
<ul>
<li>Competitor contract/renewal dynamics (displacement windows)</li>
<li>Meeting minutes & transcripts mentioning your category or competitors</li>
<li>RFPs & pre-solicitation breadcrumbs</li>
<li>News / TV / Radio / Web / Social indicators of budget, urgency, or political will</li>
<li>Each signal includes an <strong>intent/relevance score</strong>, tags, and one-click actions</li>
</ul>

<h4>3) Monitors & Alerts</h4>
<p>Turn any search or pattern into a monitor. Choose cadence (instant / hourly / daily / weekly). Stay ahead of territory changes without re-running searches every morning.</p>

<h4>4) Contacts (SLED-specific enrichment + verification)</h4>
<ul>
<li>Role-matched decision-makers: names, titles, departments, emails, phones — directly in the workflow</li>
<li><strong>Built for public sector:</strong> Unlike ZoomInfo/Apollo, NationGraph focuses on SLED org charts, committees, and roles that actually influence public buying</li>
<li><strong>Fresh + always updating:</strong> Daily web scrapes on official sites plus domain matching</li>
<li><strong>Verification via ZeroBounce:</strong> Emails validated with status (valid / invalid / catch-all) and confidence score</li>
</ul>

<h4>5) Data Search + FOIA Handled For You</h4>
<ul>
<li>Search across RFPs, Purchase Orders, FOIA-related records, and media mentions</li>
<li><strong>Free FOIAs for customers:</strong> Provide the parameters and NationGraph handles the rest</li>
<li>One click opens a guided FOIA request pre-filled from your context</li>
</ul>

<h4>6) Sales-Ready Workspace</h4>
<ul>
<li>Ranks high-intent opportunities</li>
<li>"How this entity buys" cues derived from historical POs/RFPs</li>
<li>Verified contacts aligned to each opportunity</li>
<li>One-click outreach (draft email/call script, add to sequence, open in CRM)</li>
</ul>`
      },
      {
        id: "1.4",
        title: "Key Product Features Summary",
        content: `<table>
<thead><tr><th>Feature</th><th>What It Does</th></tr></thead>
<tbody>
<tr><td>Market Intelligence</td><td>Aggregates procurement data, contracts, and market signals into actionable insights</td></tr>
<tr><td>AI Contract Insights</td><td>Analyzes contract timelines, budget cycles, leadership changes, and funding updates</td></tr>
<tr><td>AI-Summarized Board Meetings</td><td>Concise summaries of public sector meetings for procurement needs</td></tr>
<tr><td>Purchase Order Database</td><td>Examine historical purchases to identify competitors, renewals, and market gaps</td></tr>
<tr><td>Budget Plans & Approvals</td><td>Access departmental budgets and approval thresholds</td></tr>
<tr><td>On-Demand Research</td><td>Anonymous research on stakeholders and sentiment via network</td></tr>
</tbody>
</table>`
      },
      {
        id: "1.5",
        title: "Quick Talk Tracks",
        content: `<p class="italic text-lg mb-4">Memorize these:</p>
<ul class="space-y-3">
<li>"We took a <strong>bottom-up approach from decision-makers</strong>, so our signals match how agencies actually buy."</li>
<li>"We surface <strong>early indicators</strong> so I can build a relationship <strong>before the RFP drops</strong>."</li>
<li>"From a signal, I see <strong>the right contacts</strong> — kept fresh by <strong>daily scrapes + domain matching</strong> and <strong>ZeroBounce-verified</strong>."</li>
<li>"If it isn't online, <strong>we get it</strong>: our data team files <strong>~10k FOIAs/week</strong>, and <strong>FOIAs are free for customers</strong>."</li>
</ul>`
      },
      {
        id: "1.6",
        title: "How NationGraph Solves Real Problems",
        content: `<table>
<thead><tr><th>Problem</th><th>Before NationGraph</th><th>With NationGraph</th></tr></thead>
<tbody>
<tr><td>Research time</td><td>Countless hours sifting through procurement websites</td><td>AI automates data gathering, summarizes key insights in one place</td></tr>
<tr><td>Finding opportunities</td><td>Struggle to identify when agencies are preparing to buy</td><td>AI analyzes historical POs, contract cycles, and leadership changes to predict needs</td></tr>
<tr><td>Knowing decision-makers</td><td>Enter sales process blind</td><td>AI-powered sentiment analysis from public records reveals who influences decisions</td></tr>
<tr><td>Budget complexity</td><td>Difficult to understand budgets and funding</td><td>Platform provides insights into budget plans, spending trends, and approval structures</td></tr>
<tr><td>Timing</td><td>Reach out too early or too late</td><td>AI tracks budget approvals, RFP timelines, and leadership shifts for optimal timing</td></tr>
<tr><td>Competition</td><td>Only access same public RFPs as everyone else</td><td>AI-powered predictions let you engage agencies before an RFP goes public</td></tr>
</tbody>
</table>`
      }
    ],
    quiz: [
      {
        id: "1.1",
        type: "multiple_choice",
        question: "What does SLED stand for in the context of NationGraph's market?",
        options: ["Software, Logistics, Engineering, Data", "State, Local government, and Education", "Sales, Leads, Enterprise, Distribution", "Systems, Licensing, Enrollment, Deployment"],
        correct: 1,
        explanation: "SLED stands for State, Local government, and Education — the three pillars of the public sector market NationGraph serves."
      },
      {
        id: "1.2",
        type: "multiple_choice",
        question: "What is NationGraph's primary approach that differentiates it from competitors?",
        options: ["Top-down approach from vendor feedback", "Bottom-up approach from decision-makers", "AI-only approach with no human input", "Enterprise-first approach targeting Fortune 500"],
        correct: 1,
        explanation: "NationGraph took a bottom-up approach, asking decision-makers what they look for during the buying cycle, rather than asking vendors what they want."
      },
      {
        id: "1.3",
        type: "multiple_choice",
        question: "Approximately how many FOIA requests does NationGraph's data team file per week?",
        options: ["~1,000", "~5,000", "~10,000", "~50,000"],
        correct: 2,
        explanation: "NationGraph's data team files approximately 10,000 FOIA requests per week for broad, fresh SLED coverage."
      },
      {
        id: "1.4",
        type: "multiple_choice",
        question: "What email verification service does NationGraph use for contact validation?",
        options: ["MailChimp Verify", "ZeroBounce", "Hunter.io", "NeverBounce"],
        correct: 1,
        explanation: "NationGraph uses ZeroBounce to validate emails and surface a status (valid / invalid / catch-all) with confidence scores."
      },
      {
        id: "1.5",
        type: "multiple_choice",
        question: "Why are NationGraph's contacts better than tools like ZoomInfo or Apollo for SLED sales?",
        options: ["They have more total contacts worldwide", "They are focused on SLED org charts, committees, and roles that influence public buying", "They are cheaper per contact", "They include personal cell phone numbers"],
        correct: 1,
        explanation: "ZoomInfo/Apollo are optimized for enterprise-to-enterprise sales. NationGraph focuses on SLED org charts, committees, and roles that actually influence public buying."
      },
      {
        id: "1.6",
        type: "true_false",
        question: "NationGraph charges customers extra for FOIA requests.",
        correct: false,
        explanation: "FOIAs are free for customers. NationGraph submits and manages FOIA requests at no cost — customers just provide the parameters."
      },
      {
        id: "1.7",
        type: "multiple_choice",
        question: "What does a 'catch-all' email status mean in NationGraph's contact verification?",
        options: ["The email is definitely valid", "The email is definitely invalid", "The .gov server accepts any address and won't confirm validity", "The email belongs to a shared department inbox"],
        correct: 2,
        explanation: "Some .gov servers accept any address (catch-all) and won't confirm validity. NationGraph labels these clearly so reps can send cautiously or route via a separate channel."
      },
      {
        id: "1.8",
        type: "free_response",
        question: "In your own words, explain the NationGraph end-to-end workflow in one sentence.",
        sample_answer: "NationGraph takes you from signal detection to verified decision-maker contacts to guided outreach — all in one platform without tool-hopping.",
        grading_criteria: "Must mention signals/intelligence, contacts, and outreach in a single flow.",
        explanation: "A strong answer covers the three phases: signal detection, contact identification, and outreach — all within one platform."
      }
    ]
  },
  {
    id: 2,
    title: "SDR Responsibilities & Performance Expectations",
    estimatedTime: "30 min",
    sections: [
      {
        id: "2.1",
        title: "What is an SDR at NationGraph?",
        content: `<p>As a Sales Development Representative (SDR) at NationGraph, your primary role is <strong>top-of-funnel pipeline generation</strong>. You are the first point of contact for potential customers — businesses that sell products or services to government agencies and need a better way to find and win public sector contracts.</p>
<p class="mt-4"><strong>Your core job:</strong> Set qualified demo meetings for Account Executives (AEs) and learn the product inside and out.</p>`
      },
      {
        id: "2.2",
        title: "SDR Core Responsibilities",
        content: `<ol>
<li><strong>Prospecting & Outbound Outreach</strong> — Identify and reach out to potential customers through cold calls, emails, LinkedIn, and other channels</li>
<li><strong>Lead Qualification</strong> — Determine if a prospect is a good fit for NationGraph based on their role, target market, and pain points</li>
<li><strong>Meeting Setting</strong> — Book qualified demo meetings for the AE team</li>
<li><strong>Product Knowledge</strong> — Deeply understand NationGraph's platform, features, and value proposition so you can articulate it clearly</li>
<li><strong>CRM Management</strong> — Maintain an organized CRM (Salespipe) to track all interactions and manage leads efficiently</li>
<li><strong>Continuous Learning</strong> — Stay updated on industry trends, sales techniques, government procurement changes, and product knowledge</li>
</ol>`
      },
      {
        id: "2.3",
        title: "Performance Metrics",
        content: `<table>
<thead><tr><th>Metric</th><th>What It Means</th></tr></thead>
<tbody>
<tr><td>Demo meetings set</td><td>Primary KPI — number of qualified meetings booked for AEs</td></tr>
<tr><td>Demo meetings held</td><td>Meetings that actually happen (not just booked)</td></tr>
<tr><td>Sales closed (from your meetings)</td><td>Revenue generated from opportunities you sourced</td></tr>
<tr><td>Activity volume</td><td>Calls made, emails sent, LinkedIn touchpoints</td></tr>
<tr><td>CRM hygiene</td><td>Accuracy and completeness of your CRM records</td></tr>
</tbody>
</table>
<p class="mt-4"><strong>Key insight:</strong> As an SDR, setting demo meetings and learning the product is how you are evaluated. Your primary goal is to create pipeline.</p>`
      },
      {
        id: "2.4",
        title: "Company Vision & Your Role",
        content: `<ul>
<li>NationGraph's long-term vision: <strong>$500 Million in 5 years</strong></li>
<li>Current target industries: <strong>Education and government</strong> (expanding to all sectors)</li>
<li>Your contribution: <strong>Boots on the ground. Outreach in all ways as much as possible.</strong></li>
<li>Ideal customers: <strong>Any business that contracts with the government</strong> — their biggest challenges are finding information on potential bids, leads, and indications of opportunity across different counties, states, and agencies</li>
</ul>`
      },
      {
        id: "2.5",
        title: "Best Practices for SDR Success",
        content: `<ol>
<li><strong>Active Listening:</strong> Engage fully with prospects to understand their needs and challenges, tailoring your pitch accordingly</li>
<li><strong>Effective Prospecting:</strong> Use multiple channels — email, phone calls, LinkedIn, social media — ensuring outreach is personalized and relevant</li>
<li><strong>Follow-Up Diligence:</strong> Consistent, strategic follow-ups significantly increase response rates and demonstrate commitment</li>
<li><strong>Continuous Learning:</strong> Stay updated on industry trends, sales techniques, and product knowledge</li>
<li><strong>CRM Management:</strong> Keep your CRM organized and up to date — this is non-negotiable</li>
</ol>`
      },
      {
        id: "2.6",
        title: "Questions to Ask Your Manager (Week 1)",
        content: `<p>These demonstrate initiative and help you ramp faster:</p>
<ul>
<li>Who are our ideal customers, and what are their biggest challenges?</li>
<li>What industries or sectors benefit most from our solutions right now?</li>
<li>What are the biggest trends shaping public sector sales and procurement intelligence?</li>
<li>Who are our main competitors, and how do we differentiate ourselves?</li>
<li>What are the common objections prospects have, and how do we address them?</li>
<li>How do decision-making processes typically work in government procurement?</li>
<li>What does a successful outreach strategy look like at NationGraph?</li>
<li>What messaging has worked best in engaging prospects?</li>
</ul>`
      }
    ],
    quiz: [
      {
        id: "2.1",
        type: "multiple_choice",
        question: "What is the primary KPI for an SDR at NationGraph?",
        options: ["Revenue closed", "Number of cold calls made per day", "Number of qualified demo meetings set", "Number of emails sent"],
        correct: 2,
        explanation: "As an SDR, setting demo meetings and learning the product is how you are evaluated. Demo meetings set is the primary KPI."
      },
      {
        id: "2.2",
        type: "multiple_choice",
        question: "What CRM does NationGraph's sales team use?",
        options: ["Salesforce", "HubSpot", "Salespipe", "Pipedrive"],
        correct: 2,
        explanation: "NationGraph uses Salespipe as their CRM to track interactions and manage leads."
      },
      {
        id: "2.3",
        type: "multiple_choice",
        question: "What are NationGraph's current primary target industries?",
        options: ["Healthcare and finance", "Education and government", "Technology and manufacturing", "Retail and e-commerce"],
        correct: 1,
        explanation: "Right now NationGraph focuses on education and government, with plans to eventually open up to all sectors."
      },
      {
        id: "2.4",
        type: "select_all",
        question: "Which of the following are core SDR responsibilities? (Select all that apply)",
        options: ["Prospecting and outbound outreach", "Closing deals and signing contracts", "Lead qualification", "Meeting setting for AEs", "Product development", "CRM management"],
        correct: [0, 2, 3, 5],
        explanation: "SDRs are responsible for prospecting, qualifying leads, setting meetings for AEs, and maintaining CRM hygiene. Closing deals is an AE responsibility, and product development is engineering."
      },
      {
        id: "2.5",
        type: "true_false",
        question: "As an SDR, you should wait for leads from marketing before starting outbound prospecting.",
        correct: false,
        explanation: "Top AEs (and SDRs) never wait for leads from marketing. Proactive outbound prospecting is a core responsibility from day one."
      },
      {
        id: "2.6",
        type: "free_response",
        question: "Describe NationGraph's ideal customer profile in 2-3 sentences.",
        sample_answer: "NationGraph's ideal customer is any business that contracts with or sells to government agencies. They struggle with the time-consuming process of finding procurement opportunities, identifying decision-makers, and navigating the complex government buying cycle. They need better intelligence to win more public sector contracts.",
        grading_criteria: "Must mention businesses selling to government, the challenge of finding opportunities, and the need for procurement intelligence.",
        explanation: "A strong answer identifies B2G businesses, their challenges with procurement, and the need for intelligence."
      }
    ]
  },
  {
    id: 3,
    title: "The SLED Industry & Government Procurement",
    estimatedTime: "45 min",
    sections: [
      {
        id: "3.1",
        title: "What is the SLED Market?",
        content: `<p><strong>SLED = State, Local government, and Education</strong></p>
<p>This encompasses a massive market of public institutions:</p>
<ul>
<li><strong>State Agencies</strong> (e.g., Departments of Transportation, Health, Administration)</li>
<li><strong>County Governments</strong></li>
<li><strong>City / Municipal Governments</strong></li>
<li><strong>K-12 School Districts</strong></li>
<li><strong>Higher Education</strong> (Public Colleges/Universities)</li>
<li><strong>Special Districts</strong> (e.g., Port Authority, Water District, Transit Authority)</li>
<li><strong>Police / Public Safety</strong></li>
</ul>`
      },
      {
        id: "3.2",
        title: "How Government Procurement Works",
        content: `<p>Government buying is fundamentally different from private sector B2B sales.</p>
<h4>The Problem with Government RFPs:</h4>
<p>The government Request for Proposal (RFP) cycle is notoriously <strong>slow, bureaucratic, and competitive</strong>. By the time an RFP is published, agencies have often already engaged with vendors, making it difficult for new businesses to influence requirements.</p>

<h4>Key differences from private sector:</h4>
<ul>
<li>Purchases are governed by strict procurement rules and regulations</li>
<li>Budgets are set annually (often in August for the following year) with limited flexibility</li>
<li>Multiple approval thresholds and stakeholders involved</li>
<li>Transparency requirements mean much data is publicly available</li>
<li>Decision-making processes vary by agency</li>
</ul>

<h4>The Buying Cycle:</h4>
<ol>
<li><strong>Need Identification</strong> — Agency identifies a need (visible in meeting minutes, strategic plans, or budget discussions)</li>
<li><strong>Budget Approval</strong> — Funding must be allocated and approved</li>
<li><strong>Requirements Definition</strong> — Specifications written (pre-RFP engagement matters most here)</li>
<li><strong>Solicitation</strong> — RFP/RFQ/IFB published publicly</li>
<li><strong>Evaluation</strong> — Proposals scored against criteria</li>
<li><strong>Award</strong> — Contract awarded to winning vendor</li>
<li><strong>Implementation</strong> — Solution deployed</li>
</ol>
<p class="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded"><strong>Critical insight:</strong> The best time to engage is <strong>before step 4</strong>. Once an RFP is published, the game is largely already decided. NationGraph's early signals help you engage during steps 1-3.</p>`
      },
      {
        id: "3.3",
        title: "Data Types NationGraph Monitors",
        content: `<table>
<thead><tr><th>Data Type</th><th>What It Reveals</th></tr></thead>
<tbody>
<tr><td>Meeting Minutes</td><td>Board/council/committee discussions about needs, priorities, vendor dissatisfaction</td></tr>
<tr><td>Annual Budgets</td><td>Funding availability, department priorities, spending trends</td></tr>
<tr><td>News (TV, Radio, Web)</td><td>Political will, urgency signals, leadership changes</td></tr>
<tr><td>Strategic Plans</td><td>Long-term priorities and upcoming initiatives</td></tr>
<tr><td>Grants</td><td>New funding sources that create buying opportunities</td></tr>
<tr><td>Legislation</td><td>Policy changes that mandate new purchases or compliance</td></tr>
<tr><td>Purchase Orders</td><td>Historical spending, competitor contracts, renewal timing</td></tr>
<tr><td>Procurement Guidelines</td><td>How each entity buys, thresholds, approval processes</td></tr>
<tr><td>RFPs</td><td>Active solicitations and pre-solicitation breadcrumbs</td></tr>
<tr><td>Contacts</td><td>Decision-makers, their roles, and verified contact info</td></tr>
<tr><td>Agentic Web Search</td><td>AI-driven search for emerging signals across the web</td></tr>
</tbody>
</table>`
      },
      {
        id: "3.4",
        title: "Key Qualifying Signals for SLED Leads",
        content: `<p>When evaluating a potential SLED opportunity, look for:</p>
<ul>
<li><strong>New leadership</strong> (new IT director, new procurement officer, new superintendent)</li>
<li><strong>Competitor contract expiring</strong> (displacement window opening)</li>
<li><strong>New grant received</strong> (fresh funding = buying power)</li>
<li><strong>Budget discussions</strong> mentioning your category in meeting minutes</li>
<li><strong>Strategic plan</strong> referencing technology modernization or new initiatives</li>
<li><strong>Legislation changes</strong> requiring compliance or new capabilities</li>
</ul>`
      },
      {
        id: "3.5",
        title: "Essential Government Acronyms",
        content: `<h4>Procurement & Sales</h4>
<table>
<thead><tr><th>Acronym</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>B2G</td><td>Business-to-Government</td></tr>
<tr><td>RFP</td><td>Request for Proposal — formal solicitation for complex contracts</td></tr>
<tr><td>RFQ</td><td>Request for Quotation — simpler, often for commercial products</td></tr>
<tr><td>RFI</td><td>Request for Information — market research before solicitation</td></tr>
<tr><td>IFB</td><td>Invitation for Bid — sealed bidding based on price</td></tr>
<tr><td>FOIA</td><td>Freedom of Information Act — right to access government records</td></tr>
<tr><td>PO</td><td>Purchase Order</td></tr>
</tbody>
</table>

<h4 class="mt-4">Contract Vehicles</h4>
<table>
<thead><tr><th>Acronym</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>IDIQ</td><td>Indefinite Delivery/Indefinite Quantity contract</td></tr>
<tr><td>GWAC</td><td>Government-Wide Acquisition Contract</td></tr>
<tr><td>BPA</td><td>Blanket Purchase Agreement</td></tr>
<tr><td>GSA Schedule</td><td>Pre-approved vendor contract program</td></tr>
<tr><td>MAC</td><td>Multiple Award Contract</td></tr>
</tbody>
</table>

<h4 class="mt-4">Business Identifiers</h4>
<table>
<thead><tr><th>Acronym</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>SAM</td><td>System for Award Management (mandatory vendor registration)</td></tr>
<tr><td>NAICS</td><td>North American Industry Classification System</td></tr>
<tr><td>UEI</td><td>Unique Entity Identifier (replaced DUNS)</td></tr>
<tr><td>CAGE Code</td><td>Commercial and Government Entity Code</td></tr>
<tr><td>ICP</td><td>Ideal Customer Profile</td></tr>
</tbody>
</table>

<h4 class="mt-4">Evaluation, Compliance & Set-Asides</h4>
<table>
<thead><tr><th>Acronym</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>LPTA</td><td>Lowest Price Technically Acceptable</td></tr>
<tr><td>BVTO</td><td>Best Value Trade-Off (price + other factors)</td></tr>
<tr><td>FAR</td><td>Federal Acquisition Regulation</td></tr>
<tr><td>NIST</td><td>National Institute of Standards and Technology</td></tr>
<tr><td>CMMC</td><td>Cybersecurity Maturity Model Certification</td></tr>
<tr><td>MWBE</td><td>Minority and Women-Owned Business Enterprise</td></tr>
<tr><td>SDVOSB</td><td>Service-Disabled Veteran-Owned Small Business</td></tr>
<tr><td>HUBZone</td><td>Historically Underutilized Business Zone</td></tr>
</tbody>
</table>`
      },
      {
        id: "3.6",
        title: "Understanding Our Prospects' Pain Points",
        content: `<p>NationGraph's customers are businesses that sell to government. Their typical frustrations:</p>
<ol>
<li><strong>Research overload</strong> — Spending countless hours sifting through procurement websites, contract databases, and government meeting minutes</li>
<li><strong>Reactive, not proactive</strong> — Only finding out about opportunities when RFPs go public (too late)</li>
<li><strong>No visibility into expiring contracts</strong> — Missing renewal/displacement opportunities</li>
<li><strong>Unknown decision-makers</strong> — Not knowing who actually influences buying decisions</li>
<li><strong>Budget mystery</strong> — Bidding without understanding if funding is actually available</li>
<li><strong>Complicated processes</strong> — Every agency has different rules, thresholds, and purchasing processes</li>
<li><strong>Race to the bottom</strong> — When everyone sees the same RFP, it becomes a price war</li>
</ol>`
      }
    ],
    quiz: [
      {
        id: "3.1",
        type: "multiple_choice",
        question: "When is the BEST time to engage a government agency in the buying cycle?",
        options: ["After the RFP is published", "During the evaluation phase", "Before the RFP is published, during need identification and requirements definition", "After the contract has been awarded to a competitor"],
        correct: 2,
        explanation: "The best time to engage is before the RFP drops. Once published, the requirements are often already shaped by vendors who engaged early."
      },
      {
        id: "3.2",
        type: "multiple_choice",
        question: "What does RFP stand for?",
        options: ["Request for Payment", "Request for Proposal", "Review for Procurement", "Request for Partnership"],
        correct: 1,
        explanation: "RFP stands for Request for Proposal — a formal solicitation for complex contracts requiring detailed responses."
      },
      {
        id: "3.3",
        type: "multiple_choice",
        question: "What does FOIA stand for and why does it matter for NationGraph?",
        options: ["Federal Office of Information Access — it provides grants", "Freedom of Information Act — it gives the right to access government records, which NationGraph uses at scale", "Federal Operations and Intelligence Agency — it regulates sales", "Free Online Information Archive — it stores RFPs"],
        correct: 1,
        explanation: "FOIA (Freedom of Information Act) gives the right to access government records. NationGraph files ~10,000 FOIA requests per week to surface procurement intelligence."
      },
      {
        id: "3.4",
        type: "select_all",
        question: "Which of the following are qualifying signals for a SLED opportunity? (Select all that apply)",
        options: ["New IT director was just hired", "Competitor's contract is expiring in 6 months", "Agency received a new federal grant", "The agency's website was redesigned", "Meeting minutes mention need for new technology solutions", "Agency posted a job listing for a receptionist"],
        correct: [0, 1, 2, 4],
        explanation: "New leadership, expiring competitor contracts, new grants, and meeting minute discussions about technology needs are all strong qualifying signals."
      },
      {
        id: "3.5",
        type: "matching",
        question: "Match each acronym to its meaning:",
        pairs: [
          { term: "RFI", definition: "Request for Information — market research before a solicitation" },
          { term: "IFB", definition: "Invitation for Bid — sealed bidding based on price" },
          { term: "LPTA", definition: "Lowest Price Technically Acceptable" },
          { term: "BVTO", definition: "Best Value Trade-Off — evaluates price and other factors" },
          { term: "SAM", definition: "System for Award Management — mandatory vendor registration" }
        ],
        explanation: "These are essential government procurement acronyms every SDR should know."
      },
      {
        id: "3.6",
        type: "multiple_choice",
        question: "When do government agencies typically set their budgets for the following year?",
        options: ["January", "April", "August", "December"],
        correct: 2,
        explanation: "Fixed budgets typically come out in August for the following year, meaning buyers start working on next year's plans well in advance."
      },
      {
        id: "3.7",
        type: "free_response",
        question: "A prospect says 'We just respond to RFPs when they come out — it works fine for us.' How would you challenge this using NationGraph's value proposition?",
        sample_answer: "By the time an RFP is published, agencies have often already engaged with preferred vendors who helped shape the requirements. Responding to published RFPs means you're competing in a race where others had a head start. NationGraph surfaces pre-RFP signals — like budget approvals, meeting minutes, and competitor contract expirations — so you can build relationships and influence requirements before the RFP even drops.",
        grading_criteria: "Must address the reactive nature of RFP response, mention pre-RFP engagement advantage, and reference at least one specific signal type.",
        explanation: "The key insight is that published RFPs are already influenced by early-engaging competitors."
      }
    ]
  },
  {
    id: 4,
    title: "Outbound Practices & Strategies",
    estimatedTime: "45 min",
    sections: [
      {
        id: "4.1",
        title: "The NationGraph Outbound Philosophy",
        content: `<p class="text-xl font-semibold mb-4">Core principle: Don't sell. Challenge. Focus on their problem, not the product.</p>
<p>NationGraph's prospects (businesses selling to government) are familiar with slow, complex, and bureaucratic procurement processes. They've heard sales pitches about software tools before. Your job is to <strong>stand out</strong> by leading with their pain, not your product.</p>
<h4 class="mt-4">Key mindsets:</h4>
<ul>
<li>Sales is about <strong>HELPING A PERSON SOLVE A PROBLEM</strong> — nobody wants to be sold to</li>
<li>Sales is a <strong>transfer of energy</strong> — your enthusiasm and conviction are contagious</li>
<li>Your job is not to sell them, but to <strong>show them how you can help</strong></li>
<li><strong>Start with PROBLEM CONTEXT</strong> → Then get into product description</li>
<li><strong>Buyers spend more money to relieve pain than to achieve gain</strong> — stop obsessing about benefits, start obsessing about problems</li>
</ul>`
      },
      {
        id: "4.2",
        title: "Pattern Interrupt Strategy",
        content: `<p>Pattern interrupt is a sales strategy that breaks a prospect's usual thought process, making them stop and pay attention. Instead of a predictable sales script, you surprise them with a question, statement, or approach that disrupts their expectations.</p>

<h4>Why it works for NationGraph:</h4>
<ul>
<li>Breaks through the noise — prospects expect generic sales calls/emails</li>
<li>Puts pain points front and center — highlight frustrations first</li>
<li>Creates curiosity — they want to hear how you fix it</li>
<li>Drives real conversations — start with a problem they actually care about</li>
</ul>

<h4 class="mt-4">Cold Call — Typical vs. Pattern Interrupt:</h4>
<table>
<thead><tr><th>Typical (Ignored)</th><th>Pattern Interrupt (Engages)</th></tr></thead>
<tbody>
<tr><td>"Hi, this is [Name] from NationGraph. We help companies streamline government procurement. Do you have a moment?"</td><td>"Hey [Prospect], be honest with me — how many hours has your team wasted chasing down contract details this week?"</td></tr>
</tbody>
</table>

<h4 class="mt-4">Email — Typical vs. Pattern Interrupt:</h4>
<table>
<thead><tr><th>Typical Subject (Ignored)</th><th>Pattern Interrupt Subject (Opens)</th></tr></thead>
<tbody>
<tr><td>"Government Procurement Software – See How It Works"</td><td>"Drowning in RFP Red Tape? Here's a Fix"</td></tr>
<tr><td></td><td>"How Many Gov't Contracts Did You Miss Last Year?"</td></tr>
</tbody>
</table>`
      },
      {
        id: "4.3",
        title: "Cold Call Talk Track",
        content: `<p><strong>Objective:</strong> Get the prospect engaged by addressing their pain points and positioning NationGraph as the solution.</p>

<div class="space-y-4 mt-4">
<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
<p class="font-semibold">Opening:</p>
<p class="italic">"Hi [Prospect's Name], this is [Your Name] from NationGraph. I know I caught you out of the blue — do you have 30 seconds?"</p>
<p class="mt-2 text-sm">(If they hesitate →) "I'll be quick. If it's not relevant, you can hang up — fair?"</p>
</div>

<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
<p class="font-semibold">Problem Statement:</p>
<p class="italic">"I speak with a lot of businesses selling to the government, and one of the biggest headaches I hear is the slow, unpredictable RFP process. By the time an RFP is public, it's a race to the bottom, and most contracts are already influenced by competitors who got in early. Does that sound familiar?"</p>
</div>

<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
<p class="font-semibold">NationGraph Solution:</p>
<p class="italic">"NationGraph helps businesses get ahead of RFPs by using AI to track budget approvals, expiring contracts, and procurement signals — so you can engage agencies before your competitors even know an opportunity exists."</p>
</div>

<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
<p class="font-semibold">Qualifying Question:</p>
<p class="italic">"How are you currently identifying government sales opportunities before they go public?"</p>
</div>

<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
<p class="font-semibold">Call to Action:</p>
<p class="italic">"I'd love to show you how businesses like [similar company] are winning more government contracts using NationGraph. Would next Tuesday or Wednesday work for a quick walkthrough?"</p>
<p class="mt-2 text-sm">(If they resist →) "I totally get it — this could be a game-changer for your pipeline. How about I send over some insights specific to your industry, and we can revisit in a few weeks?"</p>
</div>
</div>`
      },
      {
        id: "4.4",
        title: "Cold Email Templates",
        content: `<h4>Template 1 — Standard Outbound:</h4>
<div class="p-4 bg-gray-50 rounded-lg border mt-2 mb-4">
<p class="font-semibold">Subject: Get ahead of RFPs — before your competitors do</p>
<p class="mt-2">Hi [First Name],</p>
<p class="mt-2">I know selling to the government can be frustrating — by the time an RFP is public, the decision is often already influenced, and vendors are stuck in a pricing war.</p>
<p class="mt-2">NationGraph helps businesses win more government contracts by identifying procurement opportunities before RFPs are posted. Our AI tracks:</p>
<ul>
<li>Upcoming budget approvals so you know when agencies are ready to buy</li>
<li>Expiring contracts so you can engage before renewals happen</li>
<li>Leadership changes & procurement signals so you can build relationships early</li>
</ul>
<p class="mt-2">Would it be worth a 10-minute chat to see how this could work for [Their Company]?</p>
</div>

<h4>Template 2 — Observation-Problem-Solution-CTA Format:</h4>
<ul>
<li><strong>Observation</strong> — I noticed [something specific about their situation]</li>
<li><strong>Problem</strong> — What problem do they experience</li>
<li><strong>Solution</strong> — Our value prop</li>
<li><strong>CTA</strong> — Interest-based call to action (easy to say "yes" to)</li>
</ul>`
      },
      {
        id: "4.5",
        title: "LinkedIn & Multi-Channel Strategy",
        content: `<h4>LinkedIn Direct Message Template:</h4>
<div class="p-4 bg-gray-50 rounded-lg border mt-2 mb-4">
<p>Hi [First Name],</p>
<p class="mt-2">I work with businesses that sell to the government, and one of the biggest frustrations I hear is how difficult it is to get ahead of RFPs before they go public.</p>
<p class="mt-2">At NationGraph, we use AI to track budget approvals, expiring contracts, and procurement signals so companies can engage agencies before competitors even know an opportunity exists.</p>
<p class="mt-2">Would love to connect and share how we're helping companies like [Similar Company] win more government deals. Up for a quick chat?</p>
</div>

<h4>Multi-Channel Outbound Approach:</h4>
<p>Don't rely on a single channel. Use all available touchpoints:</p>
<ul>
<li><strong>Phone calls</strong> (cold calls and warm follow-ups)</li>
<li><strong>Email sequences</strong> (personalized, multi-touch)</li>
<li><strong>LinkedIn</strong> (connection requests, DMs, content engagement)</li>
<li><strong>Text messages</strong> (for confirmed contacts)</li>
</ul>
<p class="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded"><strong>Key principle:</strong> The phone is your most powerful weapon. Top AEs' first instinct is always to talk to a prospect. Before responding to a long email, <strong>pick up the phone and call.</strong></p>`
      },
      {
        id: "4.6",
        title: "Email Best Practices & CTAs",
        content: `<h4>Cold Outbound Email Best Practices:</h4>
<ol>
<li><strong>Great intro personalization</strong> — show you did research</li>
<li><strong>Attach to a relevant problem</strong> — don't lead with features</li>
<li><strong>The blindspot in their plan</strong> — reveal something they're missing</li>
<li><strong>Clear explanation of how we solve this problem</strong></li>
<li><strong>Humanizing PS</strong> — add a personal touch</li>
</ol>

<h4 class="mt-4">Email rules for executives:</h4>
<ul>
<li>No fluff</li>
<li>Bullets, not paragraphs — no more than 1 line per bullet</li>
<li>Keep it high level — don't get in the weeds on features</li>
<li>Max 5 sentences</li>
<li>"Executives want to be in the know, not in the weeds"</li>
</ul>

<h4 class="mt-4">Top Cold Email CTAs (Calls to Action):</h4>
<p>Use soft CTAs that are easy to say "yes" to:</p>
<ol>
<li>"Think this might help?"</li>
<li>"Worth exploring?"</li>
<li>"Worth an email exchange?"</li>
<li>"Open to learning more?"</li>
<li>"Feel free to say no if you don't see a fit but... might this help?"</li>
<li>"Open to taking a peek?"</li>
<li>"Worth a chat, or no?"</li>
</ol>`
      }
    ],
    quiz: [
      {
        id: "4.1",
        type: "multiple_choice",
        question: "What is a 'pattern interrupt' in sales?",
        options: ["A technical glitch that disrupts a sales call", "A strategy that breaks a prospect's usual thought process to get their attention", "A pricing strategy that undercuts competitors", "A method of interrupting competitor demos"],
        correct: 1,
        explanation: "Pattern interrupt is a sales strategy that surprises the prospect with an unexpected question or approach, making them stop and engage rather than reflexively rejecting the outreach."
      },
      {
        id: "4.2",
        type: "multiple_choice",
        question: "Which of these is the better cold call opening for NationGraph?",
        options: ["'Hi, I'm calling from NationGraph. We have an AI platform for government procurement. Do you have time for a demo?'", "'Hey [Prospect], be honest with me — how many hours has your team wasted chasing down contract details this week?'", "'Hello, NationGraph is the number one procurement intelligence platform. Can I tell you about our features?'", "'Hi, I'd like to schedule a meeting to discuss our software solutions.'"],
        correct: 1,
        explanation: "The pattern interrupt approach leads with the prospect's pain point, making them think about their frustration rather than immediately rejecting the call."
      },
      {
        id: "4.3",
        type: "multiple_choice",
        question: "What should you lead with in a cold email to an executive?",
        options: ["A detailed feature comparison chart", "A 3-page case study", "Their specific problem and pain point", "Your company's funding history and investor list"],
        correct: 2,
        explanation: "Lead with their problem. Articulate the pain better than the buyer can."
      },
      {
        id: "4.4",
        type: "select_all",
        question: "Which are effective soft CTAs for cold emails? (Select all that apply)",
        options: ["'Book a 60-minute demo now'", "'Worth exploring?'", "'Think this might help?'", "'Buy now and save 20%'", "'Open to learning more?'", "'Feel free to say no if you don't see a fit but... might this help?'"],
        correct: [1, 2, 4, 5],
        explanation: "Soft CTAs that are easy to say 'yes' to get much higher response rates than hard asks for commitments."
      },
      {
        id: "4.5",
        type: "true_false",
        question: "When emailing executives, you should include detailed paragraphs explaining every product feature.",
        correct: false,
        explanation: "Executives want to be 'in the know, not in the weeds.' Keep emails to bullets (not paragraphs), max 5 sentences, no fluff, high-level only."
      },
      {
        id: "4.6",
        type: "ordering",
        question: "Put the cold outbound email structure in the correct order:",
        items: ["Humanizing PS", "Clear explanation of how we solve this problem", "Great intro personalization", "The blindspot in their plan", "Attach to a relevant problem"],
        correct_order: [2, 4, 3, 1, 0],
        explanation: "The structure is: (1) Great intro personalization, (2) Attach to relevant problem, (3) The blindspot in their plan, (4) Clear explanation of how we solve this, (5) Humanizing PS."
      },
      {
        id: "4.7",
        type: "free_response",
        question: "Write a pattern interrupt cold call opening for a prospect who sells cybersecurity solutions to state government agencies.",
        sample_answer: "Hey [Name], be honest with me — when was the last time you found out about a state agency cybersecurity contract AFTER your competitor had already been working with them for months? I'm guessing it happens more than you'd like.",
        grading_criteria: "Must use a question format, reference a specific pain point related to government sales timing, and feel conversational rather than scripted.",
        explanation: "A good pattern interrupt leads with a specific, relatable pain point in question form."
      }
    ]
  },
  {
    id: 5,
    title: "CRM Hygiene & Pipeline Management",
    estimatedTime: "30 min",
    sections: [
      {
        id: "5.1",
        title: "Why CRM Hygiene Matters",
        content: `<p>Your CRM (Salespipe) is the single source of truth for your sales activity. Poor CRM hygiene leads to:</p>
<ul>
<li>Lost opportunities (forgetting to follow up)</li>
<li>Duplicate outreach (embarrassing and unprofessional)</li>
<li>Inaccurate forecasting (leadership can't plan)</li>
<li>Wasted time (re-researching prospects you've already contacted)</li>
<li>Lost institutional knowledge (when you move roles, your replacement has nothing)</li>
</ul>
<p class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 rounded"><strong>Rule:</strong> If it didn't happen in the CRM, it didn't happen.</p>`
      },
      {
        id: "5.2",
        title: "CRM Best Practices",
        content: `<h4>After every interaction, log:</h4>
<ul>
<li>Date and type of interaction (call, email, LinkedIn, text)</li>
<li>Key takeaways (what did you learn?)</li>
<li>Next steps (what's the follow-up and when?)</li>
<li>Contact details updates (new email, title change, etc.)</li>
<li>Qualification status update</li>
</ul>

<h4 class="mt-4">Contact information to capture:</h4>
<ul>
<li>Full name, title, department</li>
<li>Email (note verification status — valid / invalid / catch-all)</li>
<li>Phone (direct line if possible)</li>
<li>Role in buying process (decision-maker, influencer, champion, blocker)</li>
<li>Notes on their priorities, pain points, and current solutions</li>
</ul>`
      },
      {
        id: "5.3",
        title: "Pipeline Management Fundamentals",
        content: `<p class="text-xl font-bold text-red-600 mb-4">"Time Kills All Deals"</p>
<p>Deal cycles are not 3-4 months — <strong>they are 3-4 DECISIONS:</strong></p>
<ol>
<li>Starts with cold call — value prop (Do they want to learn more?)</li>
<li>Simple decisions (Is this worth a deeper look?)</li>
<li>Organizational decisions (Do we bring in more stakeholders?)</li>
<li>Final decision (Do we buy?)</li>
</ol>

<h4 class="mt-4">Pipeline principles:</h4>
<ul>
<li><strong>Next steps = next day, not next week!</strong> — Move fast</li>
<li><strong>Frequency of meetings indicates speed of close</strong> — If meetings are spaced out, the deal is dying</li>
<li><strong>Always confirm the compelling event</strong> — Why does this need to happen now?</li>
<li>Ask: <em>Why change? Why now? Why NationGraph?</em></li>
<li><strong>Monday Morning Plays of the Day</strong> — Start each week reviewing: What deals do NOT have a next call? Are you multi-threaded? (Win rate 2x increases when you have 4+ people involved in a deal)</li>
</ul>`
      },
      {
        id: "5.4",
        title: "MEDDIC/MIC Qualification Framework",
        content: `<p>Full MEDDIC can be overwhelming for every call. Focus on the <strong>3 things that matter most = MIC:</strong></p>
<table>
<thead><tr><th>Element</th><th>What to Uncover</th><th>Key Questions</th></tr></thead>
<tbody>
<tr><td><strong>M</strong>etrics</td><td>What quantifiable outcomes matter to them?</td><td>"What metric is suffering as a result of this challenge?"</td></tr>
<tr><td><strong>I</strong>dentify Pain</td><td>What happens if they do nothing?</td><td>"What happens to your pipeline if you keep doing this manually?"</td></tr>
<tr><td><strong>C</strong>hampion</td><td>Who will fight for you internally?</td><td>"If we can solve [X], would you be willing to champion this internally?"</td></tr>
</tbody>
</table>

<h4 class="mt-4">Testing your champion:</h4>
<ul>
<li>Can they mobilize things internally for you?</li>
<li>Can they map out how to get things done internally?</li>
<li>Do they know the steps to sign?</li>
<li>A real champion with strong metrics and severe pain will get you access to the Economic Buyer</li>
</ul>`
      }
    ],
    quiz: [
      {
        id: "5.1",
        type: "multiple_choice",
        question: "What does 'Time Kills All Deals' mean in sales pipeline management?",
        options: ["You should never spend more than 10 minutes on a call", "The longer a deal sits without forward momentum, the more likely it is to die", "You should only work on deals that close within 30 days", "Time management is the most important skill in sales"],
        correct: 1,
        explanation: "The longer a deal goes without a next step or meeting, the more likely it dies. Next steps should be next day, not next week."
      },
      {
        id: "5.2",
        type: "multiple_choice",
        question: "In the simplified MIC framework, what does the 'C' stand for?",
        options: ["Competition", "Cost", "Champion", "Contract"],
        correct: 2,
        explanation: "C stands for Champion — the person inside the prospect's organization who will fight for your solution internally."
      },
      {
        id: "5.3",
        type: "select_all",
        question: "What should you log in the CRM after every prospect interaction? (Select all that apply)",
        options: ["Date and type of interaction", "Your personal opinion of the prospect", "Key takeaways from the conversation", "Next steps and follow-up date", "The prospect's social media passwords", "Contact detail updates"],
        correct: [0, 2, 3, 5],
        explanation: "Log the interaction type, key takeaways, next steps, and any contact updates. Never log personal opinions or irrelevant personal information."
      },
      {
        id: "5.4",
        type: "true_false",
        question: "Deal cycles should be thought of as '3-4 months' rather than '3-4 decisions.'",
        correct: false,
        explanation: "Mindset shift: deal cycles are not 3-4 months — they are 3-4 DECISIONS. Focus on moving through decisions, not waiting out time."
      },
      {
        id: "5.5",
        type: "multiple_choice",
        question: "What does your win rate do when you have 4+ people involved in a deal?",
        options: ["It stays the same", "It decreases because of complexity", "It approximately doubles (2x increase)", "It triples"],
        correct: 2,
        explanation: "Win rate 2x increases when you have 4+ people involved in a deal. This is why multi-threading is critical."
      },
      {
        id: "5.6",
        type: "free_response",
        question: "You have a deal that hasn't had a meeting in 3 weeks. The prospect says they're 'still interested.' What do you do?",
        sample_answer: "A deal without a next meeting for 3 weeks is at serious risk. I would call (not email) to re-engage, qualify whether there's still a compelling event driving urgency, and try to schedule a concrete next step for tomorrow or this week — not next week.",
        grading_criteria: "Must reference the 'time kills all deals' principle, suggest phone over email, and propose concrete next steps rather than accepting vague interest.",
        explanation: "The key is to recognize stale deals, re-engage via phone, and push for concrete next steps."
      }
    ]
  },
  {
    id: 6,
    title: "Running an Opportunity (Discovery to Close)",
    estimatedTime: "45 min",
    sections: [
      {
        id: "6.1",
        title: "The Discovery Call",
        content: `<p><strong>Purpose:</strong> Figure out if there's a problem worth solving</p>
<p><strong>Plan:</strong> Hear how they're doing ___ today and share where we might help</p>
<p><strong>Outcome:</strong> At end, they tell you if it's worth taking a deeper look</p>

<h4 class="mt-4">Before every discovery call — PREP:</h4>
<ul>
<li>Company age, size, growth trajectory</li>
<li>Their tech stack</li>
<li>Recent company news</li>
<li>Who will be on the call (name/title)</li>
<li>How long in their role</li>
</ul>

<h4 class="mt-4">Call Prep Checklist:</h4>
<ul>
<li>What questions do you hope they'll ask? (How to prompt them)</li>
<li>What questions do you hope to avoid? (How to combat if asked)</li>
<li>What are next steps you hope to get out of meeting?</li>
<li>What are all the reasons this will fail? (Overcome those objections)</li>
<li>What is the outcome you desire? (Work backward from it)</li>
</ul>

<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400 mt-4">
<p class="font-semibold">Opening for every 1st Discovery Call:</p>
<p class="italic">"Before the agenda — have to imagine you don't take meetings with every single partner, busy calendar... What prompted you to want to meet with us today?"</p>
</div>`
      },
      {
        id: "6.2",
        title: "Discovery Best Practices",
        content: `<ol>
<li><strong>Discovery is a process, not an event</strong> — don't check the box</li>
<li><strong>The best discovery CREATES VALUE</strong> — it makes buyers think</li>
<li><strong>Uncover the "need behind the need"</strong> — dig deeper</li>
<li><strong>Re-validate everything</strong> — priorities change. "What's changed since we last spoke?"</li>
<li><strong>Phrase questions to get long responses</strong> — "Help me understand, walk me through, talk to me about"</li>
</ol>

<h4 class="mt-4">Socratic Questioning Framework:</h4>
<ol>
<li>"Most people come to us because they are struggling with X, Y, or Z. Which of those sounds most like your world?"</li>
<li>"What made you realize that your current solution isn't cutting it?"</li>
<li>"Which KPIs have been negatively impacted from these challenges?"</li>
<li>"What happens if you do nothing?"</li>
</ol>

<h4 class="mt-4">Chris Orlob's 2 Key Discovery Questions:</h4>
<ul>
<li>"What metric is suffering the most as a result of this business challenge?"</li>
<li>"What is driving you to prioritize improving this among all your other initiatives?"</li>
</ul>

<p class="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded"><strong>Critical rule:</strong> LISTEN — Don't always have a question tee'd up. The best questions come after listening.</p>`
      },
      {
        id: "6.3",
        title: "The Demo (FAVORITE Framework)",
        content: `<h4>FAVORITE framework for demos:</h4>
<table>
<thead><tr><th>Letter</th><th>Step</th></tr></thead>
<tbody>
<tr><td><strong>F</strong></td><td>Frame the pain</td></tr>
<tr><td><strong>A</strong></td><td>Ask question: How are you handling this today?</td></tr>
<tr><td><strong>V</strong></td><td>Visualize outcome</td></tr>
<tr><td><strong>O</strong></td><td>Orient to screen (What am I looking at?)</td></tr>
<tr><td><strong>R</strong></td><td>Reveal workflow</td></tr>
<tr><td><strong>I</strong></td><td>Implant value (as a result...)</td></tr>
<tr><td><strong>T</strong></td><td>Tell a story</td></tr>
<tr><td><strong>E</strong></td><td>Elicit a response: How does that compare?</td></tr>
</tbody>
</table>

<h4 class="mt-4">Demo Best Practices:</h4>
<ul>
<li><strong>SHOW BEST FEATURE 1ST</strong> — let their head spin in a good way</li>
<li><strong>Solve EXACTLY their pain on 1:1 basis — NO MORE, NO LESS</strong></li>
<li>Spend 10 seconds framing the pain a feature solves BEFORE showing it</li>
<li>Tell a story AFTER every key feature</li>
<li>Ask a question AFTER every key feature</li>
<li><strong>END WITH: "What excited you the most today?"</strong></li>
</ul>

<h4 class="mt-4">Demo DON'Ts:</h4>
<ul>
<li>Don't show them EVERYTHING on the first call</li>
<li>Don't feature dump — it's not about showing every button</li>
<li>Don't talk for 60 minutes straight</li>
</ul>`
      },
      {
        id: "6.4",
        title: "The 1-5 Exercise",
        content: `<p>Use this in the <strong>last 15 minutes of the call:</strong></p>
<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
<p class="italic">"We've covered a lot. I want to ensure we're tracking in the right direction. I like to run this exercise with clients to make sure we're all on the same page:"</p>
</div>

<p class="mt-4"><strong>Ask them to rate their feelings toward NationGraph, 1-5:</strong></p>
<ul>
<li><strong>1:</strong> This is definitely not for you</li>
<li><strong>5:</strong> You're so bullish you might pay for this out of your own pocket</li>
</ul>

<p class="mt-4">(If they say 5 →) "C'mon, you're just being nice. You have to have some reservations!"</p>

<p class="mt-4"><strong>Then ask:</strong> "What needs to happen to get this higher to a ___?"</p>

<p class="mt-4"><strong>Goal:</strong> Get everyone to a 4. Understand who your blocker is and who your influencers are.</p>`
      },
      {
        id: "6.5",
        title: "Multi-Threading & Objection Handling",
        content: `<h4>Multi-Threading:</h4>
<p>Engage multiple stakeholders within the prospect's organization, not just one contact.</p>
<ul>
<li>Ask for end-users to be included to build a business case</li>
<li>Get the decision-maker involved early</li>
<li><strong>"Who'd feel left out if they missed next call?"</strong></li>
<li><strong>"How did you buy software like this before?"</strong></li>
<li>Win rate 2x with 4+ people involved in the deal</li>
</ul>

<h4 class="mt-4">Objection Handling:</h4>
<p><strong>Mindset:</strong> Objections don't mean the prospect isn't interested. The best sales reps <strong>respond back with QUESTIONS</strong>.</p>
<table>
<thead><tr><th>Objection</th><th>Response</th></tr></thead>
<tbody>
<tr><td>"Too expensive"</td><td>"When you say it's too expensive, what do you mean? Often when I hear that, they really like it but it's just out of budget for this quarter..."</td></tr>
<tr><td>"Your competition is half the cost"</td><td>"So why have you not gone with them yet?"</td></tr>
<tr><td>"Need to talk to my boss first"</td><td>"What are you gonna say if they say no?"</td></tr>
<tr><td>"How are you better than COMPETITOR?"</td><td>"You probably wouldn't be talking with me today if you were 100% happy. How are you hoping we'd be better?"</td></tr>
<tr><td>"Send me an email with more info"</td><td>"Is that your nice way of saying you're not interested?"</td></tr>
</tbody>
</table>

<h4 class="mt-4">Chris Voss "Labels":</h4>
<ul>
<li>"Seems like you have some concerns."</li>
<li>"Looks like there's a ceiling to what you want to pay."</li>
<li>"Sounds like you're hesitant."</li>
<li>"Seems like this can wait."</li>
</ul>`
      },
      {
        id: "6.6",
        title: "Setting Next Steps",
        content: `<p><strong>Every call must end with clear next steps:</strong></p>

<div class="space-y-4 mt-4">
<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
<p class="font-semibold">"Do you wanna buy?"</p>
<p class="italic">Typically at the end of this call, you have a sense of where we might be helpful. Be completely honest, is it worth taking a deeper look or meh?</p>
</div>

<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
<p class="font-semibold">"When?"</p>
<p class="italic">Just so I make sure I'm aware of any big timelines, when's the latest you'd wanna have something like this in place?</p>
</div>

<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
<p class="font-semibold">"How?"</p>
<p class="italic">Well typically from here we'd do a deeper dive with you and your ___. And if that goes well, we cover price. Sound like a plan?</p>
</div>
</div>

<p class="mt-4"><strong>Always use "we recommend" when suggesting next steps, not "we want" or "you should."</strong></p>`
      }
    ],
    quiz: [
      {
        id: "6.1",
        type: "multiple_choice",
        question: "What is the FIRST thing you should show in a product demo?",
        options: ["The pricing page", "A complete walkthrough of every feature", "Your best/most impressive feature that addresses their top pain", "The company history and team slide"],
        correct: 2,
        explanation: "Show best feature 1ST — let their head spin in a good way. Solve exactly their pain, no more, no less."
      },
      {
        id: "6.2",
        type: "multiple_choice",
        question: "In the 1-5 Exercise, what is your goal score for each stakeholder?",
        options: ["Get everyone to a 5", "Get everyone to a 4, and understand who your blocker and influencers are", "Get the average to 3", "Just get the decision-maker to a 5"],
        correct: 1,
        explanation: "The goal is to get everyone to a 4. If someone says 5, challenge them. Use the exercise to identify blockers and influencers."
      },
      {
        id: "6.3",
        type: "multiple_choice",
        question: "A prospect says 'Your competition is half the cost.' What's the best response?",
        options: ["'Let me check with my manager about a discount.'", "'We're actually priced very competitively compared to...'", "'So why have you not gone with them yet?'", "'I can match their price if you sign today.'"],
        correct: 2,
        explanation: "Responding with a question puts the onus back on them and usually reveals that price isn't the real issue."
      },
      {
        id: "6.4",
        type: "multiple_choice",
        question: "What should you do AFTER showing every key feature in a demo?",
        options: ["Move immediately to the next feature", "Tell a story and ask a question", "Show the pricing slide", "Ask if they want to sign up"],
        correct: 1,
        explanation: "After every key feature: tell a story, then ask a question. This keeps the prospect engaged."
      },
      {
        id: "6.5",
        type: "true_false",
        question: "On a first call demo, you should show the prospect every product feature to give them the full picture.",
        correct: false,
        explanation: "Don't show everything on the first call. Repeat their top 3 problems, show the 3 features that solve those problems, and save the deep dive for a follow-up."
      },
      {
        id: "6.6",
        type: "ordering",
        question: "Put the FAVORITE demo framework in correct order:",
        items: ["Tell a story", "Frame the pain", "Orient to screen", "Reveal workflow", "Ask question (How are you handling this today?)", "Implant value", "Elicit a response", "Visualize outcome"],
        correct_order: [1, 4, 7, 2, 3, 5, 0, 6],
        explanation: "FAVORITE: Frame, Ask, Visualize, Orient, Reveal, Implant, Tell a story, Elicit a response."
      },
      {
        id: "6.7",
        type: "free_response",
        question: "A prospect says at the end of the call: 'This looks great, let me think about it and I'll get back to you.' What do you say?",
        sample_answer: "I'd use a label: 'Sounds like you might have some hesitations — totally fair. What would need to be true for this to be worth moving forward on?' Then schedule a concrete next step.",
        grading_criteria: "Must not simply accept the brush-off. Should use a label or question to surface the real concern, then propose a specific next step with a date.",
        explanation: "Never accept 'I'll think about it' without surfacing the real concern and setting a concrete next step."
      }
    ]
  },
  {
    id: 7,
    title: "The NationGraph Sales Process End-to-End",
    estimatedTime: "45 min",
    sections: [
      {
        id: "7.1",
        title: "Sales Stages Overview",
        content: `<table>
<thead><tr><th>Stage</th><th>Name</th><th>Exit Criteria</th><th>Key Meeting</th></tr></thead>
<tbody>
<tr><td>S0</td><td>Discovery</td><td>Qualified, Problem confirmed, Next Step set</td><td>The Disco Call</td></tr>
<tr><td>S1</td><td>Demo</td><td>From champion confirmation</td><td>The Deep Dive</td></tr>
<tr><td>S2</td><td>Multithreading</td><td>From DMs (decision-makers engaged)</td><td>The Big Team Meeting</td></tr>
<tr><td>S3</td><td>Proposal & Negotiation</td><td>Commercials discussed</td><td>The Proposal</td></tr>
<tr><td>S4</td><td>Vendor Review</td><td>Vendor review complete</td><td>Weekly VR touchpoint → Redline deadline</td></tr>
</tbody>
</table>`
      },
      {
        id: "7.2",
        title: "Forecasting 101",
        content: `<table>
<thead><tr><th>Timing</th><th>Best Case</th><th>Commit</th><th>Worst Case</th></tr></thead>
<tbody>
<tr><td>1st of month</td><td>S2+ stage</td><td>S3+ stage</td><td>—</td></tr>
<tr><td>15th of month</td><td>—</td><td>S3+ stage (Best)</td><td>S4 stage (Commit/Worst)</td></tr>
</tbody>
</table>

<p class="mt-4"><strong>Best Case or "Gap Deals":</strong> What's the next step we need? If we don't get that next step, don't count on it.</p>
<p class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 rounded"><strong>The #1 sales flaw in forecasting:</strong> Not being able to answer: <em>"What is the compelling event that will cause the customer to convert?"</em></p>`
      },
      {
        id: "7.3",
        title: "The Full Sales Playbook Flow",
        content: `<div class="space-y-4">
<div class="p-4 bg-blue-50 rounded-lg">
<h4>1) Prospecting/Pipeline Generation (PG)</h4>
<ul>
<li>Target: Businesses that sell to government (any B2G company)</li>
<li>Connect with prospects via cold call, email, LinkedIn</li>
<li>Use NationGraph's own platform intelligence to personalize outreach</li>
<li>Goal: Book qualified discovery meeting</li>
</ul>
</div>

<div class="p-4 bg-green-50 rounded-lg">
<h4>2) Qualification (MEDDIC/MIC)</h4>
<ul>
<li>Do NOT skip "cost of inaction" → Quantify Pain, find Metrics that Matter!</li>
<li>Confirm: Is there real pain? Is there budget? Is there urgency?</li>
<li>Identify the champion (Power & Influence + Pain)</li>
</ul>
</div>

<div class="p-4 bg-yellow-50 rounded-lg">
<h4>3) Champion Building</h4>
<ul>
<li>Find + Build Pain</li>
<li>Champion needs: Power, Influence, and Pain</li>
<li>Test them: Can they mobilize internally? Do they know the steps to sign?</li>
<li>No pain → no champion → no deal</li>
</ul>
</div>

<div class="p-4 bg-purple-50 rounded-lg">
<h4>4) Economic Buyer (EB) Access</h4>
<ul>
<li>PREP BEFORE CALL IS CRITICAL</li>
<li>Research their investors, board connections</li>
<li>After 1st EB call: Go to LinkedIn, confirm CEO/CFO → Multi-thread!</li>
</ul>
</div>

<div class="p-4 bg-indigo-50 rounded-lg">
<h4>5) Mutual Action Plan (MAP)</h4>
<ul>
<li>Help them through the evaluation journey together</li>
<li>All info in 1 place for informed decision</li>
<li>Come back to it every call — confirm alignment and value</li>
<li>Include: Go-live date, timeline, milestones, stakeholders</li>
</ul>
</div>

<div class="p-4 bg-orange-50 rounded-lg">
<h4>6) Proposal & Negotiation</h4>
<ul>
<li>Build value throughout the sales process</li>
<li>Give/Get: Every discount has a cost (multi-year, case study, press release, sign by end of month)</li>
<li>Don't negotiate until you're "vendor of choice"</li>
<li><strong>Pricing pushback:</strong> Nod head, say "OK," pause & wait</li>
</ul>
</div>

<div class="p-4 bg-red-50 rounded-lg">
<h4>7) Close</h4>
<ul>
<li>Confirm kickoff call on calendar</li>
<li>Multi-thread to exec sponsor</li>
<li>Get executive sponsor call scheduled</li>
<li>Final alignment on next steps</li>
</ul>
</div>
</div>`
      },
      {
        id: "7.4",
        title: "Key Principles",
        content: `<div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400 mb-4">
<p class="text-lg font-bold">"EVERY CALL: Purpose, Plan, Outcome"</p>
<ul>
<li><strong>Purpose:</strong> What are we trying to accomplish?</li>
<li><strong>Plan:</strong> How will we structure this conversation?</li>
<li><strong>Outcome:</strong> What do we want to walk away with?</li>
</ul>
</div>

<h4>The Buyer's Journey:</h4>
<ol>
<li><strong>Unaware</strong> — Don't sell. Inform them of major industry changes</li>
<li><strong>Aware</strong> — Still don't sell. Attack the status quo</li>
<li><strong>Consideration</strong> — Still don't sell. Help them understand what changes mean</li>
<li><strong>Evaluation</strong> — NOW you can sell. Deliver the new world view</li>
<li><strong>Decision</strong> — Emotional decisions first, then rationalize with ROI</li>
</ol>

<h4 class="mt-4">Humans buy with EMOTION and justify with LOGIC:</h4>
<ul>
<li>Frame problems using emotional words ("frustrated," "struggling")</li>
<li>Label what you've heard: "It sounds like you're frustrated with inefficiencies"</li>
<li>Understand personal pain (not just business pain)</li>
<li>Customer stories should include emotional impact</li>
</ul>

<p class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 rounded"><strong>The #1 Rule in Sales:</strong> CARE ABOUT YOUR CUSTOMER. Sales is about helping a person solve a problem. Don't "act like a Sales Rep" → act like a Peer.</p>`
      },
      {
        id: "7.5",
        title: "Deal Management & Sales Superpowers",
        content: `<h4>Deal Management Principles:</h4>
<ol>
<li><strong>NO SHORTCUTS</strong> — Do the work</li>
<li><strong>GET TO POWER</strong> — Engage decision-makers early</li>
<li><strong>MULTI-THREAD FROM THE START</strong> — Don't be single-threaded</li>
<li><strong>LEVERAGE! NEED TO FIND IT EARLY</strong> — What creates urgency?</li>
<li><strong>CLOSE FOR NEXT STEPS</strong> — Every call ends with a concrete next step</li>
<li><strong>ANTICIPATE THE QUESTIONS/OBJECTIONS/BLOCKERS</strong> — Prep, prep, prep</li>
<li><strong>PRICING – SELL THE VALUE 1ST</strong> — Never lead with price</li>
</ol>

<h4 class="mt-4">5 Sales Superpowers to Develop:</h4>
<ol>
<li><strong>Saying NO</strong> — Know when to walk away from bad deals</li>
<li><strong>Clear writing</strong> — Concise, impactful communication</li>
<li><strong>Natural curiosity</strong> — Always asking "why?" and "tell me more"</li>
<li><strong>Embracing silence</strong> — The pause is powerful. Wait 2 seconds before responding</li>
<li><strong>Emotional Storytelling</strong> — Stories resonate over facts every time</li>
</ol>`
      }
    ],
    quiz: [
      {
        id: "7.1",
        type: "multiple_choice",
        question: "What are the three elements every call should have?",
        options: ["Pitch, Demo, Close", "Purpose, Plan, Outcome", "Intro, Features, Pricing", "Discovery, Qualification, Proposal"],
        correct: 1,
        explanation: "Every call should have a clear Purpose, Plan, and Outcome."
      },
      {
        id: "7.2",
        type: "multiple_choice",
        question: "At what stage of the Buyer's Journey should you actually start 'selling'?",
        options: ["Unaware — educate them on your product immediately", "Aware — once they know the problem exists", "Consideration — when they're weighing options", "Evaluation — after you've established the problem, impact, and new world view"],
        correct: 3,
        explanation: "Don't sell during Unaware, Aware, or Consideration stages. Only at Evaluation stage."
      },
      {
        id: "7.3",
        type: "multiple_choice",
        question: "In the NationGraph sales stages, what must be true to move from S1 (Demo) to S2 (Multithreading)?",
        options: ["The prospect has signed an NDA", "You have confirmation from a champion", "Pricing has been discussed", "Legal review is complete"],
        correct: 1,
        explanation: "S1 to S2 requires champion confirmation."
      },
      {
        id: "7.4",
        type: "select_all",
        question: "Which are part of the Give/Get negotiation strategy? (Select all that apply)",
        options: ["Multi-year commitment for a discount", "Offering 50% off with no conditions", "Case study or press release for a discount", "Sign by end of month for better terms", "Automatically matching any competitor price"],
        correct: [0, 2, 3],
        explanation: "Give/Get means every concession has a cost. Never give discounts without getting something in return."
      },
      {
        id: "7.5",
        type: "multiple_choice",
        question: "What is the best response when a prospect pushes back on pricing?",
        options: ["Immediately offer a 20% discount", "Nod, say 'OK,' pause and wait — they'll likely pull back the objection", "Send them a comparison chart vs. cheaper competitors", "Tell them you'll check with your manager"],
        correct: 1,
        explanation: "When you get pricing pushback: just nod head and say 'OK...' then pause & wait."
      },
      {
        id: "7.6",
        type: "true_false",
        question: "Humans make buying decisions primarily with logic and then confirm with emotion.",
        correct: false,
        explanation: "It's the opposite. Humans buy with EMOTION and justify with LOGIC."
      },
      {
        id: "7.7",
        type: "ordering",
        question: "Put the Buyer's Journey stages in the correct order:",
        items: ["Decision", "Consideration", "Evaluation", "Unaware", "Aware"],
        correct_order: [3, 4, 1, 2, 0],
        explanation: "The Buyer's Journey: Unaware → Aware → Consideration → Evaluation → Decision"
      },
      {
        id: "7.8",
        type: "scenario",
        question: "You're at the end of a great discovery call. The prospect (VP of Sales at a mid-size B2G company) says their team currently spends 15+ hours per week manually searching for government opportunities. They're frustrated but say 'We'd need to involve our CEO and head of ops before making any decisions.' Walk through exactly what you'd say and do next.",
        sample_answer: "First, validate and then help them build the internal case. Schedule a meeting with all three stakeholders. Multi-thread by asking for the best way to reach the head of ops.",
        grading_criteria: "Must: (1) not accept a vague 'I'll talk to them' without a concrete next step, (2) help the champion build an internal case, (3) propose a specific meeting with stakeholders, (4) attempt to multi-thread.",
        explanation: "Key moves: validate, help build the internal case, set a concrete next step with all stakeholders, and multi-thread."
      }
    ]
  }
];
