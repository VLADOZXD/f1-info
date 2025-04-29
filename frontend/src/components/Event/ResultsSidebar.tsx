import { EventFormat } from "@/types/event"
import { Dispatch, SetStateAction } from "react"

type SectionsType = { id: "race" | "sprint" | "qualifying"; label: string }

const CONVENTIONAL_SECTIONS: SectionsType[] = [
  { id: "race", label: "Race Results" },
  { id: "qualifying", label: "Qualifying Results" },
]

const SPRINT_SECTIONS: SectionsType[] = [
  { id: "race", label: "Race Results" },
  { id: "sprint", label: "Sprint Results" },
  { id: "qualifying", label: "Qualifying Results" },
]

type ResultsSidebarProps = {
  activeSection: string
  setActiveSection: Dispatch<SetStateAction<"race" | "sprint" | "qualifying">>
  eventFormat: EventFormat
}

const ResultsSidebar = ({
  activeSection,
  setActiveSection,
  eventFormat,
}: ResultsSidebarProps) => {
  let sections = null

  if (eventFormat === "conventional") {
    sections = CONVENTIONAL_SECTIONS
  } else if (
    eventFormat === "sprint" ||
    eventFormat === "sprint_qualifying" ||
    eventFormat === "sprint_shootout"
  ) {
    sections = SPRINT_SECTIONS
  }

  return (
    <ul className="md:w-64 w-full space-y-2">
      {sections &&
        sections.map((section) => (
          <li
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full py-2 pl-3 border-l-4 font-medium cursor-pointer 
            ${
              activeSection === section.id
                ? "bg-secondary border-red"
                : "border-gray-500"
            }`}
          >
            {section.label}
          </li>
        ))}
    </ul>
  )
}

export default ResultsSidebar
