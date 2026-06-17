import iconeMais from '../assets/icon/icon-16.svg';

const BotaoAdicionarAdmin = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex justify-center items-center gap-2 px-6 py-3 w-full sm:w-auto bg-[#076b4a] hover:bg-[#05573c] text-white font-medium rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#076b4a]"
    >
    <img src={iconeMais} alt="Adicionar" className="w-5 h-5" />
      Adicionar administrador
    </button>
  );
};

export default BotaoAdicionarAdmin;