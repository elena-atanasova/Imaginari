import jwt from 'jsonwebtoken';

const auth = async (request, response, next) => {
    try {

        // check if the user is the one he claims to be - use json token for that
        const token = request.headers.authorization.split(" ")[1];

        // check user
        const isCustomAuthentication = token.length < 500;    // google auth

        let decodedData;

        if(token && isCustomAuthentication) {
            decodedData = jwt.verify(token, 'test');  // 'test' the secret should be the same as the one when creating the token
            request.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            request.userId = decodedData?.sub;   // sub is google's name to differentiate every single user
        }

        next();
        // user wants to like a post
        // clicks the like button => auth middlewhere (next) => like controller...

    } catch (error) {
        
        console.log(error);

    }
}

export default auth;