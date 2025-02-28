const {PrismaClient} = require('@prisma/client');
const prisma= new PrismaClient();
const express= require("express");
const router= express.Router();
const isLoggedIn= require("../middleware/verifylogin");

router.post("/",isLoggedIn,async(req,res)=>{
    const {title,description}= req.body;
    //console.log(req.user)
    const newBlog= await prisma.blog.create({
        data:{
            title:title,
            description:description,
            author_id:req.user.id
        }
    })
    res.json({message:"blog added successfully",
        data:newBlog
    })
})

router.get("/:id",async(req,res)=>{
    const {id}= req.params;
    const blog = await prisma.blog.findUnique({
        where: {
          id:parseInt(id),
        },
          select:{
            title:true,
            description:true,
            author:{
                select:{
                    name:true
                }
            }
    }
      })
      res.json({blog});
})

router.get("/",async (req,res)=>{
   try{
    let allblogs= await prisma.blog.findMany({
        select:{
            title:true,
            description:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    //console.log(allblogs);
    
    res.json({blog:allblogs});
   } catch(error){
        res.json({error:error});
   }
})

module.exports= router