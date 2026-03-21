const axios=require('axios');

const getLanguageById=(lang)=>{
    const languages = {
        "c++": 54,
        "java": 62,
        "python": 71,
        "javascript": 63,
        "ruby": 72,
    }
    return languages[lang.lowerCase()] || null; // Return null if language not found
}

const submitBatch=async(submissions)=>{
    // Implement the logic to submit the batch of code submissions to the Judge0 API
    // You can use axios or any HTTP client to make the API requests 
    const axios = require("axios");

    const options = {
        method: "POST",
        url: "http://localhost:2358/submissions/batch",
        params: {
        base64_encoded: "false",
    },
    headers: {
        "Content-Type": "application/json",
    },
    data: {
        submissions
        },
    };

    async function sendBatch() {
    try {
        const res = await axios.request(options);
        return res.data;
        console.log(res.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
    }
}
   return await sendBatch();
    //why do we axios
    //ftech =>jsobnject but it auto trnaslate to json
    //promise result req not fullfill code error auto
}
module.exports={getLanguageById,submitBatch};