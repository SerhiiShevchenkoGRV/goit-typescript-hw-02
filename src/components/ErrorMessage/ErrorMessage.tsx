import clsx from "clsx";
import s from "./ErrorMessage.module.css";

export default function ErrorMessage({ errorMessage }) {
  return <span className={clsx(s.errMessSpan)}>{errorMessage}</span>;
}
