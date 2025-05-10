import nodemailer from 'nodemailer'


const sendverificationmail= async (email,token)=>{
    try{
        const transporter=nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            auth:{
                user:process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
            
        })

        const verificationurl=`${process.env.BASE_URL}/api/v1/users/verify/${token}`;

        const mailoptions={
            from:`"Authentication App" <${process.env.EMAIL_USER}>`,
            to:email,
            subject:'Verify Your Email Address',
            html: `
            <h3>Welcome!</h3>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${verificationurl}">Verify Email</a>
            <p>This link will expire in 10 minute.</p>
            `,

        }


        const info=await transporter.sendMail(mailoptions);
        console.log(`Verification email is sent ${info.messageId}`)
    }
    catch(err){
       throw new Error(`Failed to send email: ${err.message}`); 
    }
}


export default sendverificationmail