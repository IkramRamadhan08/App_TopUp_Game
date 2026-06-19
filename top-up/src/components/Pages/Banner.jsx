import React from 'react'

const Banner = (props) => {

  return (
    <div>
      <div className="relative">
        <img
          src={props.img} // Path gambar banner
          alt="Banner"
          className={`w-full ${props.variant} object-cover`}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-white text-3xl font-bold">{props.children}</h1>
        </div>
      </div>
    </div>
  )
}

export default Banner