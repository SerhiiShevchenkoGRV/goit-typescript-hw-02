import { Image } from "../App/App.types";

export interface ImageCardProps {
  image: Image;
  clickOnImg: (image: Image) => void;
}
