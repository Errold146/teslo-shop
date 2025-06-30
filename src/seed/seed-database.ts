
import prisma from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';

async function main() {
    
    // 1. Borra registros existentes
    await prisma.orderAddress.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.userAddress.deleteMany()
    await prisma.user.deleteMany()
    await prisma.country.deleteMany()
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()

    const {categories, products, users} = initialData

    // 2. Insertar categorías, usuarios y paises
    await prisma.user.createMany({ data: users })

    await prisma.country.createMany({ data: countries })

    const categoriesData = categories.map( name => ({ name }))
    await prisma.category.createMany({ data: categoriesData })

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