import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteImage extends Document {
  _id: mongoose.Types.ObjectId;
  key: string;
  url: string;
  alt: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteImageSchema = new Schema<ISiteImage>(
  {
    key: {
      type: String,
      required: [true, 'Key is required'],
      unique: true,
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    alt: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SiteImage: Model<ISiteImage> =
  mongoose.models.SiteImage || mongoose.model<ISiteImage>('SiteImage', SiteImageSchema);

export default SiteImage;
