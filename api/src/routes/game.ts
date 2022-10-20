import { Router } from "express";
import { init } from "../services/game";

const router = Router();

router.get(`/init`, async (req, res) => {
  const data = await init();
  res.send(data);
});

export default router;
