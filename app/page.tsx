"use client";

import { useState, createContext, useContext, type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Building2,
  Calendar,
  Package,
  User,
  ChevronRight,
  LogOut,
  ChevronDown,
  UserCheck,
  Globe,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// --- Dil Desteği (i18n) ---
type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const departmentNamesTr: Record<string, string> = {
  "Project Department": "Proje Departmanı",
  "R&D": "Ar-Ge",
  "Quality Department": "Kalite Departmanı",
  "Production Department": "Üretim Departmanı",
  "Purchasing Department": "Satın Alma Departmanı",
  "MP&L Department": "MP&L Departmanı",
  "IT Department": "BT Departmanı",
  "HR Department": "İK Departmanı",
  "Maintenance Department": "Bakım Departmanı",
  "Marketing & Sales Department": "Satış ve Pazarlama Departmanı",
  "Environmental Management": "Çevre Yönetimi",
};
const departmentNamesEn: Record<string, string> = {
  "Project Department": "Project Department",
  "R&D": "R&D",
  "Quality Department": "Quality Department",
  "Production Department": "Production Department",
  "Purchasing Department": "Purchasing Department",
  "MP&L Department": "MP&L Department",
  "IT Department": "IT Department",
  "HR Department": "HR Department",
  "Maintenance Department": "Maintenance Department",
  "Marketing & Sales Department": "Marketing & Sales Department",
  "Environmental Management": "Environmental Management",
};

const managerTitlesTr: Record<string, string> = {
  "Proje Mühendisi": "Proje Mühendisi",
  "R&D Manager": "Ar-Ge Müdürü",
  "Kalite Manager": "Kalite Müdürü",
  "Üretim Manager": "Üretim Müdürü",
  "Satın Alma Manager": "Satın Alma Müdürü",
  "MP&L Manager": "MP&L Müdürü",
  "IT Manager": "BT Müdürü",
  "İK Manager": "İK Müdürü",
  "Bakım Manager": "Bakım Müdürü",
  "Çevre Manager": "Çevre Müdürü",
  "Satış Manager": "Satış Müdürü",
};
const managerTitlesEn: Record<string, string> = {
  "Proje Mühendisi": "Project Engineer",
  "R&D Manager": "R&D Manager",
  "Kalite Manager": "Quality Manager",
  "Üretim Manager": "Production Manager",
  "Satın Alma Manager": "Purchasing Manager",
  "MP&L Manager": "MP&L Manager",
  "IT Manager": "IT Manager",
  "İK Manager": "HR Manager",
  "Bakım Manager": "Maintenance Manager",
  "Çevre Manager": "Environmental Manager",
  "Satış Manager": "Sales Manager",
};

const translations = {
  tr: {
    login: {
      title: "Fizibilite Sistemi",
      description: "Departman hesabınızla giriş yapın",
      email: "Email",
      password: "Şifre",
      loginButton: "Giriş Yap",
      invalidCredentials: "Geçersiz email veya şifre!",
      demoAccounts: "Demo Hesapları:",
      orQuickLogin: "veya hızlı giriş:",
      projectEngineer: "Proje Müh.",
      rd: "Ar-Ge",
      quality: "Kalite",
      production: "Üretim",
      purchasing: "Satın Alma",
      mpl: "MP&L",
      it: "BT",
      hr: "İK",
      maintenance: "Bakım",
      environmental: "Çevre",
      sales: "Satış",
      logout: "Çıkış Yap",
      changeAccount: "Hesap Değiştir",
      quickLogin: "Hızlı Giriş",
    },
    projectEngineerDashboard: {
      title: "Proje Mühendisi Dashboard",
      welcome: "Hoş geldin, {name}",
      createFormTitle: "Yeni Fizibilite Formu Oluştur",
      createFormDescription: "Yeni ürün için fizibilite değerlendirmesi başlat",
      customerName: "Müşteri Adı",
      partName: "Parça Adı",
      partNumber: "Parça Numarası",
      rfqDeadline: "RFQ Son Tarihi",
      annualDemand: "Yıllık Adet",
      formFillingDate: "Form Doldurma Tarihi",
      receivedDocuments: "Gelen Dokümanlar",
      createFormButton: "Formu Oluştur ve Departmanlara Gönder",
      formCreatedSuccess:
        "Form başarıyla oluşturuldu ve tüm departmanlara gönderildi!",
      createdForms: "Oluşturulan Formlar ({count})",
      createdFormsDescription: "Tüm fizibilite formlarının özet durumu",
      formId: "Form ID",
      customerPart: "Müşteri - Parça",
      rfqDate: "RFQ Tarihi",
      progress: "İlerleme",
      status: "Durum",
      actions: "İşlemler",
      viewDetails: "Detayları Gör",
      completed: "Tamamlandı",
      inProgress: "Devam Ediyor",
      pending: "Bekliyor",
      notStarted: "Henüz başlanmadı",
      partiallyCompleted: "Kısmen tamamlandı",
      allDepartmentsCompleted: "Tüm departmanlar tamamladı",
      totalForms: "Toplam {count} form",
    },
    formDetailsModal: {
      productInfo: "Ürün Bilgileri",
      customer: "Müşteri",
      part: "Parça",
      partNo: "Parça No",
      annualQty: "Yıllık Adet",
      rfqDate: "RFQ Tarihi",
      createdBy: "Oluşturan",
      receivedDocuments: "Gelen Dokümanlar",
      departmentEvaluations: "Departman Değerlendirmeleri",
      completed: "Tamamlandı",
      pending: "Bekliyor",
      notYetCompleted: "Bu departman henüz değerlendirmesini tamamlamadı.",
      answerSummary: "Cevap Özeti",
      answered: "Cevaplandı",
    },
    departmentDashboard: {
      welcome: "Hoş geldin, {name}",
      pendingForms: "Değerlendirme Bekleyen Formlar ({count})",
      pendingFormsDescription: "Bu formları değerlendirmeniz bekleniyor",
      evaluate: "Değerlendir",
      completedForms: "Tamamlanan Formlar ({count})",
      completedFormsDescription: "Değerlendirmesini tamamladığınız formlar",
      noForms: "Henüz Form Yok",
      noFormsDescription:
        "Proje Mühendisi tarafından yeni bir form oluşturulduğunda burada görünecek.",
      pendingFormsNotification: "{count} bekleyen form",
      viewDetails: "Detayları Gör", // Yeni eklenen çeviri
    },
    departmentReview: {
      title: "Fizibilite Değerlendirmesi",
      description:
        "Lütfen aşağıdaki soruları dikkatli bir şekilde değerlendirerek yanıtlayın",
      productInfo: "Ürün Bilgileri",
      completeEvaluation: "Değerlendirmeyi Tamamla",
      cancel: "İptal",
      yes: "EVET",
      no: "HAYIR",
      na: "N/A",
    },
    departmentNames: departmentNamesTr,
    managerTitles: managerTitlesTr,
  },
  en: {
    login: {
      title: "Feasibility System",
      description: "Log in with your department account",
      email: "Email",
      password: "Password",
      loginButton: "Log In",
      invalidCredentials: "Invalid email or password!",
      demoAccounts: "Demo Accounts:",
      orQuickLogin: "or quick login:",
      projectEngineer: "Project Eng.",
      rd: "R&D",
      quality: "Quality",
      production: "Production",
      purchasing: "Purchasing",
      mpl: "MP&L",
      it: "IT",
      hr: "HR",
      maintenance: "Maintenance",
      environmental: "Env. Mgmt.",
      sales: "Sales",
      logout: "Log Out",
      changeAccount: "Change Account",
      quickLogin: "Quick Login",
    },
    projectEngineerDashboard: {
      title: "Project Engineer Dashboard",
      welcome: "Welcome, {name}",
      createFormTitle: "Create New Feasibility Form",
      createFormDescription:
        "Initiate a feasibility assessment for a new product",
      customerName: "Customer Name",
      partName: "Part Name",
      partNumber: "Part Number",
      rfqDeadline: "RFQ Deadline",
      annualDemand: "Annual Quantity",
      formFillingDate: "Form Filling Date",
      receivedDocuments: "Received Documents",
      createFormButton: "Create Form and Send to Departments",
      formCreatedSuccess:
        "Form successfully created and sent to all departments!",
      createdForms: "Created Forms ({count})",
      createdFormsDescription: "Summary status of all feasibility forms",
      formId: "Form ID",
      customerPart: "Customer - Part",
      rfqDate: "RFQ Date",
      progress: "Progress",
      status: "Status",
      actions: "Actions",
      viewDetails: "View Details",
      completed: "Completed",
      inProgress: "In Progress",
      pending: "Pending",
      notStarted: "Not Started",
      partiallyCompleted: "Partially Completed",
      allDepartmentsCompleted: "All Departments Completed",
      totalForms: "Total {count} forms",
    },
    formDetailsModal: {
      productInfo: "Product Information",
      customer: "Customer",
      part: "Part",
      partNo: "Part No",
      annualQty: "Annual Qty",
      rfqDate: "RFQ Date",
      createdBy: "Created By",
      receivedDocuments: "Received Documents",
      departmentEvaluations: "Department Evaluations",
      completed: "Completed",
      pending: "Pending",
      notYetCompleted: "This department has not yet completed its evaluation.",
      answerSummary: "Answer Summary",
      answered: "Answered",
    },
    departmentDashboard: {
      welcome: "Welcome, {name}",
      pendingForms: "Forms Awaiting Evaluation ({count})",
      pendingFormsDescription: "These forms are awaiting your evaluation",
      evaluate: "Evaluate",
      completedForms: "Completed Forms ({count})",
      completedFormsDescription: "Forms you have completed evaluation for",
      noForms: "No Forms Yet",
      noFormsDescription:
        "New forms will appear here when created by the Project Engineer.",
      pendingFormsNotification: "{count} pending form",
      viewDetails: "View Details", // Yeni eklenen çeviri
    },
    departmentReview: {
      title: "Feasibility Evaluation",
      description: "Please carefully evaluate and answer the questions below",
      productInfo: "Product Information",
      completeEvaluation: "Complete Evaluation",
      cancel: "Cancel",
      yes: "YES",
      no: "NO",
      na: "N/A",
    },
    departmentNames: departmentNamesEn,
    managerTitles: managerTitlesEn,
  },
};

// Departman soruları
const departmentQuestions = {
  "Project Department": [
    "Is the project scope clearly defined and achievable within our capabilities?",
    "Are the project timeline and milestones realistic?",
    "Do we have sufficient project management resources?",
    "Is the project aligned with our strategic objectives?",
  ],
  "R&D": [
    "Is the required technology within our R&D capabilities?",
    "Do we have the necessary technical expertise for this product?",
    "Are there any intellectual property concerns?",
    "Can we meet the technical specifications with current resources?",
  ],
  "Quality Department": [
    "Can we meet the required quality standards and certifications?",
    "Do we have adequate quality control processes for this product?",
    "Are the testing requirements achievable with our current equipment?",
    "Is the product compliant with relevant industry standards?",
  ],
  "Production Department": [
    "Do we have sufficient production capacity for the annual demand?",
    "Is our current equipment suitable for manufacturing this product?",
    "Can we achieve the required production timeline?",
    "Are there any safety concerns in the production process?",
  ],
  "Purchasing Department": [
    "Are all required raw materials and components readily available?",
    "Can we secure reliable suppliers for critical components?",
    "Are the material costs within acceptable margins?",
    "Do we have alternative suppliers for risk mitigation?",
  ],
  "MP&L Department": [
    "Can we integrate this product into our current production planning?",
    "Do we have adequate logistics capabilities for delivery?",
    "Is our warehouse capacity sufficient for inventory management?",
    "Can we meet the delivery schedule requirements?",
  ],
  "IT Department": [
    "Is it compatible with our IT infrastructure and information security policies?",
    "Do we need additional software or system integrations?",
    "Are there any cybersecurity risks associated with this project?",
    "Can our current IT support handle additional system requirements?",
  ],
  "HR Department": [
    "Do we have sufficient human resources for this project?",
    "Are additional training programs required for staff?",
    "Can we recruit necessary specialized personnel if needed?",
    "Are there any labor relations concerns?",
  ],
  "Maintenance Department": [
    "Can we provide adequate maintenance support for new equipment?",
    "Do we have the technical expertise for equipment maintenance?",
    "Are spare parts readily available for critical equipment?",
    "Is the maintenance schedule compatible with production requirements?",
  ],
  "Environmental Management": [
    "Does the product comply with environmental regulations?",
    "Are there any environmental impact concerns?",
    "Can we manage waste products according to regulations?",
    "Do we need additional environmental permits or certifications?",
  ],
  "Marketing & Sales Department": [
    "Is there sufficient market demand for this product?",
    "Can we achieve competitive pricing in the market?",
    "Do we have adequate sales channels for this product?",
    "Is the product aligned with our brand positioning?",
  ],
};

// Kullanıcı hesapları
const userAccounts = {
  "project@company.com": {
    password: "project123",
    department: "Project Department",
    name: "Proje Mühendisi",
  },
  "rd@company.com": {
    password: "rd123",
    department: "R&D",
    name: "R&D Manager",
  },
  "quality@company.com": {
    password: "quality123",
    department: "Quality Department",
    name: "Kalite Manager",
  },
  "production@company.com": {
    password: "production123",
    department: "Production Department",
    name: "Üretim Manager",
  },
  "purchasing@company.com": {
    password: "purchasing123",
    department: "Purchasing Department",
    name: "Satın Alma Manager",
  },
  "mpl@company.com": {
    password: "mpl123",
    department: "MP&L Department",
    name: "MP&L Manager",
  },
  "it@company.com": {
    password: "it123",
    department: "IT Department",
    name: "IT Manager",
  },
  "hr@company.com": {
    password: "hr123",
    department: "HR Department",
    name: "İK Manager",
  },
  "maintenance@company.com": {
    password: "maintenance123",
    department: "Maintenance Department",
    name: "Bakım Manager",
  },
  "env@company.com": {
    password: "env123",
    department: "Environmental Management",
    name: "Çevre Manager",
  },
  "sales@company.com": {
    password: "sales123",
    department: "Marketing & Sales Department",
    name: "Satış Manager",
  },
};

type AppState =
  | "login"
  | "project-engineer"
  | "department-dashboard"
  | "department-review"
  | "final-decision";
type FeasibilityStatus = "feasible" | "non-feasible" | "feasible-with-changes";

interface ProductInfo {
  id: string;
  customerName: string;
  partName: string;
  partNumber: string;
  receivedDocuments: string;
  rfqDeadline: string;
  annualDemand: string;
  formFillingDate: string;
  createdBy: string;
  status: "active" | "completed";
}

interface DepartmentResponse {
  [key: string]: "YES" | "NO" | "N/A";
}

interface DepartmentAnswers {
  [department: string]: {
    responses: DepartmentResponse;
    completed: boolean;
    completedBy?: string;
    completedDate?: string;
  };
}

interface FeasibilityForm {
  id: string;
  productInfo: ProductInfo;
  departmentAnswers: DepartmentAnswers;
  finalDecision?: FeasibilityStatus;
  decisionNotes?: string;
  completedDate?: string;
}

// Mock Data - Önceden oluşturulmuş formlar
const createMockForms = (): FeasibilityForm[] => {
  const departments = Object.keys(departmentQuestions);

  return [
    // Tam tamamlanmış form
    {
      id: "FORM-1704067200000",
      productInfo: {
        id: "FORM-1704067200000",
        customerName: "BMW Group",
        partName: "Engine Mount Bracket",
        partNumber: "BMW-EMB-2024-001",
        receivedDocuments:
          "Technical drawings, Material specifications, Quality requirements, 3D CAD files",
        rfqDeadline: "2024-02-15",
        annualDemand: "50000",
        formFillingDate: "2024-01-01",
        createdBy: "Proje Mühendisi",
        status: "active",
      },
      departmentAnswers: {
        "Project Department": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "Proje Mühendisi",
          completedDate: "02.01.2024",
        },
        "R&D": {
          responses: { "0": "YES", "1": "YES", "2": "NO", "3": "YES" },
          completed: true,
          completedBy: "R&D Manager",
          completedDate: "03.01.2024",
        },
        "Quality Department": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "Kalite Manager",
          completedDate: "04.01.2024",
        },
        "Production Department": {
          responses: { "0": "NO", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "Üretim Manager",
          completedDate: "05.01.2024",
        },
        "Purchasing Department": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "Satın Alma Manager",
          completedDate: "06.01.2024",
        },
        "MP&L Department": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "MP&L Manager",
          completedDate: "07.01.2024",
        },
        "IT Department": {
          responses: { "0": "YES", "1": "N/A", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "IT Manager",
          completedDate: "08.01.2024",
        },
        "HR Department": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "İK Manager",
          completedDate: "09.01.2024",
        },
        "Maintenance Department": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "Bakım Manager",
          completedDate: "10.01.2024",
        },
        "Environmental Management": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "Çevre Manager",
          completedDate: "11.01.2024",
        },
        "Marketing & Sales Department": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "Satış Manager",
          completedDate: "12.01.2024",
        },
      },
    },
    // Yarı tamamlanmış form
    {
      id: "FORM-1704153600000",
      productInfo: {
        id: "FORM-1704153600000",
        customerName: "Mercedes-Benz",
        partName: "Transmission Housing",
        partNumber: "MB-TH-2024-002",
        receivedDocuments: "Initial sketches, Basic requirements, Cost targets",
        rfqDeadline: "2024-03-01",
        annualDemand: "25000",
        formFillingDate: "2024-01-02",
        createdBy: "Proje Mühendisi",
        status: "active",
      },
      departmentAnswers: {
        "Project Department": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "Proje Mühendisi",
          completedDate: "03.01.2024",
        },
        "R&D": {
          responses: { "0": "YES", "1": "NO", "2": "YES", "3": "NO" },
          completed: true,
          completedBy: "R&D Manager",
          completedDate: "04.01.2024",
        },
        "Quality Department": {
          responses: { "0": "YES", "1": "YES", "2": "N/A", "3": "YES" },
          completed: true,
          completedBy: "Kalite Manager",
          completedDate: "05.01.2024",
        },
        "Production Department": {
          responses: { "0": "YES", "1": "YES" },
          completed: false,
        },
        "Purchasing Department": {
          responses: {},
          completed: false,
        },
        "MP&L Department": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "MP&L Manager",
          completedDate: "06.01.2024",
        },
        "IT Department": {
          responses: {},
          completed: false,
        },
        "HR Department": {
          responses: {},
          completed: false,
        },
        "Maintenance Department": {
          responses: {},
          completed: false,
        },
        "Environmental Management": {
          responses: {},
          completed: false,
        },
        "Marketing & Sales Department": {
          responses: {},
          completed: false,
        },
      },
    },
    // Yeni başlamış form
    {
      id: "FORM-1704240000000",
      productInfo: {
        id: "FORM-1704240000000",
        customerName: "Audi AG",
        partName: "Brake Caliper Assembly",
        partNumber: "AUDI-BCA-2024-003",
        receivedDocuments:
          "Preliminary specifications, Performance requirements",
        rfqDeadline: "2024-02-28",
        annualDemand: "75000",
        formFillingDate: "2024-01-03",
        createdBy: "Proje Mühendisi",
        status: "active",
      },
      departmentAnswers: {
        "Project Department": {
          responses: { "0": "YES", "1": "YES", "2": "YES", "3": "YES" },
          completed: true,
          completedBy: "Proje Mühendisi",
          completedDate: "04.01.2024",
        },
        "R&D": {
          responses: {},
          completed: false,
        },
        "Quality Department": {
          responses: {},
          completed: false,
        },
        "Production Department": {
          responses: {},
          completed: false,
        },
        "Purchasing Department": {
          responses: {},
          completed: false,
        },
        "MP&L Department": {
          responses: {},
          completed: false,
        },
        "IT Department": {
          responses: {},
          completed: false,
        },
        "HR Department": {
          responses: {},
          completed: false,
        },
        "Maintenance Department": {
          responses: {},
          completed: false,
        },
        "Environmental Management": {
          responses: {},
          completed: false,
        },
        "Marketing & Sales Department": {
          responses: {},
          completed: false,
        },
      },
    },
  ];
};

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("tr"); // Default language is Turkish

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

function FeasibilityFormContent() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const [appState, setAppState] = useState<AppState>("login");
  const [currentUser, setCurrentUser] = useState<{
    email: string;
    department: string;
    name: string;
  } | null>(null);
  const [loginForm, setLoginForm] = useState({
    email: "project@company.com",
    password: "project123",
  });
  const [loginError, setLoginError] = useState("");

  const [productInfo, setProductInfo] = useState<ProductInfo>({
    id: "",
    customerName: "",
    partName: "",
    partNumber: "",
    receivedDocuments: "",
    rfqDeadline: "",
    annualDemand: "",
    formFillingDate: new Date().toISOString().split("T")[0],
    createdBy: "",
    status: "active",
  });

  const [allForms, setAllForms] = useState<FeasibilityForm[]>(
    createMockForms()
  );
  const [selectedFormId, setSelectedFormId] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedFormForDetails, setSelectedFormForDetails] =
    useState<string>("");

  const departments = Object.keys(departmentQuestions);

  const handleLogin = () => {
    const user = userAccounts[loginForm.email as keyof typeof userAccounts];
    if (user && user.password === loginForm.password) {
      setCurrentUser({
        email: loginForm.email,
        department: user.department,
        name: user.name,
      });
      setLoginError("");

      if (user.department === "Project Department") {
        setAppState("project-engineer");
      } else {
        setAppState("department-dashboard");
      }
    } else {
      setLoginError(t.login.invalidCredentials);
    }
  };

  const handleQuickLogin = (email: string) => {
    const user = userAccounts[email as keyof typeof userAccounts];
    if (user) {
      setCurrentUser({
        email: email,
        department: user.department,
        name: user.name,
      });

      if (user.department === "Project Department") {
        setAppState("project-engineer");
      } else {
        setAppState("department-dashboard");
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginForm({ email: "project@company.com", password: "project123" });
    setAppState("login");
  };

  const handleCreateForm = () => {
    const formId = `FORM-${Date.now()}`;
    const newForm: FeasibilityForm = {
      id: formId,
      productInfo: {
        ...productInfo,
        id: formId,
        createdBy: currentUser?.name || "",
      },
      departmentAnswers: {},
    };

    departments.forEach((dept) => {
      newForm.departmentAnswers[dept] = {
        responses: {},
        completed: false,
      };
    });

    setAllForms((prev) => [...prev, newForm]);
    setProductInfo({
      id: "",
      customerName: "",
      partName: "",
      partNumber: "",
      receivedDocuments: "",
      rfqDeadline: "",
      annualDemand: "",
      formFillingDate: new Date().toISOString().split("T")[0],
      createdBy: "",
      status: "active",
    });
    toast({
      title: t.projectEngineerDashboard.formCreatedSuccess,
    });
  };

  const handleDepartmentResponse = (
    formId: string,
    questionIndex: number,
    answer: "YES" | "NO" | "N/A"
  ) => {
    setAllForms((prev) =>
      prev.map((form) => {
        if (form.id === formId && currentUser) {
          return {
            ...form,
            departmentAnswers: {
              ...form.departmentAnswers,
              [currentUser.department]: {
                ...form.departmentAnswers[currentUser.department],
                responses: {
                  ...form.departmentAnswers[currentUser.department].responses,
                  [questionIndex]: answer,
                },
              },
            },
          };
        }
        return form;
      })
    );
  };

  const completeDepartmentReview = (formId: string) => {
    if (!currentUser) return;

    setAllForms((prev) =>
      prev.map((form) => {
        if (form.id === formId) {
          return {
            ...form,
            departmentAnswers: {
              ...form.departmentAnswers,
              [currentUser.department]: {
                ...form.departmentAnswers[currentUser.department],
                completed: true,
                completedBy: currentUser.name,
                completedDate: new Date().toLocaleDateString("tr-TR"),
              },
            },
          };
        }
        return form;
      })
    );
    setSelectedFormId("");
    setAppState("department-dashboard");
  };

  // Header Component - Hızlı hesap değiştirme ve dil seçimi ile
  const AppHeader = () => (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              {currentUser?.department === "Project Department" ? (
                <Building2 className="w-6 h-6 text-white" />
              ) : (
                <Users className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentUser?.department === "Project Department"
                  ? t.projectEngineerDashboard.title
                  : currentUser?.department}
              </h1>
              <p className="text-gray-600">
                {t.projectEngineerDashboard.welcome.replace(
                  "{name}",
                  currentUser?.name || ""
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Dil Seçimi */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Globe className="w-4 h-4" />
                  {language === "tr" ? "Türkçe" : "English"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("tr")}>
                  Türkçe
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Hızlı Hesap Değiştirme */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <UserCheck className="w-4 h-4" />
                  {t.login.changeAccount}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b">
                  {t.login.quickLogin}
                </div>
                {Object.entries(userAccounts).map(([email, user]) => (
                  <DropdownMenuItem
                    key={email}
                    onClick={() => handleQuickLogin(email)}
                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${
                      currentUser?.email === email
                        ? "bg-blue-50 text-blue-700"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        currentUser?.email === email
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {t.managerTitles[user.name] || user.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t.departmentNames[user.department] || user.department}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t.login.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );

  // Login ekranı
  if (appState === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">
              {t.login.title}
            </CardTitle>
            <CardDescription className="text-blue-100 text-center">
              {t.login.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.login.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="departman@company.com"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t.login.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="h-11"
                />
              </div>
              {loginError && (
                <div className="text-red-600 text-sm text-center">
                  {loginError}
                </div>
              )}
            </div>

            <Button
              onClick={handleLogin}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              disabled={!loginForm.email || !loginForm.password}
            >
              {t.login.loginButton}
            </Button>

            {/* Hızlı Giriş Butonları */}
            <div className="space-y-3">
              <div className="text-center text-sm text-gray-600">
                {t.login.orQuickLogin}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "project@company.com", password: "project123" }) // Bu satırı kaldır
                    handleQuickLogin("project@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.projectEngineer}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "rd@company.com", password: "rd123" }) // Bu satırı kaldır
                    handleQuickLogin("rd@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.rd}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "quality@company.com", password: "quality123" }) // Bu satırı kaldır
                    handleQuickLogin("quality@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.quality}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "production@company.com", password: "production123" }) // Bu satırı kaldır
                    handleQuickLogin("production@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.production}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "purchasing@company.com", password: "purchasing123" }) // Bu satırı kaldır
                    handleQuickLogin("purchasing@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.purchasing}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "mpl@company.com", password: "mpl123" }) // Bu satırı kaldır
                    handleQuickLogin("mpl@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.mpl}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "it@company.com", password: "it123" }) // Bu satırı kaldır
                    handleQuickLogin("it@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.it}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "hr@company.com", password: "hr123" }) // Bu satırı kaldır
                    handleQuickLogin("hr@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.hr}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "maintenance@company.com", password: "maintenance123" }) // Bu satırı kaldır
                    handleQuickLogin("maintenance@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.maintenance}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "env@company.com", password: "env123" }) // Bu satırı kaldır
                    handleQuickLogin("env@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.environmental}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // setLoginForm({ email: "sales@company.com", password: "sales123" }) // Bu satırı kaldır
                    handleQuickLogin("sales@company.com"); // Doğrudan handleQuickLogin'ı çağır
                  }}
                  className="text-xs p-2 h-auto"
                >
                  {t.login.sales}
                </Button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-3">
                {t.login.demoAccounts}
              </h4>
              <div className="text-xs space-y-1 text-gray-600">
                <div>
                  {t.login.projectEngineer}: project@company.com / project123
                </div>
                <div>{t.login.rd}: rd@company.com / rd123</div>
                <div>{t.login.quality}: quality@company.com / quality123</div>
                <div>
                  {t.login.production}: production@company.com / production123
                </div>
                <div>
                  {t.login.purchasing}: purchasing@company.com / purchasing123
                </div>
                <div>{t.login.mpl}: mpl@company.com / mpl123</div>
                <div>{t.login.it}: it@company.com / it123</div>
                <div>{t.login.hr}: hr@company.com / hr123</div>
                <div>
                  {t.login.maintenance}: maintenance@company.com /
                  maintenance123
                </div>
                <div>{t.login.environmental}: env@company.com / env123</div>
                <div>{t.login.sales}: sales@company.com / sales123</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Proje Mühendisi Dashboard
  if (appState === "project-engineer") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100">
        <AppHeader />

        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Yeni Form Oluşturma */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <FileText className="w-6 h-6" />
                {t.projectEngineerDashboard.createFormTitle}
              </CardTitle>
              <CardDescription className="text-blue-100">
                {t.projectEngineerDashboard.createFormDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="customerName"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    {t.projectEngineerDashboard.customerName}
                  </Label>
                  <Input
                    id="customerName"
                    value={productInfo.customerName}
                    onChange={(e) =>
                      setProductInfo((prev) => ({
                        ...prev,
                        customerName: e.target.value,
                      }))
                    }
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={t.projectEngineerDashboard.customerName}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="partName"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    {t.projectEngineerDashboard.partName}
                  </Label>
                  <Input
                    id="partName"
                    value={productInfo.partName}
                    onChange={(e) =>
                      setProductInfo((prev) => ({
                        ...prev,
                        partName: e.target.value,
                      }))
                    }
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={t.projectEngineerDashboard.partName}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="partNumber"
                    className="text-sm font-semibold text-gray-700"
                  >
                    {t.projectEngineerDashboard.partNumber}
                  </Label>
                  <Input
                    id="partNumber"
                    value={productInfo.partNumber}
                    onChange={(e) =>
                      setProductInfo((prev) => ({
                        ...prev,
                        partNumber: e.target.value,
                      }))
                    }
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={t.projectEngineerDashboard.partNumber}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="rfqDeadline"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    {t.projectEngineerDashboard.rfqDeadline}
                  </Label>
                  <Input
                    id="rfqDeadline"
                    type="date"
                    value={productInfo.rfqDeadline}
                    onChange={(e) =>
                      setProductInfo((prev) => ({
                        ...prev,
                        rfqDeadline: e.target.value,
                      }))
                    }
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="annualDemand"
                    className="text-sm font-semibold text-gray-700"
                  >
                    {t.projectEngineerDashboard.annualDemand}
                  </Label>
                  <Input
                    id="annualDemand"
                    type="number"
                    value={productInfo.annualDemand}
                    onChange={(e) =>
                      setProductInfo((prev) => ({
                        ...prev,
                        annualDemand: e.target.value,
                      }))
                    }
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={t.projectEngineerDashboard.annualDemand}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="formFillingDate"
                    className="text-sm font-semibold text-gray-700"
                  >
                    {t.projectEngineerDashboard.formFillingDate}
                  </Label>
                  <Input
                    id="formFillingDate"
                    type="date"
                    value={productInfo.formFillingDate}
                    onChange={(e) =>
                      setProductInfo((prev) => ({
                        ...prev,
                        formFillingDate: e.target.value,
                      }))
                    }
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="receivedDocuments"
                  className="text-sm font-semibold text-gray-700"
                >
                  {t.projectEngineerDashboard.receivedDocuments}
                </Label>
                <Textarea
                  id="receivedDocuments"
                  value={productInfo.receivedDocuments}
                  onChange={(e) =>
                    setProductInfo((prev) => ({
                      ...prev,
                      receivedDocuments: e.target.value,
                    }))
                  }
                  placeholder={t.projectEngineerDashboard.receivedDocuments}
                  className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="pt-4">
                <Button
                  onClick={handleCreateForm}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg shadow-lg"
                  disabled={!productInfo.customerName || !productInfo.partName}
                >
                  {t.projectEngineerDashboard.createFormButton}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mevcut Formlar - Kompakt Tablo */}
          {allForms.length > 0 && (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  {t.projectEngineerDashboard.createdForms.replace(
                    "{count}",
                    allForms.length.toString()
                  )}
                </CardTitle>
                <CardDescription>
                  {t.projectEngineerDashboard.createdFormsDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          {t.projectEngineerDashboard.formId}
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          {t.projectEngineerDashboard.customerPart}
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          {t.projectEngineerDashboard.rfqDate}
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          {t.projectEngineerDashboard.progress}
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          {t.projectEngineerDashboard.status}
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          {t.projectEngineerDashboard.actions}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allForms.map((form) => {
                        const completedDepts = Object.keys(
                          form.departmentAnswers
                        ).filter(
                          (dept) => form.departmentAnswers[dept].completed
                        ).length;
                        const totalDepts = departments.length;
                        const progressPercentage = Math.round(
                          (completedDepts / totalDepts) * 100
                        );

                        return (
                          <tr
                            key={form.id}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-4 px-4">
                              <div className="font-mono text-sm text-gray-600">
                                {form.id}
                              </div>
                              <div className="text-xs text-gray-500">
                                {form.productInfo.formFillingDate}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-semibold text-gray-800">
                                {form.productInfo.customerName}
                              </div>
                              <div className="text-sm text-gray-600">
                                {form.productInfo.partName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {form.productInfo.partNumber}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm font-medium text-gray-800">
                                {form.productInfo.rfqDeadline}
                              </div>
                              <div className="text-xs text-gray-500">
                                {form.productInfo.annualDemand}{" "}
                                {language === "tr" ? "adet/yıl" : "pcs/year"}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="text-sm font-bold text-blue-600">
                                  {completedDepts}/{totalDepts}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ({progressPercentage}%)
                                </div>
                              </div>
                              <Progress
                                value={progressPercentage}
                                className="w-24 h-2"
                              />
                            </td>
                            <td className="py-4 px-4">
                              {completedDepts === totalDepts ? (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  ✅ {t.projectEngineerDashboard.completed}
                                </Badge>
                              ) : completedDepts > 0 ? (
                                <Badge
                                  variant="outline"
                                  className="border-orange-300 text-orange-700 text-xs"
                                >
                                  🔄 {t.projectEngineerDashboard.inProgress}
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="border-gray-300 text-gray-600 text-xs"
                                >
                                  ⏳ {t.projectEngineerDashboard.pending}
                                </Badge>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <Button
                                onClick={() =>
                                  setSelectedFormForDetails(form.id)
                                }
                                variant="outline"
                                size="sm"
                                className="text-xs h-8"
                              >
                                {t.projectEngineerDashboard.viewDetails}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Açıklama */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-gray-300 text-gray-600 text-xs"
                        >
                          ⏳ {t.projectEngineerDashboard.pending}
                        </Badge>
                        <span>{t.projectEngineerDashboard.notStarted}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-orange-300 text-orange-700 text-xs"
                        >
                          🔄 {t.projectEngineerDashboard.inProgress}
                        </Badge>
                        <span>
                          {t.projectEngineerDashboard.partiallyCompleted}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          ✅ {t.projectEngineerDashboard.completed}
                        </Badge>
                        <span>
                          {t.projectEngineerDashboard.allDepartmentsCompleted}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-500">
                      {t.projectEngineerDashboard.totalForms.replace(
                        "{count}",
                        allForms.length.toString()
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Form Detay Modal */}
          {selectedFormForDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                {(() => {
                  const form = allForms.find(
                    (f) => f.id === selectedFormForDetails
                  );
                  if (!form) return null;

                  return (
                    <>
                      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-bold">
                              {form.productInfo.partName} -{" "}
                              {form.productInfo.customerName}
                            </h2>
                            <p className="text-blue-100 mt-1">
                              {t.projectEngineerDashboard.formId}: {form.id} |{" "}
                              {t.projectEngineerDashboard.formFillingDate}:{" "}
                              {form.productInfo.formFillingDate}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedFormForDetails("")}
                            className="text-white hover:bg-white/20 p-2"
                          >
                            ✕
                          </Button>
                        </div>
                      </div>

                      <div className="p-8 space-y-8">
                        {/* Ürün Bilgileri */}
                        <Card>
                          <CardHeader className="bg-gray-50">
                            <CardTitle className="text-lg">
                              {t.formDetailsModal.productInfo}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <div className="text-sm text-gray-600">
                                  {t.formDetailsModal.customer}
                                </div>
                                <div className="font-semibold">
                                  {form.productInfo.customerName}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">
                                  {t.formDetailsModal.part}
                                </div>
                                <div className="font-semibold">
                                  {form.productInfo.partName}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">
                                  {t.formDetailsModal.partNo}
                                </div>
                                <div className="font-semibold">
                                  {form.productInfo.partNumber}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">
                                  {t.formDetailsModal.annualQty}
                                </div>
                                <div className="font-semibold">
                                  {form.productInfo.annualDemand}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">
                                  {t.formDetailsModal.rfqDate}
                                </div>
                                <div className="font-semibold">
                                  {form.productInfo.rfqDeadline}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">
                                  {t.formDetailsModal.createdBy}
                                </div>
                                <div className="font-semibold">
                                  {form.productInfo.createdBy}
                                </div>
                              </div>
                            </div>
                            {form.productInfo.receivedDocuments && (
                              <div className="mt-4">
                                <div className="text-sm text-gray-600">
                                  {t.formDetailsModal.receivedDocuments}
                                </div>
                                <div className="text-sm bg-gray-50 p-3 rounded mt-1">
                                  {form.productInfo.receivedDocuments}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* Departman Cevapları */}
                        <div className="space-y-6">
                          <h3 className="text-xl font-bold text-gray-800">
                            {t.formDetailsModal.departmentEvaluations}
                          </h3>
                          {departments.map((department) => {
                            const deptData = form.departmentAnswers[department];
                            const isCompleted = deptData?.completed;
                            const questions =
                              departmentQuestions[
                                department as keyof typeof departmentQuestions
                              ];

                            return (
                              <Card
                                key={department}
                                className={`${
                                  isCompleted
                                    ? "border-green-200"
                                    : "border-gray-200"
                                }`}
                              >
                                <CardHeader
                                  className={`${
                                    isCompleted ? "bg-green-50" : "bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">
                                      {t.departmentNames[department] ||
                                        department}
                                    </CardTitle>
                                    <div className="flex items-center gap-2">
                                      {isCompleted ? (
                                        <>
                                          <Badge className="bg-green-100 text-green-800">
                                            ✓ {t.formDetailsModal.completed}
                                          </Badge>
                                          <div className="text-sm text-gray-600">
                                            {(deptData.completedBy &&
                                              t.managerTitles[
                                                deptData.completedBy
                                              ]) ||
                                              deptData.completedBy}{" "}
                                            - {deptData.completedDate}
                                          </div>
                                        </>
                                      ) : (
                                        <Badge
                                          variant="outline"
                                          className="border-orange-300 text-orange-700"
                                        >
                                          ⏳ {t.formDetailsModal.pending}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                  {isCompleted ? (
                                    <div className="space-y-4">
                                      {questions.map((question, index) => (
                                        <div
                                          key={index}
                                          className="p-4 bg-gray-50 rounded-lg"
                                        >
                                          <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                              <div className="text-sm font-medium text-gray-800 mb-2">
                                                <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-bold mr-2">
                                                  {index + 1}
                                                </span>
                                                {question}
                                              </div>
                                            </div>
                                            <div className="ml-4">
                                              <Badge
                                                className={`${
                                                  deptData.responses[index] ===
                                                  "YES"
                                                    ? "bg-green-100 text-green-800"
                                                    : deptData.responses[
                                                        index
                                                      ] === "NO"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                              >
                                                {deptData.responses[index] ||
                                                  t.formDetailsModal.answered}
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>
                                      ))}

                                      {/* Cevap Özeti */}
                                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">
                                          {t.formDetailsModal.answerSummary}
                                        </h4>
                                        <div className="flex justify-between text-sm">
                                          <span className="text-green-600 font-medium">
                                            YES:{" "}
                                            {
                                              Object.values(
                                                deptData.responses
                                              ).filter((r) => r === "YES")
                                                .length
                                            }
                                          </span>
                                          <span className="text-red-600 font-medium">
                                            NO:{" "}
                                            {
                                              Object.values(
                                                deptData.responses
                                              ).filter((r) => r === "NO").length
                                            }
                                          </span>
                                          <span className="text-gray-600 font-medium">
                                            N/A:{" "}
                                            {
                                              Object.values(
                                                deptData.responses
                                              ).filter((r) => r === "N/A")
                                                .length
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-center py-8 text-gray-500">
                                      <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                      <p>
                                        {t.formDetailsModal.notYetCompleted}
                                      </p>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Departman Dashboard
  if (appState === "department-dashboard") {
    const pendingForms = allForms.filter(
      (form) =>
        currentUser &&
        form.departmentAnswers[currentUser.department] &&
        !form.departmentAnswers[currentUser.department].completed
    );

    const completedForms = allForms.filter(
      (form) =>
        currentUser &&
        form.departmentAnswers[currentUser.department] &&
        form.departmentAnswers[currentUser.department].completed
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100">
        <AppHeader />

        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Bekleyen Formlar */}
          {pendingForms.length > 0 && (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <AlertCircle className="w-6 h-6" />
                  {t.departmentDashboard.pendingForms.replace(
                    "{count}",
                    pendingForms.length.toString()
                  )}
                </CardTitle>
                <CardDescription className="text-orange-100">
                  {t.departmentDashboard.pendingFormsDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {pendingForms.map((form) => (
                    <div
                      key={form.id}
                      className="p-4 border border-orange-200 rounded-lg bg-orange-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {form.productInfo.partName} -{" "}
                            {form.productInfo.customerName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {t.projectEngineerDashboard.formId}: {form.id}
                          </p>
                          <p className="text-sm text-gray-600">
                            {t.projectEngineerDashboard.rfqDeadline}:{" "}
                            {form.productInfo.rfqDeadline}
                          </p>
                          <p className="text-sm text-gray-600">
                            {t.projectEngineerDashboard.annualDemand}:{" "}
                            {form.productInfo.annualDemand}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              setSelectedFormId(form.id);
                              setAppState("department-review");
                            }}
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                          >
                            {t.departmentDashboard.evaluate}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tamamlanan Formlar */}
          {completedForms.length > 0 && (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <CheckCircle className="w-6 h-6" />
                  {t.departmentDashboard.completedForms.replace(
                    "{count}",
                    completedForms.length.toString()
                  )}
                </CardTitle>
                <CardDescription className="text-green-100">
                  {t.departmentDashboard.completedFormsDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {completedForms.map((form) => (
                    <div
                      key={form.id}
                      className="p-4 border border-green-200 rounded-lg bg-green-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {form.productInfo.partName} -{" "}
                            {form.productInfo.customerName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {t.projectEngineerDashboard.formId}: {form.id}
                          </p>
                          <p className="text-sm text-gray-600">
                            {t.projectEngineerDashboard.completed}:{" "}
                            {
                              form.departmentAnswers[
                                currentUser?.department || ""
                              ]?.completedDate
                            }
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {" "}
                          {/* Added flex container for buttons */}
                          <Badge className="bg-green-100 text-green-800">
                            ✓ {t.projectEngineerDashboard.completed}
                          </Badge>
                          <Button
                            onClick={() => setSelectedFormForDetails(form.id)}
                            variant="outline"
                            size="sm"
                            className="text-xs h-8"
                          >
                            {t.departmentDashboard.viewDetails}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Boş durum */}
          {pendingForms.length === 0 && completedForms.length === 0 && (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {t.departmentDashboard.noForms}
                </h3>
                <p className="text-gray-500">
                  {t.departmentDashboard.noFormsDescription}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        {/* Form Detay Modal - Moved outside of conditional rendering to be accessible from both dashboards */}
        {selectedFormForDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const form = allForms.find(
                  (f) => f.id === selectedFormForDetails
                );
                if (!form) return null;

                return (
                  <>
                    <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold">
                            {form.productInfo.partName} -{" "}
                            {form.productInfo.customerName}
                          </h2>
                          <p className="text-blue-100 mt-1">
                            {t.projectEngineerDashboard.formId}: {form.id} |{" "}
                            {t.projectEngineerDashboard.formFillingDate}:{" "}
                            {form.productInfo.formFillingDate}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFormForDetails("")}
                          className="text-white hover:bg-white/20 p-2"
                        >
                          ✕
                        </Button>
                      </div>
                    </div>

                    <div className="p-8 space-y-8">
                      {/* Ürün Bilgileri */}
                      <Card>
                        <CardHeader className="bg-gray-50">
                          <CardTitle className="text-lg">
                            {t.formDetailsModal.productInfo}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <div className="text-sm text-gray-600">
                                {t.formDetailsModal.customer}
                              </div>
                              <div className="font-semibold">
                                {form.productInfo.customerName}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">
                                {t.formDetailsModal.part}
                              </div>
                              <div className="font-semibold">
                                {form.productInfo.partName}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">
                                {t.formDetailsModal.partNo}
                              </div>
                              <div className="font-semibold">
                                {form.productInfo.partNumber}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">
                                {t.formDetailsModal.annualQty}
                              </div>
                              <div className="font-semibold">
                                {form.productInfo.annualDemand}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">
                                {t.formDetailsModal.rfqDate}
                              </div>
                              <div className="font-semibold">
                                {form.productInfo.rfqDeadline}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">
                                {t.formDetailsModal.createdBy}
                              </div>
                              <div className="font-semibold">
                                {form.productInfo.createdBy}
                              </div>
                            </div>
                          </div>
                          {form.productInfo.receivedDocuments && (
                            <div className="mt-4">
                              <div className="text-sm text-gray-600">
                                {t.formDetailsModal.receivedDocuments}
                              </div>
                              <div className="text-sm bg-gray-50 p-3 rounded mt-1">
                                {form.productInfo.receivedDocuments}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Departman Cevapları */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800">
                          {t.formDetailsModal.departmentEvaluations}
                        </h3>
                        {departments.map((department) => {
                          const deptData = form.departmentAnswers[department];
                          const isCompleted = deptData?.completed;
                          const questions =
                            departmentQuestions[
                              department as keyof typeof departmentQuestions
                            ];

                          return (
                            <Card
                              key={department}
                              className={`${
                                isCompleted
                                  ? "border-green-200"
                                  : "border-gray-200"
                              }`}
                            >
                              <CardHeader
                                className={`${
                                  isCompleted ? "bg-green-50" : "bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg">
                                    {t.departmentNames[department] ||
                                      department}
                                  </CardTitle>
                                  <div className="flex items-center gap-2">
                                    {isCompleted ? (
                                      <>
                                        <Badge className="bg-green-100 text-green-800">
                                          ✓ {t.formDetailsModal.completed}
                                        </Badge>
                                        <div className="text-sm text-gray-600">
                                          {(deptData.completedBy &&
                                            t.managerTitles[
                                              deptData.completedBy
                                            ]) ||
                                            deptData.completedBy}{" "}
                                          - {deptData.completedDate}
                                        </div>
                                      </>
                                    ) : (
                                      <Badge
                                        variant="outline"
                                        className="border-orange-300 text-orange-700"
                                      >
                                        ⏳ {t.formDetailsModal.pending}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="p-6">
                                {isCompleted ? (
                                  <div className="space-y-4">
                                    {questions.map((question, index) => (
                                      <div
                                        key={index}
                                        className="p-4 bg-gray-50 rounded-lg"
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-800 mb-2">
                                              <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-bold mr-2">
                                                {index + 1}
                                              </span>
                                              {question}
                                            </div>
                                          </div>
                                          <div className="ml-4">
                                            <Badge
                                              className={`${
                                                deptData.responses[index] ===
                                                "YES"
                                                  ? "bg-green-100 text-green-800"
                                                  : deptData.responses[
                                                      index
                                                    ] === "NO"
                                                  ? "bg-red-100 text-red-800"
                                                  : "bg-gray-100 text-gray-800"
                                              }`}
                                            >
                                              {deptData.responses[index] ||
                                                t.formDetailsModal.answered}
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                    ))}

                                    {/* Cevap Özeti */}
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                      <h4 className="font-semibold text-blue-800 mb-2">
                                        {t.formDetailsModal.answerSummary}
                                      </h4>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-green-600 font-medium">
                                          YES:{" "}
                                          {
                                            Object.values(
                                              deptData.responses
                                            ).filter((r) => r === "YES").length
                                          }
                                        </span>
                                        <span className="text-red-600 font-medium">
                                          NO:{" "}
                                          {
                                            Object.values(
                                              deptData.responses
                                            ).filter((r) => r === "NO").length
                                          }
                                        </span>
                                        <span className="text-gray-600 font-medium">
                                          N/A:{" "}
                                          {
                                            Object.values(
                                              deptData.responses
                                            ).filter((r) => r === "N/A").length
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-center py-8 text-gray-500">
                                    <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                    <p>{t.formDetailsModal.notYetCompleted}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Departman Review Ekranı
  if (appState === "department-review") {
    const form = allForms.find((f) => f.id === selectedFormId);
    if (!form || !currentUser) return <div>Form not found</div>;

    const questions =
      departmentQuestions[
        currentUser.department as keyof typeof departmentQuestions
      ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100">
        <AppHeader />

        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-xl">
                {t.departmentReview.title}
              </CardTitle>
              <CardDescription className="text-blue-100">
                {t.departmentReview.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {/* Ürün Bilgileri */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>{t.departmentReview.productInfo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">
                        {t.formDetailsModal.customer}
                      </div>
                      <div className="font-semibold">
                        {form.productInfo.customerName}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {t.formDetailsModal.part}
                      </div>
                      <div className="font-semibold">
                        {form.productInfo.partName}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {t.formDetailsModal.partNo}
                      </div>
                      <div className="font-semibold">
                        {form.productInfo.partNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {t.formDetailsModal.annualQty}
                      </div>
                      <div className="font-semibold">
                        {form.productInfo.annualDemand}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {t.formDetailsModal.rfqDate}
                      </div>
                      <div className="font-semibold">
                        {form.productInfo.rfqDeadline}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sorular ve Cevaplar */}
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <Card key={index} className="shadow-sm border-0">
                    <CardContent className="p-6">
                      <div className="mb-4 font-semibold">
                        {index + 1}. {question}
                      </div>
                      <RadioGroup
                        defaultValue={
                          form.departmentAnswers[currentUser.department]
                            .responses[index] || ""
                        }
                        onValueChange={(value) =>
                          handleDepartmentResponse(
                            form.id,
                            index,
                            value as "YES" | "NO" | "N/A"
                          )
                        }
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="YES" id={`q${index}-yes`} />
                            <Label htmlFor={`q${index}-yes`}>
                              {t.departmentReview.yes}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="NO" id={`q${index}-no`} />
                            <Label htmlFor={`q${index}-no`}>
                              {t.departmentReview.no}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="N/A" id={`q${index}-na`} />
                            <Label htmlFor={`q${index}-na`}>
                              {t.departmentReview.na}
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Butonlar */}
              <div className="flex justify-end space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setAppState("department-dashboard")}
                >
                  {t.departmentReview.cancel}
                </Button>
                <Button onClick={() => completeDepartmentReview(form.id)}>
                  {t.departmentReview.completeEvaluation}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
}

export default function Page() {
  return (
    <LanguageProvider>
      <FeasibilityFormContent />
    </LanguageProvider>
  );
}
