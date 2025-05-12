"use client";

import React, { useState } from "react";

interface PrintAdmitCardDialogProps {
  open: boolean;
  onClose: () => void;
}

const PrintAdmitCardDialog: React.FC<PrintAdmitCardDialogProps> = ({ open, onClose }) => {
  const [classValue, setClassValue] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [birthCertificateId, setBirthCertificateId] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ classValue, applicationId, birthCertificateId });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-3xl font-bold mb-8">Print Admit Card</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1">
              Class <span className="text-red-500">*</span>
            </label>
            <select 
              value={classValue}
              onChange={(e) => setClassValue(e.target.value)}
              className="border rounded p-2"
              required
            >
              <option value="">Select One</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              {/* Add more class options as needed */}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label>ADM APPLICATION ID</label>
            <input
              type="text"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              className="border rounded p-2"
              placeholder="Application ID"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1">
              BIRTH CERTIFICATE ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={birthCertificateId}
              onChange={(e) => setBirthCertificateId(e.target.value)}
              className="border rounded p-2"
              placeholder="Birth Certificate ID"
              required
            />
          </div>

          <p className="text-red-500 text-sm">N.B - Birth Certificate ID is Mandatory</p>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrintAdmitCardDialog;