type MessageProps = {
  message: string;
  type?: "error" | "info" | "success";
};

export const Message = ({ message, type = "info" }: MessageProps) => {
  const backgroundColor =
    type === "error"
      ? "bg-red-100"
      : type === "success"
      ? "bg-green-100"
      : "bg-blue-100";
  const borderColor =
    type === "error"
      ? "border-red-400"
      : type === "success"
      ? "border-green-400"
      : "border-blue-400";
  const textColor =
    type === "error"
      ? "text-red-700"
      : type === "success"
      ? "text-green-700"
      : "text-blue-700";

  return (
    <div
      className={`${backgroundColor} ${borderColor} ${textColor} px-4 py-3 rounded relative`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
