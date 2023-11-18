"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./FlipBook.module.css";

// Here's an overview of the book...
// Here's a preview of the book...

import PageFlip from "react-pageflip";

const imagePaths = [
  "/images/book/UNDX_FLIP_A.jpg",
  "/images/book/UNDX_FLIP_A2.jpg",
  "/images/book/UNDX_FLIP_A3.jpg",
  "/images/book/UNDX_FLIP_A4.jpg",
  "/images/book/UNDX_FLIP_A5.jpg",
  "/images/book/UNDX_FLIP_A6.jpg",
  "/images/book/UNDX_FLIP_A7.jpg",
  "/images/book/UNDX_FLIP_A8.jpg",
  "/images/book/UNDX_FLIP_A9.jpg",
  "/images/book/UNDX_FLIP_A10.jpg",
  "/images/book/UNDX_FLIP_A11.jpg",
  "/images/book/UNDX_FLIP_A12.jpg",
  "/images/book/UNDX_FLIP_A13.jpg",
  "/images/book/UNDX_FLIP_A14.jpg",
  "/images/book/UNDX_FLIP_A15.jpg",
  "/images/book/UNDX_FLIP_A16.jpg",
  "/images/book/UNDX_FLIP_A17.jpg",
  "/images/book/UNDX_FLIP_A18.jpg",
];

const FlipBook = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full px-4 py-5 sm:p-6">
        <div className="w-full pt-6">
          <PageFlip width={224} height={267} size="stretch">
            <p></p>
            {imagePaths.map((path, index) => (
              <Image
                src={path}
                alt={`page${index + 1}`}
                key={index + 1}
                width={224}
                height={267}
                priority={true}
              />
            ))}
          </PageFlip>
        </div>
      </div>
    </div>
  );
};

export default FlipBook;
