class ResponseHelper {
  static success(res, statusCode, message, data = null, metadata = null) {
    const response = {
      success: true,
      message,
    };
    if (data !== null) {
      response.data = data;
    }
    if (metadata !== null) {
      response.metadata = metadata;
    }
    return res.status(statusCode).json(response);
  }

  static error(res, statusCode, message, errors = null) {
    const response = {
      success: false,
      message,
    };
    if (errors !== null) {
      response.errors = errors;
    }
    return res.status(statusCode).json(response);
  }
}

module.exports = ResponseHelper;
