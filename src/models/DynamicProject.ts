import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDynamicProject extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  location: string;
  year: string;
  client: string;
  featuredImage: string;
  images: string[];
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const DynamicProjectSchema = new Schema<IDynamicProject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    year: {
      type: String,
      default: '',
      trim: true,
    },
    client: {
      type: String,
      default: '',
      trim: true,
    },
    featuredImage: {
      type: String,
      required: [true, 'Featured image is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
DynamicProjectSchema.index({ slug: 1 });
DynamicProjectSchema.index({ isPublished: 1, order: 1 });
DynamicProjectSchema.index({ category: 1 });
DynamicProjectSchema.index({ isFeatured: 1 });

// Pre-save middleware to auto-generate slug if not provided
DynamicProjectSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Prevent model recompilation error in development
const DynamicProject: Model<IDynamicProject> =
  mongoose.models.DynamicProject ||
  mongoose.model<IDynamicProject>('DynamicProject', DynamicProjectSchema);

export default DynamicProject;