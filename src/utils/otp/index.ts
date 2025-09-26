 export const generateOTP = () => {
    return (Math.floor(Math.random() * 900000) + 100000).toString();
 }


 export const generateExpiryTime = (time : number) => {
    return new Date(Date.now() + time * 60 * 1000);
 }