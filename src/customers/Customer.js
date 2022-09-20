import { Link } from "react-router-dom"

export const Customer = ({ id, phoneNumber, fullName, address }) => {
    return <section className="customer">
        <div>
            <Link to={`/customers/${id}`}>Name: {fullName}</Link>    
        </div>
        <div>Address: {address}</div>
        <div>Phone Number: {phoneNumber}</div>
    </section>
}