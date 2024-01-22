const { Router } = require("express");
const { ProductModel } = require("../models/product.model");
const {productAuth} = require("../middleware/productauth.middleware");


const productRouter = Router();
// productRouter.use(productAuth);

productRouter.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || {}; // default to page 1
        const limit = parseInt(req.query.limit) || {}; // default to limit of 10 products per page
        const skipIndex = (page - 1) * limit;
        const searchQuery = {};
        const sortField = {};
        if (req.query.sort) {
            let a = req.query.sort.split(" ");
            sortField[`${a[0]}`] = `${a[1]}`
        }
        if (req.query.category) {
            searchQuery.category = { $regex: req.query.category, $options: 'i' };
        }
        if (req.query.brand) {
            searchQuery.brand = { $regex: req.query.brand, $options: 'i' };
        }
        if (req.query.healthConcerns) {
            searchQuery.healthConcerns = { $regex: req.query.healthConcerns, $options: 'i' };
        }
        if (req.query.title) {
            searchQuery.title = { $regex: req.query.title, $options: 'i' };
        }
        const data = await ProductModel.find(searchQuery);
        const products = await ProductModel.find(searchQuery).sort(sortField).skip(skipIndex).limit(limit);
        res.set({
            'X-Total-Count' :data.length,
            'Access-Control-Expose-Headers':'X-Total-Count'
        })
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
})
productRouter.get("/:id",async(req,res)=>{
    let {id} = req.params;
    let data = await ProductModel.findById(id);
    res.status(200).send(data);
})

productRouter.post("/add", async (req, res) => {
    try {
        let product = new ProductModel(req.body);
        await product.save();
        res.status(200).send({ "data": product, "msg": "product added successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

productRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await ProductModel.findByIdAndUpdate(id, req.body);
        res.status(200).send({ "msg": "product updated successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

productRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await ProductModel.findByIdAndDelete(id);
        res.status(200).send({ "msg": "product deleted successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

module.exports = { productRouter };