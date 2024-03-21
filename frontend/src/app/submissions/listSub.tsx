"use client";
import { useState } from "react";
import { Submission } from "./page";

interface ListSubProps {
  submission: Submission[];
}

const ListSub: React.FC<ListSubProps> = ({ submission }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(submission[0]);
  
  const handleSubmissionClick = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  return (
    <div className="flex">
      <div className="w-1/3 p-4 border-r">
        <h2 className="text-lg font-bold mb-4">Submissions</h2>
        <ul>
          {submission.map((submission) => (
            <li
              key={submission.id}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => handleSubmissionClick(submission)}
            >
              {new Date(submission.submission_date).toLocaleString()} -{" "}
              {submission.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 p-4">
        {selectedSubmission ? (
          <div>
            <h2 className="text-lg font-bold mb-4">Selected Submission</h2>
            <p>Language: {selectedSubmission.language}</p>
            <p>Submitted by: {selectedSubmission.username}</p>
            <p>
              Submission Date:{" "}
              {new Date(selectedSubmission.submission_date).toLocaleString()}
            </p>
            <h3 className="text-lg font-bold mt-4">Source Code</h3>
            <pre className="bg-gray-100 p-2">
              {selectedSubmission.source_code}
            </pre>
          </div>
        ) : (
          <p className="text-gray-500">
            Select a submission to view its details.
          </p>
        )}
      </div>
    </div>
  );
};

export default ListSub;
