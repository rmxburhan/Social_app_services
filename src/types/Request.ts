import { Request } from "express";
import { UserDocument } from "src/models/user.model";

interface RequestAuth extends Request {
  user: UserDocument;
}

export default RequestAuth;
