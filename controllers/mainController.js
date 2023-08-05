
const mainController = {
    renderHome : async(req, res) => {
        res.render("home")
    },
    renderAbout : async(req, res) => {
        res.render("about")
    }
}

export default mainController;