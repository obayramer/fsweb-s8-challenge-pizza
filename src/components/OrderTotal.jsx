import { useLocation } from 'react-router-dom';

export default function OrderTotal(props) {
  const location = useLocation();
  const isOrderSummary = location.pathname === "/siparisOzeti";
  
  const totalStyle = isOrderSummary
    ? { color: "#faf7f2", display: "flex", justifyContent: "space-between" }
    : { color: "#292929", display: "flex", justifyContent: "space-between" };

  return (
    <div className={isOrderSummary ? "order-total-summary" : "order-total-form"}>
      <h3>Sipariş Toplamı</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Seçimler:</p>
        <p>{props.formInfo.ekMalzeme.length * 5}₺</p>
      </div>
      <div style={totalStyle}>
        <p>Toplam:</p>
        <p>{props.total}₺</p>
      </div>
    </div>
  );
}