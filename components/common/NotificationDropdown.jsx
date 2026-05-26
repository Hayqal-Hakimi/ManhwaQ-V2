import React from 'react';
import { Link } from 'react-router-dom';

export const NotificationDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const mockNotifications = [
    { id: 1, type: 'new_chapter', title: 'New chapter!', content: 'Solo Leveling Ch. 93 available now', read: false },
    { id: 2, type: 'new_poll', title: 'New community poll!', content: 'Vote: Who is the strongest Monarch?', read: false },
    { id: 3, type: 'system', title: 'Welcome to ManhwaQ V2', content: 'Enjoy the new Modern Parchment interface.', read: true },
  ];

  return (
    <>
      {/* Invisible overlay to close dropdown when clicking outside */}
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      
      <div className="absolute top-12 right-0 w-80 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="p-3 border-b-2 border-black bg-[#455859]/5 flex justify-between items-center">
          <h3 className="font-black text-[#455859]">Notifications</h3>
          <button onClick={onClose} className="material-icons text-sm text-[#455859]/50 hover:text-black">close</button>
        </div>
        
        <div className="max-h-80 overflow-y-auto divide-y-2 divide-dashed divide-black/15">
          {mockNotifications.map(n => (
            <div key={n.id} className={`p-4 hover:bg-black/5 transition-colors cursor-pointer ${!n.read ? 'bg-[#8b5e3c]/5' : ''}`}>
              <div className="font-bold text-[#455859] text-sm flex items-start gap-2 leading-tight">
                {!n.read && <span className="w-2 h-2 rounded-full bg-[#ba1a1a] flex-shrink-0 mt-1"></span>}
                <div>
                  <div>{n.title}</div>
                  <div className="text-xs text-[#455859]/70 mt-1 font-medium">{n.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-2 border-t-2 border-black text-center bg-gray-50">
          <button 
            type="button" 
            onClick={onClose}
            className="text-[10px] font-bold text-[#455859] uppercase tracking-wider hover:underline"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
};
