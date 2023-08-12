/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import RestaurantFinder from '../api/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import {useNavigate} from 'react-router-dom'
import StarRating from './StarRating'


const RestaurantList = (props) => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext)

    //use history hook
    let navigate = useNavigate()

    useEffect(() => {

        const fetchData = async() => {

            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants)
                console.log(response.data.data)
            }
            catch (err) {
                console.error(err)
            }
        }

        fetchData()
    },[])

    const handleDeleteRestaurant = async(e,id) => {

        e.stopPropagation();
        try{
            const response= await RestaurantFinder.delete(`/${id}`)
            console.log(response.data.data.restaurant)

            setRestaurants(restaurants.filter(restaurant =>{
                return restaurant.id!==id
            }))
        }
        catch(err)
        {
            console.error(err)
        }
    }

    const handleUpdate = async(e,id) =>{

        e.stopPropagation()
        navigate(`/restaurant/${id}/update`)
    }

    const handleRestaurantSelect =(e,id) =>{
        e.stopPropagation()
        navigate(`/restaurant/${id}`)
    }

    const renderRating=(restaurant) =>{

        if(!restaurant.count)
        {
            return <span className='text-warning'>0 reviews</span>
        }
        return(
            <>
                <StarRating rating={restaurant.average_rating}/>
                <span className="text-success ml-1">({restaurant.count})</span>
            </>
        )
    }

    return (
        <div className='list-group'>
            <table className="table table-hover table-primary">
                <thead className='bg-success'>
                    <tr className="bg-success">
                        <th scope="col">ID</th>
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Ratings</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map((restaurant) => {
                        return (
                            <tr onClick={(e) => handleRestaurantSelect(e,restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.id}</td>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td><button onClick={(e) => handleUpdate(e,restaurant.id)} className="btn btn-warning">Edit</button></td>
                                <td><button onClick= {(e) => handleDeleteRestaurant(e,restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList;
