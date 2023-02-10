window.addEventListener("load", ()=>{

    let foiz = document.querySelectorAll(".discount")
    let chegirma = document.querySelectorAll(".sale")
    foiz.forEach((e, i) => {
        if(e.innerHTML=="null%") {
            e.style.display="none"
            chegirma[i].innerHTML = "Chegirma mavjud emas"
        }
    });


    const alert = document.querySelectorAll(".alert");
    
    alert.forEach((element, i) => {
        setTimeout(() => {

            $(element).fadeOut(2000, function () {
                $(element).hide(1000);
            });

        }, 2000);
        console.log(element);
    });




    let cardsIn = document.querySelectorAll(".pro-img")

    cardsIn.forEach(element => {
        element.addEventListener("click", ()=>{
            let id = element.getAttribute("cardsIn")
            window.location.href = id
        })
    });


    let proLike = document.querySelectorAll(".pro-like");
    let likeCount = document.querySelectorAll(".likeCount");

    proLike.forEach((element, value) => {
        element.addEventListener("click", ()=>{
            let id = element.getAttribute("likeId")
            $(element).css("color", "red");

            fetch(id, {
                method: "POST"
            })
            .then(data=> data.json())
            .then(data=>{
                likeCount.forEach((elem, val)=>{
                    if(value==val) {
                        elem.innerHTML=data.like
                    }
                })
            })
        }, {once: true})
    });

})