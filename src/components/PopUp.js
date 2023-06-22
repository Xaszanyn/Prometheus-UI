export default function PopUp() {
  return (
    <div id="pop-up-screen" class="disabled">
      <section id="pop-up">
        <div id="alert-form">
          <h2>Alarm Oluştur</h2>
          <h3>Alarm</h3>
          <hr />
          <div class="center">
            <input id="form-name" type="text" placeholder="Alarm İsmi" />
            <select id="form-type">
              <option selected hidden>
                Alarm Tipi
              </option>
              <option>Başarı Yüzdesi</option>
              <option>Gecikme Süresi</option>
              <option>İşlem Sayısı</option>
            </select>
          </div>
          <div class="center">
            <select id="form-domain">
              <option selected hidden>
                Alan
              </option>
              <option>Server</option>
              <option>Client</option>
            </select>
            <select id="form-subdomain">
              <option selected hidden>
                Alt Alan
              </option>
              <option class="server" hidden>
                Cloud
              </option>
              <option class="server" hidden>
                Back-end
              </option>
              <option class="client" hidden>
                Front-end
              </option>
              <option class="client" hidden>
                Grafana
              </option>
            </select>
          </div>
          <div class="center trial">
            <select id="form-severity">
              <option selected hidden>
                Önem Derecesi
              </option>
              <option>Kritik</option>
              <option>Uyarı</option>
            </select>
            <select id="form-threshold-sign">
              <option selected hidden>
                Eşik Değer İşareti
              </option>
              <option>&lt;</option>
              <option>&#8924;</option>
              <option>&#8925;</option>
              <option>&gt;</option>
            </select>
            <input id="form-threshold-value" type="number" placeholder="Eşik Değer" />
          </div>
          <h3>Sorgu</h3>
          <hr />
          <input id="form-query" type="text" style={{ height: "2rem" }} placeholder="Prometheus Sorgusu" />
          <div id="pop-up-buttons">
            <button onclick="clearForm()">Temizle</button>
            <button onclick="actionForm()">Kaydet</button>
          </div>
        </div>
        <div id="alert-delete" class="disabled">
          Alarmı silmek istediğinize emin misiniz?
          <br />
          <button onclick="deleteAlert()">Evet</button>
        </div>

        <i class="fa fa-close" onclick="closePopUp()"></i>
      </section>
    </div>
  );
}
