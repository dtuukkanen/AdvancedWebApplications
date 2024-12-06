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
        //const imgPath: string = "/images/" + req.file.filename;
        const imgPath = req.file.path.replace("public", "");
        const image: IImage = new Image({
          filename: req.file.filename,
          path: imgPath,
        });
        const savedImage = await image.save();
        imageId = savedImage._id;
      }

      const offer: IOffer = new Offer({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageId: imageId,
      });

      // Save offer
      await offer.save();
      return void res.status(201).json({ message: "Offer saved successfully" });
    } catch (error: any) {
      console.error("Error saving offer:", error);
      return void res.status(500).json({ message: "Internal server error" });
    }
  },
);

router.get("/offers", async (req: Request, res: Response) => {
  try {
    // Get all offers
    const offers: IOffer[] = await Offer.find();

    // Create an array to store the offers with image information
    const offersWithImages = await Promise.all(
      offers.map(async (offer: IOffer) => {
        // If the offer has an imageId, fetch the image corresponding image
        if (offer.imageId) {
          const image: IImage | null = await Image.findById(offer.imageId);
          if (image) {
            return {
              title: offer.title,
              description: offer.description,
              price: offer.price,
              imagePath: image.path,
            };
          }
        }
        return {
          title: offer.title,
          description: offer.description,
          price: offer.price,
        };
      }),
    );

    return void res.status(200).json(offersWithImages);
  } catch (error: any) {
    console.error("Error fetching offers:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
