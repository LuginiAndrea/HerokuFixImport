import fs from "fs";
const exceptions = [];

function readDirectory(path, mode) {
    fs.readdir(path, (err, files) => {
        for(const file of files) {
            if(file.includes(".")) {
                if(file.endsWith(".ts") || file.endsWith(".js"))
                    changeImportMultipleLines(path + "/" + file, mode); //Fixes the import adding .js extension
            }
            else 
                readDirectory(path + "/" + file, mode); //Recursive on subfolders
        }
    });
}
       
function changeImportMultipleLines(fileName, mode) { 
    fs.readFile(fileName, "utf8", (err, data) => {
        let lines = data.split("\r\n"); 
        if(lines.length === 1) lines = data.split("\n");
        
        lines.forEach((line, index, arr) => {
            if(line.startsWith("import")) { //Check if it is an import
                if(containsException(line,exceptions) === false) { //And if it contains an exception
                    if(mode === 1) { arr[index] = line.slice(0,-2) + '.js";'; } //Adds the extension
                    else arr[index] = line.replace(".js", ""); //Removes the extension
                }
            }
            else return;            
        });
        fs.writeFile(fileName, lines.join("\n"), () => {})
    });
}

// function changeImport(fileName) {
//     fs.readFile(fileName, "utf8", (err, data) => {
//         const lines = data.split(/\"(.*?)\"/);
//         for(let i = 0; i < lines.length-1; i++) {
//             if(lines[i].startsWith("import"))



function containsException(string, exceptionsStrings) {
    for(const exception of exceptionsStrings) {
        if(string.includes(exception))
            return true;
    }
    return false;
}

readDirectory(process.argv[2], parseInt(process.argv[3]))
