import React from 'react';
import notFoundImg from '../assits/page-not-found.png';

function Notfound() {
  return (
    <>
      <div className="w-50 mx-auto">
        <img className='w-100 bg-dark my-5' src={notFoundImg} alt="page not found" />
      </div>
    </>
  )
}

export default Notfound
