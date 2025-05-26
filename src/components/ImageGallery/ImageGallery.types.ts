import { RefObject } from "react";

import { Image } from "../App/App.types";

export interface ImageGalleryProps {
  images: Image[];
  clickOnImg: (image: Image) => void;
}
