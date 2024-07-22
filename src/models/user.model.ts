import { Document, Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { omit } from "ramda";

export interface UserDocument extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;

  comparePassword(password: string): boolean;
  hashPassword(): Promise<string>;
  hidePassword(): any;
}

export interface UserQuery extends Document {
  name?: string;
  username?: string;
  email?: string;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      min: 4,
      max: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        reject(err1);
        return;
      }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) {
          reject(err2);
          return;
        }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

userSchema.methods.hidePassword = function () {
  return omit(["password", "__v", "_id"], this.toObject({ virtuals: true }));
};

export const User: Model<UserDocument> = model<UserDocument>(
  "User",
  userSchema
);

export default User;
