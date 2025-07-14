import { useState } from 'react';

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');


  // Enhanced user data with all the required features
  const [userData, setUserData] = useState(() => {
    // Default user data structure
    const defaultUserData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      location: 'San Francisco, CA',
      bio: 'Passionate about learning new skills and sharing knowledge with others. I love teaching and learning from the community.',
      profilePhoto: null, // URL for profile photo
      isPublic: true,
      skillsOffered: [
        { name: 'JavaScript', level: 'Advanced', category: 'Programming' },
        { name: 'React', level: 'Intermediate', category: 'Programming' },
        { name: 'Cooking', level: 'Intermediate', category: 'Culinary' },
        { name: 'Photography', level: 'Beginner', category: 'Arts' },
      ],
      skillsWanted: [
        { name: 'Guitar', level: 'Beginner', category: 'Music' },
        { name: 'Spanish', level: 'Beginner', category: 'Language' },
        { name: 'Graphic Design', level: 'Intermediate', category: 'Design' },
      ],
      availability: {
        weekends: true,
        evenings: true,
        weekdays: false,
        customSchedule: 'Available most weekends and weekday evenings after 6 PM',
      },
      rating: 4.8,
      completedSwaps: 12,
      totalRatings: 15,
    };

    // If user prop exists, merge it with default data, ensuring arrays exist
    if (user) {
      return {
        ...defaultUserData,
        ...user,
        skillsOffered: user.skillsOffered || defaultUserData.skillsOffered,
        skillsWanted: user.skillsWanted || defaultUserData.skillsWanted,
        availability: user.availability || defaultUserData.availability,
      };
    }

    return defaultUserData;
  });

  // Enhanced swap requests with more details
  const [swapRequests, setSwapRequests] = useState([
    {
      id: 1,
      skill: 'Web Development',
      instructor: 'Sarah Chen',
      instructorId: 'user123',
      status: 'pending',
      date: '2024-01-15',
      message: 'I would love to learn React development from you! I can offer guitar lessons in return.',
      mySkillOffered: 'Guitar Lessons',
      location: 'San Francisco, CA',
      proposedTime: 'Weekend afternoon',
    },
    {
      id: 2,
      skill: 'Guitar Lessons',
      instructor: 'Mike Rodriguez',
      instructorId: 'user456',
      status: 'accepted',
      date: '2024-01-10',
      message: 'Looking forward to our guitar session!',
      mySkillOffered: 'JavaScript Programming',
      location: 'San Francisco, CA',
      scheduledTime: '2024-01-20, 2:00 PM',
      rating: null,
    },
    {
      id: 3,
      skill: 'Spanish Language',
      instructor: 'Maria Garcia',
      instructorId: 'user789',
      status: 'completed',
      date: '2024-01-05',
      message: 'Great session! Thanks for the Spanish lesson.',
      mySkillOffered: 'Photography',
      location: 'San Francisco, CA',
      completedTime: '2024-01-12, 3:00 PM',
      rating: 5,
      feedback: 'Excellent teacher! Very patient and knowledgeable.',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'accepted':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
    case 'pending':
      return '⏳';
    case 'accepted':
      return '✅';
    case 'completed':
      return '🎉';
    case 'rejected':
      return '❌';
    case 'cancelled':
      return '🚫';
    default:
      return '📋';
    }
  };

  const handleAcceptRequest = (requestId) => {
    setSwapRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'accepted', scheduledTime: 'To be scheduled' }
          : req,
      ),
    );
  };

  const handleRejectRequest = (requestId) => {
    setSwapRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'rejected' }
          : req,
      ),
    );
  };

  const handleDeleteRequest = (requestId) => {
    setSwapRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const handleTogglePrivacy = () => {
    setUserData(prev => ({ ...prev, isPublic: !prev.isPublic }));
  };

  const handleAddSkillOffered = () => {
    // In a real app, this would open a modal or form
    const newSkill = { name: 'New Skill', level: 'Beginner', category: 'Other' };
    setUserData(prev => ({
      ...prev,
      skillsOffered: [...prev.skillsOffered, newSkill],
    }));
  };

  const handleAddSkillWanted = () => {
    // In a real app, this would open a modal or form
    const newSkill = { name: 'New Skill', level: 'Beginner', category: 'Other' };
    setUserData(prev => ({
      ...prev,
      skillsWanted: [...prev.skillsWanted, newSkill],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userData.name}!
        </h1>
        <p className="text-gray-600">
          Manage your profile and track your skill swap requests
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'requests'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Swap Requests ({swapRequests.length})
          </button>
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mr-6">
                  {userData.profilePhoto ? (
                    <img src={userData.profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    <span className="text-3xl">👤</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{userData.name}</h2>
                  <p className="text-gray-600">{userData.email}</p>
                  <div className="flex items-center mt-2">
                    <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {userData.rating || 0} ({userData.totalRatings || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    userData.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {userData.isPublic ? 'Public Profile' : 'Private Profile'}
                  </span>
                </div>
                <button
                  onClick={handleTogglePrivacy}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {userData.isPublic ? 'Make Private' : 'Make Public'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About Me</h3>
                <p className="text-gray-600">{userData.bio}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">{userData.location}</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Skills Offered */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Skills I Offer</h3>
                <button
                  onClick={handleAddSkillOffered}
                  className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  + Add Skill
                </button>
              </div>
              <div className="space-y-3">
                {(userData.skillsOffered || []).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="ml-2 text-sm text-gray-500">({skill.category})</span>
                    </div>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Skills I Want to Learn</h3>
                <button
                  onClick={handleAddSkillWanted}
                  className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  + Add Skill
                </button>
              </div>
              <div className="space-y-3">
                {(userData.skillsWanted || []).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="ml-2 text-sm text-gray-500">({skill.category})</span>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Available Times</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userData.availability?.weekends || false}
                      className="mr-2"
                      readOnly
                    />
                    <span className="text-gray-700">Weekends</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userData.availability?.evenings || false}
                      className="mr-2"
                      readOnly
                    />
                    <span className="text-gray-700">Evenings</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userData.availability?.weekdays || false}
                      className="mr-2"
                      readOnly
                    />
                    <span className="text-gray-700">Weekdays</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Additional Notes</h4>
                <p className="text-gray-600">{userData.availability?.customSchedule || 'No additional notes'}</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{userData.completedSwaps || 0}</div>
                <div className="text-sm text-gray-600">Completed Swaps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{(userData.skillsOffered || []).length}</div>
                <div className="text-sm text-gray-600">Skills Offered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{(userData.skillsWanted || []).length}</div>
                <div className="text-sm text-gray-600">Skills Wanted</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Swap Requests</h3>
          </div>

          {swapRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No swap requests yet</h3>
              <p className="text-gray-600">Start browsing skills to make your first swap request!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {swapRequests.map((request) => (
                <div key={request.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{getStatusIcon(request.status)}</span>
                        <h4 className="text-lg font-medium text-gray-900">{request.skill}</h4>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium">Instructor:</span> {request.instructor}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Location:</span> {request.location}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Date:</span> {new Date(request.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium">I'm offering:</span> {request.mySkillOffered}
                          </p>
                          {request.scheduledTime && (
                            <p className="text-gray-600">
                              <span className="font-medium">Scheduled:</span> {request.scheduledTime}
                            </p>
                          )}
                          {request.completedTime && (
                            <p className="text-gray-600">
                              <span className="font-medium">Completed:</span> {request.completedTime}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-700 bg-gray-50 p-3 rounded-md mb-3">
                        "{request.message}"
                      </p>

                      {request.status === 'completed' && request.rating && (
                        <div className="flex items-center mb-3">
                          <span className="text-sm text-gray-600 mr-2">Your rating:</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < request.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      )}

                      {request.status === 'completed' && request.feedback && (
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-sm text-blue-800">
                            <span className="font-medium">Feedback:</span> {request.feedback}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {(request.status === 'pending' || request.status === 'accepted') && (
                        <button
                          onClick={() => handleDeleteRequest(request.id)}
                          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
