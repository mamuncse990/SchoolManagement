import React from "react";

interface MessageDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  message: {
    senderName: string;
    receiverName: string;
    content: string;
    createdAt: string;
  };
}

const MessageDetailsDialog: React.FC<MessageDetailsDialogProps> = ({ open, onClose, message }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Message Details</h2>
        <div className="mb-2">
          <span className="font-medium">Sender:</span> {message.senderName}
        </div>
        <div className="mb-2">
          <span className="font-medium">Receiver:</span> {message.receiverName}
        </div>
        <div className="mb-2">
          <span className="font-medium">Content:</span>
          <div className="border rounded p-2 bg-gray-50 mt-1">{message.content}</div>
        </div>
        <div className="mb-2">
          <span className="font-medium">Date:</span> {new Date(message.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default MessageDetailsDialog; 