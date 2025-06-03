import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailCard from './DetailCard';

export default function StudentProfile() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  
  useEffect(() => {
    fetch(`/api/verify/${id}`)
      .then(res => res.json())
      .then(data => setStudentData(data));
  }, [id]);

  if (!studentData || !studentData.valid) {
    return <div className="text-center p-10">Student data not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-10 px-8 text-center">
          <h1 className="text-3xl font-bold">Fly Ontime Aviation Sciences Academy</h1>
          <h2 className="text-xl mt-2">Student Academic Record</h2>
        </div>

        {/* Student Information */}
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mr-6 flex items-center justify-center">
              <span className="text-4xl">✈️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{studentData.studentName}</h1>
              <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2">
                <div><span className="font-medium">Student ID:</span> {studentData.studentId}</div>
                <div><span className="font-medium">Certificate ID:</span> {id}</div>
                <div><span className="font-medium">Program:</span> Aviation Sciences</div>
                <div><span className="font-medium">Status:</span> Completed</div>
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold mb-4">Course Completion Details</h3>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-6">
                <DetailCard 
                  title="Course Name" 
                  value={studentData.courseName} 
                  icon="📚"
                />
                <DetailCard 
                  title="Certificate Issued" 
                  value={studentData.completionDate} 
                  icon="📅"
                />
                <DetailCard 
                  title="Enrollment Date" 
                  value={studentData.entryDate} 
                  icon="✏️"
                />
                <DetailCard 
                  title="Verification Status" 
                  value="Verified" 
                  icon="✅"
                />
              </div>
            </div>
          </div>

          {/* QR Code Download */}
          <div className="mt-8 text-center border-t pt-6">
            <h3 className="text-lg font-semibold mb-3">Certificate QR Code</h3>
            <div className="bg-white p-4 inline-block border rounded-lg">
              <img 
                src={`/api/qrcode/${id}`} 
                alt="Certificate QR Code" 
                className="w-32 h-32"
              />
            </div>
            <a 
              href={`/api/qrcode/${id}`} 
              download={`FlyOntime-Certificate-${id}.png`}
              className="mt-4 inline-block bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-5 rounded-lg"
            >
              Download QR Code
            </a>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="bg-gray-100 px-8 py-6 text-center">
          <p className="text-sm text-gray-600">
            This certificate was issued by Fly Ontime Aviation Sciences Academy and can be verified at any time
            using the QR code or at https://verify.flyontimeacademy.com
          </p>
        </div>
      </div>
    </div>
  );
}
