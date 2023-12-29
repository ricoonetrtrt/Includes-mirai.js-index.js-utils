module.exports.config = {
    name: "دردشة2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "KENLIEPLAYS",
    description: "قم بالدردشة مع ريم",
    commandCategory: "دردشة",
    usages: "[نص]",
    usePrefix:false,
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("قل شيئا كي نبدأ الدردشة...", tid, mid);
    try {
        const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ph&message=${content}&filter=false`);
        const respond = res.data.success;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("حدث خطأ أثناء جلب البيانات.", tid, mid);
    }
};