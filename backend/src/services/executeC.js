const { spawn } = require("child_process");
const path = require("path");
const cleanupFiles = require("../utils/cleanupFiles");

const executeC = (filePath, input = "") => {

    const dir = path.dirname(filePath);
    const executable = process.platform === "win32" ? "Main.exe" : "Main";

    return new Promise((resolve, reject) => {

        // Compile C
        const compile = spawn("gcc", [
            filePath,
            "-o",
            path.join(dir, executable)
        ]);

        let compileError = "";

        compile.stderr.on("data", (data) => {
            compileError += data.toString();
        });

        compile.on("close", (code) => {

            if (code !== 0) {

                cleanupFiles(filePath);

                const VERDICTS = require("../constants/verdicts");

                return reject({
                    type: VERDICTS.COMPILATION_ERROR,
                    message: "Compilation failed."
                });
            }

            // Run executable
            const execute = spawn(path.join(dir, executable));

            const timeout = setTimeout(() => {

                execute.kill();

                cleanupFiles(
                    filePath,
                    path.join(dir, executable)
                );

                return reject({
                    type: "Time Limit Exceeded",
                    message: "Program exceeded 2 seconds."
                });

            }, 2000);

            let output = "";
            let runtimeError = "";

            execute.stdout.on("data", (data) => {
                output += data.toString();
            });

            execute.stderr.on("data", (data) => {
                runtimeError += data.toString();
            });

            execute.stdin.write(input);
            execute.stdin.end();

            execute.on("close", (runCode) => {

                clearTimeout(timeout);

                cleanupFiles(
                    filePath,
                    path.join(dir, executable)
                );

                if (runCode !== 0) {

                    return reject({
                        type: "Runtime Error",
                        message: runtimeError || "Runtime Error"
                    });

                }

                resolve(output);

            });

        });

    });

};

module.exports = executeC;