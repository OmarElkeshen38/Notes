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


// {
//   notes.map((note, index) => {
//     return (
//       <div key={index} className="col-md-4 my-4">
//         <div className="note p-4">
//           <h3 className="float-start">{note.title}</h3>
//           <a onClick={() => { getNoteInfo(index) }} data-bs-toggle="modal" data-bs-target="#exampleModal1" ><i className="fas fa-edit float-end edit"></i></a>
//           <a onClick={() => { deleteNote(index) }} > <i className="fas fa-trash-alt float-end px-3 del"></i></a>
//           <span className="clearfix"></span>
//           <p>{note.desc}</p>
//         </div>
//       </div>
//     )
//   })
// }
