import React, { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";

const MessagesSection = () => {
  const { messages, deleteMessage } = useContext(ProjectContext);

  const handleDeleteMessage = async (id) => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید این پیام را حذف کنید؟")) {
      await deleteMessage(id);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">پیام‌های کاربران</h2>
      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500 text-lg">هیچ پیامی وجود ندارد.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(m => (
            <div key={m._id} className="bg-white shadow-md rounded-xl p-5 border-l-4 border-indigo-400 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">نام</span>
                    <span className="mr-2 font-medium text-gray-800">{m.name}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">ایمیل</span>
                    <span className="mr-2 text-gray-600">{m.email}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2">
                    <p className="text-gray-700">{m.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">{new Date(m.createdAt).toLocaleString('fa-IR')}</p>
                </div>
                <button onClick={() => handleDeleteMessage(m._id)} className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-600 transition text-sm mr-3">حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesSection;