import OdooJSONRpc from "./cli.js";
import type {
  OdooAuthenticateWithApiKeyResponse,
  OdooAuthenticateWithCredentialsResponse,
} from "./types.js";

export const Try = async <T>(
  fn: () => Promise<T>,
): Promise<[T, null] | [null, Error]> => {
  try {
    const result = await fn();
    return [result, null];
  } catch (e) {
    const error = e as Error;
    return [null, error];
  }
};
/**
 * Type guard to determine if the authentication response is a full credentials response.
 *
 * This function distinguishes between the two possible authentication response types:
 * - OdooAuthenticateWithCredentialsResponse (full response with user details)
 * - OdooAuthenticateWithApiKeyResponse (simple response with just the user ID)
 *
 * It checks for the presence of the 'username' property, which is only available
 * in the full credentials response.
 *
 * @param response - The authentication response to check
 * @returns true if the response is a full credentials response, false otherwise
 *
 * @example
 * const authResponse = await odoo.connect();
 * if (isCredentialsResponse(authResponse)) {
 *   console.log("Authenticated user:", authResponse.username);
 * } else {
 *   console.log("Authenticated with API key, user ID:", authResponse.uid);
 * }
 */
export const isCredentialsResponse = (
  response:
    | OdooAuthenticateWithCredentialsResponse
    | OdooAuthenticateWithApiKeyResponse,
): response is OdooAuthenticateWithCredentialsResponse => {
  return response && "username" in response;
};

//
export const getConnectedOdooCli = async (params: ConstructorParameters<typeof OdooJSONRpc>) => {
  const cli = new OdooJSONRpc(...params);
  await cli.connect();
  return cli;
};
