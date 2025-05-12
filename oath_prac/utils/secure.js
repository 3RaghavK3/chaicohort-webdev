import crypto from 'crypto'

const generatestate=()=>{
    return  crypto.randomBytes(20).toString('hex')
}

const generatenonce=()=>{
    return  crypto.randomBytes(20).toString('hex')
}


export {generatestate,generatenonce}