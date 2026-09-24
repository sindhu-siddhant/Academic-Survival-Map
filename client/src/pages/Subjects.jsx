import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Subjects() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)
  const [savingEdit, setSavingEdit] = useState(false)

  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    faculty: "",
    attendance: "",
    marks: "",
    credits: "",
    classes: "",
    attended: "",
    status: "Stable",
  })

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/subjects")
        const result = await response.json()

        if (result.success) {
          setSubjects(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch subjects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubjects()
  }, [])

  const handleInputChange = (field, value) => {
    setNewSubject((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const handleEditInputChange = (field, value) => {
    setEditingSubject((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const handleAddSubject = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSubject.name,
          code: newSubject.code,
          faculty: newSubject.faculty,
          attendance: Number(newSubject.attendance),
          marks: Number(newSubject.marks),
          credits: Number(newSubject.credits),
          classes: Number(newSubject.classes),
          attended: Number(newSubject.attended),
          status: newSubject.status,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add subject")
      }

      setSubjects((previousSubjects) => [
        ...previousSubjects,
        result.data,
      ])

      setNewSubject({
        name: "",
        code: "",
        faculty: "",
        attendance: "",
        marks: "",
        credits: "",
        classes: "",
        attended: "",
        status: "Stable",
      })

      setShowAddForm(false)
    } catch (error) {
      console.error("Failed to add subject:", error)
    }
  }

  // START EDITING
  const handleStartEdit = (subject) => {
    setShowAddForm(false)

    setEditingSubject({
      _id: subject._id,
      name: subject.name ?? "",
      code: subject.code ?? "",
      faculty: subject.faculty ?? "",
      attendance: subject.attendance ?? "",
      marks: subject.marks ?? "",
      credits: subject.credits ?? "",
      classes: subject.classes ?? "",
      attended: subject.attended ?? "",
      status: subject.status ?? "Stable",
    })

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // UPDATE SUBJECT
  const handleUpdateSubject = async () => {
    if (!editingSubject) return

    try {
      setSavingEdit(true)

      const response = await fetch(
        `http://localhost:5000/api/subjects/${editingSubject._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingSubject.name,
            code: editingSubject.code,
            faculty: editingSubject.faculty,
            attendance: Number(editingSubject.attendance),
            marks: Number(editingSubject.marks),
            credits: Number(editingSubject.credits),
            classes: Number(editingSubject.classes),
            attended: Number(editingSubject.attended),
            status: editingSubject.status,
          }),
        },
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update subject")
      }

      setSubjects((previousSubjects) =>
        previousSubjects.map((subject) =>
          subject._id === result.data._id
            ? result.data
            : subject,
        ),
      )

      setEditingSubject(null)
    } catch (error) {
      console.error("Failed to update subject:", error)
    } finally {
      setSavingEdit(false)
    }
  }

  // DELETE SUBJECT
  const handleDeleteSubject = async (subject) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${subject.name}"?`,
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `http://localhost:5000/api/subjects/${subject._id}`,
        {
          method: "DELETE",
        },
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete subject")
      }

      setSubjects((previousSubjects) =>
        previousSubjects.filter(
          (item) => item._id !== subject._id,
        ),
      )

      if (editingSubject?._id === subject._id) {
        setEditingSubject(null)
      }
    } catch (error) {
      console.error("Failed to delete subject:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0a12] text-[#f5f3ff]">
        <p className="text-xs uppercase tracking-[0.3em] text-[#9691a5]">
          Loading subjects...
        </p>
      </div>
    )
  }

  return (
    <div className="page-reveal min-h-screen overflow-x-hidden bg-[#0b0a12] text-[#f5f3ff]">
      {/* HEADER */}
      <section className="border-b border-white/10 p-6 md:p-10">
        <div className="mb-16 flex items-center justify-between gap-4 md:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9691a5]">
            01 — Subjects
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingSubject(null)
                setShowAddForm(true)
              }}
              className="rounded-full border border-white/20 px-5 py-3 text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#8b5cf6] hover:text-white"
            >
              + Add Subject
            </button>

            <Link
              to="/"
              className="text-xs uppercase tracking-widest transition-opacity duration-300 hover:opacity-50"
            >
              ← Dashboard
            </Link>
          </div>
        </div>

        <h1 className="max-w-5xl text-[17vw] font-medium leading-[0.82] tracking-[-0.07em] md:text-[10vw]">
          Know
          <br />
          your
          <br />
          subjects.
        </h1>

        <div className="mt-10 flex max-w-xl flex-col gap-6 text-sm leading-6 text-[#B3AEC4] sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:mt-12">
          <p className="max-w-md">
            A complete view of your academic performance, attendance and
            current standing.
          </p>

          <span className="shrink-0 text-xs uppercase tracking-widest">
            {subjects.length} active
          </span>
        </div>

        {/* ADD SUBJECT FORM */}
        {showAddForm && (
          <div className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#9691a5]">
                  New subject
                </p>

                <h2 className="mt-2 text-3xl tracking-[-0.04em]">
                  Add a subject.
                </h2>
              </div>

              <button
                onClick={() => setShowAddForm(false)}
                className="text-xs uppercase tracking-widest text-[#9691a5] transition-opacity hover:opacity-50"
              >
                Close
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Subject name"
                value={newSubject.name}
                onChange={(e) =>
                  handleInputChange("name", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="text"
                placeholder="Subject code"
                value={newSubject.code}
                onChange={(e) =>
                  handleInputChange("code", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="text"
                placeholder="Faculty"
                value={newSubject.faculty}
                onChange={(e) =>
                  handleInputChange("faculty", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="number"
                placeholder="Credits"
                value={newSubject.credits}
                onChange={(e) =>
                  handleInputChange("credits", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="number"
                placeholder="Attendance %"
                value={newSubject.attendance}
                onChange={(e) =>
                  handleInputChange("attendance", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="number"
                placeholder="Marks %"
                value={newSubject.marks}
                onChange={(e) =>
                  handleInputChange("marks", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="number"
                placeholder="Total classes"
                value={newSubject.classes}
                onChange={(e) =>
                  handleInputChange("classes", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="number"
                placeholder="Classes attended"
                value={newSubject.attended}
                onChange={(e) =>
                  handleInputChange("attended", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <select
                value={newSubject.status}
                onChange={(e) =>
                  handleInputChange("status", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-[#0b0a12] px-4 py-4 text-sm outline-none focus:border-[#8b5cf6] md:col-span-2"
              >
                <option value="Stable">Stable</option>
                <option value="Watch">Watch</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <button
              onClick={handleAddSubject}
              className="mt-6 w-full rounded-full bg-[#8b5cf6] px-6 py-4 text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-80"
            >
              Add Subject
            </button>
          </div>
        )}

        {/* EDIT SUBJECT FORM */}
        {editingSubject && (
          <div className="mt-10 max-w-3xl rounded-2xl border border-[#8b5cf6]/30 bg-white/[0.03] p-6 md:p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#9691a5]">
                  Edit subject
                </p>

                <h2 className="mt-2 text-3xl tracking-[-0.04em]">
                  Update the subject.
                </h2>
              </div>

              <button
                onClick={() => setEditingSubject(null)}
                className="text-xs uppercase tracking-widest text-[#9691a5] transition-opacity hover:opacity-50"
              >
                Close
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Subject name"
                value={editingSubject.name}
                onChange={(e) =>
                  handleEditInputChange("name", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="text"
                placeholder="Subject code"
                value={editingSubject.code}
                onChange={(e) =>
                  handleEditInputChange("code", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="text"
                placeholder="Faculty"
                value={editingSubject.faculty}
                onChange={(e) =>
                  handleEditInputChange("faculty", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="number"
                placeholder="Credits"
                value={editingSubject.credits}
                onChange={(e) =>
                  handleEditInputChange("credits", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="number"
                placeholder="Attendance %"
                value={editingSubject.attendance}
                onChange={(e) =>
                  handleEditInputChange("attendance", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="number"
                placeholder="Marks %"
                value={editingSubject.marks}
                onChange={(e) =>
                  handleEditInputChange("marks", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="number"
                placeholder="Total classes"
                value={editingSubject.classes}
                onChange={(e) =>
                  handleEditInputChange("classes", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <input
                type="number"
                placeholder="Classes attended"
                value={editingSubject.attended}
                onChange={(e) =>
                  handleEditInputChange("attended", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none placeholder:text-[#9691a5] focus:border-[#8b5cf6]"
              />

              <select
                value={editingSubject.status}
                onChange={(e) =>
                  handleEditInputChange("status", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-[#0b0a12] px-4 py-4 text-sm outline-none focus:border-[#8b5cf6] md:col-span-2"
              >
                <option value="Stable">Stable</option>
                <option value="Watch">Watch</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setEditingSubject(null)}
                className="w-full rounded-full border border-white/20 px-6 py-4 text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateSubject}
                disabled={savingEdit}
                className="w-full rounded-full bg-[#8b5cf6] px-6 py-4 text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingEdit ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* SUBJECT LIST */}
      <section className="p-6 md:p-10">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#9691a5]">
            Current semester
          </p>

          <h2 className="text-4xl tracking-[-0.05em] md:text-6xl">
            Academic overview.
          </h2>
        </div>

        <div className="border-t border-white/20">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
              index={index}
              onEdit={handleStartEdit}
              onDelete={handleDeleteSubject}
            />
          ))}
        </div>
      </section>

      {/* SUMMARY */}
      <section className="grid border-t border-white/10 md:grid-cols-3">
        <Summary
          number={
            subjects.length > 0
              ? `${Math.round(
                  subjects.reduce(
                    (total, subject) => total + subject.attendance,
                    0,
                  ) / subjects.length,
                )}%`
              : "0%"
          }
          label="Average attendance"
        />

        <Summary
          number={
            subjects.length > 0
              ? `${Math.round(
                  subjects.reduce(
                    (total, subject) => total + subject.marks,
                    0,
                  ) / subjects.length,
                )}%`
              : "0%"
          }
          label="Average marks"
        />

        <Summary
          number={subjects.reduce(
            (total, subject) => total + subject.credits,
            0,
          )}
          label="Total credits"
        />
      </section>
    </div>
  )
}

function SubjectCard({
  subject,
  index,
  onEdit,
  onDelete,
}) {
  const statusStyles = {
    Stable: "bg-[#7dd3a8] text-[#0b0a12]",
    Watch: "border border-white/20",
    Critical: "bg-[#d9c8bc] text-[#211817]",
  }

  return (
    <div className="border-b border-white/10 py-8 md:py-10">
      {/* TOP ROW */}
      <div className="grid gap-6 md:grid-cols-[60px_1fr_auto] md:items-start">
        <span className="text-xs text-[#9691a5]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <h3 className="text-3xl leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl">
              {subject.name}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest ${
                statusStyles[subject.status]
              }`}
            >
              {subject.status}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-widest text-[#9691a5]">
            <span>{subject.code}</span>
            <span>{subject.faculty}</span>
            <span>{subject.credits} credits</span>
          </div>
        </div>

        <span className="text-5xl tracking-[-0.06em] sm:text-6xl md:text-7xl">
          {subject.attendance}%
        </span>
      </div>

      {/* DETAILS */}
      <div className="mt-8 grid gap-8 border-t border-white/10 pt-8 md:mt-10 md:grid-cols-3">
        {/* ATTENDANCE */}
        <div>
          <div className="mb-3 flex justify-between text-xs">
            <span className="uppercase tracking-widest text-[#9691a5]">
              Attendance
            </span>

            <span>
              {subject.attended}/{subject.classes}
            </span>
          </div>

          <div className="h-[3px] bg-[#8b5cf6]/10">
            <div
              className={`h-full ${
                subject.attendance < 75
                  ? "bg-[#9a6f5f]"
                  : "bg-[#8b5cf6]"
              }`}
              style={{ width: `${subject.attendance}%` }}
            />
          </div>
        </div>

        {/* MARKS */}
        <div>
          <div className="mb-3 flex justify-between text-xs">
            <span className="uppercase tracking-widest text-[#9691a5]">
              Performance
            </span>

            <span>{subject.marks}%</span>
          </div>

          <div className="h-[3px] bg-[#8b5cf6]/10">
            <div
              className="h-full bg-[#8b5cf6]"
              style={{ width: `${subject.marks}%` }}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap items-end justify-start gap-2 md:justify-end">
          <Link
            to={`/subjects/${subject.code}`}
            className="rounded-full border border-white/20 px-5 py-3 text-center text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#8b5cf6] hover:text-white"
          >
            View details ↗
          </Link>

          <button
            onClick={() => onEdit(subject)}
            className="rounded-full border border-white/20 px-5 py-3 text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-[#0b0a12]"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(subject)}
            className="rounded-full border border-[#9a6f5f]/40 px-5 py-3 text-xs uppercase tracking-widest text-[#c49a88] transition-all duration-300 hover:bg-[#9a6f5f] hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

function Summary({ number, label }) {
  return (
    <div className="border-b border-white/10 p-8 last:border-b-0 md:border-b-0 md:border-r md:p-10 md:last:border-r-0">
      <p className="text-5xl tracking-[-0.06em] md:text-7xl">
        {number}
      </p>

      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#9691a5] md:mt-10">
        {label}
      </p>
    </div>
  )
}

export default Subjects

