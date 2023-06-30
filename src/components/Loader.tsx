const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="h-32 w-32 animate-spin rounded-full border-[16px] border-solid border-slate-600 border-t-transparent"></div>
      </div>
    </div>
  );
};
export default Loader;
