"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./FlipBook.module.css";

const FlipBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const maxPage = 5;

  const pageUrls = Array.from(
    { length: maxPage },
    (_, index) => `/images/page${index + 1}.JPG`
  );

  const handleNextPage = () => {
    console.log("enter Next");
    setCurrentPage((prevPage) => (prevPage + 1) % pageUrls.length);
  };

  const handlePrevPage = () => {
    setCurrentPage(
      (prevPage) => (prevPage - 1 + pageUrls.length) % pageUrls.length
    );
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="pt-8 place-items-center">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pageUrls[currentPage]}
            alt={`Page ${currentPage + 1}`}
            // className=""
          />
          <div
            className="absolute inset-y-0 left-0 w-2/4"
            onClick={handlePrevPage}
          ></div>
          <div
            className="absolute inset-y-0 right-0 w-2/4"
            onClick={handleNextPage}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FlipBook;
