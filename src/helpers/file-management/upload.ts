import aws from "aws-sdk";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";

const s3 = new aws.S3({
  accessKeyId: config.aws_access_key_id,
  secretAccessKey: config.aws_secret_access_key,
});

const uploadFile = (file: any) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: config.aws_s3_bucket + "",
    Body: fileStream,
    Key: `${uuidv4()}-${file.filename}`,
  };

  s3.upload(uploadParams)
    .promise()
    .then(() => fs.unlink(file.path, () => {}));

  return uploadParams.Key;
};

export default uploadFile;
