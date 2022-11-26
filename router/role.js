const express = require('express')
const router = express.Router()
const Role = require('../model/Role')

router.post('/ok', async(req, res)=>{
      const { roleName } =  req.body
      if (!roleName)
      return 
      res.status(400)
      .json({ sucsess: false, message:'role sai'})

      try {
        const newRole = new Role({
            roleName       
        })

        await newRole.save()
        res.json({sucsess: true, message: 'create succussfully', role: newRole})

      } catch (error) {
        console.log(error)
        res.status(500)
       .json({success: false, message:'Interval server eror' })
      }
})

module.exports = router