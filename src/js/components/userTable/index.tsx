import React from "react";
// @ import dependencies
import Image from "next/image";

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

interface UserTableProps {
  users: User[];
  className?: string;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  className = "",
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`overflow-x-auto rounded-xl shadow-md border border-gray-200 ${className}`}
    >
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500 tracking-wider">
          <tr>
            <th scope="col" className="px-6 py-4">
              Image
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Email
            </th>
            <th scope="col" className="px-6 py-4">
              Gender
            </th>
            <th scope="col" className="px-6 py-4">
              Location
            </th>
            <th scope="col" className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {users?.length ? (
            <>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4">
                    <Image
                      src={user.picture.thumbnail}
                      alt={user.name.first}
                      width={40}
                      height={40}
                      className="rounded-full border"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {`${user?.name?.first} ${user?.name?.last || ""}`}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user?.email}</td>
                  <td className="px-6 py-4 capitalize">{user?.gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {`${user?.location?.city || ""}, ${
                      user?.location?.state || ""
                    }, ${user?.location?.country || ""}`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onEdit(user)}
                        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(user)}
                        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={6}>
                <div className="text-center py-10 text-gray-500 text-sm">
                  No users found.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
