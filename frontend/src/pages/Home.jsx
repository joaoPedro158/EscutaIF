import MobileLayout from '../layout/MobileLayout';
function Home() {
      return (
    <MobileLayout>
      <main className="flex flex-col items-start self-stretch pb-1.5 ">
        <div className="container flex flex-col items-start max-w-[1200px] px-5 py-8 gap-20 self-stretch">
            <h1 className="text-(--primary)">Página Inicial</h1>
            <div className="hero inline-grid gap-x-12 gap-y-12 self-stretch grid-cols-1 grid-rows-[350px_626px]">
              <div className='visual-elemet flex max-w-[480px] flex-col justify-center items-start aspect-square row-span-1 col-span-1 justify-self-stretch'>
                <div className="absolute left-[-43.75px] top-[-43.75px] w-[350px] h-[350px] rounded-full bg-[rgba(0,105,76,0.10)] blur-[32px]">
                  <div className = "main-image flex p-4 justify-center items-center w-full rounded-[32px] bg-white shadow-(--shadow-card)">
                    <img src="./assets/image/hero-image.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </main>
      
    </MobileLayout>
  );
}

export default Home;