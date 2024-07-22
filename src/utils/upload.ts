import path from "path";
import multer from "multer";

export enum UploadType {
  SINGLE,
  MULTIPLE,
}

export const upload = (key: string, type: UploadType) => {
  const storage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const uploadMulter = multer({
    storage,
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  });
  if (type == UploadType.SINGLE) {
    return uploadMulter.single(key);
  } else {
    return uploadMulter.array(key);
  }
};

const checkFileType = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("only accept image"));
  }
};

export default upload;
