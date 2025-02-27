const {PrismaClient} = require('@prisma/client');
const prisma= new PrismaClient();
const express= require("express");
const router= express.Router();
const isLoggedIn= require("../middleware/verifylogin");

router.post("/:blogId", isLoggedIn,async (req,res)=>{
    const {blogId} = req.params;
    const userId= req.user.id;
    let isLiked= await prisma.like.findFirst({
        where:{
            blogId:parseInt(blogId),
            author_id:userId
        }
    })
    if(isLiked){
        let deleteLike= await prisma.like.delete({
            where:{
                id:isLiked.id
            }
        })
        let decreaselikecount= await prisma.blog.update({
            where:{
                id:parseInt(blogId)
            },
            data:{
                likecount:{decrement:1}
            }
        })
        res.send("unliked")
    }else{
        const newLike= await prisma.like.create({
            data:{
                author_id: userId,
                blogId:parseInt(blogId)
            }
        })
        let updatelikecount = await prisma.blog.update({
            where:{
                id:parseInt(blogId)
            },
            data:{
                likecount:{increment:1}
            }
        })
        res.send("liked successfully")
    }
})
    
module.exports=router;