
const auth = async(req, res, next) => {
    const {user} = req;
    if (user){
        next()
    }else{
        res.redirect("/auth/google")
    }

}

export default auth;
