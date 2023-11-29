import { HttpRedirectResponse, HttpStatus } from "@nestjs/common"

export interface ImessageHandler {
      message: string
      success: boolean
      statusCode: number
      data: object
}

export const messageHandler = (message: string, success: boolean, statusCode: number, data: object): ImessageHandler => {
      return {message, success, statusCode, data}
}