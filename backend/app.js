const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

const SECRETKEY = "QWERTY123";

app.use(bodyParser.json());

let vToken = ""

const verifyToken = (req, res, next) => {
    //getting the token from header
    const bearer = req.headers['authorization']
    if(bearer){
        const bearerToken = bearer.split(" ")
        const token = bearerToken[1];

        jwt.verify(token, SECRETKEY, (err, data) => {
            if(err){
                res.sendStatus(403)
            }
            else{
                req.userData = data
                vToken = token
                next()
            }
        });
    }else{
        res.sendStatus(403)
    }
}

app.get("/agentProfile", (req, res) => {
    res.send(
        {"code": 200,
    "message": "OK",
    "status": "SUCCESS",
    "data": {
    "name": "Lovepreet Singh",
    "language": "PUNJABI",
    "countryCode": 91,
    "phoneNumber": 9999999999
    }})
})

app.get("/searchEnrollments", (req, res) => {
    //after the verifyToken function
    const userData ={ 
        "users": [
            {
            "name": "Amarjeet Kaur",
            "dob": "1951-01-01",
            "userId": "Amarjeet_Kaur",
            "town": "Behman Diwana",
            "district": "BATHINDA",
            "state": "Punjab"
            },
            {
            "name": "Gurjodh Singh",
            "dob": "1982-05-20",
            "userId": "Gurjodh_Singh",
            "town": "Bathinda",
            "district": "BATHINDA",
            "state": "Punjab"
            },
            {
            "name": "Shiv Kumar Dubey",
            "dob": "1970-02-01",
            "userId": "Shiv_Kumar_Dubey",
            "town": "Bathinda",
            "district": "BATHINDA",
            "state": "Punjab"
            },
            {
            "name": "Karamjit Kaur",
            "dob": "1965-01-01",
            "userId": "Karamjit_Kaur",
            "town": "Balluana",
            "district": "BATHINDA",
            "state": "Punjab"
            }
        ]
    }
    res.send(userData)
})

app.post("/login", (req, res) => {
    console.log(req.body);
    const {countryCode, phoneNumber, password} = req.body;
 
    //database authentication
    if(countryCode==="1" && phoneNumber === "1" && password === "1"){
        const user = {
            phoneNumber, 
            password
        }
        jwt.sign({user}, SECRETKEY, (err, token) => {
            if(err){
                res.sendStatus(403);
            }else{
                res.json({
                    "code": 200,
                    "message": "OK",
                    "status": "SUCCESS",
                    "data": {
                        "agentId": phoneNumber,
                        "accessToken": token
                    }
                })
            }
        }) 
    }else{
        res.sendStatus(403);
    }
})

app.listen(8080, () => {
    console.log("Server started at 8080");
    
})