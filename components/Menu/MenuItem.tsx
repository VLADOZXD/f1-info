type MenuItemProps = {
  text: string
}

const MenuItem = ({ text }: MenuItemProps) => {
  return (
    <li>
      <a
        href="#"
        className="group uppercase xl:text-2xl md:text-xl text-base hover:text-red ease-in-out duration-200"
      >
        {text}
      </a>
    </li>
  )
}

export default MenuItem
