import React from 'react'
import { Link } from 'react-router-dom'

const Adventure = () => {
  return (
    <div id="adventure">
      <h2>Journey Co$t</h2>
      <p>Creating Vacation Possibilities</p>
      <div className="tagline">
        vacation budget planner
      </div>
      <div className="register">
        <Link className="link" to='/register'>
          Register
				</Link>
      </div>
    </div>
  )
}

export default Adventure
