import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useState } from "react";
import { validateRegistrationForm } from "../utils/validation";

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

const formFields = [
  {
    type: "email",
    name: "email",
    label: "Email",
  },
  {
    type: "text",
    name: "username",
    label: "Username",
  },

  {
    type: "password",
    name: "password",
    label: "Password",
  },
  {
    type: "password",
    name: "confirmPassword",
    label: "Confirm Password",
  },
];

export default function Register() {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const validationResponse = validateRegistrationForm(userInput);
    if (validationResponse) {
      setError(validationResponse);
    } else {
      alert("Form submitted successfully");
    }
  };

  const clearInputs = () => {
    setUserInput({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  document.title = "Register";

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-primary p-8 rounded-lg text-primary-content shadow-lg border-4 border-accent w-96"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      <motion.h1
        variants={childVariants}
        className="text-4xl font-bold text-center"
      >
        Register
      </motion.h1>
      <motion.form
        variants={childVariants}
        className="flex flex-col gap-2 w-full mt-4"
        onSubmit={handleSubmit}
      >
        {formFields.map((field) => (
          <>
            <Input
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              inputClassName="rounded-lg p-2 mt-1 bg-base-300 text-base-content"
              value={userInput[field.name]}
              error={error[field.name]}
              onChange={handleChange}
              placeholder={field.label}
            />
            {error[field.name] && (
              <p className="text-sm text-error">{error[field.name]}</p>
            )}
          </>
        ))}
        <motion.div
          variants={childVariants}
          className="flex justify-start gap-2 items-center"
        >
          <Button type="submit" className="btn btn-success">
            Register
          </Button>
          <Button
            type="button"
            className="btn btn-warning"
            onClick={clearInputs}
          >
            Clear
          </Button>
        </motion.div>

        <motion.div
          variants={childVariants}
          className="flex justify-start gap-4"
        >
          <Link
            to="/login"
            className="text-primary-content text-sm underline hover:text-accent"
          >
            Already have an account? Login
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
