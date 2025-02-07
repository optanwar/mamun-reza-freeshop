import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-white grid place-items-center max-w-full">
      <div className="w-[10vmax] h-[10vmax] border-b-4 border-black/70 rounded-full animate-[loadingRotate_800ms_linear_infinite]"></div>
    </div>
  );
};

export default Loader;
