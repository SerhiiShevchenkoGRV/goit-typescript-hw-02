export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImg: SelectedImage;
}

export interface SelectedImage {
  alt_description: string;
  created_at: string;
  likes: number;
  urls: {
    regular: string;
  };
  user: {
    name: string;
    instagram_username: string;
    location: string;
    links: {
      html: string;
    };
  };
}
