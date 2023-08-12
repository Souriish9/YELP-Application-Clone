import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../api/RestaurantFinder'

const AddReview = () => {

    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("")
    const { id } = useParams();
    const navigate =useNavigate()
    const location=useLocation()
    console.log(location)

    //use location hook
    //const location=useLocation();

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating: rating
            })
            console.log(response)
            navigate('/')

        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='container mb-2'>
            <form action=" ">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor='name'>Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" placeholder='name' className='form-control' />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Ratings</label>
                        <select value={rating} onChange={e => setRating(e.target.value)} name="ratings" id="ratings" className='custom-select'>
                            <option value="disabled">Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} name="reviews" id="reviews" cols="30" rows="10" placeholder='type your review here...'></textarea>
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmitReview}>Submit</button>
            </form>
        </div>
    )
}

export default AddReview