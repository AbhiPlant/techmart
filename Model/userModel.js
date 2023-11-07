let { User } = require("../Schema/UserSchema");
let joi = require("joi");

async function create(params) {
  let valid = await check(params).catch((err) => {
    return { error: err };
  });
  if (!valid || (valid && valid.error)) {
    return { error: valid.error };
  }
  let userData = {
    name: params.userName,
    email_id: params.email,
    contact: params.phone,
    password: params.password,
  };
  let data = await User.create(userData).catch((err) => {
    return { error: err };
  });

  if (!data || (data && data.error)) {
    return { error: "Internal server error9" };
  }
  return { data: data };
}

async function check(data) {
  let Schema = joi.object({
    userName: joi.string().min(2).max(15).required(),
    email: joi.string().email().min(8).max(30).required(),
    phone: joi.string().required(),
    password: joi.string().min(8).max(15).required(),
  });
  let valid = await Schema.validateAsync(data).catch((err) => {
    return { error: err };
  });

  if (!valid || (valid && valid.error)) {
    let msg = [];
    for (let i of valid.error.details) {
      msg.push(i.message);
    }
    return { error: msg };
  }
  return { data: valid };
}

module.exports = {create}
