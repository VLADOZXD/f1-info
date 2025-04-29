import Container from "../shared/Container"
import MenuItem from "./MenuItem"

const MENU_ITEMS = [
  { text: "schedule", href: "/" },
  { text: "standing", href: "/standings" },
]

const Menu = () => {
  return (
    <Container>
      <div className="flex items-center">
        <div className="md:text-3xl text-xl line-clamp-2 xl:mr-24 lg:mr-20 md:mr-16 mr-10">
          F1 info
        </div>
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
