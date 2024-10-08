import { Nav, NavItem, NavLink } from "reactstrap";
export default function FormBanner() {
  return (
    <div className="form-banner">
      <div className="image-banner">
        <img src="./Iteration-2-aseets/pictures/form-banner.png" alt="" />
      </div>
      <div className="nav-container">
        <Nav>
          <NavItem>
            <NavLink   exact href="/">
              Anasayfa 
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact href="/secenekler">
              Seçenekler  
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact href="/siparisFormu">
              Sipariş Oluştur
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div className="promotion-container">
        <h3>Position Absolute Acı Pizza</h3>
        <div className="details-section">
          {" "}
          <div className="price-section">
            <h2>85.50₺</h2>
          </div>
          <div className="view-section">
            <h6>4.9</h6>
            <h6>(200)</h6>
          </div>
        </div>
        <p>
          Frontent Dev olarak hala position:absolute kullaniyorsan bu çok acı
          pizza tam sana göre. Pizza. domates, peynir ve genellikle çeşitli diger
          malzemelerle kaplanmış. Daha sonra geleneksel olarak odun ateşinde bir
          firinda yüksek sicaklkta pişirilen, genellikle yuvarlak, düzieştirilmiş
          mayalı bugday bazlı hamurdan oluşan italyan kökenli lezzetli bir
          yemektir.. Küçük bir pizzaya bazen pizzetta denir.
        </p>
      </div>
    </div>
    
  );
}