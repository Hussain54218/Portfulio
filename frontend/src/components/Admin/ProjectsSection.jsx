import React, { useContext, useState } from "react";
import { ProjectContext } from "../../context/ProjectContext";
const ProjectsSection = () => {
  const { projects, addProject, deleteProject, rateProject } = useContext(ProjectContext);
  
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    liveDemo: "",
    image: null,
  });
  
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProject({ ...newProject, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    const formData = new FormData();
    Object.keys(newProject).forEach((key) => {
      if (newProject[key]) formData.append(key, newProject[key]);
    });

    await addProject(formData);
    setNewProject({ title: "", description: "", technologies: "", github: "", liveDemo: "", image: null });
    setPreviewImage(null);
  };

  const handleRate = async (id) => {
    const rating = parseFloat(prompt("امتیاز بدهید (1 تا 5):"));
    if (!rating || rating < 1 || rating > 5) return alert("امتیاز معتبر نیست!");
    await rateProject(id, rating);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">مدیریت پروژه‌ها</h2>

      {/* Add Project Form */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-indigo-700">افزودن پروژه جدید</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="title" value={newProject.title} onChange={handleChange} placeholder="عنوان پروژه" className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" required />
          <input type="text" name="technologies" value={newProject.technologies} onChange={handleChange} placeholder="تکنولوژی‌ها (با کاما جدا کنید)" className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
          <input type="text" name="github" value={newProject.github} onChange={handleChange} placeholder="آدرس GitHub" className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
          <input type="text" name="liveDemo" value={newProject.liveDemo} onChange={handleChange} placeholder="آدرس دموی زنده" className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">تصویر پروژه</label>
            <input type="file" name="image" onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full" accept="image/*" />
          </div>
          {previewImage && (
            <div className="col-span-2">
              <p className="text-sm text-gray-600 mb-1">پیش‌نمایش تصویر:</p>
              <img src={previewImage} alt="Preview" className="w-full h-48 object-contain rounded-lg mt-2 border" />
            </div>
          )}
          <div className="col-span-2">
            <textarea name="description" value={newProject.description} onChange={handleChange} placeholder="توضیحات پروژه" className="border border-gray-300 rounded-lg p-3 w-full h-32 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" required />
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 col-span-2 transition shadow-md hover:shadow-lg">افزودن پروژه</button>
        </form>
      </div>

      {/* Projects List */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">لیست پروژه‌ها</h3>
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-500 text-lg">هنوز پروژه‌ای اضافه نشده است.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p._id} className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition">
                {p.image && <img src={`http://localhost:5000${p.image}`} alt={p.title} className="w-full h-48 object-cover" />}
                <div className="p-5">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{p.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{p.description}</p>
                  {p.technologies && p.technologies.length > 0 && (
                    <p className="text-sm mt-2 text-gray-500">
                      <strong className="text-indigo-600">تکنولوژی‌ها:</strong> 
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs mr-1">
                        {p.technologies.join(", ")}
                      </span>
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                      <span className="text-yellow-500 ml-1">⭐</span>
                      <span>{p.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm mr-2">({p.votes} رأی)</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleRate(p._id)} className="bg-amber-400 text-white px-3 py-1 rounded-lg text-sm hover:bg-amber-500 transition shadow-sm">امتیاز</button>
                      <button onClick={() => deleteProject(p._id)} className="bg-rose-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-rose-600 transition shadow-sm">حذف</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;