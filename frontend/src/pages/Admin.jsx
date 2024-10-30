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

  const handlePageChange = (page) => {
    const newParams = { page: page };
    setSearchParams(newParams);
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
              <tr key={user.id} className="hover">
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-2">
                  <Button
                    className="btn btn-warning"
                    onClick={() => {
                      toast.info("Feature not implemented yet");
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn btn-error"
                    onClick={() => {
                      toast.info("Feature not implemented yet");
                    }}
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
