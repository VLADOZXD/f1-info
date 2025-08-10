import Image from "next/image"
import Container from "../shared/Container"
import MenuItem from "./MenuItem"
import Logo from "../../../public/assets/logo.svg"

const MENU_ITEMS = [
  { text: "schedule", href: "/" },
  { text: "standing", href: "/standings" },
]

const Menu = () => {
  return (
    <Container>
      <div className="flex items-center">
        <Image
          src={Logo}
          alt="logo"
          className="md:mr-14 mr-10 ml-4 md:w-12 w-10 aspect-auto"
        />
        <ul className="flex flex-row xl:gap-12 md:gap-10 gap-6">
          {MENU_ITEMS.map((item) => (
            <MenuItem href={item.href} text={item.text} key={item.text} />
          ))}
        </ul>
      </div>
    </Container>
  )
}

export default Menu
