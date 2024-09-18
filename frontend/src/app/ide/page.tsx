"use client";
import React, { ChangeEvent, useState } from "react";
import createSubmission from "./action";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import MonacoEditor from "@monaco-editor/react"; // Import Monaco Editor component
import Link from "next/link";

let language = "";
const handleSubmit = async (formdata: FormData) => {
  const sourceCode = formdata.get("sourceCode")?.toString();
  const stdin = formdata.get("stdin")?.toString();
  console.log(sourceCode, stdin, language);
  if (!sourceCode || !stdin || !language) {
    return;
  }

  const resp = await createSubmission({
    stdin,
    sourceCode,
    language,
  });

  redirect("/submissions");
};

const CodeSubmissionForm = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [sourceCode, setSourceCode] = useState("");
  language = selectedLanguage;

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleEditorChange = (value: string | undefined) => {
    setSourceCode(value || "");
  };

  return (
    <div className="w-screen h-screen mx-auto grid grid-cols-2 gap-4 p-4">
      <div className="col-span-1 bg-gray-100 rounded-lg shadow-md p-4">
        {/* <div className="flex">

        <Link className="text-gray-300 bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/submissions">
          Submissions
        </Link>
        </div> */}
        <h2 className="text-lg font-bold mb-4">Sample Problem</h2>
        <p>This is where the sample problem content goes.</p>
      </div>
      <div className="col-span-1 bg-white rounded-lg shadow-md p-4">
        {/* Source code input and stdin */}
        {/* <h2 className="text-lg font-bold mb-4">Submit Your Code</h2> */}
        <form action={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex gap-4  justify-center">
          <select
              id="language"
              name="language"
              defaultValue={"C++"}
              onChange={handleLanguageChange}
              className="mt-1 p-2 border border-gray-300 rounded w-min focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Language</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600  text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit Code
            </button>

           

          </div>

          <div>

          </div>
          <div>
            <label
              htmlFor="sourceCode"
              className="block text-sm font-medium text-gray-700"
            >
              Source Code
            </label>
            <MonacoEditor
              height="400px"
              language={selectedLanguage.toLowerCase()} // Monaco Editor language setting
              value={sourceCode}
              onChange={handleEditorChange}
              theme="vs-dark" // You can choose different themes
            />
          </div>
          <div>
            <label
              htmlFor="stdin"
              className="block text-sm font-medium text-gray-700"
            >
              Standard Input (stdin)
            </label>
            <textarea
              id="stdin"
              name="stdin"
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CodeSubmissionForm;
