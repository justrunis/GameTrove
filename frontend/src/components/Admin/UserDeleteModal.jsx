import { motion } from "framer-motion";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useState } from "react";
import { deleteUser } from "../../api/http";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "../../api/http";

export default function UserDeleteModal({ user, onClose, onSubmit, open }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("User deleted successfully");
      onClose();
    },
    onSettled: () => {
      setIsDeleting(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setIsDeleting(true);
    mutate({ userId: user._id });
  }

  return (
    <Modal onClose={onClose} open={open}>
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center text-accent">
            Are you sure you want to delete the user {user.username}?
          </h2>
          <p className="text-center text-red-500 font-bold uppercase">
            This action cannot be undone.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              className="btn btn-primary text-primary-content rounded-lg min-h-[40px]"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-success text-primary-content rounded-lg min-h-[40px]"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete User"}
            </Button>
          </div>
        </motion.div>
      </form>
    </Modal>
  );
}
