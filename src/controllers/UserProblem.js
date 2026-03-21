const { getLanguageById, submitBatch, submitToken } = require('../utils/getLangId');
const Problem = require('../models/problem');

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    visibletestCases,
    invisibletestCases,
    startcode,
    problemCreator,
    referenceSolution
  } = req.body;

  try {
    let submissions = [];

    // 🔥 build submissions
    for (const { language, initialcode } of referenceSolution) {
      const actlanguage = getLanguageById(language);

      for (const element of visibletestCases) {
        const { input, output } = element;

        submissions.push({
          source_code: initialcode,
          language_id: actlanguage,
          stdin: input,
          expected_output: output,
        });
      }
    }

    console.log(submissions);
  console.log("hello1");

    // 🔥 submit to Judge0
    console.log("hello2");
    const submitResult = await submitBatch(submissions);
    console.log("hello3");
    console.log("submitResult:", submitResult);
    // 🔥 extract tokens
    const resultToken = submitResult.map((value) => value.token);

    // 🔥 get results
    const testResults = await submitToken(resultToken);
    console.log("testResults:", testResults);

    // 🔥 validate results
    for (const test of testResults.submissions) {
      if (test.status.id !== 3) {
        return res.status(400).json({
          message: "Reference solution failed on visible test cases"
        });
      }
    }

    // 🔥 create problem in DB
    const newProblem = new Problem({
        ...req.body,
        problemCreator: req.result._id
    });

    // ✅ success
    return res.status(201).json({
      message: "Problem created successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error creating problem " + error.message,
    });
  }
};

module.exports ={ createProblem };