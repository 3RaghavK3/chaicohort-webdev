import { User,create_user } from '../models/user.js';
import { generatestate,generatenonce } from '../utils/secure.js';
import dotenv from 'dotenv'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

dotenv.config();

const googlelogin=async(req,res)=>{

    try{
        const oath_state=generatestate();
        const oath_nonce=generatenonce();

        res.cookie("oath_state",oath_state)
        res.cookie("oath_nonce",oath_nonce)

        const login_url = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
            `redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&` +
            `response_type=code&` +
            `scope=openid%20profile%20email&` +  
            `state=${oath_state}&` +
            `nonce=${oath_nonce}`;


        res.redirect(login_url);
    }
    catch(err){
        console.log("error in login")
        console.error(err.message)
       
    }


}

const googlecallback=async(req,res)=>{
    

    const authorization_code=req.query.code
    const state=req.query.state


    if(!state || state!=req.cookies.oath_state) throw new Error("State token not same")
    

    try{
        const response=await axios.post('https://oauth2.googleapis.com/token',null,{
            params:{
                code:authorization_code,
                client_id:process.env.GOOGLE_CLIENT_ID,
                client_secret:process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri:process.env.GOOGLE_REDIRECT_URI,
                grant_type:'authorization_code'
            }


        })

        const{refresh_token,id_token,acess_token}=response.data;
        const payload= await verifytoken(id_token)


        const matching_user=await User.findOne({googleid:payload.sub})
        if(matching_user) res.send("User authenticated")

        else {
            res.send("User not found in database . User registered")
            create_user(payload.name,payload.email,payload.sub,refresh_token)
        }
        return res.status(200);

    }
    catch(err){
        console.error(err.message)
    } 
}


const verifytoken=async(token)=>{
     const decode_token=jwt.decode(token,{complete:true})
     if(!decode_token || !decode_token.header) throw new Error("Invalid/Malformed token");
    const wanted_kid=decode_token.header.kid;
    try{
        const publickey=await fetchpublickey(wanted_kid);

        return jwt.verify(token,publickey,{
            algorithms:['RS256'],
            audience:process.env.GOOGLE_CLIENT_ID
        })

    }
    catch(err){
        throw err
    }

}
    
const fetchpublickey = async (kid) => {
  const client = getjwksclient();
  try {
    const matching_key = await client.getSigningKey(kid); 
    return matching_key.getPublicKey();
  } catch (err) {
    throw err;
  }
};

const getjwksclient=()=>{
    return jwksClient({
        jwksUri:process.env.GOOGLE_JWKS_URL,
        cache:true,
        rateLimit:true
    })
}

const googlelogout=async(req,res)=>{
  
    res.clearCookie('oath_state');  
    res.clearCookie('oath_nonce');  

    res.redirect(process.env.BASE_URL);

}

// const getprofile=async(req,res)=>{
//     if(!req.cookie.state || !req.cookie.login) res.redirect(process.env.BASE_URL);
//     else{
//         return {
            
//         }
//     }

// }   

export {googlelogin,googlecallback,googlelogout}