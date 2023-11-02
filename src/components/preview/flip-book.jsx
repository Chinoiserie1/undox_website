"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./FlipBook.module.css";

import PageFlip from "react-pageflip";

const FlipBook = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [pageFlipSize, setPageFlipSize] = useState({
    width: 300,
    height: 500,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize.width < 375) {
      setPageFlipSize({
        width: 200,
        height: 300,
      });
    }
    if (windowSize.width >= 1024) {
      setPageFlipSize({
        width: 400,
        height: 600,
      });
    }
  }, [windowSize]);

  return (
    <div className="flex justify-center">
      <div className="w-full px-4 py-5 sm:p-6">
        <div className="w-full pt-6">
          <PageFlip
            width={pageFlipSize.width}
            height={pageFlipSize.height}
            size="stretch"
          >
            <p></p>
            <img src="/images/book/UNDX_FLIP_A.jpg" alt="cover" />
            <img src="/images/book/UNDX_FLIP_A2.jpg" alt="page1" />
            <img src="/images/book/UNDX_FLIP_A3.jpg" alt="page2" />
            <img src="/images/book/UNDX_FLIP_A4.jpg" alt="page3" />
            <img src="/images/book/UNDX_FLIP_A5.jpg" alt="page4" />
            <img src="/images/book/UNDX_FLIP_A6.jpg" alt="page5" />
            <img src="/images/book/UNDX_FLIP_A7.jpg" alt="page6" />
            <img src="/images/book/UNDX_FLIP_A8.jpg" alt="page7" />
            <img src="/images/book/UNDX_FLIP_A9.jpg" alt="page8" />
            <img src="/images/book/UNDX_FLIP_A10.jpg" alt="page9" />
            <img src="/images/book/UNDX_FLIP_A11.jpg" alt="page10" />
            <img src="/images/book/UNDX_FLIP_A12.jpg" alt="page11" />
            <img src="/images/book/UNDX_FLIP_A13.jpg" alt="page12" />
            <img src="/images/book/UNDX_FLIP_A14.jpg" alt="page13" />
            <img src="/images/book/UNDX_FLIP_A15.jpg" alt="page14" />
            <img src="/images/book/UNDX_FLIP_A16.jpg" alt="page15" />
            <img src="/images/book/UNDX_FLIP_A17.jpg" alt="page16" />
            <img src="/images/book/UNDX_FLIP_A18.jpg" alt="page17" />
          </PageFlip>
        </div>
      </div>
    </div>
  );
};

export default FlipBook;
