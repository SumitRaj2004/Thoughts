const button = document.querySelector(".navbar .container button");
const navbar = document.querySelector(".navbar")
button.addEventListener("click",  () => {
    if (navbar.classList.contains("open")){
        navbar.classList.remove("open")
        document.body.style.position = "relative"
    }else{
        navbar.classList.add("open")
        document.body.style.position = "fixed"
    }
    // navbar.classList.toggle("open")
})


const thoughts = document.querySelectorAll(".dashboard-bottom .thought .thought-title");

thoughts.forEach((thought) => {
    if (thought.textContent.length > 75){
        thought.textContent = thought.textContent.substring(0, 75).trim() + "..."
    }
})
