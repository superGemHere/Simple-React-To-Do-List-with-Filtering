import { memo } from "react"
import TodoItem from "@/components/TodoItem/TodoItem"
import type { Todo } from "@/types"
import styles from "./styles.module.css"

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: string) => void
}

const TodoList = memo(function TodoList({ todos, onToggleTodo }: TodoListProps) {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggleTodo} />
      ))}
    </ul>
  )
})

export default TodoList