window.ALERT_LIST = [
  {
    name: "141B-SCSRT",
    type: "Başarı Oranı",
    domain: "Server",
    subdomain: "Back-end",
    status: "Aktif",
    severity: "Uyarı",
    thresholdSign: "<",
    thresholdValue: 85,
    query: `sum(increase(hostmetric_count{job="oc.uat.online",TxnTrm=~".",SourceAppCode=~".",SourceAppSite=~".",f39=~".",CrdDci=~".",Otc!~"5."}[12h]))`,
  },

  {
    name: "JSHandling",
    type: "Gecikme Süresi",
    domain: "Client",
    subdomain: "Front-end",
    status: "Aktif",
    severity: "Uyarı",
    thresholdSign: ">=",
    thresholdValue: 5000,
    query: `sum(increase(hostmetric_count{job="oc.uat.online",TxnTrm=~".",SourceAppCode=~".",SourceAppSite=~".",f39=~".",CrdDci=~".",Otc!~"5."}[12h]))`,
  },

  {
    name: "Cloud Data GET",
    type: "İşlem Sayısı",
    domain: "Server",
    subdomain: "Cloud",
    status: "Pasif",
    severity: "Kritik",
    thresholdSign: ">",
    thresholdValue: 15000,
    query: `sum(increase(hostmetric_count{job="oc.uat.online",TxnTrm=~".",SourceAppCode=~".",SourceAppSite=~".",f39=~".",CrdDci=~".",Otc!~"5."}[12h]))`,
  },
];

window.HISTORY_LIST = [];

for (let i = 0; i < 117; i++) {
  window.HISTORY_LIST.push({
    name: random(["141B-SCSRT", "JSHandling", "Cloud Data GET"]),
    domain: random(["Server", "Client"]),
    subdomain: random(["Cloud", "Back-end", "Front-end", "Grafana"]),
    date: randint(),
    value: Math.floor(Math.random() * 601) + 400,
    thresholdSign: random(["<", "<=", ">=", ">"]),
    thresholdValue: Math.floor(Math.random() * 101) * 25,
    severity: random(["Kritik", "Uyarı"]),
  });
}

function random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randint() {
  return new Date(Math.floor(Math.random() * 100000000000) + 1500000000000).toLocaleString("tr");
}

export async function getAlerts() {
  return await fetch("http://localhost:8080/api/alerts").then((response) =>
    response.json().then((response) => response.data)
  );
}

export async function getAlertHistories() {
  return await fetch("http://localhost:8080/api/histories").then((response) =>
    response.json().then((response) => response.data)
  );
}

export async function createAlert(alert) {
  return await fetch("http://localhost:8080/api/alerts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alert),
  }).then((response) => response.json().then((response) => response.responseCode));
}

export async function editAlert(alert) {
  return await fetch("http://localhost:8080/api/alerts/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alert),
  }).then((response) => response.json().then((response) => response.responseCode));
}

export async function deleteAlert(alert) {
  return await fetch(`http://localhost:8080/api/alerts/delete/${alert.id}`, {
    method: "DELETE",
  }).then((response) => response.json().then((response) => response.responseCode));
}
