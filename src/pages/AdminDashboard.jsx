import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [platformMessage, setPlatformMessage] = useState('');

  // Sample admin data
  const [adminData] = useState({
    totalUsers: 1247,
    totalSwaps: 892,
    pendingReviews: 23,
    bannedUsers: 8,
    platformHealth: 'Good',
  });

  // Sample users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      status: 'active',
      joinDate: '2024-01-15',
      totalSwaps: 12,
      rating: 4.8,
      reports: 0,
      lastActive: '2024-01-20',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      status: 'active',
      joinDate: '2024-01-10',
      totalSwaps: 8,
      rating: 4.9,
      reports: 0,
      lastActive: '2024-01-20',
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@example.com',
      status: 'banned',
      joinDate: '2024-01-05',
      totalSwaps: 3,
      rating: 2.1,
      reports: 5,
      lastActive: '2024-01-18',
      banReason: 'Inappropriate behavior and spam',
    },
    {
      id: 4,
      name: 'Lisa Park',
      email: 'lisa.park@example.com',
      status: 'active',
      joinDate: '2024-01-12',
      totalSwaps: 15,
      rating: 4.7,
      reports: 1,
      lastActive: '2024-01-20',
    },
  ]);

  // Sample skills pending review
  const [pendingSkills, setPendingSkills] = useState([
    {
      id: 1,
      title: 'Advanced Hacking Techniques',
      instructor: 'Anonymous User',
      description: 'Learn to hack into systems and bypass security...',
      status: 'pending',
      submittedDate: '2024-01-20',
      category: 'Programming',
      level: 'Advanced',
      flags: ['Inappropriate content', 'Security concerns'],
    },
    {
      id: 2,
      title: 'Make Money Fast Online',
      instructor: 'John Smith',
      description: 'Get rich quick with this amazing opportunity...',
      status: 'pending',
      submittedDate: '2024-01-19',
      category: 'Business',
      level: 'Beginner',
      flags: ['Spam', 'Suspicious content'],
    },
    {
      id: 3,
      title: 'Professional Photography',
      instructor: 'Emma Wilson',
      description: 'Learn professional photography techniques and editing...',
      status: 'pending',
      submittedDate: '2024-01-18',
      category: 'Arts',
      level: 'Intermediate',
      flags: [],
    },
  ]);

  // Sample swap requests
  const [swapRequests, setSwapRequests] = useState([
    {
      id: 1,
      requester: 'John Doe',
      instructor: 'Sarah Chen',
      skill: 'Web Development',
      status: 'pending',
      date: '2024-01-20',
      message: 'I would love to learn React development!',
    },
    {
      id: 2,
      requester: 'Lisa Park',
      instructor: 'Mike Rodriguez',
      skill: 'Guitar Lessons',
      status: 'accepted',
      date: '2024-01-19',
      message: 'Looking forward to our session!',
    },
    {
      id: 3,
      requester: 'Anonymous User',
      instructor: 'Emma Wilson',
      skill: 'Photography',
      status: 'cancelled',
      date: '2024-01-18',
      message: 'Sorry, I need to cancel this request.',
    },
  ]);

  // Sample platform messages
  const [platformMessages, setPlatformMessages] = useState([
    {
      id: 1,
      title: 'New Feature: Video Calls',
      message: 'We\'re excited to announce that video calls are now available for skill exchanges!',
      type: 'feature',
      date: '2024-01-15',
      sent: true,
    },
    {
      id: 2,
      title: 'Scheduled Maintenance',
      message: 'The platform will be down for maintenance on January 25th from 2-4 AM EST.',
      type: 'maintenance',
      date: '2024-01-20',
      sent: false,
    },
  ]);

  const handleApproveSkill = (skillId) => {
    setPendingSkills(prev =>
      prev.map(skill =>
        skill.id === skillId
          ? { ...skill, status: 'approved' }
          : skill,
      ),
    );
  };

  const handleRejectSkill = (skillId) => {
    setPendingSkills(prev =>
      prev.map(skill =>
        skill.id === skillId
          ? { ...skill, status: 'rejected' }
          : skill,
      ),
    );
  };

  const handleBanUser = (userId) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: 'banned', banReason }
          : user,
      ),
    );
    setShowBanModal(false);
    setBanReason('');
  };

  const handleUnbanUser = (userId) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: 'active', banReason: null }
          : user,
      ),
    );
  };

  const handleSendPlatformMessage = () => {
    const newMessage = {
      id: platformMessages.length + 1,
      title: 'Admin Message',
      message: platformMessage,
      type: 'announcement',
      date: new Date().toISOString().split('T')[0],
      sent: true,
    };
    setPlatformMessages(prev => [newMessage, ...prev]);
    setPlatformMessage('');
    setShowMessageModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'banned':
      return 'bg-red-100 text-red-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'accepted':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
    }
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
    case 'feature':
      return 'bg-blue-100 text-blue-800';
    case 'maintenance':
      return 'bg-yellow-100 text-yellow-800';
    case 'announcement':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage users, moderate content, and monitor platform activity
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'users', label: 'User Management' },
            { id: 'skills', label: 'Skill Moderation' },
            { id: 'swaps', label: 'Swap Monitoring' },
            { id: 'messages', label: 'Platform Messages' },
            { id: 'reports', label: 'Reports' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{adminData.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Swaps</p>
                <p className="text-2xl font-semibold text-gray-900">{adminData.totalSwaps}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-semibold text-gray-900">{adminData.pendingReviews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Banned Users</p>
                <p className="text-2xl font-semibold text-gray-900">{adminData.bannedUsers}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Swaps</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.totalSwaps}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.rating}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.reports}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {user.status === 'active' ? (
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowBanModal(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Ban User
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnbanUser(user.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Unban User
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Skill Moderation Tab */}
      {activeTab === 'skills' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Skill Moderation</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {pendingSkills.map((skill) => (
              <div key={skill.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{skill.title}</h4>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(skill.status)}`}>
                        {skill.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{skill.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Instructor: {skill.instructor}</span>
                      <span>Category: {skill.category}</span>
                      <span>Level: {skill.level}</span>
                      <span>Submitted: {skill.submittedDate}</span>
                    </div>
                    {skill.flags.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-red-600">Flags:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {skill.flags.map((flag, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                              {flag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {skill.status === 'pending' && (
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => handleApproveSkill(skill.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectSkill(skill.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Swap Monitoring Tab */}
      {activeTab === 'swaps' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Swap Monitoring</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {swapRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.requester}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.instructor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.skill}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{request.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Platform Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Platform Messages</h3>
            <button
              onClick={() => setShowMessageModal(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Send Message
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {platformMessages.map((message) => (
                <div key={message.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-medium text-gray-900">{message.title}</h4>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(message.type)}`}>
                          {message.type}
                        </span>
                        {message.sent && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Sent
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{message.message}</p>
                      <p className="text-sm text-gray-500">Date: {message.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Reports & Analytics</h3>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Download User Activity
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Download Swap Stats
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Download Feedback Logs
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">User Activity Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">New Users (This Month)</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users (This Week)</span>
                  <span className="font-medium">892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Logins (Today)</span>
                  <span className="font-medium">1,247</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Swap Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed Swaps</span>
                  <span className="font-medium">756</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Requests</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancelled Swaps</span>
                  <span className="font-medium">47</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Feedback Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-medium">4.6/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Positive Feedback</span>
                  <span className="font-medium">92%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Moderation Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Skills Reviewed</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Skills Rejected</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">User Reports</span>
                  <span className="font-medium">45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ban User Modal */}
      {showBanModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ban User</h3>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to ban {selectedUser?.name}? This action cannot be undone.
              </p>
              <textarea
                placeholder="Enter reason for ban..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                rows="3"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowBanModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleBanUser(selectedUser.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Ban User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Send Platform Message</h3>
              <textarea
                placeholder="Enter your message..."
                value={platformMessage}
                onChange={(e) => setPlatformMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                rows="4"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendPlatformMessage}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
