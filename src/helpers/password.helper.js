import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT;

async function Encrypt(password){
    return await bcrypt.hash( password, saltRounds);
}

async function Compare(password, hash){
    return await bcrypt.compare(password, hash);
}
export { Encrypt, Compare};