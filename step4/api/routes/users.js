const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// UPDATE
// postman4 참고! url 조심!
// put localhost:8080/api/users/61ceb1fabbd987a0f6a207b8
// {
//     "userId": "61ceb1fabbd987a0f6a207b8",
//     "username": "gildongupdate",
//     "password": "gildong12345"
// }
router.put("/:id", async (req, res) => {
    // 다른 사용자가 내 id를 못 건드리게 params.id와 body.userId를 구별!
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true } // 이거 안하면 반영 안됩니다.
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        // 다른 사용자가 내 id를 못 건드리게 params.id와 body.userId를 구별! 
        res.status(401).json("You can update only your account!");
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                // 유저를 삭제하기 전에 유저가 작성한 모든 포스트 먼저 삭제
                await Post.deleteMany({ username: user.username });
                // 그 다음에 유저 삭제
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found!");
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
});

//GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}); 

module.exports = router;