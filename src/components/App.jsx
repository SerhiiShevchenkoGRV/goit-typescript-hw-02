import SearchBar from "./SearchBar/SearchBar";
import ImageModal from "./ImageModal/ImageModal";
import ImageGallery from "./ImageGallery/ImageGallery";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";

import { useEffect, useState } from "react";
import { fetchImagesByQuery } from "../services/api";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function App() {
  const [images, setImages] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [topLoader, setTopLoader] = useState(false);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [color, setColor] = useState("#ED3B44");
  const [isFirstRender, setIsFirstRender] = useState(true);

  function clickOnImg(clickedImg) {
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
    setPage(page + 1);
  };

  useEffect(() => {
    if (!userQuery) return;
    const fetchImages = async () => {
      try {
        setIsFirstRender(false);
        setIsError(false);
        setTopLoader(true);
        setBottomLoader(true);
        const { results, total_pages } = await fetchImagesByQuery(
          userQuery,
          page
        );
        if (results.length === 0) {
          setIsError(true);
          setErrorMessage(
            "Sorry, there is no results found. Please, try another request"
          );
          return;
        }
        setImages((prev) => [...prev, ...results]);
        setTotalPages(total_pages);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
      } finally {
        setTopLoader(false);
        setBottomLoader(false);
      }
    };
    fetchImages();
  }, [userQuery, page]);

  const handleSubmit = (newQuery) => {
    setUserQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <div className="appCont">
      <SearchBar onSubmit={handleSubmit}></SearchBar>
      {isFirstRender && topLoader && <PropagateLoader color={color} />}
      {(isError && <ErrorMessage errorMessage={errorMessage}></ErrorMessage>) ||
        (images.length > 0 && (
          <ImageGallery images={images} clickOnImg={clickOnImg}></ImageGallery>
        ))}
      {(!isFirstRender && bottomLoader && (
        <PropagateLoader className="loader" color={color} />
      )) ||
        (images.length > 0 && page < totalPages && !isError && (
          <LoadMoreBtn pageIncrement={pageIncrement}></LoadMoreBtn>
        ))}
      {modalIsOpen && (
        <ImageModal
          isOpen={openModal}
          onClose={closeModal}
          selectedImg={selectedImg}
        ></ImageModal>
      )}
    </div>
  );
}
