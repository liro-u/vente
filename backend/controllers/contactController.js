import nodemailer from 'nodemailer';
import validator from 'validator';
const { isEmail } = validator;

const contact = async(req, res) => {
    const user = req.user;
    const {email, object, subject, content } = req.body;

    let emptyFields = [];

    if (!email) {
        emptyFields.push('email');
    }
    if (!object) {
        emptyFields.push('object')
    }
    if (!subject) {
        emptyFields.push('subject')
    }
    if (!content) {
        emptyFields.push('content')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }else if (!isEmail(email)){
        emptyFields.push('email');
        return res.status(400).json({ error: 'Please put a correct email', emptyFields })
    }

    

    try {
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        let finalContent = "";

        finalContent += "from : " + email + "\n";
        if (user) {
            finalContent += "pseudo : " + user.pseudo + "\n";
            finalContent += "email : " + user.email + "\n";
            finalContent += "role : " + user.role + "\n";
            finalContent += "_id : " + user._id + "\n";
        }

        finalContent += "\n------------------------\n";
        finalContent += content;
        finalContent += "\n------------------------\n";
        finalContent += "\n--\n\nfilter:" + object + "\n"

        let mailOptions = {
            from: process.env.MAIL,
            to: process.env.MAIL,
            subject: subject,
            text: finalContent
        }

        await transporter.sendMail(mailOptions)
        res.status(200).json(mailOptions);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({error: err.message, emptyFields});
    }
}

export default {
    contact
}