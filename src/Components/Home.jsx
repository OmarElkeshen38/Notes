import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function Home() {

    const [note, setNote] = useState(
        {
         'title': '',
         'desc': ''
        }
    );
    const [noteIndexUpdated, setNoteIndexUpdated] = useState(0);

    const [notes, setNotes] = useState(() => {
        const storedNotesList = localStorage.getItem('notes');
        return storedNotesList ? JSON.parse(storedNotesList) : [];
    });

    useEffect(() => {
        const storedNotesList = localStorage.getItem('notes');
        
        if (storedNotesList) {
            setNotes(JSON.parse(storedNotesList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);



    function getNote(e) {
        let myNote = { ...note };
        myNote[e.target.name] = e.target.value;
        setNote(myNote);
    }

    const addNote = (e) => {
        e.preventDefault();
        const newNote = { ...note };
        setNotes((prevNotesList) => [...prevNotesList, newNote]);
        notifyAddNote();
        // Reset the form fields
        document.getElementById('add-form').reset()
    };

    const notifyAddNote = () => toast.success("Note added successfully!", {
        position: "top-center",
        autoClose: 3000
    });
    const notifyUpdateNote = () => toast.success("Note Updated successfully!", {
        position: "top-center",
        autoClose: 3000
    });
    

    function deleteNote(index) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3f5663',
            cancelButtonColor: '#24353F',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                notes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(notes));
                setNotes((prevNotesList) => [...prevNotesList]);
                Swal.fire(
                    'Deleted!',
                    'Your note has been deleted.',
                    'success'
                )
            }
        })
    }

    function getNoteInfo(noteIndex) {

        setNoteIndexUpdated(noteIndex);

        document.querySelector("#exampleModal1 input").value = notes[noteIndex].title;
        document.querySelector("#exampleModal1 textarea").value = notes[noteIndex].desc;

        setNote({ ...note, 'title': notes[noteIndex].title, 'desc': notes[noteIndex].desc });
    }

    function updateNote(e) {
        e.preventDefault();
        getNote(e);
        notes[noteIndexUpdated] = { ...note };
        localStorage.setItem('notes', JSON.stringify(notes));
        notifyUpdateNote();
    }

    

    return (
        <>
            <div className="container my-5">
                <div className="col-md-12 text-end">
                    <a className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add
                        New</a>
                </div>
            </div>


            {/* <!-- Add Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form id="add-form" onSubmit={addNote}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* <!-- Edit Modal --> */}
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form onSubmit={updateNote} id="edit-form">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Update Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>



            {/* <!-- ==========================Notes=============================== --> */}

            <div className="container">
                <div className="row">
                    {notes.map((note, index) => {
                        return (
                            <div key={index} className="col-md-4 my-4">
                                <div className="note p-4">
                                    <h3 className="float-start">{note.title}</h3>
                                    <a onClick={() => { getNoteInfo(index) }} data-bs-toggle="modal" data-bs-target="#exampleModal1" ><i className="fas fa-edit float-end edit"></i></a>
                                    <a onClick={() => { deleteNote(index) }} > <i className="fas fa-trash-alt float-end px-3 del"></i></a>
                                    <span className="clearfix"></span>
                                    <p>{note.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Home