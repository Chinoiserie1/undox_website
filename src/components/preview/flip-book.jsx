"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import PageFlip from "react-pageflip";

const imagePaths = [
  "/images/FLIP_UNDX/firstPage.jpeg",
  "/images/FLIP_UNDX/Cover_Black.jpg",
  "/images/FLIP_UNDX/2/1.jpg",
  "/images/FLIP_UNDX/2/2.jpg",
  "/images/FLIP_UNDX/2/3.jpg",
  "/images/FLIP_UNDX/2/4.jpg",
  "/images/FLIP_UNDX/2/5.jpg",
  "/images/FLIP_UNDX/2/6.jpg",
  "/images/FLIP_UNDX/2/7.jpg",
  "/images/FLIP_UNDX/2/8.jpg",
  "/images/FLIP_UNDX/2/9.jpg",
  "/images/FLIP_UNDX/2/10.jpg",
  "/images/FLIP_UNDX/2/11.jpg",
  "/images/FLIP_UNDX/2/12.jpg",
  "/images/FLIP_UNDX/2/13.jpg",
  "/images/FLIP_UNDX/2/14.jpg",
  "/images/FLIP_UNDX/2/15.jpg",
  "/images/FLIP_UNDX/2/16.jpg",
  "/images/FLIP_UNDX/2/17.jpg",
  "/images/FLIP_UNDX/2/18.jpg",
  "/images/FLIP_UNDX/2/19.jpg",
  "/images/FLIP_UNDX/2/20.jpg",
  "/images/FLIP_UNDX/2/21.jpg",
  "/images/FLIP_UNDX/2/22.jpg",
  "/images/FLIP_UNDX/2/23.jpg",
  "/images/FLIP_UNDX/2/24.jpg",
  "/images/FLIP_UNDX/2/25.jpg",
  "/images/FLIP_UNDX/2/26.jpg",
  "/images/FLIP_UNDX/2/27.jpg",
  "/images/FLIP_UNDX/2/28.jpg",
  "/images/FLIP_UNDX/2/29.jpg",
  "/images/FLIP_UNDX/2/30.jpg",
  "/images/FLIP_UNDX/2/31.jpg",
  "/images/FLIP_UNDX/2/32.jpg",
  "/images/FLIP_UNDX/2/33.jpg",
  "/images/FLIP_UNDX/2/34.jpg",
  "/images/FLIP_UNDX/2/35.jpg",
  "/images/FLIP_UNDX/2/36.jpg",
  "/images/FLIP_UNDX/2/37.jpg",
  "/images/FLIP_UNDX/2/38.jpg",
  "/images/FLIP_UNDX/2/39.jpg",
  "/images/FLIP_UNDX/2/40.jpg",
  "/images/FLIP_UNDX/2/41.jpg",
  "/images/FLIP_UNDX/2/42.jpg",
  "/images/FLIP_UNDX/2/43.jpg",
  "/images/FLIP_UNDX/2/44.jpg",
  "/images/FLIP_UNDX/2/45.jpg",
  "/images/FLIP_UNDX/2/46.jpg",
  "/images/FLIP_UNDX/2/47.jpg",
  "/images/FLIP_UNDX/2/48.jpg",
  "/images/FLIP_UNDX/UNDX_END.jpg",
];

const FlipBook = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full px-4 py-5 sm:p-6">
        <div className="w-full pt-6">
          <PageFlip width={224} height={267} size="stretch">
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
