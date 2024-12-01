import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { InferenceSession } from "@huggingface/inference";

export async function detectClothing(image: HTMLImageElement) {
  try {
    const model = await cocoSsd.load();
    const predictions = await model.detect(image);
    return predictions.filter(
      (item) =>
        item.class === "shirt" ||
        item.class === "pants" ||
        item.class === "dress" ||
        item.class === "skirt" ||
        item.class === "shoes"
    );
  } catch (error) {
    console.error("Error detecting clothing:", error);
    return [];
  }
}

const session = new InferenceSession({
  model: "huggingface/DeepFashion", // Replace with your model path
});

export async function suggestOutfits(clothingItems: string[]) {
  try {
    const response = await session.run({
      inputs: { items: clothingItems },
    });
    return response.suggestions; // Adjust based on your model's output
  } catch (error) {
    console.error("Error suggesting outfits:", error);
    return [];
  }
}
