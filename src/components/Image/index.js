import React from 'react'

const Image = ({url}) => {
  return (
    <div className="image-container">
    <img src={url} className="profile-image" loading="lazy" alt="profile pic" />
    </div>
  )
}

export default Image