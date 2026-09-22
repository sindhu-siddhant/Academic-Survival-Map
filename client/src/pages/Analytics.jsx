import { Link } from "react-router-dom"

const performance = [
  { subject: "Data Structures", score: 78 },
  { subject: "Database Systems", score: 71 },
  { subject: "Operating Systems", score: 84 },
  { subject: "Engineering Mathematics", score: 59 },
]

const attendance = [
  { month: "JUL", value: 86 },
  { month: "AUG", value: 82 },
  { month: "SEP", value: 78 },
]

function Analytics() {
  return (
    <div className="page-reveal min-h-screen overflow-x-hidden bg-[#0b0a12] text-[#f5f3ff]">

      {/* HEADER */}
      <section className="border-b border-white/10 p-6 md:p-10">

        <div className="mb-16 flex items-center justify-between md:mb-20">

          <p className="text-xs uppercase tracking-[0.3em] text-[#9691a5]">
            04 — Analytics
          </p>

          <Link
            to="/"
            className="text-xs uppercase tracking-widest transition-opacity duration-300 hover:opacity-50"
          >
            ← Dashboard
          </Link>

        </div>

        <h1 className="max-w-5xl text-[17vw] font-medium leading-[0.82] tracking-[-0.07em] md:text-[10vw]">
          See the
          <br />
          bigger
          <br />
          picture.
        </h1>

        <p className="mt-10 max-w-md text-sm leading-6 text-[#B3AEC4] md:mt-12">
          Understand how your academic performance is changing
          instead of looking at isolated numbers.
        </p>

      </section>

      {/* OVERVIEW */}
      <section className="grid border-b border-white/10 md:grid-cols-3">

        <Metric
          number="78%"
          label="Academic health"
        />

        <Metric
          number="73%"
          label="Average marks"
        />

        <Metric
          number="78%"
          label="Attendance"
        />

      </section>

      {/* PERFORMANCE */}
      <section className="grid border-b border-white/10 md:grid-cols-2">

        <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-10">

          <p className="mb-12 text-xs uppercase tracking-[0.3em] text-[#9691a5] md:mb-16">
            Performance
          </p>

          <h2 className="text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
            How are
            <br />
            you doing?
          </h2>

        </div>

        <div className="p-6 md:p-10">

          <div className="mb-8 flex items-center justify-between border-b border-white/20 pb-4 text-xs uppercase tracking-widest text-[#9691a5]">

            <span>
              Subject
            </span>

            <span>
              Marks
            </span>

          </div>

          <div className="space-y-8">

            {performance.map((item) => (
              <div key={item.subject}>

                <div className="mb-3 flex items-start justify-between gap-4">

                  <span className="max-w-[75%] text-sm leading-5">
                    {item.subject}
                  </span>

                  <span className="shrink-0 text-sm">
                    {item.score}%
                  </span>

                </div>

                <div className="h-[3px] bg-[#8b5cf6]/10">

                  <div
                    className="h-full bg-[#8b5cf6]"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ATTENDANCE TREND */}
      <section className="p-6 md:p-10">

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-12">

          <div>

            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#9691a5]">
              Attendance trend
            </p>

            <h2 className="text-5xl tracking-[-0.05em] md:text-7xl">
              You're trending.
            </h2>

          </div>

          <span className="text-xs text-[#9691a5]">
            LAST 3 MONTHS
          </span>

        </div>

        {/* GRAPH */}
        <div className="relative border-l border-b border-white/20">

          <div className="flex h-[280px] items-end justify-around gap-3 px-4 sm:h-[350px] sm:gap-4 sm:px-6 md:px-20">

            {attendance.map((item) => (
              <div
                key={item.month}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
              >

                <span className="mb-3 text-sm">
                  {item.value}%
                </span>

                <div
                  className="w-full max-w-32 bg-[#8b5cf6] transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${item.value * 3}px`,
                    maxHeight: "75%",
                  }}
                />

                <span className="mt-4 text-xs uppercase tracking-widest text-[#9691a5]">
                  {item.month}
                </span>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* INSIGHT */}
      <section className="grid border-t border-white/10 md:grid-cols-2">

        <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-10">

          <p className="mb-12 text-xs uppercase tracking-[0.3em] text-[#9691a5] md:mb-16">
            Academic insight
          </p>

          <span className="inline-block rounded-full bg-[#d9c8bc] px-4 py-2 text-xs uppercase tracking-widest text-[#211817]">
            Attention needed
          </span>

        </div>

        <div className="p-6 md:p-10">

          <p className="max-w-xl text-3xl leading-tight tracking-[-0.04em] md:text-5xl">
            Engineering Mathematics is currently your weakest
            subject. Improving attendance and marks here could
            have the largest effect on your overall standing.
          </p>

        </div>

      </section>

    </div>
  )
}

function Metric({ number, label }) {
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

export default Analytics
