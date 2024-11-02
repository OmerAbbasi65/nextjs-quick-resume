// app/pic-resume-ready/page.jsx
"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image"; // Import Image component
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export default function PicResumeReady() {
  const searchParams = useSearchParams();
  const resumeRef = useRef();
  const [imageBase64, setImageBase64] = useState(null);

  const formData = {
    name: searchParams.get("name"),
    birthdate: searchParams.get("birthdate"),
    gender: searchParams.get("gender"),
    residence: searchParams.get("residence"),
    nationality: searchParams.get("nationality"),
    cnic: searchParams.get("cnic"),
    title: searchParams.get("title"),
    profile: searchParams.get("profile"),
    experience: searchParams.get("experience"),
    education: searchParams.get("education"),
    skills: searchParams.get("skills"),
    languages: searchParams.get("languages"),
    contact: searchParams.get("contact"),
    imageBase64
  };

  // Image upload and conversion to base64
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = () => setImageBase64(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a PNG image.");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    let yPosition = 60;

    // Centered Header with Image
    if (imageBase64) {
      doc.addImage(imageBase64, "PNG", 250, 20, 100, 100); // Center the image horizontally
    }
    doc.setFontSize(16);
    doc.text(`${formData.name}`, 300, yPosition + 120, { align: "center" });

    autoTable(doc, {
      startY: yPosition + 140,
      head: [['Section', 'Details']],
      body: [
        ['Profile', formData.profile],
        ['Experience', formData.experience],
        ['Education', formData.education],
        ['Skills', formData.skills],
        ['Languages', formData.languages],
        ['Contact', formData.contact],
        ['Personal Info', 
          `Name: ${formData.name}\n
          Birthdate: ${formData.birthdate}\n
          Gender: ${formData.gender}\n
          Residence: ${formData.residence}\n
          Nationality: ${formData.nationality}\n
          CNIC: ${formData.cnic}`]
      ],
      didDrawPage: (data) => {
        yPosition = data.cursor.y + 20;
      },
      margin: { top: 70, left: 40, right: 40, bottom: 40 },
      theme: 'striped',
    });

    const pageCount = doc.internal.getNumberOfPages();
    if (pageCount > 1) {
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, 470, 800);
      }
    }

    doc.save(`${formData.name}_Resume.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 p-8 flex flex-col items-center">
      <header className="text-center mb-12">
        <input type="file" accept="image/png" onChange={handleImageUpload} className="mb-4" />
        {imageBase64 && (
          <Image
            src={imageBase64}
            alt="Profile Image"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mb-4 mx-auto"
            priority // ensures the image is loaded quickly
          />
        )}
        <h1 className="text-4xl font-bold text-center">{formData.name}</h1>
        <span className="text-xl text-gray-600 text-center">{formData.title}</span>
      </header>

      <div ref={resumeRef} className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Profile</h6>
          <p>{formData.profile}</p>
        </section>
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Experience</h6>
          <p>{formData.experience}</p>
        </section>
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Education</h6>
          <p>{formData.education}</p>
        </section>
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Skills</h6>
          <p>{formData.skills}</p>
        </section>
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Languages</h6>
          <p>{formData.languages}</p>
        </section>
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Contact</h6>
          <p>{formData.contact}</p>
        </section>
        <section className="mb-8">
          <h6 className="text-lg font-semibold">Personal Info</h6>
          <p>
            Name: {formData.name}<br />
            Birthdate: {formData.birthdate}<br />
            Gender: {formData.gender}<br />
            Residence: {formData.residence}<br />
            Nationality: {formData.nationality}<br />
            CNIC: {formData.cnic}
          </p>
        </section>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mt-8 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition"
      >
        Download PDF
      </button>
    </div>
  );
}
