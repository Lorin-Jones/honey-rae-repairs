import { useEffect, useState } from "react"

export const CustomerForm = () => {
    // TODO: Provide initial state for profile
    const [user, updateUser] = useState({
        fullName: "",
        email: "",
        isStaff: false
    })
    const [customer, updateCustomer] = useState({
        address: "",
        phoneNumber: "",
        userId: ""
    })

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    // TODO: Get employee profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
           .then(response => response.json())
           .then((data) => {
               const customerObject = data[0]
               updateCustomer(customerObject)
           })
    }, [])
    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const userObject = data[0]
                updateUser(userObject)
            })
    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
       return fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
       })
           .then(response => response.json())
           .then(() => {
                return fetch(`http://localhost:8088/customers/${customer.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(customer)
                })
                    .then(response => response.json())
                    .then(() => {
                        setFeedback("Customer profile successfully saved")
                    })
           })
    }

    return (
        <>
         <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
         </div>
        
        <form className="profile">
            <h2 className="profile__title">Update Customer Info</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Customer Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.fullName}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.fullName = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={customer.address}
                        onChange={
                            (evt) => {
                                const copy = {...customer}
                                copy.address = evt.target.value
                                updateCustomer(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone-number">Phone Number:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={customer.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...customer}
                                copy.phoneNumber = evt.target.value
                                updateCustomer(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}