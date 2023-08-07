// importing libraries

//importing models
const User = require("../../models/userModel");






const searchUsersHandler = async (req, res) => {
  const { name, userName, bloodGroup, department, roll, admissionSession, from, currentLocation } = req.body;

  const escapeRegex = (string) => {
    const words = string.split(/\s+/).filter(word => word);
    const regexPattern = words.map(word => `(?=.*${escapeRegExp(word)})`).join('');
    return new RegExp(regexPattern, 'i');
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const searchCriteria = {};

  if (name) searchCriteria.name = { $regex: escapeRegex(name) };
  if (bloodGroup) searchCriteria["info.bloodGroup"] = { $regex: bloodGroup, $options: "i" };
  if (department) searchCriteria["info.department"] = { $regex: department, $options: "i" };
  if (roll) searchCriteria["info.roll"] = roll;
  if (admissionSession) searchCriteria["info.admissionSession"] = { $regex: admissionSession, $options: "i" };
  if (from) searchCriteria["info.from"] = { $regex: from, $options: "i" };
  if (currentLocation) searchCriteria["info.currentLocation"] = { $regex: currentLocation, $options: "i" };

  try {
    const projection = {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
    };

    // console.log("Search Criteria:", searchCriteria);

    const users = await User.find(searchCriteria, projection).select('-password').limit(10);

    const processedUsers = users.map(user => {
      const matchedParts = {};
      if (name && user.name) {
        const regex = new RegExp(name, 'i');
        const match = user.name.match(regex);
        if (match) {
          matchedParts.name = {
            startIndex: match.index,
            endIndex: match.index + match[0].length,
          };
        }
      }
      // Add similar processing for other fields like userName, bloodGroup, etc.

      return { ...user._doc, matchedParts };
    });

    // console.log("Processed Users:", processedUsers);

    return res.status(200).json({ searchQuery: req.body, users: processedUsers });
  } catch (error) {
    return res.status(500).json({ error: "Error searching users." });
  }
};

module.exports = { searchUsersHandler };







// const searchUsersHandler = async (req, res) => {
//   const { name, userName, bloodGroup, department, roll, admissionSession, from, currentLocation } = req.body;
//   console.log(req.body);

//   // Construct the search criteria dynamically
//   const searchCriteria = {};

//   if (name) searchCriteria.name = { $regex: name, $options: "i" };
//   if (userName) searchCriteria.userName = { $regex: userName, $options: "i" };
//   if (bloodGroup) searchCriteria["info.bloodGroup"] = { $regex: bloodGroup, $options: "i" };
//   if (department) searchCriteria["info.department"] = { $regex: department, $options: "i" };
//   if (roll) searchCriteria["info.roll"] = roll;
//   if (admissionSession) searchCriteria["info.admissionSession"] = { $regex: admissionSession, $options: "i" };
//   if (from) searchCriteria["info.from"] = { $regex: from, $options: "i" };
//   if (currentLocation) searchCriteria["info.currentLocation"] = { $regex: currentLocation, $options: "i" };

//   try {
//     const projection = {
//       password: 0, // Exclude password field from the response
//       createdAt: 0, // Exclude createdAt field from the response
//       updatedAt: 0, // Exclude updatedAt field from the response
//     };

//     const users = await User.find(searchCriteria, projection).select('-password').limit(10); // Limit the number of results to 10

//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(500).json({ error: "Error searching users." });
//   }
// };
