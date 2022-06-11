import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import slugify from 'slugify';
interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) { }
  listProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, { lower: true });
    const productWithSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });
    if (productWithSlug) {
      throw new Error('Product already exists');
    }
    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
