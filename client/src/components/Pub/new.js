import React from "react";
import { pub } from "../../../../controllers/pub";

const New = () => {
  return (
    <div>
      <div>
        <div className="container">
          <div className="images">
            <img src={pub.imageUrl} />
          </div>
          <div className="product">
            <p>Mise le : {pub.date}</p>
            <h1>Titre de la publication : {pub.titre}</h1>
            <h2>prix par jour : {pub.prix}</h2>
            <p className="desc">Description : {pub.description}</p>
            <div className="buttons">
              <LikeButton pub={pub && pub} user={user && user} />
            </div>
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="../img/icons/message1.svg"
                  alt="comment"
                />
                <span>{comments.length && comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="form">
          <h4>vous pouvez reserever par ici : </h4>
          <Form>
            <Col>
              <Form.Control
                type="date"
                placeholder="date debut "
                onChange={(e) => setDateDebut(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
                placeholder="date fin"
                onChange={(e) => setDateFin(e.target.value)}
              />
            </Col>

            <Button variant="primary" onSubmit={handleReserve}>
              Reserver
            </Button>
          </Form>
        </div>
        <br />
        <br />
        <Link to="/">
          <Button variant="primary">GoBack Home</Button>
        </Link>
        <br />
        <br />
        (pub.user["_id"] === user._id)?
        {
          <Link to="/EditPub">
            <Button variant="primary">Edit Pub</Button>
          </Link>
        }
        :null
        {showComments && (
          <div>
            <CardComments pub={pub && pub} />
            <ListComments comments={comments} loadcoms={loadcoms} />
          </div>
        )}
      </div>
    </div>
  );
};

export default New;
