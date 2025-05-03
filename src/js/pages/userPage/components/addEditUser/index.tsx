import React from "react";
// @ import components
import UserForm from "../userForm";
import Modal from "@/js/components/modal";
import { NewUserData } from "../../index";

interface AddEditUserProps {
  isModal: boolean;
  onSubmit: (data: NewUserData) => void;
  onClose: () => void;
  editData?: {
    name: string;
    email: string;
    gender: string;
    location: string;
  } | null;
}

const AddEditUser: React.FC<AddEditUserProps> = ({
  isModal,
  onSubmit,
  onClose,
  editData,
}) => {
  return (
    <Modal isOpen={isModal} onClose={onClose}>
      <UserForm onSubmit={onSubmit} editData={editData} />
    </Modal>
  );
};

export default AddEditUser;
