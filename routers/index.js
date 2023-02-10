const express = require("express")
const router = express.Router()
const gadgetDb = require('../model/gadget')


router.get("/", (req, res)=>{
    gadgetDb.find({}, (err, data)=>{
        res.render("index", {
            title: "Home",
            Iactive:true,
            data: data,
            searchs: "Premium e'lonlar"
        })
    })
    
})

router.get("/search", (req, res)=>{
    let{search}=req.query
    console.log(search);
    gadgetDb.find({name: {$regex: search}}, (err, data)=>{
        if(data==   "") {
            res.render("index", {
                title: "Search",
                searchs: "Hech narsa topilmadi"
            })
        }
        else {
            res.render("index", {
                title: "Search",
                data: data,
                searchs: "Qidiruv bo'yicha natijalar"
            })
        }
    })
})

router.get("/region", (req, res)=>{
    let{region}=req.query
    gadgetDb.find({region: {$regex: region}}, (err, data)=>{
        res.render("index", {
            title: region,
            data: data,
            searchs: `${region} viloyatidagi e'lonlar`
        })
    })
})

router.get("/price", (req, res)=>{
    let{start, end}=req.query
    const promise = gadgetDb.find({price : {"$gte" : (start) , "$lte" : (end)}})
    promise.then(data=>{
        res.render("index", {
            title: "between",
            data:data,
            searchs: "Qidruv ishladi"
        })
    }).catch(err=>console.log(err))
    
})

router.get("/top/like", (req, res)=>{
    const promise = gadgetDb.find({}).sort({like: -1}).limit(10)
      promise.then(data=>{
        res.render("index", {
            title: "Top likes",
            data: data,
            searchs: "Top likes gadgets"
        })
    }).catch(err=>{
        console.log(err);
    })
})

// ///////////////////////////////////////////////////////////////////////////////

router.get("/laptops", (req, res)=>{
    gadgetDb.find({category: "laptop"}, (err, data)=>{
        console.log(data);
        res.render("index", {
            title: "Laptops",
            data: data
        })
        
    })
})

router.get("/computers", (req, res)=>{
    gadgetDb.find({category: "computer"}, (err, data)=>{
        console.log(data);
        res.render("index", {
            title: "Computers",
            data: data
        })
        
    })
})

router.get("/tablets", (req, res)=>{
    gadgetDb.find({category: "tablet"}, (err, data)=>{
        console.log(data);
        res.render("index", {
            title: "Tablet",
            data: data
        })
        
    })
})

router.get("/tv", (req, res)=>{
    gadgetDb.find({category: "tv"}, (err, data)=>{
        console.log(data);
        res.render("index", {
            title: "TV",
            data: data
        })
        
    })
})

router.get("/mobiles", (req, res)=>{
    gadgetDb.find({category: "mobile"}, (err, data)=>{
        console.log(data);
        res.render("index", {
            title: "Mobiles",
            data: data
        })
        
    })
})

router.get("/ipods", (req, res)=>{
    gadgetDb.find({category: "iPod"}, (err, data)=>{
        console.log(data);
        res.render("index", {
            title: "iPods",
            data: data
        })
        
    })
})

// /////////////////////////////////////////////////////////////////////////////

router.get("/card/:id", (req, res)=>{
    gadgetDb.findById(req.params.id, (err, data)=>{
        res.render("cards", {
            title :" Gadget",
            db: data
        })
    })
})



router.get("/like/:id", (req, res)=>{
    product.findById(req.params.id, (err, data)=>{
        if(err) {
            console.log(err);
        }
        else {
            data.like+=1;
            data.save()
            res.send(data)
        }
    })
})




module.exports = router