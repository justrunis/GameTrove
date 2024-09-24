import Button from "./Button";

export default function PrimaryButton({ children, className = "", ...props }) {
  return (
    <Button
      className={`bg-primary text-primary-content px-3 py-1 rounded-lg w-full ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
