import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // check if the user is the one he claims to be - use json token for that
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;    // google auth

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');  // 'test' the secret should be the same as the one when creating the token

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;  // sub is google's name to differentiate every single user
        }

        next();
        // user wants to like a post
        // clicks the like button => auth middlewhere (next) => like controller...

    } catch (error) {
        console.log(error);
    }
}

export default auth;