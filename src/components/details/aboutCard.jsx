import Image from "next/image";

export default function AboutCard() {
  return (
    <div className="w-full overflow-hidden border border-white shadow sm:w-2/4">
      <div className="w-full px-4 py-5 sm:p-6">
        <Image
          src="/images/page3.JPG"
          alt="CoverImageAbout"
          width={224 * 3}
          height={267 * 3}
        />
        <h1 className="pt-4 font-bold font-proxima_bold">About</h1>
        <p className="pt-4 font-light font-proxima_reg text-white/70">
          &quot;UNDOXXED Book Vol. 1,&quot; is a the first book focuses on
          &quot;The Finest in Digital Lifestyle Culture.&quot; and covers a wide
          array of subjects, including fashion, streetwear, sneakers, street
          art, design, and technology. Furthermore, it delves into the entire
          digital fashion ecosystem where street culture & lifestyle merge to
          Web3.0
        </p>
        <p className="pt-4 font-light font-proxima_reg text-white/70">
          A critical aspect of this book is to emphasize the bridge between
          In-Virtual-Life (IVL) and In-Real-Life (IRL) assets. This theme
          &quot;phygital&quot; is prominently reflected in the editorial
          content, subject selection, and the highlighting of physical elements.
        </p>
        <p className="pt-4 font-light font-proxima_reg text-white/70">
          The approach of this book is purely editorial, and that there are no
          advertising or payd content. The Undoxxed team acts as as
          &quot;curator&quot;, seeking out brands, Web3 projects,
          designer-creators, and artists who, in their judgment, are at the
          forefront of the fashion and lifestyle ecosystem of the future. These
          individuals and entities are chosen based on editorial criteria.
        </p>
        <p className="pt-4 font-light font-proxima_reg text-white/70">
          The content featured in this book signifies a significant era and a
          shift in how fashion is created, consumed, and experienced. It is a
          responsibility to document and archive this transformation, which is
          why &quot;UNDOXXED&quot; has come into existence.
        </p>
      </div>
    </div>
  );
}
