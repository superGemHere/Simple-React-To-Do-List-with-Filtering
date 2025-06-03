import { memo, useCallback } from "react"
import type { Todo } from "@/types"
import styles from "./styles.module.css"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
}

const TodoItem = memo(function TodoItem({ todo, onToggle }: TodoItemProps) {
  const handleClick = useCallback(() => {
    onToggle(todo.id)
  }, [todo.id, onToggle])

  return (
    <li className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`} onClick={handleClick}>
      <div className={styles.todoContent}>
        <div className={styles.checkbox}>{todo.completed ? "✓" : "○"}</div>
        <span className={styles.todoText}>{todo.text}</span>
      </div>
      <div className={styles.todoStatus}>{todo.completed ? "Completed" : "Active"}</div>
    </li>
  )
})

export default TodoItem