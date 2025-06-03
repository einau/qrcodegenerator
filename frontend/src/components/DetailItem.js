import React from 'react';

const DetailItem = ({ label, value }) => (
  <div className="border-b pb-2">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

export default DetailItem;
