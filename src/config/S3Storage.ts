import { S3 } from "aws-sdk";
import path from "path";
import multerConfig from "../config/multer";
import fs from "fs";
import mime from "mime";

export default class S3Storage {
  private client: S3;
  constructor() {
    this.client = new S3({
      region: "us-east-1",
      credentials: {
        accessKeyId: "AKIASOEG2B3WT234CDPX",
        secretAccessKey: "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",
      },
    });
  }

  async saveFile(fileName: string, bucket: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, fileName);

    const ContentType = mime.lookup(originalPath);

    if (!ContentType) {
      throw new Error("file not found");
    }
    const fileContent = await fs.promises.readFile(originalPath);

    this.client
      .putObject({
        Bucket: bucket,
        Key: fileName,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();
    await fs.promises.unlink(originalPath);
  }
}
