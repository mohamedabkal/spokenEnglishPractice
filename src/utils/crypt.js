import { RSA } from 'react-native-rsa-native';
import GLOBAL from '../const/global';

const generateKey = async () => {
  const keys = await RSA.generateKeys(4096);
  const signature = await RSA.sign(GLOBAL.SIGN_MESSAGE, keys.private);
  
  console.log(keys, signature)
  console.log(await RSA.verify(signature, GLOBAL.SIGN_MESSAGE, keys.public))

  return [keys.private, keys.public]
}

const signature = async (private_key) => {
  return await RSA.sign(GLOBAL.SIGN_MESSAGE, private_key)
}

export default {
  generateKey,
  signature
};