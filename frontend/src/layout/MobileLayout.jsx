import Header from "../components/Header";

export default function MobileLayout({ children }) {

  function abrirMenu() {
    console.log("Abrir menu");
  }

  return (
    <div>
      <Header onMenuToggle={abrirMenu} />

      <main>
        {children}
      </main>
    </div>
  );
}