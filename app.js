const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var multer = require('multer');
var csv = require('csvtojson');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Well, you only need the light when it's burning low2Only miss the sun when it starts to snow3Only know you love her when you let her go"
const mongurl = "mongodb+srv://vidhyakolathpk:vwillrise@cluster0.gxiytky.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
require('dotenv/config');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const csvRoutes = require("./routes/csvRoutes");

app.use("/api/uploadCsv", csvRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(5000, () => {
    console.log("server started")
})
mongoose.connect(mongurl, { useNewUrlParser: true })
    .then(() => { console.log("connected to database") })
    .catch(e => { console.log(e) })
app.post("/post", async (req, res) => {
    console.log(req.body);
})
require("./UserDetails");
require("./Employee")


const User = mongoose.model("UserInfo");
app.post("/Signup", async (req, res) => {
    const { userId, password } = req.body;
    const enceryptedpassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ userId });
        if (oldUser) {
            return res.send({ error: "user exists" });
        }

        await User.create({
            userId: userId,
            password: enceryptedpassword
        });
        res.send({ status: "ok" });
    }
    catch (error) { res.send({ status: "error" }) }
})
app.post("/", async (req, res) => {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId })
    if (!user) {
        return res.json({ error: "user not exist" })
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({}, JWT_SECRET);
        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "invalid password" })

})
const Employee = mongoose.model("EmployeeUserInfo");
/*app.post("/Excel", async (req, res) => {
    const { excelData } = req.body;
    
    try {
        

        await User.create({
            excelData :excelData
        });
        res.send({ status: "ok" });
    }
    catch (error) { res.send({ status: "error" }) }
})
*/
/*const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      return cb(null, "../public/doc")
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`)
    }
  })

  const upload = multer({storage})*/

//app.post('/Excel', async(req, res) => {
//  console.log(req.body);
/*const excelData=JSON.parse(req.body);
try {
    await Employee.create(excelDataxcelData );
    res.send({ status: "ok" });
}
catch (error) { res.send({ status: "error" }) }*/

/*db.collection(' EmployeeUserInfo').insert(req.body, function (err, result) {
    if (err)
       res.send('Error');
    else
      res.send('Success');
 
});*/


//console.log(req.file)

// })
app.post('/Excel', async (req, res) => {

     await (req.body.forEach(element => {
        
        const data = new Employee({
            first_name: element.first_name,
            company_name:element.company_name,
            email:element.email
        })
        const val=data.save();
        console.log(val);

    }));
    res.send("posted");
})
app.get("/Excel",async(req,res)=>{
   try{const data= await Employee.find({});
    res.send({data}); }
    catch(error){console.log(error)}
})
