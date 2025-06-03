import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailItem from './DetailItem';

export default function VerifyPage() {
  const { id } = useParams();
  const [certData, setCertData] = useState(null);
  
  useEffect(() => {
    fetch(`/api/verify/${id}`)
      .then(res => res.json())
      .then(data => setCertData(data));
  }, [id]);

  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border-2 border-blue-800">
        {/* Academy Header */}
        <div className="bg-blue-900 text-white py-6 px-8 text-center">
          <h1 className="text-2xl font-bold">Fly Ontime Aviation Sciences Academy</h1>
          <h2 className="text-lg mt-2">Certificate Verification System</h2>
        </div>

        {/* Verification Status */}
        <div className={`p-8 text-center ${certData?.valid ? 'bg-green-100' : 'bg-red-100'}`}>
          {certData ? (
            certData.valid ? (
              <>
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-800">VALID CERTIFICATE</h3>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-2xl font-bold text-red-800">CERTIFICATE NOT FOUND</h3>
              </>
            )
          ) : (
            <div className="text-blue-500">Verifying certificate...</div>
          )}
        </div>

        {/* Certificate Details */}
        {certData?.valid && (
          <div className="px-8 py-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-center">Certificate Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Certificate ID" value={id} />
              <DetailItem label="Student ID" value={certData.studentId} />
              <DetailItem label="Student Name" value={certData.studentName} />
              <DetailItem label="Course Name" value={certData.courseName} />
              <DetailItem label="Entry Date" value={certData.entryDate} />
              <DetailItem label="Completion Date" value={certData.completionDate} />
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href={`/student/${id}`}
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                View Full Student Profile
              </a>
            </div>
          </div>
        )}

        {/* Academy Footer */}
        <div className="bg-gray-100 px-8 py-6 border-t border-gray-300">
          <h4 className="font-semibold mb-2">For More Information:</h4>
          <ul className="space-y-1">
            <li>
              <a href="https://www.iata.org/en/training/courses/partner-network~/fly-ontime-aviationsciencesacademy/460906/" 
                 className="text-blue-600 hover:underline">
                IATA Partner Network
              </a>
            </li>
            <li>
              <a href="https://flyontimeaviationsciencesacademy.com" 
                 className="text-blue-600 hover:underline">
                Academy Website
              </a>
            </li>
            <li>Email: info@flyontimeaviationsciencesacademy.com</li>
            <li>Phone: +211 (0)913370933</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
