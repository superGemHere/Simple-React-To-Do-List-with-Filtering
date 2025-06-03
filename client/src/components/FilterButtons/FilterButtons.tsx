import { memo, useCallback } from "react"
import type { FilterType } from "@/types"
import styles from "./styles.module.css"

interface FilterButtonsProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const FilterButtons = memo(function FilterButtons({ currentFilter, onFilterChange }: FilterButtonsProps) {
  const handleFilterClick = useCallback(
    (filter: FilterType) => {
      onFilterChange(filter)
    },
    [onFilterChange],
  )

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ]

  return (
    <div className={styles.filterButtons}>
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => handleFilterClick(key)}
          className={`${styles.filterButton} ${currentFilter === key ? styles.active : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
})

export default FilterButtons
