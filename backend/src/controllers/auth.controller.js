const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const Student = require("../models/student.model");
const Instructor = require("../models/instructor.model");
const { signTokens } = require("../utils/jwt");
const { createTokenUser } = require("../utils/users");

const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../error");
const Department = require("../models/department.model");

///////////////////////////////////////
//?log in
async function Login(req, res) {
  const { email, password, role } = req.body;

  if (role) throw new UnauthenticatedError("You cant set role only for admins");
  if (!email || !password) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) throw new BadRequestError("Invalid Email or password");

  if (!(await user.verifyPassword(password)))
    throw new BadRequestError("Invalid Email or password");

  const tokenUser = createTokenUser(user);

  const { accessToken } = signTokens(res, tokenUser);
  res.status(StatusCodes.OK).json({
    tokenUser,
    accessToken,
  });
}

/////////////////////////////////////////
//?sign up
async function CreateAccount(req, res) {
  const basePath = req.route.path.split("/")[2];

  const { email, password } = req.body;

  //validation
  if (!email || !password)
    throw new BadRequestError("Email or Password fields cannot be blank");

  let alreadyExists = await User.findOne({ email });
  if (alreadyExists) throw new BadRequestError("User Already Exits");

  //creates the user
  const user = new User({ email, password });
  const department = await Department.findOne({ name: "Computer Science" });
  if (!department) throw new NotFoundError("No department found");
  user.department = department._id;

  //create the kind of user expected
  let createdUser;
  if (basePath === "student") {
    user.role = "student";
    createdUser = await Student.create({ userId: user._id, ...req.body });
    createdUser.level = 100;
  } else if (basePath === "instructor") {
    user.role = "instructor";
    createdUser = await Instructor.create({ userId: user._id, ...req.body });
  }
  user.save();
  createdUser.populate("userId", "email role department");
  //Token services

  //successful response
  res.status(200).json({ user: createdUser });
}

//is authenticated

function Logout(req, res, next) {
  res.locals.user = null;
  res.sendStatus(StatusCodes.OK);
}

module.exports = {
  Login,
  Logout,
  CreateAccount,
};
