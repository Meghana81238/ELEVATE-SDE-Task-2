
"use client";

import { useState } from "react";
import { useCredVaultData } from "../../lib/data";

export default function TrackApplication() {
  const data = useCredVaultData();
  const [applicationId, setApplicationId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleTrack(event) {
    event.preventDefault();
    setResult(null);
    setError("");

    const enteredId = applicationId.trim().replace(/^#/, "").toUpperCase();

    const application = data.applications.find(
      (item) => item.id.toUpperCase() === enteredId
    );

    if (application) {
      setResult(application);
    } else {
      setError("Application not found. Please check the Application ID.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0b1120] px-5 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Track Application
        </h1>

        <form
          onSubmit={handleTrack}
          className="space-y-5 rounded-xl border border-slate-700 bg-slate-800/60 p-6"
        >
          <div>
            <label htmlFor="applicationId" className="mb-2 block">
              Application ID
            </label>
            <input
              id="applicationId"
              type="text"
              value={applicationId}
              onChange={(event) => setApplicationId(event.target.value)}
              placeholder="Enter Application ID"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
          >
            Track
          </button>
        </form>

        {result && (
          <div className="mt-6 rounded-xl border border-slate-600 bg-slate-800/60 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Application Details
            </h2>
            <p className="mb-2"><strong>Application ID:</strong> #{result.id}</p>
            <p className="mb-2"><strong>Name:</strong> {result.name}</p>
            <p className="mb-2"><strong>Status:</strong> {result.status}</p>
            <p className="mb-2"><strong>City:</strong> {result.city}</p>
            <p className="mb-2"><strong>State:</strong> {result.state}</p>
            <p><strong>Submission Date:</strong> {result.submissionDate}</p>
          </div>
        )}

        {error && (
          <p className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-300">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
