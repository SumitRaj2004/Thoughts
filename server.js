import express from "express";
import hbs from "hbs";
import {config} from "dotenv";
config();
import "./config/dbConn.js"
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mainRouter from "./routes/mainRoutes.js";
import authRouter from "./routes/authRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import passport from "passport";
import expressSession from "express-session"
import MongoStore from "connect-mongo";
import "./config/passport-setup.js";
import methodOverride from "method-override";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "./public")
const viewsPath = path.join(__dirname, "./templates/views")
const partialsPath = path.join(__dirname, "./templates/partials")

app.use(express.json());
app.use(express.static(publicPath))
app.use(express.urlencoded({extended : false}));
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath);
app.use(expressSession({
    secret : process.env.SECRET_KEY,
    resave : false,
    saveUninitialized : false,
    maxAge : 1000*60*60*24*7,    // seven days
    store : MongoStore.create({mongoUrl : process.env.DATABASE_URL})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"));

// routers
app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.all("*", (req, res) => {
    res.render("msg", {
        title : "Not Found",
        msg : "Page not found",
        link : "/",
        linkTitle : "Return to Home"
    })
})


app.listen(process.env.PORT, () => {
    console.log(`server started listening on port ${process.env.PORT}`)
})