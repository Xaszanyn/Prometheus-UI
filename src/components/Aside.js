export default function Aside() {
  return (
    <aside>
      <h1>Alarm Yöneticisi</h1>
      <nav>
        <a href="#projects">
          <i class="fa-solid fa-code"></i>Projeler
        </a>
        <a href="#alerts" class="selected">
          <i class="fa-regular fa-bell"></i>Alarmlar
        </a>
        <a href="#histories">
          <i class="fa-regular fa-clock"></i>Alarm Geçmişi
        </a>
        <a href="#statistics">
          <i class="fa-solid fa-chart-line"></i>İstatistik
        </a>
        <a href="#settings">
          <i class="fa-solid fa-gear"></i>Ayarlar
        </a>
      </nav>
      <a class="line" href="#">
        <i class="fa-solid fa-question"></i>Yardım
      </a>
      <a class="line" href="#">
        <i class="fa-solid fa-chevron-right"></i>Küçült
      </a>
    </aside>
  );
}
