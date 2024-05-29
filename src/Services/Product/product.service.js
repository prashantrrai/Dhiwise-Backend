const Product = require("../../Models/Product/product.model");

const GetProducts = async () => {
    try {
        const productData = await Product.find();
        return productData;
    } catch (error) {
        console.error("ERROR IN GetProducts SERVICE:", error);
        throw error;
    }
}

const GetProductById = async (Id) => {
    try {
        const productData = await Product.findById(Id);
        return productData;
    } catch (error) {
        console.error("ERROR IN GetProductById SERVICE:", error);
        throw error;
    }
}

const GetProductByIds = async (Id) => {
    try {
        const productData = await Product.findById(Id);
        return productData;
    } catch (error) {
        console.error("ERROR IN GetProductById SERVICE:", error);
        throw error;
    }
}

const CreateProducts = async (productData) => {
    try {
        const { name, description, price, stock, category, supplier, reviews } = productData;

        const existingProduct = await Product.findOne({ name: name });

        // Checking if product is already created.
        if (existingProduct) {
            throw new Error('Product is already Present');
        }

        // Create and save the product in a single step
        const result = await Product.create({
            name: name,
            description: description,
            price: price,
            stock: stock,
            category: category,
            supplier: supplier,
            reviews: reviews
        });

        return result;
    } catch (error) {
        console.error('ERROR IN CreateProducts SERVICE:', error);
        throw error;
    }
};

const EditProduct = async (id, productData) => {
    try {
        const { name, description, price, stock, category, supplier, reviews } = productData;
        const product = await Product.findById(id);

        // Product exists, proceed with edit
        if (!product) {
            throw new Error('Sorry, product not found');
        }

        // Update product data
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.category = category;
        product.supplier = supplier;
        product.reviews = reviews;

        return updatedProduct = await product.save();

    } catch (error) {
        console.error('ERROR IN EditProduct SERVICE:', error);
        throw error;
    }
}

const RemoveProduct = async (id) => {
    try {
        const product = await Product.findById(id);

        if (!product) {
            throw new Error('Sorry, product not found');
        }

        // Product exists, proceed with deletion
        return await Product.findByIdAndDelete(id);

    } catch (error) {
        console.error('ERROR IN RemoveProduct SERVICE:', error);
        throw error;
    }
}

module.exports = { GetProducts, GetProductById, GetProductByIds, CreateProducts, EditProduct, RemoveProduct };