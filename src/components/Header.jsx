import { IoIosSettings } from "react-icons/io";
function Header() {
  return (
    <nav className="flex justify-between items-center my-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#163020]">
        Timer Tide
      </h1>
      <button className=" bg-[#789461] px-4 py-2 rounded border hover:bg-[#294B29] text-center text-2xl text-[#294B29] hover:text-[#789461]">
        <IoIosSettings />
      </button>
    </nav>
  );
}
export default Header;
