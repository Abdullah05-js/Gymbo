import { Types } from "../types/ButtonType";
interface ButtonProps {
  type: Types;
  color: string;
  content: string;
  onClick: () => void;
}

const Button = ({ type, color, content, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${color} border-2 m-1 cursor-pointer  border-white bg-black shadow-2xl p-2 text-center rounded-xl transition duration-200 ease-in-out  hover:translate-1`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
