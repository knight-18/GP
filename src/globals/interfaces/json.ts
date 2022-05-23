interface JSONError {
  success: false;
  error: string;
}

interface JSONSuccess {
  success: true;
  message: string;
}

interface JSONSuccessWithData {
  success: true;
  message: any;
}

export { JSONError, JSONSuccess, JSONSuccessWithData };
