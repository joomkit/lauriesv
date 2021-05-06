const { API2PDF_API_KEY } = process.env;

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: API2PDF_API_KEY,
    };
};
