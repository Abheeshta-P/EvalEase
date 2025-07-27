
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  FileText, 
  User, 
  LogOut,
  Bell
} from 'lucide-react';

const EmployeeDashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const upcomingSessions = [
    { 
      id: 1, 
      title: 'Leadership Development Workshop', 
      date: '2024-01-20', 
      time: '10:00 AM',
      status: 'upcoming',
      hasForm: true
    },
    { 
      id: 2, 
      title: 'Technical Skills Training', 
      date: '2024-01-22', 
      time: '2:00 PM',
      status: 'upcoming',
      hasForm: true
    },
    { 
      id: 3, 
      title: 'Team Communication Session', 
      date: '2024-01-18', 
      time: '11:00 AM',
      status: 'completed',
      hasForm: true,
      feedbackSubmitted: false
    }
  ];

  const completedSessions = [
    { 
      id: 4, 
      title: 'Project Management Basics', 
      date: '2024-01-15', 
      feedbackSubmitted: true
    },
    { 
      id: 5, 
      title: 'Customer Service Excellence', 
      date: '2024-01-12', 
      feedbackSubmitted: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name || 'Employee'}</p>
            </div>
            <div className="flex space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-800 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Sessions</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-full">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Feedback</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Training Sessions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingSessions.filter(session => session.status === 'upcoming').map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.title}</h3>
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
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Pending Feedback</h2>
            <p className="text-gray-600">Please provide feedback for completed sessions</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingSessions.filter(session => session.status === 'completed' && !session.feedbackSubmitted).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <FileText className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.title}</h3>
                      <p className="text-sm text-gray-600">Completed on {session.date}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/employee/feedback/${session.id}`}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-200"
                  >
                    Submit Feedback
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Recent Completed Sessions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {completedSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.title}</h3>
                      <p className="text-sm text-gray-600">Completed on {session.date}</p>
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
