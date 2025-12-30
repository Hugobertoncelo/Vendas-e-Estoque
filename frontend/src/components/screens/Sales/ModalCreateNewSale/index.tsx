import { ModalLayout } from "../../../_ui/ModalLayout";
import style from "./ModalCreateNewSale.module.scss";
import { CustomTextField } from "../../../_ui/CustomTextField";
import { Autocomplete, MenuItem } from "@mui/material";
import { paymentTypeList } from "../../../../models/constants/PaymentTypeList";
import { format } from "../../../../utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ISale, ISaleProduct } from "../../../../models/interfaces/ISale";
import { useClientList } from "../../../../hooks/useClientList";
import { useFormSale } from "../hooks/useFormSale";
import { useProductList } from "../../../../hooks/useProductList";

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
          <div className={style.fieldsContainer}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={clientsList}
              noOptionsText="Nenhum cliente encontrado"
              loadingText="Buscando clientes..."
              onChange={(event, value) => {
                setValue("clientId", value?._id || null);
              }}
              getOptionLabel={(client) => client.name}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  size="small"
                  className={style.input}
                  label="Cliente"
                  type="text"
                  placeholder="Digite o nome do cliente"
                />
              )}
            />

            <CustomTextField
              size="small"
              className={style.input}
              label="Forma de pagamento *"
              select
              placeholder="Escolha a forma de pagamento"
              {...register("paymentType")}
              error={!!errors.paymentType}
              helperText={errors.paymentType && errors.paymentType.message}
            >
              {paymentTypeList.map(({ text, value }) => {
                return (
                  <MenuItem key={value} value={value}>
                    {text || "--"}
                  </MenuItem>
                );
              })}
            </CustomTextField>

            <Autocomplete
              options={productsList}
              getOptionLabel={(option) =>
                `${option.name} ${option.stock !== undefined ? `| ` : ""}`
              }
              renderOption={(props, option) => (
                <li
                  {...props}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span
                    style={{
                      fontWeight: 500,
                      display: "inline-block",
                      maxWidth: 160,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      verticalAlign: "middle",
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget.querySelector(
                        ".marquee-text"
                      ) as HTMLElement | null;
                      if (option.name && option.name.length > 18 && el) {
                        el.style.animation = "marquee 3s linear infinite";
                      }
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget.querySelector(
                        ".marquee-text"
                      ) as HTMLElement | null;
                      if (el) el.style.animation = "";
                    }}
                    onTouchStart={(e) => {
                      const el = e.currentTarget.querySelector(
                        ".marquee-text"
                      ) as HTMLElement | null;
                      if (option.name && option.name.length > 18 && el) {
                        el.style.animation = "marquee 3s linear infinite";
                      }
                    }}
                    onTouchEnd={(e) => {
                      const el = e.currentTarget.querySelector(
                        ".marquee-text"
                      ) as HTMLElement | null;
                      if (el) el.style.animation = "";
                    }}
                    title={option.name}
                  >
                    <span
                      className="marquee-text"
                      style={{
                        display: "inline-block",
                        minWidth: "100%",
                        willChange: "transform",
                      }}
                    >
                      {option.name}
                    </span>
                  </span>
                  {option.stock !== undefined && (
                    <span
                      style={{
                        background: option.stock > 0 ? "#e6f4ea" : "#ffeaea",
                        color: option.stock > 0 ? "#2e7d32" : "#c62828",
                        borderRadius: 8,
                        fontSize: 12,
                        padding: "2px 8px",
                        marginLeft: 30,
                        fontWeight: 600,
                        letterSpacing: 0.5,
                      }}
                    >
                      {option.stock > 0
                        ? `Estoque: ${option.stock}`
                        : "Sem estoque"}
                    </span>
                  )}
                </li>
              )}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  size="small"
                  className={style.input}
                  label="Produtos"
                  placeholder="Pesquise um produto"
                />
              )}
              onChange={(event, value) => {
                if (value?._id)
                  handleAddNewProduct({ target: { value: value._id } });
              }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
            />
          </div>
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
                  <li key={product?._id}>
                    <span
                      style={{
                        fontWeight: 500,
                        display: "inline-block",
                        maxWidth: 110,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "middle",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget.querySelector(
                          ".marquee-text"
                        ) as HTMLElement | null;
                        if (
                          el &&
                          fullProduct?.name &&
                          fullProduct.name.length > 18
                        ) {
                          el.style.animation = "marquee 3s linear infinite";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget.querySelector(
                          ".marquee-text"
                        ) as HTMLElement | null;
                        if (el) {
                          el.style.animation = "";
                        }
                      }}
                      onTouchStart={(e) => {
                        const el = e.currentTarget.querySelector(
                          ".marquee-text"
                        ) as HTMLElement | null;
                        if (
                          el &&
                          fullProduct?.name &&
                          fullProduct.name.length > 18
                        ) {
                          el.style.animation = "marquee 1s linear infinite";
                        }
                      }}
                      onTouchEnd={(e) => {
                        const el = e.currentTarget.querySelector(
                          ".marquee-text"
                        ) as HTMLElement | null;
                        if (el) {
                          el.style.animation = "";
                        }
                      }}
                    >
                      <span
                        className="marquee-text"
                        style={{
                          display: "inline-block",
                          minWidth: "100%",
                          willChange: "transform",
                        }}
                      >
                        {product?.name}
                      </span>
                    </span>
                    {fullProduct?.stock !== undefined && (
                      <span
                        style={{
                          background:
                            fullProduct.stock > 0 ? "#e6f4ea" : "#ffeaea",
                          color: fullProduct.stock > 0 ? "#2e7d32" : "#c62828",
                          borderRadius: 8,
                          fontSize: 12,
                          padding: "2px 8px",
                          marginLeft: 8,
                          fontWeight: 600,
                          letterSpacing: 0.5,
                        }}
                      >
                        {fullProduct.stock > 0
                          ? `Estoque: ${fullProduct.stock}`
                          : "Sem estoque"}
                      </span>
                    )}
                    <CustomTextField
                      className={style.inputProduct}
                      label="Quantidade"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      value={product?.amount}
                      name="amount"
                      type="number"
                      onChange={(event) => {
                        handleChangeProduct(event, index);
                      }}
                    />
                    <CustomTextField
                      className={style.inputProduct}
                      label="Valor"
                      type="number"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      value={product?.value}
                      name="value"
                      onChange={(event) => {
                        handleChangeProduct(event, index);
                      }}
                    />
                    <FontAwesomeIcon
                      onClick={() => {
                        handleRemoveProduct(product?._id);
                      }}
                      className={style.removeProductIcon}
                      icon={faTrash}
                    />
                  </li>
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
