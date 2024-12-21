const Popup = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 transform transition-all">
        <div className="text-center">
          <div className="mb-4">
            <img 
              src="/popup.gif" 
              alt="Popup"
              className="mx-auto h-48 w-48 object-cover rounded-full"
            />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">{message}</h3>
          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
