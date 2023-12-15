import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {type : String},
        details: {type : String},
        image: {type : String},
        availability: {type: Boolean},
        category: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Category',
		},
    }
)

const Product = mongoose.model("Product", productSchema)
export default Product