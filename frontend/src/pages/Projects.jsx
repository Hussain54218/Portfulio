import React, { useEffect, useState } from "react";
import API from "../services/api";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get("/skills");
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Function to get icon based on string stored in DB
  const getIcon = (iconName) => {
    if (!iconName) return null;
    // Search all icons from FaIcons and SiIcons
    return FaIcons[iconName] || SiIcons[iconName] || null;
  };

  // Random colors for icons
  const iconColors = [
    'text-blue-500', 
    'text-purple-500', 
    'text-red-500', 
    'text-green-500', 
    'text-yellow-500', 
    'text-indigo-500', 
    'text-pink-500', 
    'text-teal-500'
  ];

  const getRandomColor = () => {
    return iconColors[Math.floor(Math.random() * iconColors.length)];
  };

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
            My Skills
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Specializations and technologies I use in my projects
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <p className="text-blue-200 text-lg">No skills have been added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = getIcon(skill.icon);
              const color = getRandomColor();
              
              return (
                <div
                  key={skill._id}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  
                  {/* Decorative dot */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {IconComponent ? (
                    <IconComponent className={`text-5xl ${color} mb-5 transition-transform duration-300 group-hover:scale-110`} />
                  ) : (
                    <div className="w-14 h-14 bg-white/10 mb-5 flex items-center justify-center rounded-full group-hover:bg-white/20 transition-colors duration-300">
                      <span className="text-2xl text-blue-400">?</span>
                    </div>
                  )}
                  
                  <h3 className="text-lg font-semibold text-white text-center group-hover:text-blue-300 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  
                  {/* Additional hover effect */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              );
            })}
          </div>
        )}

        {/* Additional decorative section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-md px-6 py-3">
            <div className="flex space-x-2 mr-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm text-blue-200">Always learning new skills</span>
          </div>
        </div>
      </div>

      {/* Add animation to style */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

export default Skills;