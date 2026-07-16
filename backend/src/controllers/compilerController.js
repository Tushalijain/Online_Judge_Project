const generateFile = require("../services/generateFile");
const executeCode = require("../services/executeService");

exports.runCode = async (req, res) => {
    try {
        const { language, code, input } = req.body;

        // Validation
        if (!language || !code) {
            return res.status(400).json({
                success: false,
                message: "Language and code are required."
            });
        }

        // Create source file
        const filePath = await generateFile(language, code);

        // Execute the program
        const output = await executeCode(language, filePath, input || "");

        return res.status(200).json({
            success: true,
            output
        });

    } catch (error) {
        console.error("Compiler Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};