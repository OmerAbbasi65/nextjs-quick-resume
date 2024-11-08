// app/created-done/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Change import to use navigation
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useFormContext } from "../context/FormContext"; // Import context to get form data
import CreateResumeLayout from "../create-resume/layout"; // Import your layout here


const CreatedDone = () => {
  const router = useRouter();
  const { formData } = useFormContext(); // Get form data from context

  const [editableFields, setEditableFields] = useState({
    profile: formData.profile || "",
    experience: formData.experience || "",
    education: formData.education || "",
    skills: formData.skills || ""
  });

  useEffect(() => {
    // Update editableFields when formData changes
    setEditableFields({
      profile: formData.profile || "",
      experience: formData.experience || "",
      education: formData.education || "",
      skills: formData.skills || ""
    });
  }, [formData]);

  const handleInputChange = (e) => {
    setEditableFields({
      ...editableFields,
      [e.target.name]: e.target.value
    });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Resume", 20, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Section", "Details"]],
      body: [
        ["Profile", editableFields.profile],
        ["Experience", editableFields.experience],
        ["Education", editableFields.education],
        ["Skills", editableFields.skills]
      ]
    });

    doc.save("resume.pdf");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Your Resume</h1>

      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        {/* Editable Fields */}
        {["profile", "experience", "education", "skills"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <textarea
              name={field}
              value={editableFields[field]}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded border-gray-300"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button onClick={handleDownloadPDF} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
            Download PDF
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600">
            Share Link
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
    return (
      <CreateResumeLayout>
        <CreatedDone />
      </CreateResumeLayout>
    );
  };
  
  export default Page;