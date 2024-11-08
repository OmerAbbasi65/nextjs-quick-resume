// app/create-resume/layout.tsx
"use client";

import { ReactNode } from "react";
import { FormProvider } from "../context/FormContext"; // Adjust the import path as necessary

interface CreateResumeLayoutProps {
  children: ReactNode;
}

const CreateResumeLayout: React.FC<CreateResumeLayoutProps> = ({ children }) => {
  return <FormProvider>{children}</FormProvider>;
};

export default CreateResumeLayout;
