import clsx from "clsx";
import s from "./LoadMoreBtn.module.css";
import { LoadMoreBtnProps } from "./LoadMoreBtn.types";

export default function LoadMoreBtn({ pageIncrement }: LoadMoreBtnProps) {
  return (
    <button onClick={pageIncrement} className={clsx(s.loadMoreBtn)}>
      Load More
    </button>
  );
}
