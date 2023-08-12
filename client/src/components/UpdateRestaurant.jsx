import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../api/RestaurantFinder'

const UpdateRestaurant = (props) => {

    const { id } = useParams()
    const { restaurants } = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setpriceRange] = useState("")
    const navigate=useNavigate()

    useEffect(() => {
        const fetchdata= async() =>{
            
            try{
                console.log(id)
                const response=await RestaurantFinder.get(`/${id}`)
                console.log(response.data.data)
                setName(response.data.data.restaurant.name)
                setLocation(response.data.data.restaurant.location)
                setpriceRange(response.data.data.restaurant.price_range)
            }
            catch(err)
            {
                console.error(err)
            }
        }

        fetchdata();
    }, [])

    const handleSubmit =async(e) =>{
        e.preventDefault()
        try{

            const response=await RestaurantFinder.put(`/${id}`,{
                name: name,
                location: location,
                price_range:priceRange

            })

            console.log(response.data.data)
            navigate('/')
        }
        catch(err)
        {
            console.error(err)
        }
    }

    return (
        <div>
            <form action=''>
                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} id="name" className='form-control' type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor='location'>Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="location" className='form-control' type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor='price_range'>Price Range</label>
                    <input value={priceRange} onChange={e => setpriceRange(e.target.value)} id="price_range" className='form-control' type="number" />
                </div>
                <button type='submit' onClick={handleSubmit} className="btn btn-primary my-mb-2">Save</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant;
