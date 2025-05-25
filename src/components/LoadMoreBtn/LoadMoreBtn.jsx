import clsx from "clsx";
import s from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ pageIncrement }) {
  return (
    <button onClick={pageIncrement} className={clsx(s.loadMoreBtn)}>
      Load More
    </button>
  );
}
