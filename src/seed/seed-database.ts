
import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {
    
    // 1. Borra registros existentes
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()

    const {categories, products} = initialData

    // 2. Insertar categorías
    const categoriesData = categories.map( name => ({ name }))
    await prisma.category.createMany({
        data: categoriesData,
    })

    const categoriesDB = await prisma.category.findMany()
    const categoriesMap = categoriesDB.reduce((map, cat) => {
        map[cat.name.toLowerCase()] = cat.id;
        return map;
    }, {} as Record<string, string>)
    
    // 3. Insertar productos
    products.forEach(async prod => {
        const { images, type, ...rest } = prod

        const dbProduct = await prisma.product.create({ 
            data: { 
                ...rest, 
                categoryId: categoriesMap[type]
            }
        })
        
        // Insertar imágenes de los productos
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        })
    })

    console.log('Seed Executed Successfully.')
}

(() => {

    if (process.env.NODE_ENV === 'production') return;

    main()
})()