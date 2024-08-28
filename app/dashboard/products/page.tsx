import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Image, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function ProductsRoute() {
    return (
        <>
            <div className="flex items-center justify-end">
                <Button className="flex items-center gap-x-2 bg-blue-700" asChild>
                    <Link href="/dashboard/products/create">
                        <PlusCircle className="w-5 h-5" />
                        <span>Add Product</span>
                    </Link>
                </Button>
            </div>
            <Card className="mt-5">
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                    Manage your products and view their sales perfomances
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="w-[100px]">Price</TableHead>
                            <TableHead className="w-[100px]">Date</TableHead>
                            <TableHead className="w-[100px] text-end">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell><Image strokeWidth={1} className="w-20 h-20 fill-zinc-200 stroke-teal-950" />
                            </TableCell>
                            <TableCell>Nike air</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>$299.00</TableCell>
                            <TableCell>19/08/2024</TableCell>
                            <TableCell className="text-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            </Card>
        </>
    )
}