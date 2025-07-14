# Skill Swap Platform

A comprehensive React.js frontend for a Skill Swap Platform where users can connect with others to exchange skills and knowledge. Built with modern web technologies and best practices for performance, accessibility, and maintainability.

## 🚀 Features

### User Profile Management
- **Basic Information**: Name, location (optional), profile photo (optional)
- **Skills Management**: 
  - List of skills offered with levels and categories
  - List of skills wanted to learn
- **Availability Settings**: Configure availability for weekends, evenings, weekdays
- **Privacy Controls**: Toggle between public and private profiles
- **Statistics**: Track completed swaps, ratings, and reviews

### Skill Discovery & Search
- **Browse Skills**: View all available skills with detailed information
- **Advanced Search**: Search by skill name, instructor, or description
- **Filtering Options**: Filter by category and skill level
- **Instructor Profiles**: View instructor ratings, student count, and skills offered/wanted
- **Availability Display**: See when instructors are available

### Swap Request System
- **Request Swaps**: Send swap requests to instructors
- **Accept/Reject**: Instructors can accept or reject incoming requests
- **Request Management**: View current and pending swap requests
- **Delete Requests**: Users can delete requests that haven't been accepted yet
- **Status Tracking**: Track request status (pending, accepted, completed, rejected, cancelled)

### Rating & Feedback System
- **Post-Swap Ratings**: Rate completed skill exchanges (1-5 stars)
- **Feedback System**: Leave detailed feedback after completed swaps
- **Rating Display**: View instructor ratings and total number of reviews
- **Student Count**: Track how many students each instructor has taught

### Admin Dashboard
- **User Management**: View all users, their status, and activity
- **Ban/Unban Users**: Ban users who violate platform policies with reason tracking
- **Skill Moderation**: Review and approve/reject inappropriate skill submissions
- **Swap Monitoring**: Monitor all pending, accepted, and cancelled swaps
- **Platform Messaging**: Send platform-wide announcements and updates
- **Reports & Analytics**: Download comprehensive reports on user activity, swap statistics, and feedback logs
- **Content Flagging**: Identify and review flagged content for inappropriate material

### Responsive Design
- **Mobile-First**: Fully responsive design that works on all devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Accessibility**: Proper semantic HTML and keyboard navigation

## 🛠 Technology Stack

### Frontend
- **React.js 18.2.0** - Modern React with hooks and concurrent features
- **React Router DOM 6.8.1** - Client-side routing with navigation guards
- **Tailwind CSS 3.3.0** - Utility-first CSS framework for responsive design
- **React Query 3.39.3** - Data fetching, caching, and synchronization
- **React Hot Toast 2.4.1** - Beautiful toast notifications
- **Socket.io Client 4.7.2** - Real-time bidirectional communication
- **Axios 1.6.0** - HTTP client for API requests
- **Date-fns 2.30.0** - Modern date utility library

### Development Tools
- **ESLint 8.55.0** - Code linting and quality enforcement
- **Create React App** - Build tool and development environment
- **npm** - Package manager

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm 8+

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd skill-swap-platform

# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format code with Prettier
npm run analyze    # Analyze bundle size
```

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001
REACT_APP_ENABLE_CHAT=true
REACT_APP_ENABLE_VIDEO=false
REACT_APP_ENABLE_ADVANCED_SEARCH=true
REACT_APP_ENABLE_AI_MATCHING=false
REACT_APP_ENABLE_MULTI_LANGUAGE=false
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Main navigation component
│   ├── ErrorBoundary.jsx       # Error handling component
│   └── ui/                     # Reusable UI components
│       ├── Button.jsx          # Button component with variants
│       ├── Input.jsx           # Input component with validation
│       ├── Card.jsx            # Card layout component
│       ├── Pagination.jsx      # Pagination component
│       └── Breadcrumb.jsx      # Navigation breadcrumbs
├── pages/
│   ├── Home.jsx                # Landing page
│   ├── BrowseSkills.jsx        # Skill browsing with search/filter
│   ├── Dashboard.jsx           # User dashboard
│   ├── Login.jsx               # Authentication page
│   └── AdminDashboard.jsx      # Admin panel
├── config/
│   └── constants.js            # Application constants and configuration
├── utils/
│   └── validation.js           # Form validation utilities
├── services/
│   ├── websocket.js            # WebSocket service for real-time features
│   └── cache.js                # Caching service for performance
├── App.jsx                     # Main application component
└── index.js                    # Application entry point
```

## 🗄 Database Design

The platform uses a well-structured PostgreSQL database with proper relationships and data types:

### Core Tables
- **users** - User profiles and authentication
- **skills** - Available skills with categories and levels
- **user_skills** - Many-to-many relationship between users and skills
- **swap_requests** - Skill exchange requests and status tracking
- **ratings** - User feedback and ratings system
- **platform_messages** - Admin announcements and notifications

### Admin Tables
- **user_reports** - User reporting system for moderation
- **skill_moderation** - Skill approval/rejection queue
- **activity_logs** - Comprehensive activity tracking

### Performance Features
- **Indexes** on frequently queried columns
- **Triggers** for automatic timestamp updates
- **UUID primary keys** for better scalability
- **JSONB** for flexible data storage

## 🎯 Coding Standards

### Data Validation
- **Frontend Validation**: Comprehensive form validation using custom utilities
- **Input Sanitization**: XSS prevention and data cleaning
- **Type Checking**: Proper prop types and data validation
- **Error Handling**: Graceful error handling with user-friendly messages

### Dynamic Values
- **Configuration Management**: All constants centralized in `constants.js`
- **Environment Variables**: Support for different environments
- **Feature Flags**: Toggle features based on configuration
- **No Hardcoding**: All values are configurable and maintainable

### Code Reusability
- **Component Library**: Reusable UI components with consistent API
- **Utility Functions**: Shared validation and helper functions
- **Service Layer**: Abstracted business logic in service classes
- **Custom Hooks**: Reusable React hooks for common functionality

### Performance Optimization
- **Caching Strategy**: Multi-level caching (memory + localStorage)
- **Lazy Loading**: Component and route lazy loading
- **Debouncing**: Search input debouncing for better UX
- **Image Optimization**: Lazy loading and proper sizing
- **Bundle Optimization**: Code splitting and tree shaking

### Error Handling
- **Error Boundaries**: React error boundaries for graceful failures
- **Fallback UI**: User-friendly error messages and recovery options
- **Logging**: Comprehensive error logging and reporting
- **Retry Logic**: Automatic retry for failed operations

### Code Quality
- **ESLint Configuration**: Comprehensive linting rules
- **Accessibility**: ARIA labels and keyboard navigation
- **TypeScript Ready**: Code structured for easy TypeScript migration
- **Documentation**: JSDoc comments for all functions and components

## 🎨 UI/UX Design

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoint System**: Consistent responsive breakpoints
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly**: Proper touch targets and gestures

### Navigation
- **Breadcrumbs**: Clear navigation hierarchy
- **Pagination**: Efficient data browsing
- **Search & Filter**: Advanced search with real-time results
- **Loading States**: Skeleton screens and progress indicators

### Color & Accessibility
- **Color Contrast**: WCAG AA compliant color combinations
- **Semantic Colors**: Meaningful color usage for different states
- **Dark Mode Ready**: Color system supports theme switching
- **Focus Indicators**: Clear focus states for keyboard navigation

## 🎯 Key Features Explained

### 1. User Authentication
- Simple login system with email and password
- Demo credentials provided for testing (regular user and admin)
- Session management with React state
- Protected routes for dashboard and admin access
- Role-based access control

### 2. Profile Management
- **Comprehensive Profile**: Users can manage their personal information, skills, and availability
- **Skills Offered**: Add and manage skills you can teach with proficiency levels
- **Skills Wanted**: List skills you want to learn
- **Availability Settings**: Set when you're available for skill exchanges
- **Privacy Controls**: Make your profile public or private

### 3. Skill Discovery
- **Search Functionality**: Find skills by name, instructor, or description
- **Category Filtering**: Filter by skill categories (Programming, Music, Language, etc.)
- **Level Filtering**: Filter by skill level (Beginner, Intermediate, Advanced, All Levels)
- **Instructor Information**: View detailed instructor profiles with ratings and reviews

### 4. Swap Request System
- **Request Creation**: Send swap requests to instructors
- **Request Management**: View all your swap requests with status tracking
- **Accept/Reject**: Instructors can accept or reject incoming requests
- **Request Deletion**: Delete requests that haven't been accepted
- **Status Updates**: Real-time status updates for all requests

### 5. Rating & Feedback
- **Post-Swap Ratings**: Rate completed exchanges on a 5-star scale
- **Detailed Feedback**: Leave written feedback about the experience
- **Rating Display**: View aggregated ratings and review counts
- **Quality Assurance**: Build trust through transparent rating system

### 6. Admin Dashboard
- **Overview Dashboard**: Platform statistics and health monitoring
- **User Management**: 
  - View all users with detailed information
  - Ban/unban users with reason tracking
  - Monitor user activity and reports
- **Content Moderation**:
  - Review pending skill submissions
  - Approve or reject inappropriate content
  - Flag and track problematic content
- **Swap Monitoring**: Track all swap requests and their statuses
- **Platform Communication**:
  - Send platform-wide announcements
  - Manage feature updates and maintenance notices
  - Broadcast important messages to all users
- **Reporting & Analytics**:
  - Download user activity reports
  - Generate swap statistics
  - Export feedback and rating logs
  - Monitor platform health metrics

## 🎨 Design Features

### Responsive Layout
- Mobile-first design approach
- Responsive grid layouts for skill cards
- Collapsible navigation menu for mobile devices
- Touch-friendly interface elements

### Modern UI Components
- Clean card-based design for skills and profiles
- Consistent color scheme with primary blue theme
- Smooth hover effects and transitions
- Professional typography and spacing

### User Experience
- Intuitive navigation with clear visual hierarchy
- Loading states and feedback for user actions
- Error handling with user-friendly messages
- Accessibility features for better usability

## 🔧 Customization

### Adding New Skills
To add new skills to the platform, modify the `skills` array in `src/pages/BrowseSkills.jsx`:

```javascript
{
  id: 9,
  title: 'New Skill',
  description: 'Description of the new skill',
  instructor: 'Instructor Name',
  instructorId: 'user_id',
  location: 'City, State',
  level: 'Beginner',
  category: 'Category',
  image: '🎯',
  rating: 4.5,
  totalStudents: 10,
  skillsOffered: ['Skill 1', 'Skill 2'],
  skillsWanted: ['Wanted Skill 1', 'Wanted Skill 2'],
  availability: {
    weekends: true,
    evenings: true,
    weekdays: false
  },
  hourlyRate: null,
  isPublic: true
}
```

### Styling Customization
The project uses Tailwind CSS for styling. You can customize the design by:
- Modifying the `tailwind.config.js` file for theme customization
- Updating color schemes in the configuration
- Adding custom CSS classes in `src/index.css`

## 🧪 Testing

### Demo Credentials
- **Regular User**: `user@skillswap.com` / `password123`
- **Admin User**: `admin@skillswap.com` / `admin123`

### Testing Features
1. **User Registration/Login**: Test authentication flow
2. **Profile Management**: Update user profile and skills
3. **Skill Browsing**: Search and filter users by skills
4. **Swap Requests**: Send and manage swap requests
5. **Admin Panel**: Test admin features (use admin credentials)
6. **Real-time Features**: Test WebSocket connections
7. **Responsive Design**: Test on different screen sizes

## 📊 Performance Metrics

### Optimization Features
- **Bundle Size**: Optimized with code splitting
- **Load Time**: Cached resources and lazy loading
- **Memory Usage**: Efficient state management
- **Network Requests**: Minimized with caching
- **Real-time Performance**: WebSocket connection management

### Monitoring
- **Error Tracking**: Comprehensive error logging
- **Performance Monitoring**: Cache hit rates and response times
- **User Analytics**: Activity tracking and usage patterns
- **System Health**: Connection status and service availability

## 🔒 Security Features

### Data Protection
- **Input Validation**: Server-side and client-side validation
- **XSS Prevention**: Input sanitization and output encoding
- **CSRF Protection**: Token-based request validation
- **Secure Storage**: Encrypted local storage for sensitive data

### Authentication
- **Session Management**: Secure session handling
- **Token-based Auth**: JWT tokens for API authentication
- **Role-based Access**: Admin and user role management
- **Logout Security**: Proper session cleanup

## 🔐 Admin Access

### Admin Credentials
- **Email**: `admin@skillswap.com`
- **Password**: `admin123`

### Admin Features
1. **User Management**: View, ban, and unban users
2. **Content Moderation**: Review and approve/reject skill submissions
3. **Platform Monitoring**: Track all swap activities and user behavior
4. **Communication Tools**: Send platform-wide messages
5. **Analytics & Reporting**: Generate comprehensive platform reports

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the project directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Future Enhancements

### Planned Features
- **Video Calls**: Integrated video calling for skill sessions
- **AI Matching**: Intelligent skill matching algorithm
- **Multi-language**: Internationalization support
- **Mobile App**: React Native mobile application
- **Advanced Analytics**: Machine learning insights
- **Payment Integration**: Premium features and subscriptions

### Technical Improvements
- **TypeScript Migration**: Full TypeScript implementation
- **Microservices**: Backend service decomposition
- **GraphQL**: Modern API with GraphQL
- **PWA Support**: Progressive Web App features
- **Testing Suite**: Comprehensive unit and integration tests

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for the hackathon community** 