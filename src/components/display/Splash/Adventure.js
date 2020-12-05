import React from 'react'
import { Link } from 'react-router-dom'

const Adventure = () => {
  return (
    <div id="adventure">
      <h2>Adventurous Escape</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, unde eum vel pariatur omnis totam, autem deserunt nam numquam ex beatae quibusdam voluptas labore fuga. Quibusdam commodi maxime vel ducimus?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium deleniti quidem soluta qui molestiae delectus, commodi nulla neque eum at saepe voluptatibus amet. Mollitia, minima? Exercitationem perspiciatis libero omnis dolores?</p>
      <div className="register">
        <Link className="link" to='/register'>
          Register
				</Link>
      </div>
    </div>
  )
}

export default Adventure
