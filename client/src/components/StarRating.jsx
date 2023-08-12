import React from 'react'

const StarRating =({rating}) =>{
    const stars=[]
     var flag=(rating-Math.floor(rating)!==0)
        let i=1;
        for(i;i<=rating;i++)
        {
            stars.push(<i key={i} className="fa-solid fa-star text-warning"></i>)
        }
        if(flag===true)
        {
            stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-warning"></i>)
            i=Math.ceil(rating)
            console.log('Ceiling is',i)
            while(i<=4){
                stars.push(<i key={i} className="fa-regular fa-star text-warning"></i>)
                i++
            }
        }
        if(flag===false)
        {
            while(i<=5)
            {
                stars.push(<i key={i} className="fa-regular fa-star text-warning"></i>)
                i++
            }
        }
    return <>{stars}</>
}

export default StarRating