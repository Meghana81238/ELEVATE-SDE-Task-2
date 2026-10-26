
"use client";

import Link from "next/link";
import { useCredVaultData, revokeCertificate } from "../../../lib/data";

export default function AdminCertificatesPage() {
  const data = useCredVaultData();
  const certificates = data.certificates;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-slate-400">
          Manage issued certificates
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/admin/applications"
            className="rounded-lg border border-slate-700 px-5 py-3 text-slate-300 hover:bg-slate-800"
          >
            Applications
          </Link>

          <Link
            href="/admin/certificates"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white"
          >
            Certificates
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                <th className="p-4">Certificate ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">City</th>
                <th className="p-4">State</th>
                <th className="p-4">Issued On</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {certificates.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="p-8 text-center text-slate-400"
                  >
                    No certificates found.
                  </td>
                </tr>
              ) : (
                certificates.map((certificate) => (
                  <tr
                    key={certificate.id}
                    className="border-t border-slate-800"
                  >
                    <td className="p-4 font-medium">
                      {certificate.id}
                    </td>
                    <td className="p-4">{certificate.name}</td>
                    <td className="p-4">{certificate.phone}</td>
                    <td className="p-4">{certificate.city}</td>
                    <td className="p-4">{certificate.state}</td>
                    <td className="p-4">{certificate.issuedOn}</td>
                    <td className="p-4">
                      <span
                        className={
                          certificate.status === "Valid"
                            ? "rounded-full bg-green-500/15 px-3 py-1 text-green-400"
                            : "rounded-full bg-red-500/15 px-3 py-1 text-red-400"
                        }
                      >
                        {certificate.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {certificate.status === "Valid" ? (
                        <button
                          onClick={() => revokeCertificate(certificate.id)}
                          className="rounded-lg bg-red-600 px-4 py-2 font-medium hover:bg-red-700"
                        >
                          Revoke
                        </button>
                      ) : (
                        <span className="text-slate-500">Revoked</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
