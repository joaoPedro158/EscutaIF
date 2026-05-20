// web/src/pages/Login.jsx
import React, { useState } from 'react';
import {
    Mail,
    Lock,
    EyeOff,
    Eye,
    ArrowRight,
    User,
    UserPlus,
    Check,
    X
} from 'lucide-react';

import '../styles/Login.css';
import logoCampus from '../assets/Campus_Nova_Cruz_-_Logo_Color_Hor.original.png';
import auth from '../services/auth';
import api from '../services/axiosConfig';

export default function Login({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'senha') {
            // Atualiza checks da senha em tempo real
            const checks = {
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                lowercase: /[a-z]/.test(value),
                number: /[0-9]/.test(value),
                special: /[^A-Za-z0-9]/.test(value)
            };
            setPasswordChecks(checks);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // reset messages
        setErrorMsg(null);
        setSuccessMsg(null);

        if (isLogin) {
            // Real login via API
            const result = await auth.login(formData.email, formData.senha);
            if (result.success) {
                setSuccessMsg('Login efetuado com sucesso. Redirecionando...');
                if (onLoginSuccess) onLoginSuccess();
            } else {
                setErrorMsg(result.message || 'Falha no login');
            }
        } else {
            // Registrar conta (backend espera: name, email, password)
            try {
                const payload = {
                    name: formData.nome,
                    email: formData.email,
                    password: formData.senha
                };
                const response = await api.post('/adm/registrar', payload);
                setSuccessMsg(response.data.message || 'Conta criada com sucesso');
                // voltar ao modo login e limpar senha
                setIsLogin(true);
                setFormData({ nome: '', email: formData.email, senha: '' });
            } catch (error) {
                let msg = error.response?.data?.message || error.message || 'Erro ao criar conta';
                if (typeof msg === 'string' && msg.includes('Server Error')) {
                    msg = 'Erro no servidor. Tente novamente mais tarde.';
                }
                setErrorMsg(msg);
            }
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
                                    className={`campo-senha ${!isLogin && Object.values(passwordChecks).every(Boolean) ? 'input-valid' : ''} ${errorMsg ? 'input-error' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="botao-revelar-senha"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Mensagens de erro/sucesso */}
                            {errorMsg && (
                                <div className="message-box message-error" role="alert">{errorMsg}</div>
                            )}
                            {successMsg && (
                                <div className="message-box message-success" role="status">{successMsg}</div>
                            )}

                            {/* Requisitos de senha (apenas no registro) */}
                            {!isLogin && (
                                <ul className="password-requirements" aria-live="polite">
                                    <li>{passwordChecks.length ? <Check size={14} className="req-icon req-ok" /> : <X size={14} className="req-icon req-fail" />} Mínimo 8 caracteres</li>
                                    <li>{passwordChecks.uppercase ? <Check size={14} className="req-icon req-ok" /> : <X size={14} className="req-icon req-fail" />} Uma letra maiúscula</li>
                                    <li>{passwordChecks.lowercase ? <Check size={14} className="req-icon req-ok" /> : <X size={14} className="req-icon req-fail" />} Uma letra minúscula</li>
                                    <li>{passwordChecks.number ? <Check size={14} className="req-icon req-ok" /> : <X size={14} className="req-icon req-fail" />} Um número</li>
                                    <li>{passwordChecks.special ? <Check size={14} className="req-icon req-ok" /> : <X size={14} className="req-icon req-fail" />} Um carácter especial</li>
                                </ul>
                            )}
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