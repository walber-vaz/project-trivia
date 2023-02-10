import md5 from 'crypto-js/md5';

export default function emailHash(email) {
  return md5(email).toString();
}
