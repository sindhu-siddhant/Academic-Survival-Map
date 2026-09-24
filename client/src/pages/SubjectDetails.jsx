import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function SubjectDetails() {
  const { code } = useParams()

  const [subject, setSubject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/subjects",
        )

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to fetch subjects",
          )
        }

        const foundSubject = result.data.find(
          (item) =>
            item.code?.toUpperCase() === code?.toUpperCase(),
        )

        if (!foundSubject) {
          setError("Subject not found.")
          return
        }

        setSubject(foundSubject)
      } catch (error) {
        console.error("Failed to fetch subject:", error)
        setError("Failed to load subject.")
      } finally {
        setLoading(false)
      }
    }

    fetchSubject()
  }, [code])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0a12] text-[#f5f3ff]">
        <p className="text-xs uppercase tracking-[0.3em] text-[#9691a5]">
          Loading subject...
        </p>
      </div>
    )
  }

  if (error || !subject) {
    return (
      <div className="page-reveal min-h-screen bg-[#0b0a12] p-10 text-[#f5f3ff]">
        <h1 className="text-5xl">
          {error || "Subject not found."}
        </h1>

        <Link
          to="/subjects"
          className="mt-8 inline-block text-sm underline"
        >
          ← Back to subjects
        </Link>
      </div>
    )
  }

  const classesNeeded = Math.max(
    0,
    Math.ceil(
      (0.75 * subject.classes - subject.attended) / 0.25,
    ),
  )

  return (
    <div className="min-h-screen bg-[#0b0a12] text-[#f5f3ff]">
      {/* HEADER */}
      <section className="border-b border-white/10 p-6 md:p-10">
        <div className="mb-20 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9691a5]">
            {subject.code}
          </p>

          <Link
            to="/subjects"
            className="text-xs uppercase tracking-widest hover:opacity-50"
          >
            ← All subjects
          </Link>
        </div>

        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#9691a5]">
          Subject detail
        </p>

        <h1 className="max-w-6xl text-[13vw] font-medium leading-[0.8] tracking-[-0.07em] md:text-[9vw]">
          {subject.name}
        </h1>

        <div className="mt-12 flex flex-wrap gap-8 text-xs uppercase tracking-widest text-[#9691a5]">
          <span>{subject.faculty}</span>
          <span>{subject.credits} credits</span>
          <span>{subject.status}</span>
        </div>
      </section>

      {/* KEY NUMBERS */}
      <section className="grid grid-cols-2 border-b border-white/10 md:grid-cols-4">
        <Metric
          number={`${subject.attendance}%`}
          label="Attendance"
        />

        <Metric
          number={`${subject.marks}%`}
          label="Current marks"
        />

        <Metric
          number={subject.attended}
          label="Classes attended"
        />

        <Metric
          number={subject.classes}
          label="Total classes"
        />
      </section>

      {/* ATTENDANCE */}
      <section className="grid border-b border-white/10 md:grid-cols-2">
        <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-10">
          <p className="mb-16 text-xs uppercase tracking-[0.3em] text-[#9691a5]">
            Attendance status
          </p>

          <div className="text-[20vw] leading-none tracking-[-0.1em] md:text-[12vw]">
            {subject.attendance}%
          </div>
        </div>

        <div className="flex flex-col justify-end p-6 md:p-10">
          <div className="mb-5 flex justify-between text-xs uppercase tracking-widest">
            <span>Current</span>
            <span>Minimum 75%</span>
          </div>

          <div className="h-3 bg-[#8b5cf6]/10">
            <div
              className={`h-full ${
                subject.attendance < 75
                  ? "bg-[#9a6f5f]"
                  : "bg-[#8b5cf6]"
              }`}
              style={{
                width: `${Math.min(subject.attendance, 100)}%`,
              }}
            />
          </div>

          <p className="mt-8 max-w-md text-2xl leading-tight tracking-[-0.03em]">
            {subject.attendance >= 75
              ? "You're currently above the minimum attendance requirement."
              : `You are below the minimum requirement. You need approximately ${classesNeeded} consecutive classes to reach the 75% threshold.`}
          </p>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section className="grid border-b border-white/10 md:grid-cols-2">
        <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-10">
          <p className="mb-16 text-xs uppercase tracking-[0.3em] text-[#9691a5]">
            Performance
          </p>

          <h2 className="text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
            Your
            <br />
            current
            <br />
            standing.
          </h2>
        </div>

        <div className="flex flex-col justify-end p-6 md:p-10">
          <div className="mb-5 flex justify-between text-xs uppercase tracking-widest">
            <span>Marks</span>
            <span>{subject.marks}%</span>
          </div>

          <div className="h-3 bg-[#8b5cf6]/10">
            <div
              className="h-full bg-[#8b5cf6]"
              style={{
                width: `${subject.marks}%`,
              }}
            />
          </div>

          <p className="mt-8 text-sm leading-6 text-[#9691a5]">
            This value will eventually be calculated from your
            actual assessments, quizzes and examinations.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <section className="p-6 md:p-10">
        <Link
          to="/subjects"
          className="inline-block rounded-full bg-[#8b5cf6] px-7 py-4 text-sm text-white hover:scale-105"
        >
          ← Back to subjects
        </Link>
      </section>
    </div>
  )
}

function Metric({ number, label }) {
  return (
    <div className="border-r border-white/10 p-6 last:border-r-0 md:p-8">
      <p className="text-4xl tracking-[-0.05em] md:text-5xl">
        {number}
      </p>

      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#9691a5]">
        {label}
      </p>
    </div>
  )
}

export default SubjectDetails

