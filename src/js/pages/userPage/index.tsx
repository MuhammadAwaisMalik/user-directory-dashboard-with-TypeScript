"use client";
import type React from "react";
import { useEffect, useState } from "react";
// @ import components
import UserCard from "@/js/components/userCard";
import UserTable from "@/js/components/userTable";
import Pagination from "@/js/components/pagination";
import DeleteUser from "./components/deleteUser";
import AddEditUser from "./components/addEditUser";

const USERS_PER_PAGE = 5;

interface User {
  name: {
    first: string;
    last?: string;
  };
  email: string;
  gender: string;
  location: {
    city: string;
    state?: string;
    country?: string;
  };
  picture: {
    thumbnail: string;
    large?: string;
  };
}

export interface EditUserData {
  name: string;
  email: string;
  gender: string;
  location: string;
}

export interface NewUserData {
  name: string;
  email: string;
  gender: string;
  location: string;
  picture?: {
    thumbnail?: string;
    large?: string;
  };
}

interface UsersPageProps {
  data: User[];
}

const UsersPage: React.FC<UsersPageProps> = ({ data }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editData, setEditData] = useState<EditUserData | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [usersData, setUsersData] = useState<User[]>(data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAddModal, setIsAddModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);

  useEffect(() => {
    setUsersData(data);
  }, [data]);

  useEffect(() => {
    const currentUsers = usersData?.slice(
      (currentPage - 1) * USERS_PER_PAGE,
      currentPage * USERS_PER_PAGE
    );

    //  If current page becomes empty, go to previous page
    if (currentUsers?.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setUsers(currentUsers);
    }
  }, [currentPage, usersData]);

  useEffect(() => {
    if (usersData) {
      setTotalPages(Math.ceil(usersData?.length / USERS_PER_PAGE));
    }
  }, [usersData]);

  const handleDelete = (user: User): void => {
    setSelectedUser(user);
    setIsShowConfirm(true);
  };

  const handleConfirmDelete = (): void => {
    setUsers(users?.filter((u) => u.email !== selectedUser?.email));
    setUsersData(usersData?.filter((u) => u.email !== selectedUser?.email));
    handleCancelDelete();
  };

  const handleCancelDelete = (): void => {
    setIsShowConfirm(false);
    setSelectedUser(null);
  };

  const handleAddNewUser = (data: NewUserData): void => {
    const newUser: User = {
      name: {
        first: data?.name,
      },
      email: data?.email,
      gender: data?.gender,
      location: {
        city: data?.location,
      },
      picture: {
        thumbnail: "https://randomuser.me/api/portraits/lego/1.jpg",
        large: "https://randomuser.me/api/portraits/lego/1.jpg",
      },
    };

    const updatedUsers = [newUser, ...usersData];
    setUsersData(updatedUsers);
    setCurrentPage(1);
    setIsAddModal(false);
  };

  const handleEditUser = (data: User): void => {
    const simplifiedData: EditUserData = {
      name: data?.name?.first,
      email: data?.email,
      location: data?.location?.city,
      gender: data?.gender,
    };
    setEditData(simplifiedData);
    setIsEditModal(true);
  };

  const handleUpdateUser = (data: EditUserData): void => {
    const updatedUsers = usersData?.map((user) =>
      user?.email === data?.email
        ? {
            ...user,
            name: { ...user.name, first: data?.name },
            gender: data?.gender,
            location: {
              ...user.location,
              city: data?.location,
            },
          }
        : user
    );

    setUsersData(updatedUsers);
    setIsEditModal(false);
  };

  const cleanedUser = selectedUser
    ? {
        name: {
          first: selectedUser.name.first || "",
          last: selectedUser.name.last || "",
        },
      }
    : null;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between mb-4 items-center">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <button
          onClick={() => setIsAddModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Add User
        </button>
      </div>
      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDelete}
        className={"hidden md:block"}
      />
      <UserCard
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDelete}
        className={"block md:hidden"}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {isShowConfirm ? (
        <DeleteUser
          selectedUser={cleanedUser}
          isShowConfirm={isShowConfirm}
          onClose={() => setIsShowConfirm(false)}
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
      ) : null}
      {isAddModal ? (
        <AddEditUser
          isModal={isAddModal}
          onSubmit={handleAddNewUser}
          onClose={() => setIsAddModal(false)}
        />
      ) : null}
      {isEditModal ? (
        <AddEditUser
          isModal={isEditModal}
          editData={editData ?? undefined}
          onSubmit={handleUpdateUser}
          onClose={() => setIsEditModal(false)}
        />
      ) : null}
    </div>
  );
};

export default UsersPage;
