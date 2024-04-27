const LeftRightLayout = ({
  leftImage,
  rightContent,
}: {
  leftImage: string;
  rightContent: React.ReactNode;
}) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap w-full h-screen">
      <div className="w-full h-1/3 md:w-1/2 md:h-full relative">
        <img
          src="/logo.png"
          alt="Trober Logo"
          className="z-10 absolute top-5 left-5"
        />
        <img
          src={leftImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 min-h-screen flex flex-1 justify-center items-center bg-gray-100">
        {rightContent}
      </div>
    </div>
  );
};

export default LeftRightLayout;
