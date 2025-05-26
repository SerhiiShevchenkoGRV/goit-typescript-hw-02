export interface Image {
  id: string;
  alt_description: string;
  created_at: string;
  likes: number;
  urls: {
    small: string;
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

export interface FetchImagesResponse {
  results: Image[];
  total_pages: number;
}
