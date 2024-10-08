import { useHistory } from "react-router-dom";

export default function FoodCards() {
  const history = useHistory();
  const paths = [
    {
      name: "Terminal Pizza",
      url: "./Iteration-2-aseets/pictures/food-1.png",
      fiyat: "60₺",
      puan: "4.9",
      view: "(200)",
    },
    {
      name: "Position Absolute Acı Pizza",
      url: "./Iteration-2-aseets/pictures/food-2.png",
      fiyat: "85₺",
      puan: "4.9",
      view: "(928)",
    },
    {
      name: "useEffect Tavuklu Burger",
      url: "./Iteration-2-aseets/pictures/food-3.png",
      fiyat: "75₺",
      puan: "4.9",
      view: "(462)",
    },
  ];
  function handleClick() {
    history.push("/siparisFormu");
  }
  return (
    <div className="food-cards">
      {paths.map((path, index) => {
        return (
          <div key={index} className="food-card" onClick={handleClick}>
            <div>
              <img src={path.url} />
              <h5>{path.name}</h5>
              <div className="card-body">
                <p>{path.puan}</p>
                <p>{path.view}</p>
                <p>{path.fiyat}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}