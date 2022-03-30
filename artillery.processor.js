function GenUniqueValue(value) {
  return `${value}_${(Math.random() + 1).toString(36).substring(7)}`;
}

function generateUserData(requestParams, ctx, ee, next) {
  ctx.vars.gen_username = GenUniqueValue('username');
  ctx.vars.gen_login = GenUniqueValue('login');
  ctx.vars.gen_password = GenUniqueValue('pass');

  return next();
}

module.exports = {
  generateUserData,
};
