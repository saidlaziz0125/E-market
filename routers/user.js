const express = require("express")
const router = express.Router()
const userDb = require("../model/user")
const bcryptjs = require("bcryptjs")


router.get("/signup", (req, res)=>{
    res.render("user", {
        title: "Sign Up",
        Sactive: true
    })
})

router.post("/signup", (req, res)=>{

    req.checkBody("username", "Foydalanuvchi ismini kiriting").notEmpty()
    req.checkBody("lastname", "Foydalanuvchi familiyasini kiriting").notEmpty()
    req.checkBody("login", "Foydalanuvchi Loginini kiriting").notEmpty()
    req.checkBody("email", "Foydalanuvchi Emailini kiriting").notEmpty()
    req.checkBody("password", "Foydalanuvchi Parolini kiriting").notEmpty()
    req.checkBody("password2" ," Parolni tasdiqlang").equals(req.body.password)

    const errors = req.validationErrors()

    if(errors){
        res.render("user", {
            title: " This error",
            Sactive: true,
            errors: errors
        })
    }else{
        const {username, lastname, email, login, password}=req.body
        bcryptjs.hash(password, 10, (err, hash)=>{
            if(err) throw err
            const db = new userDb({
                username:username,
                lastname: lastname,
                email: email,
                login: login,
                password: hash
            })
            db.save().then(data=>{
                res.render("index", {
                    title: 'Home'
                })
            })
        })
    }
    
})

router.get("/login", (req, res)=>{
    res.render("user", {
        title: "Login"
    })
})

router.post("/login", (req, res)=>{

    req.checkBody("login", "Login kiriting").notEmpty()
    req.checkBody("password", "Parol kiriting").notEmpty()
    req.checkBody("password2" ," Parolni tasdiqlang").equals(req.body.password)

    const errors = req.validationErrors()

    if(errors){
        res.render("user", {
            title: "xatolik bor",
            errors: errors
        })
    }else {
        const {password, login, username, lastname, email}=req.body
        userDb.findOne({login: login}, (err, data)=>{
            if(err) throw err
            else {
                bcryptjs.compare(password, data.password).then(data1=>{
                    if(!data1) {
                        // 
                    }else {
                        res.render("profile", {
                            title: "Entered profile",
                            db:data
                        })
                    }
                })
            }
        })
    }

})


module.exports = router