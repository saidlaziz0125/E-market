const express = require("express")
const router = express.Router()
const gadgetDb = require("../model/gadget")
const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, "uploads")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now().toString()+ path.extname(file.originalname))
    }
})

const uploads = multer({
    storage,
    limits: {fieldSize: 3*1024*1024},
    fileFilter: (req, file, cb)=>{
        const extname = path.extname(file.originalname)
        if(extname!==".jpg" && extname!==".jpeg" && extname!==".png" && extname!==".webp") {
            const err = new Error("error")
            err.code=404
            return cb(err)
        }
        cb(null, true)
    } ,
    preservePath: true
}).single("photo")



router.get("/add", (req, res)=>{
    res.render("add", {
        title: "Add",
        Aactive:true
    })
})

router.post("/add", uploads, (req, res)=>{
    
    req.checkBody("name", "Enter gadget name").notEmpty()
    req.checkBody("phone", "Enter for gadget phone").notEmpty()
    req.checkBody("price", "Enter gadget price").notEmpty()

    const errors = req.validationErrors()

    if(errors) {
        res.render("add", {
            title: "This error",
            errors: errors
        })
    }
    else {
        const {name, phone, price, discount, category, like, comment, region, district, photo, date}= req.body
        const db = new gadgetDb({
            name: name,
            phone: phone,
            price: price,
            discount: discount,
            category: category,
            like: like,
            comment: comment,
            region: region,
            district: district,
            photo: req.file.path,
            date: date
        })

        db.save()
        req.flash("success", "Gadget download")
        res.redirect("/")
    }

})


router.get("/del/:id", (req, res)=>{
    gadgetDb.findByIdAndDelete(req.params.id, (err, data)=>{
        if(err) throw err
        res.redirect("/")
    })
})

router.get("/edit/:id", (req, res)=>{
    gadgetDb.findById(req.params.id, (err, data)=>{
        res.render("add", {
            title: "Settings",
            datas: data
        })
    })
})


router.post("/edit/:id", uploads, (req, res)=>{

    req.checkBody("name", "Enter gadget name").notEmpty()
    req.checkBody("phone", "Enter for gadget phone").notEmpty()
    req.checkBody("price", "Enter gadget price").notEmpty()

    const errors = req.validationErrors()

    if(errors){
        res.render("add", {
            title: "This error set",
            errors: errors
        })
    }
    else {
        const {name, price, phone, discount, like, category, comment, region, district, photo, date}=req.body
        const db = {
            name: name,
            price: price,
            phone: phone,
            discount: discount,
            like: like,
            category: category,
            comment: comment,
            region: region,
            district: district,
            photo: req.file.path,
            date: date
        }
        gadgetDb.findByIdAndUpdate(req.params.id, db, (err, data)=>{
            if(err) throw err
            res.redirect("/")
        })
    }


})


module.exports = router