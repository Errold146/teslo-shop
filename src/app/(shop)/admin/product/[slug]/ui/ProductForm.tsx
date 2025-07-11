"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import { createUpdateProduct, deleteProductImage } from "@/actions";
import type { Product, Category, ProductImage } from "@/interfaces";
import { ProductImage as ProductImageComponent } from "@/components";
import { FieldError } from "./FieldError";

interface Props {
    product: Partial<Product> & { ProductImage?: ProductImage[] };
    category: Category[]
}

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
    title: string
    slug: string
    description: string
    price: number
    inStock: number
    tags: string
    gender: 'men'|'women'|'kids'|'unisex'
    categoryId: string
    sizes: string[]
    images?: FileList
}

export const ProductForm = ({ product, category }: Props) => {

    const router = useRouter()
    const { handleSubmit, register, setValue, watch, formState: {errors} } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: (product.tags ?? []).join(', '),
            sizes: Array.isArray(product.sizes) ? product.sizes.map(s => s.toUpperCase()) : [],
            images: undefined
        }
    })

    useEffect(() => {
        if (product.sizes && product.sizes.length > 0) {
            setValue('sizes', product.sizes, { shouldValidate: true });
        }
    }, [product.sizes, setValue]);
      
    const sizesSelected = watch('sizes') ?? [];

    const onChangeSizes = (size: string) => {
        let newSizes: string[];
        if (sizesSelected.includes(size)) {
            newSizes = sizesSelected.filter(s => s !== size);
        } else {
            newSizes = [...sizesSelected, size];
        }
        setValue('sizes', newSizes, { shouldValidate: true });
    }

    const onSubmit = async (data: FormInputs) => {
        
        const formData = new FormData()

        const { images, ...productToSave } = data

        if ( product.id ) {
            formData.append('id', product.id ?? '')
        }
        
        formData.append('title', productToSave.title)
        formData.append('slug', productToSave.slug)
        formData.append('description', productToSave.description)
        formData.append('price', productToSave.price.toString())
        formData.append('inStock', productToSave.inStock.toString())
        formData.append('sizes', productToSave.sizes.toString())
        formData.append('tags', productToSave.tags)
        formData.append('categoryId', productToSave.categoryId)
        formData.append('gender', productToSave.gender)

        if ( images ) {
            for ( let i = 0; i < images.length; i++ ) {
                formData.append('images', images[i])
            }
        }

        const { ok, product: updatedProduct  } = await createUpdateProduct(formData)

        if (!ok) {
            toast.error('Ocurrió un error al guardar el producto');
            return
        } else {
            toast.success('Producto guardado correctamente.')
        }

        router.replace(`/admin/product/${updatedProduct?.slug}`)
        router.back()
    }

    const handleClick = async (imageId: number, imageUrl: string) => {
        const {ok} = await deleteProductImage(imageId, imageUrl)

        if (!ok) {
            toast.error('Ocurrió un error al eliminar la imagen');
            return
        } else {
            toast.success('Imagen eliminada correctamente.')
        }
    }


    return (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full max-w-7xl mx-auto p-6 md:p-10"
            >
                <form 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    onSubmit={ handleSubmit(onSubmit)}
                >
                    {/* Columna izquierda */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input 
                                type="text" 
                                className="input-style border border-gray-200 rounded shadow-md bg-gray-50 w-full p-1" 
                                { ...register('title', {required: true}) }
                            />
                            <FieldError error={errors.title} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <input  
                                type="text" 
                                className="input-style border border-gray-200 rounded shadow-md bg-gray-50 w-full p-1" 
                                {...register('slug', { required: true })}
                            />
                            <FieldError error={errors.slug} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea 
                                rows={5} 
                                className="input-style resize-none border border-gray-200 rounded shadow-md bg-gray-50 w-full p-1" 
                                {...register('description', { required: true })}
                            />
                            <FieldError error={errors.description} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                            <input 
                                type="number" 
                                className="input-style border border-gray-200 rounded shadow-md bg-gray-50 w-full p-1" 
                                {...register('price', { required: true, min: 1 })}
                            />
                            <FieldError
                                error={errors.price}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Inventario</label>
                            <input 
                                type="number" 
                                className="input-style border border-gray-200 rounded shadow-md bg-gray-50 w-full p-1" 
                                {...register('inStock', { required: true, min: 0 })}
                            />
                            <FieldError error={errors.inStock} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                            <input 
                                type="text" 
                                className="input-style border border-gray-200 rounded shadow-md bg-gray-50 w-full p-1" 
                                {...register('tags', { required: true })}    
                            />
                            <FieldError error={errors.tags} />
                        </div>

                    </div>

                    {/* Columna derecha */}
                    <div className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                            <select
                                className="input-style border border-gray-200 rounded shadow-md bg-gray-50 w-full p-1"
                                {...register('gender', { required: true })}
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kids">Kid</option>
                                <option value="unisex">Unisex</option>
                            </select>
                            <FieldError error={errors.gender} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                            <select
                                className="input-style border border-gray-200 rounded shadow-md bg-gray-50 w-full p-1"
                                {...register('categoryId', { required: true })}
                            >
                                <option value="">-- Seleccione --</option>
                                {category.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <FieldError error={errors.categoryId} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tallas</label>

                            <div className="flex flex-wrap gap-2">
                                {ALL_SIZES.map((size) => (
                                    <button
                                        type="button"
                                        key={size}
                                        className={clsx(
                                            "border rounded-md px-4 py-1.5 text-sm font-semibold transition-all duration-200 ease-in-out shadow-md",
                                            {
                                                "bg-indigo-500 text-white hover:bg-indigo-700": sizesSelected.includes(size),
                                                "bg-gray-100 text-gray-800 hover:bg-gray-300": !sizesSelected.includes(size)
                                            }
                                        )}
                                        onClick={() => onChangeSizes(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            {/* Campo oculto para activar validación */}
                            <input
                                type="hidden"
                                {...register('sizes', {
                                    validate: value => value.length > 0 || 'Selecciona al menos una talla'
                                })}
                            />

                            <FieldError error={errors.sizes} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Fotos</label>
                            <input
                                type="file"
                                { ...register('images') }
                                multiple
                                accept="image/png, image/jpeg, image/avif"
                                className="input-style border border-gray-200 rounded shadow-md bg-gray-50 w-full p-1"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {
                                product.ProductImage?.map( image => (
                                    <div key={image.id}>
                                        <ProductImageComponent 
                                            src={image.url}
                                            alt={product.title ?? 'Imagen Producto'}
                                            width={250}
                                            height={200}
                                            className=" rounded shadow-md"
                                        />

                                        <button 
                                            type="button"
                                            onClick={() => handleClick(image.id, image.url)}
                                            className="btn-error my-2 w-full transition-all duration-200 ease-in-out"
                                        >
                                            Eliminar Imagen
                                        </button>
                                    </div>
                                ))
                            }
                        </div>

                        {/* Vista previa de imágenes nuevas */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {watch("images") &&
                                Array.from(watch("images") || []).map((file, idx) => (
                                    <div key={idx}>
                                        <ProductImageComponent
                                            src={URL.createObjectURL(file)}
                                            alt={`Vista previa ${file.name}`}
                                            width={250}
                                            height={200}
                                            className="rounded shadow-md w-full h-[200px] object-cover"
                                        />
                                        <p className="text-xs mt-1 text-gray-500 text-center">{file.name}</p>
                                    </div>
                                ))}
                        </div>

                        <button type="submit" className="btn-primary w-full mt-4 transition-all duration-200 ease-in-out">
                            Guardar Producto
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
