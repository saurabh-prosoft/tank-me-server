import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";

import { Desert } from "./rooms/Desert";
import { Lobby } from "./rooms/Lobby";

export default config({
  initializeGameServer: (gameServer) => {
    gameServer.define("lobby", Lobby);
    gameServer.define("desert", Desert).enableRealtimeListing();
  },

  initializeExpress: (app) => {
    if (process.env.NODE_ENV !== "production") {
      app.use("/", playground);
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use("/colyseus", monitor());
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  },
});
