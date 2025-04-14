import app from "./app";
import { config } from "./config";

app.listen(config.port, () => {
  console.log(`✅ API running at http://localhost:${config.port}`);
});
