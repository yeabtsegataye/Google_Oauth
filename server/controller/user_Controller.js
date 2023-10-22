const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const dotenv = require('dotenv')
const User = require("../model/user")
dotenv.config()

const tokens = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
  };

const login = async(req, res) => {
    if(req.body.accessToken){
        // gogole-auth

        const {accessToken} = req.body;

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
            
            .then(async response => {
                const email = response.data.email;

                const existingUser = await User.findOne({email})

                if (!existingUser) 
                return res.status(404).json({message: "User don't exist!"})
                const token = tokens(existingUser._id);
                
                res
                    .status(200)
                    .json({result: existingUser, token})
                    
            })
            .catch(err => {
                res
                    .status(400)
                    .json({message: "Invalid access token!"})
            })
    }else{
       return console.log('error')
    }
  
}

const register = async(req, res) => {
    if (req.body.accessToken) {
        const {accessToken} = req.body;
        console.log(accessToken)

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;
                const picture = response.data.picture;

                const existingUser = await User.findOne({email})

                if (existingUser) 
                    return res.status(400).json({message: "User already exist!"})

                const result = await User.create({verified:"true",email, firstName, lastName, profilePicture: picture})

                const token = tokens(result._id);
                res
                    .status(200)
                    .json({result, token})
            })
            .catch(err => {
                console.log(err.message)
                res
                    .status(400)
                    .json({message: "Invalid access token!"})
            })

    } else {
       return console.log('some error')

    }
}

module.exports = {
    login,
    register
}