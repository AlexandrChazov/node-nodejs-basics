import { join } from "node:path";
import { watchFile, watch } from "node:fs";

// с помощью данных утилит можно отслеживать изменения в файлах

const sourcePath = join(import.meta.dirname, "file", "changeMe.txt")


// первый вариант
watch(sourcePath,  () => {
	console.log("file changes");
});


/*
второй вариант
watch(sourcePath,  () => {
	console.log("file changes");
}).on("change", () => {
	console.log("file changes 2");
});
*/


/*
третий вариант
watchFile(sourcePath,  () => {
	console.log("file changes")
});
*/
