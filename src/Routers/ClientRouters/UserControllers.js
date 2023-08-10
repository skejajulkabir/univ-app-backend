//importing loibraries
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


// Importing mongoose models
const User = require("../../models/userModel");

const addUserController = async (req, res) => {

  const regularEmailValidation =await User.findOne({"regularEmail" : req.body.regularEmail});
  const userNameValidation = await User.findOne({"userName" : req.body.userName});
  // const userRollValidation = await User.findOne({"info.roll" : req.body.info.roll});
  // console.log(userRollValidation , req.body)

  if(regularEmailValidation) {
    res.status(500).json({message : "This email is already used in an account! Email has to be unique!"});
    return
  }else if (userNameValidation){
    res.status(500).json({message : "This username is already used in an account! username has to be unique!"});
    return
  }
  // else if (userRollValidation){
  //   res.status(500).json({message : "This roll is already used in an account! Email has to be unique!"});
  //   return
  // }
  
  
  else{
    try {
      const newUser = req.body;

      const {
        name,
        userName,
        regularEmail,
        password,
        userType,
        info,
        contact,
      } = newUser;

      const {
        bloodGroup ,
        department,
        roll,
        admissionSession,
        currentLocation,
        Gender,
        from,
      } = info;

      const { phoneNumber,  Facebook, LinkedIn, insta, YouTube, Discord } =
        contact;


      // Encrypting password
      const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
      


      const u = new User({
        name,
        userName,
        "password" : encryptedPassword,
        regularEmail,
        userType,
        info: {
          bloodGroup,
          department,
          roll,
          admissionSession,
          currentLocation,
          Gender,
          from,
        },
        contact: {
          phoneNumber: {
            Number: phoneNumber.Number,
            isPublic: phoneNumber.isPublic,
          },
          Facebook,
          LinkedIn,
          insta,
          YouTube,
          Discord,
        },
      });

      await u.save();

      res
        .status(200)
        .json({ message: "The user has been added successfully to the DB." });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Could not add user to the DB.", error });
    }
  }
};




const loginUserCpntroller = async (req , res)=>{
  try {
    const user = await User.findOne({"regularEmail" : req.body.regularEmail});
    // console.log(user);
    if (user) {
      // Decrypt
      const bytes  = CryptoJS.AES.decrypt(user.password, 'secret key 123');
      const dbPass = bytes.toString(CryptoJS.enc.Utf8);
      // console.log(dbPass);
      // CryptoJS.AES.decrypt(user.password, 'secret key 123').toString(CryptoJS.enc.Utf8);
      if (req.body.regularEmail === user.regularEmail && req.body.password === dbPass) {
        //success
        const token = jwt.sign({
          name : user.name ,
          username : user.userName,
          uid : user._id
        } ,
          "openSecretKey" , 
          { expiresIn: '1d' });


        res.status(200).send({"success": true , "message":"Login operation successful!" , token : token});
      } else {
        //user find failed
        res.status(400).send({"success": false , "message": "Invalid credentials..."})
      }
    }else{
      //server error
      res.status(400).json({message: "user not found."})
    }
  } catch (error) {
    res.send(error);
  }
}









const getUserController = async (req,res)=>{
  try {
      let users = await User.find();
      res.status(200).json({users})
  } catch (error) {
      res.status(400).json({'message' : "this method is not allowed." , 'error': error})
  }
};


const getUserByIdController = async (req,res)=>{
  const uid = req.params.id;
    // console.log(pid)
  try {
      let user = await User.findOne({ _id : uid}).select('-password');
      res.status(200).json({user})
  } catch (error) {
      res.status(400).json({'message' : "could not find" , error})
  }
};













const updateUserController = async (req, res) => {
  const userId = req.params.id;

  try {
    const updatedUser = req.body.user;

    const {
      name,
      userName,
      regularEmail,
      userType,
      info,
      contact,
    } = updatedUser;

    const {
      bloodGroup,
      department,
      roll,
      admissionSession,
      currentLocation,
      Gender,
      from,
    } = info;

    const { phoneNumber, Facebook, LinkedIn, insta, YouTube, Discord } =
      contact;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.userName = userName;
    user.regularEmail = regularEmail;
    user.userType = userType;
    user.info = {
      bloodGroup,
      department,
      roll,
      admissionSession,
      currentLocation,
      Gender,
      from,
    };
    user.contact = {
      phoneNumber: {
        Number: phoneNumber.Number,
        isPublic: phoneNumber.isPublic,
      },
      Facebook,
      LinkedIn,
      insta,
      YouTube,
      Discord,
    };

    await user.save();

    res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Could not update user information', error });
  }
};












module.exports = { addUserController , getUserController ,loginUserCpntroller , getUserByIdController , updateUserController };



