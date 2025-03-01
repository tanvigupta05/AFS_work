const {PrismaClient} = require('@prisma/client');
const prisma= new PrismaClient();
const express= require("express");
const router= express.Router();
const { TokenExpiredError } = require("jsonwebtoken");
const { sendmail } = require("../utils/sendmail");

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
    let token = Math.floor(Math.random()*10000);

    let newtoken = await prisma.token.create({
        data:{
            token:token,
            userId:newuser.id
        }
    })

    let link = `http://localhost:4245/verify/${token}/${newuser.id}`
     await sendmail(email,"verify email",link)
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
