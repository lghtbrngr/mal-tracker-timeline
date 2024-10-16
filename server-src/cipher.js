const crypto = require('crypto');

const key = 'K1hmfxiuSu986/fBzqnvZEB7uMWFXUXA+ZXBaNsHLVo=';

exports.encrypt = (payload) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(payload);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return [encrypted, iv, cipher.getAuthTag()];
  // TODO: encode as base64 string for storage?
};

exports.decrypt = (encrypted, iv, tag) => {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  let payload = decipher.update(encrypted);
  payload = Buffer.concat([payload, decipher.final()]);
  return payload;
};
