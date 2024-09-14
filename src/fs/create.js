import { writeFile, access, constants } from "fs";
const create = async () => {
    const filePath = `${import.meta.dirname}/files/fresh.txt`;

    await access(filePath, constants.R_OK, (err) => {
        // file exist
        if (!err) throw new Error("FS operation failed");
    });

    await writeFile(filePath,"I am fresh and young", "utf-8", (err) => {
        if (err) console.log(err);
    });
};

await create();