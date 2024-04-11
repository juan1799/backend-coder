import fs, { appendFile, writeFile } from 'fs'

const STORAGE = './productos.txt';

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

     async addProduct  (title, description, price, thumbnail, code, stock) {
        try {
            const product = new Product(title, description, price, thumbnail, code, stock)
            if(this.products.some( p => p.code === product.code)){
                return console.log("YA EXISTE UN ELEMENTO CON EL MISMO CODIGO")
            }
            product.id = this.id    
            this.products.push(product)
            this.id = this.id+1
            
            const data = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(STORAGE, data);
                console.log("Producto agregado correctamente");
        
            

        } catch (error) {
            console.error(`Error al crear el objeto: ${error.message}`)
        }        
    }

    async getProducts (){
        
        const data = await fs.promises.readFile(STORAGE, 'utf-8');
        const products = JSON.parse(data);
        this.products = products;
        console.table(this.products)
        
    }
    getProductById(id){
        const product = this.products.find(p => p.id === id)
        product != undefined ? console.log(product) : console.log("Not Found");
    }
    
    

}



let productManager = new ProductManager()

productManager.addProduct("pera", "fruta", 100, "http", 15, 1)

productManager.getProducts()
productManager.getProductById(0)


