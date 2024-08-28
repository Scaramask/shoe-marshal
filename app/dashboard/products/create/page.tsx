"use client";

import { createProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod'
import { productSchema } from "@/app/lib/zodSchemas";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { useState } from "react";
import Image from "next/image";
import { categories } from "@/app/lib/categories";

export default function ProductCreateRoute() {
    const [images, setImages] = useState<string[]>([]);
    const [lastResult, action] = useFormState(createProduct, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: productSchema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    const handleDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/products">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Products Details</CardTitle>
                    <CardDescription>In this form you can create a new product</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input
                                type="text"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={fields.name.initialValue}
                                className="w-full"
                                placeholder="Product Name..."
                            />
                            <p className="text-red-500">{fields.name.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Description</Label>
                            <Textarea
                                key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={fields.description.initialValue}
                                placeholder="Write product description right here..."
                            />
                            <p className="text-red-500">{fields.description.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Price</Label>
                            <Input
                                type="number"
                                key={fields.price.key}
                                name={fields.price.name}
                                defaultValue={fields.price.initialValue}
                                placeholder="$55"
                            />
                            <p className="text-red-500">{fields.price.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Featured Product</Label>
                            <Switch
                                key={fields.isFeatured.key}
                                name={fields.isFeatured.name}
                                defaultValue={fields.isFeatured.initialValue}
                            />
                            <p className="text-red-500">{fields.isFeatured.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Status</Label>
                            <Select
                                key={fields.status.key}
                                name={fields.status.name}
                                defaultValue={fields.status.initialValue}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.status.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Category</Label>
                            <Select
                                key={fields.category.key}
                                name={fields.category.name}
                                defaultValue={fields.category.initialValue}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.name}>
                                            {category.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.category.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <input
                                type="hidden"
                                value={images}
                                key={fields.images.key}
                                name={fields.images.name}
                                defaultValue={fields.images.initialValue as any}
                            />
                            {images.length > 0 ? (
                                <div className="flex gap-5">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative w-[100] h-[100]">
                                            <Image
                                                className="w-full h-full object-cover rounded-lg border"
                                                height={100}
                                                width={100}
                                                src={image}
                                                alt="Product image"
                                            />
                                            <button
                                                onClick={() => handleDelete(index)}
                                                type="button"
                                                className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                                                <XIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <UploadDropzone
                                    className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        // Doing something with the response
                                        //console.log("Files: ", res);
                                        //alert("Finished uploading")
                                        setImages(res.map((r) => r.url))
                                    }}
                                    onUploadError={() => {
                                        alert("Failed to upload")
                                    }}
                                />
                            )}
                            <p className="text-red-500">{fields.images.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Create Product</Button>
                </CardFooter>
            </Card>
        </form>
    )
}