const express = require("express");
const router= express.Router();
const { PrismaClient } = require('@prisma/client');
const isLoggedIn = require("../middleware/verifylogin");
const prisma = new PrismaClient();

router.post("/:blogId",isLoggedIn,async(req,res)=>{
    const {blogId} = req.params;
    const userId = req.user.id;

    let isdisliked = await prisma.dislike.findUnique({
        where:{
            blogId:parseInt(blogId),
            author_id:userId
        }
    })

    if(isdisliked)
    {
        let deletedislike = await prisma.dislike.delete({
            where:{ 
                id:isdisliked.id
            }
        })

        let decreasedislikecount = await prisma.blog.update({
            where:{
                id:parseInt(blogId)
            },
            data:{
                dislikecount:{decrement:1}
            }
        })

        res.send("Dislike cancel")
    }else{
        const newdislike = await prisma.dislike.create({
            data:{
                author_id:userId,
                blogId:parseInt(blogId)
            }
        })
        let updatedislikecount = await prisma.blog.update({
            where:{
                id:parseInt(blogId)
            },
            data:{
                dislikecount:{increment:1}
            }
        })
        res.send("dislike added");
    }
})

module.exports=router;