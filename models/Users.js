const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Por favor añade un correo '],
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: [true, 'Por favor añade una contraseña '],
      minlength: 6,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash contraseña antes de salvarla
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// // Generar JWT token
// UserSchema.methods.generateAuthToken = function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, 'yourSecretKey');
//   return token;
// };

// Verificar password
UserSchema.methods.verifyPassword = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
