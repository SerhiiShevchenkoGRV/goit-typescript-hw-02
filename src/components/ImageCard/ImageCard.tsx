import clsx from "clsx";
import s from "./ImageCard.module.css";
import { forwardRef } from "react";

const ImageCard = forwardRef(function ImageCard(props, refProp) {
  const { image, clickOnImg } = props;
  const {
    alt_description: alt,
    urls: { small },
  } = image;

  return (
    <div className={clsx(s.galleryImgCard)}>
      <img
        onClick={() => {
          clickOnImg(image);
        }}
        className={clsx(s.galleryImg)}
        src={small}
        alt={alt}
        ref={refProp}
      />
    </div>
  );
});

export default ImageCard;
