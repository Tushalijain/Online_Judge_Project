const fs = require("fs");

const cleanupFiles = (...files) => {
    files.forEach((file) => {
        try {
            if (file && fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        } catch (err) {
            console.log("Cleanup warning:", err.message);
        }
    });
};

module.exports = cleanupFiles;