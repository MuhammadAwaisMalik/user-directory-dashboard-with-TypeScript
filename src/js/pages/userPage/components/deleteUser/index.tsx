import React from "react";
// @ import components
import Modal from "@/js/components/modal";

interface DeleteUserProps {
  onClose: () => void;
  selectedUser: {
    name: {
      first: string;
      last: string;
    };
  } | null;
  isShowConfirm: boolean;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({
  onClose,
  selectedUser,
  isShowConfirm,
  handleCancelDelete,
  handleConfirmDelete,
}) => {
  return (
    <div>
      <Modal isOpen={isShowConfirm} onClose={onClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 max-w-sm text-center space-y-4">
            <p className="text-lg font-medium text-gray-800">
              Are you sure you want to delete{" "}
              <strong>
                {selectedUser
                  ? `${selectedUser.name.first} ${selectedUser.name.last}`
                  : ""}
              </strong>
              ?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteUser;
