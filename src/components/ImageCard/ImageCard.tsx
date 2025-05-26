import clsx from "clsx";
import s from "./ImageCard.module.css";
import { forwardRef } from "react";
import { ImageCardProps } from "./ImageCard.types";

const ImageCard = forwardRef<HTMLImageElement, Omit<ImageCardProps, "refProp">>(
  function ImageCard(props, ref) {
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
          ref={ref}
        />
      </div>
    );
  }
);

export default ImageCard;
