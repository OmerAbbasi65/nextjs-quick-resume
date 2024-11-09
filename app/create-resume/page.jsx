// app/create-resume/page.jsx
"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../context/FormContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CreateResume = () => {
  const { setFormData } = useFormContext();
  const [optionalFields, setOptionalFields] = useState([
    { name: "profile", label: "Profile" },
    { name: "experience", label: "Experience" },
    { name: "education", label: "Education" },
    { name: "skills", label: "Skills" },
  ]);
  const [generatedLink, setGeneratedLink] = useState(null);

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50).required("Required"),
      birthdate: Yup.date().required("Required"),
      gender: Yup.string().oneOf(["Male", "Female"]).required("Required"),
      residence: Yup.string().max(80).required("Required"),
      nationality: Yup.string().max(15).required("Required"),
      cnic: Yup.string().matches(/^\d{13}$/, "Must be 13 digits").required("Required"),
      title: Yup.string().max(20).required("Required"),
      languages: Yup.string().max(250),
      contact: Yup.string().max(100),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      setFormData(formData);

      const response = await fetch("/api/saveResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const { id } = await response.json();
      setGeneratedLink(`${window.location.origin}/resume/${id}`);
    },
  });

  const handleAddField = () => {
    const fieldName = prompt("Enter the name for the new field:");
    if (fieldName) {
      setOptionalFields((prev) => [...prev, { name: fieldName.toLowerCase(), label: fieldName }]);
      formik.setFieldValue(fieldName.toLowerCase(), "");
    }
  };

  const handleRemoveField = (name) => {
    setOptionalFields((prev) => prev.filter((field) => field.name !== name));
    formik.setFieldValue(name, "");
  };

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();
    pdf.text("Resume", 14, 10);
    autoTable(pdf, {
      startY: 20,
      head: [["Section", "Details"]],
      body: [
        ["Name", formik.values.name],
        ["Birthdate", formik.values.birthdate],
        ["Gender", formik.values.gender],
        ["Residence", formik.values.residence],
        ["Nationality", formik.values.nationality],
        ["CNIC", formik.values.cnic],
        ["Title", formik.values.title],
        ["Languages", formik.values.languages],
        ["Contact", formik.values.contact],
        ...optionalFields.map(({ name, label }) => [label, formik.values[name] || ""]),
      ],
    });
    pdf.save("Resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 p-4">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Create Your Resume</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Resume</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Name:</strong> {formik.values.name}</p>
            <p><strong>Title:</strong> {formik.values.title}</p>
            <p><strong>Contact:</strong> {formik.values.contact}</p>
            <p><strong>Birthdate:</strong> {formik.values.birthdate}</p>
            <p><strong>Gender:</strong> {formik.values.gender}</p>
            <p><strong>Residence:</strong> {formik.values.residence}</p>
            <p><strong>Nationality:</strong> {formik.values.nationality}</p>
            <p><strong>CNIC:</strong> {formik.values.cnic}</p>
            <p><strong>Languages:</strong> {formik.values.languages}</p>
            {optionalFields.map(({ name, label }) => (
              <p key={name}>
                <strong>{label}:</strong> {formik.values[name]}
              </p>
            ))}
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {["Name", "Birthdate", "Gender", "Residence", "Nationality", "CNIC", "Title", "Languages", "Contact"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{field}</label>
              <input
                type={field === "Birthdate" ? "date" : "text"}
                name={field.toLowerCase()}
                placeholder={field === "CNIC" ? "Enter your 13 Digit CNIC" : `Enter ${field}`}
                {...formik.getFieldProps(field.toLowerCase())}
                className="mt-1 block w-full p-2 border rounded border-gray-300"
              />
              {formik.touched[field.toLowerCase()] && formik.errors[field.toLowerCase()] && (
                <div className="text-red-500 text-sm">{formik.errors[field.toLowerCase()]}</div>
              )}
            </div>
          ))}

          {optionalFields.map(({ name, label }) => (
            <div key={name} className="relative">
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <textarea
                name={name}
                {...formik.getFieldProps(name)}
                className="mt-1 block w-full p-2 border rounded border-gray-300"
                placeholder={`Enter ${label}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveField(name)}
                className="absolute top-2 right-2 text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddField}
            className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600"
          >
            Add Optional Field
          </button>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
            >
              Generate Link
            </button>
            {generatedLink && (
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600"
              >
                View Resume
              </a>
            )}
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(generatedLink || "")}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600"
              disabled={!generatedLink}
            >
              Copy Link
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
            >
              Download
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResume;
