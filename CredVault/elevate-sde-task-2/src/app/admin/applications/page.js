
"use client";

import Link from "next/link";
import { useCredVaultData, updateApplicationStatus } from "../../../lib/data";

export default function AdminApplications() {
  const data = useCredVaultData();
  const applications = data.applications;

  function updateStatus(id, status) {
    updateApplicationStatus(id, status);
  }

  return (
    <main className="min-h-screen bg-[#0b1120] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/admin/applications"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Applications
          </Link>

          <Link
            href="/admin/certificates"
            className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-600"
          >
            Certificates
          </Link>
        </div>

        <h1 className="mb-8 text-center text-3xl font-bold">
          Applications
        </h1>

        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-800/60">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-slate-700/70 text-slate-200">
              <tr>
                <th className="px-4 py-4">Application ID</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Phone</th>
                <th className="px-4 py-4">Gender</th>
                <th className="px-4 py-4">City</th>
                <th className="px-4 py-4">State</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-700">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-slate-700/30">
                  <td className="whitespace-nowrap px-4 py-4">
                    #{application.id}
                  </td>
                  <td className="px-4 py-4">{application.name}</td>
                  <td className="px-4 py-4">{application.phone}</td>
                  <td className="px-4 py-4">{application.gender}</td>
                  <td className="px-4 py-4">{application.city}</td>
                  <td className="px-4 py-4">{application.state}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        application.status === "Approved"
                          ? "bg-green-500/15 text-green-400"
                          : application.status === "Rejected"
                            ? "bg-red-500/15 text-red-400"
                            : "bg-yellow-500/15 text-yellow-400"
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {application.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(application.id, "Approved")}
                          className="rounded-md bg-green-600 px-3 py-2 font-medium hover:bg-green-700"
                        >
                          Issue
                        </button>

                        <button
                          onClick={() => updateStatus(application.id, "Rejected")}
                          className="rounded-md bg-red-600 px-3 py-2 font-medium hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {applications.length === 0 && (
            <p className="p-6 text-center text-slate-400">
              No applications found.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
