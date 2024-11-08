// app/page.tsx
import Link from 'next/link';
import Footer from "./Footer";

export default function Home() {
  return (
   <> 
   <div className="text-center min-h-screen bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 text-white">
      {/* Navbar */}
      <nav className="flex justify-center items-center p-4 md:p-6 relative">
        {/* Left Chevron SVG pointing right */}
        <div className="mr-0 animate-slide-chevron-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 md:h-12 md:w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <h1 className="text-xl md:text-3xl font-bold mx-2 md:mx-4">Quick Resume</h1>

        {/* Right Chevron SVG pointing left */}
        <div className="ml-0 animate-slide-chevron-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 md:h-12 md:w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
          </svg>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] h-auto px-4 md:px-8 text-center space-y-4 md:space-y-6">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6">Build Your Professional Resume</h2>
        <p className="text-sm md:text-lg mb-4 md:mb-8">
          Start building your resume with our easy-to-use builder. Choose from our professional templates.
        </p>
        <Link href="/create-resume">
          <h3 className="px-5 py-3 md:px-7 md:py-3 bg-green-500 text-white-800 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Create Resume
          </h3>

        </Link>

        <section id="templates" className="w-full p-4 md:p-12 py-3">
          <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-8 text-center">Choose Your Template</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-sm md:max-w-4xl mx-auto">
            {/* Template Card 1 */}
            <div className="bg-white text-gray-800 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer">
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Template 1 (Without Image)</h4>
              <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">
                A simple text-focused template for professionals.
              </p>
              <Link href="/basic-resume">
                <button className="px-4 py-2 md:px-5 md:py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition">
                  Select Template
                </button>
              </Link>
            </div>

            {/* Template Card 2 */}
            <div className="bg-white text-gray-800 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer">
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Template 2 (With Image)</h4>
              <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">
                A modern template with a profile image.
              </p>
              <Link href="/image-resume">
                <button className="px-4 py-2 md:px-5 md:py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                  Select Template
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      
    </div>
    <Footer/>
    </>
  );
}
