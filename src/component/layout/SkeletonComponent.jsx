import React from "react";
import Skeleton from "@mui/material/Skeleton";
const SkeletonComponent = () => {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={30}
        width="100%"
        className="mb-1"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={30}
        width="100%"
        className="mb-1"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={30}
        width="100%"
        className="mb-1"
      />
    </div>
  );
};

export default SkeletonComponent;
