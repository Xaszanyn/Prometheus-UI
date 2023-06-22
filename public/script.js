var selectedIndex;
var selectedAction;

// #region Section

const main = document.querySelector("main");
const buttons = document.querySelectorAll("aside nav > a");
const sections = document.querySelectorAll("main > section:not(:first-of-type)");
const loading = document.querySelector("main > #loading");

buttons.forEach((button) => {
  console.log(button);
  button.addEventListener("click", (event) => {
    buttons.forEach((element) => {
      if (element == button) element.classList.add("selected");
      else element.classList.remove("selected");
    });

    loading.classList.add("loading");

    setTimeout(() => {
      sections.forEach((section) => {
        if (section.id == event.target.getAttribute("href").substring(1)) {
          section.classList.remove("none");
        } else section.classList.add("none");

        loading.classList.remove("loading");
      });
    }, 200);
  });
});

// #endregion

// #region Alert Table

var [alertTable, alertTableLoading, alertTablePagination, [alertTableLeft, alertTableRight], alertPage] = [
  document.querySelector("#alerts table"),
  document.querySelector("#alerts table + .table-loading"),
  document.querySelector("#alerts .pagination span"),
  [document.querySelector("#alerts .pagination .left"), document.querySelector("#alerts .pagination .right")],
  0,
];

alertTableLeft.addEventListener("click", (event) => {
  if (alertTableLeft.classList.contains("disabled")) return;
  alertPage--;
  loadAlertTable();
});

alertTableRight.addEventListener("click", (event) => {
  if (alertTableRight.classList.contains("disabled")) return;
  alertPage++;
  loadAlertTable();
});

function loadAlertTable() {
  alertTableLoading.classList.add("loading");

  alertTable.innerHTML = `<tr><th>Alarm İsmi</th><th>Alarm Tipi</th><th>Alan</th><th>Alt Alan</th><th>Alarm Durumu</th><th>Önem Derecesi</th><th colspan="3">Yönet</th></tr>`;

  let end = false;

  for (let i = alertPage * 15; i < alertPage * 15 + 15; i++) {
    if (i >= ALERT_LIST.length) {
      alertTable.innerHTML += `<td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`;
      end = true;
    } else {
      let alert = ALERT_LIST[i];

      alertTable.innerHTML += `<td>${alert.name}</td><td>${alert.type}</td><td>${alert.domain}</td><td>${alert.subdomain}</td><td>${alert.status}</td><td>${alert.severity}</td>
      <td><a href="#" onclick="openPopUp('alert-form', ${i}, 'display')"><i class="fa-solid fa-magnifying-glass"></i></a></td>
      <td><a href="#" onclick="openPopUp('alert-form', ${i}, 'edit')"><i class="fa-solid fa-pen-to-square"></i></a></td>
      <td><a href="#" onclick="openPopUp('alert-delete', ${i})"><i class="fa-solid fa-trash"></i></a></td>`;
    }
  }

  if (alertPage) alertTableLeft.classList.remove("disabled");
  else alertTableLeft.classList.add("disabled");

  if (end) alertTableRight.classList.add("disabled");
  else alertTableRight.classList.remove("disabled");

  alertTablePagination.innerHTML = alertPage + 1 + " / " + Math.ceil(ALERT_LIST.length / 15);

  setTimeout(() => alertTableLoading.classList.remove("loading"), 300);
}

var [historyTable, historyTableLoading, historyTablePagination, [historyTableLeft, historyTableRight], historyPage] = [
  document.querySelector("#histories table"),
  document.querySelector("#histories table + .table-loading"),
  document.querySelector("#histories .pagination span"),
  [document.querySelector("#histories .pagination .left"), document.querySelector("#histories .pagination .right")],
  0,
];

historyTableLeft.addEventListener("click", (event) => {
  if (historyTableLeft.classList.contains("disabled")) return;
  historyPage--;
  loadHistoryTable();
});

historyTableRight.addEventListener("click", (event) => {
  if (historyTableRight.classList.contains("disabled")) return;
  historyPage++;
  loadHistoryTable();
});

function loadHistoryTable() {
  historyTable.classList.add("loading");

  historyTable.innerHTML = `<tr><th>Alarm İsmi</th><th>Alan</th><th>Alt Alan</th><th>Alarm Tarihi</th><th>Değer</th><th colspan="2">Eşik Değer</th><th>Önem Derecesi</th></tr>`;

  let end = false;

  for (let i = historyPage * 15; i < historyPage * 15 + 15; i++) {
    if (i >= HISTORY_LIST.length) {
      historyTable.innerHTML += `<td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`;
      end = true;
    } else {
      let alert = HISTORY_LIST[i];

      historyTable.innerHTML += `<td>${alert.name}</td><td>${alert.domain}</td><td>${alert.subdomain}</td><td>${alert.date}</td><td>${alert.value}</td><td>${alert.thresholdSign}</td><td>${alert.thresholdValue}</td><td>${alert.severity}</td>`;
    }
  }

  if (historyPage) historyTableLeft.classList.remove("disabled");
  else historyTableLeft.classList.add("disabled");

  if (end) historyTableRight.classList.add("disabled");
  else historyTableRight.classList.remove("disabled");

  historyTablePagination.innerHTML = historyPage + 1 + " / " + Math.ceil(HISTORY_LIST.length / 15);

  historyTableLoading.classList.remove("loading");
}

loadAlertTable();
loadHistoryTable();

// #endregion

// #region Pop-Up

const popUpScreen = document.querySelector("#pop-up-screen");
const popUp = document.querySelector("#pop-up");
const popUpSections = document.querySelectorAll("#pop-up > *:not(i)");
const popUpAlertTitle = document.querySelector("#pop-up #alert-form h2");

const openPopUp = (window, index, mode) => {
  popUpScreen.classList.remove("disabled");

  selectedIndex = index;

  popUpSections.forEach((section) => {
    if (window == section.id) section.classList.remove("disabled");
    else section.classList.add("disabled");
  });

  if (window == "alert-form") {
    popUpAlertTitle.innerHTML =
      mode == "create" ? "Alarm Oluştur" : mode == "edit" ? "Alarm Düzenle" : "Alarm Görüntüle";

    if (mode != "create") fillForm(mode);
    else clearForm();

    selectedAction = mode;

    if (mode == "display") formButtons.classList.add("disabled");
    else formButtons.classList.remove("disabled");
  }
};

const closePopUp = () => {
  popUpScreen.classList.add("disabled");
};

// #endregion

// #region Form

const formInputs = {
  name: document.querySelector("#alert-form #form-name"),
  type: document.querySelector("#alert-form #form-type"),
  domain: document.querySelector("#alert-form #form-domain"),
  subdomain: document.querySelector("#alert-form #form-subdomain"),
  severity: document.querySelector("#alert-form #form-severity"),
  thresholdSign: document.querySelector("#alert-form #form-threshold-sign"),
  thresholdValue: document.querySelector("#alert-form #form-threshold-value"),
  query: document.querySelector("#alert-form #form-query"),
};
const formButtons = document.querySelector("#pop-up-buttons");

function fillForm(mode) {
  let alert = ALERT_LIST[selectedIndex];

  Object.values(formInputs).forEach((input) => input.removeAttribute("disabled"));

  formInputs.name.value = alert.name;
  formInputs.type.selectedIndex = alert.type == "Başarı Yüzdesi" ? 1 : alert.type == "Gecikme Süresi" ? 2 : 3;
  formInputs.domain.selectedIndex = alert.domain == "Server" ? 1 : 2;
  formInputs.domain.dispatchEvent(new Event("input"));
  formInputs.subdomain.selectedIndex =
    alert.subdomain == "Cloud" ? 1 : alert.subdomain == "Back-end" ? 2 : alert.subdomain == "Front-end" ? 3 : 4;
  formInputs.severity.selectedIndex = alert.severity == "Kritik" ? 1 : 2;
  formInputs.thresholdSign.selectedIndex =
    alert.thresholdSign == "<" ? 1 : alert.thresholdSign == "<=" ? 2 : alert.thresholdSign == ">=" ? 3 : 4;
  formInputs.thresholdValue.value = alert.thresholdValue;
  formInputs.query.value = alert.query;

  if (mode == "display") {
    Object.values(formInputs).forEach((input) => input.setAttribute("disabled", true));
  }
}

formInputs.domain.addEventListener("input", () => {
  formInputs.subdomain.selectedIndex = 0;

  formInputs.subdomain.querySelectorAll("option").forEach((option) => {
    if (formInputs.domain.value == "Server") {
      if (option.classList.contains("server")) option.removeAttribute("hidden");
      else option.setAttribute("hidden", true);
    } else if (formInputs.domain.value == "Client") {
      if (option.classList.contains("client")) option.removeAttribute("hidden");
      else option.setAttribute("hidden", true);
    }
  });
});

function clearForm() {
  Object.values(formInputs).forEach((input) => input.removeAttribute("disabled"));

  formInputs.name.value = "";
  formInputs.type.selectedIndex = 0;
  formInputs.domain.selectedIndex = 0;
  formInputs.domain.dispatchEvent(new Event("input"));
  formInputs.subdomain.querySelectorAll("option").forEach((option) => option.setAttribute("hidden", true));
  formInputs.severity.selectedIndex = 0;
  formInputs.thresholdSign.selectedIndex = 0;
  formInputs.thresholdValue.value = "";
  formInputs.query.value = "";
}

function actionForm() {
  switch (selectedAction) {
    case "create":
      createAlert();
      break;
    case "edit":
      editAlert();
      break;
  }
}

// #endregion

// #region Alert Operation

function createAlert() {
  ALERT_LIST.push({
    name: formInputs.name.value,
    type: formInputs.type.value,
    domain: formInputs.domain.value,
    subdomain: formInputs.subdomain.value,
    status: "Aktif",
    severity: formInputs.severity.value,
    thresholdSign: formInputs.thresholdSign.value,
    thresholdValue: formInputs.thresholdValue.value,
    query: formInputs.query.value,
  });

  closePopUp();
  loadAlertTable();
}

function editAlert() {
  ALERT_LIST[selectedIndex] = {
    name: formInputs.name.value,
    type: formInputs.type.value,
    domain: formInputs.domain.value,
    subdomain: formInputs.subdomain.value,
    status: "Aktif",
    severity: formInputs.severity.value,
    thresholdSign: formInputs.thresholdSign.value,
    thresholdValue: formInputs.thresholdValue.value,
    query: formInputs.query.value,
  };

  closePopUp();
  loadAlertTable();
}

function deleteAlert() {
  ALERT_LIST = ALERT_LIST.filter((alert, index) => index != selectedIndex);
  loadAlertTable();
  closePopUp();
}

// #endregion
