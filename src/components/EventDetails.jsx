import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';

const EventPage = () => {
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Attendance',
        data: [10, 20, 40, 60, 80, 100],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="flex justify-between p-10">
      {/* Middle Section: Timeline */}
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4">Event Timeline</h1>
        <div className="space-y-4">
          <div className="border-l-2 border-indigo-600 pl-4">
            <p className="font-semibold">Registration Started</p>
          </div>
          <div className="border-l-2 border-indigo-600 pl-4">
            <p className="font-semibold">Tasks Listed</p>
          </div>
          <div className="border-l-2 border-indigo-600 pl-4">
            <p className="font-semibold">Volunteers Assigned</p>
          </div>
          <div className="border-l-2 border-indigo-600 pl-4">
            <p className="font-semibold">Event Starts</p>
          </div>
          <div className="border-l-2 border-indigo-600 pl-4">
            <p className="font-semibold">Event Ends</p>
          </div>
        </div>

        {/* Feedback Section */}
        <h2 className="text-2xl font-bold mt-8">Feedback</h2>
        <div className="space-y-4 mt-4">
          <div className="p-4 border rounded-lg shadow">
            <p className="font-semibold">John Doe:</p>
            <p className="text-gray-600">Great event! Learned a lot about UI design.</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <p className="font-semibold">Jane Smith:</p>
            <p className="text-gray-600">The organization was top-notch, and the content was excellent.</p>
          </div>
          {/* Add more feedback comments */}
        </div>
      </div>

      {/* Right-hand Side: RSVP, Line Graph, and Fundraising */}
      <div className="w-1/3 space-y-8">
        {/* RSVP Circle */}
        <div className="flex justify-center items-center flex-col">
          <div className="relative">
            <motion.div
              className="w-24 h-24 rounded-full border-4 border-indigo-500"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 45 }}
              transition={{ duration: 1 }}
              style={{ transform: 'rotate(-90deg)' }}
            />
            <p className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
              55%
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-2">780 Accepted Invitations</p>
        </div>

        {/* Line Graph */}
        <div>
          <h2 className="text-xl font-bold mb-2">Attendance Increase</h2>
          <Line data={lineData} />
        </div>

        {/* Fundraising Progress */}
        <div>
          <h2 className="text-xl font-bold mb-2">Fundraise</h2>
          <div className="bg-gray-300 rounded-full h-4 w-full">
            <motion.div
              className="bg-indigo-600 h-4 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '60%' }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-sm mt-2">$23,763 / $40,000</p>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
