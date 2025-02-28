
const router = require('express').Router();
const { getAllUsers, getUserById } = require('../controllers/users');

const User = require('../models/users');

router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.post('/users', async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = new User({ name, about, avatar });

    if (!user === 'usuario no encontrado') {
      return res.status(404).send({ message: 'usuario no encontrado' });
    }
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener el usuario' });
  }
});
router.patch('/users/me', async (req, res) => {
  try {
    console.log(req.user);
    const { name, about, avatar } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    user.name = name;
    user.about = about;
    user.avatar = avatar;
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Error al actualizar el perfil' });
  }
});

router.patch('/users/me/avatar', async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    user.avatar = avatar;
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: 'Error al actualizar el avatar' });
  }
});
module.exports = router;


