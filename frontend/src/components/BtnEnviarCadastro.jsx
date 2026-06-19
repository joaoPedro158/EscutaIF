import { Link } from 'react-router-dom';
import iconeMais from '../assets/icon/add_adm.svg';
import { ROUTES } from '../enum/rotas';

const BotaoAdicionarAdmin = ({ onClick }) => {
  return (
    <Link to={ROUTES.CADASTRA + '/form'}>
    <button
      onClick={onClick}
      className="flex py-4 w-full justify-center items-center gap-2 self-stretch rounded-full bg-[var(--primary)] hover:bg-[#05573c] text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#076b4a]"
    >
    
      <img src={iconeMais} alt="Adicionar" className="w-5 h-5" />
    
      Adicionar administrador
    </button>
    </Link>
  );
};

export default BotaoAdicionarAdmin;