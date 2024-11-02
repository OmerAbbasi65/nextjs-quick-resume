// app/basic-resume/page.jsx
"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../FormContext"; // Import context

export default function BasicResume() {
  const router = useRouter();
  const { setFormData } = useFormContext(); // Access setFormData from context

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    birthdate: Yup.date().required("Birthdate is required"),
    gender: Yup.string().required("Gender is required"),
    residence: Yup.string().required("Residence is required"),
    nationality: Yup.string().required("Nationality is required"),
    cnic: Yup.string().min(13, "CNIC must be 13 digits").max(13, "CNIC must be 13 digits").required("CNIC is required"),
    title: Yup.string().required("Title is required"),
    profile: Yup.string().required("Profile Introduction is required"),
    experience: Yup.string().required("Experience is required"),
    education: Yup.string().required("Education is required"),
    skills: Yup.string().required("Skills are required"),
    languages: Yup.string().required("Languages are required"),
    contact: Yup.string().required("Contact is required"),
  });

  const initialValues = {
    name: "",
    birthdate: "",
    gender: "",
    residence: "",
    nationality: "",
    cnic: "",
    title: "",
    profile: "",
    experience: "",
    education: "",
    skills: "",
    languages: "",
    contact: "",
  };

  const handleSubmit = (values) => {
    setFormData(values); // Set form data in context
    router.push("/resume-ready"); // Navigate without query params
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl text-white font-bold mb-6">Create Your Resume</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form className="bg-gray-100 p-8 rounded-lg shadow-lg space-y-4 w-full max-w-lg">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Birthdate", name: "birthdate", type: "date" },
              { label: "Gender", name: "gender", type: "text" },
              { label: "Residence", name: "residence", type: "text" },
              { label: "Nationality", name: "nationality", type: "text" },
              { label: "CNIC", name: "cnic", type: "text" },
              { label: "Title", name: "title", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor={name}>
                  {label}:
                </label>
                <Field
                  type={type}
                  id={name}
                  name={name}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
              </div>
            ))}

            {[
              { label: "Profile Introduction", name: "profile" },
              { label: "Experience", name: "experience" },
              { label: "Education", name: "education" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor={name}>
                  {label}:
                </label>
                <Field
                  as="textarea"
                  id={name}
                  name={name}
                  className="w-full p-2 border border-gray-300 rounded-lg resize-y"
                  rows={3}
                />
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
              </div>
            ))}

            {[
              { label: "Skills", name: "skills", type: "text" },
              { label: "Languages", name: "languages", type: "text" },
              { label: "Contact", name: "contact", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor={name}>
                  {label}:
                </label>
                <Field
                  type={type}
                  id={name}
                  name={name}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => handleClear(resetForm)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition"
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
