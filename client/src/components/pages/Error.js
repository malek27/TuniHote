import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="err">
      <img
        src="https://3jokjq1tiw0a2iejai3ile36-wpengine.netdna-ssl.com/wp-content/uploads/1999/04/creez-une-page-404-qui-vaut-le-detour_560.png"
        alt="Error 404"
      />
      <br/>
      <Link to="/">
            <Button
              variant="primary"
            >
              Go Back Home
            </Button>
          </Link>
    </div>
  );
}

export default Error;