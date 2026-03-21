const {getLanguageById,submitBatch}=require('../utils/getLangId');
const createProblem=async(req,res)=>{
    const {title,description,difficulty,tags,visibletestCases,invisibletestCases,startcode,problemCreator,referenceSolution}=req.body;
    
    try {
        for (const { language, initialcode } of referenceSolution) {
        const actlanguage = getLanguageById(language);

        let submissions = [];

    for (const element of visibletestCases) {
      const { input, output } = element;

      submissions.push({
        source_code: initialcode,
        language_id: actlanguage,
        stdin: input,
        expected_output: output,
      });
    }

    console.log(submissions); // debug
    }
    const submitResult=await submitBatch(submissions);

    } catch (error) {
        res.status(500).json({ message: "Error creating problem " + error });
    }
}