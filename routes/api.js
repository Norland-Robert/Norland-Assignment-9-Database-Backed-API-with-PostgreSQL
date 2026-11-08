//Creates Requirement packages for the script
const express = require ('express')
const router = requre.Router()


//Imports postgreSQL connection pool to reach db
const pool = require('../db')

//GET request to get items from the database
router.get('/', async (req, res) => {
    try{
        const result = await pool.query(
            //Displays infomration results in descending order based on the time it was created
            'SELECT * FROM items ORDER BY created_at DESC'
        )
        //Response code and displays information sorted into rows
        res.status(200).json({data: result.rows})
    }
    //Error handling
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Could Not Retrieve Items form Database'})
    }
})

//GET items by its ID
router.get('/:id', async (req, res) =>{
    try{
        const result = await pool.query(
            'SELECT * FROM items WHERE id = $1',
            [req.params.id]
        )
        //Error if the element doesnt exist
        if (result.rows.length === 0){
            return res.status(404).json({ error: 'Item could not be found'})
        }
        res.status(200).json({ data: result.rows[0] })
    }
    //Error handling data can't be retrieved
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to retrieve item data '})
    }
})

//POST to create a new item in the database
router.post('/', async (req,res) => {
    try{
        const {title, description, category } = req.body

        //Invalid input handling for no title in item creation
        if (!title || !title.trim()) {
            return res.status(400).json({ error: 'Title is required'})
        }

        const result = await pool.query(
            'INSERT INTO items (title, description, category) VALUES ($1, $2, $3) RETURNING *',
            [title.trim(), description || null, category || null]
        )

        res.status(201).json({data: result.rows[0]})
    }
    //Error Handling 
    catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to create requested item'})
    }
})


//PUT request to update an existing item in the database
router.put('/:id', async (req, res) => {
    try{    
        const {title, description, category} = req.body

        if (!title || !title.trim()) {
            return res.status(400).json({error: 'Title is required'})
        }

        const result = await pool.query(
            'UPDATE items SET title = $1, description = $2, category = $3 WHERE id = $4 RETURNING *',
            [title.trim(), description || null, category || null]
        )
        res.status(200).json({data: result.rows[0]})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to update requested item'})
    }
})

//DELETE request to delete an item from the database by its ID
router.delete('/:id', async (req, res) => {
    try{
        const result = await pool.query(
            'DELETE  FROM items WHERE id = $1 RETURNING *',
            [req.params.id]
        )

        if (result.rows.length === 0){
            return res.status(404).json({ error: 'Requested Item could not be found'})
        }
        res.status(200).json({message: 'Requested Item Successfully Deleted'})
    }

    catch (error){
        console.error(error)
        res.status(500).json({error: 'Failed to delete requested item'})
    }
})

//Exports the router for use in the server.js file
module.exports = router