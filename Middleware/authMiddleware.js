let { sequelizecon, QueryTypes } = require("../Init/dbconfig");
let security = require("../Helpers/security");

function auth(permission) {
  return async (req, res, next) => {
    if(typeof (permission)!='string'){
        return res.redirect("/login?msg=Notfound")
    }
    let token = req.session.token
    if (typeof (token) != "string") {
      return res.redirect("/login?msg=unauthorized");
    }

    let decrypt = await security.decrypt(token, "#122fvz").catch((err) => {
      return { error: err };
    });
    if (!decrypt || (decrypt && decrypt.error)) {
      return res.redirect("/login?msg=unauthorized");
    }

    let Query = `select user.id,user.name,permission.name as permission
        from user
        left join userpermission on user.id = userpermission.user_id
        left join permission on userpermission.permission_id = permission.id
        where user.id = '${decrypt.id}' and token = '${token}'`;

    let user = await sequelizecon
      .query(Query, { type: QueryTypes.SELECT })
      .catch((err) => {
        return { error: err };
      });
    //console.log("user", user);
    if (!user || (user && user.error)) {
      return res.redirect('/login?msg=user.error');
    }

    let Permissions = {};
    for (let i of user) {
      if (i.permission) {
        Permissions[i.permission] = true;
      }
    }
    console.log('permissions',Permissions);
    if (Permissions.length <= 0 || !Permissions[permission]) {
      console.log("permissions", Permissions);
      return res.redirect("/login?msg=UNauthorized12");
    }
    req["userData"] = {
      name: user[0].name,
      id: user[0].id,
      Permissions,
    };
    //console.log(req.userData);
    next();
  };
}

module.exports = { auth };





// let arr = [
//   { id: 1, name: "abc", permission: "View" },
//   { id: 1, name: "abc", permission: "Create" },
//   { id: 1, name: "abc", permission: "Update" },
//   { id: 1, name: "abc", permission: "Delete" },
// ];
// let obj = {};
// for (let i = 0; i < arr.length; i++) {
//     obj[arr[i].permission] = true
// //   obj = arr[i].permission;
// //   obj = obj + ":" + true;
// //   console.log(obj);
// }
//  console.log(obj);
