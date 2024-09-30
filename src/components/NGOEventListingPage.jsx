import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRegClock } from "react-icons/fa";

const campaignEvents = [
    {
      id: 1,
        tasks: [],
      name: "Scholarship Awareness Webinar",
      date: "2024-10-15",
      time: {
        start: "15:00",
        end: "17:00",
      },
      location: {
        address: "123 Education St, Knowledge City, Mumbai, India",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.8777,
      },
      image: "https://example.com/images/scholarship-webinar.jpg",
      description:
        "An informative webinar on available scholarships for underprivileged students and how to apply for them.",
      organizer: "Educational Empowerment Foundation",
      contactEmail: "info@educationfoundation.org",
      registrationLink: "https://example.com/register",
      additionalDetails: {
        type: "Webinar",
        targetAudience: "High School Students",
        capacity: 100,
        fees: "Free",
        sponsors: [
          {
            name: "Sponsor 1",
            image: "https://example.com/images/sponsor1-logo.jpg",
          },
          {
            name: "Sponsor 2",
            image: "https://example.com/images/sponsor2-logo.jpg",
          },
        ],
      },
    },
    {
      id: 2,
        tasks: [],
      name: "Virtual Tutoring Workshop",
      date: "2024-10-22",
      time: {
        start: "10:00",
        end: "12:00",
      },
      location: {
        address: "456 Learning Lane, Study Town, Mumbai, India",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.8777,
      },
      image: "https://example.com/images/tutoring-workshop.jpg",
      description:
        "A hands-on workshop offering virtual tutoring techniques for mentors working with underprivileged students.",
      organizer: "Learn Together Initiative",
      contactEmail: "support@learntogether.org",
      registrationLink: "https://example.com/register-tutoring",
      additionalDetails: {
        type: "Workshop",
        targetAudience: "Volunteer Mentors",
        capacity: 50,
        fees: "Free",
        sponsors: [
          {
            name: "Sponsor A",
            image: "https://example.com/images/sponsorA-logo.jpg",
          },
          {
            name: "Sponsor B",
            image: "https://example.com/images/sponsorB-logo.jpg",
          },
        ],
      },
    },
    {
      id: 3,
        tasks: [],
      name: "College Readiness Seminar",
      date: "2024-10-30",
      time: {
        start: "14:00",
        end: "16:00",
      },
      location: {
        address: "789 Education Blvd, Career City, Mumbai, India",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.8777,
      },
      image: "https://example.com/images/college-readiness-seminar.jpg",
      description:
        "A seminar to help students prepare for college applications and interviews.",
      organizer: "Future Leaders Academy",
      contactEmail: "info@futureleadersacademy.org",
      registrationLink: "https://example.com/register-college",
      additionalDetails: {
        type: "Seminar",
        targetAudience: "High School Students",
        capacity: 75,
        fees: "Free",
        sponsors: [
          {
            name: "Sponsor X",
            image: "https://example.com/images/sponsorX-logo.jpg",
          },
          {
            name: "Sponsor Y",
            image: "https://example.com/images/sponsorY-logo.jpg",
          },
        ],
      },
    },
    {
      id: 4,
        tasks: [],
      name: "STEM Career Fair",
      date: "2024-11-05",
      time: {
        start: "09:00",
        end: "17:00",
      },
      location: {
        address: "321 Career Ave, Tech Park, Mumbai, India",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.8777,
      },
      image: "https://example.com/images/stem-career-fair.jpg",
      description:
        "Connect with industry professionals and explore career opportunities in STEM fields.",
      organizer: "Tech for Tomorrow",
      contactEmail: "contact@techfortomorrow.org",
      registrationLink: "https://example.com/register-stem-fair",
      additionalDetails: {
        type: "Career Fair",
        targetAudience: "College Students and Graduates",
        capacity: 200,
        fees: "Free",
        sponsors: [
          {
            name: "Tech Sponsor 1",
            image: "https://example.com/images/tech-sponsor1-logo.jpg",
          },
          {
            name: "Tech Sponsor 2",
            image: "https://example.com/images/tech-sponsor2-logo.jpg",
          },
        ],
      },
    },
    {
      id: 5,
        tasks: [],
      name: "Financial Literacy Workshop",
      date: "2024-11-12",
      time: {
        start: "11:00",
        end: "13:00",
      },
      location: {
        address: "234 Money St, Wealth City, Mumbai, India",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.8777,
      },
      image: "https://example.com/images/financial-literacy-workshop.jpg",
      description:
        "Learn essential financial skills and budgeting techniques for students.",
      organizer: "Smart Finance Initiative",
      contactEmail: "info@smartfinance.org",
      registrationLink: "https://example.com/register-financial-literacy",
      additionalDetails: {
        type: "Workshop",
        targetAudience: "High School Students and Young Adults",
        capacity: 40,
        fees: "Free",
        sponsors: [
          {
            name: "Finance Co",
            image: "https://example.com/images/finance-co-logo.jpg",
          },
          {
            name: "Banking Partner",
            image: "https://example.com/images/banking-partner-logo.jpg",
          },
        ],
      },
    },
    {
      id: 6,
        tasks: [],
      name: "Coding Bootcamp for Beginners",
      date: "2024-11-20",
      time: {
        start: "09:00",
        end: "15:00",
      },
      location: {
        address: "987 Code St, Dev City, Mumbai, India",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.8777,
      },
      image: "https://example.com/images/coding-bootcamp.jpg",
      description:
        "A free coding bootcamp for students interested in learning programming basics.",
      organizer: "Code for Change",
      contactEmail: "info@codeforchange.org",
      registrationLink: "https://example.com/register-coding-bootcamp",
      additionalDetails: {
        type: "Bootcamp",
        targetAudience: "Aspiring Programmers",
        capacity: 30,
        fees: "Free",
        sponsors: [
          {
            name: "Tech Partner 1",
            image: "https://example.com/images/tech-partner1-logo.jpg",
          },
          {
            name: "Tech Partner 2",
            image: "https://example.com/images/tech-partner2-logo.jpg",
          },
        ],
      },
    },
    {
      id: 7,
        tasks: [],
      name: "Mental Health Awareness Session",
      date: "2024-11-27",
      time: {
        start: "16:00",
        end: "18:00",
      },
      location: {
        address: "654 Wellness Ave, Health City, Mumbai, India",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.8777,
      },
      image: "https://example.com/images/mental-health-session.jpg",
      description:
        "A session aimed at raising awareness about mental health issues among students.",
      organizer: "Wellness Foundation",
      contactEmail: "info@wellnessfoundation.org",
      registrationLink: "https://example.com/register-mental-health",
      additionalDetails: {
        type: "Awareness Session",
        targetAudience: "Students and Parents",
        capacity: 100,
        fees: "Free",
        sponsors: [
          {
            name: "Health Sponsor 1",
            image: "https://example.com/images/health-sponsor1-logo.jpg",
          },
          {
            name: "Health Sponsor 2",
            image: "https://example.com/images/health-sponsor2-logo.jpg",
          },
        ],
      },
    },
    {
      id: 8,
        tasks: [],
      name: "Cultural Festival for Youth",
      date: "2024-12-05",
      time: {
        start: "12:00",
        end: "20:00",
      },
      location: {
        address: "321 Culture Blvd, Arts City, Mumbai, India",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.8777,
      },
      image: "https://example.com/images/cultural-festival.jpg",
      description:
        "A vibrant festival showcasing various cultural performances and activities for youth.",
      organizer: "Youth Cultural Collective",
      contactEmail: "info@youthculturalcollective.org",
      registrationLink: "https://example.com/register-cultural-festival",
      additionalDetails: {
        type: "Festival",
        targetAudience: "All Ages",
        capacity: 500,
        fees: "Free",
        sponsors: [
          {
            name: "Culture Partner 1",
            image: "https://example.com/images/culture-partner1-logo.jpg",
          },
          {
            name: "Culture Partner 2",
            image: "https://example.com/images/culture-partner2-logo.jpg",
          },
        ],
      },
    },
    {
      id: 9,
        tasks: [],
      name: "Community Sports Day",
      date: "2024-12-12",
      time: {
        start: "09:00",
        end: "17:00",
      },
      location: {
        address: "456 Sport St, Fitness City, Mumbai, India",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.8777,
      },
      image: "https://example.com/images/sports-day.jpg",
      description:
        "A day of fun sports activities for the community to promote health and wellness.",
      organizer: "Community Sports Initiative",
      contactEmail: "info@communitysportsinitiative.org",
      registrationLink: "https://example.com/register-sports-day",
      additionalDetails: {
        type: "Sports Event",
        targetAudience: "Families and Individuals",
        capacity: 300,
        fees: "Free",
        sponsors: [
          {
            name: "Sports Sponsor 1",
            image: "https://example.com/images/sports-sponsor1-logo.jpg",
          },
          {
            name: "Sports Sponsor 2",
            image: "https://example.com/images/sports-sponsor2-logo.jpg",
          },
        ],
      },
    },
    {
      id: 1,
            tasks: [],

      name: "Tech Innovation Summit",
      date: "2024-12-20",
      time: {
        start: "10:00",
        end: "16:00",
      },
      location: {
        address: "789 Tech Lane, Innovation City, Mumbai, India",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.8777,
      },
      image: "https://example.com/images/tech-innovation-summit.jpg",
      description:
        "A summit focused on the latest innovations in technology and their impact on society.",
      organizer: "Tech Innovators Network",
      contactEmail: "info@techinnovatorsnetwork.org",
      registrationLink: "https://example.com/register-tech-summit",
      additionalDetails: {
        type: "Summit",
        targetAudience: "Tech Enthusiasts and Professionals",
        capacity: 200,
        fees: "Free",
        sponsors: [
          {
            name: "Tech Company 1",
            image: "https://example.com/images/tech-company1-logo.jpg",
          },
          {
            name: "Tech Company 2",
            image: "https://example.com/images/tech-company2-logo.jpg",
          },
        ],
      },
    },
  ];

const NGOEventListingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState(null); // State for storing the event to view details
  const [showSponsors, setShowSponsors] = useState(false); // Toggle for showing sponsor fields

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { name: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
};

const [eventList, setEventList] = useState(campaignEvents);

const [newEvent, setNewEvent] = useState({
  name: "",
  organization: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  address: "",
  city: "",
  state: "",
  country: "",
  latitude: "",
  longitude: "",
  registrationLink: "",
  image: "",
  capacity: 0,
  fees: "",
  targetAudience: "",
  type: "",
  sponsor1Name: "",
  sponsor1Image: "",
  sponsor2Name: "",
  sponsor2Image: "",
});

const handleSaveChanges = () => {
    const updatedEventList = eventList.map((event) => {
        if (event.id === viewDetails.id) {
            return {
                ...event,
                name: editableDetails.name || event.name,
                description: editableDetails.description || event.description,
                time: {
                    start: editableDetails.time.start || event.time.start,
                    end: editableDetails.time.end || event.time.end,
                },
                date: editableDetails.date,
                registrationLink: editableDetails.registrationLink,
                organizer: editableDetails.organizer,
                location: {
                    ...event.location,
                    address: editableDetails.location.address || event.location.address,
                },
                additionalDetails: {
                    ...event.additionalDetails,
                    capacity: editableDetails.capacity || event.additionalDetails.capacity,
                    fees: editableDetails.fees || event.additionalDetails.fees,
                    targetAudience: editableDetails.targetAudience || event.additionalDetails.targetAudience,
                },
                tasks: editableDetails.tasks || event.tasks
            };
        }
        return event;
    });
    
    setEventList(updatedEventList);
    setViewDetails(null); // Close the modal after saving
};





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = () => {
    const updatedEventList = [
      ...eventList,
      {
        id: eventList.length + 1,
        name: newEvent.name,
        organization: newEvent.organization,
        description: newEvent.description,
        location: {
            address: newEvent.address, 
            city: newEvent.city, 
            state: newEvent.state,
            country: newEvent.country,
            latitude: newEvent.latitude,
            longitude: newEvent.longitude
        },
        type: newEvent.type,
        time: {
            start: newEvent.startTime,
            end: newEvent.endTime
        },
        image: newEvent.image,
        additionalDetails: {
          capacity: parseInt(newEvent.capacity, 10),
          fees: newEvent.fees,
          targetAudience: newEvent.targetAudience,
          type: newEvent.type,
          sponsors: [
            { name: newEvent.sponsor1Name, image: newEvent.sponsor1Image },
            { name: newEvent.sponsor2Name, image: newEvent.sponsor2Image },
          ].filter((sponsor) => sponsor.name && sponsor.image),
        },
      },
    ];

    setEventList(updatedEventList); // Update the event list state
    console.log(updatedEventList)
    setModalOpen(false); // Close the modal after submission
    setShowSponsors(false); // Reset sponsor fields
    setNewEvent({
      name: "",
      organization: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      address: "",
      city: "",
      state: "",
      country: "",
      latitude: "",
      longitude: "",
      registrationLink: "",
      image: "",
      capacity: 0,
      fees: "",
      targetAudience: "",
      type: "",
      sponsor1Name: "",
      sponsor1Image: "",
      sponsor2Name: "",
      sponsor2Image: "",
    });
  };

  const handleViewDetails = (event) => {
    setViewDetails(event); // Set the event to view details
  };

const [editableDetails, setEditableDetails] = useState({
    date: "",
    time: "",
    location: { address: "" },
    organizer: "",
    contactEmail: "",
    registrationLink: "",
    tasks: []
})
  useEffect(() => {
    console.log(viewDetails);
    if (viewDetails) {
        // Initialize editableDetails with viewDetails
        setEditableDetails({
            date: viewDetails.date,
            time: viewDetails.time,
            location: { address: viewDetails.location.address },
            organizer: viewDetails.organizer,
            contactEmail: viewDetails.contactEmail,
            registrationLink: viewDetails.registrationLink,
            tasks: viewDetails.tasks
        });
    }
}, [viewDetails]);


  

  return (
    <div className="min-h-screen bg-white p-4 text-gray-800">
      <motion.h2
        className="text-4xl font-semibold text-center mb-4 text-green-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Discover NGO Events
      </motion.h2>

      <p className="text-center mb-6 text-lg">
        Explore various opportunities to get involved and make a difference.
      </p>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search events, organizations, or keywords"
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select className="border px-4 py-2 rounded-lg">
          <option>Select state</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          className="px-4 py-2 border rounded-lg"
        />
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Add Event
        </button>
      </div>

      {/* Event Listings Section */}
      <section className="flex-grow">
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg font-medium">Showing results: {eventList.length} Events</p>
        </motion.div>

        <div className="space-y-4">
          {eventList.map((event, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md flex justify-between items-center transition-all duration-300 hover:shadow-lg hover:bg-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full">
                    E
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{event.name}</h4>
                    <p className="text-gray-500">{event.organization}</p>
                  </div>
                </div>
                <div className="flex space-x-8 mb-2 text-gray-500 items-center">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-400" /> {event.location.city}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <FaRegClock className="mr-1" /> {event.time.start}
                </div>
              </div>
              <button
                onClick={() => handleViewDetails(event)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add Event Modal */}
      {modalOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-2xl h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>
            <form>
              {/* Event Fields */}
              <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={newEvent.name}
                onChange={handleInputChange}
                placeholder="Event Name"
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                placeholder="Event Description"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex space-x-4">
                <input
                  type="time"
                  name="startTime"
                  value={newEvent.startTime}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="time"
                  name="endTime"
                  value={newEvent.endTime}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <input
                type="text"
                name="address"
                value={newEvent.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="city"
                value={newEvent.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="state"
                value={newEvent.state}
                onChange={handleInputChange}
                placeholder="State"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="country"
                value={newEvent.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="latitude"
                  value={newEvent.latitude}
                  onChange={handleInputChange}
                  placeholder="Latitude"
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="number"
                  name="longitude"
                  value={newEvent.longitude}
                  onChange={handleInputChange}
                  placeholder="Longitude"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <input
                type="text"
                name="registrationLink"
                value={newEvent.registrationLink}
                onChange={handleInputChange}
                placeholder="Registration Link"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="image"
                value={newEvent.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="capacity"
                  value={newEvent.capacity}
                  onChange={handleInputChange}
                  placeholder="Capacity"
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="number"
                  name="fees"
                  value={newEvent.fees}
                  onChange={handleInputChange}
                  placeholder="Fees"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <input
                type="text"
                name="targetAudience"
                value={newEvent.targetAudience}
                onChange={handleInputChange}
                placeholder="Target Audience"
                className="w-full p-2 border rounded-lg"
              />
              <select
                name="type"
                value={newEvent.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Type</option>
                <option value="Volunteer Opportunity">Volunteer Opportunity</option>
                <option value="Community Service">Community Service</option>
              </select>

              {/* Sponsor Fields */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={showSponsors}
                  onChange={() => setShowSponsors(!showSponsors)}
                  className="mr-2"
                />
                <label>Add Sponsor Information</label>
              </div>
              {showSponsors && (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="sponsor1Name"
                    value={newEvent.sponsor1Name}
                    onChange={handleInputChange}
                    placeholder="Sponsor 1 Name"
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="sponsor1Image"
                    value={newEvent.sponsor1Image}
                    onChange={handleInputChange}
                    placeholder="Sponsor 1 Image URL"
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="sponsor2Name"
                    value={newEvent.sponsor2Name}
                    onChange={handleInputChange}
                    placeholder="Sponsor 2 Name"
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="sponsor2Image"
                    value={newEvent.sponsor2Image}
                    onChange={handleInputChange}
                    placeholder="Sponsor 2 Image URL"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              )}
            </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="mt-4 px-4 py-2 ml-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Close
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

            {/* View Event Details Modal */}
            {viewDetails && (
    <motion.div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
    >
        <motion.div
            className="bg-white h-[90vh] rounded-lg p-6 w-full max-w-2xl overflow-auto shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Event Image */}
            <img
                src={viewDetails.image}
                alt={viewDetails.name}
                className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
            />

            {/* Event Name */}
            <h2 className="text-2xl font-semibold mb-2">{viewDetails.name}</h2>

            {/* Event Description */}
            <p className="text-gray-700 mb-4">{viewDetails.description}</p>

            {/* Editable Event Details Section */}
            <div className="space-y-2 mb-4">
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="text-gray-700">Date</label>
                        <input
                            type="text"
                            value={editableDetails.date}
                            onChange={(e) => setEditableDetails({ ...editableDetails, date: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-gray-700">Start Time</label>
                        <input
                            type="text"
                            value={editableDetails.time.start}
                            onChange={(e) => setEditableDetails({ ...editableDetails, time: { ...editableDetails.time, start: e.target.value } })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-gray-700">End Time</label>
                        <input
                            type="text"
                            value={editableDetails.time.end}
                            onChange={(e) => setEditableDetails({ ...editableDetails, time: { ...editableDetails.time, end: e.target.value } })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                        <label className="text-gray-700">Location</label>
                        <input
                            type="text"
                            value={editableDetails.location.address}
                            onChange={(e) => setEditableDetails({ ...editableDetails, location: { ...editableDetails.location, address: e.target.value } })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-gray-700">Organizer</label>
                        <input
                            type="text"
                            value={editableDetails.organizer}
                            onChange={(e) => setEditableDetails({ ...editableDetails, organizer: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="text-gray-700">Contact Email</label>
                        <input
                            type="text"
                            value={editableDetails.contactEmail}
                            onChange={(e) => setEditableDetails({ ...editableDetails, contactEmail: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-gray-700">Registration Link</label>
                        <input
                            type="text"
                            value={editableDetails.registrationLink}
                            onChange={(e) => setEditableDetails({ ...editableDetails, registrationLink: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>
            </div>

            {/* Task Management Section */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Tasks</h3>
                <div className="flex space-x-2 mb-4">
                    <input
                        type="text"
                        placeholder="Add a new task"
                        className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow shadow-sm"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button
                        onClick={handleAddTask}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow"
                    >
                        Add Task
                    </button>
                </div>

                <ul className="space-y-2">
                    {tasks.map((task, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm">
                            <span className={`flex-grow ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                {task.name}
                            </span>
                            <button
                                onClick={() => toggleTaskCompletion(index)} // This now only toggles the task completion
                                className={`ml-4 px-4 py-1 rounded-lg ${task.completed ? 'bg-gray-300 text-gray-700' : 'bg-green-600 text-white'} hover:${task.completed ? 'bg-gray-400' : 'bg-green-700'} transition`}
                            >
                                {task.completed ? 'Unmark Important' : 'Mark Important'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Save Changes Button */}
            <div className="mt-4 flex justify-between">
                <button
                    onClick={() => setViewDetails(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                    Cancel
                </button>
                <div>
                    <button
                        // onClick={handleSaveChanges}
                        className="px-4 py-2 mr-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Get Resources
                    </button>
                    <button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 ml-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </motion.div>
    </motion.div>
)}












            </div>
        );
};

export default NGOEventListingPage;
