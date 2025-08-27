const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-primary">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );
};

export default LoadingScreen;
