const app = require ("./app.js");
const dotenv = require ("dotenv")
dotenv.config()
app.listen(process.env.PORT, ()=>{
    console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT}`);
})
