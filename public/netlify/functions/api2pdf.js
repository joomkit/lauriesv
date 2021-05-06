const { ENVTEST } = process.env;

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: ENVTEST,
    };
};
