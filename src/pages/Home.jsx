import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to{' '}
          <span className="text-primary-600">SkillSwap</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Connect with people who have the skills you need and share your expertise in return.
          Build meaningful relationships while learning and growing together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/browse-skills"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Browse Skills
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect</h3>
          <p className="text-gray-600">
            Find people with the skills you need and connect with them for skill exchanges.
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn</h3>
          <p className="text-gray-600">
            Learn new skills from experts in their field through hands-on experience.
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Share</h3>
          <p className="text-gray-600">
            Share your expertise with others and help them grow while building your network.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Skills</h3>
            <p className="text-gray-600">
              Explore the available skills on our platform and find what interests you.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Swap</h3>
            <p className="text-gray-600">
              Send a swap request to someone whose skills you want to learn.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Learn & Share</h3>
            <p className="text-gray-600">
              Meet up and exchange skills - you teach them, they teach you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
