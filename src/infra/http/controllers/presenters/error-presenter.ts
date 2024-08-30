interface ErrorPresenterParams {
  errorCode: string
  errorDescription: string
}

export class ErrorPresenter {
  static toHttp({ errorCode, errorDescription }: ErrorPresenterParams) {
    return {
      error_code: errorCode,
      error_description: errorDescription,
    }
  }
}
