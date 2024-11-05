import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchAllUsers } from "../api/http";
import { STALE_TIME } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import Pager from "../components/UI/Pager";
import { useSearchParams } from "react-router-dom";
import UserEditModal from "../components/Admin/UserEditModal";
import UserDeleteModal from "../components/Admin/UserDeleteModal";

export default function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", { page: currentPage }],
    queryFn: () => fetchAllUsers({ page: currentPage }),
    staleTime: STALE_TIME,
  });

  const [editUser, setEditUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    const newParams = { page: page };
    setSearchParams(newParams);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setIsEditing(true);
  };

  const handleDeleteUser = (user) => {
    setEditUser(user);
    setIsDeleting(true);
  };

  const handleCloseModal = () => {
    setEditUser(null);
    setIsEditing(false);
    setIsDeleting(false);
  };

  const refetchUsers = () => {
    setEditUser(null);
    setIsEditing(false);
    setIsDeleting(false);
    queryClient.invalidateQueries("users");
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorIndicator
        title="Error"
        message={error.message || "An error has occurred"}
      />
    );
  }

  if (users) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center w-full lg:w-1/2 bg-base-100 p-8 rounded-lg shadow-lg border-4 border-accent"
      >
        {isEditing && (
          <UserEditModal
            open={isEditing}
            user={editUser}
            onClose={handleCloseModal}
            onSubmit={refetchUsers}
          />
        )}

        {isDeleting && (
          <UserDeleteModal
            user={editUser}
            onClose={handleCloseModal}
            open={isDeleting}
            onSubmit={refetchUsers}
          />
        )}

        <h1 className="text-3xl font-bold text-base-content mt-8">
          Admin Panel
        </h1>
        <table className="table table-zebra mt-4">
          <thead>
            <tr className="hover">
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.users.map((user) => (
              <tr key={user._id} className="hover">
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-2">
                  <Button
                    className="btn btn-warning"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn btn-error"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager
          totalPages={users.totalPages}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      </motion.div>
    );
  }
}
