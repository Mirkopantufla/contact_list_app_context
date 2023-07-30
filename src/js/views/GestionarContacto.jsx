import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { Context } from '../store/appContext';
import { useLocation, useNavigate, useParams } from 'react-router';

const GestionarContacto = () => {
    const { store: { name, email, phone, address }, actions } = useContext(Context);

    const vistaUsuario = useLocation();

    const [modoActualizar, setModoActualizar] = useState(false);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [adressError, setAdressError] = useState('');

    const { theid } = useParams();

    const onlyEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const onlyLetters = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;

    useEffect(() => {

        console.log(vistaUsuario.pathname)
        if (vistaUsuario.pathname !== '/gestionarContacto') {
            actions?.chargeSpecificContact(parseInt(theid))
            setModoActualizar(true)
        } else {
            setModoActualizar(false)
            actions.deleteChosen()
        }

    }, [vistaUsuario])

    //Variable para validar si hay error o no al terminar la funcion
    let hayError = false;

    const validarDatos = (e) => {
        e.preventDefault()
        //Siempre inicia falso al consultar, en caso de haber algun error cambiara a true
        hayError = false;

        //Validacion para el campo name, que no este vacio y un formato valido: pepito rodriguez
        if (name && name == "") {
            setNameError('No puedes dejar el campo de nombre vacio')
            toast.warn('No puedes dejar el campo de nombre vacio');
            hayError = true;
        } else if (!onlyLetters.test(name)) {
            setNameError('El campo de correo debe tener un formato valido: roberto martinez')
            toast.warn('El campo de correo debe tener un formato valido: roberto martinez');
            hayError = true;
        } else {
            setNameError("")
        }

        //Validacion para el campo email, que no este vacio y un formato valido: ejemplo@ejemplo.cl
        if (email && email == "") {
            setEmailError('No puedes dejar el campo de correo vacio')
            toast.warn('No puedes dejar el campo de correo vacio');
            hayError = true;
        } else if (!onlyEmail.test(email)) {
            setEmailError('El campo de correo debe tener un formato valido: ejemplo@ejemplo.cl')
            toast.warn('El campo de correo debe tener un formato valido: ejemplo@ejemplo.cl');
            hayError = true;
        } else {
            setEmailError("")
        }

        //Validacion para el campo address, que no este vacio
        if (address == "") {
            setAdressError('No puedes dejar el campo de direccion vacio')
            toast.warn('No puedes dejar el campo de direccion vacio');
            hayError = true;
        } else {
            setAdressError("")
        }

        //Validacion para el campo password, de momento solo si esta vacio
        if (phone == "") {
            setPhoneError('No puedes dejar el campo de Telefono vacio')
            toast.warn('No puedes dejar el campo de Telefono vacio');
            hayError = true;
        } else {
            setPhoneError("")
        }

        return hayError;
    }

    return (
        <div className="container ">
            <h1 className='text-center mt-5'>
                {
                    modoActualizar ? "Update Contact" : "Add Contact"
                }
            </h1>
            <div className="row">
                <div className="offset-3 col-6 p-5 mt-5 border border-dark rounded-3 text-center">
                    <form onSubmit={(e) => !validarDatos(e) ? actions.addContactToAgenda(e) : null}>
                        <label className='fs-3' htmlFor="">Full Name</label>
                        <input
                            className='form-control'
                            type="text"
                            name="name"
                            value={name}
                            onChange={actions.handleChange}
                        />
                        <small id='smallName' className='fs-5 text-danger'>{nameError}</small>
                        <br />
                        <label className='fs-3' htmlFor="">Email</label>
                        <input
                            className='form-control'
                            type="text"
                            name="email"
                            value={email}
                            onChange={actions.handleChange}
                        />
                        <small id='smallEmail' className='fs-5 text-danger'>{emailError}</small>
                        <br />
                        <label className='fs-3' htmlFor="">Phone</label>
                        <input
                            className='form-control'
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={actions.handleChange}
                        />
                        <small id='smallPhone' className='fs-5 text-danger'>{phoneError}</small>
                        <br />
                        <label className='fs-3' htmlFor="">Adress</label>
                        <input
                            className='form-control'
                            type="text"
                            name="address"
                            value={address}
                            onChange={actions.handleChange}
                        />
                        <small id='smallAdress' className='fs-5 text-danger'>{adressError}</small>
                        {
                            !modoActualizar ?
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary mt-4">Register</button>
                                </div>
                                :
                                null
                        }
                        {
                            modoActualizar ?
                                <div className="form-group text-center">
                                    <button type='button' className="btn btn-primary mt-4" onClick={(e) => actions.updateContactInAgenda(e, parseInt(theid))}>Actualizar</button>
                                </div>
                                : null
                        }
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default GestionarContacto