import OdooJSONRpc from "./cli.js";
import { getConnectedOdooCli } from "./utils.js";

//
// Async API
//

//
let cli: OdooJSONRpc | null = null;

/**
 * Returns a connected Odoo CLI instance.
 *
 * @param {Parameters<typeof getConnectedOdooCli>[0]} params - The connection parameters used to initialize the CLI.
 * @param {{ singleton?: boolean }} [options={ singleton: true }] - Options to control CLI instantiation.
 * @param {boolean} [options.singleton=true] - If `true`, returns a singleton instance. If `false`, creates a new connection.
 *
 * @returns {Promise<ReturnType<typeof getConnectedOdooCli>>} A promise that resolves to the connected Odoo CLI instance.
 */
export const getOdooCli = async (params: Parameters<typeof getConnectedOdooCli>[0], { singleton = true }: { singleton?: boolean; } = { singleton: true }) => {
  if (!singleton) {
    return getConnectedOdooCli(params);
  }
  
  //
  if (cli) {
    return cli;
  }

  //
  const cliR = await getConnectedOdooCli(params);
  cli = cliR;
  return cli;
};

//
// Sync API
//

/**
 * Initializes the Odoo CLI connection synchronously using the given parameters.
 *
 * @param {Parameters<typeof getConnectedOdooCli>[0]} params - The parameters required to establish the Odoo CLI connection.
 * 
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 */
export const connectOdooCliSync = async (params: Parameters<typeof getConnectedOdooCli>[0]) => {
  await getOdooCli(params);
}

/**
 * Returns the initialized Odoo CLI instance.
 *
 * @remarks
 * This function assumes that the CLI has already been initialized using {@link connectOdooCliSync}.
 * Make sure to call `connectOdooCliSync()` before using this function.
 *
 * @returns {typeof cli} The initialized CLI instance.
 */
export const getOdooCliSync = () => {
  return cli;
} 