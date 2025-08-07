import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  FileText, 
  LogOut, 
  Bell 
} from 'lucide-react';

const EmployeeDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [availableForms, setAvailableForms] = useState([]);

  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/forms')
      .then(res => res.json())
      .then(data => setAvailableForms(data))
      .catch(err => console.error("Failed to fetch forms", err));
  }, []);

  const upcomingSessions = [
    { id: 1, title: 'Leadership Development Workshop', date: '2024-01-20', time: '10:00 AM', status: 'upcoming', hasForm: true },
    { id: 2, title: 'Technical Skills Training', date: '2024-01-22', time: '2:00 PM', status: 'upcoming', hasForm: true },
    { id: 3, title: 'Team Communication Session', date: '2024-01-18', time: '11:00 AM', status: 'completed', hasForm: true, feedbackSubmitted: false }
  ];

  const completedSessions = [
    { id: 4, title: 'Project Management Basics', date: '2024-01-15', feedbackSubmitted: true },
    { id: 5, title: 'Customer Service Excellence', date: '2024-01-12', feedbackSubmitted: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Employee Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.name || "Employee"}
              </p>
            </div>
            <div className="flex space-x-4">
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
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming Training Sessions
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingSessions
                .filter((session) => session.status === "upcoming")
                .map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {session.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{session.date}</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{session.time}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        Upcoming
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Pending Feedback */}
        {availableForms.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Available Feedback Forms
              </h2>
              <p className="text-gray-600">
                Click below to fill out general feedback forms
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {availableForms.map((form) => (
                  <Link
                    key={form.id}
                    to={`/employee/feedback/${form.id}`}
                    className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {form.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {form.description}
                        </p>
                      </div>
                    </div>
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                      Submit Feedback
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Available Feedback Forms
              </h2>
              <p className="text-gray-600">
                Click below to fill out general feedback forms
              </p>
            </div>
            <div className="p-6 text-center text-gray-500">
              <p>No feedback forms are currently available.</p>
            </div>
          </div>
        )}

        {/* Recent Completed Sessions */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Completed Sessions
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {completedSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {session.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Completed on {session.date}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    Feedback Submitted
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeDashboard;
