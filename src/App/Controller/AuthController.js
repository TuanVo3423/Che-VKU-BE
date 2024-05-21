const UserShema = require('../Model/UserModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
class AuthController {
    // [POST] auth/register
    async register (req,res,next) {
        const {username, password,fullname,email} = req.body;
        const User = await UserShema.findOne({username});
        if(User){
            return res.status(400).json({
                message : 'The username already exists',
                type : 'error',
            })
        }
        if(password.length < 6){
            return res.status(400).json({
                message : 'The password must be at least 6 characters long',
                type : 'error',
            })
        }
        // Password Encryption
        const passwordHash =await bcrypt.hash(password,10);
        const newUser = new UserShema({
            username ,
            password : passwordHash,
            fullname,
            email,
        });

        newUser.save()
            .then(user => {
                 // Then create jsonwebtoken to authentication
                const accesstoken = createAccessToken({id: user._id})
                const refreshtoken = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refreshtoken, {
                    httpOnly: true,
                    path: '/auth/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7d
                })
                res.json({
                    accesstoken : accesstoken,
                    message : 'Registration successfully',
                    type : 'success',
                });
            })
            .catch(next);
    }
    // [GET] auth/refresh_token
    async refreshToken(req,res,next) {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({
                message : 'Please Login or Register',
                type : 'error',
            })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({
                    message : 'Please Login or Register',
                    type : 'error',
                })
                const accesstoken = createAccessToken({id: user.id})
                res.json({user,accesstoken});
            }); 

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    }
    // [POST] auth/login
    async login(req,res,next){
        try {
            const {username , password} = req.body;
            const user = await UserShema.findOne({
            username : username,
        })
        if(!user) {
            return res.status(400).json({
                message : 'User not found',
                type : 'error',
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message : 'Password incorrect',
                type : 'error',
            });
        }
        // if login success , create access token and refresh token
        const accesstoken = await createAccessToken({id: user._id , name : user.username })
        const refreshtoken = await createRefreshToken({id: user._id})
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/',
            // sameSite : 'strict',
            maxAge: 7*24*60*60*1000 // 7d
        })
        res.status(200).json({accesstoken : accesstoken , message : 'Login successfully' , type : 'success'});
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                type : 'error',
            })
        }
    }

    // [GET]auth/logout
    async logout(req, res) {
        try {
            res.clearCookie('refreshtoken', {path: '/auth/refresh_token'})
            return res.json({
                message: "Logged out",
                type : 'success',
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message,
                type : 'error',
            })
        }
    }

    async getUser(req, res) {
        try {
            const user = await UserShema.findById(req.user.id).select('-password');
            if(!user) return res.status(400).json({msg: "User does not exist."})
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
module.exports = new AuthController();