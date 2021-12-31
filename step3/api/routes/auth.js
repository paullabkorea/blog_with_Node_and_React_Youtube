const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// user 등록
// postman1.png 참고
// {
//     "username": "hojun",
//     "email": "paullabkorea@gmail.com",
//     "password": "hojun1234"
// }

// bcrypt test
// {
//     "username": "gildong",
//     "email": "paullabkorea@gmail.com",
//     "password": "gildong1234"
// }

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass, // 수정 완료
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 로그인
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

        // res.status(200).json(user);
        
        // const { password, ...others } = user;
        // res.status(200).json(others);
        
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;