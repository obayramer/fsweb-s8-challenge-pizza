import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import Check from "./Check";
import Count from "./Count";
import axios from "axios";
import OrderTotal from "./OrderTotal";

const initialErrors = {
  ekMalzeme: true,
  pizzaSize: true,
  fullname: true,
};
const malzemeler = [
  { value: "pepperoni", label: "Pepperoni" },
  { value: "domates", label: "Domates" },
  { value: "biber", label: "Biber" },
  { value: "sosis", label: "Sosis" },
  { value: "mısır", label: "Mısır" },
  { value: "sucuk", label: "Sucuk" },
  { value: "kanada jambonu", label: "Kanada Jambonu" },
  { value: "ananas", label: "Ananas" },
  { value: "tavuk ızgara", label: "Tavuk Izgara" },
  { value: "jalepeno", label: "Jalepeno" },
  { value: "kabak", label: "Kabak" },
  { value: "soğan", label: "Soğan" },
  { value: "sarımsak", label: "Sarımsak" },
];
const initialForm = {
  pizzaSize: "",
  pizzaHamur: "",
  fullname: "",
  ekMalzeme: [],
  siparisNotu: "",
  adet: 1,
};
const errorMessages = {
  fullname: "Lütfen geçerli bir ad ve soyad giriniz.",
  pizzaSize: "Lütfen pizza için boyut seçiniz.",
  ekMalzeme: " En az 4 en fazla 10 malzeme seçebilirsiniz. 5₺",
};

export default function OrderForm() {
  const history = useHistory();
  const [isValid, setIsValid] = useState(true);
  const [count, setCount] = useState(1);
  const [fiyat, setFiyat] = useState(0);
  const [errors, setErrors] = useState(initialErrors);
  const [form, setForm] = useState(initialForm);

  // handleChange fonksiyonu
  const handleChange = (event) => {
    const { type, name, checked, value } = event.target;
    let newValue;
    if (name === "ekMalzeme") {
      const oldValues = form.ekMalzeme;
      if (checked) {
        newValue = [...oldValues, value]; // Seçildiyse değeri ekler
      } else {
        newValue = oldValues.filter((v) => v !== value); // Seçilmediyse değeri kaldırır
      }
      if (newValue.length < 4 || newValue.length > 10) {
        setErrors({ ...errors, [name]: true });
      } else {
        setErrors({ ...errors, [name]: false });
      }
    } else {
      newValue = value;
    }

    setForm({ ...form, [name]: newValue });

    if (name == "fullname") {
      if (value.replaceAll(" ", "").length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name == "pizzaSize" ) {
      if (value !== "") {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name == "pizzaHamur" ) {
      if (value !== "") {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

   //handleSubmit fonksiyonu
   const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    axios
      .post("https://reqres.in/api/pizza", { ...form })
      .then((res) => {
        console.log(res.data);
        const { id, createdAt } = res.data;
        console.log("Sipariş Özeti");
        console.log("ID:", id);
        console.log("Oluşturulma Tarihi:", createdAt);
        setForm(initialForm);
        setFiyat(0);
        setCount(1);
        history.push({
          pathname: "/siparisOzeti",
          state: { form, fiyat },
        });
      })
      .catch((err) => {
        console.log(err);

        history.push({
          pathname: "/errorPage",
          state: { error: err.message, errorCode: err.code },
        });
      });
  };

  const updatePrice = () => {
    let newFiyat = form.adet * (85.5 + form.ekMalzeme.length * 5);
    setFiyat(newFiyat);
  };

  useEffect(() => {
    updatePrice();
  }, [form]);


  const handleCountChange = (newCount) => {
    setForm({ ...form, adet: newCount });
  };

  useEffect(() => {
    if (errors.fullname ||errors.ekMalzeme || errors.pizzaSize || errors.pizzaHamur) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);


  return (
    <>
      <Form className="siparisForm-container" onSubmit={handleSubmit}>
        <div className="pizza-size-container">
          <div className="boyut-container">
            <div className="boyut">
            <h3>Boyut Seç {errors.pizzaSize && <span style={{ color: "red" }}>*</span>}</h3>
              {errors.pizzaSize && ( 
                <p style={{ color: "red" }}>{errorMessages.pizzaSize}</p>
              )}
              <div className="radio-group">
              <FormGroup className="radio-item">
                <Input
                  type="radio"
                  name="pizzaSize"
                  value="Small"
                  onChange={handleChange}
                  checked={form.pizzaSize === "Small"}
                  id="Small"
                />
                <Label htmlFor="Small" className="radio-label">S</Label>
              </FormGroup>

              <FormGroup className="radio-item">
                <Input
                  type="radio"
                  name="pizzaSize"
                  value="Medium"
                  onChange={handleChange}
                  checked={form.pizzaSize === "Medium"}
                  id="Medium"
                />
                <Label htmlFor="Medium" className="radio-label">M</Label>
              </FormGroup>

              <FormGroup className="radio-item">
                <Input
                  type="radio"
                  name="pizzaSize"
                  value="Large"
                  onChange={handleChange}
                  checked={form.pizzaSize === "Large"}
                  id="Large"
                />
                <Label htmlFor="Large" className="radio-label">L</Label>
              </FormGroup>
              </div>
            </div>
          </div>
          <div className="hamur-container">
            <h3>Hamur Seç{form.pizzaHamur === "" && (
                <span style={{ color: "red" }}>*</span>
              )}</h3>
            <FormGroup>
              <select
                type="select"
                name="pizzaHamur"
                onChange={handleChange}
                value={form.pizzaHamur}
              >
                <option value="" disabled>-Hamur Kalınlığı Seç-</option>
                <option>Süpper İnce</option>
                <option>Klasik Hamur</option>
                <option>Kalın Hamur</option>
              </select>
            </FormGroup>
          </div>
        </div>
<p></p>
        <h3>Ek Malzemeler</h3>
        {errors.ekMalzeme && (
          <p style={{ color: "red" }}>{errorMessages.ekMalzeme}</p>
        )}
        <div className="malzemeler-container">
          {malzemeler.map((malzeme, index) => {
            return (
              <Check
                type="checkbox"
                key={index}
                changeFn={handleChange}
                isChecked={form.ekMalzeme.includes(malzeme.value)}
                value={malzeme.value}
                label={malzeme.label}
                name="ekMalzeme"
                className="malzeme-label"
              />
            );
          })}
        </div>
<p></p>
<div className="input-container">
          <h3>Ad Soyad</h3>
          <Input
            type="input"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            style={{ 
              backgroundColor: "#FAF7F2",
              color: "#292929",
             }}
          />
          {errors.fullname && (
            <p style={{ color: "red" }}>{errorMessages.fullname}</p>
          )}
          <p></p>
          <h3>Sipariş Notu</h3>
          <Input
            type="textarea"
            name="siparisNotu"
            value={form.siparisNotu}
            onChange={handleChange}
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            style={{ 
              backgroundColor: "#FAF7F2",
              color: "#292929",
             }}
          />
        </div>
        <div className="divider" />
        <div className="siparisOzeti-container">
          <div className="count-button">
            <Count
              onCountChange={handleCountChange}
              count={count}
              setCount={setCount}
            />
          </div>
          <div className="siparis-toplamı">
            <OrderTotal formInfo={form} total={fiyat} />
            <button type = "submit" className="submit-button" disabled={!isValid}>
              Sipariş Ver
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}