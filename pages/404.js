import React from "react";
import Image from "next/image";
import ErrorImage from "../public/images/404.png";

export default function Error() {
  return (
    <div className="page-not-found-page">
      <div>
        <div className="page-not-found">
          <b>Oops;</b> Sorry, but the page you were trying to view does not exist.
        </div>
        <Image src={ErrorImage} width="800px" height="300px" />
        {/* <div className="page-404">404</div> */}
      </div>
    </div>
  );
}
