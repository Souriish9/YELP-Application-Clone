import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../api/RestaurantFinder'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'
import StarRating from '../components/StarRating'

const RestaurantDetail = () => {

  const {id} = useParams()
  const {selectedRestaurant,setSelectedRestaurants} =useContext(RestaurantsContext)

  useEffect(() => {

    const fetchData= async() =>{

      try{
        const response=await RestaurantFinder.get(`/${id}`)
        console.log(response.data.data)
        setSelectedRestaurants(response.data.data)
      }
      catch(err)
      {
        console.error(err)
      }
    }

    fetchData()
  },[])

  return (
    <div>
      {selectedRestaurant && (

        <>
        <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
        <div className="text-center">
          <StarRating rating={selectedRestaurant.restaurant.average_rating} />
        </div>
          <div className="mt-3">
              <Reviews reviews={selectedRestaurant.reviews}/>
          </div>
          <AddReview/>
        </>
      )}
    </div>
  )
}

export default RestaurantDetail