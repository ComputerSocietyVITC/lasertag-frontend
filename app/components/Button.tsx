interface Props {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger" | "secondary";
  className?: string;
}

export default function Button({
  label,
  onClick,
  variant = "default",
  className = "",
}: Props) {
  const baseClasses =
    "px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variantClasses = {
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    secondary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
