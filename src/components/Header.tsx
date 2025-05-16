import logo from "/logo.png";
import Button from "./Button";

type HeaderProps = {
  setIsModalOpen: (isOpen: boolean) => void;
};

const Header = ({ setIsModalOpen }: HeaderProps) => {
  return (
    <div className="flex flex-row justify-start items-center rounded-3xl   gap-2 m-2 bg-white/30 backdrop-blur-sm drop-shadow-amber-50 max-h-16 min-h-16">
      <img src={logo} alt="logo" className="object-cover w-20 rounded-lg" />

      <Button
        type="button"
        color="text-blue-300"
        content="Favorite"
        onClick={() => setIsModalOpen(true)}
      />
    </div>
  );
};

export default Header;
