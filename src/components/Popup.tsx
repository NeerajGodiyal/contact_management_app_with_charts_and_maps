import React from "react";

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  status: string;
  mob?: string; 
}

interface PopupProps {
  close: () => void;
  el: Contact;
  isOpen: boolean; 
}

const Popup: React.FC<PopupProps> = ({ close, el, isOpen }) => {
  const handleClose = () => {
    
    close();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full ${isOpen ? 'flex justify-center items-center' : 'hidden'}`}>
      <div className="bg-white rounded-md p-4 w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Contact Details</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleClose} 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div key={el.id} className="bg-gray-200 p-4 text-black rounded-lg">
          <div className="w-40 h-40 mx-auto mb-4">
            <img
              className="w-full h-full rounded-full mx-auto"
              src="https://img.freepik.com/free-vector/illustration-businesswoman_53876-5857.jpg?w=826&t=st=1693007917~exp=1693008517~hmac=d38278613744b334b3de0c8e76ef9efb69911c1a0aaccc8b1ab28994840c6158"
              alt=""
            />
          </div>
          <div className="text-left">
            <p className="text-xl font-semibold mb-2">
              {el.first_name} {el.last_name}
            </p>
            <p className="text-lg mb-2">
              Mobile: {el.mob || "Not provided"}
            </p>
            <p className="text-lg mb-2">
              Status:{" "}
              <span className={el.status === "active" ? "text-green-600" : "text-red-600"}>
                {el.status === "active" ? "Active" : "Inactive"}
              </span>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
