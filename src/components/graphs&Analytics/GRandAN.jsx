import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

// Custom tooltip with subtle warm neon glow
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        background: "rgba(185,28,28,0.95)", // deep warm red
        color: "#fff7ed", // soft warm cream
        padding: "10px 14px",
        borderRadius: 8,
        boxShadow: "0 0 12px rgba(251,146,60,0.6)", // orange glow
        fontSize: 14,
        minWidth: 120,
      }}
    >
      {label && (
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      )}
      {payload.map((entry, idx) => (
        <div key={idx}>
          {entry.name ? `${entry.name}: ${entry.value}` : entry.value}
        </div>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const teamsData = [
    { year: "2016", teams: 120 },
    { year: "2018", teams: 200 },
    { year: "2020", teams: 450 },
    { year: "2022", teams: 580 },
    { year: "2022-23", teams: 640 },
    { year: "2023-24", teams: 820 },
  ];

  const participantsData = [
    { year: "2016", participants: 400 },
    { year: "2018", participants: 800 },
    { year: "2020", participants: 1600 },
    { year: "2022", participants: 1900 },
    { year: "2022-23", participants: 2500 },
    { year: "2023-24", participants: 3300 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-6 bg-gradient-to-b from-stone-900 via-stone-950 to-black">
      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-400 tracking-wide uppercase drop-shadow-[0_0_14px_rgba(251,146,60,0.95)]">
          🎪 Graphs & Analytics 🎟
        </h1>
        <p className="text-stone-400 mt-2">A glance at our journey over the years</p>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl relative z-10">
        {/* Teams Graph */}
        <div className="bg-gradient-to-br from-red-950/40 to-amber-900/20 border border-red-500/40 rounded-2xl shadow-[0_0_20px_rgba(248,113,113,0.25)] p-5 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(251,146,60,0.35)] transition">
          <h2 className="text-center text-orange-300 text-lg font-semibold mb-3">
            🎠 Total Number of Teams
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={teamsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fb923c33" />
              <XAxis dataKey="year" stroke="#fdba74" />
              <YAxis stroke="#fdba74" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#fdba74" }} />
              <Line
                type="monotone"
                dataKey="teams"
                stroke="url(#warmGradient)"
                strokeWidth={3}
                dot={{ fill: "#f87171", r: 4 }}
                activeDot={{ r: 7, fill: "#fb923c", stroke: "#b91c1c", strokeWidth: 2 }}
              />
              <defs>
                <linearGradient id="warmGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" /> {/* soft red */}
                  <stop offset="100%" stopColor="#facc15" /> {/* golden yellow */}
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Participants Graph */}
        <div className="bg-gradient-to-br from-red-950/40 to-amber-900/20 border border-amber-500/40 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.25)] p-5 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(251,146,60,0.35)] transition">
          <h2 className="text-center text-orange-300 text-lg font-semibold mb-3">
            🎡 Total Participations
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={participantsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fb923c33" />
              <XAxis dataKey="year" stroke="#fdba74" />
              <YAxis stroke="#fdba74" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#fdba74" }} />
              <Bar
                dataKey="participants"
                fill="url(#warmGradient)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="warmGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" /> {/* soft red */}
                  <stop offset="100%" stopColor="#facc15" /> {/* golden yellow */}
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
