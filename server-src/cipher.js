const crypto = require('crypto');

/* Notes:
 * Crypto-js is no longer maintained, so the next best thing is to roll our own wrapper of the
 * crypto module.
 * Could consider SJCL or https://docs.cossacklabs.com/themis in the future.
 * References:
 * stackoverflow.com/questions/6953286/how-to-encrypt-data-that-needs-to-be-decrypted-in-node-js
 * medium.com/@tony.infisical/guide-to-nodes-crypto-module-for-encryption-decryption-65c077176980
 */

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');

exports.encrypt = (payload) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv, {
    authTagLength: 16,
  });
  let encrypted = cipher.update(payload);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const result = Buffer.concat([iv, encrypted, cipher.getAuthTag()]);
  return result.toString('base64');
};

exports.decrypt = (encodedPayload) => {
  const payload = Buffer.from(encodedPayload, 'base64');
  const iv = payload.subarray(0, 12);
  const encrypted = payload.subarray(12, -16);
  const tag = payload.subarray(-16);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv, {
    authTagLength: 16,
  });
  decipher.setAuthTag(tag);
  const decrypted = decipher.update(encrypted);
  return Buffer.concat([decrypted, decipher.final()]);
};
