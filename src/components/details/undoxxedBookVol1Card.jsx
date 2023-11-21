import Image from "next/image";

export default function UndoxxedBookVol1Card() {
  return (
    <div className="w-full overflow-hidden border border-white shadow sm:w-2/4">
      <div className="w-full px-4 py-5 sm:p-6 font-['Arial']">
        <Image
          src="/images/page3.JPG"
          alt="CoverImageAbout"
          width={224 * 3}
          height={267 * 3}
        />
        <h1 className="pt-4 text-2xl font-bold text-purple-600">
          UNDOXXED BOOK VOL1
        </h1>
        <p
          className="pt-4 font-light text-white/70"
          style={{ textAlign: "justify" }}
        >
          Is the first book focuses on &quot;The Finest in Digital Lifestyle
          Culture.&quot; and covers a wide array of subjects, including fashion,
          streetwear, sneakers, street art, design, and technology. Furthermore,
          it delves into the entire digital fashion ecosystem where street
          culture & lifestyle merge to Web3.0
        </p>
        <p
          className="pt-4 font-light text-white/70"
          style={{ textAlign: "justify" }}
        >
          A critical aspect of this book is to emphasize the bridge between
          In-Virtual-Life (IVL) and In-Real-Life (IRL) assets. This theme
          &quot;phygital&quot; is prominently reflected in the editorial
          content, subject selection, and the highlighting of physical elements.
        </p>
        <p
          className="pt-4 font-light text-white/70"
          style={{ textAlign: "justify" }}
        >
          The approach of this book is purely editorial, and that there are no
          advertising or payd content. The Undoxxed team acts as as
          &quot;curator&quot;, seeking out brands, Web3 projects,
          designer-creators, and artists who, in their judgment, are at the
          forefront of the fashion and lifestyle ecosystem of the future. These
          individuals and entities are chosen based on editorial criteria.
        </p>
        <p
          className="pt-4 font-light text-white/70"
          style={{ textAlign: "justify" }}
        >
          The content featured in this book signifies a significant era and a
          shift in how fashion is created, consumed, and experienced. It is a
          responsibility to document and archive this transformation, which is
          why &quot;UNDOXXED&quot; has come into existence.
        </p>
        <p
          className="pt-6 font-bold text-white/70"
          style={{ textAlign: "justify" }}
        >
          SNEAKERS STREETWEAR PHYGITAL AR WEARABLE TOYS SKATE NFT DIGITAL
          FASHION COLLECTIBLE STREET ART JEWELRY DESIGN & TECH 3D PRINTING
          DIGITAL IDENTITY DIGITAL EXPERIENCES
        </p>
      </div>
    </div>
  );
}
