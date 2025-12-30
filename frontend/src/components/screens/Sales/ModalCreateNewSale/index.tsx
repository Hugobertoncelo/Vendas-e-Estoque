import { ModalLayout } from "../../../_ui/ModalLayout";
import style from "./ModalCreateNewSale.module.scss";
import { format } from "../../../../utils/format";
import { ISale, ISaleProduct } from "../../../../models/interfaces/ISale";
import { useClientList } from "../../../../hooks/useClientList";
import { useFormSale } from "../hooks/useFormSale";
import { useProductList } from "../../../../hooks/useProductList";
import { ProductListItem } from "./ProductListItem";
import { SaleFormFields } from "./SaleFormFields";

interface Props {
  saleToEditData: ISale | null;
  open: boolean;
  handleClose: () => void;
}

export function ModalCreateNewSale({
  open,
  handleClose,
  saleToEditData,
}: Props) {
  const { products: productsList } = useProductList();
  const { clients: clientsList } = useClientList();

  const {
    errors,
    handleSubmit,
    isSubmitting,
    onCreateNewSale,
    onEditSale,
    products,
    register,
    setValue,
    totalValue,
    handleAddNewProduct,
    handleChangeProduct,
    handleRemoveProduct,
  } = useFormSale({
    handleClose,
    saleToEditData,
    productsList: productsList as ISaleProduct[],
  });

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(saleToEditData ? onEditSale : onCreateNewSale)}
      title={saleToEditData ? "Editar venda" : "Realizar nova venda"}
      submitButtonText={saleToEditData ? "Atualizar" : "Finalizar"}
      loading={isSubmitting}
    >
      <div className={style.content}>
        <section className={style.sectionContainer}>
          <h3>Informações da venda</h3>
          <SaleFormFields
            clientsList={clientsList}
            productsList={productsList}
            register={register}
            errors={errors}
            setValue={setValue}
            handleAddNewProduct={handleAddNewProduct}
          />
        </section>
        <section className={style.sectionContainer}>
          <div className={style.headerProductsList}>
            <h3>Produtos</h3>
            {products.length > 0 && (
              <span>{format.formatarReal(totalValue || 0)}</span>
            )}
          </div>
          {products.length > 0 ? (
            <ul className={style.listProducts}>
              {products.map((product, index) => {
                const fullProduct = productsList.find(
                  (p) => p._id === product._id
                );
                return (
                  <ProductListItem
                    key={product?._id}
                    product={product}
                    index={index}
                    fullProduct={fullProduct}
                    handleChangeProduct={handleChangeProduct}
                    handleRemoveProduct={handleRemoveProduct}
                  />
                );
              })}
            </ul>
          ) : (
            <div>
              <span>Nenhum produto selecionado</span>
            </div>
          )}
        </section>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </ModalLayout>
  );
}
