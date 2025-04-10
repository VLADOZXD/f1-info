import Image from "next/image"
import ArrowRight from "../../public/assets/arrow-right.svg"
import ArrowLeft from "../../public/assets/arrow-left.svg"

type ArrowButtonProps = {
  orientation: "left" | "right"
  text: string | number
  onArrowClick: () => void
  arrowDisable?: boolean
}

const ArrowButton = ({
  orientation,
  text,
  onArrowClick,
  arrowDisable,
}: ArrowButtonProps) => {
  return (
    <button
      className={`group flex items-center ${arrowDisable ? "cursor-not-allowed" : "cursor-pointer"}
        ${orientation === "right" ? "flex-row-reverse" : ""}`}
      onClick={onArrowClick}
      disabled={arrowDisable}
    >
      <Image
        src={orientation === "left" ? ArrowLeft : ArrowRight}
        alt={orientation}
        width={30}
        height={30}
        className="w-[24px] md:w-[30px]"
      />
      <p
        className={`font-semiboldt text-base md:text-lg transition-all
          ${orientation === "left" ? "ml-2 group-hover:-translate-x-2" : "mr-2 group-hover:translate-x-2"}`}
      >
        {text}
      </p>
    </button>
  )
}

export default ArrowButton
