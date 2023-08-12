require("dotenv").config()
const express = require('express')
const db = require("./db")
const morgan = require('morgan')
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

//custom middleware
// app.use((req,res,next) => {
//     console.log('yeah your middleware!')
//        next()
// })

app.get("/getRes", (req, res) => {

    console.log('testing api called....')
    res.json({
        message: 'hello',
        restaurant: 'kfc'
    }).status(200)
})

app.get("/api/v1/restaurants", async (req, res) => {

    try {
        //const results = await db.query("select * from restaurants")
        //const avg=await db.query("select restaurant_id, Avg(rating), count(rating) from reviews group by restaurant_id")
        const results= await db.query("select * FROM restaurants left join(select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id")
        console.log(results)
        res.status(200).json({
            status: "success",
            counts: results.rows.length,
            data: {
                restaurants: results.rows,
            },
        })
    }
    catch (err) {
        console.error(err)
        res.status(204).json({ status: 'rejected' })
    }
})

app.get("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const result = await db.query("select * from restaurants where id= $1", [req.params.id])
        const result1 = await db.query("select * from reviews where restaurant_id= $1", [req.params.id])
        const result2= await db.query("select * FROM restaurants left join(select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id=$1",[req.params.id])
        
        res.status(200).json({
            status: "success", counts: result.rows.length,
            data: {
                restaurant: result2.rows[0],
                reviews: result1.rows,
            },
        })
    }
    catch (err) {
        console.error(err)
        res.status(204).json({ status: "rejected" })
    }
})

app.post("/api/v1/restaurants", async (req, res) => {

    try {
        const str = req.body
        const results = await db.query("insert into restaurants (name,location,price_range) values ($1, $2, $3) returning *", [str.name, str.location, str.price_range])
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })
    }
    catch (err) {
        console.error(err)
        res.status(204).json({ status: "rejected" })
    }
})

app.put("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const id = req.params.id
        const str = req.body
        const results = await db.query("update restaurants set name=$1,location=$2,price_range=$3 where id=$4 returning *", [str.name, str.location, str.price_range, id])
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    }
    catch (err) {
        console.error(err)
        res.status(204).json({ message: "rejected" })
    }
})

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("delete from restaurants where id=$1 returning *", [req.params.id])
        res.status(200).json({
            status: "success/deleted",
            data: {
                restaurant: results.rows[0]
            },
        })
    }
    catch (err) {
        console.log(err)
        res.status(200).json({ status: "rejecetd" })
    }
})

app.post("/api/v1/restaurants/:id/addReview", async(req, res) => {
    try {

        const newRreview = await db.query("INSERT INTO reviews(restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *", [req.params.id, req.body.name, req.body.review, req.body.rating])
        console.log(newRreview)
        res.status(200).json({
            status: 'success',
            data: {
                review: newRreview.rows[0]
            }
        })
    }
    catch(err){
        console.log(err)
    }
})

app.get("/api/v1/allreviews", async(req,res) => {

    try{
        const results=await db.query("select * from reviews")
        //console.log(results)
        res.status(200).json({
            status:'success',
            data: results.rows
        })
    }
    catch(err)
    {
        console.log(err)
    }
    
})


const port = process.env.PORT || 3006
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`http://localhost:${port}`)
})