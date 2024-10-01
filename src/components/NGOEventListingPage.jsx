import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRegClock, FaCalendarAlt } from "react-icons/fa";
import Layout from "./Layout";
import { Chrono } from "react-chrono";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const volunteer = [
  "Jash Rashne",
  "Juhi Deore",
  "Zeeshan Syed Hyder",
  " Om Avhad",
];

const NGOEventListingPage = () => {
  const navigate = useNavigate();

  async function uploadCampaignOne(camp) {
    const campaignColection = collection(db, "Campaigns");

    try {
      // Add each supplier as a new document
      const docRef = await addDoc(campaignColection, camp);
      console.log("Supplier document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding supplier document: ", e);
    }
  }

  let campaignEvents = [];

  async function getCampaigns() {
    try {
      // Reference to the "Campaigns" collection
      const campaignsCollection = collection(db, "Campaigns");

      // Get all documents from the "Campaigns" collection
      const querySnapshot = await getDocs(campaignsCollection);

      // Create an array to hold the campaign data
      const temp = [];
      // Loop through the documents and push each one to the array
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });

      // console.log(temp);

      return temp;
    } catch (error) {
      console.error("Error fetching campaigns: ", error);
      return [];
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState(null); // State for storing the event to view details
  const [showSponsors, setShowSponsors] = useState(false); // Toggle for showing sponsor fields

  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const events = [
    { date: "10/2024", label: "Registration Started" },
    { date: "10/2024", label: "Tasks Listed" },
    { date: "10/2024", label: "Volunteers Assigned" },
    { date: "10/2024", label: "Event Starts" },
    { date: "10/2024", label: "Event Ended" },
  ];

  const [selectedEvent, setSelectedEvent] = useState(0);

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
            capacity:
              editableDetails.capacity || event.additionalDetails.capacity,
            fees: editableDetails.fees || event.additionalDetails.fees,
            targetAudience:
              editableDetails.targetAudience ||
              event.additionalDetails.targetAudience,
          },
          tasks: editableDetails.tasks || event.tasks,
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

  const handleSubmit = async () => {
    let eventData = {
      id: eventList.length + 1, // This will be handled by Firestore, so you can remove this line
      name: newEvent.name,
      organization: newEvent.organization,
      description: newEvent.description,
      location: {
        address: newEvent.address,
        city: newEvent.city,
        state: newEvent.state,
        country: newEvent.country,
        latitude: newEvent.latitude,
        longitude: newEvent.longitude,
      },
      type: newEvent.type,
      time: {
        start: newEvent.startTime,
        end: newEvent.endTime,
      },
      image: newEvent.image,
      additionalDetails: {
        capacity: parseInt(newEvent.capacity, 10),
        fees: newEvent.fees == 0 ? "Free" : newEvent.fees,
        targetAudience: newEvent.targetAudience,
        sponsors: [
          { name: newEvent.sponsor1Name, image: newEvent.sponsor1Image },
          { name: newEvent.sponsor2Name, image: newEvent.sponsor2Image },
        ].filter((sponsor) => sponsor.name && sponsor.image),
      },
    };

    await uploadCampaignOne(eventData);

    // Fetch the latest campaigns after adding a new one
    await fetchCampaigns();

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
    tasks: [],
  });
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
        tasks: viewDetails.tasks,
      });
    }
  }, [viewDetails]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaigns = await getCampaigns();
      setEventList(campaigns); // Update the state with fetched campaigns
    };

    fetchCampaigns(); // Call the function to fetch campaigns
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <Layout>
      <div className="h-[90vh] bg-white p-4 text-gray-800">
        <motion.h2
          className="text-4xl font-semibold text-center mb-4 text-green-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Campaigns Listed by You
        </motion.h2>

        <p className="text-center mb-6 text-lg">
          List campaigns , make a difference.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <input
            type="text"
            placeholder="Search events, or keywords"
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
            <p className="text-lg font-medium">
              Showing results: {eventList.length} Events
            </p>
          </motion.div>

          <div className="space-y-4">
            {[...eventList].reverse().map((event, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-xl shadow-md flex justify-between items-start transition-all duration-300 hover:shadow-lg hover:bg-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full">
                      E
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {event.name}
                      </h4>
                      <p className="text-gray-500">{event.organization}</p>
                    </div>
                  </div>
                  {/* Combined row for city, start time, end time, and date */}
                  <div className="flex items-center justify-start gap-4 text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400" />{" "}
                      {event.location.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegClock className="mr-1" /> {event.time.start} -{" "}
                      {event.time.end}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="mr-1" />{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  {/* Displaying tags from additionalDetails */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {event.additionalDetails && (
                      <>
                        {event.additionalDetails.type && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {event.additionalDetails.type}
                          </span>
                        )}
                        {event.additionalDetails.targetAudience && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {event.additionalDetails.targetAudience}
                          </span>
                        )}
                        {event.additionalDetails.fees && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {event.additionalDetails.fees}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleViewDetails(event)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate("/community")}
                    className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Collab
                  </button>
                </div>
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
                    <option value="Volunteer Opportunity">
                      Volunteer Opportunity
                    </option>
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
              <h2 className="text-2xl font-semibold mb-2">
                {viewDetails.name}
              </h2>

              {/* Event Description */}
              <p className="text-gray-700 mb-4">{viewDetails.description}</p>

              {/* Timeline Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Event Timeline</h3>

                {/* Timeline Container */}
                <div className="flex justify-between items-center w-full">
                  {events.map((event, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {/* Animated Circle */}
                      <motion.div
                        className={`w-6 h-6 rounded-full ${
                          selectedEvent === index
                            ? "bg-green-500"
                            : "bg-gray-300"
                        } flex items-center justify-center cursor-pointer`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedEvent(index)}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span
                          className={`block w-2 h-2 rounded-full ${
                            selectedEvent === index
                              ? "bg-white"
                              : "bg-transparent"
                          }`}
                        />
                      </motion.div>

                      {/* Event Label */}
                      <p className="mt-2 text-sm text-center">{event.label}</p>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="flex justify-between mt-4 items-center w-full">
                  {events.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1 flex-1 mx-1 rounded-full ${
                        selectedEvent >= index ? "bg-green-500" : "bg-gray-300"
                      }`}
                      initial={{ width: 0 }}
                      animate={{
                        width: selectedEvent >= index ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    />
                  ))}
                </div>
              </div>

              {/* Editable Event Details Section */}
              <div className="space-y-2 mb-4 mt-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="text-gray-700">Date</label>
                    <input
                      type="text"
                      value={editableDetails.date}
                      onChange={(e) =>
                        setEditableDetails({
                          ...editableDetails,
                          date: e.target.value,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-700">Start Time</label>
                    <input
                      type="text"
                      value={editableDetails.time.start}
                      onChange={(e) =>
                        setEditableDetails({
                          ...editableDetails,
                          time: {
                            ...editableDetails.time,
                            start: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-700">End Time</label>
                    <input
                      type="text"
                      value={editableDetails.time.end}
                      onChange={(e) =>
                        setEditableDetails({
                          ...editableDetails,
                          time: {
                            ...editableDetails.time,
                            end: e.target.value,
                          },
                        })
                      }
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
                      onChange={(e) =>
                        setEditableDetails({
                          ...editableDetails,
                          location: {
                            ...editableDetails.location,
                            address: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-700">Organizer</label>
                    <input
                      type="text"
                      value={editableDetails.organizer}
                      onChange={(e) =>
                        setEditableDetails({
                          ...editableDetails,
                          organizer: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setEditableDetails({
                          ...editableDetails,
                          contactEmail: e.target.value,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-700">Registration Link</label>
                    <input
                      type="text"
                      value={editableDetails.registrationLink}
                      onChange={(e) =>
                        setEditableDetails({
                          ...editableDetails,
                          registrationLink: e.target.value,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Volunteer Section */}
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

                {/* Task List */}
                <div className="space-y-2 max-h-28 overflow-y-auto">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm"
                    >
                      <span
                        className={`flex-grow ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.name}
                      </span>
                      <button
                        onClick={() => toggleTaskCompletion(index)}
                        className={`ml-4 px-4 py-1 rounded-lg ${
                          task.completed
                            ? "bg-gray-300 text-gray-700"
                            : "bg-green-600 text-white"
                        } hover:${
                          task.completed ? "bg-gray-400" : "bg-green-700"
                        } transition`}
                      >
                        {task.completed ? "Unmark Important" : "Mark Important"}
                      </button>
                    </li>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  Volunteers Assigned
                </h3>

                {/* Volunteer List */}
                <div className="space-y-2 max-h-28 overflow-y-auto">
                  {volunteer.map((name, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm"
                    >
                      <span className={`flex-grow`}>{name}</span>
                    </li>
                  ))}
                </div>
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
                    className="px-4 py-2 mr-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    onClick={() => navigate(`/event-details/${viewDetails.id}`)}
                  >
                    Analytics
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
    </Layout>
  );
};

export default NGOEventListingPage;
