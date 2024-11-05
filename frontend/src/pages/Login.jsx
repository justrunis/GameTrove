import { motion } from "framer-motion";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { validateLoginForm } from "../utils/validation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/http";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Login({ onLogin }) {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("game-trove-token", data.token);
      onLogin(data.token);
      toast.success(data.message);
      clearInputs();
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e) => {
    setUserInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    const validationResponse = validateLoginForm(userInput);
    if (Object.keys(validationResponse).length > 0) {
      setError(validationResponse);
    } else {
      mutation.mutate({ userData: userInput });
    }
  };

  const clearInputs = () => {
    setUserInput({
      email: "",
      password: "",
    });
    setError({
      email: "",
      password: "",
    });
  };

  document.title = "Login";

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-primary p-8 rounded-lg text-primary-content border-2 border-accent shadow-lg w-96"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      <motion.h1
        variants={childVariants}
        className="text-4xl font-bold text-center"
      >
        Login
      </motion.h1>
      <motion.form
        variants={childVariants}
        className="flex flex-col gap-2 mt-4"
        onSubmit={handleSubmit}
      >
        <Input
          label="Email"
          type="email"
          name="email"
          inputClassName="rounded-lg p-2 mt-1 bg-base-300 text-base-content"
          value={userInput.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {error.email && (
          <p className="text-sm text-error italic">{error.email}</p>
        )}
        <Input
          label="Password"
          type="password"
          name="password"
          inputClassName="rounded-lg p-2 mt-1 bg-base-300 text-base-content"
          value={userInput.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {error.password && (
          <p className="text-sm text-error italic">{error.password}</p>
        )}
        <motion.div
          variants={childVariants}
          className="flex justify-start gap-4"
        >
          <Button type="submit" className="btn btn-success">
            Login
          </Button>
          <Button
            type="button"
            onClick={clearInputs}
            className="btn btn-warning"
          >
            Clear
          </Button>
        </motion.div>
        <motion.div
          variants={childVariants}
          className="flex justify-start gap-4"
        >
          <Link
            to="/register"
            className="text-primary-content text-sm underline hover:text-accent"
          >
            Don't have an account? Register
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
