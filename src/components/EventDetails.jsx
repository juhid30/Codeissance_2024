import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import Layout from './Layout';

const EventPage = () => {
  const [activeSection, setActiveSection] = useState('timeline');

  const data = {
    id: 7,
    uuid: "b91a4125-7c41-46b4-90ff-7351f2354e93",
    name: "Civic Engagement Workshop",
    date: "2025-01-05",
    time: {
      start: "10:00",
      end: "15:00",
    },
    location: {
      address: "404 Civic St, Amravati, India",
      city: "Amravati",
      state: "Maharashtra",
      country: "India",
      latitude: 20.9333,
      longitude: 77.7500,
    },
    image: "https://example.com/images/civic-engagement.jpg",
    description: "Workshop to promote civic engagement among youth.",
    organizer: "Civic Action Network",
    contactEmail: "info@civicaction.org",
  };

  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Attendance',
        data: [10, 20, 40, 30, 80, 60],
        borderColor: '#34D399',
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        fill: true,
      },
    ],
  };

  const rsvpData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [780, 620],
        backgroundColor: ['#34D399', '#F87171'],
        hoverOffset: 4,
      },
    ],
  };

  const feedbackItems = [
    {
      id: 1,
      name: "Alice Johnson",
      comment: "The workshop was incredibly insightful! I learned so much about civic engagement.",
      rating: 5,
    },
    {
      id: 2,
      name: "Raj Patel",
      comment: "Great speakers and interactive sessions. Would love to see more workshops like this!",
      rating: 4,
    },
    {
      id: 3,
      name: "Sneha Verma",
      comment: "It was a good experience, but I wish there were more practical activities.",
      rating: 3,
    },
    {
      id: 4,
      name: "Anil Kumar",
      comment: "Well-organized and very relevant to today's issues. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-8">
        <div className="flex justify-between space-x-8">
          <div className="w-2/3">
            <div className="mb-4">
              <img src={data.image} alt={data.name} className="w-full h-60 object-cover rounded-lg" />
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-green-700">{data.name}</h1>
              <p className="text-gray-600 mt-2">
                {new Date(data.date).toLocaleDateString()} | {data.time.start} - {data.time.end}
              </p>
              <p className="text-gray-700 mt-4">{data.description}</p>
              <p className="mt-2 text-gray-600">Organized by: {data.organizer}</p>
              <p className="mt-2 text-gray-600">Contact: {data.contactEmail}</p>
            </div>

            {/* Tabs for Timeline and Feedback */}
            <div className="mb-8 border-b-2 border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveSection('timeline')}
                  className={`px-4 py-2 text-lg font-semibold ${
                    activeSection === 'timeline' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-500'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setActiveSection('feedback')}
                  className={`px-4 py-2 text-lg font-semibold ${
                    activeSection === 'feedback' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-500'
                  }`}
                >
                  Feedback
                </button>
              </div>
            </div>

            {/* Timeline Section */}
            {activeSection === 'timeline' ? (
              <ol className="relative border-l border-gray-200">
                <li className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3 ring-8 ring-white">
                    <svg className="w-2.5 h-2.5 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8zm0 14a6 6 0 1 0-6-6 6 6 0 0 0 6 6z"/>
                    </svg>
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">Workshop Begins</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">10:00 AM</time>
                  <p className="mb-4 text-base font-normal text-gray-500">The workshop kicks off with an introduction to civic engagement.</p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3 ring-8 ring-white">
                    <svg className="w-2.5 h-2.5 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8zm0 14a6 6 0 1 0-6-6 6 6 0 0 0 6 6z"/>
                    </svg>
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">Guest Speaker</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">11:30 AM</time>
                  <p className="text-base font-normal text-gray-500">A guest speaker shares insights on community involvement.</p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3 ring-8 ring-white">
                    <svg className="w-2.5 h-2.5 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8zm0 14a6 6 0 1 0-6-6 6 6 0 0 0 6 6z"/>
                    </svg>
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">Interactive Session</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">1:00 PM</time>
                  <p className="text-base font-normal text-gray-500">Participants engage in a hands-on activity to brainstorm civic projects.</p>
                </li>
              </ol>
            ) : (
              // Feedback Section
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-green-700">Feedback</h2>
                <ul className="space-y-2">
                  {feedbackItems.map(feedback => (
                    <li key={feedback.id} className="bg-gray-100 p-4 rounded-lg">
                      <p className="font-semibold">{feedback.name}</p>
                      <p className="text-gray-600">{feedback.comment}</p>
                      <p className="text-gray-500">Rating: {feedback.rating} ★</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="w-1/3 space-y-8 ">
  {/* Flex container for the donut charts */}
  <div className="flex justify-between">
    {/* RSVP Donut Chart */}
    <div className="flex justify-center items-center flex-col">
      <span className='font-semibold my-2'>Attendance</span>
      <div className="w-40 h-40">
        <Doughnut data={rsvpData} options={{ maintainAspectRatio: false }} />
      </div>
      <p className="text-sm text-gray-600 mt-2">780 Present</p>
    </div>

    {/* User Feedback Analysis Donut Chart */}
    <div className="flex justify-center items-center flex-col">
      <span className='font-semibold my-2'>User Feedback Analysis</span>
      <div className="w-40 h-40">
        <Doughnut 
          data={{
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
              data: [300, 150, 50], // Random numbers for feedback
              backgroundColor: ['#4CAF50', '#FFC107', '#F44336'], // Colors for each segment
              hoverBackgroundColor: ['#45A049', '#E0A800', '#E53935'],
            }]
          }} 
          options={{ maintainAspectRatio: false }} 
        />
      </div>
      <p className="text-xs text-gray-600 mt-2">300 Positive, 150 Neutral, 50 Negative</p>
    </div>
  </div>

  {/* Line Graph */}
  <div>
    <h2 className="text-xl font-bold mb-2 text-green-700">Attendance Analysis (Last 7 Days)</h2>
    <Line data={lineData} />
  </div>

  {/* Fundraising Progress */}
  <div>
    <h2 className="text-xl font-bold mb-2 text-green-700">Fundraise Progress</h2>
    <div className="bg-gray-300 rounded-full h-4 w-full">
      <motion.div
        className="bg-green-500 h-4 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: '60%' }}
        transition={{ duration: 1 }}
      />
    </div>
    <p className="text-sm mt-2">$23,763 / $40,000</p>
  </div>

  {/* Location */}
  <div className="bg-gray-100 p-4 rounded-lg">
    <h2 className="text-xl font-bold mb-2 text-green-700">Location & Time</h2>
    <p>{data.location.address}</p>
    <p>{data.location.city}, {data.location.state}, {data.location.country}</p>
    <p className="mt-2">Starts at: {data.time.start}</p>
  </div>
          </div>


        </div>
      </div>
    </Layout>
  );
};

export default EventPage;
