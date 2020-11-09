export const ERROR_CONTENT_IDENTIFIER = "ERROR_CONTENT";

export function setErrorData(errorMessageToUser){
  return {
    type: ERROR_CONTENT_IDENTIFIER,
    errorMessageToUser,
  }


}