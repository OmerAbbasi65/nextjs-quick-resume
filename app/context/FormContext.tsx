// app/context/FormContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define a TypeScript interface for the form data structure
interface FormData {
  name: string;
  birthdate: string;
  gender: string;
  residence: string;
  nationality: string;
  cnic: string;
  title: string;
  languages: string;
  contact: string;
  profile?: string;
  experience?: string;
  education?: string;
  skills?: string;
}

// Define context types
interface FormContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create a provider component
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthdate: "",
    gender: "",
    residence: "",
    nationality: "",
    cnic: "",
    title: "",
    languages: "",
    contact: "",
    profile: "",
    experience: "",
    education: "",
    skills: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
