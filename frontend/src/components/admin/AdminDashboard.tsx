import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  FileText,
  BarChart3,
  Calendar,
  Plus,
  TrendingUp,
  LogOut,
  Settings,
} from "lucide-react";
const AdminDashboard = ({ user }) => {
  const [recentForms, setRecentForms] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const stats = [
    { title: "Total Forms", value: "12", icon: FileText, color: "blue" },
    { title: "Active Sessions", value: "8", icon: Calendar, color: "green" },
    { title: "Responses", value: "156", icon: Users, color: "purple" },
    { title: "Avg Rating", value: "4.2", icon: TrendingUp, color: "orange" },
  ];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/forms/recent`) // Adjust port if needed
      .then((res) => setRecentForms(res.data))
      .catch((err) => console.error("Error fetching forms:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.name || "Admin"}
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/admin/forms"
            className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            <div className="flex items-center space-x-3">
              <Plus className="h-6 w-6" />
              <span className="font-semibold">Create Form</span>
            </div>
            <p className="text-blue-100 text-sm mt-2">
              Build new feedback forms
            </p>
          </Link>

          <Link
            to="/admin/sessions"
            className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition duration-200"
          >
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6" />
              <span className="font-semibold">Manage Sessions</span>
            </div>
            <p className="text-green-100 text-sm mt-2">
              Schedule training sessions
            </p>
          </Link>

          <Link
            to="/admin/analytics"
            className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition duration-200"
          >
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-6 w-6" />
              <span className="font-semibold">View Analytics</span>
            </div>
            <p className="text-purple-100 text-sm mt-2">
              Analyze feedback data
            </p>
          </Link>

          <div className="bg-orange-600 text-white p-6 rounded-xl hover:bg-orange-700 transition duration-200 cursor-pointer">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6" />
              <span className="font-semibold">User Management</span>
            </div>
            <p className="text-orange-100 text-sm mt-2">
              Manage users & permissions
            </p>
          </div>
        </div>

        {/* Recent Forms */}
        <h1 className="text-2xl font-bold text-gray-600 pb-2">Recent Forms</h1>
        {recentForms.map((form, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div>
              <h3 className="font-medium text-gray-900">{form.title}</h3>
              <p className="text-sm text-gray-600">
                Created on {new Date(form.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">0 responses</p>
              <p className="text-sm text-gray-600">Total submissions</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;