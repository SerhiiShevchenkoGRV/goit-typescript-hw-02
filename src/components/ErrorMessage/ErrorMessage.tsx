import clsx from "clsx";
import s from "./ErrorMessage.module.css";
import { ErrorMessageProps } from "./ErrorMessage.types";

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  return <span className={clsx(s.errMessSpan)}>{errorMessage}</span>;
}
