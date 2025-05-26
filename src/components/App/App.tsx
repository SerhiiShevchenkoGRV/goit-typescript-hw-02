import SearchBar from "../SearchBar/SearchBar";
import ImageModal from "../ImageModal/ImageModal";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

import { useEffect, useState } from "react";
import { fetchImagesByQuery } from "../../services/api";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Image, FetchImagesResponse } from "./App.types";

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [userQuery, setUserQuery] = useState<string>("");
  const [selectedImg, setSelectedImg] = useState<Image | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [topLoader, setTopLoader] = useState<boolean>(false);
  const [bottomLoader, setBottomLoader] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#ED3B44");
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  function clickOnImg(clickedImg: Image) {
    setSelectedImg(clickedImg);
    openModal();
  }

  function openModal() {
    setIsOpen(true);
    document.body.classList.add("no-scroll");
  }

  function closeModal() {
    setIsOpen(false);
    document.body.classList.remove("no-scroll");
  }

  const pageIncrement = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!userQuery) return;

    const fetchImages = async () => {
      try {
        setIsFirstRender(false);
        setIsError(false);
        setTopLoader(true);
        setBottomLoader(true);

        const { results, total_pages }: FetchImagesResponse =
          await fetchImagesByQuery(userQuery, page);

        if (results.length === 0) {
          setIsError(true);
          setErrorMessage(
            "Sorry, there is no results found. Please, try another request"
          );
          return;
        }

        setImages((prev) => [...prev, ...results]);
        setTotalPages(total_pages);
      } catch (error: any) {
        setIsError(true);
        setErrorMessage(error.message || "Unknown error");
      } finally {
        setTopLoader(false);
        setBottomLoader(false);
      }
    };

    fetchImages();
  }, [userQuery, page]);

  const handleSubmit = (newQuery: string) => {
    setUserQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <div className="appCont">
      <SearchBar onSubmit={handleSubmit} />
      {isFirstRender && topLoader && <PropagateLoader color={color} />}
      {(isError && <ErrorMessage errorMessage={errorMessage} />) ||
        (images.length > 0 && (
          <ImageGallery images={images} clickOnImg={clickOnImg} />
        ))}
      {(!isFirstRender && bottomLoader && (
        <PropagateLoader className="loader" color={color} />
      )) ||
        (images.length > 0 && page < totalPages && !isError && (
          <LoadMoreBtn pageIncrement={pageIncrement} />
        ))}
      {modalIsOpen && selectedImg && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          selectedImg={selectedImg}
        />
      )}
    </div>
  );
}
