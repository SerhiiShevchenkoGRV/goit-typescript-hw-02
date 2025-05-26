import clsx from "clsx";
import s from "./SearchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent } from "react";
import { SearchBarProps } from "./SearchBar.types";

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newSearch = formData.get("search") as string;

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
