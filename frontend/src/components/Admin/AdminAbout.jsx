import React, { useEffect, useState } from "react";

function AdminAbout() {
  const [aboutData, setAboutData] = useState({
    title: "",
    intro: "",
    details: "",
    frontendSkills: [],
    backendSkills: [],
    experiences: [],
    contact: {},
  });

  const [newExp, setNewExp] = useState({
    company: "",
    role: "",
    period: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // fetch data
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAboutData({
            title: data.title || "",
            intro: data.intro || "",
            details: data.details || "",
            frontendSkills: data.frontendSkills || [],
            backendSkills: data.backendSkills || [],
            experiences: data.experiences || [],
            contact: data.contact || {},
          });
          setEditingId(data._id || null);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleAddExperience = () => {
    if (!newExp.company.trim() || !newExp.role.trim()) return;
    const updated = [...aboutData.experiences, newExp];
    setAboutData({ ...aboutData, experiences: updated });
    setNewExp({ company: "", role: "", period: "", description: "" });
  };

  const handleRemoveExperience = (index) => {
    const updated = [...aboutData.experiences];
    updated.splice(index, 1);
    setAboutData({ ...aboutData, experiences: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:5000/api/about/${editingId}`
        : "http://localhost:5000/api/about";

      const bodyData = {
        ...aboutData,
        experiences: aboutData.experiences || [],
        frontendSkills: aboutData.frontendSkills || [],
        backendSkills: aboutData.backendSkills || [],
        contact: aboutData.contact || {},
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        const data = await res.json();
        setEditingId(data._id);
        setAboutData(data);
        showNotification("Saved successfully!", "success");
      } else throw new Error("Error saving data");
    } catch (err) {
      console.error(err);
      showNotification("Error saving data", "error");
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg mb-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Admin Panel - About</h2>
          <p className="text-indigo-100 mt-2">Manage profile info & experiences</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-800">Title</label>
            <input
              type="text"
              value={aboutData.title}
              onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* Intro */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-800">Short Intro</label>
            <textarea
              value={aboutData.intro}
              onChange={(e) => setAboutData({ ...aboutData, intro: e.target.value })}
              className="w-full p-3 border rounded-lg min-h-[100px]"
              required
            />
          </div>

          {/* Details */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-800">Details</label>
            <textarea
              value={aboutData.details}
              onChange={(e) => setAboutData({ ...aboutData, details: e.target.value })}
              className="w-full p-3 border rounded-lg min-h-[150px]"
              required
            />
          </div>

          {/* Experiences */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Add New Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Company" value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} className="p-3 border rounded-lg" />
              <input type="text" placeholder="Role" value={newExp.role} onChange={(e) => setNewExp({ ...newExp, role: e.target.value })} className="p-3 border rounded-lg" />
              <input type="text" placeholder="Period" value={newExp.period} onChange={(e) => setNewExp({ ...newExp, period: e.target.value })} className="p-3 border rounded-lg" />
              <textarea placeholder="Description" value={newExp.description} onChange={(e) => setNewExp({ ...newExp, description: e.target.value })} className="p-3 border rounded-lg col-span-1 md:col-span-2" />
            </div>
            <button type="button" onClick={handleAddExperience} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">Add Experience</button>
          </div>

          {/* List Experiences */}
          <div className="mt-6 space-y-4">
            {aboutData.experiences.map((exp, i) => (
              <div key={i} className="bg-indigo-50 p-4 rounded-lg flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-indigo-800">{exp.role} - {exp.company}</h4>
                  <p className="text-sm text-gray-600">{exp.period}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
                <button type="button" onClick={() => handleRemoveExperience(i)} className="text-red-500 font-bold">×</button>
              </div>
            ))}
            {aboutData.experiences.length === 0 && <p className="text-gray-500">No experiences added yet</p>}
          </div>

          {/* Save Button */}
          <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-medium">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAbout;
