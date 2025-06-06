const bcryptConfig = {
  saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
};

export { bcryptConfig };
