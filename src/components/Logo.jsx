import React from "react";
function Logo({width = "100px"}) {
  return (
    <div style={{width}} className="font-bold text-xl">
      MyBlog
    </div>
  );
}

export default Logo;
