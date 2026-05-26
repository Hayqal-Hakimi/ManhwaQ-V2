import React from 'react';

/**
 * EmptyState — papar bila API return [] atau belum ada data.
 */
export const EmptyState = ({
  icon = 'inbox',
  title = 'Tiada data lagi',
  description = 'Senarai kosong — sambung backend untuk papar kandungan.',
  action = null,
}) => {
  return (
    <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-10 text-center">
      <span className="material-icons text-5xl text-[#455859]/25 block mb-4">{icon}</span>
      <h3 className="text-xl font-black text-[#455859]">{title}</h3>
      <p className="text-sm text-[#455859]/60 font-medium mt-2 max-w-md mx-auto">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
