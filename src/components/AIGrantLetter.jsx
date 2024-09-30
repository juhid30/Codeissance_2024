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
// Custom styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
});

const PermissionLetterGenerator = () => {
  const [letterContent, setLetterContent] = useState({
    ngoName: "",
    body: "",
    date: new Date().toLocaleDateString(),
    recipient: "",
    governmentBody: "",
    recipientDesignation: "", // New field
    projectName: "", // New field
    projectDescription: "", // New field
    requirement1: "", // New field
    requirement2: "", // New field
    requirement3: "", // New field
    submissionDeadline: "", // New field
    supportingDocuments: "", // New field
    signatoryName: "", // New field
    phoneNumber: "", // New field
    emailAddress: "", // New field
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLetterContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const preprocessLetterBody = (body) => {
    // Remove format specifiers and apply bolding
    const formattedBody = body
      .replace(/Subject Line:\s*[^*]*\*/g, "") // Remove Subject Line
      .replace(/Dear\s*\*\*\*[^*]*\*/g, "Dear") // Remove asterisks around "Dear"
      .replace(/\*\*\s*([^*]*):\s*/g, (match, p1) => `${p1}:`) // Remove ** before field names
      .replace(/\*\*\*\*\*\*([^*]*)(\*\*\*\*\*\*)?/g, "$1") // Remove trailing asterisks
      .replace(/\*([^*]*)\*/g, "$1"); // Remove remaining asterisks
    // .replace(/(\w+):/g, (match) => `<b>${match.trim()}</b>`); // Bold field names

    return formattedBody;
  };

  const handleGenerateLetter = async () => {
    setLoading(true);
    try {
      const API_KEY = "AIzaSyCVOV_MuOdKNFYVTQOzjtjpSDqL73FspW8";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Create a formal letter for an NGO requesting permission from the government to proceed with specific requirements. The letter should include the following details:

Date: [Insert current date]
Recipient:
Name: [Government official’s name, e.g., The Secretary]
Department: [Relevant government department, e.g., Ministry of Social Welfare]
Government body: [e.g., Government of India]
Subject line: "Request for Permission Regarding [specific NGO requirements]"
Body:
Salutation: "Respected Sir/Madam,"
First paragraph: Introduce the NGO ([NGO Name]) and briefly describe the specific request (e.g., event, funding, or access to resources). Explain how the request aligns with the NGO's mission and the target group it serves.
Second paragraph: Provide details about the NGO's registration and past work. Highlight the relevance of the request in relation to the NGO's current projects and objectives.
Third paragraph: Emphasize how the request aligns with the government’s goals or initiatives. Mention the inclusion of any necessary documents (project proposal, financial details).
Concluding paragraph: Express hope for approval and willingness to provide further information if needed. Thank the recipient for their consideration.
Closing: "Yours faithfully,"
Signature: Include the name, designation (e.g., Founder/Director), and contact details (phone and email) of the signatory.`;

      //       const prompt = `You are the head of an NGO. You need permission for the event ${letterContent.projectName} with requirements of Specific requirements needed: 1. ${letterContent.requirement1}
      // 2. ${letterContent.requirement2}
      // 3. ${letterContent.requirement3}. State the purpose of the letter, which is to request the specific requirements needed. The details are:

      // Please include the following elements in the letter without headings:

      // NGO's name: ${letterContent.ngoName}
      // Date of the letter: ${letterContent.date}
      // Recipient's name: ${letterContent.recipient}
      // Recipient's designation: ${letterContent.recipientDesignation}
      // Government body name: ${letterContent.governmentBody}

      // The name and designation of the person signing the letter: ${letterContent.signatoryName}
      // Contact information:
      // Phone: ${letterContent.phoneNumber}
      // Email: ${letterContent.emailAddress}

      // The date should be on the right side,then "To:" onwards everything on the left.
      // Please ensure that the tone is formal, professional, and respectful, and that the letter is structured clearly for easy comprehension.
      // `;

      //       const prompt = `I need to draft a professional permission letter from an NGO addressed to a specific government body. The purpose of this letter is to formally request the requirements as specified in the form details filled out by the admin.

      // Please include the following elements in the letter without headings:

      // NGO's name: ${letterContent.ngoName}
      // Date of the letter: ${letterContent.date}
      // Recipient's name: ${letterContent.recipient}
      // Recipient's designation: ${letterContent.recipientDesignation}
      // Government body name: ${letterContent.governmentBody}

      // Dear ${letterContent.recipient},

      // Briefly introduce the NGO, including its mission and the services it provides. Mention any past collaborations with the government body, if applicable.

      // State the purpose of the letter, which is to request the specific requirements needed for ${letterContent.projectName} related to ${letterContent.projectDescription}.
      // Include key details from the form that outline what is being requested:
      // Nature of the project: ${letterContent.projectDescription}
      // Specific requirements needed:
      // 1. ${letterContent.requirement1}
      // 2. ${letterContent.requirement2}
      // 3. ${letterContent.requirement3}
      // Deadline for submission, if any: ${letterContent.submissionDeadline}
      // Any supporting documents that will be attached to the letter: ${letterContent.supportingDocuments}

      // Express appreciation for the government body’s ongoing support and cooperation.
      // Invite them to reach out for further clarification or to discuss the request in more detail.

      // The name and designation of the person signing the letter: ${letterContent.signatoryName}
      // Contact information:
      // Phone: ${letterContent.phoneNumber}
      // Email: ${letterContent.emailAddress}

      // Please ensure that the tone is formal, professional, and respectful, and that the letter is structured clearly for easy comprehension.`;

      const result = await model.generateContent(prompt);
      const body = preprocessLetterBody(result.response.text()); // Get the generated text from the response

      setLetterContent((prevContent) => ({
        ...prevContent,
        body: body,
      }));
      setIsModalOpen(true); // Open the modal after generating the letter
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Permission Letter Generator</h1>
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <div className="mb-2">
          <label className="block">
            NGO Name:
            <input
              type="text"
              name="ngoName"
              value={letterContent.ngoName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Recipient:
            <input
              type="text"
              name="recipient"
              value={letterContent.recipient}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Recipient Designation:
            <input
              type="text"
              name="recipientDesignation"
              value={letterContent.recipientDesignation}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Government Body:
            <input
              type="text"
              name="governmentBody"
              value={letterContent.governmentBody}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Project Name:
            <input
              type="text"
              name="projectName"
              value={letterContent.projectName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Project Description:
            <textarea
              name="projectDescription"
              value={letterContent.projectDescription}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Requirement 1:
            <input
              type="text"
              name="requirement1"
              value={letterContent.requirement1}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Requirement 2:
            <input
              type="text"
              name="requirement2"
              value={letterContent.requirement2}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Requirement 3:
            <input
              type="text"
              name="requirement3"
              value={letterContent.requirement3}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Submission Deadline:
            <input
              type="text"
              name="submissionDeadline"
              value={letterContent.submissionDeadline}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Supporting Documents:
            <input
              type="text"
              name="supportingDocuments"
              value={letterContent.supportingDocuments}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Signatory Name:
            <input
              type="text"
              name="signatoryName"
              value={letterContent.signatoryName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={letterContent.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block">
            Email Address:
            <input
              type="email"
              name="emailAddress"
              value={letterContent.emailAddress}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={handleGenerateLetter}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Letter"}
        </button>
      </form>

      {isModalOpen && (
        <div>
          <PDFDownloadLink
            document={<MyDocument />}
            fileName="permission_letter.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Letter"
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default PermissionLetterGenerator;
