import { Container, Button, Table } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

import style from "./mystyle.module.css";

function QuotationTable({ data, clearDataItems, deleteByIndex }) {
  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p>
          <CiShoppingCart /> No items
        </p>
      </Container>
    );
  }

  const calculatedData = data.map((item) => {
    const amount = item.qty * item.ppu;
    return { ...item, amount };
  });

  const subtotal = calculatedData.reduce((acc, v) => acc + v.amount, 0);
  const totalDiscount = calculatedData.reduce((acc, v) => acc + v.discount, 0);
  const total = subtotal - totalDiscount;

  const handleClear = () => {
    clearDataItems();
  };

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  return (
    <Container>
      <h1>Quotation</h1>
      <Button onClick={handleClear} variant="outline-danger" className="mb-3">
        <MdClear /> Clear All
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.textCenter}>-</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Amount</th>
            <th className={style.textCenter}>Discount</th>
          </tr>
        </thead>
        <tbody>
          {calculatedData.map((v, i) => (
            <tr key={i}>
              <td className={style.textCenter}>
                <BsFillTrashFill onClick={() => handleDelete(i)} />
              </td>
              <td className={style.textCenter}>{v.qty}</td>
              <td>{v.item}</td>
              <td className={style.textCenter}>{v.ppu.toFixed(2)}</td>
              <td className={style.textRight}>{v.amount.toFixed(2)}</td>
              <td className={style.textRight}>{v.discount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              <strong>Subtotal</strong>
            </td>
            <td className={style.textRight}>
              <strong>{subtotal.toFixed(2)}</strong>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={4} className={style.textRight}>
              <strong>Total Discount</strong>
            </td>
            <td></td>
            <td className={style.textRight}>
              <strong>{totalDiscount.toFixed(2)}</strong>
            </td>
          </tr>
          <tr>
            <td colSpan={4} className={style.textRight}>
              <strong>Total</strong>
            </td>
            <td className={style.textRight} colSpan={2}>
              <strong>{total.toFixed(2)}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
