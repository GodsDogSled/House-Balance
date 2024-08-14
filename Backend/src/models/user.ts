
// import mongoose from "mongoose"

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   paymentGroups: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'PaymentGroup'
//     }
//   ],
// })

// userSchema.set('toJSON', {
//   transform: (_document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//     // the passwordHash should not be revealed
//     // delete returnedObject.passwordHash
//   }
// })

// const User = mongoose.model('User', userSchema)


// export default User
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    password: { type: String, required: true },
    paymentGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentGroup'
      }
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as unknown as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;