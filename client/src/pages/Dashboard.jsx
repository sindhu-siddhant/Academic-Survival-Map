import { Link } from "react-router-dom"

const subjects = [
  {
    code: "CS-301",
    name: "Data Structures",
    attendance: 82,
    status: "Stable",
  },
  {
    code: "CS-302",
    name: "Database Systems",
    attendance: 68,
    status: "Watch",
  },
  {
    code: "CS-303",
    name: "Operating Systems",
    attendance: 91,
    status: "Stable",
  },
  {
    code: "MA-301",
    name: "Engineering Mathematics",
    attendance: 61,
    status: "Critical",
  },
]

function Dashboard() {
  return (
    <div className="page-reveal min-h-screen overflow-x-hidden bg-[#0b0a12]">

      {/* HERO */}
      <section className="grid min-h-[75vh] grid-cols-1 border-b border-white/10 md:grid-cols-2">

        <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-10">

          {/* SOFT VIOLET GLOW */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#8b5cf6]/[0.07] blur-[100px]" />

          <p className="relative z-10 text-xs uppercase tracking-[0.3em] text-[#9691a5]">
            Academic Survival Map
          </p>

          <div className="relative z-10 py-16 md:py-0">

            <h1 className="max-w-3xl text-[16vw] font-medium leading-[0.78] tracking-[-0.07em] md:text-[9vw]">
              Know
              <br />
              where
              <br />
              you stand.
            </h1>

          </div>

          <div className="relative z-10 flex items-end justify-between gap-6">

            <p className="max-w-xs text-sm leading-6 text-[#B3AEC4]">
              One place to understand your attendance, subjects, workload and
              academic trajectory.
            </p>

            <span className="shrink-0 text-3xl text-[#b89aff]">
              ↘
            </span>

          </div>

        </div>

        <div className="flex flex-col justify-end p-6 md:p-10">

          <div className="mb-8 flex items-center justify-between">

            <span className="text-xs uppercase tracking-[0.3em] text-[#9691a5]">
              Current overview
            </span>

            <span className="text-xs text-[#9691a5]">
              20 / 09 / 2026
            </span>

          </div>

          <div className="border-t border-white/20 pt-6">

            <p className="text-sm text-[#9691a5]">
              Academic health
            </p>

            <div className="mt-3 flex items-end justify-between gap-4">

              <div className="flex shrink-0 items-baseline whitespace-nowrap">

                <span className="inline-block bg-gradient-to-br from-[#f4f1ff] via-[#f4f1ff] to-[#9b6cff] bg-clip-text text-[18vw] font-medium leading-[0.85] tracking-[-0.07em] text-transparent md:text-[10vw]">
                  78
                </span>

                <span className="ml-1 inline-block text-[6vw] leading-none tracking-[-0.04em] text-[#b89aff] md:text-[4vw]">
                  %
                </span>

              </div>

              <span className="mb-3 shrink-0 rounded-full bg-[#7dd3a8] px-4 py-2 text-[10px] uppercase tracking-widest text-[#0b0a12] md:text-xs">
                Good position
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 border-b border-white/10 md:grid-cols-4">

        <Stat
          number="04"
          label="Subjects"
        />

        <Stat
          number="78%"
          label="Avg. attendance"
        />

        <Stat
          number="03"
          label="Upcoming exams"
        />

        <Stat
          number="24"
          label="Credits"
        />

      </section>

      {/* SUBJECTS */}
      <section className="p-6 md:p-10">

        <div className="mb-10 flex items-end justify-between md:mb-12">

          <div>

            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#9691a5]">
              01 — Subjects
            </p>

            <h2 className="text-5xl tracking-[-0.05em] md:text-7xl">
              Your subjects.
            </h2>

          </div>

          <span className="hidden text-sm text-[#9691a5] md:block">
            04 active
          </span>

        </div>

        <div className="border-t border-white/20">

          {subjects.map((subject, index) => (
            <SubjectRow
              key={subject.code}
              subject={subject}
              index={index}
            />
          ))}

        </div>

      </section>

      {/* ATTENDANCE */}
      <section className="grid border-t border-white/10 md:grid-cols-2">

        <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-10">

          <p className="mb-14 text-xs uppercase tracking-[0.3em] text-[#9691a5] md:mb-20">
            02 — Attendance
          </p>

          <h2 className="max-w-xl text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
            Don't let
            <br />
            attendance
            <br />
            surprise you.
          </h2>

        </div>

        <div className="flex flex-col justify-end p-6 md:p-10">

          <p className="text-sm text-[#9691a5]">
            Overall attendance
          </p>

          <div className="mt-3 text-7xl tracking-[-0.08em] sm:text-8xl">
            78%
          </div>

          <div className="mt-8 h-2 w-full bg-[#8b5cf6]/10 md:mt-10">

            <div className="h-full w-[78%] bg-[#8b5cf6]" />

          </div>

          <div className="mt-4 flex justify-between gap-3 text-[10px] text-[#9691a5] sm:text-xs">

            <span>
              0%
            </span>

            <span className="text-center">
              Minimum required: 75%
            </span>

            <span>
              100%
            </span>

          </div>

        </div>

      </section>

      {/* PLANNER CTA */}
      <section className="border-t border-white/10 p-6 md:p-10">

        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#9691a5]">
          03 — Next
        </p>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end md:gap-10">

          <h2 className="max-w-4xl text-6xl tracking-[-0.06em] md:text-9xl">
            What's coming?
          </h2>

          <Link
            to="/planner"
            className="w-fit rounded-full bg-[#8b5cf6] px-7 py-4 text-sm text-white transition-transform duration-300 hover:scale-105"
          >
            Open planner ↗
          </Link>

        </div>

      </section>

    </div>
  )
}

function Stat({ number, label }) {
  return (
    <div className="border-b border-white/10 p-6 last:border-r-0 md:border-b-0 md:border-r md:p-8">

      <p className="text-4xl tracking-[-0.05em] md:text-5xl">
        {number}
      </p>

      <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[#9691a5] md:mt-8 md:text-xs">
        {label}
      </p>

    </div>
  )
}

function SubjectRow({ subject, index }) {

  const statusStyles = {
    Stable: "bg-[#8b5cf6] text-white",
    Watch: "border border-white/20 text-[#b89aff]",
    Critical: "bg-[#d9c8bc] text-[#211817]",
  }

  return (
    <div className="group grid grid-cols-[40px_1fr_auto] items-center gap-4 border-b border-white/10 py-7 md:grid-cols-[60px_1fr_180px_120px]">

      <span className="text-xs text-[#9691a5]">
        0{index + 1}
      </span>

      <div className="min-w-0">

        <p className="text-xl tracking-[-0.02em] md:text-3xl">
          {subject.name}
        </p>

        <p className="mt-1 text-xs uppercase tracking-widest text-[#9691a5]">
          {subject.code}
        </p>

      </div>

      <div className="hidden md:block">

        <div className="mb-2 flex justify-between text-xs">
          <span>
            Attendance
          </span>

          <span>
            {subject.attendance}%
          </span>
        </div>

        <div className="h-[2px] w-full bg-[#8b5cf6]/10">

          <div
            className="h-full bg-[#8b5cf6]"
            style={{
              width: `${subject.attendance}%`,
            }}
          />

        </div>

      </div>

      <span
        className={`justify-self-end rounded-full px-3 py-1 text-[10px] uppercase tracking-widest ${statusStyles[subject.status]}`}
      >
        {subject.status}
      </span>

    </div>
  )
}

export default Dashboard

