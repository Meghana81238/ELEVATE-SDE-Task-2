
"use client";

import { useState } from "react";
import { useCredVaultData } from "../../lib/data";

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [error, setError] = useState("");

  const data = useCredVaultData();

  const certificate = searchedId
    ? data.certificates.find(
        (item) =>
          item.id.toLowerCase() === searchedId.toLowerCase()
      ) || null
    : null;

  function handleVerify(event) {
    event.preventDefault();
    setError("");

    const id = certificateId.trim().replace(/^#/, "").toUpperCase();

    if (!id) {
      setSearchedId("");
      setError("Please enter a Certificate ID.");
      return;
    }

    setSearchedId(id);

    const found = data.certificates.find(
      (item) => item.id.toUpperCase() === id
    );

    if (!found) {
      setError("Certificate not found. Please check the Certificate ID.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0b1120] px-5 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Verify Certificate
        </h1>

        <form
          onSubmit={handleVerify}
          className="space-y-5 rounded-xl border border-slate-700 bg-slate-800/60 p-6"
        >
          <div>
            <label htmlFor="certificateId" className="mb-2 block">
              Certificate ID
            </label>

            <input
              id="certificateId"
              type="text"
              value={certificateId}
              onChange={(event) => {
                setCertificateId(event.target.value);
                setSearchedId("");
                setError("");
              }}
              placeholder="Enter Certificate ID"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
          >
            Verify
          </button>
        </form>

        {certificate && (
          <div className="mt-6 rounded-xl border border-slate-600 bg-slate-800/60 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Certificate Details
            </h2>

            <p className="mb-2">
              <strong>Name:</strong> {certificate.name}
            </p>

            <p className="mb-2">
              <strong>Phone:</strong> {certificate.phone}
            </p>

            <p className="mb-2">
              <strong>Issued on Date:</strong> {certificate.issuedOn}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  certificate.status === "Valid"
                    ? "font-semibold text-green-400"
                    : "font-semibold text-red-400"
                }
              >
                {certificate.status}
              </span>
            </p>
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
