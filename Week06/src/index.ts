import { Request, Response, Router } from "express";
import { compile } from "morgan";
import { IOffer, Offer } from "./models/Offer";
import { Image, IImage } from "./models/Image";
import upload from "./middleware/multer-config";

const router: Router = Router();

router.post(
  "/upload",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      let imageId;

      // If there's an uploaded file, save it to the Image collection
      if (req.file) {
        const image = new Image({
          filename: req.file.filename,
          path: req.file.path,
        });
        const savedImage = await image.save();
        imageId = savedImage._id;
      }

      const offer: IOffer = new Offer({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        ...(req.file ? { imageId: imageId } : {}),
      });

      // Save offer
      await offer.save();
      console.log("Offer saved!");
      return void res.status(201).json({ message: "Offer saved successfully" });
    } catch (error: any) {
      console.error("Error saving offer:", error);
      return void res.status(500).json({ message: "Internal server error" });
    }
  },
);

export default router;
