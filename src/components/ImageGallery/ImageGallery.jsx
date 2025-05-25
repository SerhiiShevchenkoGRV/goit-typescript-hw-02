import { useRef, useEffect } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import clsx from "clsx";

export default function ImageGallery({ images, clickOnImg }) {
  const lastImageRef = useRef(null);
  useEffect(() => {
    const scrollToImage = () => {
      if (lastImageRef.current) {
        lastImageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToImage();
  }, [images]);

  return (
    <ul className={clsx(s.galleryList)}>
      {images.map((image, index) => (
        <li className={clsx(s.galleryItem)} key={image.id}>
          <ImageCard
            image={image}
            clickOnImg={clickOnImg}
            ref={index === images.length - 1 ? lastImageRef : null}
          ></ImageCard>
        </li>
      ))}
    </ul>
  );
}
