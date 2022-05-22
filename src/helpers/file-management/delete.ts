import aws from "aws-sdk";
import config from "../../config";

const s3 = new aws.S3({
  accessKeyId: config.aws.aws_access_key_id,
  secretAccessKey: config.aws.aws_secret_access_key,
});

const deleteFile = (fileName: string) => {
  const uploadParams = {
    Bucket: config.aws.aws_s3_bucket + "",
    Key: fileName,
  };

  s3.deleteObject(uploadParams, (err, data) => {
    console.log(err);
    console.log(data);
  });

  return "";
};

export default deleteFile;
