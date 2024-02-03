import { Button } from "../ui/button";

const Header = ({ title, subtitle }) => {
  return (
    <div className="pb-6 flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{title}</h1>
        <span className="opacity-30">{subtitle}</span>
      </div>
    </div>
  );
};

export default Header;
