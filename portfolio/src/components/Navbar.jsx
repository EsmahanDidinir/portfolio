import { HouseHeart, FolderKanban, Send } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home">
        <HouseHeart />
      </a>

      <a href="#projects">
        <FolderKanban />
      </a>

      <a href="#contact">
        <Send />
      </a>
    </nav>
  );
}

export default Navbar;