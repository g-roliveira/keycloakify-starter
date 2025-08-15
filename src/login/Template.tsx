import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useI18n } from "./i18n";
import type { KcContext } from "./KcContext";

export default function Template(props: TemplateProps<KcContext, any>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        showAnotherWayIfPresent = true,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, msgStr, getChangeLocaleUrl, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

    return (
        <html className={kcClsx("kcHtmlClass")}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="robots" content="noindex, nofollow" />

                {documentTitle !== undefined ? (
                    <title>{documentTitle}</title>
                ) : (
                    <title>{msgStr("loginTitle", kcContext.realm.displayName)}</title>
                )}

                {doUseDefaultCss && (
                    <>
                        <link rel="stylesheet" type="text/css" href={`${url.resourcesCommonPath}/node_modules/@patternfly/patternfly/patternfly.min.css`} />
                        <link rel="stylesheet" type="text/css" href={`${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`} />
                        <link rel="stylesheet" type="text/css" href={`${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`} />
                        <link rel="stylesheet" type="text/css" href={`${url.resourcesPath}/css/login.css`} />
                    </>
                )}

                <style>{`
                    .split-layout {
                        display: flex;
                        min-height: 100vh;
                        background: #f8f9fa;
                    }
                    
                    .image-section {
                        flex: 0 0 70%;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .image-section::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center/cover;
                        opacity: 0.8;
                    }
                    
                    .image-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1;
                    }
                    
                    .image-content {
                        text-align: center;
                        color: white;
                        padding: 2rem;
                        max-width: 500px;
                    }
                    
                    .image-content h1 {
                        font-size: 3rem;
                        font-weight: 700;
                        margin-bottom: 1rem;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    }
                    
                    .image-content p {
                        font-size: 1.2rem;
                        opacity: 0.9;
                        line-height: 1.6;
                        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                    }
                    
                    .form-section {
                        flex: 0 0 30%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 2rem;
                        background: white;
                    }
                    
                    .form-container {
                        width: 100%;
                        max-width: 400px;
                    }
                    
                    .form-header {
                        text-align: center;
                        margin-bottom: 2rem;
                    }
                    
                    .form-header h2 {
                        font-size: 2rem;
                        font-weight: 600;
                        color: #1a202c;
                        margin-bottom: 0.5rem;
                    }
                    
                    .form-header p {
                        color: #718096;
                        font-size: 1rem;
                    }
                    
                    .locale-selector {
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        z-index: 10;
                    }
                    
                    .locale-selector select {
                        background: rgba(255, 255, 255, 0.9);
                        border: 1px solid #e2e8f0;
                        border-radius: 0.375rem;
                        padding: 0.5rem;
                        font-size: 0.875rem;
                    }
                    
                    @media (max-width: 768px) {
                        .split-layout {
                            flex-direction: column;
                        }
                        
                        .image-section {
                            flex: 0 0 40vh;
                        }
                        
                        .form-section {
                            flex: 1;
                            padding: 1rem;
                        }
                        
                        .image-content h1 {
                            font-size: 2rem;
                        }
                        
                        .image-content p {
                            font-size: 1rem;
                        }
                    }
                    
                    /* Ajustes para os componentes do Keycloak */
                    .login-pf {
                        background: none !important;
                    }
                    
                    .login-pf body {
                        background: none !important;
                    }
                    
                    .card-pf {
                        box-shadow: none;
                        border: none;
                        background: transparent;
                        padding: 0;
                        max-width: none;
                    }
                    
                    .login-pf .container {
                        padding: 0;
                    }
                    
                    #kc-container-wrapper {
                        position: static;
                        width: 100%;
                    }
                    
                    #kc-header-wrapper {
                        padding: 0 0 1rem 0;
                        font-size: 1.5rem;
                        color: #1a202c;
                    }
                    
                    .pf-c-form__group {
                        margin-bottom: 1.5rem;
                    }
                    
                    .pf-c-form-control {
                        padding: 0.75rem;
                        border: 2px solid #e2e8f0;
                        border-radius: 0.5rem;
                        font-size: 1rem;
                        transition: border-color 0.2s, box-shadow 0.2s;
                    }
                    
                    .pf-c-form-control:focus {
                        border-color: #667eea;
                        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                        outline: none;
                    }
                    
                    .pf-c-button.pf-m-primary {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 0.5rem;
                        font-weight: 600;
                        font-size: 1rem;
                        width: 100%;
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    
                    .pf-c-button.pf-m-primary:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                    }
                    
                    .pf-c-alert {
                        border-radius: 0.5rem;
                        margin-bottom: 1rem;
                    }
                `}</style>
            </head>

            <body className={clsx("login-pf", bodyClassName)}>
                <div className="split-layout">
                    {/* Seção da Imagem - 70% */}
                    <div className="image-section">
                        <div className="image-overlay">
                            <div className="image-content">
                                <h1>Bem-vindo</h1>
                                <p>
                                    Acesse sua conta e explore todas as funcionalidades 
                                    disponíveis em nossa plataforma segura e moderna.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Seção do Formulário - 30% */}
                    <div className="form-section">
                        <div className="form-container">
                            {/* Seletor de Idioma */}
                            {realm.internationalizationEnabled && locale && locale.supported && locale.supported.length > 1 && (
                                <div className="locale-selector">
                                    <select
                                        onChange={(e) => {
                                            const newLocale = e.target.value;
                                            window.location.href = getChangeLocaleUrl(newLocale);
                                        }}
                                        value={currentLanguageTag}
                                    >
                                        {locale.supported.map(({ languageTag }) => (
                                            <option key={languageTag} value={languageTag}>
                                                {labelBySupportedLanguageTag[languageTag]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Cabeçalho do Formulário */}
                            <div className="form-header">
                                {headerNode !== undefined ? (
                                    headerNode
                                ) : (
                                    <>
                                        <h2>{msgStr("loginTitle", realm.displayName)}</h2>
                                        <p>Entre com suas credenciais</p>
                                    </>
                                )}
                            </div>

                            {/* Mensagens */}
                            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <div className={clsx("pf-c-alert", `pf-m-${message.type === "error" ? "danger" : message.type}`)}>
                                    <div className="pf-c-alert__icon">
                                        <i className={clsx("fas", message.type === "success" ? "fa-check-circle" : message.type === "warning" ? "fa-exclamation-triangle" : "fa-exclamation-circle")} aria-hidden="true"></i>
                                    </div>
                                    <p className="pf-c-alert__title">
                                        <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                                    </p>
                                </div>
                            )}

                            {/* Conteúdo Principal */}
                            <div id="kc-content">
                                <div id="kc-content-wrapper">
                                    {children}

                                    {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                                        <form id="kc-select-try-another-way-form" action={auth.showTryAnotherWayLink} method="post">
                                            <div className="pf-c-form__group">
                                                <input type="hidden" name="tryAnotherWay" value="on" />
                                                <a href="#" id="try-another-way" onClick={() => {
                                                    document.forms["kc-select-try-another-way-form" as never].submit();
                                                    return false;
                                                }}>
                                                    {msg("doTryAnotherWay")}
                                                </a>
                                            </div>
                                        </form>
                                    )}

                                    {socialProvidersNode}

                                    {displayInfo && (
                                        <div id="kc-info" className="pf-c-content">
                                            <div id="kc-info-wrapper">
                                                {infoNode}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}