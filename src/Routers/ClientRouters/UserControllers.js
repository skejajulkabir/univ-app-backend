//importing loibraries
const CryptoJS = require("crypto-js");


// Importing mongoose models
const User = require("../../models/userModel");

const addUserController = async (req, res) => {

  const regularEmailValidation =await User.findOne({"regularEmail" : req.body.regularEmail});
  const userNameValidation = await User.findOne({"userName" : req.body.userName});
  const userRollValidation = await User.findOne({"info.roll" : req.body.info.roll});
  // console.log(userRollValidation , req.body)

  if(regularEmailValidation) {
    res.status(500).json({message : "This email is already used in an account! Email has to be unique!"});
  }else if (userNameValidation){
    res.status(500).json({message : "This username is already used in an account! Email has to be unique!"});
  }else if (userRollValidation){
    res.status(500).json({message : "This roll is already used in an account! Email has to be unique!"});
  }
  
  
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
      if (req.body.regularEmail == user.regularEmail && req.body.password == dbPass) {
        res.status(200).send({"success": true , "message":"Login operation successful!"})
      } else {
        res.status(200).send({"success": false , "message": "Invalid credentials..."})
      }
    }else{
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











module.exports = { addUserController , getUserController ,loginUserCpntroller };


















// // Importing mongoose models
// const User = require("../../models/userModel");

// const addUserController = async (req, res) => {
//   try {
//     const newUser = req.body;

//     const {
//       name,
//       userName,
//       avatar,
//       regularEmail,
//       password,
//       role,
//       awards,
//       userType,
//       info,
//       contact,
//     } = newUser;

//     const {
//       department,
//       roll,
//       admissionSession,
//       currentLocation,
//       Gender,
//       from,
//     } = info;

//     const { phoneNumber, univEmail, Facebook, LinkedIn, insta, YouTube, Discord } =
//       contact;

//     const u = new User({
//       name,
//       userName,
//       avatar,
//       regularEmail,
//       password,
//       role,
//       awards,
//       userType,
//       info: {
//         department,
//         roll,
//         admissionSession,
//         currentLocation,
//         Gender,
//         from,
//       },
//       contact: {
//         phoneNumber: {
//           Number: phoneNumber.Number,
//           isPublic: phoneNumber.isPublic,
//         },
//         univEmail,
//         Facebook,
//         LinkedIn,
//         insta,
//         YouTube,
//         Discord,
//       },
//     });

//     await u.save();

//     res
//       .status(200)
//       .json({ message: "The user has been added successfully to the DB." });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(500).json({ message: "Could not add user to the DB.", error });
//   }
// };

// module.exports = { addUserController };
















































// Importing mongoose models
// const User = require("../../models/userModel");



// const updateproductController = async (req,res)=>{};


// const addUserController = async (req, res) => {
//     try {
//       const newUser = req.body;
  
//         const { 
//               name,
//               userName ,
//               email ,
//               password ,
//               userType , 
//               department ,
//               roll ,
//               admissionSession ,
//               currentLocation ,
//               Gender ,
//               from ,
//               phoneNumber ,
//               isPublic ,
//               Facebook ,
//               LinkedIn ,
//               insta ,
//               YouTube ,
//               Discord 
//          } = newUser;

        // const product = new Product({ title , author, brand , slug , description , img , category , price , done , reviews, variants });
//         const u = new User(
//             {
//               name,
//               userName ,
//               email ,
//               password ,
//               userType , 
//               department ,
//               roll ,
//               admissionSession ,
//               currentLocation ,
//               Gender ,
//               from ,
//               phoneNumber ,
//               isPublic ,
//               Facebook ,
//               LinkedIn ,
//               insta ,
//               YouTube ,
//               Discord ,
//             }
//         );
  
//         await u.save();
  
//       res.status(200).json({ message: "the user has been added successfully to the DB." });
//     } catch (error) {
//       console.error("Error saving user:", error);
//       res.status(500).json({ message: "Could not add user to the DB.", error });
//     }
// }


// so this is the CRUD operation... the read functionality is at client1 segment...
// module.exports = {addUserController};












