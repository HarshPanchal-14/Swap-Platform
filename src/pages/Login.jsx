import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo login logic
      let userData;

      if (formData.email === 'admin@skillswap.com' && formData.password === 'admin123') {
        userData = {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@skillswap.com',
          role: 'admin',
          location: 'San Francisco, CA',
          bio: 'Platform administrator',
          profilePhoto: null,
          isPublic: true,
          skillsOffered: [
            { name: 'Platform Management', level: 'Expert', category: 'Administration' },
          ],
          skillsWanted: [],
          availability: {
            weekends: true,
            evenings: true,
            weekdays: true,
            customSchedule: 'Available for platform management',
          },
          rating: 5.0,
          completedSwaps: 0,
          totalRatings: 0,
        };
      } else if (formData.email === 'user@skillswap.com' && formData.password === 'password123') {
        userData = {
          id: 'user-1',
          name: 'John Doe',
          email: 'user@skillswap.com',
          role: 'user',
          location: 'San Francisco, CA',
          bio: 'Passionate about learning new skills and sharing knowledge with others.',
          profilePhoto: null,
          isPublic: true,
          skillsOffered: [
            { name: 'JavaScript', level: 'Advanced', category: 'Programming' },
            { name: 'React', level: 'Intermediate', category: 'Programming' },
            { name: 'Cooking', level: 'Intermediate', category: 'Culinary' },
          ],
          skillsWanted: [
            { name: 'Guitar', level: 'Beginner', category: 'Music' },
            { name: 'Spanish', level: 'Beginner', category: 'Language' },
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
      } else {
        // For any other email/password combination, create a new user
        userData = {
          id: Date.now().toString(),
          name: formData.email.split('@')[0],
          email: formData.email,
          role: 'user',
          location: 'Not specified',
          bio: 'New user',
          profilePhoto: null,
          isPublic: true,
          skillsOffered: [],
          skillsWanted: [],
          availability: {
            weekends: false,
            evenings: false,
            weekdays: false,
            customSchedule: 'Not specified',
          },
          rating: 0,
          completedSwaps: 0,
          totalRatings: 0,
        };
      }

      // Call the login handler
      if (onLogin) {
        onLogin(userData);
      }

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your SkillSwap account
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Admin:</strong> admin@skillswap.com / admin123</p>
                <p><strong>User:</strong> user@skillswap.com / password123</p>
                <p><strong>Any other:</strong> Will create a new account</p>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate('/signup')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
