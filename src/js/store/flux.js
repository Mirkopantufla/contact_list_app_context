import { toast } from "react-toastify"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiURL: 'https://playground.4geeks.com/apis/fake/contact/',
			name: "",
			email: "",
			phone: "",
			address: "",
			agenda: [],
			chosenContact: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			handleChange: e => {
                const { name, value } = e.target;

                //Todos estos formateos son para mantener ordenada la vista del context
                //Formateo de la data de inicio de sesion
                if (name == 'name') {
                    setStore({ [name]: value })
                } else if (name == 'email') {
                    setStore({ [name]: value })
                } else if (name == 'phone') {
                    setStore({ [name]: value })
                } else if (name == 'address') {
                    setStore({ [name]: value })
                }
            },
			deleteChosen: () => {
				setStore({
					chosenContact: {},
					name: "",
					email: "",
					phone: "",
					address: ""
				})
			},
			chargeSpecificContact: async (contactId) => {
				try {
					const { apiURL } = getStore();

				const data = {
					apiURL: `${apiURL}/${contactId}`,
					options: {
						method: 'GET'
					}
				}

				const result = await fetch(data.apiURL, data.options)
				const respJson = await result.json()

					console.log(respJson[0])
					setStore({ 
						chosenContact: respJson[0],
						name: respJson[0].name,
						email: respJson[0].email,
						phone: respJson[0].phone,
						address: respJson[0].address
					})
				
				} catch (error) {
					console.log(error)
				}
			},
			getAllAgendas: async () => {
				try {

					const { apiURL } = getStore();

					const data = {
						apiURL: `${apiURL}agenda/mirko_agenda`,
						options: {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json'
							}
						}
					}

					const result = await fetch(data.apiURL, data.options)
					const respJson = await result.json()
					console.log("Contactos", respJson)
					setStore({ agenda: respJson })

					
				} catch (error) {
					
				}
			},
			addContactToAgenda: async (e) => {
				e.preventDefault()
				try {
					const { apiURL, name, email, phone, address } = getStore();

					const agenda_slug = "mirko_agenda"

					const data = {
						apiURL: `${apiURL}`,
						options: {
							method: 'POST',
							body: JSON.stringify({
								name: name,
								email: email,
								agenda_slug: agenda_slug,
								address: phone,
								phone: address
							}),
							headers: {
								'Content-Type': 'application/json'
							}
						}
					}

					const response = await fetch(data.apiURL, data.options)
					const respJson = await response.json()
					console.log("Contacto agregado",respJson)
					toast.success(respJson.msg)
					setStore({ agenda: respJson })
					
				} catch (error) {
					console.log(error)
				}
			},
			deleteContact: async (idContacto, person) => {

				try {
					const { apiURL } = getStore();

				const data = {
					apiURL: `${apiURL}${idContacto}`,
					options: {
						method: 'DELETE'
					}
				}

				const result = await fetch(data.apiURL, data.options)
				const respJson = await result.json()

					console.log(respJson)
					setStore({ agenda: agenda.filter(contact => contact !== person) })
				
				} catch (error) {
					console.log(error)
				}
			},
			updateContactInAgenda: async (e, idContacto) => {
				e.preventDefault()
				try {
					const { apiURL, name, email, phone, address } = getStore();

					const agenda_slug = "mirko_agenda"

					const updatedContactData = {
						name: name,
						email: email,
						agenda_slug: agenda_slug,
						address: phone,
						phone: address
					};

					const jsonData = JSON.stringify( updatedContactData );

					const data = {
						apiURL: `${apiURL}${idContacto}`,
						options: {
							method: 'PUT',
							body: jsonData,
							headers: {
								'Content-Type': 'application/json'
							}
						}
					}

					const response = await fetch(data.apiURL, data.options)

					if (!response.ok || response.status === 204) {
						toast.success("Se ha modificado sin Problemas");
					}
					
				} catch (error) {
					console.log("Mensaje de Error", error)
				}
			},
		}
	};
};

export default getState;
