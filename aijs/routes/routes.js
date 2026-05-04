import express from "express";
import { AiChatController } from "../controller/AiChatController.js";

export const route = express.Router();

route.post("/aichat",AiChatController.getMessages);