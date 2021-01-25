const Router = require("express")
const router = new Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")

router.post(
  "/registration",
  async (req, res) => {
    try {
      const { email, name, password } = req.body
      const checkIfUserExist = await User.findOne({ where: { email } })
      if (checkIfUserExist) {
        return res.status(400).json({ message: "Такой пользователь уже существует" })
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, name, password: hashedPassword })
      await user.save()
      res.status(201).json({ message: "Пользователь создан" })
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
  })


router.get("/login", async (req, res) => {
  res.send("Login")
})


module.exports = router