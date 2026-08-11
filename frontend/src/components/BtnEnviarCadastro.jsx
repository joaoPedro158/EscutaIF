import iconeMais from '../assets/icon/add_adm.svg';

const BtnEnviarCadastro = ({ onClick, disabled, type = 'submit' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="flex py-4 w-full mb-3 justify-center items-center gap-2 self-stretch rounded-full bg-[var(--primary)] hover:bg-[#05573c] text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#076b4a] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <img src={iconeMais} alt="Adicionar" className="w-5 h-5" />
      Adicionar administrador
    </button>
  );
};

export default BtnEnviarCadastro;