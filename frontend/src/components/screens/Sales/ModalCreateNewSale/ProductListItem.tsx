import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CustomTextField } from "../../../_ui/CustomTextField";
import style from "./ModalCreateNewSale.module.scss";
import { ISaleProduct } from "../../../../models/interfaces/ISale";
import React from "react";

interface ProductListItemProps {
  product: ISaleProduct;
  index: number;
  fullProduct?: ISaleProduct;
  handleChangeProduct: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleRemoveProduct: (id: string) => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  index,
  fullProduct,
  handleChangeProduct,
  handleRemoveProduct,
}) => (
  <li>
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
      onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => {
        const el = e.currentTarget.querySelector(
          ".marquee-text"
        ) as HTMLElement | null;
        if (el && fullProduct?.name && fullProduct.name.length > 18) {
          el.style.animation = "marquee 3s linear infinite";
        }
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) => {
        const el = e.currentTarget.querySelector(
          ".marquee-text"
        ) as HTMLElement | null;
        if (el) {
          el.style.animation = "";
        }
      }}
      onTouchStart={(e: React.TouchEvent<HTMLSpanElement>) => {
        const el = e.currentTarget.querySelector(
          ".marquee-text"
        ) as HTMLElement | null;
        if (el && fullProduct?.name && fullProduct.name.length > 18) {
          el.style.animation = "marquee 1s linear infinite";
        }
      }}
      onTouchEnd={(e: React.TouchEvent<HTMLSpanElement>) => {
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
          background: fullProduct.stock > 0 ? "#e6f4ea" : "#ffeaea",
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
