// components/Admin/HomeSection.jsx
import React, { useEffect, useState } from "react";

function HomeSection() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    skills: "",
  });
  const [imageFile, setImageFile] = useState(null);

  // گرفتن داده‌های ذخیره‌شده از بک‌اند
  useEffect(() => {
    fetch("http://localhost:5000/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setForm({
            title: data.title || "",
            subtitle: data.subtitle || "",
            description: data.description || "",
            skills: data.skills?.join(", ") || "",
          });
        }
      })
      .catch((err) => console.error("Error fetching home data:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ارسال داده به بک‌اند
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("description", form.description);
    formData.append("skills", form.skills);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await fetch("http://localhost:5000/api/home", {
      method: "POST",
      body: formData,
    });

    alert("اطلاعات Home با موفقیت ذخیره شد ✅");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">مدیریت صفحه Home</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700"
        >
          ذخیره اطلاعات
        </button>
      </form>
    </div>
  );
}

export default HomeSection;
