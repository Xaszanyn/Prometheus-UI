export default function Aside() {
  return (
    <aside>
      <h1>Alarm Yöneticisi</h1>
      <nav>
        <a href="#projects">
          <i class="fa-solid fa-code"></i>
          <span>Projeler</span>
        </a>
        <a href="#alerts" class="selected">
          <i class="fa-regular fa-bell"></i>
          <span>Alarmlar</span>
        </a>
        <a href="#histories">
          <i class="fa-regular fa-clock"></i>
          <span>Alarm Geçmişi</span>
        </a>
        <a href="#statistics">
          <i class="fa-solid fa-chart-line"></i>
          <span>İstatistik</span>
        </a>
        <a href="#settings">
          <i class="fa-solid fa-gear"></i>
          <span>Ayarlar</span>
        </a>
      </nav>
      <a id="help" class="line" href="https://github.com/Xaszanyn/Prometheus-UI">
        <i class="fa-solid fa-question"></i>
        <span>Yardım</span>
      </a>
      <a class="line" href="#" id="resize" data-resize="open">
        <i class="fa-solid fa-chevron-right"></i>
        <span>Küçült</span>
      </a>
    </aside>
  );
}
