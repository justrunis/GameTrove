import { motion } from "framer-motion";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/http";
import { ALL_ROLES } from "../../utils/constants";
import { updateUser } from "../../api/http";
import { toast } from "react-toastify";

export default function UserEditModal({ user, onClose, onSubmit, open }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("User updated successfully");
      onClose();
    },
    onSettled: () => {
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(true);
    mutate({ id: editedUser.id, userData: editedUser });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form
        className="flex flex-col gap-4 text-primary-content"
        onSubmit={handleSubmit}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.2 }}
          className="flex gap-2 flex-col my-2 text-base-content"
        >
          <Input
            label="Username"
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleChange}
            labelClassName="text-lg font-bold"
            inputClassName="input input-bordered"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            labelClassName="text-lg font-bold"
            inputClassName="input input-bordered"
          />
          <motion.label
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-bold"
          >
            Role
          </motion.label>
          <motion.select
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="select select-bordered"
            name="role"
            value={editedUser.role}
            onChange={handleChange}
          >
            {ALL_ROLES.map((role) => (
              <option key={role.id} value={role.name} className="text-lg">
                {role}
              </option>
            ))}
          </motion.select>
          <div className="flex gap-4 my-2">
            <Button
              className="btn btn-primary text-primary-content rounded-lg min-h-[40px]"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="btn btn-success text-primary-content rounded-lg min-h-[40px]"
              type="submit"
              disabled={isEditing}
            >
              Update User
            </Button>
          </div>
        </motion.div>
      </form>
    </Modal>
  );
}
