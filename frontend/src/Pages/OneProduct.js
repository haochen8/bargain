import React, { useEffect } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import BestSeller from "../Components/BestSeller";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Accessories from "../Components/Accessories";
import { useParams } from "react-router-dom";

const OneProduct = () => {
  const appleWatch1 =
    "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/HQWW2?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1681150922615";
  const appleWatch2 =
    "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/HQWW2_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1681150919804";

  const appleWatch3 =
    "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/HQWW2_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1681150918297";

  const [selectedSize, setSelectedSize] = useState("40mm");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);


  return (
    <>
      <Meta title="Product Name" />
      <BreadCrumb title="Product Name" />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <Zoom>
                  <img
                    src={appleWatch1}
                    alt="Product Name"
                    className="img-fluid main-image"
                  />
                </Zoom>
              </div>
              <div className="bottom-images d-flex gap-2">
                <div className="col">
                  <Zoom>
                    <img
                      src={appleWatch2}
                      alt="Product Name"
                      className="img-fluid small-image"
                    />
                  </Zoom>
                </div>
                <div className="col">
                  <Zoom>
                    <img
                      src={appleWatch3}
                      alt="Product Name"
                      className="img-fluid small-image"
                    />
                  </Zoom>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="">
                  <h4>Apple Watch SE 2nd Gen 40mm GPS (Starlight/Starlight)</h4>
                </div>
                <div className="">
                  <p className="price">3500kr</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value="4"
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div className="product-sizes">
                    <h3 className="product-header">Size:</h3>
                    <div className="d-flex flex-wrap gap-15">
                      {["40mm", "44mm"].map((size) => (
                        <span
                          key={size}
                          className={`badge ${
                            selectedSize === size
                              ? "bg-secondary"
                              : "bg-white text-dark"
                          } border-secondary`}
                          style={{ cursor: "pointer" }}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="product-colors my-3">
                    <h3 className="product-header">Color:</h3>
                    <select
                      className="form-select"
                      value={selectedColor}
                      style={{ cursor: "pointer" }}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    >
                      <option value="">Select Color</option>
                      <option value="Starlight">Starlight</option>
                      <option value="Midnight">Midnight</option>
                      <option value="Silver">Silver</option>
                    </select>
                  </div>
                  <div className="product-quantity my-3">
                    <h3 className="product-header">Quantity:</h3>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="form-control quantity-input"
                    />
                  </div>
                  <button className="button btn-primary my-3">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="product-description bg-white p-3">
                <h4>Produktbeskrivning</h4>
                <p>
                  De viktigaste funktionerna för att du ska kunna hålla
                  kontakten, leva sunt och aktivt och få hjälp när det behövs.
                  Perfekt för barn och äldre tack vare Familjeinställning.
                </p>
                <h5>Varför välja Apple Watch SE</h5>
                <p>
                  Alla funktioner du behöver för att hålla igång, vara
                  uppkopplad, få information om din hälsa och känna dig trygg.
                  Den smarta traven och omgjorda appar i watchOS 10 gör det
                  enklare att se mer information vid en snabbtitt. Apple Watch
                  SE är mer prisvärd än någonsin, med funktioner som
                  kraschdetektering och förbättrade mätdata för träning.
                </p>
                <h5>Koldioxidneutral</h5>
                <p>
                  Apple Watch SE (andra generationen) i kombination med den
                  senaste sportloopen är koldioxidneutral. Läs mer om Apples
                  miljöarbete på{" "}
                  <a href="https://apple.com/se/2030">apple.com/se/2030</a>
                </p>
                <h5>Hälso- och trygghetsfunktioner</h5>
                <p>
                  Få hjälp när du behöver det med falldetektering,
                  kraschdetektering och Nödanrop SOS. Få en djupare inblick i
                  din hälsa, som varningar om du har oregelbunden hjärtrytm,
                  eller ovanligt hög eller låg puls.
                </p>
                <h5>Kompatibel helt enkelt</h5>
                <p>
                  Den fungerar smidigt med alla dina enheter och tjänster från
                  Apple. Lås upp din Mac automatiskt. Nu är det lätt att hitta
                  dina enheter. Betala med Apple Pay. Apple Watch SE kräver
                  iPhone 8 eller senare med iOS 17 eller senare.
                </p>
                <h5>Simtålig och elegant</h5>
                <p>
                  Vattentålig ner till 50 meters djup. Tre finishar. Den
                  färgmatchade boettens baksida har tillverkats på ett sätt som
                  minskar koldioxidavtrycket.
                </p>
                <h5>Lätt att anpassa</h5>
                <p>
                  Med armband i olika stilar, material och färger och helt
                  anpassningsbara urtavlor kan du ändra din klocka efter stund
                  och humör.
                </p>
                <h5>En motiverande träningspartner</h5>
                <p>
                  I appen Träning har du en mängd olika sätt att hålla koll på
                  din träning med avancerade mätdata.
                </p>
                <h5>Håll dig uppkopplad</h5>
                <p>
                  Skicka ett meddelande, ta ett samtal, lyssna på musik och
                  poddar, använd Siri och få hjälp med Nödanrop SOS. Apple Watch
                  Series SE (GPS) fungerar med iPhone eller wifi för att hålla
                  dig uppkopplad.
                </p>
                <h5>Avancerade hälsofunktioner</h5>
                <p>
                  Få varningar om du har oregelbunden hjärtrytm. Se hur länge
                  din REM-sömn, bassömn och djupsömn varade med Sömnfaser. Och
                  håll koll på din sinnesstämning för att bli mer medveten och
                  bättre rustad inför utmaningar.
                </p>
                <h5>Nyskapande trygghetsfunktioner</h5>
                <p>
                  Falldetektering och kraschdetektering kan ringa
                  räddningstjänsten om du är med om ett hårt fall eller en
                  allvarlig bilolycka, och med Nödanrop SOS kan du ringa efter
                  hjälp med ett knapptryck.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="popular-wrapper py-5 home-wrapper-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Tillbehör</h3>
            </div>
            <Accessories grid={4} />
          </div>
        </div>
      </section>
    </>
  );
};

export default OneProduct;
