import fs, { appendFile, writeFile } from 'fs'



class Product {
    constructor(title, description, price, thumbnail, code, stock){
        if(
            title === undefined || 
            description === undefined || 
            price === undefined || 
            thumbnail === undefined || 
            code === undefined || 
            stock === undefined){
                throw new Error("TODOS LOS PARAMETROS SON OBLIGATORIOS")
        }
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = null
    }
}

class ProductManager {
    constructor(file){
        this.products = []
        this.id = 0
        this.file = file;
    }

     async addProduct  (title, description, price, thumbnail, code, stock) {
        try {
            const product = new Product(title, description, price, thumbnail, code, stock)
            if(this.products.some( p => p.code === product.code)){
                return console.log("YA EXISTE UN ELEMENTO CON EL MISMO CODIGO")
            }
            product.id = this.id    
            this.products.push(product)
            this.id = this.id+1
            
            const data = JSON.stringify(this.products);
            await fs.promises.writeFile(this.file, data);
                console.log("Producto agregado correctamente");
        
            

        } catch (error) {
            console.error(`Error al crear el objeto: ${error.message}`)
        }        
    }

    async getProducts (limit){
        
        const data = await fs.promises.readFile(this.file, 'utf-8');
        const productsParsed = JSON.parse(data);
        return limit === 0 ? productsParsed : productsParsed.slice(0,limit);
        
    }

     async getProductById(id){
        const products = await fs.promises.readFile(this.file, 'utf-8');
        const parsedProducts = await JSON.parse(products);
        this.products = parsedProducts;
        
        const product = this.products.find(p => p.id === +id)
        return product;
    }

    async deleteProductById(id){
        const index = this.products.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            const data = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.file, data);
            console.log("Producto eliminado correctamente");   
        }
        else{ 
            console.log("Producto no encontrado");
        }
        return this.products;
    }

    async updateProduct(id, modification) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex], ...modification };
            this.products[productIndex] = updatedProduct;

            const data = JSON.stringify(this.products);

            try {
                await fs.promises.writeFile(this.file, data);
                console.log("Producto actualizado correctamente");
            } catch (error) {
                console.error("Error al actualizar el producto:", error);
            }
        } else {
            throw new Error("Producto no encontrado");
        }
    }
}
    
    


export default ProductManager;


//   let productManager = new ProductManager('./productos.json')

//  await productManager.addProduct("pera", "fruta", 100, "http", 15, 1)
//  await productManager.addProduct("manzana", "fruta", 100, "http", 16, 1)
//  await productManager.addProduct("banana", "fruta", 100, "http", 17, 1)
//    console.log(await productManager.getProducts(1))
// await productManager.deleteProductById(0)
// await productManager.updateProduct(1, { 
//     title: 'audi a3 ',
//     price: 30000, 
//     description: 'auto'
// })
// await productManager.getProducts()



