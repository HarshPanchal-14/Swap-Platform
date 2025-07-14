import React, { useState, useMemo } from 'react';

const BrowseSkills = () => {
  const [requestedSkills, setRequestedSkills] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Enhanced skills data with more details
  const skills = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Full-stack web development with React, Node.js, and MongoDB. Learn to build modern web applications from scratch.',
      instructor: 'Sarah Chen',
      instructorId: 'user123',
      location: 'San Francisco, CA',
      level: 'Intermediate',
      category: 'Programming',
      image: '💻',
      rating: 4.8,
      totalStudents: 24,
      skillsOffered: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      skillsWanted: ['Guitar', 'Spanish', 'Photography'],
      availability: {
        weekends: true,
        evenings: true,
        weekdays: false,
      },
      hourlyRate: null, // Free for skill swaps
      isPublic: true,
    },
    {
      id: 2,
      title: 'Guitar Lessons',
      description: 'Learn acoustic and electric guitar from basic chords to advanced techniques. All skill levels welcome!',
      instructor: 'Mike Rodriguez',
      instructorId: 'user456',
      location: 'Los Angeles, CA',
      level: 'Beginner',
      category: 'Music',
      image: '🎸',
      rating: 4.9,
      totalStudents: 18,
      skillsOffered: ['Acoustic Guitar', 'Electric Guitar', 'Music Theory'],
      skillsWanted: ['Programming', 'Cooking', 'Spanish'],
      availability: {
        weekends: true,
        evenings: true,
        weekdays: true,
      },
      hourlyRate: null,
      isPublic: true,
    },
    {
      id: 3,
      title: 'Spanish Language',
      description: 'Conversational Spanish with focus on practical communication skills. Perfect for beginners and intermediate learners.',
      instructor: 'Maria Garcia',
      instructorId: 'user789',
      location: 'Miami, FL',
      level: 'Beginner',
      category: 'Language',
      image: '🇪🇸',
      rating: 4.7,
      totalStudents: 31,
      skillsOffered: ['Spanish', 'English', 'Translation'],
      skillsWanted: ['Programming', 'Photography', 'Cooking'],
      availability: {
        weekends: false,
        evenings: true,
        weekdays: true,
      },
      hourlyRate: null,
      isPublic: true,
    },
    {
      id: 4,
      title: 'Photography',
      description: 'Digital photography fundamentals, composition, and editing techniques. Bring your camera or use your phone!',
      instructor: 'Alex Thompson',
      instructorId: 'user101',
      location: 'New York, NY',
      level: 'Intermediate',
      category: 'Arts',
      image: '📸',
      rating: 4.6,
      totalStudents: 15,
      skillsOffered: ['Photography', 'Photo Editing', 'Lightroom'],
      skillsWanted: ['Programming', 'Spanish', 'Cooking'],
      availability: {
        weekends: true,
        evenings: false,
        weekdays: true,
      },
      hourlyRate: null,
      isPublic: true,
    },
    {
      id: 5,
      title: 'Cooking Basics',
      description: 'Learn essential cooking techniques and recipe development. From basic knife skills to gourmet meals.',
      instructor: 'Chef David Kim',
      instructorId: 'user202',
      location: 'Chicago, IL',
      level: 'Beginner',
      category: 'Culinary',
      image: '👨‍🍳',
      rating: 4.9,
      totalStudents: 22,
      skillsOffered: ['Cooking', 'Baking', 'Recipe Development'],
      skillsWanted: ['Programming', 'Photography', 'Music'],
      availability: {
        weekends: true,
        evenings: true,
        weekdays: false,
      },
      hourlyRate: null,
      isPublic: true,
    },
    {
      id: 6,
      title: 'Yoga & Meditation',
      description: 'Mindfulness practices, yoga poses, and stress relief techniques. Suitable for all fitness levels.',
      instructor: 'Emma Wilson',
      instructorId: 'user303',
      location: 'Portland, OR',
      level: 'All Levels',
      category: 'Wellness',
      image: '🧘‍♀️',
      rating: 4.8,
      totalStudents: 28,
      skillsOffered: ['Yoga', 'Meditation', 'Mindfulness'],
      skillsWanted: ['Programming', 'Spanish', 'Cooking'],
      availability: {
        weekends: true,
        evenings: true,
        weekdays: true,
      },
      hourlyRate: null,
      isPublic: true,
    },
    {
      id: 7,
      title: 'Graphic Design',
      description: 'Adobe Creative Suite, logo design, and visual communication. Create stunning designs and build your portfolio.',
      instructor: 'Lisa Park',
      instructorId: 'user404',
      location: 'Austin, TX',
      level: 'Intermediate',
      category: 'Design',
      image: '🎨',
      rating: 4.7,
      totalStudents: 19,
      skillsOffered: ['Adobe Photoshop', 'Illustrator', 'Logo Design'],
      skillsWanted: ['Programming', 'Photography', 'Spanish'],
      availability: {
        weekends: false,
        evenings: true,
        weekdays: true,
      },
      hourlyRate: null,
      isPublic: true,
    },
    {
      id: 8,
      title: 'Public Speaking',
      description: 'Overcome stage fright and deliver compelling presentations. Build confidence and improve communication skills.',
      instructor: 'James Brown',
      instructorId: 'user505',
      location: 'Washington, DC',
      level: 'All Levels',
      category: 'Communication',
      image: '🎤',
      rating: 4.5,
      totalStudents: 12,
      skillsOffered: ['Public Speaking', 'Presentation Skills', 'Communication'],
      skillsWanted: ['Programming', 'Spanish', 'Photography'],
      availability: {
        weekends: true,
        evenings: true,
        weekdays: false,
      },
      hourlyRate: null,
      isPublic: true,
    },
  ];

  // Categories for filtering
  const categories = ['all', 'Programming', 'Music', 'Language', 'Arts', 'Culinary', 'Wellness', 'Design', 'Communication'];

  // Levels for filtering
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // Filter skills based on search term, category, and level
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase())
                           || skill.description.toLowerCase().includes(searchTerm.toLowerCase())
                           || skill.instructor.toLowerCase().includes(searchTerm.toLowerCase())
                           || skill.skillsOffered.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || skill.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  const handleRequestSwap = (skillId) => {
    setRequestedSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      return newSet;
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'Advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availability) => {
    const times = [];
    if (availability.weekends) times.push('Weekends');
    if (availability.evenings) times.push('Evenings');
    if (availability.weekdays) times.push('Weekdays');
    return times.join(', ');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Browse Available Skills
        </h1>
        <p className="text-lg text-gray-600">
          Discover skills you want to learn and connect with instructors
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Skills
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by skill, instructor, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <select
              id="level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredSkills.length} of {skills.length} skills
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSkills.map((skill) => (
          <div key={skill.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="text-4xl mb-4 text-center">
                {skill.image}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {skill.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {skill.description}
              </p>

              {/* Instructor Info */}
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-primary-600">
                    {skill.instructor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{skill.instructor}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {skill.rating} ({skill.totalStudents} students)
                  </div>
                </div>
              </div>

              {/* Skills Offered */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Skills Offered:</p>
                <div className="flex flex-wrap gap-1">
                  {skill.skillsOffered.slice(0, 3).map((skillName, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {skillName}
                    </span>
                  ))}
                  {skill.skillsOffered.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{skill.skillsOffered.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Skills Wanted */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Skills Wanted:</p>
                <div className="flex flex-wrap gap-1">
                  {skill.skillsWanted.slice(0, 2).map((skillName, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {skillName}
                    </span>
                  ))}
                  {skill.skillsWanted.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{skill.skillsWanted.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {skill.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {getAvailabilityText(skill.availability)}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                  {skill.level}
                </span>
                <span className="text-xs text-gray-500">
                  {skill.category}
                </span>
              </div>

              <button
                onClick={() => handleRequestSwap(skill.id)}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  requestedSkills.has(skill.id)
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {requestedSkills.has(skill.id) ? 'Request Sent ✓' : 'Request Swap'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No skills found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}

      {requestedSkills.size > 0 && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-800 font-medium">
              {requestedSkills.size} swap request{requestedSkills.size !== 1 ? 's' : ''} sent!
              Check your dashboard for updates.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseSkills;
