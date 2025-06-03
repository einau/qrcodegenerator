import React from 'react';

const DetailCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <div className="text-2xl mb-2">{icon}</div>
    <div className="font-medium text-gray-500">{title}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

export default DetailCard;
