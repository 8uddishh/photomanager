import crypto from "crypto"
import { constants } from "./../constants"

export const sha256Hash = (plainText) => crypto.createHmac("sha256", constants.hashSalt )
                                                .update(plainText).digest('base64')
