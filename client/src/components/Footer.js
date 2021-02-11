import React from 'react'
import {Link} from "react-router-dom"
const Footer = () => {
    return (
        <div className="footer">
            <div className="savoir"><Link to="/aboutUs" > En savoir plus </Link></div>
<div className="malek"><cite title="Source Title">©® Malek Marzouki </cite></div>
<br/>
<div className="contactez">contactez-nous par : 
<br/>
 - email : TuniHoteM@gmail.com
<br/>
           - telephone : +21623091754</div>

        </div>
    )
}

export default Footer
