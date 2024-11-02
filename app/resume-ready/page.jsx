// app/resume-ready/page.jsx
"use client";
import { useRef } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useFormContext } from "../FormContext"; // Import context

export default function ResumeReady() {
  const { formData } = useFormContext(); // Access form data from context
  const resumeRef = useRef();

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    // Set up header
    let yPosition = 60;
    doc.setFontSize(16);
    doc.text(`${formData.name} `, 40, yPosition);
    yPosition += 20;

    // Use autoTable for tabular content (also handles page breaks automatically)
    autoTable(doc, {
      startY: yPosition,
      head: [["Section", "Details"]],
      body: [
        ["Profile", formData.profile],
        ["Experience", formData.experience],
        ["Education", formData.education],
        ["Skills", formData.skills],
        ["Languages", formData.languages],
        ["Contact", formData.contact],
        [
          "Personal Info",
          `Name: ${formData.name}\nBirthdate: ${formData.birthdate}\nGender: ${formData.gender}\nResidence: ${formData.residence}\nNationality: ${formData.nationality}\nCNIC: ${formData.cnic}`,
        ],
      ],
      margin: { top: 70, bottom: 50 }, // Set margins
      theme: "striped",
    });

    // Add page numbers if multiple pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, 500, 820);
    }

    // Save the PDF with name
    doc.save(`${formData.name}_Resume.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 bg-gray-500 p-8 flex flex-col items-center">
      {/* Resume Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">{formData.name}</h1>
        <span className="text-xl text-gray-600">{formData.title}</span>
      </header>

      {/* Resume Content */}
      <div ref={resumeRef} className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        {/* Profile Section */}
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Profile</h6>
          <p>{formData.profile}</p>
        </section>

        {/* Experience Section */}
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Experience</h6>
          <p>{formData.experience}</p>
        </section>

        {/* Education Section */}
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Education</h6>
          <p>{formData.education}</p>
        </section>

        {/* Skills Section */}
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Skills</h6>
          <p>{formData.skills}</p>
        </section>

        {/* Languages Section */}
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Languages</h6>
          <p>{formData.languages}</p>
        </section>

        {/* Contact Section */}
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Contact</h6>
          <p>{formData.contact}</p>
        </section>

        {/* Personal Information Section */}
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Personal Information</h6>
          <ul className="list-none">
            <li><strong>Name:</strong> {formData.name}</li>
            <li><strong>Birthdate:</strong> {formData.birthdate}</li>
            <li><strong>Gender:</strong> {formData.gender}</li>
            <li><strong>Residence:</strong> {formData.residence}</li>
            <li><strong>Nationality:</strong> {formData.nationality}</li>
            <li><strong>CNIC:</strong> {formData.cnic}</li>
          </ul>
        </section>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadPDF}
        className="mt-8 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition"
      >
        Download PDF
      </button>
    </div>
  );
}
