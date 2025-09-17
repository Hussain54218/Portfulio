import React, { useContext, useState, lazy, Suspense } from "react";
import { ProjectContext } from "../context/ProjectContext";

// Lazy loaded sections
const ProjectsSection = lazy(() =>
  import("../components/Admin/ProjectsSection")
);
const MessagesSection = lazy(() =>
  import("../components/Admin/MessagesSection")
);
const SkillsSection = lazy(() => import("../components/Admin/SkillsSection"));
const UsersSection = lazy(() => import("../components/Admin/UsersSection"));
const ReportsSection = lazy(() => import("../components/Admin/ReportsSection"));
const SettingsSection = lazy(() =>
  import("../components/Admin/SettingsSection")
);
const HomeSection = lazy(() => import("../components/Admin/AdminHome")); // ✅
const AboutSection = lazy(() => import("../components/Admin/AdminAbout")); // ✅ اضافه شد

// Loading component
const SectionLoading = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    <span className="mr-3 text-gray-500">در حال بارگذاری...</span>
  </div>
);

function Admin() {
  const { projects, messages } = useContext(ProjectContext);
  const [activeTab, setActiveTab] = useState("projects");

  const tabLabels = {
  home: "صفحه اصلی",
  projects: "پروژه‌ها",
  messages: "پیام‌ها",
  skills: "مهارت‌ها",
  users: "کاربران",
  reports: "گزارشات",
  settings: "تنظیمات",
  about: "درباره من", // ✅ تب جدید
};

const itemsCount = {
  home: 0,
  projects: projects.length,
  messages: messages.length,
  skills: 0,
  users: 0,
  reports: 0,
  settings: 0,
  about: 0, // ✅ تعداد مهارت‌ها یا داده‌ها
};

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const contentElement = document.getElementById("admin-content");
    if (contentElement) contentElement.scrollTop = 0;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar ثابت */}
      <div className="w-64 bg-indigo-800 text-white shadow-lg flex-shrink-0">
        {/* سایت بار کوچک */}
        <div className="h-16 flex items-center justify-center border-b border-indigo-700">
          <h2 className="text-xl font-bold">پنل مدیریت</h2>
        </div>

        {/* تب‌ها */}
        <div
          className="p-2 space-y-2 overflow-auto"
          style={{ maxHeight: "calc(100vh - 64px)" }}
        >
          {Object.keys(tabLabels).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`block w-full text-right p-3 rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-indigo-700 shadow-md"
                  : "hover:bg-indigo-700 hover:bg-opacity-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{tabLabels[tab]}</span>
                <div className="flex items-center">
                  {itemsCount[tab] > 0 && (
                    <span className="bg-indigo-500 text-white text-xs font-medium px-2 py-1 rounded-full ml-2">
                      {itemsCount[tab]}
                    </span>
                  )}
                  <span className="text-sm">
                    {tab === "projects" && "📁"}
                    {tab === "messages" && "✉️"}
                    {tab === "skills" && "⚡"}
                    {tab === "users" && "👥"}
                    {tab === "reports" && "📊"}
                     {tab === "about" && "ℹ️"} 
                    {tab === "settings" && "⚙️"}
                   
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content با اسکرول مستقل */}
      <div
        id="admin-content"
        className="flex-1 p-4 md:p-6 overflow-auto h-screen"
      >
        <Suspense fallback={<SectionLoading />}>
          {activeTab === "home" && <HomeSection />} {/* ✅ */}
          {activeTab === "projects" && <ProjectsSection />}
          {activeTab === "messages" && <MessagesSection />}
          {activeTab === "skills" && <SkillsSection />}
          {activeTab === "users" && <UsersSection />}
          {activeTab === "reports" && <ReportsSection />}
            {activeTab === "about" && <AboutSection />} {/* ✅ اضافه شد */}
          {activeTab === "settings" && <SettingsSection />}
        </Suspense>
      </div>
    </div>
  );
}

export default Admin;
