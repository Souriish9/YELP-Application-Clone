import React, { useContext, useState } from "react";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {

    const [name,setName] = useState("")
    const [location,setLocation] = useState("")
    const [priceRange,setpriceRange]=useState("Price Range")

    //use Context hook
    const {addRestaurants} = useContext(RestaurantsContext)

    const handleSubmit = async(e) =>{
        e.preventDefault()

        try{
            const response= await RestaurantFinder.post("/", {
                name: name,
                location: location,
                price_range:priceRange
            })

            addRestaurants(response.data.data.restaurant)
            console.log(response)
        }
        catch(err)
        {
            console.log("Issue in adding restaurants!")
            console.log(err)
            console.error(err)
        }
    }

    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e=>setName(e.target.value)} className="form-control" type="text" placeholder="Name" />
                    </div>
                    <div className="col">
                        <input value={location} onChange={f=>setLocation(f.target.value)} className="form-control" type="text" placeholder="Location" />
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={f=>setpriceRange(f.target.value)} className="custom-select my-1 mr-sm-2">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurant;
