export const dateFormat = (date) => {
    if (date) {
        let res = date.split("-");
        let format = res[2] + "/" + res[1] + "/" + res[0];
        return format;
    } else {
        return null;
    }
};
