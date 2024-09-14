const parseEnv = () => {
    let result = "";
    Object.keys(process.env).forEach((name) => {
        if (name.slice(0,4) === "RSS_") {
            result = `${result}${name}=${process.env[name]}; `
        }
    })
    if (result) console.log(result);
};

parseEnv();