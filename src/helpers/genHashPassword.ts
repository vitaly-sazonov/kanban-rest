import bcrypt = require('bcryptjs');

export const genHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_SIZE as string, 10));
  const out = await bcrypt.hash(password, salt);
  return out;
};
