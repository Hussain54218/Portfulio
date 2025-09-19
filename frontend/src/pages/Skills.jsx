import React, { useState, useEffect } from "react";
import { FaReact, FaPython, FaQuestion, FaPlus, FaLightbulb, FaCloudUploadAlt, FaFilePdf, FaEdit, FaTrash } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiHtml5, SiCss3, SiTailwindcss, SiNextdotjs } from "react-icons/si";

function AdminSkills() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // عرض الإشعارات
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // نقشه‌ای از آیکون‌های موجود
  const iconMap = {
    FaReact: <FaReact className="text-blue-500" />,
    FaPython: <FaPython className="text-blue-800" />,
    SiJavascript: <SiJavascript className="text-yellow-500" />,
    SiTypescript: <SiTypescript className="text-blue-600" />,
    SiNodedotjs: <SiNodedotjs className="text-green-600" />,
    SiExpress: <SiExpress className="text-gray-800" />,
    SiMongodb: <SiMongodb className="text-green-700" />,
    SiMysql: <SiMysql className="text-blue-700" />,
    SiHtml5: <SiHtml5 className="text-orange-600" />,
    SiCss3: <SiCss3 className="text-blue-500" />,
    SiTailwindcss: <SiTailwindcss className="text-cyan-500" />,
    SiNextdotjs: <SiNextdotjs className="text-black" />,
  };

  // دریافت مهارت‌ها از سرور
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("https://portfulio-5.onrender.com/api/skills");
      const data = await response.json();
      if (response.ok) {
        setSkills(data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // اضافه کردن یا ویرایش مهارت
  const saveSkill = async () => {
    if (!name || !icon) {
      showNotification("لطفاً نام و آیکون مهارت را وارد کنید", "error");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const url = editingSkill 
        ? `https://portfulio-5.onrender.comapi/skills/${editingSkill._id}`
        : "https://portfulio-5.onrender.com/api/skills";
      
      const method = editingSkill ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, icon }),
      });

      if (response.ok) {
        showNotification(
          editingSkill ? "مهارت با موفقیت ویرایش شد ✅" : "مهارت با موفقیت اضافه شد ✅", 
          "success"
        );
        resetForm();
        fetchSkills();
      } else {
        throw new Error("خطا در ذخیره مهارت");
      }
    } catch (error) {
      console.error("Error saving skill:", error);
      showNotification("خطا در ذخیره مهارت", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // حذف مهارت
  const deleteSkill = async (id) => {
    if (!window.confirm("آیا از حذف این مهارت اطمینان دارید؟")) return;
    
    try {
      const response = await fetch(`https://portfulio-5.onrender.com/api/skills/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showNotification("مهارت با موفقیت حذف شد ✅", "success");
        fetchSkills();
      } else {
        throw new Error("خطا در حذف مهارت");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      showNotification("خطا در حذف مهارت", "error");
    }
  };

  // ویرایش مهارت
  const editSkill = (skill) => {
    setEditingSkill(skill);
    setName(skill.name);
    setIcon(skill.icon);
    setSelectedIcon(skill.icon);
  };

  // بازنشانی فرم
  const resetForm = () => {
    setName("");
    setIcon("");
    setSelectedIcon(null);
    setEditingSkill(null);
  };

  // آپلود CV
  const uploadCV = async () => {
    if (!cvFile) {
      showNotification("لطفاً یک فایل انتخاب کنید", "error");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("cv", cvFile);

      const response = await fetch("https://portfulio-5.onrender.com/api/skills/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showNotification("رزومه با موفقیت آپلود شد ✅", "success");
        setCvFile(null);
      } else {
        throw new Error("خطا در آپلود رزومه");
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      showNotification("خطا در آپلود رزومه", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // انتخاب آیکون
  const handleIconSelect = (iconKey) => {
    setIcon(iconKey);
    setSelectedIcon(iconKey);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* نافتیفیکیشن */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
          notification.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-lg mb-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold">مدیریت مهارت‌ها و رزومه</h2>
          <p className="text-indigo-100 mt-2">افزودن، ویرایش و حذف مهارت‌ها و آپلود رزومه</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* بخش افزودن/ویرایش مهارت */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaLightbulb className="h-5 w-5 ml-2 text-indigo-600" />
              {editingSkill ? "ویرایش مهارت" : "افزودن مهارت جدید"}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نام مهارت</label>
                <input
                  type="text"
                  placeholder="مثلاً: React, Python, JavaScript"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">انتخاب آیکون</label>
                
                {/* نمایش آیکون انتخاب شده */}
                {selectedIcon && (
                  <div className="flex items-center justify-center p-3 mb-3 bg-indigo-100 rounded-lg">
                    <span className="text-2xl mr-2">
                      {iconMap[selectedIcon]}
                    </span>
                    <span className="text-sm text-indigo-800">{selectedIcon}</span>
                  </div>
                )}
                
                {/* لیست آیکون‌های قابل انتخاب */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3 p-3 bg-gray-100 rounded-lg max-h-60 overflow-y-auto">
                  {Object.entries(iconMap).map(([key, IconComponent]) => (
                    <div
                      key={key}
                      onClick={() => handleIconSelect(key)}
                      className={`p-2 flex flex-col items-center justify-center rounded cursor-pointer transition-all ${
                        selectedIcon === key 
                          ? 'bg-indigo-500 text-white' 
                          : 'bg-white text-gray-700 hover:bg-indigo-100'
                      }`}
                    >
                      <span className="text-lg">{IconComponent}</span>
                      <span className="text-xs mt-1 truncate w-full text-center">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={saveSkill}
                  disabled={!name || !icon || isLoading}
                  className={`flex-1 py-3 rounded-lg font-medium transition flex items-center justify-center ${
                    name && icon && !isLoading
                      ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      در حال ذخیره...
                    </>
                  ) : editingSkill ? (
                    <>
                      <FaEdit className="h-5 w-5 ml-2" />
                      ویرایش مهارت
                    </>
                  ) : (
                    <>
                      <FaPlus className="h-5 w-5 ml-2" />
                      افزودن مهارت
                    </>
                  )}
                </button>
                
                {editingSkill && (
                  <button
                    onClick={resetForm}
                    className="px-4 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition"
                  >
                    انصراف
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* بخش آپلود رزومه */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaCloudUploadAlt className="h-5 w-5 ml-2 text-indigo-600" />
              آپلود رزومه (CV)
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaFilePdf className="h-10 w-10 text-red-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-semibold">کلیک برای انتخاب فایل</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {cvFile ? cvFile.name : "PDF حداکثر 5MB"}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={(e) => setCvFile(e.target.files[0])} 
                    className="hidden" 
                  />
                </label>
              </div>
              
              <button
                onClick={uploadCV}
                disabled={!cvFile || isLoading}
                className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center ${
                  cvFile && !isLoading
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    در حال آپلود...
                  </>
                ) : (
                  <>
                    <FaCloudUploadAlt className="h-5 w-5 ml-2" />
                    آپلود رزومه
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* بخش نمایش مهارت‌ها */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            مهارت‌های موجود
          </h3>
          
          {skills.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FaQuestion className="h-12 w-12 mx-auto text-gray-300 mb-2" />
              <p>هیچ مهارتی اضافه نشده است</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div key={skill._id} className="bg-gray-50 rounded-lg p-4 flex flex-col items-center relative group">
                  <span className="text-2xl mb-2">
                    {iconMap[skill.icon] || <FaQuestion className="text-gray-400" />}
                  </span>
                  <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                  
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                    <button
                      onClick={() => editSkill(skill)}
                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      <FaEdit className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => deleteSkill(skill._id)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      <FaTrash className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSkills;