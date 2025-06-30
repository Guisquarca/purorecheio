// Configuração dos hexágonos
const hexagonConfig = {
    maxHexagons: 40,
    maxLitHexagons: 5,
    animationDuration: 3000,
    fadeDuration: 2000
};

// Variáveis globais
let hexagons = [];
let litHexagons = [];
let animationId;
let resizeTimeout;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeHexagons();
    initializeVideo();
    setupEventListeners();
    startHexagonAnimation();

    // Expansão animada do card de serviço
    document.querySelectorAll('.saiba-mais-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = btn.closest('.service-card');
            const serviceId = card.getAttribute('data-service');

            // Fecha outros cards
            document.querySelectorAll('.service-card.expanded').forEach(expandedCard => {
                if (expandedCard !== card) {
                    expandedCard.classList.remove('expanded');
                    const desc = expandedCard.querySelector('.service-description');
                    if (desc) {
                        desc.style.maxHeight = '0';
                        setTimeout(() => {
                            if (desc.parentNode) desc.parentNode.removeChild(desc);
                        }, 300);
                    }
                }
            });

            // Se já está expandido, recolhe
            if (card.classList.contains('expanded')) {
                card.classList.remove('expanded');
                const desc = card.querySelector('.service-description');
                if (desc) {
                    desc.style.maxHeight = '0';
                    setTimeout(() => {
                        if (desc.parentNode) desc.parentNode.removeChild(desc);
                    }, 300);
                }
                return;
            }

            // Expande o card
            card.classList.add('expanded');
            let desc = card.querySelector('.service-description');
            if (!desc) {
                desc = document.createElement('div');
                desc.className = 'service-description';
                let content = serviceData[serviceId]?.content || 'Descrição não encontrada.';
                // Remove tags HTML e converte para texto puro com quebras de linha
                content = content
                    .replace(/<h2>(.*?)<\/h2>/gi, '\n$1\n')
                    .replace(/<ul>|<\/ul>/gi, '')
                    .replace(/<li><strong>(.*?):<\/strong>\s*(.*?)<\/li>/gi, '\n$1:\n $2\n')
                    .replace(/<li><strong>(.*?):<\/strong>(.*?)<\/li>/gi, '\n$1:\n $2\n')
                    .replace(/<li>(.*?)<\/li>/gi, '\n$1\n')
                    .replace(/<p>(.*?)<\/p>/gi, '\n$1\n')
                    .replace(/<br\s*\/?>(\s*)/gi, '\n')
                    .replace(/<[^>]+>/g, '') // remove qualquer outra tag
                    .replace(/\n{2,}/g, '\n\n') // não deixar mais de 2 quebras
                    .trim();
                desc.innerHTML = `<pre style="white-space: pre-wrap; font-family: inherit; color: #FFD700; text-align: left;">${content}</pre>` +
                    `<div class='whatsapp-section' style='text-align:center; margin-top:1.5rem; padding-top:1rem; border-top:1px solid rgba(212,175,55,0.15);'>
                        <button class='whatsapp-btn' onclick='openWhatsApp()'>
                            <i class="fab fa-whatsapp"></i>
                            <span>FALE COM UM AGENTE NOSSO</span>
                        </button>
                    </div>`;
                desc.style.maxHeight = '0';
                desc.style.overflow = 'hidden';
                desc.style.transition = 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)';
                card.appendChild(desc);
                // Força o reflow para animar
                void desc.offsetWidth;
                // Calcula a altura real do conteúdo
                const scrollHeight = desc.scrollHeight;
                desc.style.maxHeight = scrollHeight + 'px';
                // Se o texto for muito grande, permite scroll interno
                setTimeout(() => {
                    if (desc.scrollHeight > 600) {
                        desc.style.overflow = 'auto';
                        desc.style.maxHeight = '600px';
                    }
                }, 450);
            }
        });
    });
});

// Inicialização dos hexágonos
function initializeHexagons() {
    const background = document.getElementById('hexagonBackground');
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Limpar hexágonos existentes
    background.innerHTML = '';
    hexagons = [];
    litHexagons = [];
    
    // Calcular número de hexágonos baseado no tamanho da tela
    const hexSize = 80;
    const hexWidth = hexSize;
    const hexHeight = hexSize * 0.866; // Altura do hexágono
    
    const cols = Math.floor(containerWidth / (hexWidth * 0.75));
    const rows = Math.floor(containerHeight / hexHeight);
    const totalHexagons = Math.min(cols * rows, hexagonConfig.maxHexagons);
    
    // Criar hexágonos
    for (let i = 0; i < totalHexagons; i++) {
        const hexagon = document.createElement('div');
        hexagon.className = 'hexagon';
        
        // Posicionamento em grade hexagonal
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * hexWidth * 0.75;
        const y = row * hexHeight + (col % 2) * (hexHeight / 2);
        
        hexagon.style.left = x + 'px';
        hexagon.style.top = y + 'px';
        
        background.appendChild(hexagon);
        hexagons.push(hexagon);
    }
}

// Inicialização do vídeo
function initializeVideo() {
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const youtubeVideo = document.getElementById('youtubeVideo');
    
    // Exemplo de como carregar um vídeo do YouTube
    // Substitua 'VIDEO_ID' pelo ID do vídeo do YouTube
    function loadYouTubeVideo(videoId) {
        if (videoId) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
            youtubeVideo.src = embedUrl;
            videoPlaceholder.style.display = 'none';
            youtubeVideo.style.display = 'block';
        }
    }
    
    // Exemplo de uso: loadYouTubeVideo('dQw4w9WgXcQ');
    
    // Para usar, chame: loadYouTubeVideo('SEU_VIDEO_ID_AQUI');
    // O ID do vídeo é a parte após "v=" na URL do YouTube
    // Exemplo: https://www.youtube.com/watch?v=dQw4w9WgXcQ -> ID: dQw4w9WgXcQ
    
    // Adicionar evento de clique no placeholder
    videoPlaceholder.addEventListener('click', function() {
        // Aqui você pode adicionar lógica para carregar o vídeo quando clicado
        console.log('Clique no placeholder do vídeo - adicione o ID do vídeo aqui');
    });
}

// Configuração dos event listeners
function setupEventListeners() {
    // Event listeners para os cards de serviço
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            openServiceModal(service);
        });
    });
    
    // Event listener para redimensionamento da janela
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initializeHexagons();
        }, 250);
    });
    
    // Event listeners para fechar modais ao clicar fora
    window.addEventListener('click', function(event) {
        const loginModal = document.getElementById('login-modal');
        const registerModal = document.getElementById('register-modal');
        const errorModal = document.getElementById('error-modal');
        
        if (event.target === loginModal) {
            closeLoginModal();
        }
        if (event.target === registerModal) {
            closeRegisterModal();
        }
        if (event.target === errorModal) {
            closeErrorModal();
        }
    });
}

// Animação dos hexágonos
function startHexagonAnimation() {
    function animate() {
        // Remover iluminação de hexágonos antigos
        litHexagons.forEach(hexagon => {
            hexagon.classList.remove('lit');
        });
        litHexagons = [];
        
        // Adicionar iluminação a novos hexágonos
        const hexagonsToLight = Math.min(
            Math.floor(Math.random() * 3) + 3, 
            hexagonConfig.maxLitHexagons
        );
        
        for (let i = 0; i < hexagonsToLight; i++) {
            const randomHexagon = hexagons[Math.floor(Math.random() * hexagons.length)];
            if (randomHexagon && !litHexagons.includes(randomHexagon)) {
                randomHexagon.classList.add('lit');
                litHexagons.push(randomHexagon);
            }
        }
        
        animationId = setTimeout(animate, hexagonConfig.animationDuration);
    }
    
    animate();
}

// Função para carregar vídeo do YouTube
function loadYouTubeVideo(videoId) {
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const youtubeVideo = document.getElementById('youtubeVideo');
    
    if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&showinfo=0`;
        youtubeVideo.src = embedUrl;
        videoPlaceholder.style.display = 'none';
        youtubeVideo.style.display = 'block';
    }
}

// Dados dos serviços
const serviceData = {
    'gestao-tributaria': {
        title: 'Gestão Tributária',
        content: `
            <h2>Gestão Tributária Completa</h2>
            <p>Nossa equipe especializada oferece serviços completos de gestão tributária para sua empresa:</p>
            <ul>
                <li><strong>Planejamento Tributário:</strong> Estratégias personalizadas para otimizar a carga tributária</li>
                <li><strong>Compliance Fiscal:</strong> Garantia de conformidade com todas as obrigações fiscais</li>
                <li><strong>Análise de Impostos:</strong> Revisão e otimização de todos os tributos</li>
                <li><strong>Consultoria Especializada:</strong> Suporte contínuo para decisões fiscais</li>
                <li><strong>Gestão de Obrigações Acessórias:</strong> Controle de prazos e entregas</li>
            </ul>
            <p>Reduza custos e evite multas com nossa gestão tributária profissional.</p>
        `
    },
    'gestao-financeira': {
        title: 'Gestão Financeira',
        content: `
            <h2>Gestão Financeira</h2>
            <p>A saúde financeira da sua empresa é a bússola que guia o sucesso. Transformamos números em estratégias claras, garantindo que cada real trabalhe a seu favor. Da otimização de custos à projeção de cenários futuros, entregamos o controle e a clareza que você precisa para tomar decisões seguras e impulsionar a lucratividade. Invista na solidez que seu negócio merece e veja suas finanças prosperarem.</p>
        `
    },
    'desenvolvimento-software': {
        title: 'Desenvolvimento de Software',
        content: `
            <h2>Desenvolvimento de Software</h2>
            <p>No cenário digital de hoje, ter a tecnologia certa é o seu maior diferencial competitivo. Desenvolvemos softwares personalizados que não apenas simplificam suas operações, mas também abrem novas portas para a eficiência e a inovação. Chega de soluções genéricas; criamos ferramentas sob medida que automatizam seus processos, aumentam a produtividade da sua equipe e posicionam sua empresa na vanguarda da transformação digital.</p>
        `
    },
    'abertura-empresa': {
        title: 'Abertura e Encerramento de Empresa',
        content: `
            <h2>Abertura e Encerramento de Empresa</h2>
            <p>Processo completo e descomplicado para sua empresa:</p>
            <ul>
                <li><strong>Abertura Gratuita para MEI:</strong> Zero custos para Microempreendedor Individual</li>
                <li><strong>Consultoria Completa:</strong> Escolha do melhor enquadramento tributário</li>
                <li><strong>Documentação:</strong> Preparação e acompanhamento de toda documentação</li>
                <li><strong>Protocolos:</strong> Gestão de todos os protocolos necessários</li>
                <li><strong>Encerramento:</strong> Processo seguro e eficiente de encerramento</li>
            </ul>
            <p>Comece seu negócio com tranquilidade e segurança jurídica.</p>
        `
    },
    'redes-sociais': {
        title: 'Gestão de Redes Sociais',
        content: `
            <h2>Gestão de Redes Sociais</h2>
            <p>Transforme suas redes sociais em ferramentas poderosas de marketing:</p>
            <ul>
                <li><strong>Estratégia Digital:</strong> Planejamento personalizado para sua marca</li>
                <li><strong>Criação de Conteúdo:</strong> Posts profissionais e engajantes</li>
                <li><strong>Gestão de Comunidade:</strong> Interação e relacionamento com seguidores</li>
                <li><strong>Análise de Performance:</strong> Relatórios detalhados de resultados</li>
                <li><strong>Campanhas Publicitárias:</strong> Gestão de anúncios pagos</li>
            </ul>
            <p>Aumente sua presença digital e conecte-se com seu público-alvo.</p>
        `
    },
    'insights': {
        title: 'Insights para Potencializar seu Negócio',
        content: `
            <h2>Insights para Potencializar seu Negócio</h2>
            <p>Análises estratégicas para impulsionar seus resultados:</p>
            <ul>
                <li><strong>Análise de Mercado:</strong> Estudos detalhados do seu segmento</li>
                <li><strong>Oportunidades de Crescimento:</strong> Identificação de novos mercados</li>
                <li><strong>Otimização de Processos:</strong> Melhoria da eficiência operacional</li>
                <li><strong>Estratégias de Vendas:</strong> Técnicas para aumentar receita</li>
                <li><strong>Gestão Financeira:</strong> Controle e planejamento financeiro</li>
            </ul>
            <p>Transforme dados em decisões estratégicas para o crescimento do seu negócio.</p>
        `
    },
    'recursos-humanos': {
        title: 'Gestão de Recursos Humanos',
        content: `
            <h2>Gestão de Recursos Humanos</h2>
            <p>Serviços especializados para Pessoas Físicas e Jurídicas:</p>
            <ul>
                <li><strong>Recrutamento e Seleção:</strong> Processos eficientes de contratação</li>
                <li><strong>Gestão de Folha de Pagamento:</strong> Cálculos e relatórios precisos</li>
                <li><strong>Compliance Trabalhista:</strong> Conformidade com leis trabalhistas</li>
                <li><strong>Desenvolvimento de Equipes:</strong> Treinamentos e capacitação</li>
                <li><strong>Gestão de Benefícios:</strong> Administração de vantagens</li>
            </ul>
            <p>Otimize sua gestão de pessoas com processos profissionais e eficientes.</p>
        `
    },
    'aconselhamento-juridico': {
        title: 'Aconselhamento Jurídico',
        content: `
            <h2>Aconselhamento Jurídico</h2>
            <p>Suporte jurídico especializado para sua empresa:</p>
            <ul>
                <li><strong>Consultoria Legal:</strong> Orientação em questões empresariais</li>
                <li><strong>Contratos:</strong> Elaboração e revisão de contratos</li>
                <li><strong>Compliance Corporativo:</strong> Adequação às normas legais</li>
                <li><strong>Gestão de Riscos:</strong> Identificação e prevenção de riscos jurídicos</li>
                <li><strong>Mediação de Conflitos:</strong> Resolução extrajudicial de disputas</li>
            </ul>
            <p>Proteja seus interesses com aconselhamento jurídico de qualidade.</p>
        `
    }
};

// Funções dos modais
function openServiceModal(service) {
    const modal = document.getElementById('service-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (serviceData[service]) {
        modalContent.innerHTML = serviceData[service].content;
        modal.style.display = 'block';
        
        // Posicionar modal na posição atual da rolagem
        modal.scrollTop = window.pageYOffset;
    }
}

function closeModal() {
    document.getElementById('service-modal').style.display = 'none';
}

function openLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function openRegisterModal() {
    closeLoginModal();
    document.getElementById('register-modal').style.display = 'block';
}

function closeRegisterModal() {
    document.getElementById('register-modal').style.display = 'none';
}

function openErrorModal() {
    document.getElementById('error-modal').style.display = 'block';
}

function closeErrorModal() {
    document.getElementById('error-modal').style.display = 'none';
}

function handleLogin() {
    openErrorModal();
}

function handleRegister() {
    openErrorModal();
}

function openWhatsApp() {
    const phone = '11946162314';
    const message = 'Olá! Gostaria de saber mais sobre os serviços da MDG Assessoria.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Limpeza ao sair da página
window.addEventListener('beforeunload', function() {
    if (animationId) {
        clearTimeout(animationId);
    }
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
}); 