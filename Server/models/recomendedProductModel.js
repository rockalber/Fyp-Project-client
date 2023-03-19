import mongoose from 'mongoose';

const SearchProdctSchema = new mongoose.Schema({
  text: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});
// { type: Array, required: true, }

const SearchProductModel = mongoose.model('Recommende-Product', SearchProdctSchema);

export default SearchProductModel;