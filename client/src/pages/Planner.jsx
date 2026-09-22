import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const defaultTasks = [
  {
    id: 1,
    date: "22",
    month: "SEP",
    title: "Data Structures — Mid Term",
    type: "EXAM",
    priority: "HIGH",
  },
  {
    id: 2,
    date: "25",
    month: "SEP",
    title: "Database Systems Assignment",
    type: "DEADLINE",
    priority: "MEDIUM",
  },
  {
    id: 3,
    date: "29",
    month: "SEP",
    title: "Operating Systems — Quiz",
    type: "QUIZ",
    priority: "MEDIUM",
  },
  {
    id: 4,
    date: "03",
    month: "OCT",
    title: "Engineering Mathematics — Mid Term",
    type: "EXAM",
    priority: "HIGH",
  },
]

function Planner() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("asm_tasks")
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks
  })

  const [editingTask, setEditingTask] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    date: "",
    month: "SEP",
    title: "",
    type: "DEADLINE",
    priority: "MEDIUM",
  })

  useEffect(() => {
    localStorage.setItem("asm_tasks", JSON.stringify(tasks))
  }, [tasks])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function startEditing(task) {
    setEditingTask(task)

    setForm({
      date: task.date,
      month: task.month,
      title: task.title,
      type: task.type,
      priority: task.priority,
    })

    setShowForm(true)
  }

  function addTask(event) {
    event.preventDefault()

    if (!form.title.trim() || !form.date.trim()) {
      return
    }

    if (editingTask) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...form,
                title: form.title.trim(),
                date: form.date.trim(),
              }
            : task
        )
      )

      setEditingTask(null)
    } else {
      const newTask = {
        ...form,
        id: Date.now(),
        title: form.title.trim(),
        date: form.date.trim(),
      }

      setTasks((current) => [...current, newTask])
    }

    setForm({
      date: "",
      month: "SEP",
      title: "",
      type: "DEADLINE",
      priority: "MEDIUM",
    })

    setShowForm(false)
  }

  function deleteTask(id) {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    )
  }

  function resetForm() {
    setEditingTask(null)
    setShowForm(false)

    setForm({
      date: "",
      month: "SEP",
      title: "",
      type: "DEADLINE",
      priority: "MEDIUM",
    })
  }

  return (
    <div className="page-reveal min-h-screen overflow-x-hidden bg-[#0b0a12] text-[#f5f3ff]">

      {/* HEADER */}
      <section className="border-b border-white/10 p-6 md:p-10">

        <div className="mb-16 flex items-center justify-between md:mb-20">

          <p className="text-xs uppercase tracking-[0.3em] text-[#9691a5]">
            03 — Planner
          </p>

          <Link
            to="/"
            className="text-xs uppercase tracking-widest transition-opacity duration-300 hover:opacity-50"
          >
            ← Dashboard
          </Link>

        </div>

        <h1 className="max-w-5xl text-[17vw] font-medium leading-[0.82] tracking-[-0.07em] md:text-[10vw]">
          What's
          <br />
          coming?
        </h1>

        <p className="mt-10 max-w-md text-sm leading-6 text-[#B3AEC4] md:mt-12">
          Keep track of exams, assignments, quizzes and everything that can
          affect your semester.
        </p>

      </section>

      {/* UPCOMING */}
      <section className="p-6 md:p-10">

        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#9691a5]">
              Upcoming
            </p>

            <h2 className="text-4xl tracking-[-0.05em] md:text-6xl">
              Your timeline.
            </h2>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">

            <span className="text-xs text-[#9691a5]">
              {String(tasks.length).padStart(2, "0")} EVENTS
            </span>

            <button
              type="button"
              onClick={() => {
                setEditingTask(null)

                setForm({
                  date: "",
                  month: "SEP",
                  title: "",
                  type: "DEADLINE",
                  priority: "MEDIUM",
                })

                setShowForm(!showForm)
              }}
              className="rounded-full bg-[#8b5cf6] px-5 py-3 text-xs uppercase tracking-widest text-white transition-transform duration-300 hover:scale-105"
            >
              {showForm ? "Close" : "+ Add event"}
            </button>

          </div>

        </div>

        {/* ADD / EDIT EVENT FORM */}
        {showForm && (
          <div className="mb-10">

            <form
              onSubmit={addTask}
              className="border border-white/10 bg-[#100e18] p-5 md:p-8"
            >

              <div className="grid gap-5 md:grid-cols-2">

                {/* DATE */}
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-widest text-[#9691a5]">
                    Date
                  </label>

                  <input
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    placeholder="22"
                    className="w-full border border-white/10 bg-transparent px-4 py-3 text-base outline-none transition-colors duration-300 focus:border-[#8b5cf6] md:text-sm"
                  />
                </div>

                {/* MONTH */}
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-widest text-[#9691a5]">
                    Month
                  </label>

                  <select
                    name="month"
                    value={form.month}
                    onChange={handleChange}
                    className="w-full border border-white/10 bg-[#100e18] px-4 py-3 text-base outline-none md:text-sm"
                  >
                    {[
                      "JAN",
                      "FEB",
                      "MAR",
                      "APR",
                      "MAY",
                      "JUN",
                      "JUL",
                      "AUG",
                      "SEP",
                      "OCT",
                      "NOV",
                      "DEC",
                    ].map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TITLE */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[10px] uppercase tracking-widest text-[#9691a5]">
                    Title
                  </label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Data Structures — Mid Term"
                    className="w-full border border-white/10 bg-transparent px-4 py-3 text-base outline-none transition-colors duration-300 focus:border-[#8b5cf6] md:text-sm"
                  />
                </div>

                {/* TYPE */}
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-widest text-[#9691a5]">
                    Type
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border border-white/10 bg-[#100e18] px-4 py-3 text-base outline-none md:text-sm"
                  >
                    <option value="EXAM">EXAM</option>
                    <option value="DEADLINE">DEADLINE</option>
                    <option value="QUIZ">QUIZ</option>
                  </select>
                </div>

                {/* PRIORITY */}
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-widest text-[#9691a5]">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full border border-white/10 bg-[#100e18] px-4 py-3 text-base outline-none md:text-sm"
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                  </select>
                </div>

              </div>

              {/* FORM BUTTONS */}
              <div className="mt-8 flex flex-wrap gap-3">

                <button
                  type="submit"
                  className="rounded-full bg-[#7ddbad] px-6 py-3 text-xs uppercase tracking-widest text-[#0b0a12] transition-transform duration-300 hover:scale-105"
                >
                  {editingTask ? "Update Event" : "Add to timeline"}
                </button>

                {editingTask && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-widest transition-colors duration-300 hover:bg-white hover:text-black"
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>

          </div>
        )}

        {/* TIMELINE EVENTS */}
        <div className="border-t border-white/10">

          {[...tasks]
            .sort((a, b) => {
              const months = {
                JAN: 1,
                FEB: 2,
                MAR: 3,
                APR: 4,
                MAY: 5,
                JUN: 6,
                JUL: 7,
                AUG: 8,
                SEP: 9,
                OCT: 10,
                NOV: 11,
                DEC: 12,
              }

              const dateA =
                months[a.month] * 100 + Number(a.date)

              const dateB =
                months[b.month] * 100 + Number(b.date)

              return dateA - dateB
            })
            .map((task, index) => (
              <TaskRow
                key={task.id}
                task={task}
                index={index}
                onDelete={deleteTask}
                onEdit={startEditing}
              />
            ))}

        </div>

      </section>

      {/* WEEK VIEW */}
      <section className="grid border-t border-white/10 md:grid-cols-2">

        <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-10">

          <p className="mb-12 text-xs uppercase tracking-[0.3em] text-[#9691a5] md:mb-16">
            This week
          </p>

          <h2 className="text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
            Stay
            <br />
            ahead.
          </h2>

        </div>

        <div className="p-6 md:p-10">

          <div className="grid grid-cols-7 border-l border-t border-white/10">

            {["M", "T", "W", "T", "F", "S", "S"].map(
              (day, index) => (
                <div
                  key={index}
                  className="min-h-24 border-b border-r border-white/10 p-2 sm:min-h-32 sm:p-3"
                >

                  <span className="text-[10px] text-[#9691a5] sm:text-xs">
                    {day}
                  </span>

                  {(index === 1 || index === 4) && (
                    <div className="mt-6 h-2 w-2 rounded-full bg-[#8b5cf6] sm:mt-8" />
                  )}

                </div>
              )
            )}

          </div>

          <p className="mt-6 text-xs leading-5 text-[#9691a5]">
            Events will automatically appear here once your academic data is
            connected.
          </p>

        </div>

      </section>

    </div>
  )
}

function TaskRow({ task, index, onDelete, onEdit }) {

  const priorityStyle = {
    HIGH: "bg-[#8b5cf6] text-white",
    MEDIUM: "border border-white/20 text-[#b89aff]",
  }

  return (
    <div className="group grid grid-cols-[56px_1fr] gap-x-4 gap-y-5 border-b border-white/10 py-7 md:grid-cols-[80px_1fr_140px_180px] md:items-center md:gap-5">

      {/* DATE */}
      <div>
        <p className="text-3xl tracking-[-0.05em]">
          {task.date}
        </p>

        <p className="text-[10px] uppercase tracking-widest text-[#9691a5]">
          {task.month}
        </p>
      </div>

      {/* TITLE */}
      <div className="min-w-0">

        <p className="text-lg leading-tight md:text-2xl">
          {task.title}
        </p>

        <p className="mt-2 text-[10px] uppercase tracking-widest text-[#9691a5]">
          {task.type}
        </p>

      </div>

      {/* PRIORITY */}
      <span
        className={`w-fit rounded-full px-3 py-1 text-[10px] uppercase tracking-widest ${priorityStyle[task.priority]}`}
      >
        {task.priority}
      </span>

      {/* ACTIONS */}
      <div className="col-span-2 flex items-center justify-between gap-3 md:col-span-1 md:justify-end">

        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-widest transition-colors duration-300 hover:bg-white hover:text-black"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-full px-4 py-2 text-[10px] uppercase tracking-widest text-[#b3aec4] opacity-100 transition-all duration-300 hover:text-[#e8b4a8] md:opacity-0 md:group-hover:opacity-100"
          title="Delete event"
        >
          Delete
        </button>

      </div>

    </div>
  )
}

export default Planner

