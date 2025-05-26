import clsx from "clsx";
import s from "./ImageModal.module.css";
import Modal from "react-modal";
import { ImageModalProps } from "./ImageModal.types";

Modal.setAppElement("#root");

export default function ImageModal({
  isOpen,
  onClose,
  selectedImg,
}: ImageModalProps) {
  const {
    alt_description: alt,
    created_at: date,
    likes,
    urls,
    user: author,
  } = selectedImg;

  const { regular } = urls;
  const {
    instagram_username: insta,
    links: { html },
    location,
    name,
  } = author;

  return (
    <Modal
      className={clsx(s.modal)}
      overlayClassName={clsx(s.modalOverlay)}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className={clsx(s.modalImgCont)}>
        <img className={clsx(s.modalImg)} src={regular} alt={alt} />
        <div className={clsx(s.modalImgInfo)}>
          <a
            className={clsx(s.userLink)}
            href={html}
            target="_blank"
            rel="noopener noreferrer"
          >
            Author: {name}
          </a>
          <a
            className={clsx(s.userLink)}
            href={`https://www.instagram.com/${insta}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <p className={clsx(s.imageInfo)}>Likes: {likes}</p>
          <p className={clsx(s.imageInfo)}>Location: {location}</p>
          <p className={clsx(s.imageInfo)}>Created at: {date.split("T")[0]}</p>
        </div>
      </div>
    </Modal>
  );
}
