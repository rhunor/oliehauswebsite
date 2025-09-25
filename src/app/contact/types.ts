export interface ContactFormData {
  projectType: string;
  budgetRange: string;
  servicesRequired: string[];
  projectLocation: string;
  fullName: string;
  email: string;
  phone: string;
  projectTimeline: string;
  submittedAt: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface SubmitResult {
  success?: string;
  error?: string;
}