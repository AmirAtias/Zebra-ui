import API from "./API";

const sendLog = (level, msg) => {
  API.post("/sendLogs", {
    msg: msg,
    level: level,
  });
};
export default sendLog;
