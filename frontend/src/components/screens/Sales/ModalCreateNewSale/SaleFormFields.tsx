import { Autocomplete, MenuItem } from "@mui/material";
import { CustomTextField } from "../../../_ui/CustomTextField";
import { paymentTypeList } from "../../../../models/constants/PaymentTypeList";
import style from "./ModalCreateNewSale.module.scss";
import { ISaleProduct } from "../../../../models/interfaces/ISale";
import { IClient } from "../../../../models/interfaces/IClient";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

interface SaleFormFieldsProps {
  clientsList: IClient[];
  productsList: ISaleProduct[];
  register: any;
  errors: any;
  setValue: UseFormSetValue<any>;
  handleAddNewProduct: (event: any) => void;
}

export const SaleFormFields: React.FC<SaleFormFieldsProps> = ({
  clientsList,
  productsList,
  register,
  errors,
  setValue,
  handleAddNewProduct,
}) => (
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
      {paymentTypeList.map(({ text, value }) => (
        <MenuItem key={value} value={value}>
          {text || "--"}
        </MenuItem>
      ))}
    </CustomTextField>

    <Autocomplete
      options={productsList}
      getOptionLabel={(option) => `${option.name} ${option.stock !== undefined ? `| ` : ""}`}
      renderOption={(props, option) => (
        <li {...props} style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
              const el = e.currentTarget.querySelector(".marquee-text") as HTMLElement | null;
              if (option.name && option.name.length > 18 && el) {
                el.style.animation = "marquee 3s linear infinite";
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.querySelector(".marquee-text") as HTMLElement | null;
              if (el) el.style.animation = "";
            }}
            onTouchStart={(e) => {
              const el = e.currentTarget.querySelector(".marquee-text") as HTMLElement | null;
              if (option.name && option.name.length > 18 && el) {
                el.style.animation = "marquee 3s linear infinite";
              }
            }}
            onTouchEnd={(e) => {
              const el = e.currentTarget.querySelector(".marquee-text") as HTMLElement | null;
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
              {option.stock > 0 ? `Estoque: ${option.stock}` : "Sem estoque"}
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
        if (value?._id) handleAddNewProduct({ target: { value: value._id } });
      }}
      isOptionEqualToValue={(option, value) => option._id === value._id}
    />
  </div>
);
