import Link from "next/link"

type MenuItemProps = {
  text: string
  href: string
}

const MenuItem = ({ text, href }: MenuItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className="group uppercase xl:text-2xl md:text-xl text-base hover:text-red ease-in-out duration-200"
      >
        {text}
      </Link>
    </li>
  )
}

export default MenuItem
