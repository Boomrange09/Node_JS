const express = require('express');
const router = express.Router();
const {handleGetAllUsers, handleCreateUser, handleGetUser, handleUpdateUser, handleDeleteUser} = require('../controllers/user');

//Routes
// router.get('/users', async (req,res) => {
//     const allDBUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allDBUsers.map((user) => `<li>${user.first_name}</li>`).join('')}
//     </ul>
//     `
//     return res.send(html);
// });

router.route('/').get(handleGetAllUsers).post(handleCreateUser);

router.route('/:id').get(handleGetUser).patch(handleUpdateUser).delete(handleDeleteUser);

module.exports = router;