import { Home } from "../pages/Home";
import Help from "../pages/Help";
import Pricing from "../pages/Pricing";
import Documents from "../pages/Documents";
import CVTemplates from "../pages/CVTemplates";
import CVArchitect from "../documents/cv/Editor";
import InvoiceEditor from "../documents/invoice/Editor";
import Dashboard from "../pages/Dashboard";
import AgentDashboard from "../pages/AgentDashboard";
import { Verification } from "../components/sections/Verification";
import MyCv from "../pages/MyCv";
import CreateDocument from "../pages/CreateDocument";
import AllDocuments from "../pages/AllDocuments";
import PDFReports from "../pages/PDFReports";
import Affidavit from "../pages/Affidavit";
import SignUpPage from "../components/auth/SignUp";
import { SignInPage } from "../components/auth/SignIn";
import PaymentComponent from "../components/sections/PaymentComponent";
import RisalaForm from "../components/forms/RisalaForm";
import RisalaTemplate from "../pages/RisalaTemplate";
import CreateDocs from "../pages/CreateDocs";
import OfficialLetter from "../pages/OfficialLetter";
import EventProgram from "../pages/EventProgram";
import ProformaInvoice from "../pages/ProformaInvoice";
import Quotation from "../pages/Quotation";
export interface pageRouteConfig<P = any> {
  forNav?: boolean;
  path: string;
  element: React.ComponentType<P>;
  private?: boolean;
  name: string;
  layout?: boolean;
  signedIn?:boolean;
  dropdown?: { name: string; path: string; active: boolean }[];
  showAsButton?: boolean;
  seo?: {
    title: string;
    description: string;
    keywords?: string;
  };
}

export const routes: pageRouteConfig[] = [
  {
    forNav: true,
    path: "/",
    element: Home,
    name: "Home",
    layout: true,
    seo: {
      title: "Smart Docs - Home",
      description: "Smart Docs - Create, manage, and edit CVs, documents, and templates efficiently.",
      keywords: "Smart Docs, CV Templates, Document Editor, Official Letters, PDF Reports"
    }
  },
  {
    forNav: true,
    path: "/panel",
    element: Dashboard,
    name: "Panel",
    layout: true,
    signedIn:true,
    seo: {
      title: "Smart Docs - Dashboard",
      description: "Dashboard overview for Smart Docs users. Manage your documents and activities."
    }
  },
  {
    forNav: true,
    path: "/agent/dashboard",
    element: AgentDashboard,
    name: "Agent Station",
    layout: true,
    signedIn: true,
    seo: {
      title: "Twende Docs - Agent Station",
      description: "High-speed document command center for stationery shop agents."
    }
  },
  {
    forNav: true,
    path: "/help",
    element: Help,
    name: "Help",
    layout: true,
    seo: {
      title: "Smart Docs - Help",
      description: "Get help and support for using Smart Docs features and tools."
    },},
     {
    forNav: false,
    path: "/payment",
    element: PaymentComponent,
    name: "Payment",
    layout: true,
    seo: {
      title: "Smart Docs - Payment",
      description: "Get payment and support for using Smart Docs features and tools."
    }
  },

  {
    forNav: false,
    path: "/verify-email",
    element: Verification,
    name: "Verification",
    layout: true,
    seo: {
      title: "Smart Docs - Email Verification",
      description: "Verify your email address to activate your Smart Docs account."
    }
  },
  {
    forNav: true,
    path: "/documents",
    element: Documents,
    name: "Documents",
    layout: true,
    dropdown: [
      { name: "All Documents", path: "/documents", active: true },
      { name: "My CVs", path: "/documents/cvs", active: false },
      { name: "My Cover Letters", path: "/documents/cover-letters", active: false },
      { name: "My Portfolios", path: "/documents/portfolios", active: false },
      { name: "My Certificates", path: "/documents/certificates", active: false },
    ],
    seo: {
      title: "Smart Docs - Documents",
      description: "Access all your documents, CVs, and templates in one place."
    }
  },
  {
    forNav: true,
    path: "/documents/templates",
    element: CVTemplates,
    signedIn:true,
    name: "Templates",
    layout: true,
    dropdown: [
      { name: "CV Templates", path: "/documents/templates/cv", active: true },
      { name: "Risala Templates", path: "/documents/templates/risala", active: true },
      { name: "Cover Letter Templates", path: "/documents/templates/cover-letter", active: false },
      { name: "Portfolio Templates", path: "/documents/templates/portfolio", active: false },
      { name: "Certificate Templates", path: "/documents/templates/certificate", active: false },
    ],
    seo: {
      title: "Smart Docs - Templates",
      description: "Explore CV, Cover Letter, Portfolio, and Certificate templates professionally."
    }
  },
  {
    forNav: false,
    path: "/documents/templates/cv",
    element: CVTemplates,
    name: "CV Templates",
    layout: true,
    seo: {
      title: "Smart Docs - CV Templates",
      description: "Browse professional CV templates for your career."
    }
  },
  {
    forNav: true,
    path: "/create",
    element: CreateDocs,
    name: "Create",
    layout: true,
    signedIn:true,
    dropdown: [
      { name: "CV Architect", path: "/create/cv", active: true },
      { name: "Invoice Architect", path: "/create/invoice", active: true },
      { name: "Letter Architect", path: "/create/letter", active: true },
    ],
    seo: {
      title: "Smart Docs - Create Documents",
      description: "Create CVs, Official Letters, PDF reports, portfolios, and certificates with ease."
    }
  },
  {
    forNav: false,
    path: "/pricing",
    element: Pricing,
    name: "Pricing",
    layout: true,
    seo: {
      title: "Smart Docs - Pricing",
      description: "Explore affordable plans for professional document creation and management."
    }
  },
  {
    forNav: false,
    path: "/create/cv",
    element: CVArchitect,
    name: "CV Architect",
    layout: true,
  },
  {
    forNav: false,
    path: "/create/invoice",
    element: InvoiceEditor,
    name: "Invoice Architect",
    layout: true,
  },
  {
    forNav: false,
    path: "/create/letter",
    element: OfficialLetter,
    name: "Letter Architect",
    layout: true,
  },
  {
    forNav: false,
    path: "/create/event-program",
    element: EventProgram,
    name: "Event Architect",
    layout: true,
  },
  {
    forNav: false,
    path: "/create/proforma",
    element: ProformaInvoice,
    name: "Proforma Architect",
    layout: true,
  },
  {
    forNav: false,
    path: "/create/quotation",
    element: Quotation,
    name: "Quotation Architect",
    layout: true,
  },
  {
    forNav: false,
    path: "/create/pdf-reports",
    element: PDFReports,
    name: "Create PDF Reports",
    layout: true,
    seo: {
      title: "Smart Docs - Create PDF Reports",
      description: "Generate PDF reports quickly and professionally from your documents."
    }
  },
  {
    forNav: false,
    path: "/official-letter",
    element: OfficialLetter,
    name: "Official Letter",
    layout: false,
    seo: {
      title: "Smart Docs - Official Letter",
      description: "View or download official letters created on Smart Docs."
    }
  },
  {
    forNav: false,
    path: "/create/document",
    element: CreateDocument,
    name: "Create Document",
    layout: false,
    seo: {
      title: "Smart Docs - Create Document",
      description: "Create new documents professionally and efficiently."
    }
  },
    {
  forNav: true,
  path: "/signin",
  element: SignInPage, // works fine now
  name: "Sign In",
  layout: true,
  seo: {
    title: "Smart Docs - Sign In",
    description: "Get help and support for using Smart Docs features and tools."
  }
},
{
  forNav: false,
  path: "/signup",
  element: SignUpPage,
  name: "Sign Up",
  layout: true,
  seo: {
    title: "Smart Docs - Sign Up",
    description: "Create a Smart Docs account to manage your documents."
  }
},
{
    forNav: false,
    path: "/create/risala",
    element: RisalaForm,
    name: "Risala Architect",
    layout: true,
    signedIn: true,
    seo: {
      title: "Smart Docs - Risala Architect",
      description: "Create professional Risala documents with our automated architect."
    }
  },
  {
    forNav: false,
    path: "/risala/preview",
    element: RisalaTemplate,
    name: "Risala Preview",
    layout: false,
  },
];

export const documentRoutes: pageRouteConfig[] = [
  {
    forNav: false,
    path: "/editor/:templateId",
    element: CVArchitect,
    name: "CV Editor",
    layout: true,
    seo: {
      title: "Smart Docs - CV Editor",
      description: "Edit your CV with our interactive CV editor online."
    }
  },
];

export const myDocumentsRoutes: pageRouteConfig[] = [
  {
    forNav: false,
    path: "/documents",
    element: Documents,
    name: "Documents Dashboard",
    layout: true,
    seo: {
      title: "Smart Docs - My Documents",
      description: "View and manage all your created documents in the Smart Docs dashboard."
    }
  },
  {
    forNav: false,
    path: "/create/affidavit",
    element: Affidavit,
    name: "Affidavit Architect",
    layout: true
  },
  {
    forNav: false,
    path: "/documents/archive",
    element: AllDocuments,
    name: "Documents Archive",
    layout: true,
    seo: {
      title: "Smart Docs - Archive",
      description: "View and manage all your historical documents."
    }
  },
  {
    forNav: false,
    path: "/documents/cvs",
    element: MyCv,
    name: "My CVs",
    layout: false,
    seo: {
      title: "Smart Docs - My CVs",
      description: "Access and manage your personal CVs in Smart Docs."
    }
  },
];
