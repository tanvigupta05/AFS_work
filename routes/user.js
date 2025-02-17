const {PrismaClient} = require('@prisma/client');
const prisma= new PrismaClient();
const express= require("express");
const router= express.Router();

router.get("/:email",async(req,res)=>{
    const {email}= req.params;
    const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      })
     
      res.json({user});
})

router.post("/",async(req,res)=>{
    const {email,name,password}= req.body;
    let newuser= await prisma.user.create({
        data:{
            email:email,
            name:name,
            password:password
        }
    })
    res.json({newuser})
})

router.delete("/:email",async(req,res)=>{
    const {email}= req.params;
    const deleteUser = await prisma.user.delete({
        where: {
          email: email,
        },
      })
      res.send("user deleted");
})

router.put("/:email",async(req,res)=>{
    const {email}= req.params;
    const {name} =req.body;
    const updateUser = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          name: name,
        },
      })
      res.json("user updated");
})

module.exports= router;
