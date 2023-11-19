"use client";
const { createContext, useRef, useEffect } = require("react");

const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const previewRef = useRef(null);
  const detailsRef = useRef(null);
  const mintRef = useRef(null);
  const mintStep2Ref = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const sectionRefs = {
    previewRef: previewRef,
    detailsRef: detailsRef,
    mintRef: mintRef,
    mintStep2Ref: mintStep2Ref,
    scrollToSection: scrollToSection,
  };

  return (
    <SectionContext.Provider value={sectionRefs}>
      {children}
    </SectionContext.Provider>
  );
};

export default SectionContext;
