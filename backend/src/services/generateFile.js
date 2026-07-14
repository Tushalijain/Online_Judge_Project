const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "../temp/codes");

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language, code) => {

    const jobId = uuid();

    // Java needs Main.java inside its own folder
    if (language === "java") {

        const jobDir = path.join(dirCodes, jobId);

        await fs.promises.mkdir(jobDir, { recursive: true });

        const filePath = path.join(jobDir, "Main.java");

        await fs.promises.writeFile(filePath, code);

        return filePath;
    }

    let extension;

    switch (language) {
        case "python":
            extension = "py";
            break;

        case "cpp":
            extension = "cpp";
            break;

        case "c":
            extension = "c";
            break;

        default:
            throw new Error("Unsupported language");
    }

    const fileName = `${jobId}.${extension}`;
    const filePath = path.join(dirCodes, fileName);

    await fs.promises.writeFile(filePath, code);

    return filePath;
};

module.exports = generateFile;