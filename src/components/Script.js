export default function Script() {
  window.selectedIndex = null;
  window.selectedAction = null;

  // #region Section

  window.buttons = document.querySelectorAll("aside nav > a:not(#help)");
  window.sections = document.querySelectorAll("main > section:not(:first-of-type)");
  window.loading = document.querySelector("main > #loading");

  window.buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      window.buttons.forEach((element) => {
        if (element == button) element.classList.add("selected");
        else element.classList.remove("selected");
      });

      window.loading.classList.add("loading");

      setTimeout(() => {
        window.sections.forEach((section) => {
          // Patch
          if (event.target.getAttribute("href")) {
            if (section.id == event.target.getAttribute("href").substring(1)) {
              section.classList.remove("none");
            } else section.classList.add("none");
          }

          window.loading.classList.remove("loading");
        });
      }, 200);
    });
  });

  // #endregion

  // #region Alert Table

  [
    window.alertTable,
    window.alertTableLoading,
    window.alertTablePagination,
    [window.alertTableLeft, window.alertTableRight],
    window.alertPage,
  ] = [
    document.querySelector("#alerts table"),
    document.querySelector("#alerts table + .table-loading"),
    document.querySelector("#alerts .pagination span"),
    [document.querySelector("#alerts .pagination .left"), document.querySelector("#alerts .pagination .right")],
    0,
  ];

  window.alertTableLeft.addEventListener("click", (event) => {
    if (window.alertTableLeft.classList.contains("disabled")) return;
    window.alertPage--;
    window.loadAlertTable();
  });

  window.alertTableRight.addEventListener("click", (event) => {
    if (window.alertTableRight.classList.contains("disabled")) return;
    window.alertPage++;
    window.loadAlertTable();
  });

  window.loadAlertTable = () => {
    window.alertTableLoading.classList.add("loading");

    window.alertTable.innerHTML = `<tr><th>Alarm İsmi</th><th>Alarm Tipi</th><th>Alan</th><th>Alt Alan</th><th>Alarm Durumu</th><th>Önem Derecesi</th><th colspan="3">Yönet</th></tr>`;

    let end = false;

    for (let i = window.alertPage * 15; i < window.alertPage * 15 + 15; i++) {
      if (i >= window.ALERT_LIST.length) {
        window.alertTable.innerHTML += `<td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`;
        end = true;
      } else {
        let alert = window.ALERT_LIST[i];

        window.alertTable.innerHTML += `<td>${alert.name}</td><td>${alert.type}</td><td>${alert.domain}</td><td>${alert.subdomain}</td><td>${alert.status}</td><td>${alert.severity}</td>
      <td><a href="#" onclick="openPopUp('alert-form', ${i}, 'display')"><i class="fa-solid fa-magnifying-glass"></i></a></td>
      <td><a href="#" onclick="openPopUp('alert-form', ${i}, 'edit')"><i class="fa-solid fa-pen-to-square"></i></a></td>
      <td><a href="#" onclick="openPopUp('alert-delete', ${i})"><i class="fa-solid fa-trash"></i></a></td>`;
      }
    }

    if (window.alertPage) window.alertTableLeft.classList.remove("disabled");
    else window.alertTableLeft.classList.add("disabled");

    if (end) window.alertTableRight.classList.add("disabled");
    else window.alertTableRight.classList.remove("disabled");

    window.alertTablePagination.innerHTML = window.alertPage + 1 + " / " + Math.ceil(window.ALERT_LIST.length / 15);

    setTimeout(() => window.alertTableLoading.classList.remove("loading"), 300);
  };

  [
    window.historyTable,
    window.historyTableLoading,
    window.historyTablePagination,
    [window.historyTableLeft, window.historyTableRight],
    window.historyPage,
  ] = [
    document.querySelector("#histories table"),
    document.querySelector("#histories table + .table-loading"),
    document.querySelector("#histories .pagination span"),
    [document.querySelector("#histories .pagination .left"), document.querySelector("#histories .pagination .right")],
    0,
  ];

  window.historyTableLeft.addEventListener("click", (event) => {
    if (window.historyTableLeft.classList.contains("disabled")) return;
    window.historyPage--;
    window.loadHistoryTable();
  });

  window.historyTableRight.addEventListener("click", (event) => {
    if (window.historyTableRight.classList.contains("disabled")) return;
    window.historyPage++;
    window.loadHistoryTable();
  });

  window.loadHistoryTable = () => {
    window.historyTable.classList.add("loading");

    window.historyTable.innerHTML = `<tr><th>Alarm İsmi</th><th>Alan</th><th>Alt Alan</th><th>Alarm Tarihi</th><th>Değer</th><th colspan="2">Eşik Değer</th><th>Önem Derecesi</th></tr>`;

    let end = false;

    for (let i = window.historyPage * 15; i < window.historyPage * 15 + 15; i++) {
      if (i >= window.HISTORY_LIST.length) {
        window.historyTable.innerHTML += `<td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`;
        end = true;
      } else {
        let alert = window.HISTORY_LIST[i];

        window.historyTable.innerHTML += `<td>${alert.name}</td><td>${alert.domain}</td><td>${alert.subdomain}</td><td>${alert.date}</td><td>${alert.value}</td><td>${alert.thresholdSign}</td><td>${alert.thresholdValue}</td><td>${alert.severity}</td>`;
      }
    }

    if (window.historyPage) window.historyTableLeft.classList.remove("disabled");
    else window.historyTableLeft.classList.add("disabled");

    if (end) window.historyTableRight.classList.add("disabled");
    else window.historyTableRight.classList.remove("disabled");

    window.historyTablePagination.innerHTML =
      window.historyPage + 1 + " / " + Math.ceil(window.HISTORY_LIST.length / 15);

    window.historyTableLoading.classList.remove("loading");
  };

  window.loadAlertTable();
  window.loadHistoryTable();

  // #endregion

  // #region Pop-Up

  window.popUpScreen = document.querySelector("#pop-up-screen");
  window.popUpSections = document.querySelectorAll("#pop-up > *:not(i)");
  window.popUpAlertTitle = document.querySelector("#pop-up #alert-form h2");

  window.openPopUp = (title, index, mode) => {
    window.popUpScreen.classList.remove("disabled");

    window.selectedIndex = index;

    window.popUpSections.forEach((section) => {
      if (title == section.id) section.classList.remove("disabled");
      else section.classList.add("disabled");
    });

    if (title == "alert-form") {
      window.popUpAlertTitle.innerHTML =
        mode == "create" ? "Alarm Oluştur" : mode == "edit" ? "Alarm Düzenle" : "Alarm Görüntüle";

      if (mode != "create") window.fillForm(mode);
      else window.clearForm();

      window.selectedAction = mode;

      if (mode == "display") window.formButtons.classList.add("disabled");
      else window.formButtons.classList.remove("disabled");
    }
  };

  window.closePopUp = () => {
    window.popUpScreen.classList.add("disabled");
  };

  // #endregion

  // #region Form

  window.formInputs = {
    name: document.querySelector("#alert-form #form-name"),
    type: document.querySelector("#alert-form #form-type"),
    domain: document.querySelector("#alert-form #form-domain"),
    subdomain: document.querySelector("#alert-form #form-subdomain"),
    severity: document.querySelector("#alert-form #form-severity"),
    thresholdSign: document.querySelector("#alert-form #form-threshold-sign"),
    thresholdValue: document.querySelector("#alert-form #form-threshold-value"),
    query: document.querySelector("#alert-form #form-query"),
  };

  window.formButtons = document.querySelector("#pop-up-buttons");

  window.fillForm = (mode) => {
    let alert = window.ALERT_LIST[window.selectedIndex];

    Object.values(window.formInputs).forEach((input) => input.removeAttribute("disabled"));

    window.formInputs.name.value = alert.name;
    window.formInputs.type.selectedIndex = alert.type == "Başarı Yüzdesi" ? 1 : alert.type == "Gecikme Süresi" ? 2 : 3;
    window.formInputs.domain.selectedIndex = alert.domain == "Server" ? 1 : 2;
    window.formInputs.domain.dispatchEvent(new Event("input"));
    window.formInputs.subdomain.selectedIndex =
      alert.subdomain == "Cloud" ? 1 : alert.subdomain == "Back-end" ? 2 : alert.subdomain == "Front-end" ? 3 : 4;
    window.formInputs.severity.selectedIndex = alert.severity == "Kritik" ? 1 : 2;
    window.formInputs.thresholdSign.selectedIndex =
      alert.thresholdSign == "<" ? 1 : alert.thresholdSign == "<=" ? 2 : alert.thresholdSign == ">=" ? 3 : 4;
    window.formInputs.thresholdValue.value = alert.thresholdValue;
    window.formInputs.query.value = alert.query;

    if (mode == "display") {
      Object.values(window.formInputs).forEach((input) => input.setAttribute("disabled", true));
    }
  };

  window.formInputs.domain.addEventListener("input", () => {
    window.formInputs.subdomain.selectedIndex = 0;

    window.formInputs.subdomain.querySelectorAll("option").forEach((option) => {
      if (window.formInputs.domain.value == "Server") {
        if (option.classList.contains("server")) option.removeAttribute("hidden");
        else option.setAttribute("hidden", true);
      } else if (window.formInputs.domain.value == "Client") {
        if (option.classList.contains("client")) option.removeAttribute("hidden");
        else option.setAttribute("hidden", true);
      }
    });
  });

  window.clearForm = () => {
    Object.values(window.formInputs).forEach((input) => input.removeAttribute("disabled"));

    window.formInputs.name.value = "";
    window.formInputs.type.selectedIndex = 0;
    window.formInputs.domain.selectedIndex = 0;
    window.formInputs.domain.dispatchEvent(new Event("input"));
    window.formInputs.subdomain.querySelectorAll("option").forEach((option) => option.setAttribute("hidden", true));
    window.formInputs.severity.selectedIndex = 0;
    window.formInputs.thresholdSign.selectedIndex = 0;
    window.formInputs.thresholdValue.value = "";
    window.formInputs.query.value = "";
  };

  window.actionForm = () => {
    switch (window.selectedAction) {
      case "create":
        window.createAlert();
        break;
      case "edit":
        window.editAlert();
        break;
    }
  };

  // #endregion

  // #region Alert Operation

  window.createAlert = () => {
    window.ALERT_LIST.push({
      name: window.formInputs.name.value,
      type: window.formInputs.type.value,
      domain: window.formInputs.domain.value,
      subdomain: window.formInputs.subdomain.value,
      status: "Aktif",
      severity: window.formInputs.severity.value,
      thresholdSign: window.formInputs.thresholdSign.value,
      thresholdValue: window.formInputs.thresholdValue.value,
      query: window.formInputs.query.value,
    });

    window.closePopUp();
    window.loadAlertTable();
  };

  window.editAlert = () => {
    window.ALERT_LIST[window.selectedIndex] = {
      name: window.formInputs.name.value,
      type: window.formInputs.type.value,
      domain: window.formInputs.domain.value,
      subdomain: window.formInputs.subdomain.value,
      status: "Aktif",
      severity: window.formInputs.severity.value,
      thresholdSign: window.formInputs.thresholdSign.value,
      thresholdValue: window.formInputs.thresholdValue.value,
      query: window.formInputs.query.value,
    };

    window.closePopUp();
    window.loadAlertTable();
  };

  window.deleteAlert = () => {
    window.ALERT_LIST = window.ALERT_LIST.filter((alert, index) => index != window.selectedIndex);
    window.loadAlertTable();
    window.closePopUp();
  };

  // #endregion

  document.querySelector("#create").addEventListener("click", () => window.openPopUp("alert-form", -1, "create"));
  document.querySelector("#clear").addEventListener("click", window.clearForm);
  document.querySelector("#save").addEventListener("click", window.actionForm);
  document.querySelector("#delete").addEventListener("click", window.deleteAlert);
  document.querySelector("#close").addEventListener("click", window.closePopUp);

  document.querySelector("#settings").addEventListener("change", (event) => {
    switch (event.target.value) {
      case "0":
        document.documentElement.style.setProperty("--purple", "#2f0f3f");
        document.documentElement.style.setProperty("--my-variable", "new value");
        document.documentElement.style.setProperty("--my-variable", "new value");
        document.documentElement.style.setProperty("--my-variable", "new value");
        document.documentElement.style.setProperty("--my-variable", "new value");
        break;
      case "1":
        document.documentElement.style.setProperty("--purple", "#010714");
        document.documentElement.style.setProperty("--white", "#1d2226");
        document.documentElement.style.setProperty("--blue", "#ed6213");
        document.documentElement.style.setProperty("--black", "#fff");
        document.documentElement.style.setProperty("--gray", "#303638");
        document.documentElement.style.setProperty("--dark-gray", "#0f0f0f");
        document.documentElement.style.setProperty("--red", "#d94545");

        document.documentElement.style.setProperty("--highlight-purple", "#1957bd");

        document.documentElement.style.setProperty("--fade-white", "#5677ad");
        document.documentElement.style.setProperty("--fade-black", "#5e5d7a7f");
        document.documentElement.style.setProperty("--fade-blue", "#ed6213");

        document.documentElement.style.setProperty("--disabled-blue", "#4a4a4a");
        break;
    }
  });

  document.querySelector("#resize").addEventListener("click", (event) => {
    console.log(event.target.dataset.resize);
    if (event.target.dataset.resize == "open") {
      document.querySelector("aside").style.width = "4.25vw";
      document.querySelector("main").style.width = "95.75vw";
      document.querySelectorAll("h1, aside span").forEach((element) => (element.style.opacity = "0"));
    } else {
      document.querySelector("aside").style.width = "";
      document.querySelectorAll("h1, aside span").forEach((element) => (element.style.opacity = "1"));
      document.querySelector("main").style.width = "";
    }

    event.target.setAttribute("data-resize", event.target.dataset.resize == "open" ? "closed" : "open");
  });
}
