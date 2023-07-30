import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"

const Home = () => {

    const { store: { agenda }, actions } = useContext(Context);

    const mostrarAlerta = (idContacto, person) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgba(13, 80, 0, 0.7)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                actions.deleteContact(idContacto, person)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <>
            <div className="container">
                {/* <button onClick={() => actions.createAgenda()}> CLICK ME </button> */}
                <div className="row" style={agenda.length > 0 ? { maxHeight: "80vh", overflowY: "scroll" } : null}>
                    <ul className="list-group" >
                        {agenda.length > 0 ?
                            agenda?.map((contact, index) =>
                                <li key={index} >
                                    <div className='row my-2'>
                                        <div className='col-2'>
                                            <img src="https://picsum.photos/id/237/150/150" alt="" style={{ borderRadius: '100%' }} />
                                        </div>
                                        <div className='col-8 m-auto'>
                                            {contact.name}
                                            <br />
                                            {contact.email}
                                            <br />
                                            {contact.phone}
                                            <br />
                                            {contact.address}
                                        </div>
                                        <div className="col-2 d-flex justify-content-center align-items-center">
                                            <Link to={`/gestionarContacto/${contact.id}`}>
                                                <button className="btn btn-warning me-2">Edit</button>
                                            </Link>
                                            <button
                                                className={"btn btn-danger"}
                                                onClick={() => mostrarAlerta(contact.id, contact)} >
                                                Borrar
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )
                            :
                            <h1 className="text-center">No has agregado Contactos aún</h1>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Home;
