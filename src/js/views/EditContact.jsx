import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const EditContact = () => {
    const { store: { chosenContact }, actions } = useContext(Context);
    const { theid } = useParams();

    useEffect(() => {

        actions?.chargeSpecificContact(parseInt(theid))

    }, [])


    return (
        <div className='container-fluid'>
            <Link to="/">
                <span className="btn btn-primary btn-lg" href="#" role="button">
                    Back
                </span>
            </Link>
            <div className="row">
                <div className='col-2'>
                    <img src="https://picsum.photos/id/237/150/150" alt="" style={{ borderRadius: '100%' }} />
                </div>
                <div className='col-8 m-auto'>
                    {chosenContact ? chosenContact.name : ""}
                    <br />
                    {chosenContact ? chosenContact.email : ""}
                    <br />
                    {chosenContact ? chosenContact.phone : ""}
                    <br />
                    {chosenContact ? chosenContact.address : ""}
                </div>

                {/* <div className="offset-2 col-8">
                    <div className="row">
                        <div className="col-7 text-center">
                            <img src={NoImagen} alt="" />
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className='row'>
                        <div className="col-2">
                            <h5 htmlFor="">Nombre: </h5>
                            <span>{store?.chosenCharacter?.result.properties.name}</span>
                        </div>
                        <div className="col-2">
                            <h5 htmlFor="">Genero: </h5>
                            <span>{store?.chosenCharacter?.result.properties.gender}</span>
                        </div>
                        <div className="col-2">
                            <h5 htmlFor="">Año de Nacimiento: </h5>
                            <span>{store?.chosenCharacter?.result.properties.birth_year}</span>
                        </div>
                        <div className="col-2">
                            <h5 htmlFor="">Color de Ojos: </h5>
                            <span>{store?.chosenCharacter?.result.properties.eye_color}</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>

    );
}

export default EditContact