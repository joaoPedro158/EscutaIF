// web/src/pages/Login.jsx
import React, { useState } from 'react';
import {
    Mail,
    Lock,
    EyeOff,
    Eye,
    ArrowRight,
    User,
    UserPlus
} from 'lucide-react';

import '../styles/Login.css';
import logoCampus from '../assets/Campus_Nova_Cruz_-_Logo_Color_Hor.original.png';

export default function Login({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        foto: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'foto') {
            setFormData({ ...formData, foto: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Login efetuado:', { email: formData.email, senha: formData.senha });
            // Dispara a navegação para o Dashboard
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } else {
            // Envio com foto (FormData)
            const data = new FormData();
            data.append('nome', formData.nome);
            data.append('email', formData.email);
            data.append('senha', formData.senha);
            if (formData.foto) {
                data.append('foto', formData.foto);
            }
            // Aqui você faria o fetch/axios para o backend
            console.log('Conta criada:', Object.fromEntries(data));
            // Após criar a conta, retorna automaticamente para a tela de login
            setIsLogin(true);
        }
    };

    return (
        <div className="recipiente-principal">

            {/* ── LADO ESQUERDO: Branding Institucional ── */}
            <div className="painel-esquerdo">
                <div className="fundo-gradiente"></div>

                <div className="cabecalho-marca">
                    <img
                        src={logoCampus}
                        alt="IFRN Campus Nova Cruz"
                        className="logo-campus"
                    />
                </div>

                <div className="area-texto-central">
                    <h1 className="titulo-principal">
                        Acolhimento e Suporte<br />ao Estudante.
                    </h1>
                    <p className="paragrafo-principal">
                        Plataforma administrativa para acompanhamento, registro e gestão do bem-estar estudantil. Um ambiente seguro para cuidar de quem faz o IFRN.
                    </p>
                </div>

                <div className="rodape-esquerdo">
                    <p className="texto-direitos">
                        © {new Date().getFullYear()} IFRN Campus Nova Cruz. Sistema de uso restrito.
                    </p>
                </div>
            </div>

            {/* ── LADO DIREITO: Formulário ── */}
            <div className="painel-direito">
                <div className="cartao-formulario">

                    <div className="cabecalho-formulario">
                        <h2 className="titulo-formulario">
                            {isLogin ? 'Acesso Restrito' : 'Criar Conta'}
                        </h2>
                        <p className="subtitulo-formulario">
                            {isLogin
                                ? 'Insira as suas credenciais para continuar.'
                                : 'Preencha os seus dados para solicitar acesso.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="formulario-autenticacao">

                        {/* Campo: Nome (Apenas visível se for Registro) */}
                        {!isLogin && (
                            <>
                                <div className="grupo-entrada">
                                    <label className="rotulo-entrada">Nome Completo</label>
                                    <div className="envoltorio-input">
                                        <User className="icone-input" size={20} />
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleChange}
                                            placeholder="Ex: Maria Clara..."
                                            required={!isLogin}
                                            className="campo-texto"
                                        />
                                    </div>
                                </div>
                                {/* Campo: Foto */}
                                <div className="grupo-entrada">
                                    <label className="rotulo-entrada">Foto de Perfil (opcional)</label>
                                    <div className="envoltorio-input">
                                        <input
                                            type="file"
                                            name="foto"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="campo-texto"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Campo: E-mail */}
                        <div className="grupo-entrada">
                            <label className="rotulo-entrada">E-mail Institucional</label>
                            <div className="envoltorio-input">
                                <Mail className="icone-input" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Ex: usuario@academico.ifrn.edu.br"
                                    required
                                    className="campo-texto"
                                />
                            </div>
                        </div>

                        {/* Campo: Senha */}
                        <div className="grupo-entrada">
                            <div className="cabecalho-senha">
                                <label className="rotulo-entrada">Senha</label>
                                {isLogin && (
                                    <a href="#" className="link-esqueceu-senha">Esqueceu a senha?</a>
                                )}
                            </div>
                            <div className="envoltorio-input">
                                <Lock className="icone-input" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="campo-senha"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="botao-revelar-senha"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Botão de Envio */}
                        <button type="submit" className="botao-submeter">
                            {isLogin ? 'Entrar no Painel' : 'Registrar Conta'}
                            {isLogin ? <ArrowRight size={20} /> : <UserPlus size={20} />}
                        </button>
                    </form>

                    {/* Rodapé: Alternar Modo de Autenticação */}
                    <div className="rodape-formulario">
                        <p className="texto-alternar-modo">
                            {isLogin ? "Ainda não tem acesso?" : "Já possui uma conta?"}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setFormData({ nome: '', email: '', senha: '' });
                                }}
                                className="botao-alternar-modo"
                            >
                                {isLogin ? "Criar conta" : "Fazer login"}
                            </button>
                        </p>

                        <p className="texto-ajuda">
                            Problemas com o acesso? <a href="#" className="link-ajuda">Contate o suporte do SUAP</a>.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
}