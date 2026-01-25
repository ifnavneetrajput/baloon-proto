const PaginationDots = ({ count, active }) => {
  return (
    <div className="flex gap-2 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-sm border ${
            i === active ? "bg-gray-800" : "bg-white"
          }`}
        />
      ))}
    </div>
  );
};

export default PaginationDots;
