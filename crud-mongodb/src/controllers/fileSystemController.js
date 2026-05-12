import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fileController = {
    writeFile: async (req, res) => {
        const filePath = path.join(__dirname, "../../public/abc.txt");
        fs.writeFile(filePath, 'This is a text message', (err) => {
            if (err) {
                return res.status(500).send("Failed to write file");
            }

            res.send('File written successfully');
        })
    },
    readFile: async (req, res) => {
        const filePath = path.join(__dirname, "../../public/output.txt");

        fs.readFile(filePath, (err, data) => {
            if (err) {
                return res.status(500).send("Failed to read file");
            }

            res.setHeader('Content-Type', 'text/plain');
            res.send(data);
        })

    },
    appendFile: async (req, res) => {
        const filePath = path.join(__dirname, "../../public/output.txt");

        fs.appendFile(filePath, '\nNew Line Added', (err) => {
            if (err) {
                return res.status(500).send("Failed to append file");
            }

            res.send('File appened successfully');

        })
    },
    deleteFile: async (req, res) => {
        const filePath = path.join(__dirname, "../../public/abc.txt");

        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).send("Failed to delete file");
            }

            res.send('File deleted successfully');
        })
    },
    renameFile: async (req, res) => {
        const filePath1 = path.join(__dirname, "../../public/output.txt");
        const filePath2 = path.join(__dirname, "../../public/output-rename.txt");


        fs.rename(filePath1, filePath2, (err) => {
            if (err) {
                return res.status(500).send("Failed to rename file");
            }

            res.send('File rename successfully');
        })
    },

    streamText: async (req, res) => {
        const filePath = path.join(__dirname, "../../public/output-rename.txt");
        const fileStream = fs.createReadStream(filePath)

        fileStream.on('open', () => {
            fileStream.pipe(res)
        })

        fileStream.on('error', () => {
            res.status(500).send("File not found or error reading file.")
        })
    },
    createFolder: async (req, res) => {
        const filePath = path.join(__dirname, "../../public/myFolder");

        fs.mkdir(filePath, (err) => {
            if (err) {
                return res.status(500).send("Error creating folder.")
            }

            res.send("Folder created Successfully")
        })
    },
    renameFolder: async (req, res) => {
        const filePath1 = path.join(__dirname, "../../public/myFolder");
        const filePath2 = path.join(__dirname, "../../public/renameFolder");

        fs.rename(filePath1, filePath2, (err) => {
            if (err) {
                return res.status(500).send("Error renaming folder.", err)
            }

            res.send("Folder renamed Successfully")
        })
    },
    deleteFolder: async (req, res) => {
        const filePath = path.join(__dirname, "../../public/renameFolder");

        fs.rmdir(filePath, (err) => {
            if (err) {
                return res.status(500).send("Error deleting folder.", err)
            }

            res.send("Folder deleted Successfully")
        })
    },

    fileModule: (req, res) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const info = {
            dirName: __dirname,                           // /home/project/controllers
            fileName: __filename,                          // /home/project/controllers/fileController.js
            baseName: path.basename(__filename),           // fileController.js
            extName: path.extname(__filename),            // .js
            onlyName: path.basename(__filename, '.js'),    // fileController
        };

        res.json(info);
    },

    allPathFunctions: (req, res) => {

        const filePath = '/home/project/controllers/fileController.js';

        const result = {

            // 1. join — join paths together
            join: path.join('/home/project', 'controllers', 'fileController.js'),
            // → /home/project/controllers/fileController.js

            // 2. resolve — build absolute path
            resolve: path.resolve('controllers', 'fileController.js'),
            // → /home/project/controllers/fileController.js

            // 3. basename — get filename
            basename: path.basename(filePath),
            // → fileController.js

            // 4. basename without extension
            basenameNoExt: path.basename(filePath, '.js'),
            // → fileController

            // 5. dirname — get directory
            dirname: path.dirname(filePath),
            // → /home/project/controllers

            // 6. extname — get extension
            extname: path.extname(filePath),
            // → .js

            // 7. parse — break path into object
            parse: path.parse(filePath),
            // → { root: '/', dir: '/home/project/controllers', base: 'fileController.js', ext: '.js', name: 'fileController' }

            // 8. format — build path from object
            format: path.format({
                dir: '/home/project/controllers',
                name: 'fileController',
                ext: '.js'
            }),
            // → /home/project/controllers/fileController.js

            // 9. normalize — clean up messy path
            normalize: path.normalize('/home//project/../project/controllers/./fileController.js'),
            // → /home/project/controllers/fileController.js

            // 10. isAbsolute — check if path is absolute
            isAbsolute_true: path.isAbsolute('/home/project/file.js'),   // → true
            isAbsolute_false: path.isAbsolute('./file.js'),               // → false

            // 11. relative — get relative path between two paths
            relative: path.relative('/home/project', '/home/project/controllers/fileController.js'),
            // → controllers/fileController.js

            // 12. sep — OS path separator
            sep: path.sep,
            // → /  (Linux/Mac)  or  \  (Windows)

            // 13. delimiter — OS PATH delimiter
            delimiter: path.delimiter,
            // → :  (Linux/Mac)  or  ;  (Windows)

            // 14. __dirname — current folder
            currentDir: __dirname,
            // → /home/project/controllers

            // 15. __filename — current file full path
            currentFile: __filename,
            // → /home/project/controllers/fileController.js

        };

        res.json(result);
    }
}


export default fileController;