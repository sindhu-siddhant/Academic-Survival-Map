import { Link } from "react-router-dom"

const subjects = [
  {
    code: "CS-301",
    name: "Data Structures",
    faculty: "Dr. A. Sharma",
    attendance: 82,
    marks: 78,
    credits: 4,
    classes: 42,
    attended: 34,
    status: "Stable",
  },
  {
    code: "CS-302",
    name: "Database Systems",
    faculty: "Prof. R. Mehta",
    attendance: 68,
    marks: 71,
    credits: 4,
    classes: 38,
    attended: 26,
    status: "Watch",
  },
  {
    code: "CS-303",
    name: "Operating Systems",
    faculty: "Dr. P. Kumar",
    attendance: 91,
    marks: 84,
    credits: 4,
    classes: 45,
    attended: 41,
    status: "Stable",
  },
  {
    code: "MA-301",
    name: "Engineering Mathematics",
    faculty: "Dr. S. Gupta",
    attendance: 61,
    marks: 59,
    credits: 4,
    classes: 41,
    attended: 25,
    status: "Critical",
  },
]

function Subjects() {
  return (
    <div className="page-reveal min-h-screen overflow-x-hidden bg-[#0b0a12] text-[#f5f3ff]">

      {/* HEADER */}
      <section className="border-b border-white/10 p-6 md:p-10">

        <div className="mb-16 flex items-center justify-between md:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9691a5]">
            01 — Subjects
          </p>

          <Link
            to="/"
            className="text-xs uppercase tracking-widest transition-opacity duration-300 hover:opacity-50"
          >
            ← Dashboard
          </Link>
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
            A complete view of your academic performance,
            attendance and current standing.
          </p>

          <span className="shrink-0 text-xs uppercase tracking-widest">
            {subjects.length} active
          </span>

        </div>

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
              key={subject.code}
              subject={subject}
              index={index}
            />
          ))}

        </div>

      </section>

      {/* SUMMARY */}
      <section className="grid border-t border-white/10 md:grid-cols-3">

        <Summary
          number="78%"
          label="Average attendance"
        />

        <Summary
          number="73%"
          label="Average marks"
        />

        <Summary
          number="16"
          label="Total credits"
        />

      </section>

    </div>
  )
}

function SubjectCard({ subject, index }) {

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
          0{index + 1}
        </span>

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">

            <h3 className="text-3xl leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl">
              {subject.name}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest ${statusStyles[subject.status]}`}
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

        {/* ACTION */}
        <div className="flex items-end justify-start md:justify-end">

          <Link
            to={`/subjects/${subject.code}`}
            className="w-full rounded-full border border-white/20 px-5 py-3 text-center text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#8b5cf6] hover:text-white md:w-auto"
          >
            View details ↗
          </Link>

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

