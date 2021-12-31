const router = require("express").Router();
const User = require("../models/User");

// user 등록
// postman1.png 참고
// {
//     "username": "hojun",
//     "email": "paullabkorea@gmail.com",
//     "password": "hojun1234"
// }

router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password, // 나중에 수정
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;