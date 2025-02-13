const aiService = require('../Services/ai.service.js');

module.exports.getReview= async (req, res) => {
    const code = await  req.body.code;
    
    try {
        if(!code) {
            res.status(400).send('Prompt is required');
            return;
        } 
        const response = await aiService(code);
        res.send(response);
    } catch (error) {   
        res.status(500).send(error.message);
    }
};   


// const { generateContentWithRetry } = require('../Services/ai.service');

// async function getReview(req, res) {
//     const code = req.body.code;
//   try {
//     const options = { code };
//     const content = await generateContentWithRetry(options);
//     res.json(content);
//   } catch (error) {
//     res.status(error.status || 500).json({ message: error.message });
//   }
// }

// module.exports = {
//   getReview,
// };