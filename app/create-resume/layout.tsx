// app/create-resume/layout.tsx
"use client";

import { FormProvider } from '../context/FormContext'; // Adjust the import path as necessary

const CreateResumeLayout = ({ children }) => {
  return (
    <FormProvider>
      {children}
    </FormProvider>
  );
};

export default CreateResumeLayout;
