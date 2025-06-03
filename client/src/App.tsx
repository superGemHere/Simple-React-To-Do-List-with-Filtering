"use client"

import { useState, useCallback, useMemo } from "react"
import TodoInput from "@/components/TodoInput/TodoInput"
import TodoList from "@/components/TodoList/TodoList"
import FilterButtons from "@/components/FilterButtons/FilterButtons"
import type { Todo, FilterType } from "@/types"
import styles from "./App.module.css"

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>("all")

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    }
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }, [])

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed)
      case "completed":
        return todos.filter((todo) => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const todoStats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((todo) => todo.completed).length
    const active = total - completed
    return { total, completed, active }
  }, [todos])

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>To-Do App</h1>

        <TodoInput onAddTodo={addTodo} />

        <div className={styles.stats}>
          <span>Total: {todoStats.total}</span>
          <span>Active: {todoStats.active}</span>
          <span>Completed: {todoStats.completed}</span>
        </div>

        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

        <TodoList todos={filteredTodos} onToggleTodo={toggleTodo} />

        {todos.length === 0 && <p className={styles.emptyState}>No todos yet. Add one above!</p>}

        {todos.length > 0 && filteredTodos.length === 0 && (
          <p className={styles.emptyState}>No {filter} todos found.</p>
        )}
      </div>
    </div>
  )
}
