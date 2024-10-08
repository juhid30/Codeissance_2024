import React, { useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Layout from "./Layout";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: "2010-2020",
        data: [385, 722, 510, 924, 643, 308, 456, 299, 785, 827, 642, 711],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "2020-onwards",
        data: [654, 275, 823, 472, 916, 332, 567, 798, 411, 289, 610, 741],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <Line data={data} options={options} />;
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
});

const newsData = [
  {
    title: "Airbus Begins Building The First A321XLR",
    viewers: 535,
    reads: 150,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    title: "Travel Tests Are Sufficient To COVID According To AA",
    viewers: 325,
    reads: 260,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    title: "Canada Says UIA Shooting Was A Terrorist Act",
    viewers: 560,
    reads: 370,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    title: "51% Of Germany's Condor Sold To Attestor",
    viewers: 245,
    reads: 135,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    title: "Cathay Pacific Staff Required To Get Vaccinated",
    viewers: 365,
    reads: 200,
    imageUrl: "https://via.placeholder.com/150",
  },
];

const NewsComponent = () => (
  <div className="space-y-4">
    {newsData.map((news, index) => (
      <div
        key={index}
        className="flex items-center p-4 bg-white rounded-lg shadow-md"
      >
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-20 h-20 rounded-lg mr-4 object-cover"
        />
        <div className="flex-1">
          <h3 className="text-md font-bold">{news.title}</h3>
          <div className="text-sm text-gray-500">
            <span>{news.viewers} viewers</span> &middot;{" "}
            <span>{news.reads} reads</span>
          </div>
          <a href="#" className="text-blue-500 text-sm">
            See details
          </a>
        </div>
      </div>
    ))}
  </div>
);

const PermissionLetterGenerator = () => {
  const [letterContent, setLetterContent] = useState({
    ngoName: "",
    recipient: "",
    governmentBody: "",
    recipientDesignation: "",
    projectName: "",
    projectDescription: "",
    requirement1: "",
    requirement2: "",
    requirement3: "",
    submissionDeadline: "",
    supportingDocuments: "",
    signatoryName: "",
    phoneNumber: "",
    emailAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLetterContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const preprocessLetterBody = (body) => {
    const formattedBody = body
      .replace(/Subject Line:\s*[^*]*\*/g, "")
      .replace(/Dear\s*\*\*\*[^*]*\*/g, "Dear")
      .replace(/\*\*\s*([^*]*):\s*/g, (match, p1) => `${p1}:`)
      .replace(/\*\*\*\*\*\*([^*]*)(\*\*\*\*\*\*)?/g, "$1")
      .replace(/\*([^*]*)\*/g, "$1");

    return formattedBody;
  };

  const handleGenerateLetter = async () => {
    setLoading(true);
    try {
      const API_KEY = "AIzaSyCVOV_MuOdKNFYVTQOzjtjpSDqL73FspW8"; // Use a safe method to manage API keys
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Create a formal letter for an NGO requesting permission from the government.
      \n Use only the details which I give you.\n
          ngoName: "",\n
    recipient: "",\n
    governmentBody: "",\n
    recipientDesignation: "",\n
    projectName: "",\n
    projectDescription: "",\n
    requirement1: "",\n
    requirement2: "",\n
    requirement3: "",\n
    submissionDeadline: "",\n
    supportingDocuments: "",\n
    signatoryName: "",\n
    phoneNumber: "",\n
    emailAddress: "",\n\n Using these variables that I have provided, generate just a body of the letter`;

      const result = await model.generateContent(prompt);
      const body = preprocessLetterBody(result.response.text());

      setLetterContent((prevContent) => ({
        ...prevContent,
        body: body,
      }));
      setIsDownloaded(true);
    } catch (error) {
      console.error("Error generating letter body:", error);
    } finally {
      setLoading(false);
    }
  };

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Date: {letterContent.date}</Text>
          <Text>To,</Text>
          <Text>{letterContent.recipient}</Text>
          <Text>{letterContent.governmentBody}</Text>
        </View>
        <View style={styles.section}>
          <Text>Subject: Permission Letter</Text>
        </View>
        <View style={styles.section}>
          <Text>Dear {letterContent.recipient},</Text>
          <Text>{letterContent.body}</Text>
          <Text>Sincerely,</Text>
          <Text>{letterContent.ngoName}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <Layout>
      <div className="shadow-md rounded-lg p-6 w-screen mx-auto h-[90vh] overflow-hidden">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-extrabold text-green-600">
            Permission Letter Generator
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row h-full overflow-auto ">
          <div className="flex-1 lg:mr-4 overflow-auto py-5 invisible-scrollbar">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mb-4 space-y-4"
            >
              {/* Contact Details Section */}
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-4">
                  <label className="block w-full">
                    NGO Name:
                    <input
                      type="text"
                      name="ngoName"
                      value={letterContent.ngoName}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                  <label className="block w-full">
                    Government Body:
                    <input
                      type="text"
                      name="governmentBody"
                      value={letterContent.governmentBody}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                </div>
                <div className="flex space-x-4">
                  <label className="block w-full">
                    Recipient:
                    <input
                      type="text"
                      name="recipient"
                      value={letterContent.recipient}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                  <label className="block w-full">
                    Recipient Designation:
                    <input
                      type="text"
                      name="recipientDesignation"
                      value={letterContent.recipientDesignation}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                </div>
                <div className="flex space-x-4">
                  <label className="block w-full">
                    Project Name:
                    <input
                      type="text"
                      name="projectName"
                      value={letterContent.projectName}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                  <label className="block w-full">
                    Project Description:
                    <textarea
                      name="projectDescription"
                      value={letterContent.projectDescription}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                </div>
                <div className="flex space-x-4">
                  <label className="block w-full">
                    Requirement 1:
                    <input
                      type="text"
                      name="requirement1"
                      value={letterContent.requirement1}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                  <label className="block w-full">
                    Requirement 2:
                    <input
                      type="text"
                      name="requirement2"
                      value={letterContent.requirement2}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                  <label className="block w-full">
                    Requirement 3:
                    <input
                      type="text"
                      name="requirement3"
                      value={letterContent.requirement3}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                </div>
                <div className="flex space-x-4">
                  <label className="block w-full">
                    Submission Deadline:
                    <input
                      type="text"
                      name="submissionDeadline"
                      value={letterContent.submissionDeadline}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                  <label className="block w-full">
                    Supporting Documents:
                    <textarea
                      name="supportingDocuments"
                      value={letterContent.supportingDocuments}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                </div>
                <div className="flex space-x-4">
                  <label className="block w-full">
                    Signatory Name:
                    <input
                      type="text"
                      name="signatoryName"
                      value={letterContent.signatoryName}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                  <label className="block w-full">
                    Phone Number:
                    <input
                      type="text"
                      name="phoneNumber"
                      value={letterContent.phoneNumber}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                  <label className="block w-full">
                    Email Address:
                    <input
                      type="email"
                      name="emailAddress"
                      value={letterContent.emailAddress}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-green-300 rounded w-full"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => handleGenerateLetter()}
                  disabled={loading}
                  className={`${
                    loading ? "opacity-50 cursor-not-allowed" : "bg-green-600"
                  } text-white font-bold py-2 px-4 rounded`}
                >
                  {loading ? "Generating..." : "Generate Letter"}
                </button>
              </div>
            </form>

            {isDownloaded && (
              <PDFDownloadLink
                document={<MyDocument />}
                fileName="permission_letter.pdf"
                className="inline-block mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {({ loading }) =>
                  loading ? "Preparing document..." : "Download Letter"
                }
              </PDFDownloadLink>
            )}
          </div>

          <div className="w-full lg:w-1/2 lg:ml-4 overflow-auto py-5">
            <h2 className="text-xl font-bold">Chart Data</h2>
            <LineChart />
            <h2 className="text-xl font-bold mt-6">Latest News</h2>
            <NewsComponent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PermissionLetterGenerator;
