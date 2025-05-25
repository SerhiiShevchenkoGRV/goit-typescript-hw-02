import clsx from "clsx";
import s from "./SearchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const newSearch = form.elements.search.value;

    if (newSearch.trim() === "") {
      toast.error("Please enter search image!");
      return;
    }

    onSubmit(newSearch);
    form.reset();
  };
  return (
    <header className={clsx(s.header)}>
      <Toaster />
      <form className={clsx(s.srchForm)} onSubmit={handleSearch}>
        <input
          className={clsx(s.srchInpt)}
          type="text"
          name="search"
          placeholder="Search images and photos"
        />
        <button className={clsx(s.srchBtn)} type="submit">
          <AiOutlineSearch className={clsx(s.srchIcon)} />
        </button>
      </form>
    </header>
  );
}
