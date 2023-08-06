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
})


const dashboardThoughtTitle = document.querySelectorAll(".dashboard-bottom .thought .thought-title");
dashboardThoughtTitle.forEach((thought) => {
    if (thought.textContent.length > 70){
        thought.textContent = thought.textContent.substring(0, 70).trim() + "..."
    }
})


const thoughtsThoughtTitle = document.querySelectorAll(".thoughts-section .thoughts .thought-title");
thoughtsThoughtTitle.forEach((thought) => {
    if (thought.textContent.length > 75){
        thought.textContent = thought.textContent.substring(0, 75).trim() + "..."
    }
})


const thoughtDate = document.querySelector(".thought-author-details .thought-date")
if (thoughtDate){
    const date = new Date(thoughtDate.textContent);
    thoughtDate.textContent = date.getDate() + " " + date.toLocaleString("default", {month : "long"}) + " " + date.getFullYear();
}


const publicThoughtDate  = document.querySelector(".publicThought-author-details .publicThought-date");
if (publicThoughtDate){
    const date = new Date(publicThoughtDate.textContent);
    console.log(date)
    publicThoughtDate.textContent = date.getDate() + " " + date.toLocaleString("default", {month : "long"}) + " " + date.getFullYear();
}