import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user";

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verifyCode: { type: String, require: true },
  verified: { type: Boolean, default: false },
  ongsParticipo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ong",
    },
  ],
});

const User = model<IUser>("User", userSchema);

export default User;
