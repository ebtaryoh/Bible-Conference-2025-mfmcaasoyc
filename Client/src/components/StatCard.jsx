function StatCard({ title, value, color }) {
  return (
    <div
      className={`rounded-2xl shadow-lg p-6 text-white flex flex-col items-center ${color}`}
    >
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
    </div>
  );
}

export default StatCard;
