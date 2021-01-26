import React from 'react'

const Comments = ({comment}) => {
    const moment = require("moment");
 
    return (
        <div>
            <div className="right-part">
            <div className="comment-header">
              <div className="pseudo">
                <h3>
                    {comment.user&&comment.user["prenom"]} {comment.user&&comment.user["nom"]}
                </h3>
              </div>
              <span>{moment().format("llll")}</span>
            </div>
            <h4>{comment.text}</h4>
          </div>
        </div>
    )
}

export default Comments
