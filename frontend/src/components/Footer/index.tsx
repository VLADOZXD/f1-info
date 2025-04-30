const Footer = () => {
  return (
    <footer className="w-full bg-secondary py-6 font-oxanium">
      <div className="container mx-auto space-y-4">
        <p className="text-center font-medium uppercase text-sm">
          Data provided by{" "}
          <a
            className="text-red line underline"
            href="https://github.com/theOehrly/Fast-F1"
          >
            FastF1
          </a>
        </p>
        <p className="text-center text-xs">
          This project/website is unofficial and is not associated in any way
          with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA
          ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks
          of Formula One Licensing B.V
        </p>
      </div>
    </footer>
  )
}

export default Footer
