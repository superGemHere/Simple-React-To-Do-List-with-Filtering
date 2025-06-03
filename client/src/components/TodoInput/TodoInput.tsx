
import type React from "react"
import { useState, useCallback } from "react"
import styles from "./styles.module.css"

interface TodoInputProps {
  onAddTodo: (text: string) => void
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (inputValue.trim()) {
        onAddTodo(inputValue)
        setInputValue("")
      }
    },
    [inputValue, onAddTodo],
  )

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  return (
    <form onSubmit={handleSubmit} className={styles.todoInput}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new todo..."
        className={styles.input}
      />
      <button type="submit" disabled={!inputValue.trim()} className={styles.addButton}>
        Add Todo
      </button>
    </form>
  )
}
