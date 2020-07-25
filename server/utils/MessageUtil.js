const moment = require("moment");

const formatMessage = (username, text) => {
    return {
        user: username,
        text: text,
        time: moment().format("h:mm:ss a"),
    };
};

module.exports = formatMessage;
