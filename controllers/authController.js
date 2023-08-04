import User from "../models/userModel.js"

const authController = {
    redirectDashbaord : async(req, res) => {
        res.redirect("/dashboard")
    }
}

export default authController;