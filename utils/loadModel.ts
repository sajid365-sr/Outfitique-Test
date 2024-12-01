import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

export const loadModel = async () => {
  const model = await cocoSsd.load();
  return model;
};
