import AWS_Ops from "../../utils/AWS_S3";

describe("Testing AWS_S3 utility", () => {
    test("Testing AWS_Ops class", () => {
        const file = new Blob(["file content"], { type: "image/png" });
        const fileName = "fileName";

        const upload = (AWS_Ops.prototype.uploadToS3 = jest.fn());
        const aws = new AWS_Ops();

        aws.uploadToS3(file);
        expect(upload).toBeCalled();
        expect(upload).toBeCalledWith(file);

        const url = aws.getUrl(fileName);
        expect(url).toBeDefined();
        // must be a url ending with the given fileName
        expect(url).toMatch(/(https:\/\/).*fileName$/);
    });
});
