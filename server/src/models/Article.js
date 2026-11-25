import mongoose from 'mongoose';

const quickFactSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const sourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    heroImage: {
      url: { type: String, default: '' },
      altText: { type: String, default: '' },
      credit: { type: String, default: '' },
      caption: { type: String, default: '' },
    },
    quickFacts: { type: [quickFactSchema], default: [] },
    faqs: { type: [faqSchema], default: [] },
    sources: { type: [sourceSchema], default: [] },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ['draft', 'review', 'scheduled', 'published', 'archived'],
      default: 'draft',
    },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    seoTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    canonicalUrl: { type: String, default: '' },
    socialImage: { type: String, default: '' },
  },
  { timestamps: true }
);

articleSchema.index({ title: 'text', excerpt: 'text', body: 'text' });

export default mongoose.model('Article', articleSchema);
