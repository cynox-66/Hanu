import React, { createContext, useContext, useMemo } from 'react';
import { ProductRepository } from '../domain/ProductRepository';
import { GetProducts } from '../application/GetProducts';
import { GetProductById } from '../application/GetProductById';
import { CreateProduct } from '../application/CreateProduct';
import { EditProduct } from '../application/EditProduct';
import { ArchiveProduct } from '../application/ArchiveProduct';
import { DeleteProduct } from '../application/DeleteProduct';

interface ProductUseCases {
  getProducts: GetProducts;
  getProductById: GetProductById;
  createProduct: CreateProduct;
  editProduct: EditProduct;
  archiveProduct: ArchiveProduct;
  deleteProduct: DeleteProduct;
}

const ProductContext = createContext<ProductUseCases | null>(null);

interface ProductProviderProps {
  repository: ProductRepository;
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ repository, children }) => {
  const useCases = useMemo(() => {
    return {
      getProducts: new GetProducts(repository),
      getProductById: new GetProductById(repository),
      createProduct: new CreateProduct(repository),
      editProduct: new EditProduct(repository),
      archiveProduct: new ArchiveProduct(repository),
      deleteProduct: new DeleteProduct(repository),
    };
  }, [repository]);

  return <ProductContext.Provider value={useCases}>{children}</ProductContext.Provider>;
};

export const useProductUseCases = (): ProductUseCases => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductUseCases must be used within a ProductProvider');
  }
  return context;
};
