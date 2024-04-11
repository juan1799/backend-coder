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
    constructor(){
        this.products = []
        this.id = 0
    }

    addProduct(title, description, price, thumbnail, code, stock){
        try {
            const product = new Product(title, description, price, thumbnail, code, stock)
            if(this.products.some( p => p.code === product.code)){
                return console.log("YA EXISTE UN ELEMENTO CON EL MISMO CODIGO")
            }
            product.id = this.id    
            this.products.push(product)
            this.id = this.id + 1
        } catch (error) {
            console.error(`Error al crear el objeto: ${error.message}`)
        }        
    }

    getProducts(){
        console.table(this.products)
    }
    // getProductById(id){
    //     const product = this.products.find(p => p.id === id)
    //     product != undefined ? console.log(product) : console.log("Not Found");
    // }
    deleteProductById(id){
        const index = this.products.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
        return this.products;
    }
}



let productManager = new ProductManager()

productManager.addProduct("pera", "fruta", 100, "http", 15, 1)
productManager.addProduct("manzana", "fruta", 100, "http", 16, 1)
productManager.addProduct("banan", "fruta", 100, "http", 17, 1)
productManager.getProducts()
productManager.deleteProductById(0)
productManager.getProducts()
