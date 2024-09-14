import {writeFile, access, constants} from "fs";
const create = async () => {
    const filePath = `${import.meta.dirname}/files/fresh.txt`;
    access(filePath, constants.F_OK, (err) => {
        // file exist
        if (!err) throw new Error("FS operation failed");
        writeFile(filePath,"I am fresh and young", "utf-8", (err) => {
            if (err) console.log(err);
        });
    });

};

await create();